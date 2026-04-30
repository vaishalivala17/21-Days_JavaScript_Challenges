const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const subjectSelect = document.getElementById('subjectSelect');
const questionCount = document.getElementById('questionCount');
const timeLimit = document.getElementById('timeLimit');
const startBtn = document.getElementById('startBtn');

const currentSubject = document.getElementById('currentSubject');
const timeDisplay = document.getElementById('timeDisplay');
const progressBar = document.getElementById('progressBar');
const currentQ = document.getElementById('currentQ');
const totalQ = document.getElementById('totalQ');
const scoreDisplay = document.getElementById('scoreDisplay');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');

const finalScore = document.getElementById('finalScore');
const correctAnswers = document.getElementById('correctAnswers');
const wrongAnswers = document.getElementById('wrongAnswers');
const accuracy = document.getElementById('accuracy');
const resultIcon = document.getElementById('resultIcon');
const resultMessage = document.getElementById('resultMessage');
const reviewBtn = document.getElementById('reviewBtn');
const restartBtn = document.getElementById('restartBtn');
const backToResult = document.getElementById('backToResult');
const reviewContainer = document.getElementById('reviewContainer');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let userAnswers = [];
let timer = null;
let timeLeft = 0;
let selectedTimeLimit = 15;
let selectedSubject = '';
let selectedCount = 10;

const subjectNames = {
    '9': 'General Knowledge',
    '17': 'Science & Nature',
    '18': 'Science: Computers',
    '19': 'Science: Mathematics',
    '21': 'Sports',
    '22': 'Geography',
    '23': 'History',
    '27': 'Animals'
};

document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select-trigger');
    const dropdown = select.querySelector('.custom-select-dropdown');
    const options = select.querySelectorAll('.custom-select-option');
    const hiddenSelect = select.nextElementSibling;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other selects
        document.querySelectorAll('.custom-select.open').forEach(s => {
            if (s !== select) s.classList.remove('open');
        });
        select.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.textContent;

            trigger.querySelector('span').textContent = text;

            hiddenSelect.value = value;

            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            select.classList.remove('open');
        });
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(s => {
        s.classList.remove('open');
    });
});

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResult.addEventListener('click', () => {
    reviewScreen.classList.add('d-none');
    resultScreen.classList.remove('d-none');
});

// Start Quiz
async function startQuiz() {
    selectedSubject = subjectSelect.value;
    selectedCount = parseInt(questionCount.value);
    selectedTimeLimit = parseInt(timeLimit.value);

    if (!selectedSubject) {
        alert('Please select a subject!');
        return;
    }

    try {
        // Fetch questions from Open Trivia Database
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${selectedCount}&category=${selectedSubject}&type=multiple`
        );
        const data = await response.json();

        if (data.results.length === 0) {
            alert('No questions available for this category. Please try another.');
            return;
        }

        questions = data.results.map(q => ({
            question: decodeHTML(q.question),
            correct: decodeHTML(q.correct_answer),
            incorrect: q.incorrect_answers.map(a => decodeHTML(a)),
            category: q.category,
            difficulty: q.difficulty
        }));

        // Shuffle options for each question
        questions.forEach(q => {
            q.options = shuffleArray([q.correct, ...q.incorrect]);
        });

        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        userAnswers = [];

        totalQ.textContent = questions.length;
        currentSubject.textContent = subjectNames[selectedSubject] || 'Quiz';

        startScreen.classList.add('d-none');
        resultScreen.classList.add('d-none');
        reviewScreen.classList.add('d-none');
        quizScreen.classList.remove('d-none');

        showQuestion();

    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please check your internet connection and try again.');
    }
}

// Show Current Question
function showQuestion() {
    const q = questions[currentQuestionIndex];
    
    // Update progress
    currentQ.textContent = currentQuestionIndex + 1;
    scoreDisplay.textContent = score;
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    questionText.textContent = q.question;

    optionsContainer.innerHTML = q.options.map((option, index) => `
        <button class="option-btn" data-index="${index}" onclick="selectOption(${index})">
            ${option}
        </button>
    `).join('');

    startTimer();
}

// Start Timer
function startTimer() {
    timeLeft = selectedTimeLimit;
    timeDisplay.textContent = timeLeft;
    
    const timerBadge = document.getElementById('timer');
    timerBadge.classList.remove('warning', 'danger');

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        // Timer warnings
        if (timeLeft <= 5) {
            timerBadge.classList.add('warning');
        }
        if (timeLeft <= 3) {
            timerBadge.classList.remove('warning');
            timerBadge.classList.add('danger');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// Handle Timeout
function handleTimeout() {
    const q = questions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option-btn');
    
    // Mark correct answer
    options.forEach(btn => {
        btn.classList.add('disabled');
        if (btn.textContent.trim() === q.correct) {
            btn.classList.add('correct');
        }
    });

    // Record for wrong answer
    wrongCount++;
    userAnswers.push({
        question: q.question,
        userAnswer: 'Time Up!',
        correctAnswer: q.correct,
        isCorrect: false
    });

    setTimeout(nextQuestion, 1500);
}

function selectOption(index) {
    clearInterval(timer);
    
    const q = questions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option-btn');
    const selectedOption = options[index].textContent.trim();
    const isCorrect = selectedOption === q.correct;

    options.forEach(btn => btn.classList.add('disabled'));

    // Show correct/wrong
    if (isCorrect) {
        options[index].classList.add('correct');
        score += 10;
        correctCount++;
    } else {
        options[index].classList.add('wrong');
        // Show correct answer
        options.forEach(btn => {
            if (btn.textContent.trim() === q.correct) {
                btn.classList.add('correct');
            }
        });
        wrongCount++;
    }

    // Record answer
    userAnswers.push({
        question: q.question,
        userAnswer: selectedOption,
        correctAnswer: q.correct,
        isCorrect: isCorrect
    });

    setTimeout(nextQuestion, 1500);
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show Result
function showResult() {
    quizScreen.classList.add('d-none');
    resultScreen.classList.remove('d-none');

    finalScore.textContent = score;
    correctAnswers.textContent = correctCount;
    wrongAnswers.textContent = wrongCount;
    const accuracyPercent = Math.round((correctCount / questions.length) * 100);
    accuracy.textContent = `${accuracyPercent}%`;

    if (accuracyPercent >= 80) {
        resultIcon.textContent = '🏆';
        resultMessage.textContent = 'Excellent! You\'re a quiz master!';
    } else if (accuracyPercent >= 60) {
        resultIcon.textContent = '🎉';
        resultMessage.textContent = 'Great job! Keep learning!';
    } else if (accuracyPercent >= 40) {
        resultIcon.textContent = '👍';
        resultMessage.textContent = 'Good effort! Try again!';
    } else {
        resultIcon.textContent = '📚';
        resultMessage.textContent = 'Keep practicing! You can do it!';
    }
}

// Show Review
function showReview() {
    resultScreen.classList.add('d-none');
    reviewScreen.classList.remove('d-none');

    reviewContainer.innerHTML = userAnswers.map((answer, index) => `
        <div class="review-item">
            <div class="review-question">Q${index + 1}: ${answer.question}</div>
            <div class="review-answer ${answer.isCorrect ? 'correct' : 'wrong'}">
                Your answer: ${answer.userAnswer}
            </div>
            ${!answer.isCorrect ? `<div class="review-correct">Correct: ${answer.correctAnswer}</div>` : ''}
        </div>
    `).join('');
}

// Restart Quiz
function restartQuiz() {
    resultScreen.classList.add('d-none');
    reviewScreen.classList.add('d-none');
    startScreen.classList.remove('d-none');
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}