let util = require('./util');
let TextSender = {
    send: function(config) {
        var channel = config.channel;
        var initialText = config.text;
        var packetSize = config.chunkSize || 1000;
        var textToTransfer = '';
        var isobject = '0';

        if (typeof initialText !== 'string') {
            isobject = '1';
            initialText = JSON.stringify(initialText);
        }

        // uuid is used to uniquely identify sending instance
        var uuid = util.getRandomString();
        var sendingTime = new Date().getTime();

        sendText(initialText);

        function sendText(textMessage, text) {
            var data = {
                type: 'text',
                uuid: uuid,
                sendingTime: sendingTime
            };

            if (textMessage) {
                text = textMessage;
                data.packets = parseInt(text.length / packetSize);
            }

            if (text.length > packetSize) {
                data.message = text.slice(0, packetSize);
                data.last = '0';
                data.isobject = isobject;
            } else {
                data.message = text;
                data.last = '1';
                data.isobject = isobject;
            }
            if (channel.readyState === 'open') {
                channel.send(JSON.stringify(data));
            }
            textToTransfer = text.slice(data.message.length);

            if (textToTransfer.length) {
                setTimeout(function() {
                    sendText(null, textToTransfer);
                }, config.chunkInterval || 100);
            }
        }
    }
};

module.exports = TextSender;
