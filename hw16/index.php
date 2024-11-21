<?php
// include_once("../../php/hw16/db_secrets") ;
$servername = "localhost";
$username = "hw16";
$password = "**************";
$dbname = "hw16";
function open_page($title)
{
    echo <<<EOS
<!DOCTYPE html>
<html>
<head>
<link rel="icon" href="data:,">
<title>Dr.Z -- $title page</title>
</head>
<body>
EOS;
}
function close_page()
{
    echo '</body></html>';
}
function generateHomePage()
{ ?>
    <form method="get">
        <input type="hidden" name="mode" value="customer" />
        <label for="customer">Choose a customer:</label>
        <select name="customer">
            <option value="">--Select a Customer--</option>
            <option value="242">Alpha Cognac</option>
            <option value="168">American Souvenirs Inc</option>
            <option value="249">Amica Models & Co.</option>
        </select>
        <input type="submit" name="submit" value="go" />
    </form>
<?php
}
function generateCustomerPage()
{
    echo "Welcome to customer's page";
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
