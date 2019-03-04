const BaseController = require("./base.controllers");
const Users = require("../models/users.models");
const { successResponse, errorResponse } = require("../utils/response");

class UsersController extends BaseController {
 
  getByUsername(params) {
    return this.model.findOne({ username: params.username })
      .then(data => successResponse(data))
      .catch(err => errorResponse(err));
  }

};

module.exports = new UsersController(Users);
