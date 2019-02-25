/**
 * Created by guominghui on 17/3/6.
 */
let Q = require('q');
let pool = require('../model/dbPool');
let sqlModel = {
    get:function(id){
        let defer=Q.defer();
        pool.query({
                sql: 'select * from user where id = ?',
                timeout: 40000, // 40s
            },
            [id],
            function (error, results, fields) {
                if(error) defer.reject(error);
                else defer.resolve(results);
                // error will be an Error if one occurred during the query
                // results will contain the results of the query
                // fields will contain information about the returned results fields (if any)
            }
        );
        return defer.promise;
    },
    create:function(obj){
        let defer=Q.defer();
        pool.query({
                sql: 'INSERT INTO `user` SET ?',
                timeout: 40000, // 40s
            },
            obj,
            function (error, results, fields) {
                if(error) defer.reject(error);
                else defer.resolve(results);
                // error will be an Error if one occurred during the query
                // results will contain the results of the query
                // fields will contain information about the returned results fields (if any)
            }
        );
        return defer.promise;
    },
    update:function(obj){
        let defer=Q.defer();
        pool.query({
                sql: 'UPDATE user SET name = ? ,age=? WHERE id = ?',
                timeout: 40000, // 40s
            },
            [obj.name,obj.age,obj.id],
            function (error, results, fields) {
                if(error){
                    defer.reject(error);
                } else {
                    if(results.changedRows==1){
                        defer.resolve(obj);
                    }else{
                        let error = new Error('row not found');
                        defer.reject(error);
                    }
                }
            }
        );
        return defer.promise;
    },
    delete:function(id){
        let defer=Q.defer();
        pool.query({
                sql: 'delete from user where id = ?',
                timeout: 40000, // 40s
            },
            [id],
            function (error, results, fields) {
                if(error){
                    defer.reject(error);
                } else {
                    if(results.affectedRows==1){
                        defer.resolve(id);
                    }else{
                        let error = new Error('row not found');
                        defer.reject(error);
                    }
                }
            }
        );
        return defer.promise;
    },
    all:function(){
        let defer=Q.defer();
        pool.query({
                sql: 'SELECT * FROM `user`',
                timeout: 40000, // 40s
            },
            function (error, results, fields) {
                if(error) defer.reject(error);
                else defer.resolve(results);
                // error will be an Error if one occurred during the query
                // results will contain the results of the query
                // fields will contain information about the returned results fields (if any)
            }
        );
        return defer.promise;
    }
}
module.exports = sqlModel;