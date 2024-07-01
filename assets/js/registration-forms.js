const localFormScriptURL = 'https://script.google.com/macros/s/AKfycbyFTe_O-asqRganlyI8Wh3QSuJttMYgPBpkP697JulICGHNcBCeWFNtPo9egJQiifyt/exec';
const localForm = document.getElementById('localForm');
const localSubmitButton = document.getElementById('submitButtonLocal');
const localSpinner = document.getElementById('spinnerLocal');
const localButtonText = document.getElementById('buttonTextLocal');

localForm.addEventListener('submit', e => {
  e.preventDefault();

  // Validate form
  if (!validateLocalForm()) {
    return;
  }

  // Collect form data
  const formData = new FormData(localForm);

  // Create an object to hold the form data
  const data = {};
  formData.forEach((value, key) => {
    if (key === 'Select Ticket Type[]') {
      if (!data[key]) {
        data[key] = [];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  // Log form data to the console for debugging
  console.log('Form Data:', data);
  console.log('Select Ticket Type[]:', data['Select Ticket Type[]']);

  // Disable submit button and show spinner
  localSubmitButton.disabled = true;
  localSpinner.style.display = 'inline-block';
  localButtonText.style.display = 'none';

  // Convert the data object to URLSearchParams
  const params = new URLSearchParams();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach(value => {
        params.append(key, value);
      });
    } else {
      params.append(key, data[key]);
    }
  }

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
      if (data.status === 'success') {
        showLocalNotification('Success! Your message has been sent.', 'success');
        localForm.reset();
      } else {
        showLocalNotification('Error! Something went wrong, please try again later');
      }
      localSubmitButton.disabled = false; // Re-enable submit button
      localSpinner.style.display = 'none'; // Hide spinner
      localButtonText.style.display = 'inline'; // Show button text
    })
    .catch(error => {
      showLocalNotification('Network error! please try again.');
      localSubmitButton.disabled = false;
      localSpinner.style.display = 'none';
      localButtonText.style.display = 'inline';
    });
});

function validateLocalForm() {
  let isValid = true;

  // Clear previous error messages
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

  const ticketTypes = document.querySelectorAll('input[name="Select Ticket Type[]"]:checked');
  if (ticketTypes.length === 0) {
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
