(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  var min = 0;
  var sec = 0;
  var hr = 0;
  var t;
  document.getElementById("Questions").style.visibility = "hidden";
  document.getElementById("radioplace").style.visibility = "hidden";
  document.getElementById("timerName").style.visibility = "hidden";
  document.getElementById("getQuestionButton").style.visibility = "hidden";
  document.getElementById("AnswerArea").style.visibility = "hidden";
  document.getElementById("startButton").style.visibility = "hidden";
  document.getElementById("time").style.visibility = "hidden";
  document.getElementById("EndSection").style.visibility = "hidden";
  document.getElementById("currentPlayerName").style.visibility = "hidden";



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

    QuestionGame("GET", null);
    countDown = 20;
    timers();
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


  var counter = setInterval(timer, 1000);

  function timer(){
    countDown = countDown-1;
    if(countDown <= 0){
      clearInterval(counter);
      document.getElementById("timer").innerHTML = "Your 20 seconds are over.";

      document.getElementById("EndSection").style.visibility = "visible";

      document.getElementById("Questions").style.visibility = "hidden";
      document.getElementById("radioplace").style.visibility = "hidden";
      document.getElementById("timerName").style.visibility = "hidden";
      document.getElementById("getQuestionButton").style.visibility = "hidden";
      document.getElementById("AnswerArea").style.visibility = "hidden";
      document.getElementById("startButton").style.visibility = "hidden";
      document.getElementById("time").style.visibility = "hidden";
      document.getElementById("currentplayer").style.visibility = "hidden";
      document.getElementById("currentPlayerName").style.visibility = "hidden";
      document.getElementById("theTotal").style.visibility = "hidden";


      document.getElementById("UserNameButton").style.visibility = "hidden";
      document.getElementById("UserNames").style.visibility = "hidden";
      document.getElementById("UserNameTitle").style.visibility = "hidden";

      return;
    }
    document.getElementById("timer").innerHTML = countDown + " seconds";
  }


  //Section for total time


  function addTime(){

    sec++;
    if(sec >= 60){
      sec = 0;
      min++;
      if(min >= 60){
        min = 0;
        hr++;
      }
    }
    document.getElementById("theTotal").textContent = (hr ? (hr > 9 ? hr : "0" + hr) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (min > 9 ? min : "0" + min);
    timers();

  }
  function timers(){
    t = setTimeout(addTime,1000);
  }

  timers();


};
questions();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFya3VzbHljb25ob2xkIG9uIDI3LzA5LzE2LlxuICovXG52YXIgcXVlc3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG5cblxuICB2YXIgcXVlc3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpO1xuICB2YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpO1xuICB2YXIgRnVuY3Rpb25UZXN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRlYnV0dG9uXCIpO1xuXG5cbiAgdmFyIGN1cnJlbnRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lQnV0dG9uXCIpO1xuICB2YXIgY3VycmVudFBsYXllclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKTtcbiAgdmFyIEFuc3dlckFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIik7XG4gIHZhciBSYWRpb0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIik7XG5cbiAgdmFyIFN0YXJ0VVJMID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8yMVwiO1xuICB2YXIgcXVlc3Rpb25MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRMVwiKTtcbiAgdmFyIHF1ZXN0QWx0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUWFsdFwiKTtcblxuXG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBhY3RpdmUgPSAwO1xuICB2YXIgY291bnREb3duO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzFcIjtcbiAgdmFyIHJlc3BvbnNlO1xuICB2YXIgbmV4dExpbms7XG4gIHZhciBBbnN3ZXI7XG5cbiAgdmFyIG1pbiA9IDA7XG4gIHZhciBzZWMgPSAwO1xuICB2YXIgaHIgPSAwO1xuICB2YXIgdDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRdWVzdGlvbnNcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkVuZFNlY3Rpb25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG4gIGZ1bmN0aW9uIFF1ZXN0aW9uR2FtZShSZXF1ZXN0VHlwZSwgQW5zd2VyKXtcblxuICAgIHZhciBRdWVzdGlvblJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIFF1ZXN0aW9uUmVxLm9wZW4oUmVxdWVzdFR5cGUsIHVybCwgdHJ1ZSk7XG4gICAgUXVlc3Rpb25SZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICBRdWVzdGlvblJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXG4gICAgICBpZihRdWVzdGlvblJlcS5yZWFkeVN0YXRlID09PSA0ICYmIFF1ZXN0aW9uUmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cblxuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoUXVlc3Rpb25SZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gcmVzcG9uc2UucXVlc3Rpb247XG4gICAgICAgIHVybCA9IHJlc3BvbnNlLm5leHRVUkw7XG5cbiAgICAgICAgLy8gcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLmFsdGVybmF0aXZlcztcblxuICAgICAgICAgICBpZihyZXNwb25zZS5hbHRlcm5hdGl2ZXMgIT1udWxsKXtcbiAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmFsdGVybmF0aXZlcyk7XG4gICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcG9uc2UuYWx0ZXJuYXRpdmVzID09IG51bGwpe1xuICAgICAgICAgICAgcXVlc3RBbHRMaW5rLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgICAgIFNob3dBcmVhKCk7XG5cbiAgICAgICAgaWYocmVzcG9uc2UubmV4dFVSTCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb3VudERvd24gPSAwO1xuXG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICBpZihyZXNwb25zZS5tZXNzYWdlID09IFwiQ29ycmVjdCBhbnN3ZXIhXCIpe1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gXCJDb3JyZWN0IEFuc3dlciEgR2V0IHRoZSBuZXh0IHF1ZXN0aW9uXCI7XG4gICAgICAgIGNvdW50RG93biA9IDIwO1xuICAgICAgfVxuXG5cblxuICAgIH1cblxuICAgIC8vSWYgaXRzIGEgcG9zdCByZXF1ZXN0LCB0aGlzIHdpbGwgaGFwcGVuXG4gICAgaWYoUmVxdWVzdFR5cGUgPT0gXCJQT1NUXCIpe1xuICAgICAgdmFyIHRoZUFuc3dlciA9IHtcImFuc3dlclwiOiBBbnN3ZXJ9O1xuICAgICAgUXVlc3Rpb25SZXEuc2VuZChKU09OLnN0cmluZ2lmeSh0aGVBbnN3ZXIpKTtcbiAgICB9XG4gICAgICAvL290aGVyd2lzZSBpdHMgYSBHRVQgcmVxdWVzdC5cbiAgICBlbHNle1xuXG4gICAgICBRdWVzdGlvblJlcS5zZW5kKCk7XG5cbiAgICB9XG5cbn1cblxuXG4gIEZ1bmN0aW9uVGVzdEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRdWVzdGlvbnNcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50UGxheWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuICB9XG4gIGZ1bmN0aW9uIEhpZGVBcmVhKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9XG4gIGZ1bmN0aW9uIFNob3dBcmVhKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICB9XG4gIGZ1bmN0aW9uIFNob3dBbGxSYWRpb3MoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gSGlkZUFsbFJhZGlvcygpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIFNob3dSYWRpb0ZvdXIoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsdDRcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gSGlkZVJhZGlvRm91cigpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx0NFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxuXG4gIGN1cnJlbnRQbGF5ZXJCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAvL0hpZGVzIGV2ZXJ5dGhpbmcgdGhhdCBoYXMgbm90aGluZyB0byBkbyB3aXRoIGN1cnJlbnQgcGxheWVyIG5hbWUuXG4gICAgdmFyIGN1cnJlbnRQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS52YWx1ZTtcblxuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgICB0aW1lcnMoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuaW5uZXJIVE1MID0gY3VycmVudFBsYXllcjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRQbGF5ZXJOYW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVzXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkVuZFNlY3Rpb25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG5cblxuICB9XG5cblxuICBzdGFydEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgUXVlc3Rpb25HYW1lKFwiR0VUXCIsIG51bGwpO1xuICAgIGNvdW50RG93biA9IDIwO1xuICB9XG5cblxuICBxdWVzdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFuc3dlckFyZWFcIikudmFsdWU7XG4gICAgUXVlc3Rpb25HYW1lKFwiUE9TVFwiLCBBbnN3ZXIpO1xuXG5cbiAgfSk7XG5cbiAgLy9TZWN0aW9uIGZvciBjb3VudGRvd24gdGltZXJcblxuXG4gIHZhciBjb3VudGVyID0gc2V0SW50ZXJ2YWwodGltZXIsIDEwMDApO1xuXG4gIGZ1bmN0aW9uIHRpbWVyKCl7XG4gICAgY291bnREb3duID0gY291bnREb3duLTE7XG4gICAgaWYoY291bnREb3duIDw9IDApe1xuICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGVyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuaW5uZXJIVE1MID0gXCJZb3VyIDIwIHNlY29uZHMgYXJlIG92ZXIuXCI7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRW5kU2VjdGlvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZVRvdGFsXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVUaXRsZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IGNvdW50RG93biArIFwiIHNlY29uZHNcIjtcbiAgfVxuXG5cbiAgLy9TZWN0aW9uIGZvciB0b3RhbCB0aW1lXG5cblxuICBmdW5jdGlvbiBhZGRUaW1lKCl7XG5cbiAgICBzZWMrKztcbiAgICBpZihzZWMgPj0gNjApe1xuICAgICAgc2VjID0gMDtcbiAgICAgIG1pbisrO1xuICAgICAgaWYobWluID49IDYwKXtcbiAgICAgICAgbWluID0gMDtcbiAgICAgICAgaHIrKztcbiAgICAgIH1cbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVUb3RhbFwiKS50ZXh0Q29udGVudCA9IChociA/IChociA+IDkgPyBociA6IFwiMFwiICsgaHIpIDogXCIwMFwiKSArIFwiOlwiICsgKG1pbiA/IChtaW4gPiA5ID8gbWluIDogXCIwXCIgKyBtaW4pIDogXCIwMFwiKSArIFwiOlwiICsgKG1pbiA+IDkgPyBtaW4gOiBcIjBcIiArIG1pbik7XG4gICAgdGltZXJzKCk7XG5cbiAgfVxuICBmdW5jdGlvbiB0aW1lcnMoKXtcbiAgICB0ID0gc2V0VGltZW91dChhZGRUaW1lLDEwMDApO1xuICB9XG5cbiAgdGltZXJzKCk7XG5cblxufTtcbnF1ZXN0aW9ucygpO1xuXG4iXX0=
