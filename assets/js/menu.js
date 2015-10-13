$(document).ready(function(){
  setTimeout(function(){
    animateDownArrow();
  }, 300);

  $('#adzan-btn').click(function(){
    $(this).parent().hide();
    $('.adzan').fadeIn(1000, function(){
      $('.main-menu').hide();
    });
  });
});

function animateDownArrow(){
  $('.down-arrow').animate({
    opacity: 1
  }, 1000, function(){
    $('.logo').animate({
      opacity: 1
    })
  });

  $('.logo').animate({
    'margin-top': 100,
    'margin-bottom': 100
  })
}
