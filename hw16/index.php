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
<link rel="stylesheet" type="text/css" href="styles/styles.css">
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

function displayOrderDetails($orderID)
{
    global $conn;

    // Query to fetch order details
    $sql = sprintf(
        "SELECT * FROM `orders` WHERE `orderNumber` = '%s'",
        $conn->real_escape_string($orderID)
    );

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $order = $result->fetch_assoc();

        // Display Order Details
        echo "<h3>Order Details</h3>";
        echo "<table border='1'>";
        foreach ($order as $key => $value) {
            echo "<tr><th>" . htmlspecialchars($key) . "</th><td>" . htmlspecialchars($value) . "</td></tr>";
        }
        echo "</table>";

        // Fetch order line items
        $sql = sprintf(
            "SELECT productCode, quantityOrdered, priceEach, orderLineNumber 
             FROM `orderdetails` WHERE `orderNumber`='%s'",
            $conn->real_escape_string($orderID)
        );

        $lineResult = $conn->query($sql);

        if ($lineResult && $lineResult->num_rows > 0) {
            echo "<h3>Order Line Items</h3>";
            echo "<table border='1'>";
            echo "<tr>
                    <th>Product Code</th>
                    <th>Quantity Ordered</th>
                    <th>Price Each</th>
                    <th>Order Line Number</th>
                  </tr>";
            while ($line = $lineResult->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . htmlspecialchars($line['productCode']) . "</td>";
                echo "<td>" . htmlspecialchars($line['quantityOrdered']) . "</td>";
                echo "<td>$" . htmlspecialchars(number_format($line['priceEach'], 2)) . "</td>";
                echo "<td>" . htmlspecialchars($line['orderLineNumber']) . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No line items found for this order.</p>";
        }
    } else {
        echo "<p>No details found for the selected order.</p>";
    }
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
        echo "<input type='hidden' name='mode' value='customer' />"; // Stay on the same page
        echo "<input type='hidden' name='customer' value='" . htmlspecialchars($customerID) . "' />"; // Preserve customer ID
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

        // If an order is selected, display the details
        $selectedOrderID = $_GET['order'] ?? "";
        if ($selectedOrderID) {
            displayOrderDetails($selectedOrderID);
        }
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

function displayCustomerPayments($customerID)
{

    global $conn;

    $sql = sprintf(
        "SELECT checkNumber, paymentDate, amount FROM `payments` WHERE `customerNumber`='%s'",
        $conn->real_escape_string($customerID)
    );

    $result = $conn->query($sql);

    echo "<h2>Payment Summary</h2>";

    if ($result && $result->num_rows > 0) {
        echo "<table border='1'>";
        echo "<tr>
                <th>Check Number</th>
                <th>Payment Date</th>
                <th>Amount</th>
              </tr>";

        // Loop through results and display them in a table
        while ($payment = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($payment['checkNumber']) . "</td>";
            echo "<td>" . htmlspecialchars($payment['paymentDate']) . "</td>";
            echo "<td>" . htmlspecialchars($payment['amount']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No payments found for this customer.</p>";
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

    $selectedOrderID = $_GET['order'] ?? "";
    if ($selectedOrderID) {
        displayOrderDetails($selectedOrderID);
    }

    displayCustomerPayments($customerID);
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
