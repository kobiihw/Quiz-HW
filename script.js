const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
var time = document.querySelector(".time");
var main = document.getElementById("main");
let score = 1;

//Quiz time limit.....Speed is key
var secondsLeft = 25;


//Shuffle them questions up
let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Press start btn
function startQuiz(){
    startBtn.classList.add('hide');

    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft;
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          questionContainer.classList.add('hide')
          gameOver()
        }
      }, 1000);

    shuffledQuestions = questions.sort(() => Math.random() -.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion()
}
// Questions/Answers
function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
//Main content
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const btn = document.createElement('button')
        btn.innerText = answer.text
        btn.classList.add('answer-btn')
        if (answer.correct) {
            btn.dataset.correct = answer.correct
        }
        btn.addEventListener('click', selectAnswer)
        answerBtns.appendChild(btn)
    })
}
//Reset after every question
function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtns.firstChild) {
        answerBtns.removeChild (answerBtns.firstChild)
    }
}
//Click on one of 4 answers
function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct
    setSatusClass(document.body, correct)
    Array.from(answerBtns.children).forEach(btn => {
        setSatusClass(btn, btn.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
    } else {
        startBtn.classList.remove('hide')
    }
}
//Right vs. Wrong Answer
function setSatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        score++;
        console.log(score)
    } else {
        element.classList.add('wrong')
        score += 0;
    }
}
//Reset hue color to neutral
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
//Actual  questions and Answers
const questions = [
    //Q1
{
    question: 'Forwards I am heavy, backwards I am not',
    answers: [
        {text: 'Ton', correct: true },
        {text: 'Wheelbarrow', correct: false },
        {text: 'Weight', correct: false },
        {text: 'Feather', correct: false }
    ]
},
//Q2
{
    question: 'I can go up a chimney down, but can not go down a chimney up.',
    answers: [
        {text: 'Coal', correct: false },
        {text: 'Smoke', correct: false },
        {text: 'Umbrella', correct: true },
        {text: 'Fire', correct: false }
    ]
},
//Q3
{
    question: "Who makes it and doesn't use it. Who buys it and doesn't use it. Who uses it and doesn't know.",
    answers: [
        {text: 'Ring', correct: false },
        {text: 'Coffin', correct: true },
        {text: 'Pants', correct: false },
        {text: 'Gift', correct: false }
    ]
},
//Q4
{
    question: 'I am always hungry, I must be fed. The finger I lick will turn red.',
    answers: [
        {text: 'Dog', correct: false },
        {text: 'Baby', correct: false },
        {text: 'Car', correct: false },
        {text: 'Fire', correct: true }
    ]
},
//Q5
{
    question: 'Until I am measured, I am not known, yet how you miss me when I have flown.',
    answers: [
        {text: 'Ton', correct: false },
        {text: 'Distance', correct: false },
        {text: 'Time', correct: true },
        {text: 'Age', correct: false }
    ]
},
//Q6
{
    question: 'Who is the best TA?',
    answers: [
        {text: 'Russell', correct: true },
        {text: 'Paul', correct: true },
        {text: 'Kat', correct: true },
        {text: 'Yan', correct: true }
    ]
}]
//Times up
function gameOver() {
    alert('you got' + score + '!');

}
//Im super stuck, if this isnt gone by the time I turn it in Im fucked