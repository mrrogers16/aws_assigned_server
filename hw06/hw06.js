"use strict";

function generateOddNumbers()
{
    let odds = []; // Init empty array to store odd numbers
    // Generate teh first 100 odd numbers
    for (let i = 1; odds.length < 100; i += 2)
    {
        odds.push(i);
    }
    // Find the <p> tag with id="odds" and display as text
    document.getElementById("odds").innerText = odds.join(", " + '.');
}

