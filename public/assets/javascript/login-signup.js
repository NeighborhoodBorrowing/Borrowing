// login/signup modal variable
var logSignModal = $("#login-signup-modal");
// login button variable
var loginBtn = $("#login-button");
// signup button variable
var signupBtn = $("#signup-button");
//close login/signup modal
var logSignClose = $("#login-signup-close");
//landing page item display box
var landingDisplay = $("#landing-display");

//hide login/signup on load
logSignModal.hide();

// when the user clicks on login button, open modal
loginBtn.on("click", function() {
    landingDisplay.hide();
    
    target = $(this).attr('href');

    $('.tab a').parent().addClass('active');
    $('.tab a').parent().siblings().removeClass('active');
    $('.tab-content > div').not(target).hide();
    
    logSignModal.show();
});

// when the user clicks on signup, open modal
signupBtn.on("click", function() {
    landingDisplay.hide();
    
    target = $(this).attr('href');
    
    $('.tab a').parent().addClass('active');
    $('.tab a').parent().siblings().removeClass('active');
    $('.tab-content > div').not(target).hide();
    
    logSignModal.show();
});

// when the user clicks on <span> (x), close login/signup modal
logSignClose.on("click", function() {
   logSignModal.hide();
    landingDisplay.show();
});

//form highlights
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});
//button functionality in form
$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

