(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by markuslyconhold on 27/09/16.
 */
var questions = function () {



  var questionButton = document.getElementById("getQuestionButton");
  var startButton = document.getElementById("startButton");
  var FunctionTestButton = document.getElementById("hidebutton");

  var currentPlayerButton = document.getElementById("UserNameButton");
  var currentPlayerStatus = document.getElementById("currentplayer");
  var AnswerArea = document.getElementById("AnswerArea");
  var RadioArea = document.getElementById("radioplace");

  var StartURL = "http://vhost3.lnu.se:20080/question/21";
  var questionLink = document.getElementById("Q1");
  var questAltLink = document.getElementById("Qalt");


  var start = 0;
  var active = 0;
  var countDown;

  var url = "http://vhost3.lnu.se:20080/question/1";
  var response;
  var nextLink;
  var Answer;

  document.getElementById("Questions").style.visibility = "hidden";
  document.getElementById("radioplace").style.visibility = "hidden";
  document.getElementById("timerName").style.visibility = "hidden";
  document.getElementById("getQuestionButton").style.visibility = "hidden";
  document.getElementById("AnswerArea").style.visibility = "hidden";
  document.getElementById("startButton").style.visibility = "hidden";
  document.getElementById("time").style.visibility = "hidden";


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

         if(response.alternatives !=null){
           questAltLink.innerText = response.alternatives;
           AnswerArea.style.visibility = "hidden";
           RadioArea.style.visibility = "visible";
          }

        HideAllRadios();
        ShowArea();

        if(response.nextURL == undefined) {
          countDown = 0;

        }
      }


      if(response.message == "Correct answer!"){
        questionLink.innerText = "Correct Answer! Get the next question";
        countDown = 20;
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


  FunctionTestButton.onclick = function () {

    document.getElementById("Questions").style.visibility = "hidden";
    document.getElementById("radioplace").style.visibility = "hidden";
    document.getElementById("timerName").style.visibility = "hidden";
    document.getElementById("getQuestionButton").style.visibility = "hidden";
    document.getElementById("currentPlayerName").style.visibility = "hidden";
    document.getElementById("AnswerArea").style.visibility = "hidden";
    document.getElementById("startButton").style.visibility = "hidden";
    document.getElementById("time").style.visibility = "hidden";


  }
  function HideArea(){
    document.getElementById("AnswerArea").style.visibility = "hidden";
  }
  function ShowArea(){
    document.getElementById("AnswerArea").style.visibility = "visible";

  }
  function ShowAllRadios(){
    document.getElementById("radioplace").style.visibility = "visible";
  }

  function HideAllRadios(){
    document.getElementById("radioplace").style.visibility = "hidden";
  }

  function ShowRadioFour(){
    document.getElementById("alt4").style.visibility = "visible";
  }

  function HideRadioFour(){
    document.getElementById("alt4").style.visibility = "hidden";
  }

  currentPlayerButton.onclick = function(){
   //Hides everything that has nothing to do with current player name.
    var currentPlayer = document.getElementById("UserNames").value;
    document.getElementById("currentplayer").innerHTML = currentPlayer;

    document.getElementById("Questions").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "visible";
    document.getElementById("timerName").style.visibility = "visible";
    document.getElementById("getQuestionButton").style.visibility = "visible";
    document.getElementById("currentPlayerName").style.visibility = "visible";
    document.getElementById("AnswerArea").style.visibility = "visible";
    document.getElementById("startButton").style.visibility = "visible";
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("radioplace").style.visibility = "hidden";


    document.getElementById("UserNameButton").style.visibility = "hidden";
    document.getElementById("UserNames").style.visibility = "hidden";
    document.getElementById("UserNameTitle").style.visibility = "hidden";




  }


  startButton.onclick = function(){
    HideAllRadios();
    QuestionGame("GET", null);
    countDown = 20;
  }


  questionButton.addEventListener("click", function () {
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


/*

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
*/
};

questions();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hcmt1c2x5Y29uaG9sZCBvbiAyNy8wOS8xNi5cbiAqL1xudmFyIHF1ZXN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuXG5cbiAgdmFyIHF1ZXN0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKTtcbiAgdmFyIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKTtcbiAgdmFyIEZ1bmN0aW9uVGVzdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkZWJ1dHRvblwiKTtcblxuICB2YXIgY3VycmVudFBsYXllckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVXNlck5hbWVCdXR0b25cIik7XG4gIHZhciBjdXJyZW50UGxheWVyU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50cGxheWVyXCIpO1xuICB2YXIgQW5zd2VyQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKTtcbiAgdmFyIFJhZGlvQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKTtcblxuICB2YXIgU3RhcnRVUkwgPSBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzIxXCI7XG4gIHZhciBxdWVzdGlvbkxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlExXCIpO1xuICB2YXIgcXVlc3RBbHRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYWx0XCIpO1xuXG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGFjdGl2ZSA9IDA7XG4gIHZhciBjb3VudERvd247XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICB2YXIgcmVzcG9uc2U7XG4gIHZhciBuZXh0TGluaztcbiAgdmFyIEFuc3dlcjtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuICBmdW5jdGlvbiBRdWVzdGlvbkdhbWUoUmVxdWVzdFR5cGUsIEFuc3dlcil7XG5cbiAgICB2YXIgUXVlc3Rpb25SZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBRdWVzdGlvblJlcS5vcGVuKFJlcXVlc3RUeXBlLCB1cmwsIHRydWUpO1xuICAgIFF1ZXN0aW9uUmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgUXVlc3Rpb25SZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcblxuICAgICAgaWYoUXVlc3Rpb25SZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiBRdWVzdGlvblJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG5cbiAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKFF1ZXN0aW9uUmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgcXVlc3Rpb25MaW5rLmlubmVyVGV4dCA9IHJlc3BvbnNlLnF1ZXN0aW9uO1xuICAgICAgICB1cmwgPSByZXNwb25zZS5uZXh0VVJMO1xuXG4gICAgICAgIC8vIHF1ZXN0QWx0TGluay5pbm5lclRleHQgPSByZXNwb25zZS5hbHRlcm5hdGl2ZXM7XG5cbiAgICAgICAgIGlmKHJlc3BvbnNlLmFsdGVybmF0aXZlcyAhPW51bGwpe1xuICAgICAgICAgICBxdWVzdEFsdExpbmsuaW5uZXJUZXh0ID0gcmVzcG9uc2UuYWx0ZXJuYXRpdmVzO1xuICAgICAgICAgICBBbnN3ZXJBcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICAgICBSYWRpb0FyZWEuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgIH1cblxuICAgICAgICBIaWRlQWxsUmFkaW9zKCk7XG4gICAgICAgIFNob3dBcmVhKCk7XG5cbiAgICAgICAgaWYocmVzcG9uc2UubmV4dFVSTCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb3VudERvd24gPSAwO1xuXG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICBpZihyZXNwb25zZS5tZXNzYWdlID09IFwiQ29ycmVjdCBhbnN3ZXIhXCIpe1xuICAgICAgICBxdWVzdGlvbkxpbmsuaW5uZXJUZXh0ID0gXCJDb3JyZWN0IEFuc3dlciEgR2V0IHRoZSBuZXh0IHF1ZXN0aW9uXCI7XG4gICAgICAgIGNvdW50RG93biA9IDIwO1xuICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvL0lmIGl0cyBhIHBvc3QgcmVxdWVzdCwgdGhpcyB3aWxsIGhhcHBlblxuICAgIGlmKFJlcXVlc3RUeXBlID09IFwiUE9TVFwiKXtcbiAgICAgIHZhciB0aGVBbnN3ZXIgPSB7XCJhbnN3ZXJcIjogQW5zd2VyfTtcbiAgICAgIFF1ZXN0aW9uUmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkodGhlQW5zd2VyKSk7XG4gICAgfVxuICAgICAgLy9vdGhlcndpc2UgaXRzIGEgR0VUIHJlcXVlc3QuXG4gICAgZWxzZXtcblxuICAgICAgUXVlc3Rpb25SZXEuc2VuZCgpO1xuXG4gICAgfVxuXG59XG5cblxuICBGdW5jdGlvblRlc3RCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUXVlc3Rpb25zXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFF1ZXN0aW9uQnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFBsYXllck5hbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdXR0b25cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuXG5cbiAgfVxuICBmdW5jdGlvbiBIaWRlQXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxuICBmdW5jdGlvbiBTaG93QXJlYSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQW5zd2VyQXJlYVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cbiAgfVxuICBmdW5jdGlvbiBTaG93QWxsUmFkaW9zKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVBbGxSYWRpb3MoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvcGxhY2VcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBmdW5jdGlvbiBTaG93UmFkaW9Gb3VyKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHQ0XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhpZGVSYWRpb0ZvdXIoKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsdDRcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBjdXJyZW50UGxheWVyQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgLy9IaWRlcyBldmVyeXRoaW5nIHRoYXQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBjdXJyZW50IHBsYXllciBuYW1lLlxuICAgIHZhciBjdXJyZW50UGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZXNcIikudmFsdWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50cGxheWVyXCIpLmlubmVySFRNTCA9IGN1cnJlbnRQbGF5ZXI7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlF1ZXN0aW9uc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpb3BsYWNlXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRRdWVzdGlvbkJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50UGxheWVyTmFtZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW9wbGFjZVwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVc2VyTmFtZUJ1dHRvblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVzZXJOYW1lVGl0bGVcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cblxuXG5cbiAgfVxuXG5cbiAgc3RhcnRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgSGlkZUFsbFJhZGlvcygpO1xuICAgIFF1ZXN0aW9uR2FtZShcIkdFVFwiLCBudWxsKTtcbiAgICBjb3VudERvd24gPSAyMDtcbiAgfVxuXG5cbiAgcXVlc3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBbnN3ZXJBcmVhXCIpLnZhbHVlO1xuICAgIFF1ZXN0aW9uR2FtZShcIlBPU1RcIiwgQW5zd2VyKTtcblxuXG4gIH0pO1xuXG4gIC8vU2VjdGlvbiBmb3IgY291bnRkb3duIHRpbWVyXG5cblxuICB2YXIgY291bnRlciA9IHNldEludGVydmFsKHRpbWVyLCAxMDAwKTtcblxuICBmdW5jdGlvbiB0aW1lcigpe1xuICAgIGNvdW50RG93biA9IGNvdW50RG93bi0xO1xuICAgIGlmKGNvdW50RG93biA8PSAwKXtcbiAgICAgIGNsZWFySW50ZXJ2YWwoY291bnRlcik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IFwiWW91ciAyMCBzZWNvbmRzIGFyZSBvdmVyLlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLmlubmVySFRNTCA9IGNvdW50RG93biArIFwiIHNlY29uZHNcIjtcbiAgfVxuXG5cbi8qXG5cbiAgLy9TZWN0aW9uIGZvciB0aGUgdG90YWwgdGltZSBmdW5jdGlvblxuXG4gIHZhciBTdGFydENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoYWN0aXZlID09IDApIHtcbiAgICAgIGFjdGl2ZSA9IDE7XG4gICAgICB0aW1lT3V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZSA9IDA7XG4gICAgfVxuXG4gIH07XG5cblxuICB2YXIgdGltZU91dCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmKGFjdGl2ZSA9PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQrKztcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc3RhcnQvMTAvNjApO1xuICAgICAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihzdGFydC8xMCk7XG4gICAgICAgIHZhciB0ZW50aCA9IHN0YXJ0ICUgMTA7XG5cbiAgICAgICAgaWYobWluIDwgMTApe1xuICAgICAgICAgIG1pbiA9IFwiMFwiICsgbWluO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlYyA8IDEwKXtcbiAgICAgICAgICBzZWMgPSBcIjBcIiArIHNlYztcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5pbm5lckhUTUwgPSBtaW4gKyBcIjpcIiArIHNlYyArIFwiOlwiICsgdGVudGg7XG4gICAgICAgIHRpbWVPdXQoKTtcbiAgICAgICAgLy9jYWxsaW5nIGl0c2VsZiBzbyB0aGF0IGl0IGNhbiByZXBlYXQgYWRkaW5nIHRoZSB0aW1lLlxuXG5cbiAgICAgICAgdGltZU91dCgpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG4qL1xufTtcblxucXVlc3Rpb25zKCk7XG5cbiJdfQ==
