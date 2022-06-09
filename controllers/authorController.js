var Author = require("../models/author");
var Book = require("../models/book");
var path = require("path");

exports.createAuthorForm = (req, res, next) => {
  // console.log(path.resolve("public/createAuthor.html"))
  res.sendFile(path.resolve("public/createAuthor.html"));
};

exports.createAuthorPost = (req, res, next) => {
    // console.log(typeof(Author))
  var author = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death,
  });
  author.save(function (err) {
    if (err) { return next(err); }
    res.send(author+"<br>inserted")
});
};

exports.authorFetchAll=(req,res,next)=>{
    const authors=Author.find().exec((err,all_authors)=>{
        if(err){
            console.log(err)
        }res.json(all_authors)
    })
    // console.log(authors)
    
}