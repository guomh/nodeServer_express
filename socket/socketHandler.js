module.exports = function(io, streams) {
  let room = 'room1',masterId;
  io.on('connection', function(client) {
    console.log('-- ' + client.id + ' joined --');
    client.join(room);
    client.emit('message',{type:'id',data: client.id,masterId:masterId});
    setInterval(function(){
      client.emit('a','aaa');
      client.emit('b','bbb');
    },2000);
    client.on('a',function(data){
      client.emit('a',data);
    });
    client.on('b',function(data){
      client.emit('b',data);
    });
    // to multiple rooms
    let keys = [];
    for(let i in io.sockets.connected){
      if(io.sockets.connected.hasOwnProperty(i)){
        if(client.id != i){
          keys.push(i);
        }
      }
    }
    client.emit('message',{type:'other',data:keys});
    client.to(room).emit('message', {type:'otherjoin',data:client.id});
    client.on('message', function (details) {
      console.log(details.type);
      var otherClient = io.sockets.connected[details.to];

      if (!otherClient) {
        return;
      }

        delete details.to;
        details.from = client.id;
        otherClient.emit('message', details);
    });
      
    client.on('readyToStream', function(options) {
      console.log('-- ' + client.id + ' is ready to stream --');
      
      streams.addStream(client.id, options.name);
    });
    
    client.on('update', function(options) {
      streams.update(client.id, options.name);
    });

    client.on('updatemaster',function() {
      masterId = client.id;
      client.to(room).emit('message', {type:'newmaster',data:client.id});
    });

    function leave() {
      console.log('-- ' + client.id + ' left --');
      client.to(room).emit('message',{type:'otherleave',data:client.id});
      streams.removeStream(client.id);

    }

    client.on('disconnect', leave);
    client.on('leave', leave);
  });
};