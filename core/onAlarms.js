chrome.alarms.onAlarm.addListener(function(alarm){
  chrome.app.window.create('views/adzan.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });

  audioPlay();

  var opt = {
    type: "basic",
    title: alarm.name,
    message: "Sudah masuk waktu adzan, yuk sholat berjamaah :)",
    iconUrl: "/assets/images/logo-128.png"
  }

  chrome.notifications.create('adzan', opt, function(){

  });

  chrome.alarms.clear(alarm.name, function(){
    return;
  });

});

function audioPlay() {
  var audio = new Audio('/assets/Audio/098.mp3');
  audio.play();
}
