const questionsContainerElement = document.getElementById("question-container");
const startButtonElement = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

startButtonElement.addEventListener("click", startGame);
nextButton.addEventListener("click", startGame);

async function getQuestions() {
  try {
    const response = await fetch("./questions.json");
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

let questions;
async function getRandomQuestions() {
  if (questions == undefined) questions = await getQuestions();
  const index = Math.round(Math.random() * questions.length);
  //   console.log(index); /////////////// Remove this after completing the function
  return questions[index];
}

const answerButtonsElement = document.getElementById("answer-buttons");
async function resetSlate() {
  let button = answerButtonsElement.firstChild;
  document.body.classList.remove("correct");
  document.body.classList.remove("wrong");
  nextButton.classList.add("hide");
  while (button) {
    answerButtonsElement.removeChild(button);
    button = answerButtonsElement.firstChild;
  }
}

const questionElement = document.getElementById("question");
async function startGame() {
  startButtonElement.classList.add("hide");
  const question = await getRandomQuestions();
  resetSlate();
  questionElement.innerHTML = question.question;
  questionsContainerElement.classList.remove("hide");
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const button = e.target;
  let className;
  if (button.dataset.correct) {
    className = "correct";
  } else {
    className = "wrong";
  }
  document.body.classList.add(className);

  const arrayedButtons = Array.from(answerButtonsElement.children);
  arrayedButtons.forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });
  nextButton.classList.remove("hide");
}
