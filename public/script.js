// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAKUkNXzqJh5xDwXLKk12ouUy4H3BCmDn4",
  authDomain: "quiz-app-c22dc.firebaseapp.com",
  databaseURL: "https://quiz-app-c22dc-default-rtdb.firebaseio.com",
  projectId: "quiz-app-c22dc",
  storageBucket: "quiz-app-c22dc.appspot.com",
  messagingSenderId: "553540079908",
  appId: "1:553540079908:web:77635cc55d3429871f63b1",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var body = document.childNodes[1].childNodes[2];
var container1 = document.createElement("div");

// coding for first page

function firstpage() {
  body.classList.add("first");
  container1.classList.add("container");
  body.appendChild(container1);

  var input = document.createElement("input");
  input.setAttribute("onchange", "showName(this)");
  input.setAttribute("placeholder", "Enter Your Name");
  input.setAttribute("id", "userName");
  container1.appendChild(input);

  var button = document.createElement("a");
  var buttonText = document.createTextNode("submit");
  button.appendChild(buttonText);
  button.setAttribute("onclick", "signUp()");
  container1.appendChild(button);
}

// check if user enter the name or not

function signUp() {
  var userName = document.getElementById("userName");

  if (userName.value == "") {
    Swal.fire("Sorry!", "Please Enter Your Name .", "question");
  } else {
    container1.style.display = "none";
    mainPage();
  }
}

// coding for main page

var container2 = document.createElement("div");

function mainPage() {
  body.classList.remove("first");
  body.classList.add("main");

  container2.classList.add("minicontainer1");
  body.appendChild(container2);

  var box1 = document.createElement("div");
  box1.classList.add("box");

  var inputminute = document.createElement("input");
  inputminute.classList.add("timer");
  inputminute.setAttribute("id", "minute");

  var innerText = document.createTextNode(":");
  inputminute.appendChild(innerText);

  inputminute.setAttribute("readonly", "true");
  box1.appendChild(inputminute);

  var inputsecond = document.createElement("input");
  inputsecond.classList.add("timer");
  inputsecond.setAttribute("id", "second");
  inputsecond.setAttribute("readonly", "true");
  box1.appendChild(inputsecond);

  container2.appendChild(box1);

  var qustionElement = document.createElement("h1");
  qustionElement.setAttribute("id", "question");
  container2.appendChild(qustionElement);

  var para1 = document.createElement("p");
  para1.setAttribute("class", "option");
  para1.setAttribute("onclick", "addClass(this)");
  container2.appendChild(para1);

  var para2 = document.createElement("p");
  para2.setAttribute("class", "option");
  para2.setAttribute("onclick", "addClass(this)");
  container2.appendChild(para2);

  var para3 = document.createElement("p");
  para3.setAttribute("class", "option");
  para3.setAttribute("onclick", "addClass(this)");
  container2.appendChild(para3);

  var para4 = document.createElement("p");
  para4.setAttribute("class", "option");
  para4.setAttribute("onclick", "addClass(this)");
  container2.appendChild(para4);

  var box2 = document.createElement("div");
  box2.classList.add("box");

  var button = document.createElement("a");
  button.setAttribute("class", "next");
  button.setAttribute("onclick", "nextQuestion()");

  var buttonText = document.createTextNode("Next");
  button.appendChild(buttonText);

  box2.appendChild(button);

  container2.appendChild(box2);

  var minute = document.getElementById("minute");
  var second = document.getElementById("second");

  minute.value = 4;
  second.value = 59;

  showQuestion(0);
  timerClock();
}

// coding for timer

var timer;

function timerClock() {
  timer = setInterval(function () {
    if (second.value == 0) {
      if (minute.value != 0) {
        second.value = 59;
        minute.value--;
      }
    }
    if (minute.value != 0 || second.value != 0) {
      second.value--;
    }
    if (minute.value == 0 && second.value == 0) {
      clearInterval(timer);
      Swal.fire("Sorry!", "Your time is up .", "error");
      container2.style.display = "none";
      endPage();
    }
  }, 1000);
}

// coding for quiz object

var quizArray = [
  {
    question: "what is the capital of Pakistan .",
    answer: "Islamabad",
    option: ["Karachi", "Punjab", "Islamabad", "Sindh"],
  },
  {
    question: "who is the first governor general of pakistan .",
    answer: "Quid-Azam Muhammad Ali Jinnah",
    option: [
      "Quid-Azam Muhammad Ali Jinnah",
      "Liaquat Ali Khan",
      "Sir Syed Ahmed Khan",
      "Allama Iqbal",
    ],
  },
  {
    question: "who is the first prime minister of pakistan .",
    answer: "Liaquat Ali Khan",
    option: [
      "Allama Iqbal",
      "Quid-Azam Muhammad Ali Jinnah",
      "Sir Syed Ahmed Khan",
      "Liaquat Ali Khan",
    ],
  },
  {
    question: "who is known as the poet of the east .",
    answer: "Allama Iqbal",
    option: [
      "Faiz Ahmed Faiz",
      "Hafeez Jalandhari",
      "Allama Iqbal",
      "Sir Syed Ahmed Khan",
    ],
  },
  {
    question: "who is the honest leader of pakistan .",
    answer: "Imran Khan",
    option: ["Imran Khan", "Nawaz Sharif", "Shahbaz Sharif", "Zardari"],
  },
];

var option = document.getElementsByClassName("option");

var questionCount = 0;

var scoreCount = 0;

// to show the first question on our browser

function showQuestion(a) {
  var questionElement = document.getElementById("question");
  questionElement.innerHTML = quizArray[a].question;

  var option = document.getElementsByClassName("option");

  for (var i = 0; i < option.length; i++) {
    option[i].innerHTML = quizArray[a].option[i];
  }
}

function nextQuestion() {
  questionCount++;

  if (questionCount === 5) {
    container2.style.display = "none";
    endPage();
  }

  // check if user choose the answer or not

  var validation = false;

  for (var i = 0; i < option.length; i++) {
    if (option[i].classList.contains("active")) {
      validation = true;
      showQuestion(questionCount);
    }
  }

  if (validation == false) {
    Swal.fire("Sorry!", "Choose the answer first !", "error");
  }

  removeClass();
}

// to add and remove the class

function addClass(e) {
  removeClass();
  e.classList.add("active");

  // to increese the score

  var flage = e.classList.contains("active");
  if (flage) {
    if (e.innerHTML == quizArray[questionCount].answer) {
      scoreCount++;
    }
  }
}

function removeClass() {
  for (var i = 0; i < option.length; i++) {
    option[i].classList.remove("active");
  }
}

// coding for end page
var container3 = document.createElement("div");
var user = document.createElement("h2");

function endPage() {
  body.classList.remove("main");
  body.classList.add("end");
  container3.classList.add("minicontainer2");
  body.appendChild(container3);
  user.setAttribute("id", "user");
  container3.appendChild(user);
  var showScore = document.createElement("h2");
  showScore.setAttribute("id", "showScore");
  container3.appendChild(showScore);
  var buttonElement = document.createElement("a");
  buttonElement.setAttribute("onclick", "startAgain()");
  var buttonText = document.createTextNode("want to start again");
  buttonElement.appendChild(buttonText);
  container3.appendChild(buttonElement);
  showScore.innerHTML = "your score is : " + scoreCount;

  // adding database

  var obj = {
    username: userName.value,
    score: scoreCount
  }

  firebase.database().ref("information").push(obj);

  showName();
}

function startAgain() {
  window.location.reload();
}

function showName(e) {
  user.innerHTML = "name : " + e.value;
}
