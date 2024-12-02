<?php
$servername = "localhost";
$username = "hw15";
$password = "Printer12";
$dbname = "hw15";

// Init variables
$errors = array();
$firstName = '';
$lastName = '';
$jobTitle = '';
$email = '';
$officeCode = '';

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize input data
    $firstName = trim($_POST['firstName'] ?? '');
    $lastName = trim($_POST['lastName'] ?? '');
    $jobTitle = trim($_POST['jobTitle'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $officeCode = trim($_POST['office'] ?? '');

    // Server side validation 
    // Validate first name
    if (strlen($firstName) < 2 || !preg_match("/^[a-zA-Z'-]+$/", $firstName)) {
        $errors[] = "First name must be at least 2 characters long and contain only letters, hyphens, or apostrophes.";
        $firstName = ''; // Clear input
    }

    // Validate last name
    if (strlen($lastName) < 2 || !preg_match("/^[a-zA-Z'-]+$/", $lastName)) {
        $errors[] = "Last name must be at least 2 characters long and contain only letters, hyphens, or apostrophes.";
        $lastName = ''; // Clear input
    }

    // Validate job title 
    if (strlen($jobTitle) < 4 || !preg_match("/^[a-zA-Z0-9-]+$/", $jobTitle)) {
        $errors[] = "Job title must be at least 4 characters long and contain only letters, hyphens, or numbers.";
        $jobTitle = ''; // Clear invalid input
    }

    // Check that job title is at least 6 characters
    if (strlen($jobTitle) < 6) {
        $errors[] = "Job title must be at least 6 characters long.";
        $jobTitle = ''; // Clear invalid input
    }

    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
        $email = ''; // Clear invalid input
    }

    // Check that email ends with .com
    if (!preg_match("/\.com$/", $email)) {
        $errors[] = "Email address must end with .com.";
        $email = ''; // Clear invalid input
    }

    // Validate office code
    if (empty($officeCode)) {
        $errors[] = "Please select an office.";
    }

    // If no errors, insert into database
    if (empty($errors)) {
        // Connect
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection 
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Random employeeNumber > 2000
        $employeeNumber = rand(2001, 9999);

        // Assign default values for extensions and reportsTo
        $extension = 'x' . rand(1000, 9999);
        $reportsTo = 2002;

        // INSERT statement 
        $statement = $conn->prepare("INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $statement->bind_param("issssis", $employeeNumber, $lastName, $firstName, $extension, $email, $officeCode, $reportsTo, $jobTitle);

        if ($statement->execute()) {
            // Redirect back to index.php to display updated employee list
            header("Location: index.php");
            exit();
        } else {
            $errors[] = "Error inserting data: " . $statement->error;
        }

        // Close statement and connection 
        $statement->close();
        $conn->close();
    }
}


// Fetch offices from the database

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT officeCode, city FROM offices";
$result = $conn->query($sql);

// Prepare office list
$officeList = "";
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $selected = ($row['officeCode'] == $officeCode) ? 'selected' : '';
        $officeList .= "<option value='" . htmlspecialchars($row['officeCode']) . "' $selected>" . htmlspecialchars($row['city']) . "</option>";
    }
} else {
    $officeList = "<option disabled>No offices available</option>";
}

$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
    <title>Add New Employee</title>
</head>

<body>
    <!--Show if error message-->
    <?php if (!empty($errors)): ?>
        <div style="color:red;">
            <h3>The form submission was rejected due to the following errors:</h3>
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?php echo htmlspecialchars($error); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>


    <h1>Add New Employee</h1>

    <form action="add_employee.php" method="post" id="employeeForm">
        <!-- First Name -->
        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" value="<?php echo htmlspecialchars($firstName); ?>" required>
        <br>

        <!--Last Name-->
        <label for="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" value="<?php echo htmlspecialchars($lastName); ?>" required>
        <br>

        <!--Job Title-->
        <label for="jobTitle">Job Title:</label>
        <input type="text" name="jobTitle" id="jobTitle" value="<?php echo htmlspecialchars($jobTitle); ?>" required>
        <br>

        <!--Email-->
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="<?php echo htmlspecialchars($email); ?>" required>
        <br>

        <!--Office-->
        <label for="office">Office:</label>
        <select name="office" id="office" required>
            <?php echo $officeList; ?>
        </select>
        <br><br>

        <!--Buttons-->
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
    </form>

    <!--Client Side Validation-->
    <script src="validation.js"></script>
</body>

</html>