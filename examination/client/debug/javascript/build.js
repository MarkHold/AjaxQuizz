(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  var start = 0;
  var active = 0;



  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");

  questionButton.addEventListener("click", function () {

    StartCounter();
    var req = new XMLHttpRequest();
    req.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {

      var questionLink = document.getElementById("stuff");

      questionLink.innerText = req.responseText;

    });
    req.send();


  });

  //Section for the POST method
  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea");

    var req = new XMLHttpRequest();
    req.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send("Answer");

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

    setTimeout(function () {
      var min = Math.floor(start / 10 / 60);
      var sec = Math.floor(start / 10);

      document.getElementById("time").innerHTML = min + ":" + sec + ":";

      //calling itself so that it can repeat adding the time.


      timeOut();
    }, 500);
  };


};

questions();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cbnZhciBxdWVzdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgYWN0aXZlID0gMDtcblxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgR0VUIE1ldGhvZFxuICB2YXIgcXVlc3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpO1xuXG4gIHF1ZXN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBTdGFydENvdW50ZXIoKTtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLm9wZW4oXCJHRVRcIiwgXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCIsIHRydWUpO1xuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgcXVlc3Rpb25MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHVmZlwiKTtcblxuICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlcS5yZXNwb25zZVRleHQ7XG5cbiAgICB9KTtcbiAgICByZXEuc2VuZCgpO1xuXG5cbiAgfSk7XG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgUE9TVCBtZXRob2RcbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0QnV0dG9uXCIpO1xuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKTtcblxuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXEub3BlbihcIlBPU1RcIiwgXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9hbnN3ZXIvMVwiLCB0cnVlKTtcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgcmVxLnNlbmQoXCJBbnN3ZXJcIik7XG5cbiAgfSk7XG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSB0aW1lIGNvdW50ZXJcblxuICB2YXIgU3RhcnRDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICBpZiAoYWN0aXZlID09IDApIHtcbiAgICAgIGFjdGl2ZSA9IDE7XG4gICAgICB0aW1lT3V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZSA9IDA7XG4gICAgfVxuXG4gIH07XG4gIHZhciB0aW1lT3V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihzdGFydCAvIDEwIC8gNjApO1xuICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc3RhcnQgLyAxMCk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5pbm5lckhUTUwgPSBtaW4gKyBcIjpcIiArIHNlYyArIFwiOlwiO1xuXG4gICAgICAvL2NhbGxpbmcgaXRzZWxmIHNvIHRoYXQgaXQgY2FuIHJlcGVhdCBhZGRpbmcgdGhlIHRpbWUuXG5cblxuICAgICAgdGltZU91dCgpO1xuICAgIH0sIDUwMCk7XG4gIH07XG5cblxufTtcblxucXVlc3Rpb25zKCk7XG5cbiJdfQ==
