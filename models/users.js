var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: { type: String, required: true, minlength: 3 },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UsersSchema);
