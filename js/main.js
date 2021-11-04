// Questions Array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    {question: 'Create a Password', type: 'password'}
]

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

//Init Position At first Question
let position = 0

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const  nextBtn = document.querySelector('#next-btn');
const  prevBtn = document.querySelector('#prev-btn');
const  inputGroup = document.querySelector('#input-group');
const  inputField = document.querySelector('#input-field');
const  inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

//Get Questionn on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion)

//Next Button Click
nextBtn.addEventListener('click', validate)
inputField.addEventListener('keyup', enterKey)

// Functions

// Input Field enter click
function enterKey(e) {
    if (e.key === 'Enter') {
        validate();
    }
}

// Back Button function
prevBtn.addEventListener('click', goBack)

function goBack() {
    inputLabel.innerHTML = questions[position - 1]
    console.log('go back button')
}

// Get Question From Array & Add to Markup
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus on Element
    inputField.focus();

    //Set Progress Bar Width - Variable to the questions length
    progress.style.width =`${(position * 100) / questions.length}%`;

    //Add User Icon OR Back Arrow Depending On Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

//Display Question To User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// Hide Question From User 
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 0;
    inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y){
    formBox.style.transform = `translate(${x}px, ${y}px)`;
    console.log(x, y)
}

function validate() {
    // Make sure pattern matches if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        (inputFail());
    } else {
        inputPass();
    }
}

// Field Input Fail
function inputFail() {
    formBox.className = 'error';
    //  Repeat shake motion - set i to number of shakes
    for(let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
    }
}

// Field input passed
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store Answer In Array
    questions[position].answer = inputField.value;

    // Increment Postion
    position++;

    // If new question, hide current and get next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form Complete
        FormComplete();
    }
}

// All Fields Complete - show h1 end
function FormComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and you will get an email shortly`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}
