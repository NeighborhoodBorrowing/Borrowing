var Nightmare = require('nightmare');
var nightmare = Nightmare({ show:true });

nightmare 
    .goto("localhost:8080")
    .type("#firstName", "Testy McTester")
    .goto("localhost:8080")
    .type("#lastName", "Testy McTester")
    .goto("localhost:8080")
    .type("#email", "Testy McTester")
    .goto("localhost:8080")
    .type("#psw", "Testy McTester")
    .goto("localhost:8080")
    .type("#psw-repeat", "Testy McTester")
    .goto("localhost:8080")
    .type("#zipCode", "Testy McTester")
    .click("signupSubmitBtn")
    .wait("#user-name")
    .evaluate(function() {
        return document.querySelector("user-name")
    })
.end()
.then(function(result) {
    console.log(result);
});

