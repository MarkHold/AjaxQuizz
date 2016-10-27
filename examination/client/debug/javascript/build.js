(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {


  


  //Section for the GET Method
  var questionButton = document.getElementById("getQuestionButton");


  var start = 0;
  var active = 0;

  var urlArray = ["http://vhost3.lnu.se:20080/question/1",
    "http://vhost3.lnu.se:20080/question/21",
    "http://vhost3.lnu.se:20080/question/321",
    "http://vhost3.lnu.se:20080/question/6",
    "http://vhost3.lnu.se:20080/question/32",
    "http://vhost3.lnu.se:20080/question/32456",
    "http://vhost3.lnu.se:20080/question/326"];

  var response;

  questionButton.addEventListener("click", function () {

    //StartCounter();
    var QuestionReq = new XMLHttpRequest();
    QuestionReq.open("GET", urlArray[0], true);
    QuestionReq.setRequestHeader("Content-Type", "application/json");

    //The onreadystatechange stores a function that can be called automaticly everytime the
    //ready state changes.

    QuestionReq.onreadystatechange = function(){

      if(QuestionReq.readyState === 4 && QuestionReq.status === 200) {


        var questionLink = document.getElementById("stuff");

        response = JSON.parse(QuestionReq.responseText);
        questionLink.innerText = response.question;

       }
    }
      QuestionReq.send();

  });




  //Section for the POST method
  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var Answer = document.getElementById("AnswerArea");
    var req = new XMLHttpRequest();
    var url = "http://vhost3.lnu.se:20080/answer/1";
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    if(req.readyState === 4 && req.status === 200) {
      var newReq;
      console.log(newReq = JSON.parse(req.responseText));

    }

    var ans = JSON.stringify({answer: "2"});
    req.send(ans);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hcmt1c2x5Y29uaG9sZCBvbiAyNy8wOS8xNi5cbiAqL1xudmFyIHF1ZXN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuXG4gIFxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgR0VUIE1ldGhvZFxuICB2YXIgcXVlc3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpO1xuXG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGFjdGl2ZSA9IDA7XG5cbiAgdmFyIHVybEFycmF5ID0gW1wiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiLFxuICAgIFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMjFcIixcbiAgICBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzMyMVwiLFxuICAgIFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vNlwiLFxuICAgIFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMzJcIixcbiAgICBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzMyNDU2XCIsXG4gICAgXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8zMjZcIl07XG5cbiAgdmFyIHJlc3BvbnNlO1xuXG4gIHF1ZXN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvL1N0YXJ0Q291bnRlcigpO1xuICAgIHZhciBRdWVzdGlvblJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIFF1ZXN0aW9uUmVxLm9wZW4oXCJHRVRcIiwgdXJsQXJyYXlbMF0sIHRydWUpO1xuICAgIFF1ZXN0aW9uUmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgLy9UaGUgb25yZWFkeXN0YXRlY2hhbmdlIHN0b3JlcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCBhdXRvbWF0aWNseSBldmVyeXRpbWUgdGhlXG4gICAgLy9yZWFkeSBzdGF0ZSBjaGFuZ2VzLlxuXG4gICAgUXVlc3Rpb25SZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcblxuICAgICAgaWYoUXVlc3Rpb25SZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiBRdWVzdGlvblJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG5cbiAgICAgICAgdmFyIHF1ZXN0aW9uTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3R1ZmZcIik7XG5cbiAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKFF1ZXN0aW9uUmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIHF1ZXN0aW9uTGluay5pbm5lclRleHQgPSByZXNwb25zZS5xdWVzdGlvbjtcblxuICAgICAgIH1cbiAgICB9XG4gICAgICBRdWVzdGlvblJlcS5zZW5kKCk7XG5cbiAgfSk7XG5cblxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgUE9TVCBtZXRob2RcbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0QnV0dG9uXCIpO1xuXG4gIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKTtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvYW5zd2VyLzFcIjtcbiAgICByZXEub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICB2YXIgbmV3UmVxO1xuICAgICAgY29uc29sZS5sb2cobmV3UmVxID0gSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG5cbiAgICB9XG5cbiAgICB2YXIgYW5zID0gSlNPTi5zdHJpbmdpZnkoe2Fuc3dlcjogXCIyXCJ9KTtcbiAgICByZXEuc2VuZChhbnMpO1xuXG4gIH0pO1xuXG5cblxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgdGltZSBjb3VudGVyXG5cbiAgdmFyIFN0YXJ0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmIChhY3RpdmUgPT0gMCkge1xuICAgICAgYWN0aXZlID0gMTtcbiAgICAgIHRpbWVPdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlID0gMDtcbiAgICB9XG5cbiAgfTtcbiAgdmFyIHRpbWVPdXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZihhY3RpdmUgPT0gMSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0Kys7XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHN0YXJ0LzEwLzYwKTtcbiAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc3RhcnQvMTApO1xuICAgICAgICB2YXIgdGVudGggPSBzdGFydCAlIDEwO1xuXG4gICAgICAgIGlmKG1pbiA8IDEwKXtcbiAgICAgICAgICBtaW4gPSBcIjBcIiArIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZihzZWMgPCAxMCl7XG4gICAgICAgICAgc2VjID0gXCIwXCIgKyBzZWM7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuaW5uZXJIVE1MID0gbWluICsgXCI6XCIgKyBzZWMgKyBcIjpcIiArIHRlbnRoO1xuICAgICAgICB0aW1lT3V0KCk7XG4gICAgICAgIC8vY2FsbGluZyBpdHNlbGYgc28gdGhhdCBpdCBjYW4gcmVwZWF0IGFkZGluZyB0aGUgdGltZS5cblxuXG4gICAgICAgIHRpbWVPdXQoKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9O1xuXG5cbn07XG5cbnF1ZXN0aW9ucygpO1xuXG4iXX0=
