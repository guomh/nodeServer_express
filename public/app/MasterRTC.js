/**
 * Created by guominghui on 17/8/4.
 */
const Message = require('./socketMessage');
const util = require('./util');
const Sender = require('./TextSender');
const RecordRTC = require('./RecordRTC');
const Receiver = require('./TextReceiver');
const screen = require('./screenreocrder');
class MasterRTC {
    constructor(el,slave){
        this.id = slave.id;
        this.el = el;
        this.message = slave.message;
        this.others = slave.others||[];
        this.initMsg();

        this.pcs = {};
    }

    initMsg(){
        this.message.changeFn(this.handleMessage());
        this.message.sendToServer('updatemaster');
    }

    initVideo(){
        let _this = this;
        return navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: { min: 200,  max: 200 },
                height: { min: 200,  max: 200 }
            }
        })
    }
    handleMessage() {
        let _this = this;
        return function(msg){
            console.log(msg.type,msg.from);
            var type = msg.type;
            let connection,data;
            switch (type) {
                case 'offer':
                    msg.desc = msg.data;
                    _this.connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then().catch(function(e) {
                        console.log(e);
                    });
                    _this.createAnswer();
                    break;
                case 'answer':
                    if(msg.payload){
                        data = msg.payload;
                    }
                    connection = _this.pcs[msg.from];
                    if(connection){
                        connection.setRemoteDescription(new RTCSessionDescription(data)).then().catch(function(e) {
                            console.log(e);
                        });
                    }
                    break;
                case 'candidate':

                    data = msg.payload&&{
                            sdpMLineIndex: msg.payload.label,
                            sdpMid: msg.payload.id,
                            candidate: msg.payload.candidate
                        };

                    if(data){
                        let candidate = new RTCIceCandidate(data);
                        connection = _this.pcs[msg.from];
                        if(connection){
                            connection.addIceCandidate(candidate).then(function(){

                            }).catch(function(e) {
                                console.log(e);
                            });
                        }

                    }

                    break;
                case 'other':
                    if(msg.data){
                        _this.others =msg.data;

                    }
                    break;
                case 'otherjoin':
                    _this.others.push(msg.data);
                    console.log(_this.others);
                    if(_this.isStart){
                        _this.pcs[msg.data]=_this.createConnection(msg.data);
                    }
                    break;
                case 'otherleave':
                    let i = _this.others.indexOf(msg.data);
                    if(i>-1){
                        _this.others.splice(i,1);
                        if(_this.isStart){
                            _this.closeConnection(msg.data);
                        }
                    }

                    console.log(_this.others);
                    break;
            }
        }

    }

    createConnections(){
        this.isStart = true;
        let _this = this;
        this.initVideo().then(function(stream){
            _this.el.srcObject = stream;
            _this.stream = stream;
            for(let i=0,l=_this.others.length;i<l;i++){
                _this.pcs[_this.others[i]] = _this.createConnection(_this.others[i]);
            }
            /*screen.init('container');
            screen.start();
            setTimeout(function(){
                screen.stop();
            },5000);*/
            /*_this.recorder = RecordRTC([stream,document.getElementById('drawcanvas')],{
                type:'video',
                recorderType: RecordRTC.MediaStreamRecorder,
                numberOfAudioChannels: 1
            });
            _this.recorder.startRecording();
            setTimeout(function(){
                _this.recorder.stopRecording(function() {

                    // or manually:
                    _this.recorder.save('filename.webm');
                });
            },5000);*/
        }).catch(function(e) {
            console.log(e);
            function handleGetUserMediaError(e) {
                switch(e.name) {
                    case "NotFoundError":
                        alert("Unable to open your call because no camera and/or microphone" +
                            "were found.");
                        break;
                    case "SecurityError":
                    case "PermissionDeniedError":
                        // Do nothing; this is the same as the user canceling the call.
                        break;
                    default:
                        alert("Error opening your camera and/or microphone: " + e.message);
                        break;
                }

                // closeVideoCall();
            }
        });
        ;

    }

    initDataChannel(pc){
        return;
        var dc = pc.createDataChannel("my channel");

        dc.onmessage = function (event) {
            console.log(event.data);
            var data = JSON.parse(event.data);

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
        };

        dc.onopen = function () {
            console.log("datachannel open");
        };

        dc.onclose = function () {
            console.log("datachannel close");
            dc = null;
        };
        pc.dc = dc;
    }

    drawImg(img){
        for(let i in this.pcs){
            if(this.pcs.hasOwnProperty(i)&&this.pcs[i].dc){
                let o = {type:'img',data:img};
                console.log(o.length);
                Sender.send({
                    channel:this.pcs[i].dc,
                    text:o,
                    chunkSize:5000,
                    chunkInterval:10
                })
                //this.pcs[i].dc.send(o);
            }
        }
    }

    createConnection(id){
        let _this =this;
        let connection = new RTCPeerConnection();
        _this.initDataChannel(connection);
        connection.onicecandidate = function(e) {
            if(!e.candidate||!e.candidate.sdpMid){
                return;
            }
            _this.message.sendMessage({
                to:id,
                type:'candidate',
                payload:{
                    label: e.candidate&&e.candidate.sdpMLineIndex,
                    id: e.candidate&&e.candidate.sdpMid,
                    candidate: e.candidate&&e.candidate.candidate
                },
            });
        };

        connection.onnegotiationneeded = function(){
            connection.createOffer({
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            }).then(function(desc){
                connection.setLocalDescription(desc).then(
                    function() {
                        _this.message.sendMessage({
                            type:'offer',
                            payload:desc,
                            to:id
                        });
                    }
                );
            });
            connection.onnegotiationneeded = function(){};
        };
        connection.onremovestream = function(){
            _this.closeConnection(id);
        };
        connection.oniceconnectionstatechange = function(){
            switch(connection.iceConnectionState) {
                case "closed":
                case "failed":
                case "disconnected":
                    _this.closeConnection(id);
                    break;
            }
        };
        connection.onsignalingstatechange = function(event) {
            switch(connection.signalingState) {
                case "closed":
                    _this.closeConnection(id);
                    break;
            }
        };

        connection.ondatachannel = function(event) {
            var channel = event.channel;
            channel.onopen = function(event) {
                channel.send('Hi back!');
            }
            channel.onmessage = function(event) {
                var data = JSON.parse(event.data);
                console.log(data);

            }
        };

        _this.stream.getTracks().forEach(
            function(track) {
                connection.addTrack(
                    track,
                    _this.stream
                );
            }
        );
        /*setTimeout(function(){
            _this.stream.getTracks().forEach(
                function(track) {
                    connection.addTrack(
                        track,
                        _this.stream
                    );
                }
            );
            connection.createOffer({
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            }).then(function(desc){
                connection.setLocalDescription(desc).then(
                    function() {
                        _this.message.sendMessage({
                            type:'offer',
                            data:JSON.stringify(desc),
                            to:id
                        });
                    }
                );
            });

        },1000)*/

        return connection;
    }

    initRTCPeerConnection(){
        let _this = this;
        let connection = this.connection;
        connection.onicecandidate = function(e) {
            _this.message.sendMessage({
                type:'candidate',
                data:JSON.stringify(e.candidate),
            });
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
                        to:_this.id
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
                        data:JSON.stringify(desc),
                        to:_this.id
                    });
                }
            );
        })
    }

    closeVideoCall() {
        let remoteVideo = this.el;
        if (this.isStart) {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream =remoteVideo.srcObject = null;
            }

            for(let i in this.pcs){
                if(this.pcs.hasOwnProperty(i)){
                    this.closeConnection(i);
                }
            }

            this.pcs= {};
        }
    }

    closeConnection(id){
        let connection = this.pcs[id];
        if(connection){
            connection.close();
            connection = null;
            delete this.pcs[id];
        }

    }
}

module.exports = MasterRTC;