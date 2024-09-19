/*
30DaysOfCode Day 24
Project details: Quiz App
Javascript concept : Objects, Methods, File Storage

Project Outline: Step by step;



*/

// Array to hold the quiz questions and answers
const quizQuestions = [
    {
        question: "What does 'DOM' stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Management", correct: false },
            { text: "Document Operation Method", correct: false },
            { text: "Digital Object Manager", correct: false }
        ]
    },
    {
        question: "Which method is used to create a new array by calling a function for each element?",
        answers: [
            { text: "map()", correct: true },
            { text: "forEach()", correct: false },
            { text: "reduce()", correct: false },
            { text: "filter()", correct: false }
        ]
    },
    {
        question: "What is the correct syntax to output 'Hello World' in JavaScript?",
        answers: [
            { text: "echo 'Hello World'", correct: false },
            { text: "print('Hello World')", correct: false },
            { text: "console.log('Hello World')", correct: true },
            { text: "write('Hello World')", correct: false }
        ]
    }
];

// Get references to DOM elements for later use
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Variables to keep track of the current state
let currentQuestionIndex = 0;  // Tracks the current question number
let score = 0;                 // Tracks the user's score

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;  // Reset to the first question
    score = 0;                 // Reset the score to 0
    scoreElement.classList.add('hidden'); // Hide the score at the start
    nextButton.classList.add('hidden');   // Hide the 'Next' button
    showQuestion();             // Load the first question
}

// Function to display the current question and answer options
function showQuestion() {
    resetState();               // Clear the previous question/answers
    const currentQuestion = quizQuestions[currentQuestionIndex];  // Get the current question
    questionElement.textContent = currentQuestion.question;       // Display the question text

    // Loop through the answers for the current question
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');  // Create a button for each answer
        button.textContent = answer.text;                 // Set the button text
        button.classList.add('answer-btn', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-blue-700', 'w-full', 'mt-2');  // Tailwind CSS classes

        // Attach an event listener to the button to handle user clicks
        if (answer.correct) {
            button.dataset.correct = answer.correct;      // Mark the correct answer using a data attribute
        }
        button.addEventListener('click', selectAnswer);   // Event listener for user answer selection
        answerButtonsElement.appendChild(button);         // Add the button to the answer-buttons div
    });
}

// Function to clear out the previous question and answers
function resetState() {
    nextButton.classList.add('hidden');   // Hide the 'Next' button by default
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);  // Remove old answer buttons
    }
}

// Function to handle user selecting an answer
function selectAnswer(e) {
    const selectedButton = e.target;                 // Get the button that the user clicked
    const isCorrect = selectedButton.dataset.correct === 'true'; // Check if the answer is correct

    if (isCorrect) {
        selectedButton.classList.add('bg-green-500'); // Change the button color to green for correct answer
        score++;                                      // Increment the score if correct
    } else {
        selectedButton.classList.add('bg-red-500');   // Change the button color to red for incorrect answer
    }

    // Disable all answer buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;                       // Disable all buttons once an answer is selected
        if (button.dataset.correct) {
            button.classList.add('bg-green-500');     // Highlight the correct answer
        }
    });

    nextButton.classList.remove('hidden');            // Show the 'Next' button to proceed
}

// Function to load the next question
function showNextQuestion() {
    currentQuestionIndex++;                           // Move to the next question
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();                               // Display the next question
    } else {
        showScore();                                  // Show the final score if quiz is over
    }
}

// Function to display the final score
function showScore() {
    resetState();                                     // Clear out the last question's state
    questionElement.textContent = `You scored ${score} out of ${quizQuestions.length}!`; // Display score
    scoreElement.textContent = `Your Final Score: ${score}`;  // Show the score in the score element
    scoreElement.classList.remove('hidden');          // Unhide the score element
    nextButton.textContent = 'Restart';               // Change 'Next' button text to 'Restart'
    nextButton.classList.remove('hidden');            // Show the 'Restart' button
}

// Function to handle restarting the quiz
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length) {
        showNextQuestion();                           // Proceed to the next question
    } else {
        startQuiz();                                  // Restart the quiz if it's over
    }
});

// Start the quiz when the page loads
startQuiz();
