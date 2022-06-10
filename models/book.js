var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "author" },
  summary: { type: String, required: true, minlength: 2 },
  ISBN: { type: String, required: true, minlength: 2 },
  genre: { type: mongoose.SchemaTypes.ObjectId, ref: "author" },
});

module.exports = mongoose.model("Book", BookSchema);
