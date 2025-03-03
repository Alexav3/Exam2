const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: ["Paris"],
  },
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

function loadQuestion() {
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionObj.question;
  const optionsContainer = document.getElementById("options");
  const nextButton = document.getElementById("next-button");
  nextButton.disabled = true;
  selectedAnswers = [];

  optionsContainer.innerHTML = "";

  questionObj.options.forEach((option) => {
    const li = document.createElement("li");
    li.innerText = option;
    li.onclick = () => toggleSelection(option, li);
    optionsContainer.appendChild(li);
  });
}

function toggleSelection(option, element) {
  if (selectedAnswers.includes(option)) {
    selectedAnswers = selectedAnswers.filter((ans) => ans !== option);
    element.classList.remove("correct", "incorrect");
  } else {
    selectedAnswers.push(option);
    element.classList.add("correct");
  }
  document.getElementById("next-button").disabled =
    selectedAnswers.length === 0;
}

function checkAnswers() {
  const correctAnswers = questions[currentQuestionIndex].answer;
  const optionsContainer = document.getElementById("options");
  Array.from(optionsContainer.children).forEach((li) => {
    if (correctAnswers.includes(li.innerText)) {
      li.classList.add("correct");
    } else {
      li.classList.add("incorrect");
    }
  });
}

function nextQuestion() {
  checkAnswers();
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz-container").innerHTML =
        "<h2>Quiz Completed!</h2>";
    }
  }, 1000);
}

loadQuestion();
