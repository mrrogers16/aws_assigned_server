
// Initialize random number to start with
// let number = Math.floor(Math.random() * 1000);

class NumberDisplay {
    constructor() {
        this.number = Math.floor(Math.random() * 1000);
    }

    // Function to update the display, placing each digit in its own cell
    updateDisplay() {
        const display = document.getElementById('display');
        display.innerHTML = '';  // Clear the previous content

        const digits = this.number.toString().split('');

        // Loop through each digit and create a div for it
        digits.forEach(digit => {
            const digitCell = document.createElement('div');  // Create a div for each digit
            digitCell.classList.add('digit-cell');  // Add a class for styling the cell
            digitCell.innerText = digit;  // Set the text inside the cell to the digit
            display.appendChild(digitCell);  // Append the cell to the display div
        });
    }

    randomNumber() {
        this.number = Math.floor(Math.random() * 1000);
        this.updateDisplay();
    }

    addOne() {
        this.number += 1;
        this.updateDisplay();
    }

    multiplyByEleven() {
        this.number *= 11;
        this.number = Math.floor(number)
        this.updateDisplay();
    }

    divideByNine() {
        this.number /= 9;
        this.number = Math.floor(number)
        this.updateDisplay();
    }

    createButtons() {
        const controlsDiv = document.getElementById('controls');
    
        const buttons = [
            { text: 'Random', action: this.randomNumber.bind(this) },
            { text: '+1', action: this.addOne.bind(this) },
            { text: 'x 11', action: this.multiplyByEleven.bind(this) },
            { text: '/ 9', action: this.divideByNine.bind(this) }
        ];
    
        buttons.forEach(btnInfo => {
            const button = document.createElement('button');
            button.innerText = btnInfo.text;
            button.addEventListener('click', btnInfo.action);
            controlsDiv.appendChild(button);
        });
    }

    init() {
        this.updateDisplay();
        this.createButtons();
    }
}

// Run init when the window loads
const numberDisplay = new NumberDisplay();
window.onload = () => numberDisplay.init();
