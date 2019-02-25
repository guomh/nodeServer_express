/**
 * Created by guominghui on 17/8/4.
 */
const Message = require('../socketMessage');

class RTC2 {
    constructor(el,isMaster=false){
        this.el = el;
        this.message = new Message(this.handleMessage());
        this.others = [];
        //this.initMsg();
        this.isMaster = isMaster;
        this.pcs = {};
    }

    initMsg(){
        this.message.changeFn(this.handleMessage());
        this.message.sendToServer('updateMaster');
    }

    initVideo(){
        let mediaObj = {
            audio:true,
            video:this.isMaster?true:false
        };
        return navigator.mediaDevices.getUserMedia(mediaObj);
    }

    handleMessage() {
        let _this = this;
        return function(msg){
            console.log(msg.type,msg.from);
            var type = msg.type;
            let connection;
            switch (type) {
                case 'offer':
                    msg.desc = JSON.parse(msg.data);
                    _this.connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then().catch(function(e) {
                        console.log(e);
                    });
                    _this.createAnswer();
                    break;
                case 'answer':
                    msg.desc = JSON.parse(msg.data);
                    connection = _this.pcs[msg.from];
                    if(connection){
                        connection.setRemoteDescription(new RTCSessionDescription(msg.desc)).then().catch(function(e) {
                            console.log(e);
                        });
                    }
                    break;
                case 'icecandidate':
                    msg.candidate = JSON.parse(msg.data);
                    if(msg.candidate){
                        let candidate = new RTCIceCandidate(msg.candidate);
                        connection = _this.pcs[msg.from];
                        if(connection){
                            connection.addIceCandidate(candidate).then(function(){
                                console.log(candidate);
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
        }).catch(function(e) {
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

    createConnection(id){
        let _this =this;
        let connection = new RTCPeerConnection();
        connection.onicecandidate = function(e) {
            _this.message.sendMessage({
                to:id,
                type:'icecandidate',
                data:JSON.stringify(e.candidate),
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
                            data:JSON.stringify(desc),
                            to:id
                        });
                    }
                );
            });
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
        console.log(this.pcs);
    }
}

module.exports = RTC2;