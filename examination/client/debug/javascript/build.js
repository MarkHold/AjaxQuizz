(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */

var HighScoreList;
var currentPlayer;

/*

- tidsmätare, totalla för "FRÅGORNA" inte hela spelet.
- highscore lista

 */
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
    TheDelay();
  }


  questionButton.addEventListener("click", function () {
    var Answer = document.getElementById("AnswerArea").value;
    QuestionGame("POST", Answer);
    clearTimeout(theT);

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




},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cblxudmFyIEhpZ2hTY29yZUxpc3Q7XG52YXIgY3VycmVudFBsYXllcjtcblxuLypcblxuLSB0aWRzbcOkdGFyZSwgdG90YWxsYSBmw7ZyIFwiRlLDhUdPUk5BXCIgaW50ZSBoZWxhIHNwZWxldC5cbi0gaGlnaHNjb3JlIGxpc3RhXG5cbiAqL1xudmFyIHF1ZXN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgcXVlc3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpO1xuICB2YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpO1xuICB2YXIgUmVsb2FkUGFnZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkZWJ1dHRvblwiKTtcblxuXG4gIHZhciBjdXJyZW50UGxheWVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKTtcbiAgdmFyIGN1cnJlbnRQbGF5ZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIik7XG4gIHZhciBBbnN3ZXJBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpO1xuICB2YXIgUmFkaW9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpO1xuXG4gIHZhciBTdGFydFVSTCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICB2YXIgcXVlc3Rpb25MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRMVwiKTtcbiAgdmFyIHF1ZXN0QWx0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUWFsdFwiKTtcblxuXG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBhY3RpdmUgPSAwO1xuICB2YXIgY291bnREb3duO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzFcIjtcbiAgdmFyIHJlc3BvbnNlO1xuICB2YXIgbmV4dExpbms7XG4gIHZhciBBbnN3ZXI7XG4gIHZhciB0aGV0b3RhbHRpbWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIik7XG5cbiAgdmFyIHNlY29uZHMgPSAwO1xuICB2YXIgbWludXRlcyA9IDA7XG4gIHZhciBob3VycyA9IDA7XG4gIHZhciB0aGVUO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50UGxheWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG4gIGZ1bmN0aW9uIFF1ZXN0aW9uR2FtZShSZXF1ZXN0VHlwZSwgQW5zd2VyKXtcblxuICAgIHZhciBRdWVzdGlvblJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIFF1ZXN0aW9uUmVxLm9wZW4oUmVxdWVzdFR5cGUsIHVybCwgdHJ1ZSk7XG4gICAgUXVlc3Rpb25SZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICBRdWVzdGlvblJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXG4gICAgICBpZihRdWVzdGlvblJlcS5yZWFkeVN0YXRlID09PSA0ICYmIFF1ZXN0aW9uUmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cblxuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoUXVlc3Rpb25SZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gcmVzcG9uc2UucXVlc3Rpb247XG4gICAgICAgIHVybCA9IHJlc3BvbnNlLm5leHRVUkw7XG5cbiAgICAgICAgLy8gcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLmFsdGVybmF0aXZlcztcblxuICAgICAgICAgICBpZihyZXNwb25zZS5hbHRlcm5hdGl2ZXMgIT1udWxsKXtcbiAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmFsdGVybmF0aXZlcyk7XG4gICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcG9uc2UuYWx0ZXJuYXRpdmVzID09IG51bGwpe1xuICAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgICAgIFNob3dBcmVhKCk7XG5cbiAgICAgICAgaWYocmVzcG9uc2UubWVzc2FnZSAhPSB1bmRlZmluZWQgJiYgcmVzcG9uc2UubmV4dFVSTCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBTdWNjZXNzKCk7XG4gICAgICAgICAgbmV3RW50cnkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIGlmKHJlc3BvbnNlLm1lc3NhZ2UgPT0gXCJDb3JyZWN0IGFuc3dlciFcIil7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgICAgIHF1ZXN0aW9uTGluay5pbm5lclRleHQgPSBcIkNvcnJlY3QgQW5zd2VyISBHZXQgdGhlIG5leHQgcXVlc3Rpb25cIjtcbiAgICAgICAgY291bnREb3duID0gMjA7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG4gICAgICAgIC8qY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkVuZFNlY3Rpb25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50cGxheWVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlRoZVRvdGFsVGltZU5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZVRpdGxlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG4qL1xuICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvL0lmIGl0cyBhIHBvc3QgcmVxdWVzdCwgdGhpcyB3aWxsIGhhcHBlblxuICAgIGlmKFJlcXVlc3RUeXBlID09IFwiUE9TVFwiKXtcbiAgICAgIHZhciB0aGVBbnN3ZXIgPSB7XCJhbnN3ZXJcIjogQW5zd2VyfTtcbiAgICAgIFF1ZXN0aW9uUmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkodGhlQW5zd2VyKSk7XG4gICAgfVxuICAgICAgLy9vdGhlcndpc2UgaXRzIGEgR0VUIHJlcXVlc3QuXG4gICAgZWxzZXtcblxuICAgICAgUXVlc3Rpb25SZXEuc2VuZCgpO1xuXG4gICAgfVxuXG59XG5cbiAgUmVsb2FkUGFnZUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICBmdW5jdGlvbiBIaWRlQXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxuICBmdW5jdGlvbiBTaG93QXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cbiAgfVxuICBmdW5jdGlvbiBTaG93QWxsUmFkaW9zKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVBbGxSYWRpb3MoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBmdW5jdGlvbiBTaG93UmFkaW9Gb3VyKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHQ0XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVSYWRpb0ZvdXIoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsdDRcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBjdXJyZW50UGxheWVyQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgLy9IaWRlcyBldmVyeXRoaW5nIHRoYXQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBjdXJyZW50IHBsYXllciBuYW1lLlxuICAgIGN1cnJlbnRQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS52YWx1ZTtcblxuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgICBUaGVEZWxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKS5pbm5lckhUTUwgPSBjdXJyZW50UGxheWVyO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRdWVzdGlvbnNcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlRoZVRvdGFsVGltZU5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVzXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkVuZFNlY3Rpb25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG5cblxuICB9XG5cblxuICBzdGFydEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgUXVlc3Rpb25HYW1lKFwiR0VUXCIsIG51bGwpO1xuICAgIGNvdW50RG93biA9IDIwO1xuICAgIFRoZURlbGF5KCk7XG4gIH1cblxuXG4gIHF1ZXN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS52YWx1ZTtcbiAgICBRdWVzdGlvbkdhbWUoXCJQT1NUXCIsIEFuc3dlcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoZVQpO1xuXG4gIH0pO1xuXG4gIC8vU2VjdGlvbiBmb3IgY291bnRkb3duIHRpbWVyXG5cblxuICB2YXIgY291bnRlciA9IHNldEludGVydmFsKHRpbWVyeCwgMTAwMCk7XG5cbiAgZnVuY3Rpb24gdGltZXJ4KCl7XG4gICAgY291bnREb3duID0gY291bnREb3duLTE7XG4gICAgaWYoY291bnREb3duIDw9IDApe1xuICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuaW5uZXJIVE1MID0gXCJZb3VyIDIwIHNlY29uZHMgYXJlIG92ZXIuXCI7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IGNvdW50RG93biArIFwiIHNlY29uZHNcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIFN1Y2Nlc3MoKXtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVGhlVG90YWxUaW1lTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lVGl0bGVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBsYXllcjFcIikuaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShIaWdoU2NvcmVMaXN0WzBdLm5hbWUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2NvcmUxXCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFswXS5zY29yZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQbGF5ZXIyXCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFsxXS5uYW1lKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNjb3JlMlwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbMV0uc2NvcmUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUGxheWVyM1wiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbMl0ubmFtZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJTY29yZTNcIikuaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShIaWdoU2NvcmVMaXN0WzJdLnNjb3JlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBsYXllcjRcIikuaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShIaWdoU2NvcmVMaXN0WzNdLm5hbWUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2NvcmU0XCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFszXS5zY29yZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQbGF5ZXI1XCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFs0XS5uYW1lKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNjb3JlXCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFs0XS5zY29yZSk7XG5cbiAgfVxuXG5cbiAgLy9TZWN0aW9uIGZvciB0b3RhbCB0aW1lXG5cblxuICBmdW5jdGlvbiBjb3VudGluZ1RpbWUoKSB7XG4gICAgc2Vjb25kcysrO1xuICAgIGlmIChzZWNvbmRzID49IDYwKSB7XG4gICAgICBzZWNvbmRzID0gMDtcbiAgICAgIG1pbnV0ZXMrKztcbiAgICAgIGlmIChtaW51dGVzID49IDYwKSB7XG4gICAgICAgIG1pbnV0ZXMgPSAwO1xuICAgICAgICBob3VycysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoZXRvdGFsdGltZXIudGV4dENvbnRlbnQgPSAoaG91cnMgPyAoaG91cnMgPiA5ID8gaG91cnMgOiBcIjBcIiArIGhvdXJzKSA6IFwiMDBcIikgK1xuICAgICAgXCI6XCIgKyAobWludXRlcyA/IChtaW51dGVzID4gOSA/IG1pbnV0ZXMgOiBcIjBcIiArIG1pbnV0ZXMpIDogXCIwMFwiKSArXG4gICAgICBcIjpcIiArIChzZWNvbmRzID4gOSA/IHNlY29uZHMgOiBcIjBcIiArIHNlY29uZHMpO1xuXG4gICAgVGhlRGVsYXkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRoZURlbGF5KCkge1xuICAgIHRoZVQ9IHNldFRpbWVvdXQoY291bnRpbmdUaW1lLCAxMDAwKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gU2F2ZVRvRGF0YUJhc2UgKCl7XG5cbiAgICAvL0NoZWNrcyBpZiB0aGV5IGNvbXBsZXRlZCB0aGUgcXVpenosIGFuZCBjaGVjayBpZiB0aGVyZSB0aW1lIGlzXG4gICAgLy9lbm91Z2ggdG8gYmUgdG9wNSwgaWYgaXRzIGVub3VnaCwgdGhlbiBpdCB3aWxsIHJ1biBuZXdFbnRyeVxuICAgIHZhciBib29sZWFuID0gZmFsc2U7XG4gICAgdmFyIFRyaWdnZXIgPSBcInNjb3JlXCI7XG5cbiAgICBIaWdoU2NvcmVMaXN0LmZvckVhY2goZnVuY3Rpb24oZW50cnkpe1xuXG4gICAgICBpZihlbnRyeS5oYXNPd25Qcm9wZXJ0eShUcmlnZ2VyKSl7XG4gICAgICAgIHZhciB2YWx1ZSA9IGVudHJ5W1RyaWdnZXJdO1xuICAgICAgICAvKnlvdSBsb29rIGluIHlvdXIgc2NvcmVzLCBhbmQgaGlzIHRvdGFsIHRpbWUgaXMgbGVzcyB0aGFuIHRoZXJlcywgdGhlbiBoZSBpc1xuICAgICAgICBhZGRlZCB0byB0aGUgbGlzdCovXG4gICAgICAgIGlmKHRoZXRvdGFsdGltZXIgPCB2YWx1ZSl7XG4gICAgICAgICAgYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihib29sZWFuKXtcbiAgICAgIG5ld0VudHJ5KCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld0VudHJ5KCl7XG4gICAgLy9pbnNlcnRzIG9uIGluZGV4XG4gICAgSGlnaFNjb3JlTGlzdC5zcGxpY2UoNSwgMCwge25hbWU6IGN1cnJlbnRQbGF5ZXIsIHNjb3JlOiB0aGV0b3RhbHRpbWVyIH0pO1xuXG4gICAgLy9zb3J0IHNjb3Jlc1xuICAgIEhpZ2hTY29yZUxpc3Quc29ydChmdW5jdGlvbihhLGIpe1xuICAgICAgcmV0dXJuIGEuc2NvcmUgLSBiLnNjb3JlO1xuICAgIH0pO1xuICAgIC8vc3RhcnRzIGF0IGluZGV4IDUsIHRoZW4gdGFrZXMgYXdheSB0aGUgaW5kZXggcmlnaHQgYWZ0ZXIgaXQgKG51bWJlciA2KS5cbiAgICBIaWdoU2NvcmVMaXN0LnNwbGljZSg1LDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiU2F2ZWRIaWdoTGlzdE9iamVjdHpcIiwgSlNPTi5zdHJpbmdpZnkoSGlnaFNjb3JlTGlzdCkpO1xuICB9XG5cbn07XG5mdW5jdGlvbiBpbml0KCl7XG5cbiAgLy90aGlzIGlmLXN0YXRlbWVudCBydW5zIGlmIHRoZXJlIGlzIG5vIGhpZ2hzY29yZSBsaXN0IGFscmVhZHkgc2F2ZWRcbiAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTYXZlZEhpZ2hMaXN0T2JqZWN0elwiKSA9PSB1bmRlZmluZWQpIHtcbiAgICBIaWdoU2NvcmVMaXN0ID0gW1xuICAgICAgeyduYW1lJzogXCJTYW1cIiwgJ3Njb3JlJzogMzAwMDB9LFxuICAgICAgeyduYW1lJzogXCJNYXJrdXNcIiwgJ3Njb3JlJzogNTU0MDB9LFxuICAgICAgeyduYW1lJzogXCJDb2R5XCIsICdzY29yZSc6IDIyMTAwfSxcbiAgICAgIHsnbmFtZSc6IFwiRGF2aWRcIiwgJ3Njb3JlJzogMzkwMDB9LFxuICAgICAgeyduYW1lJzogXCJKYWNrc29uXCIsICdzY29yZSc6IDU1NTB9XG4gICAgXTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNhdmVkSGlnaExpc3RcIiwgSlNPTi5zdHJpbmdpZnkoSGlnaFNjb3JlTGlzdCkpO1xuICB9ZWxzZXtcbiAgICAvL29yIGVsc2Ugd2UgbG9hZCB0aGlzXG4gICAgSGlnaFNjb3JlTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTYXZlZEhpZ2hMaXN0T2JqZWN0elwiKSlcbiAgfVxufVxuaW5pdCgpO1xucXVlc3Rpb25zKCk7XG5cblxuXG4iXX0=
