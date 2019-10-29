import openSocket from 'socket.io-client';


function connectSocket(cb) {
  //@q
  //var getData={}
const socket = openSocket('http://localhost:3001');
/*
  socket.emit('incoming data');
  socket.on("outgoing data", this.getData );
  */
  socket.emit('trigger event', {start:'hello'} );

  socket.on('news', response => cb(response));
//  socket.on('news', function (data) {
   console.log(response);
  //  response=
  //  this.updateResponse(data);
    //this.setState((state,props)=>({value: data,}));

//  });
  //  socket.emit('my other event', { my: 'data' });
  //});
}
export { connectSocket }
