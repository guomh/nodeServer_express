/**
 * Created by guominghui on 17/3/1.
 */
exports.success = function(data){
    return {
        errcode:0,
        msg:messageList[0],
        data:data
    }
}
exports.err = function(errorCode,data){
    return {
        errcode:errorCode,
        msg:messageList[errorCode],
        data:data
    }
}
let messageList ={
    0:'success',
    1:'lost params',
    2:'obj not found'
}