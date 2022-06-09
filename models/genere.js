var mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
});

genreSchema.virtual("url").get(() => {
  return "catalog/genre/" + this._id;
});

module.exports = ('genre',genreSchema);
