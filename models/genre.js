var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
});

module.exports = mongoose.model("Genre", GenreSchema);
