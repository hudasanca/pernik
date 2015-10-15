$(document).ready(function(){
  setTimeout(function(){
    animateDownArrow();
  }, 300);

  $('#adzan-btn').click(function(){
    showAdzan($(this));
  });
});

function animateDownArrow(){
  $('.down-arrow').animate({
    opacity: 1
  }, 500, function(){
    $('.logo').animate({
      opacity: 1
    })
  });

  $('.logo').animate({
    'margin-top': 100,
    'margin-bottom': 100
  })
}

function showAdzan(me){
  me.parent().hide();
  $('.main-menu').animate({
    width: '50%',
    left: '25%',
    top: '-=200',
    opacity: '0'
  });

  $('.adzan').css({
    'top': '200px',
    'display': 'flex'
  });

  $('.adzan').animate({
    width: '100%',
    top: '0',
    opacity: '1'
  });
}
