const timerContainerEl = document.getElementById("timer-container");
const timerTextEl = document.getElementById("timer-text");
const directionTextEl = document.getElementById("direction-text");
const startButtonEl = document.getElementById("start-quiz-btn");
const questionContainerEl = document.getElementById("quiz-container");
const choiceContainerEl = document.getElementById("choice-container");
const mainContainerEl = document.getElementsByTagName("main")[0];
const submitScoreFormEl = document.getElementById("submit-score-form");
const playerNameInputEl = document.getElementById("player-name-input");
const scoreSubmitBtnEl = document.getElementById("submit-score-btn");

const MAX_TIME_REMAINING_SECONDS = 75;
const INTERVAL_TIMEOUT_MS = 1000;

const quiz = {
  // Base Properties
  possibleQuestions: questions,
  currentQuestion: undefined,
  currentQuestionIndex: 0,
  timeRemaining: MAX_TIME_REMAINING_SECONDS,
  timerId: undefined,
  score: {
    // Score Properties
    numCorrect: 0,
    percentage: 0,
    timeRemaining: 0,
    playerName: "",
    // Score Getter/Setters
    getNumCorrect: function () {
      return this.numCorrect;
    },
    setNumCorrect: function (num) {
      this.numCorrect = num;
    },
    increaseNumCorrect: function (num) {
      const currentCorrect = this.getNumCorrect();
      this.setNumCorrect(currentPoints + num);
    },
    setPercentage: function (num) {
      this.percentage = num;
    },
    calcPercentage: function (arr) {
      return parseFloat(this.getNumCorrect() / arr.length).toFixed(2);
    },
    getTimeRemaining: function () {
      return this.timeRemaining;
    },
    setTimeRemaining: function (num) {
      this.timeRemaining = num;
    },
    getPlayerName: function () {
      return this.playerName;
    },
    setPlayerName: function (str) {
      const validatedString = str.trim();
      if (validatedString) {
        this.playerName = validatedString;
      } else {
        this.playerName = "Anonymous";
      }
    },
    // Reset The Score Object
    resetScore: function () {
      this.setNumCorrect(0);
      this.setTimeRemaining(0);
      this.setPlayerName("");
      this.setPercentage(0);
    },
  },
  // Getters and Setters
  getScore: function () {
    return this.score;
  },
  getPossibleQuestions: function () {
    return this.possibleQuestions;
  },
  setPossibleQuestions: function (arr) {
    this.possibleQuestions = arr;
  },
  getCurrentQuestion: function () {
    return this.currentQuestion;
  },
  setCurrentQuestion: function (question) {
    this.currentQuestion = question;
  },
  getCurrentQuestionIndex: function () {
    return this.currentQuestionIndex;
  },
  setCurrentQuestionIndex: function (index) {
    this.currentQuestionIndex = index;
  },
  increaseCurrentQuestionIndex: function () {
    const currentIndex = this.getCurrentQuestionIndex();
    this.setCurrentQuestionIndex(currentIndex + 1);
  },
  getTimeRemaining: function () {
    return this.timeRemaining;
  },
  setTimeRemaining: function (num) {
    this.timeRemaining = num;
  },
  getTimerId: function () {
    return this.timerId;
  },
  setTimerId: function (intervalId) {
    this.timerId = intervalId;
  },
  // Methods I will run
  shuffleArray: function (arr) {
    const questionsToReturn = arr;
    let currentIndex = questionsToReturn.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      let tmpValue = questionsToReturn[currentIndex];
      questionsToReturn[currentIndex] = questionsToReturn[randomIndex];
      questionsToReturn[randomIndex] = tmpValue;
    }

    return questionsToReturn;
  },
  renderNextQuestion: function () {
    this.increaseCurrentQuestionIndex();
    if (this.getCurrentQuestionIndex() < this.getPossibleQuestions().length) {
      this.setCurrentQuestion(
        this.possibleQuestions[this.currentQuestionIndex]
      );
      this.clearQuizElements();
      this.renderQuestion();
      this.renderChoices();
    } else {
      clearInterval(this.getTimerId());
      this.endQuiz();
    }
  },
  checkQuestion: function (e) {
    e.preventDefault();

    const currentQuestion = this.getCurrentQuestion();
    const clickedElement = e.target;

    if (!clickedElement.matches("button")) {
      return;
    }

    const isCorrect =
      currentQuestion.answer === clickedElement.getAttribute("data-choice");

    if (!isCorrect) {
      this.decreaseTime(10);
    }
    return isCorrect;
  },
  renderQuestion: function () {
    const questionToRender = this.getCurrentQuestion();
    const questionTextEl = document.createElement("p");
    questionTextEl.textContent = questionToRender.questionText;

    questionContainerEl.append(questionTextEl);
  },
  renderChoices: function () {
    const choicesToRender = this.shuffleArray(
      this.getCurrentQuestion().choices
    );

    for (let i = 0; i < choicesToRender.length; i++) {
      const choiceButtonEl = document.createElement("button");
      choiceButtonEl.type = "button";
      choiceButtonEl.classList.add("choice-btn");
      choiceButtonEl.setAttribute("data-choice", choicesToRender[i]);
      choiceButtonEl.textContent = choicesToRender[i];

      choiceContainerEl.append(choiceButtonEl);
    }
  },
  decreaseTime: function (num) {
    const currentTimeRemaining = this.getTimeRemaining();
    if (currentTimeRemaining - num > 0) {
      this.setTimeRemaining(currentTimeRemaining - num);
    } else {
      this.setTimeRemaining(0);
    }
  },
  increaseTime: function (num) {
    const currentTimeRemaining = this.getTimeRemaining();
    this.setTimeRemaining(currentTimeRemaining + num);
  },
  runInterval: function () {
    this.decreaseTime(1);
    timerTextEl.textContent = this.getTimeRemaining();

    if (this.getTimeRemaining() <= 0) {
      clearInterval(this.getTimerId());
      this.endQuiz();
    }
  },
  startTimer: function () {
    const interval = setInterval(
      this.runInterval.bind(this),
      INTERVAL_TIMEOUT_MS
    );
    this.setTimerId(interval);
  },
  showTimer: function () {
    timerTextEl.textContent = this.getTimeRemaining();
    timerContainerEl.style.display = "block";
  },
  hideDirections: function () {
    directionTextEl.style.display = "none";
    startButtonEl.style.display = "none";
  },
  showDirections: function () {
    submitScoreFormEl.style.display = "none";
    mainContainerEl.style.display = "flex";
    directionTextEl.style.display = "block";
    startButtonEl.style.display = "block";
  },
  clearQuizElements: function () {
    questionContainerEl.innerHTML = "";
    choiceContainerEl.innerHTML = "";
  },
  endQuiz: function () {
    this.clearQuizElements();
    mainContainerEl.style.display = "none";
    submitScoreFormEl.style.display = "flex";
    timerTextEl.textContent = MAX_TIME_REMAINING_SECONDS;
  },
  saveScore: function () {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

    if (!leaderboard && !Array.isArray(leaderboard)) {
      leaderboard = [];
    }

    leaderboard.push(this.getScore());
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  },
  resetQuiz: function () {
    this.setCurrentQuestionIndex(0);
    this.setCurrentQuestion(undefined);
    this.setTimeRemaining(MAX_TIME_REMAINING_SECONDS);
    this.setTimerId(undefined);
    this.getScore().resetScore();
  },
  startQuiz: function () {
    this.hideDirections();
    this.showTimer();
    this.setPossibleQuestions(this.shuffleArray(this.getPossibleQuestions()));
    this.setCurrentQuestion(this.possibleQuestions[this.currentQuestionIndex]);
    this.renderQuestion();
    this.renderChoices();
    this.startTimer();
  },
};

function submitScore(e) {
  e.preventDefault();

  const playerName = playerNameInputEl.value;
  quiz.getScore().setPlayerName(playerName);
  quiz
    .getScore()
    .setPercentage(quiz.getScore().calcPercentage(quiz.getPossibleQuestions()));

  quiz.saveScore();
  quiz.getScore().resetScore();
  quiz.showDirections();
  quiz.resetQuiz();
}

function checkAnswer(e) {
  const isCorrect = quiz.checkQuestion(e);
  if (isCorrect) {
    const currentNumCorrect = quiz.getScore().getNumCorrect();
    quiz.getScore().setNumCorrect(currentNumCorrect + 1);
  }
  quiz.renderNextQuestion();
}

function main(e) {
  e.preventDefault();
  quiz.startQuiz();
}

startButtonEl.addEventListener("click", main);
choiceContainerEl.addEventListener("click", checkAnswer);
scoreSubmitBtnEl.addEventListener("click", submitScore);
