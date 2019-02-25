/**
 * Created by guominghui on 17/8/4.
 */
const Message = require('./socketMessage');

class RTC {
    constructor(id,el,isMaster = false){
        this.id = id;
        this.el = el;
        this.connection = new RTCPeerConnection();
        this.message = new Message(this.handleMessage());
        this.isMaster = isMaster;
    }

    initVideo(){
        let _this = this;
        if(this.isMaster){
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(function(stream){
                _this.el.srcObject = stream;
                stream.getTracks().forEach(
                    function(track) {
                        _this.connection.addTrack(
                            track,
                            stream
                        );
                    }
                );
            }).catch(function(e) {
                console.log(e);
            });
        }else{
            this.connection.ontrack = function(e){
                _this.el.srcObject = e.streams[0];
            }
        }




    }
    handleMessage() {
        let _this = this;
        return function(msg){
            console.log(msg);
            var type = msg.type;
            switch (type) {

                case 'offer':
                    msg.desc = JSON.parse(msg.data);
                    _this.connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then();
                    _this.createAnswer();
                    break;
                case 'answer':
                    msg.desc = JSON.parse(msg.data);
                    _this.connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then();
                    break;
                case 'icecandidate':
                    msg.candidate = JSON.parse(msg.data);
                    _this.connection.addIceCandidate(msg.candidate).then(function(){
                        console.log(msg.candidate);
                    }).catch(function(e) {
                        console.log(e);
                    });
                    break;
            }
        }

    }
    initRTCPeerConnection(){
        let _this = this;
        let connection = this.connection;
        connection.onicecandidate = function(e) {
            _this.message.sendMessage({
                type:'icecandidate',
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
                        data:JSON.stringify(desc),
                        id:_this.id
                    });
                }
            );
        })
    }
}

module.exports = RTC;