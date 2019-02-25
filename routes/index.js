var express = require('express');
var router = express.Router();
let fs = require('fs');
/* GET home page. */
router.param('id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE');
    next();
});

router.get('/txt', function(req, res, next) {
    console.log(__dirname+'/a.txt');

    var pathA = __dirname+'/a.txt';
    /*res.attachment(pathA);
    const reader = fs.createReadStream(pathA,{
        flags: 'r',
        encoding: null,
        fd: null,
        mode: 0o666,
        autoClose: true
    });
    reader.on('data', (chunk) => {
        res.write(chunk);
    });
    reader.on('end',() =>{
        res.end();
    });*/
    res.download(pathA, 'bbb.txt', function(err){
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            console.log(err);
        } else {
            // decrement a download credit, etc.
        }
    });
});
router.get('/', function(req, res, next) {
    console.log(req.params.id);
    res.append('Warning', '199 Miscellaneous warning');
    res.render('index', { title: 'Express' });
});
router.get('/cookie', function(req, res, next) {
    console.log(req.cookies);
    res.cookie('name', 'tobi', {httpOnly:true});
    res.cookie('age', '22');
    res.end();
});

module.exports = router;
