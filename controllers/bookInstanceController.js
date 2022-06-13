var BookInstance = require("../models/bookinstance");
var Book = require("../models/book");
const { body, validationResult } = require("express-validator");

exports.bookInstanceCreateForm = async (req, res, next) => {
  id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.render("createBookInstance", {
      id: id,
      book: book.title,
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookInstanceCreatePost = (req, res, next) => {
  var bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due,
  });
  bookInstance.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send(bookInstance + "<br>inserted");
  });
};

exports.bookInstanceFetchAll = async (req, res, next) => {
  const bookInsatnces = await BookInstance.find();
  res.send(bookInsatnces);
};

exports.bookInstanceFetchOne = async (req, res, next) => {
  id = req.params.id;
  try {
    const bookInsatance = await BookInstance.findById(id);
    res.send(bookInsatance);
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

exports.bookInstanceUpdateForm = async (req, res, next) => {
  id = req.params.id;
  try {
    const bookInsatance = await BookInstance.findById(id);
    res.render("updateBookInstance", {
      id: id,
      book: bookInsatance.book,
      imprint: bookInsatance.imprint,
      status: bookInsatance.status,
      due: setdate(bookInsatance.due_back),
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};
exports.bookInstanceUpdatePost = (req, res, next) => {
  id = req.params.id;
  BookInstance.findByIdAndUpdate(
    id,
    {
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due,
    },
    function (err, update) {
      if (err) return res.send(err);
      else {
        console.log("updated BookInstance");
        res.send("Updated Book Insatnce");
      }
    }
  );
};

exports.bookInstanceDeleteForm = async (req, res, next) => {
  id = req.params.id;
  try {
    const bookInsatance = await BookInstance.findById(id);
    res.render("deleteBookInstance", {
      id: id,
      book: bookInsatance.book,
      imprint: bookInsatance.imprint,
      status: bookInsatance.status,
      due: setdate(bookInsatance.due_back),
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookInstanceDeletepost = (req, res, next) => {
  id = req.params.id;
  try {
    BookInstance.remove({ _id: id }, function (err, result) {
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
