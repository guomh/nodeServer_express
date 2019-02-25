function TextReceiver() {
    var content = {};

    function receive(data, onmessage, userid) {
        // uuid is used to uniquely identify sending instance
        var uuid = data.uuid;
        if (!content[uuid]) {
            content[uuid] = [];
        }

        content[uuid].push(data.message);
        if (data.last==1) {
            var message = content[uuid].join('');
            if (data.isobject==1) {
                message = JSON.parse(message);
            }

            // latency detection
            var receivingTime = new Date().getTime();
            var latency = receivingTime - data.sendingTime;

            onmessage(message, userid, latency);

            delete content[uuid];
        }
    }

    return {
        receive: receive
    };
}

module.exports = TextReceiver();
