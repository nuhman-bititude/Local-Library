var express = require("express");
var router = express.Router();

//Controllers
var bookController = require("../controllers/bookController");
var authorController = require("../controllers/authorController");
var bookInstanceController = require("../controllers/bookInstanceController");
var genreController = require("../controllers/genreController");

// book routes

router.get("/book/create");
router.post("/book/create");
router.get("/books");
router.get("/book/:id");
router.get("/book/delete/:id");
router.post("/book/delete/:id");
router.get("/book/update/:id");
router.post("/book/update/:id");

// author routes

router.get("/author/create", authorController.authorCreateForm);
router.post("/author/create", authorController.authorCreatePost);
router.get("/authors", authorController.authorFetchAll);
router.get("/author/:id", authorController.authorFetchOne);
router.get("/author/delete/:id", authorController.authorDeleteForm);
router.post("/author/delete/:id", authorController.authorDeletePost);
router.get("/author/update/:id", authorController.authorUpdateForm);
router.post("/author/update/:id", authorController.authorUpdatePost);

// genre routes

router.get("/genre/create", genreController.genreCreateForm);
router.post("/genre/create", genreController.genreCreatePost);
router.get("/genres", genreController.genreFetchAll);
router.get("/genre/:id", genreController.genreFetchOne);
router.get("/genre/delete/:id", genreController.genreDeleteForm);
router.post("/genre/delete/:id", genreController.genreDeletePost);
router.get("/genre/update/:id");
router.post("/genre/update/:id");

// bookinstance routes

router.get("/bookinstance/create");
router.post("/bookinstance/create");
router.get("/bookinstances");
router.get("/bookinstance/:id");
router.get("/bookinstance/delete/:id");
router.post("/bookinstance/delete/:id");
router.get("/bookinstance/update/:id");
router.post("/bookinstance/update/:id");

module.exports = router;
