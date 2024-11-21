<?php
// include_once("../../php/hw16/db_secrets") ;
$servername = "localhost";
$username = "hw16";
$password = "Printer12";
$dbname = "hw16";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection Failed: " - $conn->connect_error);
}

function open_page($title)
{
    echo <<<EOS
<!DOCTYPE html>
<html>
<head>
<link rel="icon" href="data:,">
<title>Mickey Clarke -- $title page</title>
</head>
<body>
EOS;
}

function close_page()
{
    echo '</body></html>';
}

function generateHomePage()
{
    global $conn; // Use the global connection established earlier

    // Query to fetch all customers
    $sql = "SELECT customerNumber, customerName FROM customers";
    $result = $conn->query($sql);

    // Handle if no customers are found 
    if (!$result || $result->num_rows === 0) {
        echo "No customers found in the database.";
        return;
    }

    // Generate the HTML for the page
?>
    <form method="get">
        <input type="hidden" name="mode" value="customer" />
        <label for="customer">Choose a customer:</label>
        <select name="customer">
            <option value="">--Select a Customer--</option>
            <?php
            // Loop through each row and create an option in the select menu
            while ($row = $result->fetch_assoc()) {
                $customerNumber = htmlspecialchars($row['customerNumber']);
                $customerName = htmlspecialchars($row['customerName']);
                echo "<option value=\"$customerNumber\">$customerName</option>";
            }
            ?>
        </select>
        <input type="submit" name="submit" value="go" />
    </form>
<?php
}

function generateCustomerPage()
{
    global $conn;

    $customerID = $_POST['customer'] ?? $_GET['customer'] ?? "";

    if (!$customerID) {

        return generateHomePage();
    }

    $sql = sprintf("select * from `customers` where `customerNumber`='%s'", $conn->real_escape_string($customerID));

    $result = $conn->query($sql);

    if (!$result->num_rows) {
        return generateHomePage();
    }

    $customer = $result->fetch_assoc();

    //Display customer details
    echo "<h2>Customer Details</h2>";
    echo "<table border='1'";
    foreach ($customer as $key => $value) {
        echo "<tr><th>" . htmlspecialchars($key) . "</th><td>" . htmlspecialchars($value) . "</td></tr>";
    }
    echo "</table>";
}



$router = [
    "home" => 'generateHomePage',
    "customer" => 'generateCustomerPage',
];
$MODE = $_POST['mode'] ?? $_GET['mode'] ?? 'home';
if (!array_key_exists($MODE, $router)) $MODE = "home";
open_page($MODE);
$router[$MODE]();
close_page();
