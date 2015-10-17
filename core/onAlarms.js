chrome.alarms.onAlarm.addListener(function(alarm){
  chrome.app.window.create('views/adzan.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });

  audioPlay();

  chrome.alarms.clear(alarm.name, function(){
    return;
  });

  var opt = {
    type: "basic",
    title: "Primary Title",
    message: "Primary message to display"
  }

  chrome.notifications.create('adzan', opt, function(){

  });
});

function audioPlay() {
  var audio = new Audio('/assets/Audio/098.mp3');
  audio.play();
}
