const defaultResponse = (data, status) => ({ data, status });

module.exports = {

  successResponse: (data, status=200) => defaultResponse(data, status),
  errorResponse: (err, status=404) => defaultResponse(err.message, status)

};
