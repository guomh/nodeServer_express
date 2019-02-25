/**
 * Created by guominghui on 17/8/11.
 */
let util = {
    getBytesLength:function(str) {
// 在GBK编码里，除了ASCII字符，其它都占两个字符宽
        return str.replace(/[^\x00-\xff]/g, 'xx').length;
    },
    ab2str:function(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    },

    str2ab:function(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },
    getRandomString: function () {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '-');
    }
}

module.exports = util;