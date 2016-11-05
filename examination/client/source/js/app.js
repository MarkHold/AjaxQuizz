/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {



  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");
  var FunctionTestButton = document.getElementById("hidebutton");

  var currentPlayerButton = document.getElementById("UserNameButton");
  var currentPlayerStatus = document.getElementById("currentplayer");
  var AnswerArea = document.getElementById("AnswerArea");
  var RadioArea = document.getElementById("radioplace");

  var StartURL = "http://vhost3.lnu.se:20080/question/21";
  var questionLink = document.getElementById("Q1");
  var questAltLink = document.getElementById("Qalt");


  var start = 0;
  var active = 0;
  var countDown;

  var url = "http://vhost3.lnu.se:20080/question/1";
  var response;
  var nextLink;
  var Answer;

  document.getElementById("Questions").style.visibility = "hidden";
  document.getElementById("radioplace").style.visibility = "hidden";
  document.getElementById("timerName").style.visibility = "hidden";
  document.getElementById("getQuestionButton").style.visibility = "hidden";
  document.getElementById("AnswerArea").style.visibility = "hidden";
  document.getElementById("startButton").style.visibility = "hidden";
  document.getElementById("time").style.visibility = "hidden";


  function QuestionGame(RequestType, Answer){

    var QuestionReq = new XMLHttpRequest();
    QuestionReq.open(RequestType, url, true);
    QuestionReq.setRequestHeader("Content-Type", "application/json");

    QuestionReq.onreadystatechange = function(){

      if(QuestionReq.readyState === 4 && QuestionReq.status === 200) {


        response = JSON.parse(QuestionReq.responseText);
        console.log(response);
        questionLink.innerText = response.question;
        url = response.nextURL;

        // questAltLink.innerText = response.alternatives;

         if(response.alternatives !=null){
           questAltLink.innerText = response.alternatives;
           AnswerArea.style.visibility = "hidden";
           RadioArea.style.visibility = "visible";
          }

        HideAllRadios();
        ShowArea();

        if(response.nextURL == undefined) {
          countDown = 0;

        }
      }


      if(response.message == "Correct answer!"){
        questionLink.innerText = "Correct Answer! Get the next question";
        countDown = 20;
      }


    }

    //If its a post request, this will happen
    if(RequestType == "POST"){
      var theAnswer = {"answer": Answer};
      QuestionReq.send(JSON.stringify(theAnswer));
    }
      //otherwise its a GET request.
    else{

      QuestionReq.send();

    }

}


  FunctionTestButton.onclick = function () {

    document.getElementById("Questions").style.visibility = "hidden";
    document.getElementById("radioplace").style.visibility = "hidden";
    document.getElementById("timerName").style.visibility = "hidden";
    document.getElementById("getQuestionButton").style.visibility = "hidden";
    document.getElementById("currentPlayerName").style.visibility = "hidden";
    document.getElementById("AnswerArea").style.visibility = "hidden";
    document.getElementById("startButton").style.visibility = "hidden";
    document.getElementById("time").style.visibility = "hidden";


  }
  function HideArea(){
    document.getElementById("AnswerArea").style.visibility = "hidden";
  }
  function ShowArea(){
    document.getElementById("AnswerArea").style.visibility = "visible";

  }
  function ShowAllRadios(){
    document.getElementById("radioplace").style.visibility = "visible";
  }

  function HideAllRadios(){
    document.getElementById("radioplace").style.visibility = "hidden";
  }

  function ShowRadioFour(){
    document.getElementById("alt4").style.visibility = "visible";
  }

  function HideRadioFour(){
    document.getElementById("alt4").style.visibility = "hidden";
  }

  currentPlayerButton.onclick = function(){
   //Hides everything that has nothing to do with current player name.
    var currentPlayer = document.getElementById("UserNames").value;
    document.getElementById("currentplayer").innerHTML = currentPlayer;

    document.getElementById("Questions").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "visible";
    document.getElementById("timerName").style.visibility = "visible";
    document.getElementById("getQuestionButton").style.visibility = "visible";
    document.getElementById("currentPlayerName").style.visibility = "visible";
    document.getElementById("AnswerArea").style.visibility = "visible";
    document.getElementById("startButton").style.visibility = "visible";
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "hidden";


    document.getElementById("UserNameButton").style.visibility = "hidden";
    document.getElementById("UserNames").style.visibility = "hidden";
    document.getElementById("UserNameTitle").style.visibility = "hidden";




  }


  startButton.onclick = function(){
    HideAllRadios();
    QuestionGame("GET", null);
    countDown = 20;
  }


  questionButton.addEventListener("click", function () {
    var Answer = document.getElementById("AnswerArea").value;
    QuestionGame("POST", Answer);


  });

  //Section for countdown timer


  var counter = setInterval(timer, 1000);

  function timer(){
    countDown = countDown-1;
    if(countDown <= 0){
      clearInterval(counter);
      document.getElementById("timer").innerHTML = "Your 20 seconds are over.";
      return;
    }
    document.getElementById("timer").innerHTML = countDown + " seconds";
  }


/*

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
*/
};

questions();

