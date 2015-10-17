var pageActive = 1;
var countOfPages = $(".menu .page").length;

$(document).ready(function(){
  $("#menu-previous-btn").click(function(){
    previousPage();
    drawNavLeft();
  });

  $("#menu-next-btn").click(function(){
    nextPage();
    drawNavLeft();
  });

  drawNavLeft();
});

function nextPage(){
  if (pageActive == countOfPages) {
    return;
  }
  
  var bef = "#page-"+pageActive;
  $(bef).animate({
    width: "50%",
    left: "25%",
    top: "-250",
    opacity: "0"
  }, delay, function(){
    $(bef).css("display", "none");
  });

  $("#page-"+(pageActive+1)).css({
    top: "100%",
    display: "flex"
  });

  $("#page-"+(pageActive+1)).animate({
    top: "0"
  }, delay);

  pageActive++;
  $("#menu-previous-btn").fadeIn(delay);

  if (pageActive == countOfPages) {
    $("#menu-next-btn").fadeOut(delay);
  }
}

function previousPage(){
  if (pageActive == 1) {
    return;
  }
  var bef = "#page-"+(pageActive-1);
  bef = $(bef);

  bef.css({
   top: "-250",
   display: "flex"
  });

  bef.animate({
   width: "100%",
   top: "0",
   opacity: "1",
   left: "0"
  }, delay);

  var af = "#page-"+pageActive;
  af = $(af);

  af.animate({
   top: "100%"
  }, delay);

  pageActive--;
  $("#menu-next-btn").fadeIn(delay);

  if (pageActive == 1) {
   $("#menu-previous-btn").fadeOut(delay);
}
}

function drawNavLeft(){
  $(".nav-left").html("");
  for (var i = 1; i <= countOfPages; i++) {
    if (i == pageActive) {
      $(".nav-left").append('<i class="glyphicon glyphicon-unchecked active"></i><br>');
      continue;
    }

    $(".nav-left").append('<i class="glyphicon glyphicon-unchecked"></i><br>');
  }
}
