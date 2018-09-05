// use this error handler to return a nicely-formatted object
// make it a standard way to respond to an error
function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong."
    }
  });
}

module.exports = errorHandler;
