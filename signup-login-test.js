var Nightmare = require('nightmare');
var nightmare = new Nightmare({ show:true });

nightmare
    .goto("https://gentle-lowlands-66055.herokuapp.com/signup")
    .type("#firstName", "Testy")
    .type("#lastName", "McTester")
    .type("#email", "testy@test.com")
    .type("#psw", "12345")
    .type("#psw-repeat", "12345")
    .type("#zipCode", "75206")
    .click("#signupSubmitBtn")
    .wait("#user-name")
    .evaluate(function() {
        return document.querySelector("#user-name")
    })
.end()
.then(function(result) {
    console.log(result);
});

