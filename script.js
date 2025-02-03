let score = 0;
let operation = "+";
let num1, num2, correctAnswer;
let isGameRunning = false;
let questionInterval, stopwatchInterval;
let stopwatchTime = 0;
let questionChangeTime = 5000; // Default level 1 (5 sec)

document.addEventListener("DOMContentLoaded", () => {
    setLevel(5); // Default level 1 on load
});

function generateProblem() {
    if (!isGameRunning) return;

    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    switch (operation) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = (num1 / num2).toFixed(1);
            break;
    }

    document.getElementById("question").textContent = `${num1} ${operation} ${num2} = ?`;
    document.getElementById("falling-container").innerHTML = ""; 
    startFallingNumbers();
}

function createFallingNumber(value, isCorrect) {
    if (!isGameRunning) return;

    let number = document.createElement("div");
    number.classList.add("falling-number");
    number.textContent = value;
    
    let container = document.getElementById("falling-container");
    number.style.left = Math.random() * (container.clientWidth - 60) + "px";

    number.style.transition = `transform 6s linear`; // Slower falling speed

    number.addEventListener("click", function () {
        if (isCorrect) {
            score++;
            document.getElementById("score").textContent = `⭐ Score: ${score}`;
        }
        container.removeChild(number);
    });

    container.appendChild(number);

    setTimeout(() => {
        number.style.transform = `translateY(${window.innerHeight}px)`; // Falls to bottom
        setTimeout(() => container.removeChild(number), 6500);
    }, 100);
}

function startFallingNumbers() {
    if (!isGameRunning) return;

    let correctPosition = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < 5; i++) {
        if (i === correctPosition) {
            createFallingNumber(correctAnswer, true);
        } else {
            let wrongAnswer;
            do {
                wrongAnswer = Math.floor(Math.random() * 40) + 1;
            } while (wrongAnswer === correctAnswer);
            createFallingNumber(wrongAnswer, false);
        }
    }
}

function changeOperation(op) {
    operation = op;
    generateProblem();
}

function setLevel(seconds) {
    questionChangeTime = seconds * 1000;
    stopGame();
    startGame();
}

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    stopwatchTime = 0;
    score = 0; // Reset score to zero when game starts
    document.getElementById("stopwatch").textContent = `⏳ 0`;
    document.getElementById("score").textContent = `⭐ Score: 0`;

    generateProblem();

    // Start stopwatch
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        document.getElementById("stopwatch").textContent = `⏳ ${stopwatchTime}`;
    }, 1000);

    // Change question based on selected level interval
    questionInterval = setInterval(generateProblem, questionChangeTime);
}

function stopGame() {
    isGameRunning = false;
    clearInterval(questionInterval);
    clearInterval(stopwatchInterval);
    document.getElementById("falling-container").innerHTML = "";
}