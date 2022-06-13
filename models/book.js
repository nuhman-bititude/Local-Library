var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: String, required: true, minlength: 3 },
  summary: { type: String, required: true, minlength: 2 },
  ISBN: { type: String, required: true, minlength: 2 },
  genre: { type: String, required: true, minlength: 3 },
});

module.exports = mongoose.model("Book", BookSchema);
