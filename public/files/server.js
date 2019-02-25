/**
 * Created by guominghui on 17/2/24.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
let fs = require('fs');
let app = connect();
let ss = serveStatic('./public');
let a = function(req,res,next){
    console.log(req.originalUrl);
    fs.readFile(__dirname+req.url, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data.byteLength);
    });
    next();
}
app.use(a);
app.use('/public',ss);

app.listen(3000);