var express = require('express');
var router = express.Router();
var mongo=require("../database/connection")

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  mongo.connection()
  collection=mongo.collection()
});

module.exports = router;
