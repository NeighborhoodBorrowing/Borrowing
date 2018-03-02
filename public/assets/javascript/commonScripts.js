/******* Login and SignUp Logic *******************/
// login modal variable
var loginModal = $("#login-modal");
// signup modal variable
var signupModal = $("#signup-modal");

// login button variable
var loginBtn = $("#login-button");
// signup button variable
var signupBtn = $("#signUp-button");

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


/******* Sign Up Form Submission Logic  *************/
// $(document.body).on("click", "#signupSubmitBtn", function() {
$("#signupSubmitBtn").click(function(event){
  event.preventDefault();

  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var email = $("#email").val();
  var psw = $("#psw").val();
  var pswRepeat = $("#psw-repeat").val();
  var zipCode = $("#zipCode").val();
  var validInput = notNullOrEmpty(firstName) && notNullOrEmpty(lastName) && notNullOrEmpty(psw) && (psw === pswRepeat) && (zipCode.length===5);
  if(validInput){
    var newMember = {
      firstName:firstName,
      lastName:lastName,
      email:email.toLowerCase(),
      password:psw,
      zipCode:zipCode
    };
    console.log(firstName, lastName);
    $.post("/api/signup", newMember)
      .done(function(){
        console.log("done");
      })
      .fail(function(){
        alert("Unable to signup, email address is already in use");
      });
  } else { //form has some invalid fields
    alert("Please fill out the form correctly");
  }
});


/******* LOGIN Submission Logic  *************/
$("#loginSubmitBtn").click(function(event){
  event.preventDefault();

  var username = $("#username").val();
  var password = $("#password").val();
  var validInput = notNullOrEmpty(username) && notNullOrEmpty(password);
  if(validInput){
    var credentials = {
      username:username.toLowerCase(),
      password:password
    };
    $.post("/api/login", credentials)
      .done(function(){
        window.location = "/memberp";
      })
      .fail(function(err){
        alert("Unable to login");
        console.log(err);
      });
  } else { //form has some invalid fields
    alert("Please fill out the form correctly");
  }
});


function notNullOrEmpty(name){
  return name!=null && name.trim()!="";
}
