<?php

// Start session 
session_start();

// Initialize programData for our global variable like hw07 in session if not already set
if (!isset($_SESSION['programData'])) {
    $_SESSION['programData'] = [];
}

// Function retrieves current data to display
// Concatinate using commas for now
// Come back later to handle the final 'and' case
function get_data() {
    return implode(', ', $_SESSION['programData']);
}

// Function to return the last command's result message for display
// Defaults to nothing yet if not set
function get_result() {
    return isset($_SESSION['statusMessage']) ? $_SESSION['statusMessage'] : "nothing yet";
}

// Helper function to set data and result message
function setData($msg, $data) {
    $_SESSION['programData'] = $data; // update programData with new Data
    $_SESSION['statusMessage'] = $msg; // Set the status message for display
}

// Helper function to populate an array
function populate($N, $fn) {
    // Init empty array 
    $result = [];
    // Loop to n calling fn(i) 
    for ($i = 0; $i < $N; $i++) {
        $result[] = $fn($i);
    }
    return $result;
}

// Generate 100 random numbers between 0 and 100
function mkRandom() {
    $randomData = populate(100, function() {
        return rand(0, 100);
    });
    setData('100 random numbers were generated.', $randomData);
}

// Make each element in programData an odd number by doubling and adding 1
function oddify() {
    $_SESSION['programData'] = array_map(function($n) {
        return $n * 2 + 1;
    }, $_SESSION['programData']);
    setData('data has been modified', $_SESSION['programData']);
}
// Increment all values in programData
function incr() {
    $_SESSION['programData'] = array_map(function($n) {
        return $n + 1;
    }, $_SESSION['programData']);
    setData('data has been incremented', $_SESSION['programData']);
}

// Check if all elements in programData are even
function allEven() {
    $isAllEven = true; // Assume all elements are even initially

    // Iterate through each element in programData
    foreach ($_SESSION['programData'] as $n) {
        // If any element is odd, set $isAllEven to false and break out of the loop
        if ($n % 2 !== 0) {
            $isAllEven = false;
            break;
        }
    }

    // Update session with result
    setData('allEven is ' . ($isAllEven ? 'true' : 'false'), $_SESSION['programData']);
}

// Check if all elements in programData are odd
function allOdd() {
    $isAllOdd = true; // Assume all elements are odd initially

    // Iterate through each element in programData
    foreach ($_SESSION['programData'] as $n) {
        // If any element is even, set $isAllOdd to false and break out of the loop
        if ($n % 2 === 0) {
            $isAllOdd = false;
            break;
        }
    }

    // Update session 
    setData('allOdd is ' . ($isAllOdd ? 'true' : 'false'), $_SESSION['programData']);
}


// Handle commands sent from the form
if (isset($_GET['command'])) {
    switch ($_GET['command']) {
        case 'Randomize':
            mkRandom();
            break;
        case 'Oddify':
            oddify();
            break;
        case 'isEven':
            allEven();
            break;
        case 'isOdd':
            allOdd();
            break;
        case 'incr':
            incr();
            break;
    }
}

// Optional debug output for session data
$debug = $_SESSION;

?>

<!DOCTYPE html>
<html>
<head>
    <title>Homework #14</title>
    <link rel="stylesheet" href="./hw14.css">
    <link rel="icon" href="data:,">
</head>
<body>

    <h2>Data</h2>
    <p class="screen" id="data"><?= htmlspecialchars(get_data()); ?></p>

    <h2>Result of last command</h2>
    <p class="screen" id="result"><?= htmlspecialchars(get_result()); ?></p>

    <h2>Controls</h2>
    <form method="get" action="">
        <input type="submit" name="command" value="Randomize"/>

        <input type="submit" name="command" value="Oddify"/>
        
        <input type="submit" name="command" value="isEven"/>
        
        <input type="submit" name="command" value="isOdd"/>

        <input type="submit" name="command" value="incr"/>
    </form>

    <code><pre><?= var_dump($debug); ?></pre></code>

</body>
</html>
