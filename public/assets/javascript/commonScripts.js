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
        loginFunction(email,psw);
      })
      .fail(function(){
        alert("Unable to signup, email address is already in use");
      });
  } else { //form has some invalid fields
    alert("Please fill out the form correctly");
  }
});

function loginFunction(username, password){
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

}

/******* LOGIN Submission Logic  *************/
$("#loginSubmitBtn").click(function(event){
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  loginFunction(username, password);
});


/******* Approve or Deny Borrowing Request Logic  *************/
$(".approveBorrowRequest").click(function(event){
  event.preventDefault();

  console.log("this.id ", this.id);
  var borrowedItemsId = this.id.split(",")[0];
  var itemId = this.id.split(",")[1];

  $.post("/api/approve", {borrowedItemsId:borrowedItemsId, itemId:itemId})
    .done(function(){
      window.location = "/memberp";
    })
    .fail(function(err){
      alert("Unable to approve request");
      console.log(err);
    });
});

/** DENY **/
$(".denyBorrowRequest").click(function(event){
  event.preventDefault();
  var borrowedItemsId = this.id.split(",")[0];
  var itemId = this.id.split(",")[1];

  $.post("/api/deny", {borrowedItemsId:borrowedItemsId, itemId:itemId})
    .done(function(){
      window.location = "/memberp";
    })
    .fail(function(err){
      alert("Unable to deny request");
      console.log(err);
    });
});

/** ADD ITEM **/
$("#addItemSubmitBtn").click(function(event){
  event.preventDefault();
  console.log("adding item");
  var name = $("#it-name").val();
  var desc = $("#it-descr").val();
  var photoLink = $("#it-photo").val();
  var value = $("#it-value").val();
  var category= $("#it-cat").val();
  console.log(name, desc, photoLink, value, category);
  var validInput = notNullOrEmpty(name) && notNullOrEmpty(value) && notNullOrEmpty(category) && !isNaN(value);
  if(validInput){
    var newItem = {
      name:name,
      desc:desc,
      photoLink:photoLink,
      value:value,
      category:category
    }
    $.post("/api/postit", newItem)
      .done(function(){
        window.location = "/postit?message=Success";
      })
      .fail(function(err){
        alert("Unable to add item");
        console.log(err);
      });
  } else {
    alert("form input is invalid");
  }
});


/** ADD ITEM **/
$("#searchSubmitBtn").click(function(event){
  event.preventDefault();
  console.log("adding item");
  var keyword = $("#keyword").val()== null ? "" : $("#keyword").val();
  var zipcode = $("#zipcode").val()== null ? "" : $("#zipcode").val();
  var category= $("#category").val()== null ? "" : $("#category").val();
  console.log(keyword, zipcode, category);
  //as long as one input is provided, search can be done
  var validInput = notNullOrEmpty(keyword) || notNullOrEmpty(zipcode) || notNullOrEmpty(category);
  if(validInput){
    var data = {
      keyword: keyword == null ? "" : keyword,
      zipcode: zipcode == null ? "" : zipcode,
      category: category == null ? "" : category
    }
    var urlString = "/api/search";
    $.get(urlString, data)
      .done(function(){
        
      })
      .fail(function(err){
        alert("Unable to complete search");
        console.log(err);
      });
  } else {
    alert("Please enter valid search criteria");
  }
});


function notNullOrEmpty(name){
  return name!=null && name.trim()!="";
}


/** SEARCH LOGIC **/
//search button var
var searchBtn = $("#searchSubmitBtn");
//search results var
var searchResDiv = $("#searchResults");

//on load, hide search results div
searchResDiv.hide();

//on search button click, show search results
searchBtn.on("click", function() {
   searchResDiv.show();
});




/** WORD SCROLL ON INDEX LOAD **/

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);



//----------member page global variables------------
// pending approval clickable
var pendAppBtn = $("#pend-app");
// on lend clickable
var onLendBtn = $("#on-lend");
// returned clickable
var returnedBtn = $("#returned");
// all items clickable
var allItBtn = $("#all-it");
//pending approval div
var pendAppDiv = $("#pend-app-div");
//on lend div
var onLendDiv = $("#on-lend-div");
//returned div
var returnedDiv = $("#returned-div");
//all items div
var allItDiv = $("#all-it-div");




//----------hide member item view divs on load------------
pendAppDiv.hide();
onLendDiv.hide();
returnedDiv.hide();
allItDiv.hide();


//----------logic to show/hide member item view divs on click------------
// when the user clicks on pending approval button, open div, animate text, hide other options
$("#pend-app").on("click", function() {
    onLendBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    pendAppBtn.addClass('vertTranslate');
    pendAppDiv.show();
    onLendDiv.hide();
    returnedDiv.hide();
    allItDiv.hide();
});

// when the user clicks on lent items button, open div, animate text, hide other options
$("#on-lend").on("click", function() {
    pendAppBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    onLendBtn.addClass('vertTranslate');
    pendAppDiv.hide();
    onLendDiv.show();
    returnedDiv.hide();
    allItDiv.hide();
});

// when the user clicks on returned items button, open div, animate text, hide other options
$("#returned").on("click", function() {
    onLendBtn.hide();
    pendAppBtn.hide();
    allItBtn.hide();
    returnedBtn.addClass('vertTranslate');
    pendAppDiv.hide();
    onLendDiv.hide();
    returnedDiv.show();
    allItDiv.hide();
});

// when the user clicks on all itmes button, open div, animate text, hide other options
$("#all-it").on("click", function() {
    onLendBtn.hide();
    returnedBtn.hide();
    pendAppBtn.hide();
    allItBtn.addClass('vertTranslate');
    pendAppDiv.hide();
    onLendDiv.hide();
    returnedDiv.hide();
    allItDiv.show();
});
//----------close member item view divs------------
$("#pend-app-close").on("click", function() {
    pendAppDiv.hide();
});
$("#on-lend-close").on("click", function() {
    onLendDiv.hide();
});
$("#returned-close").on("click", function() {
    returnedDiv.hide();
});
$("#all-it-close").on("click", function() {
    allItDiv.hide();
});

