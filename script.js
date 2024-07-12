const startBtn = document.querySelector(".startBtn button");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const options = document.querySelector(".options");
const timeLeft = document.querySelector(".timer .timeLeft");
const timerSecs = document.querySelector(".timer .timerSecs");
const restart = resultContainer.querySelector(".buttons .restart");
const quit = resultContainer.querySelector(".buttons .quit");
const nextQuestionBtn = document.querySelector("footer .nextQuestionBtn");
const bottomQuestionsCounter = document.querySelector("footer .totalCount");
const iconContainer = document.querySelector(".icon");

let timeValue = 30;
let questionsCount = 0;
let question = 1;
let userScore = 0;
let counter;

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function startQuiz() {
  quizContainer.classList.add("activeQuiz");
  showQuetions(0);
  questionsCounter(1);
  startTimer(30);
}

function quitQuiz() {
  window.location.reload();
}

function restartQuiz() {
  quizContainer.classList.add("activeQuiz");
  resultContainer.classList.remove("activeResult");
  timeValue = 30;
  questionsCount = 0;
  question = 1;
  userScore = 0;
  showQuetions(questionsCount);
  questionsCounter(question);
  clearInterval(counter);
  startTimer(timeValue);
  timeLeft.textContent = "Time Left";
  nextQuestionBtn.classList.remove("show");
}

function getNextQuestion() {
  if (questionsCount < questions.length - 1) {
    questionsCount++;
    question++;
    showQuetions(questionsCount);
    questionsCounter(question);
    clearInterval(counter);
    startTimer(timeValue);
    timeLeft.textContent = "Time Left";
    nextQuestionBtn.classList.remove("show");
  } else {
    clearInterval(counter);
    showResult();
  }
}

function showQuetions(index) {
  const currentQuestionText = document.querySelector(".currentQuestionText");

  let currentQuestion =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let currentOptions =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  currentQuestionText.innerHTML = currentQuestion;
  options.innerHTML = currentOptions;

  const option = options.querySelectorAll(".option");
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correcAns = questions[questionsCount].answer;
  const allOptions = options.children.length;

  if (userAns == correcAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);

    for (i = 0; i < allOptions; i++) {
      if (options.children[i].textContent == correcAns) {
        options.children[i].setAttribute("class", "option correct");
        options.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    options.children[i].classList.add("disabled");
  }
  nextQuestionBtn.classList.add("show");
}

function showResult() {
  quizContainer.classList.remove("activeQuiz");
  resultContainer.classList.add("activeResult");
  const score = resultContainer.querySelector(".score");
  if (userScore >= 3) {
    let scoreTag =
      "<span>გილოცავ! , შენ გაქვს <p>" +
      userScore +
      "</p> სწორი პასუხი <p>" +
      questions.length +
      "</p>-დან</span>";
    score.innerHTML = scoreTag;
    iconContainer.innerHTML = '<i class="fas fa-trophy golden"></i>';
  } else {
    let scoreTag =
      "<span>ვწუხვარ, შენ გაქვს მხოლოდ <p>" +
      userScore +
      "</p> სწორი პასუხი <p>" +
      questions.length +
      "" +
      "</p>-დან, ცადე ხელახლა</span>";
    score.innerHTML = scoreTag;
    iconContainer.innerHTML = '<i class="fas fa-redo red"></i>';
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timerSecs.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timerSecs.textContent;
      timerSecs.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeLeft.textContent = "Time Off";
      const allOptions = options.children.length;
      let correcAns = questions[questionsCount].answer;
      for (i = 0; i < allOptions; i++) {
        if (options.children[i].textContent == correcAns) {
          options.children[i].setAttribute("class", "option correct");
          options.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        }
      }
      for (i = 0; i < allOptions; i++) {
        options.children[i].classList.add("disabled");
      }
      nextQuestionBtn.classList.add("show");
    }
  }
}

function questionsCounter(index) {
  let totalQuestionsCount =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottomQuestionsCounter.innerHTML = totalQuestionsCount;
}

startBtn.addEventListener("click", startQuiz);

restart.addEventListener("click", restartQuiz);

quit.addEventListener("click", quitQuiz);

nextQuestionBtn.addEventListener("click", getNextQuestion);
