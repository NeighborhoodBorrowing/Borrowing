// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Handlebars = require('handlebars');


// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//** REGISTER HANDLEBARS HELPERS BELOW **/
Handlebars.registerHelper('ifEqual',function(v1, v2, options) {
          if(v1 === v2) {
            return options.fn(this);
          }
          return options.inverse(this);
        });
Handlebars.registerHelper('ifNotEqual',function(v1, v2, options) {
                  if(v1 !== v2) {
                    return options.fn(this);
                  }
                  return options.inverse(this);
                });
Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));
app.use(session({ secret: "nalksfdhJKQ1oiy30491sfouts"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("getting auth information username: "+username+" pass: "+password);
    db.sequelize
        .query(
                "Select * from Members where email = ? and password = ?;"
                , { replacements: [username, password], type: db.sequelize.QueryTypes.SELECT}
              )
        .then(function(results){
          if(results.length==0){
            return done(null, false, { message: 'Incorrect Login Information.' });
          } else {
            console.log("logged in");
            return done(null, results[0]);
          } //close else
        });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.sequelize
      .query(
              "Select firstName, lastName, email, rating, zipCode, joinDate from Members where id = ?;"
              , { replacements: [id], type: db.sequelize.QueryTypes.SELECT}
            )
      .then(function(results){
        if(results.length==0){
          return done(new Error("User Not Found"), null);
        } else {
          return done(null, results[0]);
        } //close else
      });
});


// =============================================================
require("./routes/routes.js")(app, passport);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
