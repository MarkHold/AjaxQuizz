/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  var start = 0;
  var active = 0;



  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");

  questionButton.addEventListener("click", function () {

    StartCounter();
    var req = new XMLHttpRequest();
    req.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {

      var questionLink = document.getElementById("stuff");

      questionLink.innerText = req.responseText;

    });
    req.send();


  });

  //Section for the POST method
  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea");

    var req = new XMLHttpRequest();
    req.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send("Answer");

  });


  //Section for the time counter

  var StartCounter = function () {


    if (active == 0) {
      active = 1;
      timeOut();
    } else {
      active = 0;
    }

  };
  var timeOut = function () {

    setTimeout(function () {
      var min = Math.floor(start / 10 / 60);
      var sec = Math.floor(start / 10);

      document.getElementById("time").innerHTML = min + ":" + sec + ":";

      //calling itself so that it can repeat adding the time.


      timeOut();
    }, 500);
  };


};

questions();

