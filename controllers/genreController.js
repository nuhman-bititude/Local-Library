var Genre = require("../models/genre");
var path = require("path");

exports.genreCreateForm = (req, res, next) => {
  // console.log(path.resolve("public/createGenre.html"))
  res.sendFile(path.resolve("public/createGenre.html"));
};

exports.genreCreatePost = (req, res, next) => {
  // console.log(typeof(Author))
  try {
    var genre = new Genre({
      name: req.body.genre_name,
    });
    genre.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(genre + "<br>inserted");
    });
  } catch (error) {
    res.render("error", { error: error });
  }
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
  try {
    Genre.findOne({ _id: id }).exec((err, genre) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.json(genre);
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.genreDeleteForm = (req, res, next) => {
  id = req.params.id;
  // console.log(id)
  try {
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
  } catch (error) {
    res.render("error", { error: error });
  }
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
    res.send(error, { error: error });
  }
};

exports.genreUpdateForm = (req, res, next) => {
  id = req.params.id;
  try {
    Genre.findOne({ _id: id }).exec((err, genre) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      // console.log(author)
      // console.log();
      res.render("updateGenre", {
        id: genre._id,
        genre_name: genre.name,
      });
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};
exports.genreUpdatePost = (req, res, next) => {
  id = req.params.id;
  try {
    Genre.findByIdAndUpdate(
      id,
      {
        name: req.body.genre_name,
      },
      function (err, update) {
        if (err) return res.send(err);
        else {
          console.log("updated Genre");
          res.send("updated Genre");
        }
      }
    );
  } catch (error) {
    res.render("error", { error: error });
  }
};
