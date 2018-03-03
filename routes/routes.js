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

  //submit the signup form
  app.post("/api/approve", function(req, res) {
    //update this record to show the borrowing has been approved
    //if there is anyone else who wanted to borrow it, mark that as denied
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



/*** GET ROUTES TO DISPLAY PAGES*****/

  //get all the categories in the DB
  app.get("/api/categories", function(req, res) {
    db.MemberItems.findAll({})
              .then(function(result) {
                res.json(result);
              }).catch(function(err){
                throw err;
              });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/memberp", function(req, res) {
    if(req.session.passport != null){
      var userId = req.session.passport.user;
      var userAndInfo = {user:null, items:null};
      var user;
      var items;
      db.sequelize
          .query(
                  "Select firstName, lastName, email, rating, zipCode, joinDate from Members where id = ?;"
                  , { replacements: [userId], type: db.sequelize.QueryTypes.SELECT}
                )
          .then(function(results){
            if(results.length!=0){
              user = {
                id:userId,
                firstName:results[0].firstName,
                lastName:results[0].lastName,
                email: results[0].email,
                rating: results[0].rating,
                zipCode: results[0].zipCode,
                joinDate: results[0].joinDate
              }
              getUserItems(userId, function(items){
                userAndInfo = {user:user, items:items};
                console.log("USER AND ITEMS ",userAndInfo);
                res.render('memberp', {userAndInfo:userAndInfo, helpers:{ json:function(context){return JSON.stringify(context); } }});
              });

            } //close if results!=0
          });
    } else {
      res.render("login", {message: "Please Log In"});
    }
  });

  function setBlankIfNull(value){
    return value == null ? "" : value;
  }

  function getUserItems(userId, cb){
    db.sequelize
        .query(
                " Select MI.id as MIid, MI.name, MI.description, MI.picture, "
                +" MI.value, MI.categoryId, c.categoryname, MI.ownerId, "
                +" BI.borrowedStatus, BI.borrowedDate, BI.dueDate, "
                +" M.firstName as borrowerFirstName, M.id as borrowerId, BI.id as borrowedItemsId "
                +" from  memberItems as MI  "
                +" LEFT OUTER JOIN borroweditems as BI ON MI.id = BI.itemId  "
                +" LEFT OUTER JOIN Members as M on BI.borrowerId = M.id "
                +" LEFT OUTER JOIN categories as C on MI.categoryId = C.id "
                +" WHERE MI.ownerId = ? ORDER BY BI.borrowedStatus;"
                , { replacements: [userId], type: db.sequelize.QueryTypes.SELECT}
              ).then (function(results){
                console.log("RESULTS ",results);
                var userItems = [];
                for(i=0; i<results.length; i++){
                  userItems.push({
                        id: results[i].MIid,
                        name: results[i].name,
                        description: results[i].description,
                        picture:setBlankIfNull(results[i].picture),
                        value: results[i].value,
                        categoryId: results[i].categoryId,
                        categoryname: results[i].categoryname,
                        borrowedStatus: results[i].borrowedStatus,
                        borrowedStatusText : getBorrowedStatusText(results[i].borrowedStatus),
                        borrowedDate: setBlankIfNull(results[i].borrowedDate),
                        dueDate: setBlankIfNull(results[i].dueDate),
                        borrowerFirstName: setBlankIfNull(results[i].borrowerFirstName),
                        borrowerId: setBlankIfNull(results[i].borrowerId),
                        borrowedItemsId:setBlankIfNull(results[i].borrowedItemsId)
                    });
                } // close for loop
                cb(userItems);
            }); //close then
}//close function


function getBorrowedStatusText(status){
  var text = "";
  if(status === -1){
    text = "Pending Approval";
  } else if (status === 0){
    text = "Denied";
  } else if (status === 1){
    text = "Approved";
  } else if (status === 2){
    text = "Borrowed";
  } else if (status === 3){
    text = "Returned";
  }
  return text;
}
  app.get("/", function(req, res) {
    res.render("index");
  });
};
