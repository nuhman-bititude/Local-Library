var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
});
genreSchema.virtual("url").get(() => {
  return "catalog/genre/" + this._id;
});
module.exports = mongoose.model("Book", GenreSchema);
