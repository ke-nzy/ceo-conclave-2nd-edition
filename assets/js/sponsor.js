const scriptURL = 'https://script.google.com/macros/s/AKfycbw0kLmWiw0GW25Oky3Q-2FDroDvpAa2d2G6Um1M4RzdgaMwneCS0hskTntKUij8n0pZBQ/exec';
const form = document.forms['sponsorForm'];
const notification = document.getElementById('notification');
const submitButton = document.getElementById('submitButton');
const spinner = document.getElementById('spinner');
const buttonText = document.getElementById('buttonText');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  submitButton.disabled = true; 
  spinner.style.display = 'inline-block'; 
  buttonText.style.display = 'none'; 

  fetch(scriptURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(form)) 
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      showNotification('Success! Your information has been submitted.', 'success');
      form.reset(); // Clear the form
    } else {
      showNotification('Error! ' + data.message, 'error');
    }
    submitButton.disabled = false; // Re-enable submit button
    spinner.style.display = 'none'; // Hide spinner
    buttonText.style.display = 'inline'; // Show button text
  })
  .catch(error => {
    showNotification('Error! ' + error.message, 'error');
    submitButton.disabled = false; 
    spinner.style.display = 'none'; 
    buttonText.style.display = 'inline'; 
  });
});

function validateForm() {
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');

  const firstName = document.getElementById('firstName');
  if (firstName.value.trim() === '') {
    document.getElementById('firstNameError').style.display = 'block';
    isValid = false;
  }

  const lastName = document.getElementById('LastName');
  if (lastName.value.trim() === '') {
    document.getElementById('lastNameError').style.display = 'block';
    isValid = false;
  }

  const email = document.getElementById('email');
  if (!validateEmail(email.value)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }

  const phone = document.getElementById('phone');
  if (phone.value.trim() === '') {
    document.getElementById('phoneError').style.display = 'block';
    isValid = false;
  }

  const jobTitle = document.getElementById('jobTitle');
  if (jobTitle.value.trim() === '') {
    document.getElementById('jobTitleError').style.display = 'block';
    isValid = false;
  }

  const company = document.getElementById('company');
  if (company.value.trim() === '') {
    document.getElementById('companyError').style.display = 'block';
    isValid = false;
  }

  const packageSelected = document.querySelector('input[name="Select your Preferred Sponsorship Package"]:checked');
  if (!packageSelected) {
    document.getElementById('packageError').style.display = 'block';
    isValid = false;
  }

  const contactMethodSelected = document.querySelector('input[name="Additional Information Medium"]:checked');
  if (!contactMethodSelected) {
    document.getElementById('contactMethodError').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type) {
  notification.textContent = message;
  notification.style.display = 'block';
  notification.style.color = type === 'success' ? '#CFBC76' : 'red';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}
