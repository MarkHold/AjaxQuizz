/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {





  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");
  var currentPlayerButton = document.getElementById("UserNameButton");
  var currentPlayerStatus = document.getElementById("currentplayer");

  var start = 0;
  var active = 0;
  var Answer;

  var StartURL = "http://vhost3.lnu.se:20080/question/1";
  var questionLink = document.getElementById("stuff");
  var url;
  var response;
  var nextLink;


  function QuestionGame(RequestType, url, Answer){

    var QuestionReq = new XMLHttpRequest();
    QuestionReq.open(RequestType, url, true);
    QuestionReq.setRequestHeader("Content-Type", "application/json");

    QuestionReq.onreadystatechange = function(){

      if(QuestionReq.readyState === 4 && QuestionReq.status === 200) {


        response = JSON.parse(QuestionReq.responseText);
        console.log(response);
        questionLink.innerText = response.question;

        url = response.nextURL;
      }


      if(nextLink === undefined){
        //quizz done function
      }


    }

    if(RequestType == "POST"){
      var theAnswer = {"answer": Answer};
      QuestionReq.send(JSON.stringify(theAnswer));
    }
    else{

      QuestionReq.send();

    }

}



  currentPlayerButton.onclick = function(){
    var currentPlayer = document.getElementById("UserNames").value;
    document.getElementById("currentplayer").innerHTML = currentPlayer;

  }

  startButton.onclick = function(){
    QuestionGame("GET","http://vhost3.lnu.se:20080/question/1", null);
  }


  questionButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea").value;
    QuestionGame("POST", url, Answer);


  });








  //Section for the total time function

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

