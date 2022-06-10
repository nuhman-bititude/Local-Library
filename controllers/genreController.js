var Genre = require("../models/genre");
var path = require("path");

exports.genreCreateForm = (req, res, next) => {
  // console.log(path.resolve("public/createGenre.html"))
  res.sendFile(path.resolve("public/createGenre.html"));
};

exports.genreCreatePost = (req, res, next) => {
  // console.log(typeof(Author))
  var genre = new Genre({
    name: req.body.genre_name,
  });
  genre.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send(genre + "<br>inserted");
  });
};

exports.genreFetchAll = (req, res, next) => {
  Genre.find().exec((err, all_genre) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(all_genre);
  });
  // console.log(authors)
};

exports.genreFetchOne = (req, res, next) => {
  id = req.params.id;
  Genre.findOne({ _id: id }).exec((err, genre) => {
    if (err) {
      console.log(err);
      res.error(err);
      return;
    }
    res.json(genre);
  });
};

exports.genreDeleteForm = (req, res, next) => {
  id = req.params.id;
  // console.log(id)
  Genre.findOne({ _id: id }).exec((err, genre) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.render("deleteGenre", {
      id: genre._id,
      genre_name: genre.name,
    });
  });
};

exports.genreDeletePost = (req, res, next) => {
  id = req.params.id;
  try {
    Genre.remove({ _id: id }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Deleted");
        console.log("Result :", result);
      }
    });
  } catch (error) {
    res.send(error);
  }
};

exports.genreUpdateForm = (req, res, next) => {
  id = req.params.id;
  Author.findOne({ _id: id }).exec((err, author) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    // console.log(author)
    // console.log();
    res.render("updateAuthor", {
      id: author._id,
      first_name: author.first_name,
      family_name: author.family_name,
      date_of_birth: setdate(author.date_of_birth),
      date_of_death: setdate(author.date_of_death),
    });
  });
};
