initiates();
var timer = setTimeout(isMonthlyFull, 2000);

function isMonthlyFull() {
  if(monthly == null) {
    setTimeout(isMonthlyFull, 2000);
  } else {
    checkTheTime();
  }
}

chrome.notifications.onClicked.addListener(function () {
  chrome.app.window.create('views/window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    },
    "resizable" : false,
  });
});
