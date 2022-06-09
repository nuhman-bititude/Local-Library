var mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, minlength: 3 },
  family_name: { type: String, required: true, minlength: 2 },
  date_of_birth: { type: Date, required: true },
  date_of_death: { type: Date, required: true },
});

authorSchema.virtual("name").get(() => {
  fullname = "";
  if (this.first_name && this.family_name) {
    fullname = first_name + " " + family_name;
  }
  if (this.first_name & !this.family_name) {
    fullname = first_name;
  }
  return fullname;
});

authorSchema.virtual("lifespan").get(() => {
  var lifespan = "";
  if (this.date_of_birth) {
    lifespan += this.date_of_birth.getYear().toString();
  }
  if (this.date_of_death) {
    lifespan += " - ";
    lifespan += this.date_of_death.getYear().toString();
  }
  return lifespan;
});

authorSchema.virtual('url').get(()=>{
    return "/catlog/author/"+this._id;
})

module.exports = ('author',authorSchema);
