var db = require("../models");

module.exports = function(app) {
  //submit the signup form
  app.post("/api/signup", function(req, res) {
    db.Members.create(req.body)
              .then(function(result) {
                res.json(result);
              }).catch(function(err){
                throw err;
              });
  });

  //get all the categories in the DB
  app.get("/api/categories", function(req, res) {
    db.MemberItems.findAll({})
              .then(function(result) {
                res.json(result);
              }).catch(function(err){
                throw err;
              });
  });



  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

};
