const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise; // specify using built-in Promise library for mongoose.Promise
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");

