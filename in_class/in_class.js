
// Initialize random number to start with
let number = Math.floor(Math.random() * 1000);

// Function to update the display, placing each digit in its own cell
function updateDisplay(newNumber) {
    const display = document.getElementById('display');
    display.innerHTML = '';  // Clear the previous content

    // Convert the number to a string and split it into individual digits
    if (isNaN(number)) {
        newNumber = 0;
    }
    const digits = newNumber.toString().split('');

    // Loop through each digit and create a div for it
    digits.forEach(digit => {
        const digitCell = document.createElement('div');  // Create a div for each digit
        digitCell.classList.add('digit-cell');  // Add a class for styling the cell
        digitCell.innerText = digit;  // Set the text inside the cell to the digit
        display.appendChild(digitCell);  // Append the cell to the display div
    });

    number = newNumber;  // Update the global number variable
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
