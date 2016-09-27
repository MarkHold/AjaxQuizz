(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var questions = require("./questions");

new questions();

},{"./questions":2}],2:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */

"use strict";

  var questions = function (container) {

    var start = 0;
    var active = 0;
    var going = true;


    var container = document.getElementById(container);
    var div = document.createElement("div");
    div.classList.add("submitButton");

    div.addEventListener("click", function (event) {

      div.textContent = "Say hello brr";
      StartCounter();
    });

    container.appendChild(div);





      //part 2.
      var timeOut = function () {

        setTimeout(function () {
          var min = Math.floor(time / 10 / 60);
          var sec = Math.floor(start / 10);

          document.getElementById("name").innerHTML = min + ":" + sec + ":";

          //calling itself so that it can repeat adding the time.


          timeOut();
        }, 500);
      }


    // a simple time(stopwatch type ) function part1.


    var StartCounter = function () {
      if (active == 0) {
        active = 1;
        timeOut();
      } else {
        active = 0;
      }

    }

  }
module.exports = questions;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xdWVzdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBxdWVzdGlvbnMgPSByZXF1aXJlKFwiLi9xdWVzdGlvbnNcIik7XG5cbm5ldyBxdWVzdGlvbnMoKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXJrdXNseWNvbmhvbGQgb24gMjcvMDkvMTYuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIHF1ZXN0aW9ucyA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblxuICAgIHZhciBzdGFydCA9IDA7XG4gICAgdmFyIGFjdGl2ZSA9IDA7XG4gICAgdmFyIGdvaW5nID0gdHJ1ZTtcblxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzdWJtaXRCdXR0b25cIik7XG5cbiAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBcIlNheSBoZWxsbyBicnJcIjtcbiAgICAgIFN0YXJ0Q291bnRlcigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cblxuXG5cblxuICAgICAgLy9wYXJ0IDIuXG4gICAgICB2YXIgdGltZU91dCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gMTAgLyA2MCk7XG4gICAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc3RhcnQgLyAxMCk7XG5cbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVcIikuaW5uZXJIVE1MID0gbWluICsgXCI6XCIgKyBzZWMgKyBcIjpcIjtcblxuICAgICAgICAgIC8vY2FsbGluZyBpdHNlbGYgc28gdGhhdCBpdCBjYW4gcmVwZWF0IGFkZGluZyB0aGUgdGltZS5cblxuXG4gICAgICAgICAgdGltZU91dCgpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuXG5cbiAgICAvLyBhIHNpbXBsZSB0aW1lKHN0b3B3YXRjaCB0eXBlICkgZnVuY3Rpb24gcGFydDEuXG5cblxuICAgIHZhciBTdGFydENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoYWN0aXZlID09IDApIHtcbiAgICAgICAgYWN0aXZlID0gMTtcbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlID0gMDtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5tb2R1bGUuZXhwb3J0cyA9IHF1ZXN0aW9ucztcbiJdfQ==
