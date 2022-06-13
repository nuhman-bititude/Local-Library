var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

//Controllers
var bookController = require("../controllers/bookController");
var authorController = require("../controllers/authorController");
var bookInstanceController = require("../controllers/bookInstanceController");
var genreController = require("../controllers/genreController");

// book routes

router.get("/book/create", bookController.bookCreateForm);
router.post(
  "/book/create",
  body("title").isLength({ min: 3 }),
  body("author").isLength({ min: 3 }),
  body("summary").isLength({ min: 3 }),
  body("isbn").isLength({ min: 3 }),
  body("genre").isLength({ min: 3 }),
  bookController.bookCreatePost
);
router.get("/books", bookController.bookFetchAll);
router.get("/book/:id", bookController.bookFetchOne);
router.get("/book/delete/:id", bookController.bookDeleteForm);
router.post("/book/delete/:id", bookController.bookDeletePost);
router.get("/book/update/:id", bookController.bookUpdateForm);
router.post(
  "/book/update/:id",
  body("title").isLength({ min: 3 }),
  body("author").isLength({ min: 3 }),
  body("summary").isLength({ min: 3 }),
  body("isbn").isLength({ min: 3 }),
  body("genre").isLength({ min: 3 }),
  bookController.bookUpdatePost
);

// author routes

router.get("/author/create", authorController.authorCreateForm);
router.post(
  "/author/create",
  body("first_name").isLength({ min: 3 }),
  body("family_name").isLength({ min: 3 }),
  body("date_of_birth").isEmpty(),
  body("date_of_death").isEmpty(),
  authorController.authorCreatePost
);
router.get("/authors", authorController.authorFetchAll);
router.get("/author/:id", authorController.authorFetchOne);
router.get("/author/delete/:id", authorController.authorDeleteForm);
router.post("/author/delete/:id", authorController.authorDeletePost);
router.get("/author/update/:id", authorController.authorUpdateForm);
router.post(
  "/author/update/:id",
  body("first_name").isLength({ min: 3 }),
  body("family_name").isLength({ min: 3 }),
  body("date_of_birth").isEmpty(),
  body("date_of_death").isEmpty(),
  authorController.authorUpdatePost
);

// genre routes

router.get("/genre/create", genreController.genreCreateForm);
router.post(
  "/genre/create",
  body("name").isLength({ min: 3 }),
  genreController.genreCreatePost
);
router.get("/genres", genreController.genreFetchAll);
router.get("/genre/:id", genreController.genreFetchOne);
router.get("/genre/delete/:id", genreController.genreDeleteForm);
router.post("/genre/delete/:id", genreController.genreDeletePost);
router.get("/genre/update/:id", genreController.genreUpdateForm);
router.post(
  "/genre/update/:id",
  body("name").isLength({ min: 3 }),
  genreController.genreUpdatePost
);

// bookinstance routes

router.get(
  "/bookinstance/create/:id",
  bookInstanceController.bookInstanceCreateForm
);
router.post(
  "/bookinstance/create",
  body("book").isLength({ min: 3 }),
  body("imprint").isLength({ min: 3 }),
  body("status").isLength({ min: 3 }),
  body("due").isEmpty(),
  bookInstanceController.bookInstanceCreatePost
);
router.get("/bookinstances", bookInstanceController.bookInstanceFetchAll);
router.get("/bookinstance/:id", bookInstanceController.bookInstanceFetchOne);
router.get(
  "/bookinstance/delete/:id",
  bookInstanceController.bookInstanceDeleteForm
);
router.post(
  "/bookinstance/delete/:id",
  bookInstanceController.bookInstanceDeletepost
);
router.get(
  "/bookinstance/update/:id",
  bookInstanceController.bookInstanceUpdateForm
);
router.post(
  "/bookinstance/update/:id",
  bookInstanceController.bookInstanceUpdatePost
);

module.exports = router;
