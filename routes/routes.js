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

  app.post("/api/login", function(req, res) {
    db.Members.findOne(
      {
        where : {email:req.body.email , password:req.body.psw}
      })
        .then(function(result) {
          console.log(result.rows);
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


/*** GET ROUTES TO DISPLAY PAGES*****/
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

};
