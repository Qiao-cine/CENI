
const PerformanceStatus = require('../models/performance-status')
const mongoose = require('mongoose')
const PerformanceStatusService = require('./performance-status-service')
const kafkaService = require('./kafkaService')
var http = require('http');
const sio = require('socket.io')();
var HashMap = require('hashmap');
var clientSocket

//create a new socket here

const kafka = require('kafka-node');

var kafkaMessageMap= new HashMap();
var id_key_map= new HashMap();
var newmap= new HashMap();

const Client = kafka.KafkaClient;
const client = new Client({
        autoConnect: true,
        kafkaHost: 'localhost:9092'
    });
client.on('error',(err) => {
    console.log(err)
})
var Consumer = kafka.Consumer
consumer_ottawa = new Consumer(
       client,
       [{ topic: 'ottawa', partition: 0 }],
       {
        autoCommit: false,
        fromOffset: 'latest'
       }
     );

sio.on('connection', socket => {
  clientSocket = socket
  console.log('#######'+clientSocket)
})

consumer_ottawa.connect();
consumer_ottawa.on('message', async function(message) {
   console.log(
     'kafka-> ',
     message.value
   );
  kafka_model=kafkaService.convertMessage(message.value,"ottawa")
  key=kafka_model.location+"_"+kafka_model.networkElement+"_"+kafka_model.port
  console.log('setting kafka  map:')
  console.log(key)
  console.log(kafka_model.value)
  kafkaMessageMap.set(key , kafka_model.value);
  console.log(kafkaMessageMap.get(key))
//emit
if(clientSocket){
 //console.log('#######'+clientSocket)
 clientSocket.emit(String(key), kafka_model.value);}

 })

consumer_ottawa.on('error', function (err) {
    console.log('Error:',err);
})

consumer_hanover = new Consumer(
  client,
  [{ topic: 'hanover', partition: 0 }],
  {
   autoCommit: false,
   fromOffset: 'latest'
  }
);


consumer_hanover.connect();
consumer_hanover.on('message', async function(message) {
console.log(
'kafka-> ',
message.value
);
kafkaMessage_hanover=message.value
kafkaService.convertMessage(kafkaMessage_hanover,hanover)
})

consumer_hanover.on('error', function (err) {
console.log('Error:',err);
})
// /
// var index=0
// sio.on('connection', socket => {
//     console.log("New client connected");
//     //Here we listen on a new namespace called "incoming data"
//     //socket.on("incoming data", function(){
//         //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//         socket.emit(String(index), { kafkaMessage});
//         socket.on('trigger event', function (data) {
//           console.log(data);
//           setInterval(function(){
//               socket.emit(String(index), kafkaMessage);
//               socket.emit(String(index+1), kafkaMessage+10);
//
//
//           }, 1000);
//         //  socket.emit('news', {kafkaMessage});
//         });
//
//
//     //A special namespace "disconnect" for when a client disconnects
//     socket.on("disconnect", () => console.log("Client disconnected"));
// });




var port = 3001;
sio.listen(port, function() {
    console.log('Node.js server listening on port ' + port);
});


//const kafkaHost = 'localhost:9092';
//const client = new Client({ kafkaHost });

exports.getData = function (req, res) {
    console.log('hello')
    PerformanceStatus.find({}, (err, data) => {
        if (err) return res.status(204).send({ success: false, error: 'could not get all data' })
        return res.status(200).send({ success: true, data: data })
    })
}

exports.addData = function (req, res) {
    // const isUserBodyInValidMsg = await UserService.isUserValidForRegistration(req.body)
    // if (isUserBodyInValidMsg) {
    //   return res.status(400).send({
    //     success: false,
    //     error: isUserBodyInValidMsg,
    //   })
    // }

    let data = PerformanceStatusService.convertBodyToModel(req.body)
    data._id = new mongoose.Types.ObjectId()
    data_id=data._id
    data_key= data.location+"_"+data.networkElement+"_"+data.port

    id_key_map.set(data._id, data_key)

    PerformanceStatus.create(data, (err, performanceStatusData) => {

      if (err) return res.status(400).send({ success: false, error: 'Could not add performance data' })


      res.status(200).send({ success: true, data: performanceStatusData })
    })
    //@Q

    if (data.type=='Real-Time'){
        newmap.set(data_key, data._id)

        //console.log("before connection");
      // sio.on('connection', socket => {
      //     console.log("New client connected");
      //     //Here we listen on a new namespace called "incoming data"
      //     //socket.on("incoming data", function(){
      //         //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
      //       //  console.log(data._id);
      //
      //
      //        socket.emit(String(data_id), kafkaMessageMap.get(data_key));
      //         socket.on('trigger event', function (data) {
      //           setInterval(function(){
      //             console.log(data_id)
      //               socket.emit(String(data_id), kafkaMessageMap.get(data_key));
      //               // console.log("key:")
      //               // console.log(data_id)
      //               // console.log("value:")
      //               // console.log(kafkaMessageMap.get(data_key))
      //             //  socket.emit(String(index+1), kafkaMessage+10);
      //           }, 1000);
      //         //  socket.emit('news', {kafkaMessage});
      //         });
      //
      //
      //     //A special namespace "disconnect" for when a client disconnects
      //     socket.on("disconnect", () => console.log("Client disconnected"));
      // });


      //kafkaService.convertMessage(message,data)

      //setup socket to client
      /*
      var server_socket = http.createServer(function(req, res) {
          //you request handler here
      });

      var io = sio(server_socket);
*/



}

}

exports.deleteData = function (req, res) {
  const { id } = req.params

  PerformanceStatus.deleteOne({ _id: id }, err => {
    if (err) return res.status(204).send({ success: false, error: 'Could not delete data' })
    return res.status(200).send({ success: true })
  })
}

exports.updateData = function (req, res) {
    // const { id } = req.params

    // const isUserBodyInValidMsg = await UserService.isUserNotValidForUpdate(req.body)

    // if (isUserBodyInValidMsg) {
    //   return res.status(400).send({
    //     success: false,
    //     error: isUserBodyInValidMsg,
    //   })
    // }

    // PerformanceStatus.updateOne({ _id: id }, userModel, { new: true }, (err, user) => {
    //   if (err) return res.status(400).send({ success: false, error: 'Could not update user' })
    //   return res.status(200).send({ success: true, data: user })
    // })
}
