var friends = require("../data/friends");
var path = require("path")

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log("Recieved Post Request");
    console.log("Request Body: " + JSON.stringify(req.body))
    var friendMatch = {
      name: "",
      photo: "",
      differance: 1000
    }
    var userData = req.body;
    var userName = userData.name;
    var userPhoto = userData.photo;
    var userScores = userData.scores;

    var totalDifference = 0;

    for (var i = 0; i < userData.scores.length; i++) {
      var intScore = parseInt(userData.scores[i])
      userData.scores[i] = intScore;
    }


    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name)
      totalDifference = 0;

      for (var j = 0; j < friends[i].scores[j]; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        if (totalDifference <= friendMatch.differance) {

          friendMatch.name = friends[i].name;
          friendMatch.photo = friends[i].photo;
          friendMatch.differance = totalDifference;
        }
      }
    }
    console.log(friendMatch)
    friends.push(userData);
    return res.send(friendMatch);
  })


}
