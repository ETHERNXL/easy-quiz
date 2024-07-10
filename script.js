const questions = [
    {
        question: "What is the biggest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Hippo", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "St. David's", correct: false},
            {text: "Vatican City", correct: true},
            {text: "Oia", correct: false},
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            {text: "Antarctic Polar Desert", correct: true},
            {text: "The Great Basin", correct: false},
            {text: "The Katpana Desert", correct: false},
            {text: "The Atacama", correct: false},
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];

 const questionElement = document.getElementById("question");
 const answerButtons = document.getElementById("answer-buttons");
 const nextButton = document.getElementById("next-btn");
 
 let currentQuestionIndex = 0;
 let score = 0;

 function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
 }

 let currentQuestion = 0;

 function showQuestion(){
    resetState();
    currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
 }

 function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
 }

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

 startQuiz();
