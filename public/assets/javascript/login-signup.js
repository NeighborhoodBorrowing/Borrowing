// Get the modal
var loginModal = $("#login-modal");

// Get the button that opens the modal
var loginBtn = $("#login-modal-button");

// Get the <span> element that closes the modal
var loginClose = $("#login-close")

loginModal.hide();

// When the user clicks on the button, open the modal 
loginBtn.on("click", function() {
    loginModal.show();
});

// When the user clicks on <span> (x), close the modal
loginClose.on("click", function() {
   loginModal.hide();
});
