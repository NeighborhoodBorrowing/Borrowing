$(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
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
  var name = $("#it-name").val();
  var desc = $("#it-descr").val();
  var photoLink = $("#it-photo").val();
  var value = $("#it-value").val();
  var category= $("#it-cat").val();
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

/** SEARCH **/
function getHeaderForSearchResults(additionalMessage){
  return "<div class='row'>"
                    +"<div class='col-lg-1 col-md-1 col-sm-0 col-xs-0 '></div>"
                    +"<div class='col-lg-10 col-md-10 col-sm-12 col-xs-12 container item-cont'>"
                    +"<h4 class='centered'>Search Results</h4>"
                    + "<hr>"
                    +additionalMessage
                    +"</div><div class='col-lg-1 col-md-1 col-sm-0 col-xs-0 '></div>";
                   

}
/** search on submit **/
$("#searchSubmitBtn").click(function(event){
  event.preventDefault();
  var keyword = $("#keyword").val()== null ? "" : $("#keyword").val();
  var zipcode = $("#zipcode").val()== null ? "" : $("#zipcode").val();
  var category= $("#category").val()== null ? "" : $("#category").val();
    var data = {
      keyword: keyword == null ? "" : keyword,
      zipcode: zipcode == null ? "" : zipcode,
      category: category == null ? "" : category
    }
    $.get("/api/search", data)
      .done(function(results){
        $("#search-resp-div").empty();

        var searchResultDisplay = "";
        if(results.length==0){
            searchResultDisplay = getHeaderForSearchResults("<p> No Results Founds</p>");
            $("#search-resp-div").append(searchResultDisplay);
        }

        //if the results are empty the code below has no consequence bc of the for loop
        searchResultDisplay = getHeaderForSearchResults("");
        for(i=0; i<results.length; i++){
          searchResultDisplay += "<div class='row'>"
                            +"<div class='col-lg-1 col-md-1 col-sm-0 col-xs-0 '></div>"
                            +"<div class='col-lg-10 col-md-10 col-sm-12 col-xs-12 container item-cont'>"
                            +"        <div class='row'>"
                            +"        <div class='col-lg-5 col-md-5 col-sm-12 col-xs-12 '>"
                            +"            <p class='item-name'>"+results[i].name+"</p>"
                            +"            <div class='row'>"
                            +"                <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>"
                            +"                    <p class='item-descr centered'>About This Item:<br><span class='reset-color'>"+results[i].description+"</span></p>"
                            +"                    <p class='item-descr centered'>Replacement Value:<br><span class='reset-color'>$"+results[i].value+" USD</span> </p>"
                            +"                    <p class='item-descr centered'>Category:<br><span class='reset-color'>"+results[i].categoryname+"</span></p>"
                            +"                </div>"
                            +"            </div> "
                            +"        </div> ";
            if(notNullOrEmpty(results[i].picture)){
              searchResultDisplay+= "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 '><img class='item-photo' src='"+results[i].picture+"'></div>";
            }
            searchResultDisplay+= "</div><!--end main item row-->"
                          +" <div class='row'>"
                          +"      <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 '><hr>"
                          +"<!-- These class names are used in the javascript, please do not change them-->"
                          +"        <button class='borrowRequest' id = '"+results[i].MIid+"'>Request to Borrow</button>"
                          +"        <p class='left item-descr'>Lender:<span class='reset-color'>"+results[i].ownername+"</span></p>"
                          +"    </div>"
                          +"</div>"

                            +"</div>"
                            +"<!--spacer-->"
                            +"<div class='col-lg-1 col-md-1 col-sm-0 col-xs-0 '></div>"
                        +"</div>";

          $("#search-resp-div").append(searchResultDisplay);
          searchResultDisplay = "";
        }//close for loop

      })
      .fail(function(err){
        alert("Unable to complete search");
        console.log(err);
      });
});


function notNullOrEmpty(name){
  return name!=null && name.trim()!="";
}
