var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth.js");
//Controllers
var bookController = require("../controllers/bookController");
var authorController = require("../controllers/authorController");
var bookInstanceController = require("../controllers/bookInstanceController");
var genreController = require("../controllers/genreController");
var userController = require("../controllers/userController");
// book routes

router.get("/book/create", auth, bookController.bookCreateForm);
router.post(
  "/book/create",
  body("title").isLength({ min: 3 }),
  body("author").isLength({ min: 3 }),
  body("summary").isLength({ min: 3 }),
  body("isbn").isLength({ min: 3 }),
  body("genre").isLength({ min: 3 }),
  bookController.bookCreatePost
);
router.get("/books", auth, bookController.bookFetchAll);
router.get("/book/:id", bookController.bookFetchOne);
router.get("/book/delete/:id", auth, bookController.bookDeleteForm);
router.post("/book/delete/:id", auth, bookController.bookDeletePost);
router.get("/book/update/:id", auth, bookController.bookUpdateForm);
router.post(
  "/book/update/:id",
  auth,
  body("title").isLength({ min: 3 }),
  body("author").isLength({ min: 3 }),
  body("summary").isLength({ min: 3 }),
  body("isbn").isLength({ min: 3 }),
  body("genre").isLength({ min: 3 }),
  bookController.bookUpdatePost
);

// author routes

router.get("/author/create", auth, authorController.authorCreateForm);
router.post(
  "/author/create",
  body("first_name").isLength({ min: 3 }),
  body("family_name").isLength({ min: 3 }),
  body("date_of_birth").isEmpty(),
  body("date_of_death").isEmpty(),
  authorController.authorCreatePost
);
router.get("/authors", auth, authorController.authorFetchAll);
router.get("/author/:id", authorController.authorFetchOne);
router.get("/author/delete/:id", auth, authorController.authorDeleteForm);
router.post("/author/delete/:id", auth, authorController.authorDeletePost);
router.get("/author/update/:id", auth, authorController.authorUpdateForm);
router.post(
  "/author/update/:id",
  auth,
  body("first_name").isLength({ min: 3 }),
  body("family_name").isLength({ min: 3 }),
  body("date_of_birth").isEmpty(),
  body("date_of_death").isEmpty(),
  authorController.authorUpdatePost
);

// genre routes

router.get("/genre/create", auth, genreController.genreCreateForm);
router.post(
  "/genre/create",
  body("name").isLength({ min: 3 }),
  genreController.genreCreatePost
);
router.get("/genres", auth, genreController.genreFetchAll);
router.get("/genre/:id", genreController.genreFetchOne);
router.get("/genre/delete/:id", auth, genreController.genreDeleteForm);
router.post("/genre/delete/:id", auth, genreController.genreDeletePost);
router.get("/genre/update/:id", auth, genreController.genreUpdateForm);
router.post(
  "/genre/update/:id",
  auth,
  body("name").isLength({ min: 3 }),
  genreController.genreUpdatePost
);

// bookinstance routes

router.get(
  "/bookinstance/create/:id",
  auth,
  bookInstanceController.bookInstanceCreateForm
);
router.post(
  "/bookinstance/create",
  auth,
  body("book").isLength({ min: 3 }),
  body("imprint").isLength({ min: 3 }),
  body("status").isLength({ min: 3 }),
  body("due").isEmpty(),
  bookInstanceController.bookInstanceCreatePost
);
router.get("/bookinstances", auth, bookInstanceController.bookInstanceFetchAll);
router.get("/bookinstance/:id", bookInstanceController.bookInstanceFetchOne);
router.get(
  "/bookinstance/delete/:id",
  auth,
  bookInstanceController.bookInstanceDeleteForm
);
router.post(
  "/bookinstance/delete/:id",
  auth,
  bookInstanceController.bookInstanceDeletepost
);
router.get(
  "/bookinstance/update/:id",
  auth,
  bookInstanceController.bookInstanceUpdateForm
);
router.post(
  "/bookinstance/update/:id",
  auth,
  bookInstanceController.bookInstanceUpdatePost
);

// user

router.post(
  "/user/signup",
  body("name").isLength({ min: 3 }),
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  userController.userCreate
);
router.post(
  "/login",
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  userController.userFetchOne
);
router.get("/users", auth, userController.userFetchAll);
// router.get("/genres", genreController.genreFetchAll);

// admin
router.post(
  "/admin/signup",
  body("name").isLength({ min: 3 }),
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  userController.adminCreate
);

router.post(
  "/admin/login",
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  userController.adminFetchOne
);

module.exports = router;
