var worker = function (trackedWords) {
  var twitter = require('ntwitter'),
    credentials = require('./credentials.js'),
    redis = require('redis'),
    client = redis.createClient(),
    t = null,
    words = [],
    i = 0;

  t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
  });

  for (i = 0; i < trackedWords.length; i++) {
    words.push(trackedWords[i].word);
  }

  t.stream(
    'statuses/filter',
    { track: words },
    function (stream) {
      stream.on('data', function(tweet) {
        for (var i = 0; i < trackedWords.length; i++) {
          if (tweet.text.match(trackedWords[i].word)) {
            if (trackedWords[i].type === "happy") {
              client.incr("happyCount");
            } else if (trackedWords[i].type === "sad") {
              client.incr("sadCount");
            }
          }
        }
      });
    }
  );
};

module.exports = worker;