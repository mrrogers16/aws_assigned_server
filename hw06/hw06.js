"use strict";


// Helper function for output formatting
function formatOutput(arr) {

    if (arr.length > 1) {
        let lastNumber = arr.pop(); // remove last element from array
        return arr.join(", ") + ", and " + lastNumber; // join everything before the last number with a comma ',' and the word 'and' at the end of the array.
    }
    return arr.join(", ") // in the case there is only 1 element
}

function generateOddNumbers() {
    console.log("generateOddNumbers is called") // debug line
    let odds = []; // Init empty array to store odd numbers
    // Generate teh first 100 odd numbers
    for (let i = 1; odds.length < 100; i += 2) {
        odds.push(i);
    }

    // Find the <p> tag with id="odds" and display as text
    document.getElementById("odds").innerText = formatOutput(odds) + '.';
    // Call funtion
    generateOddNumbers();

    function generateFibNumbers() {
        console.log("generateFibNumbers is called") // debug line
        let fibo = [0, 1]; //first 2 fib numbers to get us started 
        // Calculate next fib number at fib[2]. First 10 fibs = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
        for (let i = 2; i < 100; i++) {
            //each new fib number is the sum of the previous two 
            fibo[i] = fibo[i - 1] + fibo[i - 2];
        }
        // Find <p> tag with id="fibo" and display as text
        document.getElementById("fibo").innerText = fibo.join(", ");
    }
}


function generatePrimeNumbers() {
    console.log("generatePrimeNumbers was called") // debug line
    let primes = [] // empty array to store primes

    // loop to check if number is prime from 2 - 99. 1 is not a prime so we skip
    for (let i = 2; i < 100; i++) {
        // assume number is prime
        let isPrime = true;
        // loop to check if i is divisible by any number between 2 and the sqrt of i
        // if numbers divisor is larger than its square root we have already found the smaller divisor
        for (let j = 2; j <= Math.sqrt(i); j++) {
            // if i and j are divisible isPrime = false
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        // if the isPrime flag hasnt been set to false we add it to the primes array
        if (isPrime) {
            primes.push(i);
        }
    }
    // find the <p> tag with id="primes" and display as text 
    document.getElementById("primes").innerText = primes.join(", ");
}

generateOddNumbers();
generateFibNumbers();
generatePrimeNumbers();