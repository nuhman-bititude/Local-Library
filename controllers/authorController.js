var Author = require("../models/author");
var path = require("path");

exports.authorCreateForm = (req, res, next) => {
  // console.log(path.resolve("public/createAuthor.html"))
  res.sendFile(path.resolve("public/createAuthor.html"));
};

exports.authorCreatePost = (req, res, next) => {
  // console.log(typeof(Author))
  try {
    var author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });
    author.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(author + "<br>inserted");
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.authorFetchAll = (req, res, next) => {
  Author.find().exec((err, all_authors) => {
    if (err) {
      console.log(err);
      res.render("error", { error: err });
      return;
    }
    res.json(all_authors);
  });
  // console.log(authors)
};

exports.authorFetchOne = (req, res, next) => {
  id = req.params.id;
  try {
    Author.findOne({ _id: id }).exec((err, author) => {
      if (err) {
        // console.log(err);
        res.render("error", { error: err });
        return;
      }
      res.json(author);
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.authorDeleteForm = (req, res, next) => {
  id = req.params.id;
  // console.log(id)
  try {
    Author.findOne({ _id: id }).exec((err, author) => {
      if (err) {
        res.render("error", { error: err });
        console.log(err);
        return;
      }

      res.render("deleteAuthor", {
        id: author._id,
        first_name: author.first_name,
        family_name: author.family_name,
        date_of_birth: author.date_of_birth.toDateString(),
        date_of_death: author.date_of_death.toDateString(),
      });
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.authorDeletePost = (req, res, next) => {
  id = req.params.id;
  try {
    Author.remove({ _id: id }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Deleted");
        console.log("Result :", result);
      }
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

function setdate(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
}
exports.authorUpdateForm = (req, res, next) => {
  id = req.params.id;
  try {
    Author.findOne({ _id: id }).exec((err, author) => {
      if (err) {
        console.log(err);
        res.render("error", { error: err });
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
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.authorUpdatePost = (req, res, next) => {
  id = req.params.id;
  try {
    Author.findByIdAndUpdate(
      id,
      {
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      },
      function (err, update) {
        if (err) {
          res.render("error", { error: err });
        } else {
          console.log("updated Author");
          res.send("updated Author");
        }
      }
    );
  } catch (error) {
    res.render("error", { error: error });
  }
};
