const internationalFormScriptURL = 'https://script.google.com/macros/s/AKfycbyCL-HFwqk_XRpxVpRIjPgXSqBu9ksIxsEIko69pF8VewcxO4IKUncVOzTt1HiPljDKnA/exec';
const internationalForm = document.getElementById('internationalForm');
const internationalSubmitButton = document.getElementById('submitButtonInternational');
const internationalSpinner = document.getElementById('spinnerInternational');
const internationalButtonText = document.getElementById('buttonTextInternational');

internationalForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateInternationalForm()) {
        return;
    }

    const formData = new FormData(internationalForm);
    const data = {};

    formData.forEach((value, key) => {
        if (key === 'Select Package[]') {
            if (!data[key]) {
                data[key] = []; // Initialize as array if not already
            }
            data[key].push(value); // Push each value to the array
        } else {
            data[key] = value;
        }
    });

    // console.log('Form Data:', data); 

    internationalSubmitButton.disabled = true;
    internationalSpinner.style.display = 'inline-block';
    internationalButtonText.style.display = 'none';

    // Convert the data object to URLSearchParams
    const params = new URLSearchParams();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            params.append(key, JSON.stringify(data[key])); // Send arrays as JSON strings
        } else {
            params.append(key, data[key]);
        }
    }

    // console.log('Params:', params.toString()); 

    fetch(internationalFormScriptURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Response from server:', data); 
        if (data.status === 'success') {
            showInternationalNotification('Success! Your registration has been submitted.', 'success');
            internationalForm.reset();
        } else {
            showInternationalNotification('Error! Something went wrong, please try again later');
        }
        internationalSubmitButton.disabled = false; 
        internationalSpinner.style.display = 'none'; 
        internationalButtonText.style.display = 'inline'; 
    })
    .catch(error => {
        // console.error('Error sending data:', error); 
        showInternationalNotification('Network error! Please try again.');
        internationalSubmitButton.disabled = false;
        internationalSpinner.style.display = 'none';
        internationalButtonText.style.display = 'inline';
    });
});

function validateInternationalForm() {
    let isValid = true;

    document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');

    const email = document.getElementById('emailInternational');
    if (!validateEmail(email.value)) {
        document.getElementById('emailInternationalError').style.display = 'block';
        isValid = false;
    }

    const fullName = document.getElementById('fullNameInternational');
    if (fullName.value.trim() === '') {
        document.getElementById('fullNameInternationalError').style.display = 'block';
        isValid = false;
    }

    const phoneInternational = document.getElementById('phoneInternational');
    if (phoneInternational.value.trim() === '') {
        document.getElementById('phoneInternationalError').style.display = 'block';
        isValid = false;
    }

    const jobTitle = document.getElementById('jobTitleInternational');
    if (jobTitle.value.trim() === '') {
        document.getElementById('jobTitleInternationalError').style.display = 'block';
        isValid = false;
    }

    const company = document.getElementById('companyInternational');
    if (company.value === '') {
        document.getElementById('companyInternationalError').style.display = 'block';
        isValid = false;
    }

    const country = document.getElementById('countryInternational');
    if (country.value === '') {
        document.getElementById('countryInternationalError').style.display = 'block';
        isValid = false;
    }

    const paymentMethod = document.querySelector('input[name="Select payment method"]:checked');
    if (!paymentMethod) {
        document.getElementById('internationalPaymentMethodError').style.display = 'block';
        isValid = false;
    }

    const attendees = document.querySelector('input[name="Number Of Attendees"]:checked');
    if (!attendees) {
        document.getElementById('internationalAttendeesError').style.display = 'block';
        isValid = false;
    }

    const selectedPackages = document.querySelectorAll('input[name="Select Package[]"]:checked');
    if (selectedPackages.length === 0) {
        document.getElementById('internationalPackageError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showInternationalNotification(message, type) {
    const internationalNotification = document.getElementById('notificationInternational');
    internationalNotification.textContent = message;
    internationalNotification.style.display = 'block';
    internationalNotification.style.color = type === 'success' ? '#CFBC76' : 'red';
    setTimeout(() => {
        internationalNotification.style.display = 'none';
    }, 5000);
}
