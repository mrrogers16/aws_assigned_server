
window.addEventListener('load', function () {

    console.log('Everything is now loaded');

    const app = new ColorApp();
    app.init();

});

class ColorApp {

    constructor() {
        this.N = 0; // number of segments
        this.helloDiv = null; // hello-world div reference
        this.buttonContainer = null; // button-container div reference 
    }

    // init method
    init() {
        this.promptForN();
        this.createDivs();
        this.generateColorButtons();
    }

    // method to prompt the user for N
    promptForN() {
        const input = prompt('Enter the value of N');
        this.N = parseInt(input); // convert input string to int

        // Ensure input is a positive integer
        if (isNaN(this.N) || this.N <= 0) {
            alert('Please enter a valid positive integer.');
            this.promptForN(); // prompt user again
        }
    }

    // method to create both divs
    createDivs() {

        // #hello-world div
        this.helloDiv = document.createElement('div');
        this.helloDiv.id = 'helloContainer';
        this.helloDiv.innerText = 'Hello, World!';
        document.body.appendChild(this.helloDiv);

        // #button-container div
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.id = 'buttonContainer';
        document.body.appendChild(this.buttonContainer);
    }

    generateColorButtons() {

        const N = this.N;
        const step = 255 / (N - 1);
        const colorValues = [];

        // Generate color values
        for (let i = 0; i < N; i++) {
            colorValues.push(Math.round(i * step));
        }

        // Generate buttons
        for (let r = 0; r < N; r++) {
            for (let g = 0; g < N; g++) {
                for (let b = 0; b < N; b++) {
                    const red = colorValues[r];
                    const green = colorValues[g];
                    const blue = colorValues[b];

                    // Convert to hexadecimal
                    const redHex = ('00' + red.toString(16)).slice(-2);
                    const greenHex = ('00' + green.toString(16)).slice(-2);
                    const blueHex = ('00' + blue.toString(16)).slice(-2);

                    const colorCode = "#" + redHex + greenHex + blueHex;

                    // Create our buttons
                    const colorButton = document.createElement('button');
                    colorButton.className = 'colorButton';
                    colorButton.style.backgroundColor = colorCode;

                    // Event Listener
                    colorButton.addEventListener('click', () => {
                        this.helloDiv.style.backgroundColor = colorCode;
                    });

                    // Append button
                    this.buttonContainer.appendChild(colorButton);
                }
            }
        }
    }
}




function main() {

    // First div displaying "Hello, World!"

}