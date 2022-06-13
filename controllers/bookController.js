var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
function findAuthors() {
  Author.find().exec((err, all_authors) => {
    if (err) {
      console.log(err);
      return err;
    }
    // console.log(typeof all_authors);
    return all_authors;
  });
}
function findGenres() {
  Genre.find().exec((err, all_genre) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(all_genre);
    return all_genre;
  });
}

exports.bookCreateForm = (req, res, next) => {
  var authors = findAuthors();
  console.log(authors);
  var genres = findGenres();
  // res.render("createBook", {});
};
