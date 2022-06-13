var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
const author = require("../models/author");

exports.bookCreateForm = async (req, res, next) => {
  try {
    const authors = await Author.find();
    const genres = await Genre.find();
    res.render("createBook", {
      authors: authors,
      genres: genres,
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookCreatePost = (req, res, next) => {
  try {
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      ISBN: req.body.isbn,
      genre: req.body.genre,
    });
    book.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(book + "<br>inserted");
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookFetchAll = async (req, res, next) => {
  const books = await Book.find();
  res.send(books);
};

exports.bookFetchOne = async (req, res, next) => {
  try {
    id = req.params.id;
    const book = await Book.findById(id);
    res.send(book);
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookDeleteForm = async (req, res, next) => {
  id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.render("deleteBook", {
      id: book._id,
      title: book.title,
      author: book.author,
      summary: book.summary,
      isbn: book.ISBN,
      genre: book.genre,
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookDeletePost = (req, res, next) => {
  id = req.params.id;
  try {
    Book.remove({ _id: id }, function (err, result) {
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

exports.bookUpdateForm = async (req, res, next) => {
  id = req.params.id;
  try {
    const book = await Book.findById(id);
    const authors = await Author.find();
    const genres = await Genre.find();
    res.render("updateBook", {
      id: book._id,
      title: book.title,
      author: book.author,
      summary: book.summary,
      isbn: book.ISBN,
      genre: book.genre,
      authors: authors,
      genres: genres,
    });
  } catch (error) {
    res.render("error", { error: error });
  }
};

exports.bookUpdatePost = (req, res, next) => {
  id = req.params.id;
  try {
    Book.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        ISBN: req.body.isbn,
        genre: req.body.genre,
      },
      function (err, update) {
        if (err) return res.send(err);
        else {
          console.log("updated Book");
          res.send("Updated Book");
        }
      }
    );
  } catch (error) {
    res.render("error", { error: error });
  }
};
