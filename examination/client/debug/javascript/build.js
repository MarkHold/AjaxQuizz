(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {



  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");

  var currentPlayerButton = document.getElementById("UserNameButton");
  var currentPlayerStatus = document.getElementById("currentplayer");

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

      }


      if(nextLink === undefined){
        //quizz done function
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


  currentPlayerButton.onclick = function(){
    var currentPlayer = document.getElementById("UserNames").value;
    document.getElementById("currentplayer").innerHTML = currentPlayer;

  }

  startButton.onclick = function(){
    QuestionGame("GET", null);
    countDown = 20;
  }


  questionButton.addEventListener("click", function () {
    console.log(url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cbnZhciBxdWVzdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cblxuXG4gIHZhciBxdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIik7XG4gIHZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIik7XG5cbiAgdmFyIGN1cnJlbnRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lQnV0dG9uXCIpO1xuICB2YXIgY3VycmVudFBsYXllclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudHBsYXllclwiKTtcblxuICB2YXIgU3RhcnRVUkwgPSBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzFcIjtcbiAgdmFyIHF1ZXN0aW9uTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUTFcIik7XG4gIHZhciBxdWVzdEFsdExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbHRcIik7XG5cblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgYWN0aXZlID0gMDtcbiAgdmFyIGNvdW50RG93bjtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gIHZhciByZXNwb25zZTtcbiAgdmFyIG5leHRMaW5rO1xuICB2YXIgQW5zd2VyO1xuXG5cblxuICBmdW5jdGlvbiBRdWVzdGlvbkdhbWUoUmVxdWVzdFR5cGUsIEFuc3dlcil7XG5cbiAgICB2YXIgUXVlc3Rpb25SZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBRdWVzdGlvblJlcS5vcGVuKFJlcXVlc3RUeXBlLCB1cmwsIHRydWUpO1xuICAgIFF1ZXN0aW9uUmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgUXVlc3Rpb25SZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcblxuICAgICAgaWYoUXVlc3Rpb25SZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiBRdWVzdGlvblJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG5cbiAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKFF1ZXN0aW9uUmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLnF1ZXN0aW9uO1xuICAgICAgICB1cmwgPSByZXNwb25zZS5uZXh0VVJMO1xuXG4gICAgICAgIC8vIHF1ZXN0QWx0TGluay5pbm5lclRleHQgPSByZXNwb25zZS5hbHRlcm5hdGl2ZXM7XG5cbiAgICAgIH1cblxuXG4gICAgICBpZihuZXh0TGluayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy9xdWl6eiBkb25lIGZ1bmN0aW9uXG4gICAgICB9XG5cblxuICAgIH1cblxuICAgIC8vSWYgaXRzIGEgcG9zdCByZXF1ZXN0LCB0aGlzIHdpbGwgaGFwcGVuXG4gICAgaWYoUmVxdWVzdFR5cGUgPT0gXCJQT1NUXCIpe1xuICAgICAgdmFyIHRoZUFuc3dlciA9IHtcImFuc3dlclwiOiBBbnN3ZXJ9O1xuICAgICAgUXVlc3Rpb25SZXEuc2VuZChKU09OLnN0cmluZ2lmeSh0aGVBbnN3ZXIpKTtcbiAgICB9XG4gICAgICAvL290aGVyd2lzZSBpdHMgYSBHRVQgcmVxdWVzdC5cbiAgICBlbHNle1xuXG4gICAgICBRdWVzdGlvblJlcS5zZW5kKCk7XG5cbiAgICB9XG5cbn1cblxuXG4gIGN1cnJlbnRQbGF5ZXJCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGN1cnJlbnRQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS52YWx1ZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRwbGF5ZXJcIikuaW5uZXJIVE1MID0gY3VycmVudFBsYXllcjtcblxuICB9XG5cbiAgc3RhcnRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgUXVlc3Rpb25HYW1lKFwiR0VUXCIsIG51bGwpO1xuICAgIGNvdW50RG93biA9IDIwO1xuICB9XG5cblxuICBxdWVzdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS52YWx1ZTtcbiAgICBRdWVzdGlvbkdhbWUoXCJQT1NUXCIsIEFuc3dlcik7XG5cblxuICB9KTtcblxuICAvL1NlY3Rpb24gZm9yIGNvdW50ZG93biB0aW1lclxuXG5cbiAgdmFyIGNvdW50ZXIgPSBzZXRJbnRlcnZhbCh0aW1lciwgMTAwMCk7XG5cbiAgZnVuY3Rpb24gdGltZXIoKXtcbiAgICBjb3VudERvd24gPSBjb3VudERvd24tMTtcbiAgICBpZihjb3VudERvd24gPD0gMCl7XG4gICAgICBjbGVhckludGVydmFsKGNvdW50ZXIpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5pbm5lckhUTUwgPSBcIllvdXIgMjAgc2Vjb25kcyBhcmUgb3Zlci5cIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5pbm5lckhUTUwgPSBjb3VudERvd24gKyBcIiBzZWNvbmRzXCI7XG4gIH1cblxuXG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSB0b3RhbCB0aW1lIGZ1bmN0aW9uXG5cbiAgdmFyIFN0YXJ0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmIChhY3RpdmUgPT0gMCkge1xuICAgICAgYWN0aXZlID0gMTtcbiAgICAgIHRpbWVPdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlID0gMDtcbiAgICB9XG5cbiAgfTtcblxuXG4gIHZhciB0aW1lT3V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgaWYoYWN0aXZlID09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydCsrO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihzdGFydC8xMC82MCk7XG4gICAgICAgIHZhciBzZWMgPSBNYXRoLmZsb29yKHN0YXJ0LzEwKTtcbiAgICAgICAgdmFyIHRlbnRoID0gc3RhcnQgJSAxMDtcblxuICAgICAgICBpZihtaW4gPCAxMCl7XG4gICAgICAgICAgbWluID0gXCIwXCIgKyBtaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2VjIDwgMTApe1xuICAgICAgICAgIHNlYyA9IFwiMFwiICsgc2VjO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLmlubmVySFRNTCA9IG1pbiArIFwiOlwiICsgc2VjICsgXCI6XCIgKyB0ZW50aDtcbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgICAvL2NhbGxpbmcgaXRzZWxmIHNvIHRoYXQgaXQgY2FuIHJlcGVhdCBhZGRpbmcgdGhlIHRpbWUuXG5cblxuICAgICAgICB0aW1lT3V0KCk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcblxuXG59O1xuXG5xdWVzdGlvbnMoKTtcblxuIl19
