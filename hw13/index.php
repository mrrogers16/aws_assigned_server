<?php

// Handle Parameters
function getParameter($name, $default = 100)
{
    return isset($_GET[$name]) ? (int)$_GET[$name] : $default;
}

function generateOddNumbers($count)
{
    $odds = [];
    for ($i = 1; count($odds) < $count; $i += 2) {
        $odds[] = $i;
    }
    return $odds;
}

// Generate Fib
function generateFibNumbers($count)
{
    $fibo = [1, 1]; //first 2 fib numbers to get us started 
    // Calculate next fib number at fibo[2].
    for ($i = 2; $i < $count; $i++) {
        //each new fib number is the sum of the previous two 
        $fibo[] = $fibo[$i - 1] + $fibo[$i - 2];
    }
    return $fibo;
}

// Generate Prime
function generatePrimeNumbers($limit)
{
    $primes = []; // empty array to store primes

    // loop to check if number is prime from 2 - 99. 1 is not a prime so we skip
    for ($i = 2; $i <= $limit; $i++) {
        $isPrime = true;
        // loop to check if i is divisible by any number between 2 and the sqrt of i
        // if numbers divisor is larger than its square root we have already found the smaller divisor
        for ($j = 2; $j <= sqrt($i); $j++) {
            if ($i % $j == 0) {
                $isPrime = false;
                break;
            }
        }
        // if the isPrime flag hasnt been set to false we add it to the primes array
        if ($isPrime) {
            $primes[] = $i;
        }
    }
    return $primes;
}

function formatOutput($arr)
{
    if (count($arr) > 1) {
        $last = array_pop($arr);
        return implode(", ", $arr) . ", and " . $last . ".";
    }
    return implode(", ", $arr);
}

function generateHtmlDocument()
{
    // Fetch parameters
    $odd_count = getParameter('o');
    $fibonacci_count = getParameter('f');
    $prime_limit = getParameter('p');

    // Echo out html document
    echo "<!DOCTYPE html> \n";
    echo "<html>\n";
    echo "<head>\n";
    echo "<title>PHP Assignment - Numbers</title>\n";
    echo "</head>\n";
    echo "<body>\n";
    echo "<h1> PHP Assignment - Dynamic Number Generator</h1>\n";

    // Generate Odd numbers
    echo "<h2>First $odd_count Odd Numbers</h2>\n";
    $odd_numbers = generateOddNumbers($odd_count);
    echo "<p>" . formatOutput($odd_numbers) . "</p>\n";

    // Generate Fibonacci numbers
    echo "<h2>First $fibonacci_count Fibonacci Numbers</h2>\n";
    $fib_numbers = generateFibNumbers($fibonacci_count);
    echo "<p>" . formatOutput($fib_numbers) . "</p>\n";

    // Generate Prime numbers
    echo "<h2>First $prime_limit Prime Numbers</h2>\n";
    $prime_numbers = generatePrimeNumbers($prime_limit);
    echo "<p>" . formatOutput($prime_numbers) . "</p>\n";

    // Show php code
    echo "<pre style='border:1px solid blue'>\n" . htmlspecialchars(file_get_contents(__FILE__)) . "\n</pre>\n";

    echo "</body>\n";
    echo "</html>";
}

// Run everything
generateHtmlDocument();
