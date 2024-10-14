
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
        this.helloDiv.id = 'helloDiv';
        this.helloDiv.innerText = 'Hello, World!';
        document.body.appendChild(this.helloDiv);

        // #button-container div
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.id = 'buttonContainer';
        document.body.appendChild(this.buttonContainer);
    }
}




function main() {

    // First div displaying "Hello, World!"

}