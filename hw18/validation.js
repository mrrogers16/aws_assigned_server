// validation.js

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    let isValid = true;
    let messages = [];

    // First name validation
    const firstName = document.getElementById('firstName').value.trim();
    if (!/^[a-zA-Z'-]{2,}$/.test(firstName)) {
        isValid = false;
        messages.push('First name must be at least 2 characters long and contain only letters, hyphens, or apostrophes.');
    }

    // Last name validation 
    const lastName = document.getElementById('lastName').value.trim();
    if (!/^[a-zA-Z'-]{2,}$/.test(lastName)) {
        isValid = false;
        messages.push('Last name must be at least 2 characters long and contain only letters, hyphens, or apostrophes.');
    }

    // Job Title validation
    const jobTitle = document.getElementById('jobTitle').value.trim();
    if (!/^[a-zA-Z0-9-]{4,}$/.test(jobTitle)) {
        isValid = false;
        messages.push('Job title must be at least 4 characters long and contain only letters, hyphens, or apostrophes.');
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    // Regex expression provided by OpenAi's ChatGPT Dec 1, 2024
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        isValid = false;
        messages.push('Please enter a valid email address.');
    }

    if (!isValid) {
        event.preventDefault();
        alert(messages.join('\n'));
    }

});

// AJAX email validation
document.getElementById('email').addEventListener('input', function () {
    const email = this.value.trim();
    const emailError = document.getElementById('emailError');

    // Clear prev error
    emailError.textContent = '';

    // Only send request if email is not empty
    if (email) {
        fetch(`validate_email.php?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    // Email already exists
                    emailError.textContent = 'This email is already in use. Please enter a different email.';
                    this.value = ''; // clear data
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occured while validating the email.');
            });
    }
});