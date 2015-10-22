function getFromTwitter(){
  $.ajax({
    url: 'http://localhost/twitter/get_tweets.php?count=20',
    dataType: 'json',
    success: function (data){
      var newTweets = data;

        newTweets = filterByHashtag(newTweets, 'motivation');

        chrome.storage.local.get('tweets', function (result){

          if (result.tweets == null || tweets == null) {
            if (newTweets.length == 0) {
              return;
            }
            tweets = newTweets;
          }
          else{
            // check if there are new tweets

            // jika di index ke-0 dari variable, id tweetnya berbeda dengan
            // yang tersimpan di local, maka ada tweet yang baru
            console.log("tweets -> "+tweets);
            if (tweets[0].id != newTweets[0].id) {
              // cari dan hitung ada berapa tweet baru, lantas push notif
              // satu per satu
              for (var i = 0; i < newTweets.length; i++) {
                if (tweets[0].id != newTweets[i].id) {
                  var opt = {
                    type: "basic",
                    title: "News!",
                    message: newTweets[i].text,
                    iconUrl: "/assets/images/logo-128.png"
                  }

                  chrome.notifications.create('news', opt, function(){
                    // this is the callback
                  });

                }
                else{
                  break;
                }
              }

              tweets = newTweets;
            }
          }

          chrome.storage.local.set({
            'tweets': tweets
          });
        });
    }
  });
}

function filterByHashtag(data, hashtag){
  var result = [];

  if (data == null) {
    return result;
  }

  for (var i = 0; i < data.length; i++){
    var regex = new RegExp(hashtag);

    if (regex.test(data[i].text)) {
      result[result.length] = data[i];
    }
  }
  return result;
}

getFromTwitter();

chrome.alarms.create('twitter', {
  periodInMinutes: 1
});
