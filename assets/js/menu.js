var activeCard = null;
var delay = 700;

$(document).ready(function(){
  setTimeout(function(){
    animateDownArrow();
  }, 300);

  $('#adzan-btn').click(function(){
    showCard($(this));
  });

  $('#news-btn').click(function(){
    showCard($(this));
  });

  $('#setting-btn').click(function(){
    showCard($(this));
  });

  $('.back-btn').click(function(){
    closeCard();
  });

  //activate tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
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

function showCard(me){
  me.parent().parent().css('opacity', '0');
  $('.main-menu').animate({
    width: '50%',
    left: '25%',
    top: '-=250',
    opacity: '0'
  }, delay);

  $(me.attr('data-page-menu')).css({
    'top': '100%',
    'display': 'flex'
  });

  $(me.attr('data-page-menu')).animate({
    top: '0',
    left: '0',
    opacity: '1'
  }, delay, function(){
    $('.down-arrow').css({
      opacity: '0',
      'border-radius': '10px',
      padding: '10px',
      margin: 'auto',
      display: 'block'
    })
  });

  activeCard = me.attr('data-page-menu');
}

function closeCard(){
  $(activeCard).animate({
    'top': '500px'
  }, delay, function(){
    activeCard = null;
  });

  $('.main-menu').animate({
    width: '100%',
    left: '0%',
    top: '0',
    opacity: '1'
  }, delay, function(){
    animateDownArrow()
  });
}
