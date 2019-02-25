/**
 * Created by guominghui on 17/8/8.
 */
var fs = require('fs');
let app = require('./app');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ca/private.pem', 'utf8');
var certificate = fs.readFileSync('./ca/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var stream = require('./service/streams.js')();
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 8542;

httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

var io = require('socket.io').listen(httpsServer);

require('./socket/socketHandler.js')(io,stream);