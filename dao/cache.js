/**
 * Created by guominghui on 17/3/1.
 */
let cache = {},id=1,length = 0;
let cacheModel = {
    get:function(id){
        return cache[id];
    },
    create:function(obj){
        cache[id] = obj;
        obj.id = id;
        id++;
        length++;
        return obj;
    },
    update:function(obj){
        if(cache[obj.id]){
            cache[obj.id] = obj;
            return obj;
        }
    },
    delete:function(id){
        if(cache[id]){
            let obj = cache[id];
            delete cache[id];
            length--;
            return obj;
        }
    },
    all:function(){
        return cache;
    }
}
module.exports = cacheModel;