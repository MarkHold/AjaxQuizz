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

  var url = "http://vhost3.lnu.se:20080/question/1";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFya3VzbHljb25ob2xkIG9uIDI3LzA5LzE2LlxuICovXG5cbnZhciBIaWdoU2NvcmVMaXN0O1xudmFyIGN1cnJlbnRQbGF5ZXI7XG4vL3N0YXJ0IGZ1bmN0aW9uIGZvciBpbml0aWxpemluZyB0aGUgYXBwLlxuXG5mdW5jdGlvbiBpbml0KCl7XG4gIC8vdGhpcyBpZi1zdGF0ZW1lbnQgcnVucyBpZiB0aGVyZSBpcyBubyBoaWdoc2NvcmUgbGlzdCBhbHJlYWR5IHNhdmVkXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNhdmVkSGlnaExpc3RPYmplY3R6XCIpID09IHVuZGVmaW5lZCkge1xuICBIaWdoU2NvcmVMaXN0ID0gW1xuICAgIHsnbmFtZSc6IFwiYmFkdVwiLCAnc2NvcmUnOiAzMH0sXG4gICAgeyduYW1lJzogXCJ3YWJhZHVcIiwgJ3Njb3JlJzogNTU0fSxcbiAgICB7J25hbWUnOiBcIjNsdXVkXCIsICdzY29yZSc6IDIyMX0sXG4gICAgeyduYW1lJzogXCJub3QzbHV1ZFwiLCAnc2NvcmUnOiAzOX0sXG4gICAgeyduYW1lJzogXCJpbWJsYWNrXCIsICdzY29yZSc6IDU1NX1cbiAgXTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTYXZlZEhpZ2hMaXN0XCIsIEpTT04uc3RyaW5naWZ5KEhpZ2hTY29yZUxpc3QpKTtcbn1lbHNle1xuICAvL29yIGVsc2Ugd2UgbG9hZCB0aGlzXG4gIEhpZ2hTY29yZUxpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2F2ZWRIaWdoTGlzdE9iamVjdHpcIikpXG4gIH1cbn1cblxuXG52YXIgcXVlc3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBxdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIik7XG4gIHZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIik7XG4gIHZhciBSZWxvYWRQYWdlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpO1xuICB2YXIgU3RvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RvcFwiKTtcblxuXG4gIHZhciBjdXJyZW50UGxheWVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKTtcbiAgdmFyIGN1cnJlbnRQbGF5ZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIik7XG4gIHZhciBBbnN3ZXJBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpO1xuICB2YXIgUmFkaW9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpO1xuXG4gIHZhciBTdGFydFVSTCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMjFcIjtcbiAgdmFyIHF1ZXN0aW9uTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUTFcIik7XG4gIHZhciBxdWVzdEFsdExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbHRcIik7XG5cblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgYWN0aXZlID0gMDtcbiAgdmFyIGNvdW50RG93bjtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gIHZhciByZXNwb25zZTtcbiAgdmFyIG5leHRMaW5rO1xuICB2YXIgQW5zd2VyO1xuICB2YXIgdGhldG90YWx0aW1lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpO1xuXG4gIHZhciBzZWNvbmRzID0gMCwgbWludXRlcyA9IDAsIGhvdXJzID0gMCxcbiAgICB0O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50UGxheWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG4gIGZ1bmN0aW9uIFF1ZXN0aW9uR2FtZShSZXF1ZXN0VHlwZSwgQW5zd2VyKXtcblxuICAgIHZhciBRdWVzdGlvblJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIFF1ZXN0aW9uUmVxLm9wZW4oUmVxdWVzdFR5cGUsIHVybCwgdHJ1ZSk7XG4gICAgUXVlc3Rpb25SZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICBRdWVzdGlvblJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXG4gICAgICBpZihRdWVzdGlvblJlcS5yZWFkeVN0YXRlID09PSA0ICYmIFF1ZXN0aW9uUmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cblxuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoUXVlc3Rpb25SZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gcmVzcG9uc2UucXVlc3Rpb247XG4gICAgICAgIHVybCA9IHJlc3BvbnNlLm5leHRVUkw7XG5cbiAgICAgICAgLy8gcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLmFsdGVybmF0aXZlcztcblxuICAgICAgICAgICBpZihyZXNwb25zZS5hbHRlcm5hdGl2ZXMgIT1udWxsKXtcbiAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmFsdGVybmF0aXZlcyk7XG4gICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcG9uc2UuYWx0ZXJuYXRpdmVzID09IG51bGwpe1xuICAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgICAgIFNob3dBcmVhKCk7XG5cbiAgICAgICAgaWYocmVzcG9uc2UubmV4dFVSTCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb3VudERvd24gPSAwO1xuXG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICBpZihyZXNwb25zZS5tZXNzYWdlID09IFwiQ29ycmVjdCBhbnN3ZXIhXCIpe1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gXCJDb3JyZWN0IEFuc3dlciEgR2V0IHRoZSBuZXh0IHF1ZXN0aW9uXCI7XG4gICAgICAgIGNvdW50RG93biA9IDIwO1xuICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIC8vSWYgaXRzIGEgcG9zdCByZXF1ZXN0LCB0aGlzIHdpbGwgaGFwcGVuXG4gICAgaWYoUmVxdWVzdFR5cGUgPT0gXCJQT1NUXCIpe1xuICAgICAgdmFyIHRoZUFuc3dlciA9IHtcImFuc3dlclwiOiBBbnN3ZXJ9O1xuICAgICAgUXVlc3Rpb25SZXEuc2VuZChKU09OLnN0cmluZ2lmeSh0aGVBbnN3ZXIpKTtcbiAgICB9XG4gICAgICAvL290aGVyd2lzZSBpdHMgYSBHRVQgcmVxdWVzdC5cbiAgICBlbHNle1xuXG4gICAgICBRdWVzdGlvblJlcS5zZW5kKCk7XG5cbiAgICB9XG5cbn1cblxuXG4gIFJlbG9hZFBhZ2VCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbiAgZnVuY3Rpb24gSGlkZUFyZWEoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cbiAgZnVuY3Rpb24gU2hvd0FyZWEoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gIH1cbiAgZnVuY3Rpb24gU2hvd0FsbFJhZGlvcygpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBIaWRlQWxsUmFkaW9zKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9XG5cbiAgZnVuY3Rpb24gU2hvd1JhZGlvRm91cigpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx0NFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBIaWRlUmFkaW9Gb3VyKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHQ0XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9XG5cbiAgY3VycmVudFBsYXllckJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgIC8vSGlkZXMgZXZlcnl0aGluZyB0aGF0IGhhcyBub3RoaW5nIHRvIGRvIHdpdGggY3VycmVudCBwbGF5ZXIgbmFtZS5cbiAgICBjdXJyZW50UGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZXNcIikudmFsdWU7XG5cbiAgICBRdWVzdGlvbkdhbWUoXCJHRVRcIiwgbnVsbCk7XG4gICAgY291bnREb3duID0gMjA7XG4gICAgVGhlRGVsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuaW5uZXJIVE1MID0gY3VycmVudFBsYXllcjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVGhlVG90YWxUaW1lTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cblxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lVGl0bGVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJFbmRTZWN0aW9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cblxuXG5cbiAgfVxuXG5cbiAgc3RhcnRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgSGlkZUFsbFJhZGlvcygpO1xuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgfVxuXG5cbiAgcXVlc3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnZhbHVlO1xuICAgIFF1ZXN0aW9uR2FtZShcIlBPU1RcIiwgQW5zd2VyKTtcblxuXG4gIH0pO1xuXG4gIC8vU2VjdGlvbiBmb3IgY291bnRkb3duIHRpbWVyXG5cblxuICB2YXIgY291bnRlciA9IHNldEludGVydmFsKHRpbWVyeCwgMTAwMCk7XG5cbiAgZnVuY3Rpb24gdGltZXJ4KCl7XG4gICAgY291bnREb3duID0gY291bnREb3duLTE7XG4gICAgaWYoY291bnREb3duIDw9IDApe1xuICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuaW5uZXJIVE1MID0gXCJZb3VyIDIwIHNlY29uZHMgYXJlIG92ZXIuXCI7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZGVidXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUaGVUb3RhbFRpbWVOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IGNvdW50RG93biArIFwiIHNlY29uZHNcIjtcbiAgfVxuXG5cbiAgLy9TZWN0aW9uIGZvciB0b3RhbCB0aW1lXG5cbiAgZnVuY3Rpb24gY291bnRpbmdUaW1lKCkge1xuICAgIHNlY29uZHMrKztcbiAgICBpZiAoc2Vjb25kcyA+PSA2MCkge1xuICAgICAgc2Vjb25kcyA9IDA7XG4gICAgICBtaW51dGVzKys7XG4gICAgICBpZiAobWludXRlcyA+PSA2MCkge1xuICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgaG91cnMrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGV0b3RhbHRpbWVyLnRleHRDb250ZW50ID0gKGhvdXJzID8gKGhvdXJzID4gOSA/IGhvdXJzIDogXCIwXCIgKyBob3VycykgOiBcIjAwXCIpICsgXCI6XCIgKyAobWludXRlcyA/IChtaW51dGVzID4gOSA/IG1pbnV0ZXMgOiBcIjBcIiArIG1pbnV0ZXMpIDogXCIwMFwiKSArIFwiOlwiICsgKHNlY29uZHMgPiA5ID8gc2Vjb25kcyA6IFwiMFwiICsgc2Vjb25kcyk7XG5cbiAgICBUaGVEZWxheSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gVGhlRGVsYXkoKSB7XG4gICAgdCA9IHNldFRpbWVvdXQoY291bnRpbmdUaW1lLCAxMDAwKTtcbiAgfVxuXG5cbiAgU3RvcEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHQpO1xuICB9XG4gIGZ1bmN0aW9uIFNhdmVUb0RhdGFCYXNlICgpe1xuXG4gICAgLy9DaGVja3MgaWYgdGhleSBjb21wbGV0ZWQgdGhlIHF1aXp6LCBhbmQgY2hlY2sgaWYgdGhlcmUgdGltZSBpc1xuICAgIC8vZW5vdWdoIHRvIGJlIHRvcDUsIGlmIGl0cyBlbm91Z2gsIHRoZW4gaXQgd2lsbCBydW4gbmV3RW50cnlcbiAgICB2YXIgYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZhciBUcmlnZ2VyID0gXCJzY29yZVwiO1xuXG4gICAgSGlnaFNjb3JlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KXtcblxuICAgICAgaWYoZW50cnkuaGFzT3duUHJvcGVydHkoVHJpZ2dlcikpe1xuICAgICAgICB2YXIgdmFsdWUgPSBlbnRyeVtUcmlnZ2VyXTtcbiAgICAgICAgLyp5b3UgbG9vayBpbiB5b3VyIHNjb3JlcywgYW5kIGhpcyB0b3RhbCB0aW1lIGlzIGxlc3MgdGhhbiB0aGVyZXMsIHRoZW4gaGUgaXNcbiAgICAgICAgYWRkZWQgdG8gdGhlIGxpc3QqL1xuICAgICAgICBpZih0aGV0b3RhbHRpbWVyIDwgdmFsdWUpe1xuICAgICAgICAgIGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoYm9vbGVhbil7XG4gICAgICBuZXdFbnRyeSgpO1xuICAgIH1cblxuXG4gIH1cblxuICBmdW5jdGlvbiBuZXdFbnRyeSgpe1xuICAgIC8vaW5zZXJ0cyBvbiBpbmRleFxuICAgIEhpZ2hTY29yZUxpc3Quc3BsaWNlKDUsIDAsIHtuYW1lOiBjdXJyZW50UGxheWVyLCBzY29yZTogdGhldG90YWx0aW1lciB9KTtcblxuICAgIC8vc29ydCBzY29yZXNcbiAgICBIaWdoU2NvcmVMaXN0LnNvcnQoZnVuY3Rpb24oYSxiKXtcbiAgICAgIHJldHVybiBhLnNjb3JlIC0gYi5zY29yZTtcbiAgICB9KTtcbiAgICAvL3N0YXJ0cyBhdCBpbmRleCA1LCB0aGVuIHRha2VzIGF3YXkgdGhlIGluZGV4IHJpZ2h0IGFmdGVyIGl0IChudW1iZXIgNikuXG4gICAgSGlnaFNjb3JlTGlzdC5zcGxpY2UoNSwxKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNhdmVkSGlnaExpc3RPYmplY3R6XCIsIEpTT04uc3RyaW5naWZ5KEhpZ2hTY29yZUxpc3QpKTtcbiAgfVxuXG59O1xuaW5pdCgpO1xucXVlc3Rpb25zKCk7XG5cbiJdfQ==
