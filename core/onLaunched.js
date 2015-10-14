initiates();
var timer = setTimeout(isMonthlyFull, 2000);

function isMonthlyFull() {
  if(monthly == null) {
    setTimeout(isMonthlyFull, 2000);
  } else {
    checkTheTime();
  }
}
