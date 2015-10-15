var adzanList = null;
var bold = 0;

$(document).ready(function(){
  chrome.storage.local.get('adzanList', function(result){
    adzanList = result.adzanList;
    drawAdzanList();
  });
});

function drawAdzanList(){
  $('.adzan .adzan-list').html('');
  for (var i = 0; i < adzanList.length; i++){
    for (var key in adzanList[i]) {
      // check interval apakah negatif
      var today = new Date();
      var interval = (parseInt(adzanList[i][key]) - (today.getHours()*60 + today.getMinutes()));
      var isPositif = interval > 0;

      if (isPositif && bold == 0){
        $('.adzan .adzan-list').append('<p style="font-size:30pt">'+key+'</p>');

        var theTime = Math.floor(adzanList[i][key]/60) + ":" + (adzanList[i][key]%60);
        $('.adzan .adzan-list').append('<small>('+theTime+')</small>');
        bold = 1;

      }
      else{
        $('.adzan .adzan-list').append('<p style="font-size:18pt">'+key+'</p>');
      }
    }
  }

  bold = 0;
  setTimeout(drawAdzanList, 1000);
}
