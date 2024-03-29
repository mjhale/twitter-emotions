var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  twitterWorker = require('./twitter.js'),
  trackedWords = [],
  redis = require('redis'),
  client = redis.createClient();

app.configure(function () {
  app.use(express.static(path.join(__dirname, 'public')));
});

http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000");
});

// Index route
app.get("/", function (req, res) {
  res.render('index.html');
});

// List of tracked words
trackedWords = [
  { word: "great", type: "happy" },
  { word: "best", type: "happy" },
  { word: "bad", type: "sad" },
  { word: "worst", type: "sad" }
  ];

// Start the worker and pass the words
twitterWorker(trackedWords);

// Route that provides a list of happy word objects
app.get("/happy.json", function  (req, res) {
  var happyList = [],
    i;

  for (i = 0; i < trackedWords.length; i++) {
    if (trackedWords[i].type === "happy") {
      happyList.push(trackedWords[i]);
    }
  }

  res.json(happyList);
});

// Route that provides the count of happy words used
app.get("/happyCount.json", function  (req, res) {
  var jsonObject;

  client.get("happyCount", function (err, count) {
    if (err !== null) {
      console.log("Error: " + err);
    } else {
      jsonObject = {
        "happyCount": count
      };

      res.json(jsonObject);
    }
  });  
});

// Route that provides a list of sad word objects
app.get("/sad.json", function  (req, res) {
  var sadList = [],
    i;

  for (i = 0; i < trackedWords.length; i++) {
    if (trackedWords[i].type === "sad") {
      sadList.push(trackedWords[i]);
    }
  }

  res.json(sadList);
});

// Route that provides the count of sad words used
app.get("/sadCount.json", function  (req, res) {
  var jsonObject;

  client.get("sadCount", function (err, count) {
    if (err !== null) {
      console.log("Error: " + err);
    } else {
      jsonObject = {
        "sadCount": count
      };

      res.json(jsonObject);
    }
  });  
});