/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  var start = 0;
  var active = 0;



  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");

  questionButton.addEventListener("click", function () {

    var url = JSON.stringify("http://vhost3.lnu.se:20080/question/21", null, 2);
    var req = new XMLHttpRequest();
    req.open("GET", "url", true);
    req.setRequestHeader("Content-Type", "application/json");

    //The onreadystatechange stores a function that can be called automaticly everytime the
    //ready state changes.
    
    req.onreadystatechange(){

      var questionLink = document.getElementById("stuff");

      questionLink.innerText = req.responseText;

    });
    req.send();


  });

  //Section for the POST method
  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea");
    var AnswerInJson = JSON.stringify({"answer": "Answer"});
    var req = new XMLHttpRequest();
    req.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
    req.setRequestHeader("Content-Type", "text/json");
    req.send("AnswerInJson");

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

    if(active == 1) {
      setTimeout(function () {
        start++;
        var min = Math.floor(start/10/60);
        var sec = Math.floor(start/10);
        var tenth = start % 10;

        if(min < 10){
          min = "0" + min;
        }
        if(sec < 10){
          sec = "0" + sec;
        }

        document.getElementById("time").innerHTML = min + ":" + sec + ":" + tenth;
        timeOut();
        //calling itself so that it can repeat adding the time.


        timeOut();
      }, 100);
    }
  };


};

questions();

