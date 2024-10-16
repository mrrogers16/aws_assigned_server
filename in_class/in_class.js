
// Initialize random number to start with
let number = Math.floor(Math.random());

// Function to update the display
function updateDisplay() {
    document.getElementById('display').innerText = number;
}

// Function to generate a random number
function randomNumber() {
    number = Math.floor(Math.random()); 
    updateDisplay();
}

// Function to add 1
function addOne() {
    number += 1;
    updateDisplay();
}

// Function to multiply by 11
function multiplyByEleven() {
    number *= 11;
    updateDisplay();
}

// Function to divide by 9
function divideByNine() {
    number /= 9;
    updateDisplay();
}

function createButtons() {
    const controlsDiv = document.getElementById('controls');

    const buttons = [
        { text: 'Random', action: randomNumber },
        { text: '+1', action: addOne },
        { text: 'x 11', action: multiplyByEleven },
        { text: '/ 9', action: divideByNine}
    ];

    buttons.forEach(btnInfo => {
        const button = document.createElement('button');
        button.innerText = btnInfo.text;
        button.addEventListener('click', btnInfo.action);
        controlsDiv.appendChild(button);
    });
}

// Initialize the application
function init() {
    updateDisplay();
    createButtons();
}

// Run init when the window loads
window.onload = init;