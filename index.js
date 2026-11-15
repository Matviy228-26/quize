document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    const questions = [
        {
            question: "Яка планета найближча до сонця?",
            answers: ["Марс", "Земля", "Юпітер", "Меркурій"],
            correct: 3
        },
        {
            question: "Скільки планет у сонячній системі?",
            answers: ["9", "7", "8", "11"],
            correct: 2
        },
        {
            question: "На якій планеті день довший за рік?",
            answers: ["Венері", "Землі", "Нептун", "Марс"],
            correct: 0
        },
        {
            question: "На якій планеті дмуть найшвидші вітри?",
            answers: ["На Юпітері", "На Нептуні", "На Венері", "На Землі"],
            correct: 1
        },
        {
            question: "Яка планета обертається «лежачи на боці»?",
            answers: ["Земля", "Венера", "Меркурій", "Уран"],
            correct: 2
        },
        {
            question: "Скільки часу потрібно сонячному світлу, щоб долетіти до Землі?",
            answers: ["8хв 20с", "10хв", "11хв 10с", "15хв 18с"],
            correct: 0
        },
        {
            question: "Яка з газових планет має таку низьку середню густину, що, якби знайшовся достатньо великий океан, вона б теоретично плавала у воді?",
            answers: ["Уран", "Меркурій", "Сатурн", "Земля"],
            correct: 2
        },
        {
            question: "У надрах яких планет, за розрахунками вчених, тиск і температура настільки високі, що там можуть випадати справжні «діамантові дощі»?",
            answers: ["Уран і Нептун", "Меркурій і Земля", "Сатурн і Марс", "Земля і Юпітер"],
            correct: 2
        },
        {
            question: "Найближча до Землі зоря, яка забезпечує її світлом і теплом, - це",
            answers: ["Уран", "Сонце", "Місяць", "Марс"],
            correct: 1
        },
        {
            question: "Яка за порядком в сонячній системі Земля?",
            answers: ["2", "4", "7", "3"],
            correct: 3
        },
        {
            question: "Супутник Землі це",
            answers: ["Місяць", "Марс", "Нептун", "Сонце"],
            correct: 0
        },
   
    ];
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display')
    
    let questionIndex = 0;
    let score = 0;
    let timer = 30;
    const timerDisplay = document.querySelector('#timer');
    let interval;
    
    // Керування екранами (JS)
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);

    // Функція для відображення запитання
    function showQuestion(question) {
        clearInterval(interval); 
        startTimer();
        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }
    showQuestion(questions[questionIndex]);
    
    // Функція для переходу до наступного запитання
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
    
    // Перевірка відповіді
    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            scoreDisplay.innerText = `Бали: ${score}`;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })
        setTimeout(nextQuestion, 1000);
    }


    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const finalScore = document.querySelector('#final-score');
        finalScore.innerText = score;
    }


    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    function startTimer() {
        timer = 30;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});
