<?php

$servername = "localhost";

$username = "hw15";

$password = "Printer12";

$dbname = "hw15";



// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



// Execute the query

$sql = "SELECT E.firstName, E.lastName, O.city, O.state, O.country FROM employees as E, offices as O where E.officeCode = O.officeCode";

$result = $conn->query($sql);



// go over the results

if ($result->num_rows > 0) {

    echo "<table>
            <tr><th></th><th>Last</th><th>First</th><th>City</th><th>State</th><th>Country</th></tr>";

    $k = 0;

    while ($row = $result->fetch_assoc()) {

        echo '<tr>';

        echo '<td>' . ++$k . ')</td>';

        foreach (['lastName', 'firstName', 'city', 'state', 'country'] as $key) {

            echo '<td>' . $row[$key] . '</td>';
        }

        echo '</tr>';
    }

    echo '</table>';
} else {

    echo "0 results";
}

// New employee button
echo '
    <form action="add_employee.php" method="get" style="margin-top: 20px;">
        <button type="submit">Add New Employee</button>
    </form>
    ';


$conn->close();

?>
