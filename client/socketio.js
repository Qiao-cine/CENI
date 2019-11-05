import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001',{forceNew: true});
//socket.emit('trigger event', {start:'hello'} );



// function connectSocket() {
//       socket.emit('trigger event', {start:'hello'} );
//       console.log('socket connected')
// }
//
// function socketOn(String_data_id,data){
//   socket.emit('trigger event', {start:'hello'} );
//   console.log('debug4: socket return message')
//   console.log(String_data_id);
//   socket.on(String_data_id,  (data) => {
//
//
//               console.log('debug2: socket return message')
//               console.log(String_data_id);
//               console.log(data);
//             //  console.log(data.valueof());
//             // console.log(this.state.response);
//           //  return data;
//           });
//         console.log('debug3: socket return message')
//         console.log(data);
//         return data;
// }


export default socket
