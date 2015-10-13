chrome.alarms.onAlarm.addListener(function(alarm){
  if (alarm.name == "dhuhr") {

  }
  else {
    chrome.app.window.create('views/adzan.html', {
      'outerBounds': {
        'width': 800,
        'height': 600
      }
    });
  }

  chrome.alarms.clear(alarm.name, function(){
    return;
  })
});
