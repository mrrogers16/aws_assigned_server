

class ContactForm {
    constructor(formId, validationMessageId) {
        this.contactForm = document.getElementById(formId);
        this.validationMessage = document.getElementById(validationMessageId);
        this.emailField = document.getElementById("email-address");
        this.phoneField = document.getElementById("phone-number");

        this.initializeForm();
    }

    // Initialize form by setting default values and event listeners
    initializeForm() {
        this.setInitialContactMethod();
        this.setupContactMethodToggle();
        this.setupFormValidation();
    }

    // Set contact method initial state
    setInitialContactMethod() {
        // Set email as default contact method
        this.toggleContactFields('Email');
    }

    toggleContactFields(contactMethod) {
        if (contactMethod === "Email") {
            this.emailField.disabled = false;
            this.phoneField.disabled = true;
        }
        else {
            this.emailField.disabled = true;
            this.phoneField.disabled = false;
        }
    }

    setupFormValidation() {
        this.contactForm.addEventListener("submit", (event) => {
            const invalidFields = this.validateForm();
            this.displayValidationMessage(invalidFields, event);
        });
    }

    getSelectedContactMethod() {
        return document.querySelector("input[name='contact_method']:checked").value;
    }

    setupContactMethodToggle() {
        const contactMethods = document.getElementsByName('contact_method');
        contactMethods.forEach((radio) => {
            radio.addEventListener('change', (event) => {
                this.toggleContactFields(event.target.value);
            });
        });

    }

    setFieldInvalid(fieldName) {
        const field = this.contactForm[fieldName];
        field.style.borderColor = 'red';
    }

    setFieldValid(fieldName) {
        const field = this.contactForm[fieldName];
        field.style.borderColor = 'green';
    }

    isValidName(name) {
        const nameRegex = /^[A-za-z'-]{2,}$/;
        return nameRegex.test(name.trim());
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    isValidPhoneNumber(phone) {
        const phoneRegex = /^\(\d{3}\) \d{3}=\d{4}$/;
        return phoneRegex.test(phone.trim());
    }

    validateForm() {
        const invalidFields = [];
        // First Name
        if (!this.isValidName(this.contactForm.[first_name].value)) {
            invalidFields.push('First Name');
            this.setFieldInvalid('first-name');
        }
        else {
            this.setFieldValid('first-name');
        }
        // Last Name
        if (!this.isValidName(this.contactForm.[last_name].value)) {
            invalidFields.push('Last Name');
            this.setFieldInvalid('last-name');
        }
        else {
            this.setFieldValid('last-name');
        }
        // Password
        // TODO Come back and ensure field is not empty for everything
        if (!this.contactForm['password'].value) {
            invalidFields.push('Password');
            this.setFieldInvalid('password');
        }
        else {
            this.setFieldValid('password');
        }

        const contactMethod = this.getSelectedContactMethod();
        // Email
        if (contactMethod === 'Email') {
            if(!this.isValidEmail(this.emailField.value)) {
                invalidFields.push('Email');
                this.setFieldInvalid('email-address');
            } else {
                this.setFieldValid('email-address');
            }
        }

        // Phone Number
        if (contactMethod === 'Voice' || contactMethod === 'SMS') {
            if(!this.isValidPhoneNumber(this.phoneField.value)) {
                invalidFields.push('Phone Number');
                this.setFieldInvalid('phone-number');
            } else {
                this.setFieldValid('phone-number');
            }
        }

        // Message validation
        if (!this.contactForm['message'].value.trim()) {
            invalidFields.push('Message');
            this.setFieldInvalid('message');
        } else {
            this.setFieldValid('message');
        }
        return invalidFields;
    }

    displayValidationMessage() {
        if (invalidFields.length > 0) {
            event.preventDefault(); // Prevent form submission
            this.validationMessage.innerHTML = 'Please correct the following fields: ' + invalidFields.join(', ');
            this.validationMessage.style.color = 'red';
        } else {
            // Clear the validation message if successful 
            this.validationMessage.innerHTML = '';
        }
    }







}