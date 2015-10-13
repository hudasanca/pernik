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

chrome.app.runtime.onLaunched.addListener(function(){
  chrome.app.window.create('views/window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});

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

function initiates(){
  // get the monthly variable from local storage
  chrome.storage.local.get('monthly', function(result){
    monthly = result.monthly;
  });
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

  var waktuAdzan = dayFromMuslimSalat.asr+"+"+dayFromMuslimSalat.dhuhr+"+"+dayFromMuslimSalat.fajr+"+"+dayFromMuslimSalat.isha+"+"+dayFromMuslimSalat.maghrib;
  waktuAdzan = waktuAdzan.split("+");
  for (var i = 0; i < waktuAdzan.length; i++) {
    waktuAdzan[i] = waktuAdzan[i].split(" ");
    waktuAdzan[i][0] = waktuAdzan[i][0].split(":");
    for (var j = 0; j < waktuAdzan[i][0].length; j++) {
      waktuAdzan[i][0][j] = parseInt(waktuAdzan[i][0][j]);
    }
    if(waktuAdzan[i][1] == "pm"){
      waktuAdzan[i][0][0] = waktuAdzan[i][0][0] + 12;
    }
  }

  /*
  * Setelah time fix, maka kalkulasi jarak interval antara jam sekarang
  * dengan jam waktu sholat, dengan mengubah keduanya ke dalam satuan menit
  */

// set every time to minutes
  var asr = waktuAdzan[0][0][0]*60 + waktuAdzan[0][0][1];
  var dhuhr = waktuAdzan[1][0][0]*60 + waktuAdzan[1][0][1];
  var fajr = waktuAdzan[2][0][0]*60 + waktuAdzan[2][0][1];
  var isha = waktuAdzan[3][0][0]*60 + waktuAdzan[3][0][1];
  var maghrib = waktuAdzan[4][0][0]*60 + waktuAdzan[4][0][1];

  // set time for today into minutes
  var today = new Date();
  today = today.getHours()*60 + today.getMinutes();

// get the minutes countdown
  asr = asr - today;
  dhuhr = dhuhr - today;
  fajr = fajr - today;
  isha = isha - today;
  maghrib = maghrib - today;

  // create an alarms
  chrome.alarms.create('asr', {
    delayInMinutes: asr
  });
  chrome.alarms.create('dhuhr', {
    delayInMinutes: dhuhr
  });
  chrome.alarms.create('fajr', {
    delayInMinutes: fajr
  });
  chrome.alarms.create('isha', {
    delayInMinutes: isha
  });
  chrome.alarms.create('maghrib', {
    delayInMinutes: maghrib
  });
}
