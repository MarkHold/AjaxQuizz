(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */

var HighScoreList;
var currentPlayer;
//start function for initilizing the app.

function init(){
  //this if-statement runs if there is no highscore list already saved
if(localStorage.getItem("SavedHighListObjectz") == undefined) {
  HighScoreList = [
    {'name': "badu", 'score': 30},
    {'name': "wabadu", 'score': 554},
    {'name': "3luud", 'score': 221},
    {'name': "not3luud", 'score': 39},
    {'name': "imblack", 'score': 555}
  ];
  localStorage.setItem("SavedHighList", JSON.stringify(HighScoreList));
}else{
  //or else we load this
  HighScoreList = JSON.parse(localStorage.getItem("SavedHighListObjectz"))
  }
}


var questions = function () {

  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");
  var ReloadPageButton = document.getElementById("hidebutton");
  var StopButton = document.getElementById("stop");


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

  var url = "http://vhost3.lnu.se:20080/question/32456";
  var response;
  var nextLink;
  var Answer;
  var thetotaltimer = document.getElementById("timerName");

  var seconds = 0, minutes = 0, hours = 0,
    t;
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
          console.log("1231");
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
    document.getElementById("startButton").style.visibility = "visible";
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

    thetotaltimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    TheDelay();
  }

  function TheDelay() {
    t = setTimeout(countingTime, 1000);
  }


  StopButton.onclick = function() {
    clearTimeout(t);
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
init();
questions();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFya3VzbHljb25ob2xkIG9uIDI3LzA5LzE2LlxuICovXG5cbnZhciBIaWdoU2NvcmVMaXN0O1xudmFyIGN1cnJlbnRQbGF5ZXI7XG4vL3N0YXJ0IGZ1bmN0aW9uIGZvciBpbml0aWxpemluZyB0aGUgYXBwLlxuXG5mdW5jdGlvbiBpbml0KCl7XG4gIC8vdGhpcyBpZi1zdGF0ZW1lbnQgcnVucyBpZiB0aGVyZSBpcyBubyBoaWdoc2NvcmUgbGlzdCBhbHJlYWR5IHNhdmVkXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNhdmVkSGlnaExpc3RPYmplY3R6XCIpID09IHVuZGVmaW5lZCkge1xuICBIaWdoU2NvcmVMaXN0ID0gW1xuICAgIHsnbmFtZSc6IFwiYmFkdVwiLCAnc2NvcmUnOiAzMH0sXG4gICAgeyduYW1lJzogXCJ3YWJhZHVcIiwgJ3Njb3JlJzogNTU0fSxcbiAgICB7J25hbWUnOiBcIjNsdXVkXCIsICdzY29yZSc6IDIyMX0sXG4gICAgeyduYW1lJzogXCJub3QzbHV1ZFwiLCAnc2NvcmUnOiAzOX0sXG4gICAgeyduYW1lJzogXCJpbWJsYWNrXCIsICdzY29yZSc6IDU1NX1cbiAgXTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTYXZlZEhpZ2hMaXN0XCIsIEpTT04uc3RyaW5naWZ5KEhpZ2hTY29yZUxpc3QpKTtcbn1lbHNle1xuICAvL29yIGVsc2Ugd2UgbG9hZCB0aGlzXG4gIEhpZ2hTY29yZUxpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2F2ZWRIaWdoTGlzdE9iamVjdHpcIikpXG4gIH1cbn1cblxuXG52YXIgcXVlc3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBxdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIik7XG4gIHZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIik7XG4gIHZhciBSZWxvYWRQYWdlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpO1xuICB2YXIgU3RvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RvcFwiKTtcblxuXG4gIHZhciBjdXJyZW50UGxheWVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKTtcbiAgdmFyIGN1cnJlbnRQbGF5ZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIik7XG4gIHZhciBBbnN3ZXJBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpO1xuICB2YXIgUmFkaW9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpO1xuXG4gIHZhciBTdGFydFVSTCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMjFcIjtcbiAgdmFyIHF1ZXN0aW9uTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUTFcIik7XG4gIHZhciBxdWVzdEFsdExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbHRcIik7XG5cblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgYWN0aXZlID0gMDtcbiAgdmFyIGNvdW50RG93bjtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8zMjQ1NlwiO1xuICB2YXIgcmVzcG9uc2U7XG4gIHZhciBuZXh0TGluaztcbiAgdmFyIEFuc3dlcjtcbiAgdmFyIHRoZXRvdGFsdGltZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKTtcblxuICB2YXIgc2Vjb25kcyA9IDAsIG1pbnV0ZXMgPSAwLCBob3VycyA9IDAsXG4gICAgdDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRdWVzdGlvbnNcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkVuZFNlY3Rpb25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVGhlVG90YWxUaW1lTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cblxuICBmdW5jdGlvbiBRdWVzdGlvbkdhbWUoUmVxdWVzdFR5cGUsIEFuc3dlcil7XG5cbiAgICB2YXIgUXVlc3Rpb25SZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBRdWVzdGlvblJlcS5vcGVuKFJlcXVlc3RUeXBlLCB1cmwsIHRydWUpO1xuICAgIFF1ZXN0aW9uUmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgUXVlc3Rpb25SZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcblxuICAgICAgaWYoUXVlc3Rpb25SZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiBRdWVzdGlvblJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG5cbiAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKFF1ZXN0aW9uUmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLnF1ZXN0aW9uO1xuICAgICAgICB1cmwgPSByZXNwb25zZS5uZXh0VVJMO1xuXG4gICAgICAgIC8vIHF1ZXN0QWx0TGluay5pbm5lclRleHQgPSByZXNwb25zZS5hbHRlcm5hdGl2ZXM7XG5cbiAgICAgICAgICAgaWYocmVzcG9uc2UuYWx0ZXJuYXRpdmVzICE9bnVsbCl7XG4gICAgICAgICAgIHF1ZXN0QWx0TGluay5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5hbHRlcm5hdGl2ZXMpO1xuICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlc3BvbnNlLmFsdGVybmF0aXZlcyA9PSBudWxsKXtcbiAgICAgICAgICAgIHF1ZXN0QWx0TGluay5pbm5lclRleHQgPSAnJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgSGlkZUFsbFJhZGlvcygpO1xuICAgICAgICBTaG93QXJlYSgpO1xuXG4gICAgICAgIGlmKHJlc3BvbnNlLm1lc3NhZ2UgIT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlLm5leHRVUkwgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgU3VjY2VzcygpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiMTIzMVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIGlmKHJlc3BvbnNlLm1lc3NhZ2UgPT0gXCJDb3JyZWN0IGFuc3dlciFcIil7XG4gICAgICAgIHF1ZXN0aW9uTGluay5pbm5lclRleHQgPSBcIkNvcnJlY3QgQW5zd2VyISBHZXQgdGhlIG5leHQgcXVlc3Rpb25cIjtcbiAgICAgICAgY291bnREb3duID0gMjA7XG4gICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgLy9JZiBpdHMgYSBwb3N0IHJlcXVlc3QsIHRoaXMgd2lsbCBoYXBwZW5cbiAgICBpZihSZXF1ZXN0VHlwZSA9PSBcIlBPU1RcIil7XG4gICAgICB2YXIgdGhlQW5zd2VyID0ge1wiYW5zd2VyXCI6IEFuc3dlcn07XG4gICAgICBRdWVzdGlvblJlcS5zZW5kKEpTT04uc3RyaW5naWZ5KHRoZUFuc3dlcikpO1xuICAgIH1cbiAgICAgIC8vb3RoZXJ3aXNlIGl0cyBhIEdFVCByZXF1ZXN0LlxuICAgIGVsc2V7XG5cbiAgICAgIFF1ZXN0aW9uUmVxLnNlbmQoKTtcblxuICAgIH1cblxufVxuXG5cbiAgUmVsb2FkUGFnZUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICBmdW5jdGlvbiBIaWRlQXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxuICBmdW5jdGlvbiBTaG93QXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cbiAgfVxuICBmdW5jdGlvbiBTaG93QWxsUmFkaW9zKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVBbGxSYWRpb3MoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBmdW5jdGlvbiBTaG93UmFkaW9Gb3VyKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHQ0XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVSYWRpb0ZvdXIoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsdDRcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBjdXJyZW50UGxheWVyQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgLy9IaWRlcyBldmVyeXRoaW5nIHRoYXQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBjdXJyZW50IHBsYXllciBuYW1lLlxuICAgIGN1cnJlbnRQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS52YWx1ZTtcblxuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgICBUaGVEZWxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKS5pbm5lckhUTUwgPSBjdXJyZW50UGxheWVyO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRdWVzdGlvbnNcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lVGl0bGVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJFbmRTZWN0aW9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cblxuXG5cbiAgfVxuXG5cbiAgc3RhcnRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgSGlkZUFsbFJhZGlvcygpO1xuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgfVxuXG5cbiAgcXVlc3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnZhbHVlO1xuICAgIFF1ZXN0aW9uR2FtZShcIlBPU1RcIiwgQW5zd2VyKTtcblxuXG4gIH0pO1xuXG4gIC8vU2VjdGlvbiBmb3IgY291bnRkb3duIHRpbWVyXG5cblxuICB2YXIgY291bnRlciA9IHNldEludGVydmFsKHRpbWVyeCwgMTAwMCk7XG5cbiAgZnVuY3Rpb24gdGltZXJ4KCl7XG4gICAgY291bnREb3duID0gY291bnREb3duLTE7XG4gICAgaWYoY291bnREb3duIDw9IDApe1xuICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuaW5uZXJIVE1MID0gXCJZb3VyIDIwIHNlY29uZHMgYXJlIG92ZXIuXCI7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IGNvdW50RG93biArIFwiIHNlY29uZHNcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIFN1Y2Nlc3MoKXtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVGhlVG90YWxUaW1lTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lVGl0bGVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQbGF5ZXIxXCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFswXS5uYW1lKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNjb3JlMVwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbMF0uc2NvcmUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUGxheWVyMlwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbMV0ubmFtZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJTY29yZTJcIikuaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShIaWdoU2NvcmVMaXN0WzFdLnNjb3JlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBsYXllcjNcIikuaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShIaWdoU2NvcmVMaXN0WzJdLm5hbWUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2NvcmUzXCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFsyXS5zY29yZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQbGF5ZXI0XCIpLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoSGlnaFNjb3JlTGlzdFszXS5uYW1lKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNjb3JlNFwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbM10uc2NvcmUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUGxheWVyNVwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbNF0ubmFtZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJTY29yZVwiKS5pbm5lclRleHQgPSBKU09OLnBhcnNlKEhpZ2hTY29yZUxpc3RbNF0uc2NvcmUpO1xuXG4gIH1cblxuXG4gIC8vU2VjdGlvbiBmb3IgdG90YWwgdGltZVxuXG4gIGZ1bmN0aW9uIGNvdW50aW5nVGltZSgpIHtcbiAgICBzZWNvbmRzKys7XG4gICAgaWYgKHNlY29uZHMgPj0gNjApIHtcbiAgICAgIHNlY29uZHMgPSAwO1xuICAgICAgbWludXRlcysrO1xuICAgICAgaWYgKG1pbnV0ZXMgPj0gNjApIHtcbiAgICAgICAgbWludXRlcyA9IDA7XG4gICAgICAgIGhvdXJzKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhldG90YWx0aW1lci50ZXh0Q29udGVudCA9IChob3VycyA/IChob3VycyA+IDkgPyBob3VycyA6IFwiMFwiICsgaG91cnMpIDogXCIwMFwiKSArIFwiOlwiICsgKG1pbnV0ZXMgPyAobWludXRlcyA+IDkgPyBtaW51dGVzIDogXCIwXCIgKyBtaW51dGVzKSA6IFwiMDBcIikgKyBcIjpcIiArIChzZWNvbmRzID4gOSA/IHNlY29uZHMgOiBcIjBcIiArIHNlY29uZHMpO1xuXG4gICAgVGhlRGVsYXkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFRoZURlbGF5KCkge1xuICAgIHQgPSBzZXRUaW1lb3V0KGNvdW50aW5nVGltZSwgMTAwMCk7XG4gIH1cblxuXG4gIFN0b3BCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dCh0KTtcbiAgfVxuICBmdW5jdGlvbiBTYXZlVG9EYXRhQmFzZSAoKXtcblxuICAgIC8vQ2hlY2tzIGlmIHRoZXkgY29tcGxldGVkIHRoZSBxdWl6eiwgYW5kIGNoZWNrIGlmIHRoZXJlIHRpbWUgaXNcbiAgICAvL2Vub3VnaCB0byBiZSB0b3A1LCBpZiBpdHMgZW5vdWdoLCB0aGVuIGl0IHdpbGwgcnVuIG5ld0VudHJ5XG4gICAgdmFyIGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2YXIgVHJpZ2dlciA9IFwic2NvcmVcIjtcblxuICAgIEhpZ2hTY29yZUxpc3QuZm9yRWFjaChmdW5jdGlvbihlbnRyeSl7XG5cbiAgICAgIGlmKGVudHJ5Lmhhc093blByb3BlcnR5KFRyaWdnZXIpKXtcbiAgICAgICAgdmFyIHZhbHVlID0gZW50cnlbVHJpZ2dlcl07XG4gICAgICAgIC8qeW91IGxvb2sgaW4geW91ciBzY29yZXMsIGFuZCBoaXMgdG90YWwgdGltZSBpcyBsZXNzIHRoYW4gdGhlcmVzLCB0aGVuIGhlIGlzXG4gICAgICAgIGFkZGVkIHRvIHRoZSBsaXN0Ki9cbiAgICAgICAgaWYodGhldG90YWx0aW1lciA8IHZhbHVlKXtcbiAgICAgICAgICBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKGJvb2xlYW4pe1xuICAgICAgbmV3RW50cnkoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgZnVuY3Rpb24gbmV3RW50cnkoKXtcbiAgICAvL2luc2VydHMgb24gaW5kZXhcbiAgICBIaWdoU2NvcmVMaXN0LnNwbGljZSg1LCAwLCB7bmFtZTogY3VycmVudFBsYXllciwgc2NvcmU6IHRoZXRvdGFsdGltZXIgfSk7XG5cbiAgICAvL3NvcnQgc2NvcmVzXG4gICAgSGlnaFNjb3JlTGlzdC5zb3J0KGZ1bmN0aW9uKGEsYil7XG4gICAgICByZXR1cm4gYS5zY29yZSAtIGIuc2NvcmU7XG4gICAgfSk7XG4gICAgLy9zdGFydHMgYXQgaW5kZXggNSwgdGhlbiB0YWtlcyBhd2F5IHRoZSBpbmRleCByaWdodCBhZnRlciBpdCAobnVtYmVyIDYpLlxuICAgIEhpZ2hTY29yZUxpc3Quc3BsaWNlKDUsMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTYXZlZEhpZ2hMaXN0T2JqZWN0elwiLCBKU09OLnN0cmluZ2lmeShIaWdoU2NvcmVMaXN0KSk7XG4gIH1cblxufTtcbmluaXQoKTtcbnF1ZXN0aW9ucygpO1xuXG4iXX0=
