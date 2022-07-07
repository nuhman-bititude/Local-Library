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
});

auth = UsersSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ id: this._id }, process.env.JWTPRIVATEKET, {
    expiresIn: "1d",
  });
  return token;
};
module.exports = auth;
module.exports = mongoose.model("Users", UsersSchema);
