
const PerformanceStatus = require('../models/performance-status')
const mongoose = require('mongoose')
const PerformanceStatusService = require('./performance-status-service')
const kafkaService = require('./kafkaService')
var http = require('http');
const sio = require('socket.io')();


var kafkaMessage;
const kafka = require('kafka-node');

const Client = kafka.KafkaClient;
const client = new Client({
        autoConnect: true,
        kafkaHost: 'localhost:9092'
    });
client.on('error',(err) => {
    console.log(err)
})
var Consumer = kafka.Consumer
     consumer = new Consumer(
       client,
       [{ topic: 'test', partition: 0 }],
       {
        autoCommit: false,
        fromOffset: 'latest'
       }
     );


consumer.connect();
consumer.on('message', async function(message) {
   console.log(
     'kafka-> ',
     message.value
   );
  kafkaMessage=message.value
  kafkaService.convertMessage(kafkaMessage)
 })

consumer.on('error', function (err) {
    console.log('Error:',err);
})

sio.on('connection', socket => {
    console.log("New client connected");
    //Here we listen on a new namespace called "incoming data"
    //socket.on("incoming data", function(){
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        socket.emit('news', { kafkaMessage});
        socket.on('trigger event', function (data) {
          console.log(data);
          setInterval(function(){
              socket.emit('news', kafkaMessage);
          }, 1000);
        //  socket.emit('news', {kafkaMessage});
        });


    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});




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


    PerformanceStatus.create(data, (err, performanceStatusData) => {

      if (err) return res.status(400).send({ success: false, error: 'Could not add performance data' })

      res.status(200).send({ success: true, data: performanceStatusData })
    })
    //@Q
    if (data.type=='Real-Time'){
      console.log(data.networkElement);
      console.log(data.location);
      console.log(data.port);
      console.log(data.direction);

      console.log(kafkaMessage);
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
