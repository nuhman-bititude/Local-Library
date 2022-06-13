var BookInstance = require("../models/bookinstance");
var path = require("path");

exports.authorCreateForm = (req, res, next) => {
  // console.log(path.resolve("public/createAuthor.html"))
  res.sendFile(path.resolve("public/createAuthor.html"));
};
