var muslimsalatApiKey = '91ed7f846c24025c3ef0496aadd49ab8';
var monthly = null;

inisialisasi();

/*
* this is the event listener that defines what the app will do when it get
* installed at the first time
*/
chrome.runtime.onInstalled.addListener(function(){
  // this is where we should get the api of muslimsalat.com
  // and store them to chrome local storage

  /*
  * first we need to check whether the variable month is null or not.
  * If it is null, we need to get the data from the api of muslimsalat.
  * But if not, we need to check, is the data relevant today
  */

  if (monthly == null) {
    getDataFromMuslimSalat();
  }
});

/*
* this is the event listener where the Application is launched
*//*
* this function called whenever the chrome browser opens
* this function is where we load every variable that stored to
* the chrome local storage, so we can use it directly
*/
chrome.app.runtime.onLaunched.addListener(function(){
  chrome.app.window.create('views/window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});

/*
* adding listener on alarms event. This is absolutely where the alarms event of
* prayers time is done
*/
chrome.alarms.onAlarm.addListener(function(alarm){
  chrome.app.window.create('views/adzan.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });
});

chrome.alarms.create('adzan', {
  delayInMinutes: 1
});

/*
* this function called whenever the chrome browser opens
* this function is where we load every variable that stored to
* the chrome local storage, so we can use it directly
*/
function inisialisasi(){
  // get the monthly variable from local storage
  chrome.storage.local.get('monthly', function(result){
    monthly = result.monthly;
  });
}

function getDataFromMuslimSalat(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://muslimsalat.com/bangkalan/monthly.json?key='+muslimsalatApiKey, true);
  xhr.onreadystatechange = function(e){
    var data = JSON.parse(xhr.responseText);

    chrome.storage.local.set({
      "monthly": data
    });

    monthly = data;
  }

  xhr.send();
}

// function checkTheTime(){
//   var today = new Date();
//   var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
//   var hour = today.getHours();
//   var minute = today.getMinutes();
//   var second = today.getSeconds();
//   var time = "";
//   var postfix = "";
//   if (hour > 12) {
//     hour -= 12;
//     postfix += " pm";
//   }
//   else{
//     postfix += " am";
//   }
//
//   time = hour+":"+minute+postfix;
//
//   console.log(time);
//
//   if (minute == 21){
//     chrome.app.window.create('adzan.html', {
//       'outerBounds': {
//         'width': 800,
//         'height': 600
//       }
//     });
//   }
//
//   setTimeout(function(){
//     checkTheTime();
//   }, 30000);
// }
