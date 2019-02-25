var express = require('express');
var router = express.Router();
var service = require('../service/userService');
let multiparty = require('multiparty');
let fs = require('fs');
let msg = require('../model/responseMSG');
/* GET users listing. */
router.use(function(req, res, next){
    res.append('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","content-type,Content-Type");
    next();
});
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    if(!id){
        res.json();
    }
    let obj = service.get(id);
    if(obj){
        res.json(obj);
    }
});
router.post('/create', function(req, res, next) {
    let obj = req.body;
    if(obj){
        service.create(obj).then(function(data){
            obj.id = data.insertId;
            res.json(msg.success(obj));
        }).catch(function(err){
            console.log(err);
        })
    }else{
        res.json(msg.err(1));
    }
});

router.post('/update', function(req, res, next) {
    let obj = req.body;
    if(obj){
        service.update(obj).then(function(data){
            res.json(msg.success(obj));
        }).catch(function(err){
            res.json(msg.err(2));
        })
    }else{
        res.json(msg.err(1));
    }
});
router.post('/delete', function(req, res, next) {
    let id = req.body.id;
    if(id){
        service.delete(id).then(function(data){
            res.json(msg.success(id));
        }).catch(function(err){
            res.json(msg.err(2));
        })
    }else{
        res.json(msg.err(1));
    }
});
router.post('/all', function(req, res, next) {
    console.log(req.body);
    service.all().then(function(data){
        res.json(msg.success(data));
    }).catch(function(err){
        console.log(err);
    })

});
router.post('/upload', function(req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        console.log(files);
        if(err){
                   console.log('parse error: ' + err);
         } else {
          var inputFile = files['f'];
            if(inputFile&&inputFile.length){
                for(var i=0,l=inputFile.length;i<l;i++){
                    var uploadedPath = inputFile[i].path;
                    var dstPath = '../public/files/' + inputFile[i].originalFilename;
                    fs.rename(uploadedPath, dstPath, function(err) {
                        if(err){
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                }
                }
            }

           //重命名为真实文件名

        res.json(msg.success('ok'));
    });

});
module.exports = router;
