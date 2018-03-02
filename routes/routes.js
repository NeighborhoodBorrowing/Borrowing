var db = require("../models");

module.exports = function(app, passport) {
  //submit the signup form
  app.post("/api/signup", function(req, res) {
    db.sequelize
        .query(
                "Select * from Members where email = ?;"
                , { replacements: [req.body.email], type: db.sequelize.QueryTypes.SELECT}
              )
        .then(function(results){
          console.log(results);
          if(results.length!=0){
            res.status(400).send("Duplicate email");
            res.end();
          } else {
            db.Members.create(req.body)
                      .then(function(result) {
                        res.json(result);
                      }).catch(function(err){
                        console.log(err);
                        throw err;
                      });
          } //close else
        });
  });

  // app.post('/api/login',
  //   passport.authenticate('local', { successRedirect: '/memberp',
  //                                    failureRedirect: '/login',
  //                                    failureFlash: false })
  // );

  // app.post('/api/login',
  //   passport.authenticate('local'),
  //   function(req, res) {
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     console.log("LOGGED IN!")
  //      res.render("memberp");
  //      console.log("Success!");
  //   });

 //http://toon.io/understanding-passportjs-authentication-flow/
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      console.log("LOGGED IN");
      req.logIn(user, function(err) {
        if (err) {console.log("ERROR**************",err); return next(err); }
        res.status(200).send("Logged In");
        res.end();
      });
    })(req, res, next);
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


  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/memberp", function(req, res) {
    console.log(req.session.passport.user);
    if(req.session.passport != null){
      res.render("memberp");
    } else {
      res.render("login");
    }
  });

  app.get("/", function(req, res) {
    res.render("index");
  });

};
