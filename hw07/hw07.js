let programData = []; // Global variable to hold data's current state 

function populate(N, fn) {
    // Create array of size N
    let pop_array = new Array(N) // initialize array of size N
    // Apply the passed in function (fn) to each index
    for (let i = 0; i < pop_array.length; i++) {
        pop_array[i] = fn(i); // Call fn with current index
    }
    // return populated array
    return pop_array;
}

function setData(msg, data) {
    programData = data; // 

    // Find 'data' and 'result' elements for updating
    let dataElement = document.getElementById("data");
    let resultElement = document.getElementById("result");

    // Convert to string and display 'Data'
    dataElement.innerText = data.join(' ');
    // Display msg in result element
    resultElement.innerText = msg;
    // Defined
    return data;
}

function mkRandom() {
    // Generate 100 random numbers between 0-100
    let randomData = populate(100, (n) => Math.floor(Math.random() * 101));
    setData('100 random numbers were generated.', randomData);
}

function incr() {
    // Increment each value by one
    programData = programData.map((n) => n + 1)
    setData('data has been incremented', programData);
}

function oddify() {
    programData = programData.map((n) => n * 2 + 1);
    setData('data has been modified', programData);
}

function allEven() {
    let isAllEven = programData.every((n) => n % 2 === 0);
    setData('allEven is ' + isAllEven, programData);
}

function allOdd() {
    let isAllOdd = programData.every((n) => n % 2 !== 0);
    setData('allOdd is ' + isAllOdd, programData);
}

function hasDozen() {
    let multiple = programData.find((n) => n % 12 === 0);
    if (multiple !== undefined) {
        setData('found ' + multiple, programData);
    }
    else {
        setData('no multiple of 12', programData);
    }
}

function skipRemove() {
    programData = programData.filter((_, n) => n % 2 === 0);
    setData('data has been skip/removed', programData);
}
