var muslimsalatApiKey = '91ed7f846c24025c3ef0496aadd49ab8';
var monthly = null;

/*
* this function called whenever the chrome browser opens
* this function is where we load every variable that stored to
* the chrome local storage, so we can use it directly
*/
initiates();
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

/*
* this function called whenever the chrome browser opens
* this function is where we load every variable that stored to
* the chrome local storage, so we can use it directly
*/
function initiates(){
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

function checkTheTime(){
  var today = new Date();
  var query = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()

  var getId = -1;
  for (var i = 0; i < monthly.items.length; i++){
    var date_for = monthly.items[i].date_for;
    if (date_for == query){
      getId = i;
    }
  }

  if (getId < 0)
    return;

  setAlarms(monthly.items[getId]);
}

function setAlarms(dayFromMuslimSalat){
  /*
  * di sini, parameter dayFromMuslimSalat adalah item api
  * dari muslimsalat. Di situ sudah terdapat jam-jam sholat pada
  * hari yang bersangkutan.
  * Masalahnya, jam-jam yang disiapkan muslimsalat mengikuti format
  * 12 jam, jadi ada am dan pm. Dan kita harus merubahnya ke bentuk 24 jam
  * masalah lainnya lagi, bagaimana caranya? Karena data jam tadi bentuknya adalah
  * string
  *
  * sedang pada interval alarm pada chrome extension, count down
  * alarm didefinisikan dalam satuan menit
  */

  /*
  * contoh "6:30 pm"
  * pisahkan string di atas dengan spasi, hasilnya -> ["6:30", "pm"]
  * setelah itu, pisahkan "6:30" dengan pemisah spasi
  * hasilnya -> [["6", "30"], "pm"]
  */

  /*
  * Setelah time fix, maka kalkulasi jarak interval antara jam sekarang
  * dengan jam waktu sholat, dengan mengubah keduanya ke dalam satuan menit
  */

  // set the alarm for dhuhr
}
