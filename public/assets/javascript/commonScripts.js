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
  var validInput = validName(firstName) && validName(lastName) && (psw === pswRepeat) && (zipCode.length===5);
  if(validInput){
    alert("Your form has been submitted.");
    var newMember = {
      firstName:firstName,
      lastName:lastName,
      email:email.toLowerCase(),
      password:psw,
      zipCode:zipCode
    };
    console.log(firstName, lastName);
    $.post("/api/signup", newMember)
      .then(function(err, result){
        if(err){
          alert("Unable to sign up. This email address may be in use already.");
        } else {
          alert("You've been added!");
        }
      });
  } else { //form has some invalid fields
    alert("Please fill out the form correctly");
  }
});


/******* Login Form Submission Logic  *************/
// $("#loginSubmitBtn").click(function(event){
//   console.log("starting script")
//   event.preventDefault();
//   var email = $("#email").val().toLowerCase();
//   var psw = $("#psw").val();
//   alert("Your form has been submitted.");
//   var loginInfo = {
//     email:email,
//     psw:psw
//   }
//
//   $.post("/api/login", loginInfo)
//     .then(function(err, result){
//       if(err){
//         alert("Unable to login up. Please check your credentials.")
//       } else {
//         alert("You've been logged in!");
//         //redirect to user homepage
//       }
//     });
// });

function validName(name){
  return name!=null && name.trim()!="";
}
