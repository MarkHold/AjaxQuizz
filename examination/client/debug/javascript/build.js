(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  var start = 0;
  var active = 0;

  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFya3VzbHljb25ob2xkIG9uIDI3LzA5LzE2LlxuICovXG52YXIgcXVlc3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGFjdGl2ZSA9IDA7XG5cbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0QnV0dG9uXCIpO1xuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgU3RhcnRDb3VudGVyKCk7XG4gICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcS5vcGVuKFwiR0VUXCIsIFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiLCB0cnVlKTtcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBxdWVzdGlvbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0dWZmXCIpO1xuICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlcS5yZXNwb25zZVRleHQ7XG4gICAgfSk7XG4gICAgcmVxLnNlbmQoKTtcblxuXG4gIH0pO1xuXG5cbiAgdmFyIFN0YXJ0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgaWYgKGFjdGl2ZSA9PSAwKSB7XG4gICAgICBhY3RpdmUgPSAxO1xuICAgICAgdGltZU91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmUgPSAwO1xuICAgIH1cblxuICB9O1xuICB2YXIgdGltZU91dCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc3RhcnQgLyAxMCAvIDYwKTtcbiAgICAgIHZhciBzZWMgPSBNYXRoLmZsb29yKHN0YXJ0IC8gMTApO1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuaW5uZXJIVE1MID0gbWluICsgXCI6XCIgKyBzZWMgKyBcIjpcIjtcblxuICAgICAgLy9jYWxsaW5nIGl0c2VsZiBzbyB0aGF0IGl0IGNhbiByZXBlYXQgYWRkaW5nIHRoZSB0aW1lLlxuXG5cbiAgICAgIHRpbWVPdXQoKTtcbiAgICB9LCA1MDApO1xuICB9O1xuXG5cbn07XG5cbnF1ZXN0aW9ucygpO1xuXG4iXX0=
