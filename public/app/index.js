/**
 * Created by guominghui on 17/8/4.
 */
let SlaveRTC = require('./SlaveRTC.js');
let MasterRTC = require('./MasterRTC');
let Drawer = require('./canvas');
let getId = require('./id.js');
window.onload = function(){
    let videoDomSelf = document.querySelector('#self');
    //let videoDomOther = document.querySelector('#other');
    let self;
    let masterbtn = document.querySelector('#masterbtn');
    let slavebtn = document.querySelector('#slavebtn');
    let closebtn = document.querySelector('#closebtn');
    let printbtn = document.querySelector('#printbtn');
    let drawbtn = document.querySelector('#drawbtn');
    let clearbtn = document.querySelector('#clearbtn');
    masterbtn.onclick = function(){
        if(self instanceof MasterRTC){
            return;
        }
        let slave = self.updateToMaster();
        self = new MasterRTC(videoDomSelf,slave);
        self.createConnections();
        //self.initVideo();
    }
    slavebtn.onclick = function(){
        self = new SlaveRTC(videoDomSelf);
        //self.initVideo();
    }
    closebtn.onclick = function(){
        self && self.closeVideoCall();
        //self.initVideo();
    }
    printbtn.onclick = function(){
        var video = document.getElementById("self");//获取前台要截图的video对象，
        var canvas = document.getElementById('canvas');//获取前台的canvas对象，用于作图
        var ctx = canvas.getContext('2d');//设置canvas绘制2d图，
        var width = 480;//设置canvas宽
        var height = 270;//设置canvas高
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(video, 0, 0, width, height);//将video视频绘制到canvas中
        //self.initVideo();
        var images = canvas.toDataURL('image/png');
        self.drawImg(images);
    }
    var canvas = document.getElementById('drawcanvas');
    let drawer = new Drawer({dom:canvas,width:200,height:200});
    drawbtn.onclick = function(){
        drawer.init();
        var type =[{
            color:'#f00',
            lineWidth:4
        },{
            color:'#0f0',
            lineWidth:6
        },
            {
                color:'#00f',
                lineWidth:8
            }];
        var times = 0;
        setInterval(function(){
            var obj = type[times%3];
            times++;
            drawer.changeColor(obj.color);
            drawer.changeWidth(obj.lineWidth);
        },2000)
    }
    clearbtn.onclick = function(){
        console.log(drawer.toImg().length);
        drawer.clear();
    }

}
