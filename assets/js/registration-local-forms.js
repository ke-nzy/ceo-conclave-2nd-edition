const localFormScriptURL = 'https://script.google.com/macros/s/AKfycbwvGd61sEXzE5h9bx6WYlXtV0s2bd50JG0xJqwVjshljnanOzQhFf4pNVTFGk1xbyM/exec';
const localForm = document.getElementById('localForm');
const localSubmitButton = document.getElementById('submitButtonLocal');
const localSpinner = document.getElementById('spinnerLocal');
const localButtonText = document.getElementById('buttonTextLocal');

localForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateLocalForm()) {
        return;
    }

    const formData = new FormData(localForm);
    const data = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
        if (key === 'Select Ticket Type') {
            data[key] = value;
        } else if (key === 'Additional Options[]') {
            if (!data[key]) {
                data[key] = [];  // Initialize as an array if not already
            }
            data[key].push(value);  // Push each value to the array
        } else {
            data[key] = value;
        }
    });

    // console.log('Form Data:', data); 

    // Disable submit button and show spinner
    localSubmitButton.disabled = true;
    localSpinner.style.display = 'inline-block';
    localButtonText.style.display = 'none';

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

    fetch(localFormScriptURL, {
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
            showLocalNotification('Success! Your message has been sent.', 'success');
            localForm.reset();
        } else {
            showLocalNotification('Error! Something went wrong, please try again later');
        }
        localSubmitButton.disabled = false; 
        localSpinner.style.display = 'none'; 
        localButtonText.style.display = 'inline'; 
    })
    .catch(error => {
        console.error('Error sending data:', error); 
        showLocalNotification('Network error! please try again.');
        localSubmitButton.disabled = false;
        localSpinner.style.display = 'none';
        localButtonText.style.display = 'inline';
    });
});

function validateLocalForm() {
    let isValid = true;

    document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');

    const email = document.getElementById('emailLocal');
    if (!validateEmail(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    const fullName = document.getElementById('fullNameLocal');
    if (fullName.value.trim() === '') {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    }

    const phone = document.getElementById('phoneLocal');
    if (phone.value.trim() === '') {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    const jobTitle = document.getElementById('jobTitleLocal');
    if (jobTitle.value === '') {
        document.getElementById('jobTitleError').style.display = 'block';
        isValid = false;
    }

    const company = document.getElementById('companyLocal');
    if (company.value === '') {
        document.getElementById('companyError').style.display = 'block';
        isValid = false;
    }

    const county = document.getElementById('countyLocal');
    if (county.value === '') {
        document.getElementById('countyError').style.display = 'block';
        isValid = false;
    }

    const ticketType = document.getElementById('ticketTypeDropdown');
    if (ticketType.value === '') {
        document.getElementById('ticketTypeError').style.display = 'block';
        isValid = false;
    }

    const paymentMethod = document.querySelector('input[name="Select payment method"]:checked');
    if (!paymentMethod) {
        document.getElementById('paymentMethodError').style.display = 'block';
        isValid = false;
    }

    const attendees = document.querySelector('input[name="Number of attendees"]:checked');
    if (!attendees) {
        document.getElementById('attendeesError').style.display = 'block';
        isValid = false;
    }

    const eventSource = document.querySelector('input[name="How did you get to hear about the event?"]:checked');
    if (!eventSource) {
        document.getElementById('knowEventError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showLocalNotification(message, type) {
    const localNotification = document.getElementById('notificationLocal');
    localNotification.textContent = message;
    localNotification.style.display = 'block';
    localNotification.style.color = type === 'success' ? '#CFBC76' : 'red';
    setTimeout(() => {
        localNotification.style.display = 'none';
    }, 5000);
}

// Event listener to show/hide extra items section based on ticket type dropdown selection
document.addEventListener('DOMContentLoaded', function () {
    const ticketTypeDropdown = document.getElementById('ticketTypeDropdown');
    const extraItemsSection = document.getElementById('extraItemsSection');

    ticketTypeDropdown.addEventListener('change', function () {
        if (ticketTypeDropdown.value === "Coming To Network & Learn - Kshs. 10,000 (1pax)" ||
            ticketTypeDropdown.value === "Add 1 Extra Person - Kshs. 9,000" ||
            ticketTypeDropdown.value === "Add 1 Rollup Banner - Kshs10,000 +KShs. 5,000 (1pax)" ||
            ticketTypeDropdown.value === "1 pax + 1 min commercial video - Ksh. 35000" ||
            ticketTypeDropdown.value === "Exhibition Table - KShs. 25,000") {
            extraItemsSection.style.display = 'block';
        } else {
            extraItemsSection.style.display = 'none';
        }
    });
});




