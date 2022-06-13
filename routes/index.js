var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.send("""
           /book/create
           /books
           /book/:id
           /book/delete/:id
           /book/update/:id
           <br>
           /author/create
           /authors
           /author/:id
           /author/delete/:id
           /author/update/:id
           <br>
           /genre/create
           /genres
           /genre/:id
           /genre/delete/:id
           /genre/update/:id
           <br>
           /bookinstance/create
           /bookinstances
           /bookinstance/:id
           /bookinstance/delete/:id
           /bookinstance/update/:id
           """)
});

module.exports = router;
