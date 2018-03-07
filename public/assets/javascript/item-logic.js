

//----------member page global variables------------
// pending approval clickable
var pendAppBtn = $("#pend-app");
// approved clickable
var approvedBtn = $("#approved");
// on lend clickable
var onLendBtn = $("#on-lend-btn");
// returned clickable
var returnedBtn = $("#returned");
// all items clickable
var allItBtn = $("#all-it");
//pending approval div
var pendAppDiv = $("#pend-app-div");
//approved div
var apprItDiv = $("#approved-div");
//on lend div
var onLendDiv = $("#on-lend-div");
//returned div
var returnedDiv = $("#returned-div");
//all items div
var allItDiv = $("#all-it-div");
//search response div
var searchRespDiv = $("#search-resp-div");




//----------hide member item view divs on load------------
pendAppDiv.hide();
apprItDiv.hide();
onLendDiv.hide();
returnedDiv.hide();
allItDiv.hide();
searchRespDiv.hide();

$("#searchSubmitBtn").on("click", function () {
    searchRespDiv.show();
});


//----------logic to show/hide member item view divs on click------------
// when the user clicks on pending approval button, open div, animate text, hide other options
$("#pend-app").on("click", function() {
    var closePendBtn = $("#close-pend-btn");
    closePendBtn.append('<button class="close pend-app-close"><a href="">X</a></button>');
    approvedBtn.hide();
    onLendBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    //conditional to add or remove vertical transition
    if (pendAppBtn.hasClass('vertTranslate')) {
        pendAppBtn.removeClass('vertTranslate');
    } else {
        pendAppBtn.addClass('vertTranslate');
    }
    $("#close-pend-btn").addClass('vertTranslateBtn');
    pendAppDiv.show();
});
// when the user clicks on approved itmes button, open div, animate text, hide other options
$("#approved").on("click", function() {
    var closeApprBtn = $("#close-appr-btn");
    closeApprBtn.append('<button class="close approved-close"><a href="">X</a></button>');
    onLendBtn.hide();
    returnedBtn.hide();
    pendAppBtn.hide();
    allItBtn.hide();
    //conditional to add or remove vertical transition
    if (approvedBtn.hasClass('vertTranslate')) {
        approvedBtn.removeClass('vertTranslate');
    } else {
        approvedBtn.addClass('vertTranslate');
    }
    apprItDiv.show();
});
// when the user clicks on lent items button, open div, animate text, hide other options
$("#on-lend-btn").on("click", function() {
    var closeLendBtn = $("#close-lend-btn");
    closeLendBtn.append('<button class="close on-lend-close"><a href="">X</a></button>');
    pendAppBtn.hide();
    approvedBtn.hide();
    returnedBtn.hide();
    allItBtn.hide();
    //conditional to add or remove vertical transition
    if (onLendBtn.hasClass('vertTranslate')) {
        onLendBtn.removeClass('vertTranslate');
    } else {
        onLendBtn.addClass('vertTranslate');
    }
    onLendDiv.show();
});
// when the user clicks on returned items button, open div, animate text, hide other options
$("#returned").on("click", function() {
    var closeRetBtn = $("#close-ret-btn");
    closeRetBtn.append('<button class="close returned-close"><a href="">X</a></button>');
    onLendBtn.hide();
    approvedBtn.hide();
    pendAppBtn.hide();
    allItBtn.hide();
    //conditional to add or remove vertical transition
    if (returnedBtn.hasClass('vertTranslateFromBot')) {
        returnedBtn.removeClass('vertTranslateFromBot');
    } else {
        returnedBtn.addClass('vertTranslateFromBot');
    }
    returnedDiv.show();
});

// when the user clicks on all itmes button, open div, animate text, hide other options
$("#all-it").on("click", function() {
    var closeAllBtn = $("#close-all-btn");
    closeAllBtn.append('<button class="close all-it-close"><a href="">X</a></button>');
    onLendBtn.hide();
    returnedBtn.hide();
    approvedBtn.hide();
    pendAppBtn.hide();
    //conditional to add or remove vertical transition
    if (allItBtn.hasClass('vertTranslateFromBot')) {
        allItBtn.removeClass('vertTranslateFromBot');
    } else {
        allItBtn.addClass('vertTranslateFromBot');
    }
    allItDiv.show();
});
//----------close member item view divs------------
$(".pend-app-close").on("click", function() {
    pendAppDiv.hide();
});
$("#appr-it-close").on("click", function() {
    apprItDiv.hide();
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


$(".navbar-toggler").on("click", function() {
    var text = $(".text");
    if (text.hasClass('vertTranslateBig')) {
        text.removeClass('vertTranslateBig');
    } else {
        text.addClass('vertTranslateBig');
    };
});


var joinDate = $("#join-date");
console.log(joinDate);

