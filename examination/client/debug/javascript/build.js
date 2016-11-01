(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    currentPlayer = document.getElementById("currentplayer").innerHTML;

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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cbnZhciBxdWVzdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cblxuXG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSBHRVQgTWV0aG9kXG4gIHZhciBxdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIik7XG4gIHZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIik7XG4gIHZhciBjdXJyZW50UGxheWVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKTtcbiAgdmFyIGN1cnJlbnRQbGF5ZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIik7XG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGFjdGl2ZSA9IDA7XG4gIHZhciBBbnN3ZXI7XG5cbiAgdmFyIFN0YXJ0VVJMID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gIHZhciBxdWVzdGlvbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0dWZmXCIpO1xuICB2YXIgdXJsO1xuICB2YXIgcmVzcG9uc2U7XG4gIHZhciBuZXh0TGluaztcblxuXG4gIGZ1bmN0aW9uIFF1ZXN0aW9uR2FtZShSZXF1ZXN0VHlwZSwgdXJsLCBBbnN3ZXIpe1xuXG4gICAgdmFyIFF1ZXN0aW9uUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgUXVlc3Rpb25SZXEub3BlbihSZXF1ZXN0VHlwZSwgdXJsLCB0cnVlKTtcbiAgICBRdWVzdGlvblJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgIFF1ZXN0aW9uUmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgIGlmKFF1ZXN0aW9uUmVxLnJlYWR5U3RhdGUgPT09IDQgJiYgUXVlc3Rpb25SZXEuc3RhdHVzID09PSAyMDApIHtcblxuXG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShRdWVzdGlvblJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIHF1ZXN0aW9uTGluay5pbm5lclRleHQgPSByZXNwb25zZS5xdWVzdGlvbjtcblxuICAgICAgICB1cmwgPSByZXNwb25zZS5uZXh0VVJMO1xuICAgICAgfVxuXG5cbiAgICAgIGlmKG5leHRMaW5rID09PSB1bmRlZmluZWQpe1xuICAgICAgICAvL3F1aXp6IGRvbmUgZnVuY3Rpb25cbiAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgaWYoUmVxdWVzdFR5cGUgPT0gXCJQT1NUXCIpe1xuICAgICAgdmFyIHRoZUFuc3dlciA9IHtcImFuc3dlclwiOiBBbnN3ZXJ9O1xuICAgICAgUXVlc3Rpb25SZXEuc2VuZChKU09OLnN0cmluZ2lmeSh0aGVBbnN3ZXIpKTtcbiAgICB9XG4gICAgZWxzZXtcblxuICAgICAgUXVlc3Rpb25SZXEuc2VuZCgpO1xuXG4gICAgfVxuXG59XG5cblxuXG4gIGN1cnJlbnRQbGF5ZXJCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGN1cnJlbnRQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS52YWx1ZTtcbiAgICBjdXJyZW50UGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50cGxheWVyXCIpLmlubmVySFRNTDtcblxuICB9XG5cbiAgc3RhcnRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgUXVlc3Rpb25HYW1lKFwiR0VUXCIsXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCIsIG51bGwpO1xuICB9XG5cblxuICBxdWVzdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS52YWx1ZTtcbiAgICBRdWVzdGlvbkdhbWUoXCJQT1NUXCIsIHVybCwgQW5zd2VyKTtcblxuXG4gIH0pO1xuXG5cblxuXG5cblxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgdG90YWwgdGltZSBmdW5jdGlvblxuXG4gIHZhciBTdGFydENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoYWN0aXZlID09IDApIHtcbiAgICAgIGFjdGl2ZSA9IDE7XG4gICAgICB0aW1lT3V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZSA9IDA7XG4gICAgfVxuXG4gIH07XG5cblxuICB2YXIgdGltZU91dCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmKGFjdGl2ZSA9PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc3RhcnQvMTAvNjApO1xuICAgICAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihzdGFydC8xMCk7XG4gICAgICAgIHZhciB0ZW50aCA9IHN0YXJ0ICUgMTA7XG5cbiAgICAgICAgaWYobWluIDwgMTApe1xuICAgICAgICAgIG1pbiA9IFwiMFwiICsgbWluO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlYyA8IDEwKXtcbiAgICAgICAgICBzZWMgPSBcIjBcIiArIHNlYztcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5pbm5lckhUTUwgPSBtaW4gKyBcIjpcIiArIHNlYyArIFwiOlwiICsgdGVudGg7XG4gICAgICAgIHRpbWVPdXQoKTtcbiAgICAgICAgLy9jYWxsaW5nIGl0c2VsZiBzbyB0aGF0IGl0IGNhbiByZXBlYXQgYWRkaW5nIHRoZSB0aW1lLlxuXG5cbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG5cblxufTtcblxucXVlc3Rpb25zKCk7XG5cbiJdfQ==
