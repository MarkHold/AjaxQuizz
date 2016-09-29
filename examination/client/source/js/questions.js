/**
 * Created by markuslyconhold on 27/09/16.
 */
  var questions = function () {

  /*
   var start = 0;
   var active = 0;
   var going = true;
   */

  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {

    var req = new XMLHttpRequest();
    req.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function () {
      console.log(JSON.parse(req.responseText));
    }
    req.addEventListener("load", function () {
        var questionLink = document.getElementById("stuff");
      questionLink.innerText = req.responseText;
    });
    req.send();


  });

};

questions();



    /*

    module.exports.request = function (config, callback ){



*/



    /*
    var StartCounter = function () {
      if (active == 0) {
        active = 1;
        timeOut();
      } else {
        active = 0;
      }

    }
    var timeOut = function () {

      setTimeout(function () {
        var min = Math.floor(start / 10 / 60);
        var sec = Math.floor(start / 10);

        document.getElementById("contact").innerHTML = min + ":" + sec + ":";

        //calling itself so that it can repeat adding the time.


        timeOut();
      }, 500);
    }


    var container = document.getElementById(container);
    var div = document.createElement("div");
    div.classList.add("submitButton");
    StartCounter();








    // a simple time(stopwatch type ) function part1.




  }




module.exports.request = function (config, callback ){
  var req = new XMLHttpRequestion();
  req.open("GET", "http://vhost3.lnu.se:20080/question/1
  ", true);
    req.setRequestHeader("Content-Type", "application/json");
  req.send();

  req.addEventListener("load", function(){
    if(req.status >= 400){
      callback(req.status);
    }

    callback(null, req.responseText)
  });

  req.open(config.method, config.url);
  req.send();
}

var ajax = require("./ajax");

ajax.request({method: "get", url: "http://vhost3.lnu.se:20080/question/1"}, function(error,response){
  if(error){
    throw new Error("Network error" + error);
  }

  console.log(response);
}
module.exports = questions;
*/
