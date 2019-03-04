const BaseController = require("./base.controllers");
const Messages = require("../models/messages.models");
const { successResponse, errorResponse } = require("../utils/response");

class MessagesController extends BaseController {

  getMessagesWithUsers() {
    return this.model.find({}).populate("author", "username")
      .then(data => successResponse(data))
      .catch(err => errorResponse(err));
  }

  getMessagesFromUser(userId) {
    return this.model.find({ author: userId })
      .then(data => successResponse(data))
      .catch(err => errorResponse(err));
  }

}

module.exports = new MessagesController(Messages);
