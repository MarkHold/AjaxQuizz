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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cbnZhciBxdWVzdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgYWN0aXZlID0gMDtcblxuXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgR0VUIE1ldGhvZFxuICB2YXIgcXVlc3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpO1xuXG4gIHF1ZXN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdXJsID0gSlNPTi5zdHJpbmdpZnkoXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8yMVwiLCBudWxsLCAyKTtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLm9wZW4oXCJHRVRcIiwgXCJ1cmxcIiwgdHJ1ZSk7XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgLy9UaGUgb25yZWFkeXN0YXRlY2hhbmdlIHN0b3JlcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCBhdXRvbWF0aWNseSBldmVyeXRpbWUgdGhlXG4gICAgLy9yZWFkeSBzdGF0ZSBjaGFuZ2VzLlxuXG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgICB2YXIgcXVlc3Rpb25MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHVmZlwiKTtcblxuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gcmVxLnJlc3BvbnNlVGV4dDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlcS5zZW5kKCk7XG5cblxuICB9KTtcblxuICAvL1NlY3Rpb24gZm9yIHRoZSBQT1NUIG1ldGhvZFxuICB2YXIgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRCdXR0b25cIik7XG5cbiAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgQW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpO1xuICAgIHZhciBBbnN3ZXJJbkpzb24gPSBKU09OLnN0cmluZ2lmeSh7XCJhbnN3ZXJcIjogXCJBbnN3ZXJcIn0pO1xuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXEub3BlbihcIlBPU1RcIiwgXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9hbnN3ZXIvMVwiLCB0cnVlKTtcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvanNvblwiKTtcbiAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgcmVxLnNlbmQoXCJBbnN3ZXJJbkpzb25cIik7XG4gICAgfVxuICB9KTtcblxuXG4gIC8vU2VjdGlvbiBmb3IgdGhlIHRpbWUgY291bnRlclxuXG4gIHZhciBTdGFydENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgIGlmIChhY3RpdmUgPT0gMCkge1xuICAgICAgYWN0aXZlID0gMTtcbiAgICAgIHRpbWVPdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlID0gMDtcbiAgICB9XG5cbiAgfTtcbiAgdmFyIHRpbWVPdXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZihhY3RpdmUgPT0gMSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0Kys7XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHN0YXJ0LzEwLzYwKTtcbiAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc3RhcnQvMTApO1xuICAgICAgICB2YXIgdGVudGggPSBzdGFydCAlIDEwO1xuXG4gICAgICAgIGlmKG1pbiA8IDEwKXtcbiAgICAgICAgICBtaW4gPSBcIjBcIiArIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZihzZWMgPCAxMCl7XG4gICAgICAgICAgc2VjID0gXCIwXCIgKyBzZWM7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuaW5uZXJIVE1MID0gbWluICsgXCI6XCIgKyBzZWMgKyBcIjpcIiArIHRlbnRoO1xuICAgICAgICB0aW1lT3V0KCk7XG4gICAgICAgIC8vY2FsbGluZyBpdHNlbGYgc28gdGhhdCBpdCBjYW4gcmVwZWF0IGFkZGluZyB0aGUgdGltZS5cblxuXG4gICAgICAgIHRpbWVPdXQoKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9O1xuXG5cbn07XG5cbnF1ZXN0aW9ucygpO1xuXG4iXX0=
