//hide posted items div on load
//hide borrowed items div on load
//hide lent items on load
//code to count notifications and show red notification indicator
//on click, show posted items div, hide borrowed and lent items
//on click, show borrowed items div, hide posted and lent items
//on click, show lent items, hide posted and borrowed items


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

//hide item divs on load
pendAppDiv.hide();
onLendDiv.hide();
returnedDiv.hide();
allItDiv.hide();

// when the user clicks on pending approval button, open 
pendAppBtn.on("click", function() {
    pendAppDiv.show();
    onLendDiv.hide();
    returnedDiv.hide();
    allItDiv.hide();
});

// when the user clicks on pending approval button, open 
onLendBtn.on("click", function() {
    pendAppDiv.hide();
    onLendDiv.show();
    returnedDiv.hide();
    allItDiv.hide();
});

// when the user clicks on pending approval button, open 
returnedBtn.on("click", function() {
    pendAppDiv.hide();
    onLendDiv.hide();
    returnedDiv.show();
    allItDiv.hide();
});

// when the user clicks on pending approval button, open 
allItBtn.on("click", function() {
    pendAppDiv.hide();
    onLendDiv.hide();
    returnedDiv.hide();
    allItDiv.show();
});

itemsDivClose.on("click", function() {
   signupModal.hide();
});