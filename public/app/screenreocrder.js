/**
 * Created by guominghui on 17/8/17.
 */
/*
let html2canvas = require('./screenshot');
*/
let RecordRTC = require('./RecordRTC');

var isRecordingStarted = false;
var isStoppedRecording = false;

var rc = {
    start:function(){
        isStoppedRecording = false;
        isRecordingStarted = true;
       // this.recorder.startRecording();
    },
    stop:function() {
        isStoppedRecording = true;
        let _this = this;
       /* this.recorder.stopRecording(function () {

            // or manually:
            _this.recorder.save('filename.webm');
        });*/
    },
    init:function(id){
        var elementToShare = document.getElementById(id);
        var canvas2d = document.createElement('canvas');
        var context = canvas2d.getContext('2d');

        canvas2d.width = elementToShare.clientWidth;
        canvas2d.height = elementToShare.clientHeight;

        canvas2d.style.top = 0;
        canvas2d.style.left = 0;
        canvas2d.style.zIndex = -1;
        (document.body || document.documentElement).appendChild(canvas2d);
        (function looper() {
            if(!isRecordingStarted) {
                return setTimeout(looper, 500);
            }

            html2canvas(elementToShare, {
                grabMouse: true,
                onrendered: function(canvas) {
                    context.clearRect(0, 0, canvas2d.width, canvas2d.height);
                    context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

                    if(isStoppedRecording) {
                        return;
                    }

                    requestAnimationFrame(looper);
                }
            });
        })();
        this.recorder = new RecordRTC(canvas2d, {
            type: 'canvas'
        });
    }
}
module.exports = rc;