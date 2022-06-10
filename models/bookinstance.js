var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: mongoose.SchemaTypes.ObjectId, ref: "book" },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Avilable", "Loaned", "Reserved", "Maintenance"],
    default: "Maintenance",
  },
  due_back: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
