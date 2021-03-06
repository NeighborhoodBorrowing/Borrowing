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


  //DENY a request to borrow
  app.post("/api/markBorrowed", function(req, res) {
    //update this record to show the borrowing has denied
    db.sequelize
        .query(
                "UPDATE BorrowedItems SET borrowedStatus = 2 WHERE id = ?;" //0 = denied
                , { replacements: [req.body.borrowedItemsId], type: db.sequelize.QueryTypes.UPDATE}
              )
        .then(function(results){
              res.status(200).send("Update successful");
              res.end();
            });
        });

  //DENY a request to borrow
  app.post("/api/deny", function(req, res) {
    //update this record to show the borrowing has denied
    db.sequelize
        .query(
                "UPDATE borroweditems SET borrowedStatus = 0 WHERE id = ?;" //0 = denied
                , { replacements: [req.body.borrowedItemsId], type: db.sequelize.QueryTypes.UPDATE}
              )
        .then(function(results){
              res.status(200).send("Update successful");
              res.end();
            });
        });

  //APPROVE a request to Borrow
  app.post("/api/approve", function(req, res) {
    //update this record to show the borrowing has been approved
    //if there is anyone else who wanted to borrow it, mark that as denied
    db.sequelize
        .query(
                "UPDATE borroweditems SET borrowedStatus = 1 WHERE id = ?;" //1 = approved
                , { replacements: [req.body.borrowedItemsId], type: db.sequelize.QueryTypes.UPDATE}
              )
        .then(function(results){
            denyAllBorrowRequestsForItem(req.body.itemId, function(){
              res.status(200).send("Update successful");
              res.end();
            });
        });
  });

  //Mark item borrowed
  app.post("/api/borrowed", function(req, res) {
    //update this record to show the borrowing has been approved
    //if there is anyone else who wanted to borrow it, mark that as denied
    db.sequelize
        .query(
                "UPDATE BorrowedItems SET borrowedStatus = 2, borrowedDate = CURRENT_TIMESTAMP, dueDate = DATE_ADD(NOW(), INTERVAL 7 DAY) WHERE itemId = ?;" //2 = on lend
                , { replacements: [req.body.itemId], type: db.sequelize.QueryTypes.UPDATE}
              )
        .then(function(results){
              res.status(200).send("Update successful");
              res.end();
        });
  });

     //Mark item returned
      app.post("/api/itReturned", function(req, res) {
        //update this record to show the borrowing has been approved
        //if there is anyone else who wanted to borrow it, mark that as denied
        db.sequelize
            .query(
                    "UPDATE BorrowedItems SET borrowedStatus = 3, returnDate = CURRENT_TIMESTAMP WHERE itemId = ?;" //3 = borrowed
                    , { replacements: [req.body.itemId], type: db.sequelize.QueryTypes.UPDATE}
                  )
            .then(function(results){
                  res.status(200).send("Update successful");
                  res.end();
            });
      });
  //function to deny all borrow requests for items
  function denyAllBorrowRequestsForItem(id, cb){
    db.sequelize
        .query(
                //0 = denied, -1 = Pending Approval
                "UPDATE BorrowedItems SET borrowedStatus = 0 WHERE itemId = ? AND borrowedStatus = -1 ;"
                , { replacements: [id], type: db.sequelize.QueryTypes.UPDATE}
              )
        .then(function(results){
             cb();
        });
  }

 //-----login post route
 //http://toon.io/understanding-passportjs-authentication-flow/
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) {console.log("ERROR**************",err); return next(err); }
        res.status(200).send("Logged In");
        res.end();
      });
    })(req, res, next);
  });
  //borrow request post route
  app.post("/api/borrowRequest", function(req, res){
    if(req.session.passport == null){
      res.render("login", {message: "Please Log In", layout: "log-sign"});
    } else {
        var userId = req.session.passport.user;
        var queryString = "INSERT INTO BorrowedItems (borrowedStatus, borrowedDate, dueDate, returnDate, itemId, borrowerId) "
                          +" VALUES (-1, null, null, null,?,?);";
        db.sequelize
            .query(queryString
                    , { replacements: [req.body.itemId, userId]
                        , type: db.sequelize.QueryTypes.INSERT
                      }
                  )
            .then(function(results){
                res.status(200).send("borrow item request complete");
                res.end();
            });
      }//close else logged in
  });

  //add an item to be borrowed
  app.post("/api/postit", function(req, res) {
    if(req.session.passport == null){
      res.render("login", {message: "Please Log In", layout: "log-sign"});
    } else {
        var userId = req.session.passport.user;
        var canBorrow = (req.body.canBorrow==='true') ? 1 : 0;
        var queryString = "INSERT INTO MemberItems (name, description, picture, value, categoryId, ownerId, canBorrow )"
                          +" values (?,?,?,?,?,?,?);";
        db.sequelize
            .query(queryString
                    , { replacements: [req.body.name, req.body.desc, req.body.photoLink
                                      , parseFloat(req.body.value), req.body.category, userId, canBorrow]
                        , type: db.sequelize.QueryTypes.INSERT
                      }
                  )
            .then(function(results){
                res.status(200).send("Added item");
                res.end();
            });
      }//close else logged in
  });

/*** GET ROUTES TO DISPLAY PAGES*****/
  //search for items
  app.get("/api/search", function(req, res) {
    if(req.session.passport == null){
      res.render("login", {message: "Please Log In", layout: "log-sign"});
    } else {
        var userId = req.session.passport.user;
        var zipcode = req.query.zipcode;
        var keyword = req.query.keyword;
        var mainCategory = req.query.mainCategory;
        var subCategory = req.query.subCategory;

        var queryString = "SELECT MI.id as MIid, MI.name, MI.description, MI.picture, "
                          + " MI.value, MI.categoryId, C.categoryName, M.firstName as ownername "
                          +" FROM MemberItems as MI JOIN Categories as C ON C.id = MI.categoryId "
                          +" JOIN Members as M ON M.id = MI.ownerId "
                          +" WHERE MI.canBorrow = true AND MI.id NOT IN "
                          +" (SELECT BI.itemId FROM BorrowedItems as BI WHERE BI.borrowedStatus IN (1,2)) ";
        var replacements = [];
        if(isNotNullOrEmpty(zipcode)){
          queryString += " AND M.zipCode=? ";
          replacements.push(zipcode);
        }

        if(isNotNullOrEmpty(subCategory)){
          queryString += " AND MI.categoryId=? ";
          replacements.push(subCategory);
        }

        if(isNullOrEmpty(subCategory) && isNotNullOrEmpty(mainCategory)){
          queryString += " AND MI.categoryId IN (SELECT id from Categories WHERE parentId = ?) ";
          replacements.push(mainCategory);
        }

        if(isNotNullOrEmpty(keyword)){
          queryString += " AND MI.name LIKE ? ";
          replacements.push("%"+keyword+"%");
        }

        queryString+= " AND MI.ownerId <> ? ;";
        replacements.push(userId);
        console.log("QUERY" , queryString);

        db.sequelize
            .query(queryString, { replacements:replacements, type: db.sequelize.QueryTypes.SELECT})
            .then(function(results){
              res.json(results);
            });
      }//close else logged in
  });
  //sign up route
  app.get("/signup", function(req, res) {
    res.render("signup", {layout: "log-sign"});
  });
  //login route
  app.get("/login", function(req, res) {
    res.render("login", {layout: "log-sign"});
  });
  //memberpage route
  app.get("/memberp", function(req, res) {
    if(req.session.passport != null){
      var userId = req.session.passport.user;
      var userAndInfo = {user:null, items:null};
      var user;
      var items;
      var borrowedItems;
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
                  res.render('memberp', {userAndInfo:userAndInfo});
              });

            } //close if results!=0
          });
    } else {
      res.render("login", {message: "Please Log In", layout: "log-sign"});
    }
  });
  //index route
  app.get("/", function(req, res) {
    res.render("index", {layout: "log-sign"});
  });
  //search route
  app.get("/search", function(req, res) {
    if(req.session.passport != null){
        if(req.session.categories == null){
            getCategoriesToDisplay(function(categories){
                req.session.categories = categories;
                var catString = JSON.stringify(req.session.categories);
                res.render("search", {categories:req.session.categories, catString:catString});
            });
          } else {
            var catString = JSON.stringify(req.session.categories);
            res.render("search", {categories:req.session.categories, catString:catString});
          }
    } else { // not logged in
        res.render("login", {message: "Please Log In", layout: "log-sign"});
    }
  });
  //disable borrowing
  app.get("/toggleBorrowing", function(req, res) {
    var message = req.query.message==null ? "" : req.query.message;
    if(req.session.passport != null){//not logged in
      var userId = req.session.passport.user;
      db.sequelize
          .query(
                  "Update MemberItems SET canBorrow = !canBorrow where id = ? and ownerId = ?;"
                  , { replacements: [req.query.id, userId], type: db.sequelize.QueryTypes.UPDATE}
                )
          .then(function(results){
            res.redirect("/memberp");
          });
    } else { // not logged in
        res.render("login", {message: "Please Log In", layout: "log-sign"});
    }
  });
  //post item route
  app.get("/postit", function(req, res) {
    var message = req.query.message==null ? "" : req.query.message;
    if(req.session.passport != null){
        if(req.session.categories == null){
            getCategoriesToDisplay(function(categories){
                req.session.categories = categories;
                var catString = JSON.stringify(req.session.categories);
                res.render("postit", {categories:req.session.categories, message:message, catString:catString});
            });
          } else {
            var catString = JSON.stringify(req.session.categories);
            res.render("postit", {categories:req.session.categories, message:message, catString:catString});
          }
    } else { // not logged in
        res.render("login", {message: "Please Log In", layout: "log-sign"});
    }
  });
  //update item route
  app.get("/updateIt", function(req, res) {
    res.render("updateIt", {layout: "main"});
      getUserItemById(3, 10, function () {
            console.log("test");
      });
  });
  //logout route
  app.get('/logout', function(req, res){
    req.session.destroy(function(err) {
      req.logout();
      res.redirect('/');
    });
  });
  //function to display categories
  function getCategoriesToDisplay(cb){
    db.sequelize
        .query(
                //0 = denied, -1 = Pending Approval
                "SELECT categoryName, id, parentId FROM Categories ORDER BY id ;"
                , {type: db.sequelize.QueryTypes.SELECT}
              )
        .then(function(results){
             cb(results);
        });
  }
  //set blank if null function
  function setBlankIfNull(value){
    return value == null ? "" : value;
  }
  //retrieve user items function
  function getUserItems(userId, cb){
    db.sequelize
        .query(
                " Select MI.id as MIid, MI.name, MI.description, MI.picture, "
                +" MI.value, MI.categoryId, C.categoryName, MI.ownerId, "
                +" BI.borrowedStatus, BI.borrowedDate, BI.dueDate, "
                +" M.firstName as borrowerFirstName, M.id as borrowerId, "
                +" BI.id as borrowedItemsId, MI.canBorrow "
                +" FROM MemberItems as MI  "
                +" LEFT OUTER JOIN BorrowedItems as BI ON MI.id = BI.itemId  "
                +" LEFT OUTER JOIN Members as M on BI.borrowerId = M.id "
                +" LEFT OUTER JOIN Categories as C on MI.categoryId = C.id "
                +" WHERE MI.ownerId = ? ORDER BY MI.id;"
                , { replacements: [userId], type: db.sequelize.QueryTypes.SELECT}
              ).then (function(results){
                var userItems = [];
                for(i=0; i<results.length; i++){
                  userItems.push({
                        id: results[i].MIid,
                        name: results[i].name,
                        description: results[i].description,
                        picture:setBlankIfNull(results[i].picture),
                        value: results[i].value,
                        categoryId: results[i].categoryId,
                        categoryname: results[i].categoryName,
                        canBorrow:results[i].canBorrow,
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

    //retrieve user items with specific id function
    function getUserItemById(userId, id, cb){
        db.sequelize
            .query(
                    " Select MI.id as MIid, MI.name, MI.description, MI.picture, "
                    +" MI.value, MI.categoryId, c.categoryName, MI.ownerId, "
                    +" BI.borrowedStatus, BI.borrowedDate, BI.dueDate, "
                    +" M.firstName as borrowerFirstName, M.id as borrowerId, "
                    +" BI.id as borrowedItemsId, MI.canBorrow "
                    +" from  MemberItems as MI "
                    +" LEFT OUTER JOIN BorrowedItems as BI ON MI.id = BI.itemId  "
                    +" LEFT OUTER JOIN Members as M on BI.borrowerId = M.id "
                    +" LEFT OUTER JOIN Categories as C on MI.categoryId = C.id "
                    +" WHERE MI.ownerId = ? && MI.id = ? ORDER BY BI.borrowedStatus;"
                    , { replacements: [userId, id], type: db.sequelize.QueryTypes.SELECT}
                  ).then (function(results){
                    var userItem = [];
                    for(i=0; i<results.length; i++){
                      userItem.push({
                            id: results[i].MIid,
                            name: results[i].name,
                            description: results[i].description,
                            picture:setBlankIfNull(results[i].picture),
                            value: results[i].value,
                            categoryId: results[i].categoryId,
                            categoryname: results[i].categoryName,
                            canBorrow:results[i].canBorrow,
                            borrowedStatus: results[i].borrowedStatus,
                            borrowedStatusText : getBorrowedStatusText(results[i].borrowedStatus),
                            borrowedDate: setBlankIfNull(results[i].borrowedDate),
                            dueDate: setBlankIfNull(results[i].dueDate),
                            borrowerFirstName: setBlankIfNull(results[i].borrowerFirstName),
                            borrowerId: setBlankIfNull(results[i].borrowerId),
                            borrowedItemsId:setBlankIfNull(results[i].borrowedItemsId)
                        });
                    } // close for loop
                    cb(userItem);
                }); //close then
    }//close function

    //get borrowed status function
    function getBorrowedStatusText(status){
      var text = "";
      if(status === -1){ text = "Pending Approval";}
      else if (status === 0){ text = "Denied";}
      else if (status === 1){ text = "Approved"; }
      else if (status === 2){ text = "Borrowed"; }
      else if (status === 3){ text = "Returned"; }
      return text;
    }

    function isNotNullOrEmpty(val){
      if(val==null) {return false;}
      else if(val === undefined){return false;}
      else if (val.trim() === "") { return false;}
      else {return true;}
    }

    function isNullOrEmpty(val){
      return !isNotNullOrEmpty(val);
    }

};
