var mongoose = require("mongoose");

const bookInstanceSchema = new mongoose.Schema({
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

bookInstanceSchema.virtual("url").get(() => {
  return "catalog/bookinstance/" + this._id;
});

module.exports = ("bookInstance", bookInstanceSchema);
