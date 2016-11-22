/**
 * Created by markuslyconhold on 27/09/16.
 */

var HighScoreList;
var currentPlayer;

var questions = function () {

  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");
  var ReloadPageButton = document.getElementById("hidebutton");


  var currentPlayerButton = document.getElementById("UserNameButton");
  var currentPlayerStatus = document.getElementById("currentplayer");
  var AnswerArea = document.getElementById("AnswerArea");
  var RadioArea = document.getElementById("radioplace");

  var StartURL = "http://vhost3.lnu.se:20080/question/1";
  var questionLink = document.getElementById("Q1");
  var questAltLink = document.getElementById("Qalt");


  var start = 0;
  var active = 0;
  var countDown;

  var url = "http://vhost3.lnu.se:20080/question/1";
  var response;
  var nextLink;
  var Answer;
  var thetotaltimer = document.getElementById("timerName");

  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var theT;
  document.getElementById("Questions").style.visibility = "hidden";
  document.getElementById("radioplace").style.visibility = "hidden";
  document.getElementById("timerName").style.visibility = "hidden";
  document.getElementById("getQuestionButton").style.visibility = "hidden";
  document.getElementById("AnswerArea").style.visibility = "hidden";
  document.getElementById("startButton").style.visibility = "hidden";
  document.getElementById("time").style.visibility = "hidden";
  document.getElementById("EndSection").style.visibility = "hidden";
  document.getElementById("currentPlayerName").style.visibility = "hidden";
  document.getElementById("TheTotalTimeName").style.visibility = "hidden";
  document.getElementById("hidebutton").style.visibility = "hidden";



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
           questAltLink.innerText = JSON.stringify(response.alternatives);
           document.getElementById("AnswerArea").style.visibility = "hidden";
           document.getElementById("radioplace").style.visibility = "visible";
          }
          if(response.alternatives == null){
            questAltLink.innerText = '';
          }

        HideAllRadios();
        ShowArea();

        if(response.message != undefined && response.nextURL == undefined) {
          Success();
          newEntry();
        }
      }


      if(response.message == "Correct answer!"){
        document.getElementById("startButton").style.visibility = "visible";

        questionLink.innerText = "Correct Answer! Get the next question";
        countDown = 20;
      }
      else{
        document.getElementById("startButton").style.visibility = "hidden";

        /*clearInterval(counter);

        document.getElementById("EndSection").style.visibility = "visible";
        document.getElementById("hidebutton").style.visibility = "visible";

        document.getElementById("Questions").style.visibility = "hidden";
        document.getElementById("radioplace").style.visibility = "hidden";
        document.getElementById("timerName").style.visibility = "hidden";
        document.getElementById("getQuestionButton").style.visibility = "hidden";
        document.getElementById("AnswerArea").style.visibility = "hidden";
        document.getElementById("startButton").style.visibility = "hidden";
        document.getElementById("time").style.visibility = "hidden";
        document.getElementById("currentplayer").style.visibility = "hidden";
        document.getElementById("currentPlayerName").style.visibility = "hidden";
        document.getElementById("TheTotalTimeName").style.visibility = "hidden";


        document.getElementById("UserNameButton").style.visibility = "hidden";
        document.getElementById("UserNames").style.visibility = "hidden";
        document.getElementById("UserNameTitle").style.visibility = "hidden";

*/
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

  ReloadPageButton.onclick = function () {
    window.location.reload();
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
    currentPlayer = document.getElementById("UserNames").value;

    QuestionGame("GET", null);
    countDown = 20;
    TheDelay();
    document.getElementById("currentplayer").innerHTML = currentPlayer;

    document.getElementById("Questions").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "visible";
    document.getElementById("timerName").style.visibility = "visible";
    document.getElementById("getQuestionButton").style.visibility = "visible";
    document.getElementById("currentPlayerName").style.visibility = "visible";
    document.getElementById("AnswerArea").style.visibility = "visible";
   // document.getElementById("startButton").style.visibility = "visible";
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "visible";
    document.getElementById("TheTotalTimeName").style.visibility = "visible";


    document.getElementById("UserNameButton").style.visibility = "hidden";
    document.getElementById("UserNames").style.visibility = "hidden";
    document.getElementById("UserNameTitle").style.visibility = "hidden";
    document.getElementById("EndSection").style.visibility = "hidden";





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


  var counter = setInterval(timerx, 1000);

  function timerx(){
    countDown = countDown-1;
    if(countDown <= 0){
      clearInterval(counter);
      document.getElementById("timer").innerHTML = "Your 20 seconds are over.";

      document.getElementById("EndSection").style.visibility = "visible";
      document.getElementById("hidebutton").style.visibility = "visible";

      document.getElementById("Questions").style.visibility = "hidden";
      document.getElementById("radioplace").style.visibility = "hidden";
      document.getElementById("timerName").style.visibility = "hidden";
      document.getElementById("getQuestionButton").style.visibility = "hidden";
      document.getElementById("AnswerArea").style.visibility = "hidden";
      document.getElementById("startButton").style.visibility = "hidden";
      document.getElementById("time").style.visibility = "hidden";
      document.getElementById("currentplayer").style.visibility = "hidden";
      document.getElementById("currentPlayerName").style.visibility = "hidden";
      document.getElementById("TheTotalTimeName").style.visibility = "hidden";


      document.getElementById("UserNameButton").style.visibility = "hidden";
      document.getElementById("UserNames").style.visibility = "hidden";
      document.getElementById("UserNameTitle").style.visibility = "hidden";

      return;
    }
    document.getElementById("timer").innerHTML = countDown + " seconds";
  }

  function Success(){

    document.getElementById("EndSection").style.visibility = "visible";
    document.getElementById("hidebutton").style.visibility = "visible";

    document.getElementById("Questions").style.visibility = "hidden";
    document.getElementById("radioplace").style.visibility = "hidden";
    document.getElementById("timerName").style.visibility = "visible";
    document.getElementById("getQuestionButton").style.visibility = "hidden";
    document.getElementById("AnswerArea").style.visibility = "hidden";
    document.getElementById("startButton").style.visibility = "hidden";
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("currentplayer").style.visibility = "hidden";
    document.getElementById("currentPlayerName").style.visibility = "hidden";
    document.getElementById("TheTotalTimeName").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "hidden";
    clearTimeout(t);
    document.getElementById("UserNameButton").style.visibility = "hidden";
    document.getElementById("UserNames").style.visibility = "hidden";
    document.getElementById("UserNameTitle").style.visibility = "hidden";

    document.getElementById("Player1").innerText = JSON.parse(HighScoreList[0].name);
    document.getElementById("Score1").innerText = JSON.parse(HighScoreList[0].score);
    document.getElementById("Player2").innerText = JSON.parse(HighScoreList[1].name);
    document.getElementById("Score2").innerText = JSON.parse(HighScoreList[1].score);
    document.getElementById("Player3").innerText = JSON.parse(HighScoreList[2].name);
    document.getElementById("Score3").innerText = JSON.parse(HighScoreList[2].score);
    document.getElementById("Player4").innerText = JSON.parse(HighScoreList[3].name);
    document.getElementById("Score4").innerText = JSON.parse(HighScoreList[3].score);
    document.getElementById("Player5").innerText = JSON.parse(HighScoreList[4].name);
    document.getElementById("Score").innerText = JSON.parse(HighScoreList[4].score);

  }


  //Section for total time


  function countingTime() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    thetotaltimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" + (seconds > 9 ? seconds : "0" + seconds);

    TheDelay();
  }

  function TheDelay() {
    theT= setTimeout(countingTime, 1000);
  }


  function SaveToDataBase (){

    //Checks if they completed the quizz, and check if there time is
    //enough to be top5, if its enough, then it will run newEntry
    var boolean = false;
    var Trigger = "score";

    HighScoreList.forEach(function(entry){

      if(entry.hasOwnProperty(Trigger)){
        var value = entry[Trigger];
        /*you look in your scores, and his total time is less than theres, then he is
        added to the list*/
        if(thetotaltimer < value){
          boolean = true;
        }
      }
    });
    if(boolean){
      newEntry();
    }


  }

  function newEntry(){
    //inserts on index
    HighScoreList.splice(5, 0, {name: currentPlayer, score: thetotaltimer });

    //sort scores
    HighScoreList.sort(function(a,b){
      return a.score - b.score;
    });
    //starts at index 5, then takes away the index right after it (number 6).
    HighScoreList.splice(5,1);
    localStorage.setItem("SavedHighListObjectz", JSON.stringify(HighScoreList));
  }

};
function init(){

  //this if-statement runs if there is no highscore list already saved
  if(localStorage.getItem("SavedHighListObjectz") == undefined) {
    HighScoreList = [
      {'name': "Sam", 'score': 30000},
      {'name': "Markus", 'score': 55400},
      {'name': "Cody", 'score': 22100},
      {'name': "David", 'score': 39000},
      {'name': "Jackson", 'score': 5550}
    ];
    localStorage.setItem("SavedHighList", JSON.stringify(HighScoreList));
  }else{
    //or else we load this
    HighScoreList = JSON.parse(localStorage.getItem("SavedHighListObjectz"))
  }
}
init();
questions();



