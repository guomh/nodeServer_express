/**
 * Created by guominghui on 17/8/7.
 */
let io = require('../node_modules/socket.io-client/dist/socket.io');
let config = require('./config');
class socketMessage{
    constructor(fn){
        this.handelFn = fn;
        this.connect();
    }

    connect(){
        this.socket = io.connect(config.socketServer);
        this.socket.on('message', this.handelFn);

    }

    changeFn(fn){
        this.handelFn = fn;
        this.socket.off('message');
        this.socket.on('message',fn);
    }

    leave(){
        this.socket && this.socket.close();
        this.socket = null;
    }

    sendMessage(msg){
        this.socket.emit('message',msg);
    }

    sendToServer(type,msg){
        this.socket.emit(type,msg);
    }


}

module.exports = socketMessage;