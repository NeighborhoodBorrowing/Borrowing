

//----------member page global variables------------
// pending approval clickable
var pendAppBtn = $("#pend-app");
// on lend clickable
var onLendBtn = $("#on-lend-btn");
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
    var closePendBtn = $("#close-pend-btn");
    closePendBtn.append('<button class="close"><a class="pend-app-close" href="">X</a></button>');
    onLendBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    pendAppBtn.addClass('vertTranslate');
    $("#close-pend-btn").addClass('vertTranslateBtn');
    pendAppDiv.show();
});
// when the user clicks on lent items button, open div, animate text, hide other options
$("#on-lend-btn").on("click", function() {
    var closeLendBtn = $("#close-lend-btn");
    closeLendBtn.append('<button class="close"><a class="pend-app-close" href="">X</a></button>');
    pendAppBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    onLendBtn.addClass('vertTranslate');
    onLendDiv.show();
});

// when the user clicks on returned items button, open div, animate text, hide other options
$("#returned").on("click", function() {
    var closeRetBtn = $("#close-ret-btn");
    closeRetBtn.append('<button class="close"><a class="pend-app-close" href="">X</a></button>');
    onLendBtn.hide();
    pendAppBtn.hide();
    allItBtn.hide();
    returnedBtn.addClass('vertTranslate');
    returnedDiv.show();
});

// when the user clicks on all itmes button, open div, animate text, hide other options
$("#all-it").on("click", function() {
    var closeAllBtn = $("#close-all-btn");
    closeAllBtn.append('<button class="close"><a class="pend-app-close" href="">X</a></button>');
    onLendBtn.hide();
    returnedBtn.hide();
    pendAppBtn.hide();
    allItBtn.addClass('vertTranslate');
    allItDiv.show();
});
//----------close member item view divs------------
$(".pend-app-close").on("click", function() {
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

