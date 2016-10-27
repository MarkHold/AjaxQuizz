/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  


  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");


  var start = 0;
  var active = 0;

  var urlArray = ["http://vhost3.lnu.se:20080/question/1",
    "http://vhost3.lnu.se:20080/question/21",
    "http://vhost3.lnu.se:20080/question/321",
    "http://vhost3.lnu.se:20080/question/6",
    "http://vhost3.lnu.se:20080/question/32",
    "http://vhost3.lnu.se:20080/question/32456",
    "http://vhost3.lnu.se:20080/question/326"];

  var response;

  questionButton.addEventListener("click", function () {

    //StartCounter();
    var QuestionReq = new XMLHttpRequest();
    QuestionReq.open("GET", urlArray[0], true);
    QuestionReq.setRequestHeader("Content-Type", "application/json");

    //The onreadystatechange stores a function that can be called automaticly everytime the
    //ready state changes.

    QuestionReq.onreadystatechange = function(){

      if(QuestionReq.readyState === 4 && QuestionReq.status === 200) {


        var questionLink = document.getElementById("stuff");

        response = JSON.parse(QuestionReq.responseText);
        questionLink.innerText = response.question;

       }
    }
      QuestionReq.send();

  });




  //Section for the POST method
  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea");
    var req = new XMLHttpRequest();
    var url = "http://vhost3.lnu.se:20080/answer/1";
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    if(req.readyState === 4 && req.status === 200) {
      var newReq;
      console.log(newReq = JSON.parse(req.responseText));

    }

    var ans = JSON.stringify({answer: "2"});
    req.send(ans);

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

