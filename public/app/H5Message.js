
/**
 * Created by guominghui on 17/8/4.
 */
//let Message = require('./Message');
class H5Message{
    constructor(fn){
        window.addEventListener("message",fn);
    }

    sendMessage(msg){
        window.postMessage(msg,'*');
    }


}

module.exports = H5Message;