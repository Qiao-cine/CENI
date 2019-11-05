function convertMessage(requestBody,location) {
  var model = {}

 var message = requestBody.split(' ');
  model.networkElement = message[0].substring(location.length,location.length+3)
  model.location = message[0].substring(0, location.length)
  model.port = message[0].substring(location.length+3)
  model.value=message[1]


  console.log(model.value);
//  requestBody.substring(0, location.length-1)

  return model
}
module.exports = {
  convertMessage
}
