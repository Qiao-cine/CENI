function convertBodyToModel(requestBody) {
    var model = {}


    toTime: String,
    model.networkElement = requestBody.networkElement.trim()
    model.location = requestBody.location.trim()
    model.port = requestBody.port.trim()
    model.direction = requestBody.direction.trim()
    model.type = requestBody.type.trim()
    model.fromTime = requestBody.fromTime ? requestBody.fromTime : ''
    model.toTime = requestBody.toTime ? requestBody.toTime : ''

    return model
  }

export { convertBodyToModel }
  
