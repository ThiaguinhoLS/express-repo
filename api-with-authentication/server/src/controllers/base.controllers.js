const { successResponse, errorResponse } = require("../utils/response");

module.exports = class {

  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.find({})
      .then(data => {
        return successResponse(data)
      });
  }

  getById(params) {
    return this.model.findById(params.id)
      .then(data => {
        return successResponse(data)
      })
      .catch(err => errorResponse(err));
  }

  create(values) {
    return this.model.create(values)
      .then(data => {
        return successResponse(data, 201);
      })
      .catch(err => errorResponse(err));
  }

  update(params, values) {
    return this.model.findByIdAndUpdate(params.id, values, { new: true })
      .then(data => {
        return successResponse(data);
      })
      .catch(err => errorResponse(err));
  }

  delete(params) {
    return this.model.findByIdAndDelete(params.id)
      .then(data => {
        return successResponse(data, 204)
      })
      .catch(err => errorResponse(err));
  }

}
