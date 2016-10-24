(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {







  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");

  questionButton.addEventListener("click", function () {

    var url = JSON.stringify("http://vhost3.lnu.se:20080/question/1", null, 2);
    var req = new XMLHttpRequest();
    req.open("GET", "url", true);
    req.onError = function(){console.log("error" + req.status)};
    req.upload.onError = function(){console.log("error" + req.status)};

    req.setRequestHeader("Content-Type", "application/json");

    //The onreadystatechange stores a function that can be called automaticly everytime the
    //ready state changes.

    req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200) {

        var questionLink = document.getElementById("stuff");

        questionLink.innerText = req.responseText;
      }
    };
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
    if(req.readyState === 4 && req.status === 200) {

      req.send("AnswerInJson");
    }
  });





  //Section for the time counter

  var StartCounter = function () {

    var start = 0;
    var active = 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hcmt1c2x5Y29uaG9sZCBvbiAyNy8wOS8xNi5cbiAqL1xudmFyIHF1ZXN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuXG5cblxuXG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSBHRVQgTWV0aG9kXG4gIHZhciBxdWVzdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0UXVlc3Rpb25CdXR0b25cIik7XG5cbiAgcXVlc3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB1cmwgPSBKU09OLnN0cmluZ2lmeShcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzFcIiwgbnVsbCwgMik7XG4gICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcS5vcGVuKFwiR0VUXCIsIFwidXJsXCIsIHRydWUpO1xuICAgIHJlcS5vbkVycm9yID0gZnVuY3Rpb24oKXtjb25zb2xlLmxvZyhcImVycm9yXCIgKyByZXEuc3RhdHVzKX07XG4gICAgcmVxLnVwbG9hZC5vbkVycm9yID0gZnVuY3Rpb24oKXtjb25zb2xlLmxvZyhcImVycm9yXCIgKyByZXEuc3RhdHVzKX07XG5cbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICAvL1RoZSBvbnJlYWR5c3RhdGVjaGFuZ2Ugc3RvcmVzIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIGF1dG9tYXRpY2x5IGV2ZXJ5dGltZSB0aGVcbiAgICAvL3JlYWR5IHN0YXRlIGNoYW5nZXMuXG5cbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSA0ICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgIHZhciBxdWVzdGlvbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0dWZmXCIpO1xuXG4gICAgICAgIHF1ZXN0aW9uTGluay5pbm5lclRleHQgPSByZXEucmVzcG9uc2VUZXh0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmVxLnNlbmQoKTtcblxuICB9KTtcblxuXG5cblxuICAvL1NlY3Rpb24gZm9yIHRoZSBQT1NUIG1ldGhvZFxuICB2YXIgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRCdXR0b25cIik7XG5cbiAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgQW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpO1xuICAgIHZhciBBbnN3ZXJJbkpzb24gPSBKU09OLnN0cmluZ2lmeSh7XCJhbnN3ZXJcIjogXCJBbnN3ZXJcIn0pO1xuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXEub3BlbihcIlBPU1RcIiwgXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9hbnN3ZXIvMVwiLCB0cnVlKTtcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvanNvblwiKTtcbiAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgcmVxLnNlbmQoXCJBbnN3ZXJJbkpzb25cIik7XG4gICAgfVxuICB9KTtcblxuXG5cblxuXG4gIC8vU2VjdGlvbiBmb3IgdGhlIHRpbWUgY291bnRlclxuXG4gIHZhciBTdGFydENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIHZhciBhY3RpdmUgPSAwO1xuXG4gICAgaWYgKGFjdGl2ZSA9PSAwKSB7XG4gICAgICBhY3RpdmUgPSAxO1xuICAgICAgdGltZU91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmUgPSAwO1xuICAgIH1cblxuICB9O1xuICB2YXIgdGltZU91dCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmKGFjdGl2ZSA9PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc3RhcnQvMTAvNjApO1xuICAgICAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihzdGFydC8xMCk7XG4gICAgICAgIHZhciB0ZW50aCA9IHN0YXJ0ICUgMTA7XG5cbiAgICAgICAgaWYobWluIDwgMTApe1xuICAgICAgICAgIG1pbiA9IFwiMFwiICsgbWluO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlYyA8IDEwKXtcbiAgICAgICAgICBzZWMgPSBcIjBcIiArIHNlYztcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5pbm5lckhUTUwgPSBtaW4gKyBcIjpcIiArIHNlYyArIFwiOlwiICsgdGVudGg7XG4gICAgICAgIHRpbWVPdXQoKTtcbiAgICAgICAgLy9jYWxsaW5nIGl0c2VsZiBzbyB0aGF0IGl0IGNhbiByZXBlYXQgYWRkaW5nIHRoZSB0aW1lLlxuXG5cbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG5cblxufTtcblxucXVlc3Rpb25zKCk7XG5cbiJdfQ==
