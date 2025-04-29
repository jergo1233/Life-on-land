// Script.js

const allQuestions = [
  {
    question: "Which of these animals is considered critically endangered?",
    options: ["Tiger", "Panda", "Amur Leopard", "Elephant"],
    answer: "Amur Leopard"
  },
  {
    question: "What percentage of Earth's land is currently covered by forests?",
    options: ["31%", "50%", "10%", "70%"],
    answer: "31%"
  },
  {
    question: "Which activity contributes the most to deforestation?",
    options: ["Urban expansion", "Cattle ranching", "Logging for paper", "Mining"],
    answer: "Cattle ranching"
  },
  {
    question: "Which international day focuses on forests?",
    options: ["March 21", "April 22", "June 5", "September 16"],
    answer: "March 21"
  },
  {
    question: "What does biodiversity refer to?",
    options: ["Amount of rainfall", "Variety of life forms", "Types of trees", "Air quality"],
    answer: "Variety of life forms"
  },
  {
    question: "What is the biggest threat to wildlife in tropical forests?",
    options: ["Poaching", "Climate change", "Habitat loss", "Pollution"],
    answer: "Habitat loss"
  },
  {
    question: "Which forest is the largest in the world?",
    options: ["Amazon Rainforest", "Congo Basin", "Taiga", "Siberian Forest"],
    answer: "Amazon Rainforest"
  },
  {
    question: "What is the main cause of desertification?",
    options: ["Overgrazing", "Deforestation", "Industrial pollution", "Urbanization"],
    answer: "Overgrazing"
  },
  {
    question: "Which bird is known for migrating over long distances, covering thousands of miles?",
    options: ["Eagle", "Swallow", "Penguin", "Albatross"],
    answer: "Albatross"
  },
  {
    question: "Which of these ecosystems is most affected by climate change?",
    options: ["Coral reefs", "Temperate forests", "Tundra", "Deserts"],
    answer: "Coral reefs"
  }
];

let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let feedbackEl = document.getElementById("feedback");
let progressEl = document.getElementById("progress");
let homeSection = document.getElementById("homeSection");
let historySection = document.getElementById("historySection");
let aboutSection = document.getElementById("aboutSection");


function getRandomQuestions() {
  let shuffled = allQuestions.sort(() => 0.5 - Math.random());
  selectedQuestions = shuffled.slice(0, 5);
}

function loadQuestion() {
  let q = selectedQuestions[currentQuestion];
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  progressEl.textContent = "Question " + currentQuestion + " of 5";

  let buttonsHTML = "";
  q.options.forEach(option => {
  buttonsHTML += "<button onclick=\"checkAnswer('" + option + "')\">" + option + "</button>";
  });

  optionsEl.innerHTML = buttonsHTML;
}

function checkAnswer(selected) {
  let correct = selectedQuestions[currentQuestion].answer;
  let feedbackMessage;

  if (selected === correct) {
    feedbackMessage = "✅ Correct!";
    score++;
  } else {
    feedbackMessage = "❌ Oops! The correct answer was: " + correct;
  }

  feedbackEl.textContent = feedbackMessage;
  currentQuestion++;

  if (currentQuestion < selectedQuestions.length) {
    setTimeout(loadQuestion, 1500);
  } else {
    setTimeout(showResults, 1500);
  }
}

function showResults() {
  questionEl.textContent = "🎉 Quiz Complete!";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "Your Score: "+ score + " out of " + selectedQuestions.length;
  progressEl.textContent = "Thanks for playing! 🌱";

  // Save score to localStorage
  saveScore(score);
}

function saveScore(score) {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function displayScoreHistory() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let scoreHistory = document.getElementById("scoreHistory");
  
  if (scores.length === 0) {
    scoreHistory.innerHTML = "<p> No history available. </p>";
  } else {
    scoreHistory.innerHTML = scores.map(score => "<li>"+score+"</li>").join("");
  }
}


document.getElementById("homeLink").onclick = function() {
  homeSection.style.display = "none";
  historySection.style.display = "none";
  aboutSection.style.display = "none";
  document.getElementById("par").style.display = "block";
};


document.getElementById("chaLink").onclick = function() {
  homeSection.style.display = "block";
  historySection.style.display = "none";
  aboutSection.style.display = "none";
  document.getElementById("par").style.display = "none";
};

document.getElementById("historyLink").onclick = function() {
  homeSection.style.display = "none";
  historySection.style.display = "block";
  aboutSection.style.display = "none";
  document.getElementById("par").style.display = "none";
  displayScoreHistory();
};

document.getElementById("aboutLink").onclick = function() {
  homeSection.style.display = "none";
  historySection.style.display = "none";
  aboutSection.style.display = "block";
  document.getElementById("par").style.display = "none";
};

document.getElementById("backToHome").onclick = function() {
  homeSection.style.display = "block";
  historySection.style.display = "none";
  aboutSection.style.display = "none";
  document.getElementById("par").style.display = "none";
};

document.getElementById("backToHome2").onclick = function() {
  homeSection.style.display = "block";
  aboutSection.style.display = "none";
  historySection.style.display = "none";
  document.getElementById("par").style.display = "none";
};
getRandomQuestions();
loadQuestion();







