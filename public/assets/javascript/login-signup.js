// login modal variable
var loginModal = $("#login-modal");
// signup modal variable
var signupModal = $("#signup-modal");

// login button variable
var loginBtn = $("#login-modal-button");
// signup button variable
var signupBtn = $("#signup-modal-button");

// close login variable
var loginClose = $("#login-close")
// close signup variable
var signupClose = $("#signup-close")

//hide login modal on load
loginModal.hide();
//hide signup modal on load
signupModal.hide();

// when the user clicks on the button, open login modal, close signup modal 
loginBtn.on("click", function() {
    loginModal.show();
    signupModal.hide();
});
// when the user clicks on the button, open signup modal, close login modal
signupBtn.on("click", function() {
    signupModal.show();
    loginModal.hide();
});

// when the user clicks on <span> (x), close login modal
loginClose.on("click", function() {
   loginModal.hide();
});
// when the user clicks on <span> (x), close signup modal
signupClose.on("click", function() {
   signupModal.hide();
});

