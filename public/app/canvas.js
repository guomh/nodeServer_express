/**
 * Created by guominghui on 17/8/15.
 */
class Drawer{
    constructor(config){
        this.dom = config.dom;
        this.config = config;
    }
    init(){
        let canvas = this.dom;
        if (canvas.getContext) {
            //支持
            this.ctx = canvas.getContext('2d');
            // drawing code here
        } else {
            //不支持
            // canvas-unsupported code here
            console.log("canvas-unsupported code here");
        }

        this.width = canvas.width = this.config.width;
        this.height = canvas.height = this.config.height;
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        this.ctx.lineWidth = this.config.lineWidth||4;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.strokeStyle = this.config.color||"#f00";
        let ctx = this.ctx;
        let x = 0;
        let y = 0;
        function draw(e) {
            if (!isDrawing) return;
            x = e.offsetX;
            y = e.offsetY;
            //		控制绘制路径
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
        }
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    }
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    changeWidth(lineWidth){
        if(lineWidth && typeof lineWidth == 'number' && lineWidth > 0){
            this.ctx.lineWidth = lineWidth;
        }
    }
    changeColor(color){
        if(color){
            this.ctx.strokeStyle = color;
        }
    }
    destroy(){
        let canvas = this.dom;
        canvas.removeEventListener('mousemove');
        canvas.removeEventListener('mousedown');
        canvas.removeEventListener('mouseup');
        canvas.removeEventListener('mouseout');
    }
    toImg(){
        return this.dom.toDataURL('image/png');
    }
}

module.exports = Drawer;
