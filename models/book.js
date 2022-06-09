var mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "author" },
  summary: { type: String, required: true, minlength: 2 },
  ISBN: { type: String, required: true, minlength: 2 },
  genre: { type: mongoose.SchemaTypes.ObjectId, ref: "author" },
});
bookSchema.virtual("url").get(() => {
  return "/catlog/book/" + this._id;
});
module.exports = ("book", bookSchema);
