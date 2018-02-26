var db = require("../models");

module.exports = function(app) {
  app.post("/api/signup", function(req, res) {
    db.Members.create(req.body)
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
