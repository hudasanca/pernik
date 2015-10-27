function getFromTwitter(){
  $.ajax({
    url: 'http://lifehacksindo.com/pernik/get_tweets.php?count=30',
    dataType: 'json',
    success: function (data){
      var newTweets = data;

        newTweets = filterByHashtag(newTweets, 'pernik2015');

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
            if (tweets[0].id < newTweets[0].id) {
              // cari dan hitung ada berapa tweet baru, lantas push notif
              // satu per satu
              for (var i = 0; i < newTweets.length; i++) {
                if (tweets[0].id < newTweets[i].id) {
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
    },
    complete: function(){
      chrome.alarms.create('twitter', {
        periodInMinutes: 1
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
    var regex = new RegExp(hashtag, 'i');

    if (regex.test(data[i].text)) {
      result[result.length] = data[i];
    }
  }
  return result;
}

getFromTwitter();
