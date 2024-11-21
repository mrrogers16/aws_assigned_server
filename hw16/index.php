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

function getCustomerDetails($customerID)
{
    global $conn;

    $sql = sprintf(
        "SELECT * FROM `customers` WHERE `customerNumber`='%s'",
        $conn->real_escape_string($customerID)
    );
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return null;
}

function displayCustomerDetails($customer)
{
    echo "<h2>Customer Details</h2>";
    echo "<table border='1'>";
    foreach ($customer as $key => $value) {
        echo "<tr><th>" . htmlspecialchars($key) . "</th><td>" . htmlspecialchars($value) . "</td></tr>";
    }
    echo "</table>";
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

function displayCustomerOrders($customerID)
{
    global $conn;

    $sql = sprintf(
        "SELECT orderNumber, status FROM `orders` WHERE `customerNumber`='%s'",
        $conn->real_escape_string($customerID)
    );
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        echo "<h2>Orders</h2>";
        echo "<form method='get'>";
        echo "<input type='hidden' name='mode' value='orderDetails' />";
        echo "<label for='order'>Select an order:</label>";
        echo "<select name='order'>";
        echo "<option value=''>--Select an Order--</option>";
        while ($row = $result->fetch_assoc()) {
            $orderNumber = htmlspecialchars($row['orderNumber']);
            $status = htmlspecialchars($row['status']);
            echo "<option value=\"$orderNumber\">Order #$orderNumber ($status)</option>";
        }
        echo "</select>";
        echo "<input type='submit' value='Go' />";
        echo "</form>";
    } else {
        echo "<p>No orders found for this customer.</p>";
    }
}


function displaySalesRepDetails($salesRepID)
{
    global $conn;

    if (!$salesRepID) {
        echo "<p>No sales representative assigned to this customer.</p>";
        return;
    }

    $sql = sprintf(
        "SELECT firstName, lastName, email, officeCode FROM `employees` WHERE `employeeNumber`='%s'",
        $conn->real_escape_string($salesRepID)
    );
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $salesRep = $result->fetch_assoc();

        echo "<h2>Sales Representative Details</h2>";
        echo "<table border='1'>";
        echo "<tr><th>Name</th><td>" . htmlspecialchars($salesRep['firstName']) . " " . htmlspecialchars($salesRep['lastName']) . "</td></tr>";
        echo "<tr><th>Email</th><td>" . htmlspecialchars($salesRep['email']) . "</td></tr>";
        echo "<tr><th>Office Code</th><td>" . htmlspecialchars($salesRep['officeCode']) . "</td></tr>";
        echo "</table>";
    } else {
        echo "<p>No sales representative details found.</p>";
    }
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

    $customer = getCustomerDetails($customerID);

    if (!$customer) {
        echo "<p>No customer found with ID: " . htmlspecialchars($customerID) . "</p>";
        return generateHomePage();
    }

    displayCustomerDetails($customer);

    displaySalesRepDetails($customer['salesRepEmployeeNumber']);

    displayCustomerOrders($customerID);
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
