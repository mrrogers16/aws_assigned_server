
// Initialize random number to start with
let number = Math.floor(Math.random() * 1000);

// Function to update the display with animated digits
function updateDisplay(oldNumber, newNumber) 
{
    const display = document.getElementById('display');
    const oldDigits = oldNumber.toString().padStart(4, '0').split('');  // Pad to handle leading zeros
    const newDigits = newNumber.toString().padStart(4, '0').split('');

    // Create digit cells or reuse existing ones
    for (let i = 0; i < newDigits.length; i++) 
    {
        let digitCell = display.children[i];

        if (!digitCell) {
            // If there are no existing digit cells, create new ones
            digitCell = document.createElement('div');
            digitCell.classList.add('digit-cell');
            const digit = document.createElement('div');
            digit.classList.add('digit');
            digitCell.appendChild(digit);
            display.appendChild(digitCell);
        }

        const currentDigit = digitCell.querySelector('.digit');
        
        // If the digit changed, animate it
        if (oldDigits[i] !== newDigits[i]) 
        {
            currentDigit.classList.add('slide-out');
            
            setTimeout(() => 
            {
                currentDigit.innerText = newDigits[i];
                currentDigit.classList.remove('slide-out');
                currentDigit.classList.add('slide-in');
                setTimeout(() => {
                    currentDigit.classList.remove('slide-in');
                }, 500);
            }, 500);
        }
    }
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
