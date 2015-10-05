var monthly = null;

$(document).ready(function(){
  chrome.storage.local.get('monthly', function(result){
    monthly = result.monthly;
    $("#title").html(monthly.title);
  });
});
