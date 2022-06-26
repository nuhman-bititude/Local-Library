var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String,  minLength: 2 },
  family_name: { type: String,  minLength: 2 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

module.exports = mongoose.model("Author", AuthorSchema);
