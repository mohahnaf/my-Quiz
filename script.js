const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .6)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the currency of Denmark?',
    answers: [
      { text: 'RKrone', correct: true },
      { text: 'CAD', correct: false },
      { text: 'JPY', correct: false },
      { text: 'CHF', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'PewDiePie', correct: true },
      { text: 'Dude Perfect', correct: false },
      { text: 'elrubiusOMG', correct: false},
      { text: 'MrBeast', correct: false}
    ]
  },
  {
    question: 'Netflix was created when?',
    answers: [
      { text: '1998', correct: false },
      { text: '1997', correct: true },
      { text: '1999', correct: false },
      { text: '1996', correct: false }
    ]
  },
  {
    question: 'Which came first ?',
    answers: [
      { text: 'Instagram', correct: false },
      { text: 'Facebook', correct: true },
      { text: 'Twitter', correct: false },
      { text: 'YouTube', correct: false }
    ]
  },

  {
    question: 'How about the smallest country?',
    answers: [
      { text: 'Tuvalu', correct: false },
      { text: 'Principality Of Monaco', correct: false },
      { text: 'Vatican City ', correct: true },
      { text: 'Republic Of Nauru', correct: false }
    ]
  }
]