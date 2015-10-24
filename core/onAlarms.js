chrome.alarms.onAlarm.addListener(function(alarm){

  if (alarm.name == "twitter") {
    getFromTwitter();
    return;
  }

  audioPlay();

  var opt = {
    type: "basic",
    title: alarm.name,
    message: "Sudah masuk waktu "+alarm.name+", yuk sholat berjamaah :)",
    iconUrl: "/assets/images/logo-128.png"
  }

  chrome.notifications.create('adzan', opt, function(){
    // this is the callback
  });

  chrome.alarms.clear(alarm.name, function(){
    return;
  });

});

function audioPlay() {
  var audio = new Audio('/assets/Audio/adzan.mp3');
  audio.play();
}
