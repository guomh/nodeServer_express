/**
 * Created by guominghui on 17/8/4.
 */
const Message = require('./socketMessage');
const Receiver = require('./TextReceiver');
class SlaveRTC {
    constructor(el){
        this.el = el;
        this.others = [];
        this.connection = new RTCPeerConnection();
        this.initRTCPeerConnection();
        this.message = new Message(this.handleMessage());
        this.initVideo();
    }

    initVideo(){
        let _this = this;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function(stream){
            _this.stream = stream;
            stream.getTracks().forEach(
                 function(track) {
                     if(track.kind == 'audio'){
                         _this.connection.addTrack(
                             track,
                             stream
                         );
                     }
                 }
             );
        }).catch(function(e) {
            console.log(e);
        });
        this.connection.ontrack = function(e){
            console.log(e.streams);
            _this.el.srcObject = e.streams[0];
        }
    }


    updateToMaster(){
        return {
            message:this.message,
            others:this.others,
            id:this.id
        }
    }

    handleMessage() {
        let _this = this;
        return function(msg){
            console.log(msg.type,msg.from);
            var type = msg.type;
            let data;
            switch (type) {
                case 'id':
                    _this.id = msg.data;
                    console.log('id',msg);
                    if(msg.masterId){
                        _this.masterId = msg.masterId;
                    }
                    break;
                case 'offer':
                    msg.desc = msg.payload;
                    _this.connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then().catch(function(e) {
                        console.log(e);
                    });
                    _this.createAnswer();
                    break;
                case 'answer':

                    if(msg.data){
                        data = JSON.parse(msg.data);
                    }else if(msg.payload){
                        data = JSON.parse(msg.payload);
                    }
                    _this.connection.setRemoteDescription(new RTCSessionDescription(data)).then();
                    break;
                case 'candidate':

                    data = msg.payload&&{
                            sdpMLineIndex: msg.payload.label,
                            sdpMid: msg.payload.id,
                            candidate: msg.payload.candidate
                        };
                    if(data){
                        let candidate = new RTCIceCandidate(data);
                        _this.connection.addIceCandidate(candidate).then(function(){

                        }).catch(function(e) {
                            console.log(e);
                        });
                    }
                    break;
                case 'other':
                    if(msg.data){
                        _this.others =msg.data;
                    }
                    break;
                case 'otherjoin':

                    _this.others.push(msg.data);
                    break;
                case 'otherleave':
                    let i = _this.others.indexOf(msg.data);
                    if(i>-1){
                        _this.others.splice(i,1);
                    }
                    break;
                case 'newmaster':
                    _this.masterId = msg.data;
                    break;
            }
        }

    }
    initRTCPeerConnection(){
        let _this = this;
        let connection = this.connection;
        connection.onicecandidate = function(e) {
            _this.message.sendMessage({
                type:'candidate',
                payload:{
                    label: e.candidate&&e.candidate.sdpMLineIndex,
                    id: e.candidate&&e.candidate.sdpMid,
                    candidate: e.candidate&&e.candidate.candidate
                },
                to:_this.masterId
            });
        };
        connection.onremovestream = function(){
            _this.closeVideoCall();
        };
        connection.oniceconnectionstatechange = function(){
            switch(connection.iceConnectionState) {
                case "closed":
                case "failed":
                case "disconnected":
                    _this.closeVideoCall();
                    break;
            }
        };
        connection.onsignalingstatechange = function(event) {
            switch(connection.signalingState) {
                case "closed":
                    _this.closeVideoCall();
                    break;
            }
        };

        connection.ondatachannel = function(event) {
            var channel = event.channel;
﻿           channel.onopen = function(event) {
                channel.send('Hi back!');
            }
            channel.onmessage = function(event) {
                var data = JSON.parse(event.data);
                console.log(data);
                Receiver.receive(data,function(message){
                    /*let msg = JSON.parse(event.data);
                    if(msg.type =='img'){
                        let imgDom = document.getElementById('img');
                        if(imgDom){
                            imgDom.src = msg.data;
                        }
                    }*/
                    console.log(message.data);
                    if(message.type =='img'){
                        let imgDom = document.getElementById('img');
                        if(imgDom){
                            imgDom.src = message.data;
                        }
                    }
                })

            }
        };
    }

    createOff(){
        let _this =this;
        this.connection.createOffer({
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }).then(function(desc){
            _this.connection.setLocalDescription(desc).then(
                function() {
                    _this.message.sendMessage({
                        type:'offer',
                        data:JSON.stringify(desc),
                        id:_this.id
                    });
                }
            );
        })
    }
    createAnswer(){
        let _this =this;
        this.connection.createAnswer().then(function(desc){
            _this.connection.setLocalDescription(desc).then(
                function() {
                    _this.message.sendMessage({
                        type:'answer',
                        payload:desc,
                        to:_this.masterId
                    });
                }
            );
        })
    }

    closeVideoCall() {
        let remoteVideo = this.el;
        if (this.connection) {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = remoteVideo.srcObject = null;
            }

            this.connection.close();
            this.connection = null;
        }
    }
}

module.exports = SlaveRTC;