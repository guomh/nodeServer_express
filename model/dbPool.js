/**
 * Created by guominghui on 17/3/6.
 */
let config = require('config-lite');
let mysql = require('mysql');
let pool  = mysql.createPool(config.db);
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});
pool.on('connection', function (connection) {
    console.log('create connection');
});
module.exports = pool;