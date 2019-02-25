/**
 * Created by guominghui on 17/3/6.
 */
let dao  = require('../dao/mysql');
let Q = require('q');
let service = {
    get:function(id){
        return Q(dao.get(id));
    },
    create:function(obj){
        return Q(dao.create(obj));
    },
    update:function(obj){
        return Q(dao.update(obj));
    },
    delete:function(id){
        return Q(dao.delete(id));
    },
    all:function(){
        return Q(dao.all());
    }
}
module.exports = service;