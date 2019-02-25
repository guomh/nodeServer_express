/**
 * Created by guominghui on 17/8/11.
 */
class DataChannel{
    constructor(rtcpeerconnection,name){
        this.dc = rtcpeerconnection.createDataChannel(name);
    }

    send(){

    }
}