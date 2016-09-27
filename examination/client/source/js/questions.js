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
