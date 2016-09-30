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

    var url = JSON.stringify("http://vhost3.lnu.se:20080/question/21", null, 2);
    var req = new XMLHttpRequest();
    req.open("GET", "url", true);
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
    var AnswerInJson = JSON.stringify({"answer": "Answer"});
    var req = new XMLHttpRequest();
    req.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
    req.setRequestHeader("Content-Type", "text/json");
    req.send("AnswerInJson");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFya3VzbHljb25ob2xkIG9uIDI3LzA5LzE2LlxuICovXG52YXIgcXVlc3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGFjdGl2ZSA9IDA7XG5cblxuXG4gIC8vU2VjdGlvbiBmb3IgdGhlIEdFVCBNZXRob2RcbiAgdmFyIHF1ZXN0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKTtcblxuICBxdWVzdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHVybCA9IEpTT04uc3RyaW5naWZ5KFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMjFcIiwgbnVsbCwgMik7XG4gICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcS5vcGVuKFwiR0VUXCIsIFwidXJsXCIsIHRydWUpO1xuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgcXVlc3Rpb25MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHVmZlwiKTtcblxuICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlcS5yZXNwb25zZVRleHQ7XG5cbiAgICB9KTtcbiAgICByZXEuc2VuZCgpO1xuXG5cbiAgfSk7XG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgUE9TVCBtZXRob2RcbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0QnV0dG9uXCIpO1xuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKTtcbiAgICB2YXIgQW5zd2VySW5Kc29uID0gSlNPTi5zdHJpbmdpZnkoe1wiYW5zd2VyXCI6IFwiQW5zd2VyXCJ9KTtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLm9wZW4oXCJQT1NUXCIsIFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvYW5zd2VyLzFcIiwgdHJ1ZSk7XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L2pzb25cIik7XG4gICAgcmVxLnNlbmQoXCJBbnN3ZXJJbkpzb25cIik7XG5cbiAgfSk7XG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSB0aW1lIGNvdW50ZXJcblxuICB2YXIgU3RhcnRDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICBpZiAoYWN0aXZlID09IDApIHtcbiAgICAgIGFjdGl2ZSA9IDE7XG4gICAgICB0aW1lT3V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZSA9IDA7XG4gICAgfVxuXG4gIH07XG4gIHZhciB0aW1lT3V0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgaWYoYWN0aXZlID09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydCsrO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihzdGFydC8xMC82MCk7XG4gICAgICAgIHZhciBzZWMgPSBNYXRoLmZsb29yKHN0YXJ0LzEwKTtcbiAgICAgICAgdmFyIHRlbnRoID0gc3RhcnQgJSAxMDtcblxuICAgICAgICBpZihtaW4gPCAxMCl7XG4gICAgICAgICAgbWluID0gXCIwXCIgKyBtaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2VjIDwgMTApe1xuICAgICAgICAgIHNlYyA9IFwiMFwiICsgc2VjO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLmlubmVySFRNTCA9IG1pbiArIFwiOlwiICsgc2VjICsgXCI6XCIgKyB0ZW50aDtcbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgICAvL2NhbGxpbmcgaXRzZWxmIHNvIHRoYXQgaXQgY2FuIHJlcGVhdCBhZGRpbmcgdGhlIHRpbWUuXG5cblxuICAgICAgICB0aW1lT3V0KCk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcblxuXG59O1xuXG5xdWVzdGlvbnMoKTtcblxuIl19
