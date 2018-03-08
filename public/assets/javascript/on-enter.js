/** 'ON ENTER' submit button **/
$('.input.signUpForm').keypress(function (e) {
  if (e.keyCode === 13) {
    $('#signupSubmitBtn').click();
  }
});

$('.input.loginForm').keypress(function (e) {
  if (e.keyCode === 13) {
    $('#loginSubmitBtn').click();
  }
});

$('.input.postItForm').keypress(function (e) {
  if (e.keyCode === 13) {
    $('#addItemSubmitBtn').click();
  }
});
$('.input.searchForm').keypress(function (e) {
  if (e.keyCode === 13) {
    $('#searchSubmitBtn').click();
  }
});
$('.input.edit-it').keypress(function (e) {
  if (e.keyCode === 13) {
    $('#editItSubmitBtn').click();
  }
});
