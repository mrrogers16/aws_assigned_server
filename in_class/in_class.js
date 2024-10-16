
// Initialize random number to start with
let number = Math.floor(Math.random() * 1000);

// Function to update the display
// Initialize random number to start with
let number = Math.floor(Math.random() * 1000);

// Function to update the display with animated digits
function updateDisplay() 
{
    const display = document.getElementById('display');
    const oldDigits = number.toString().split('');
    const newDigits = number.toString().split('');

    // Clear previous digits
    display.innerHTML = '';

    // Create digit cells for new number
    newDigits.forEach((digit) => 
    {
        const digitCell = document.createElement('div');
        digitCell.classList.add('digit-cell');

        // Create the digit element
        const newDigit = document.createElement('div');
        newDigit.classList.add('digit');
        newDigit.innerText = digit;

        // Animate the digit sliding in
        newDigit.classList.add('slide-in');
        setTimeout(() => 
        {
            newDigit.classList.remove('slide-in');
        }, 500);

        digitCell.appendChild(newDigit);
        display.appendChild(digitCell);
    });
}

// Function to generate a random number
function randomNumber() {
    number = Math.floor(Math.random() * 1000); 
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
    number = Math.floor(number)
    updateDisplay();
}

// Function to divide by 9
function divideByNine() {
    number /= 9;
    number = Math.floor(number)
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
