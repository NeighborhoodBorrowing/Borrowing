var db = require("../models");

module.exports = function(app) {
  app.post("/api/members", function(req, res) {
    db.Members.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.get("/", function(req, res) {
    res.render("index");
  });

};
