const contactFormScriptURL = 'https://script.google.com/macros/s/AKfycbwJyWdQTtHBMxyYokWaTUeX76hlZMVZTIWSy3lWAgasrcddC3QHW1UfajVehk_bqH44yg/exec';
const contactForm = document.getElementById('contactForm');
const contactNotification = document.getElementById('contactNotification');
const contactSubmitButton = document.getElementById('contactSubmitButton');
const contactSpinner = document.getElementById('contactSpinner');
const contactButtonText = document.getElementById('contactButtonText');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Validate form
  if (!validateContactForm()) {
    return;
  }

  contactSubmitButton.disabled = true; // Disable submit button
  contactSpinner.style.display = 'inline-block'; // Show spinner
  contactButtonText.style.display = 'none'; // Hide button text

  fetch(contactFormScriptURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(contactForm))
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      showContactNotification('Success! Your message has been sent.', 'success');
      contactForm.reset(); // Clear the form
    } else {
      showContactNotification('Error! ' + data.message, 'error');
    }
    contactSubmitButton.disabled = false; // Re-enable submit button
    contactSpinner.style.display = 'none'; // Hide spinner
    contactButtonText.style.display = 'inline'; // Show button text
  })
  .catch(error => {
    showContactNotification('Error! ' + error.message, 'error');
    contactSubmitButton.disabled = false; // Re-enable submit button
    contactSpinner.style.display = 'none'; // Hide spinner
    contactButtonText.style.display = 'inline'; // Show button text
  });
});

function validateContactForm() {
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');

  // Validate name
  const name = document.getElementById('name');
  if (name.value.trim() === '') {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }

  // Validate email
  const email = document.getElementById('email');
  if (!validateEmail(email.value)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }

  // Validate message
  const message = document.getElementById('message');
  if (message.value.trim() === '') {
    document.getElementById('messageError').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showContactNotification(message, type) {
  contactNotification.textContent = message;
  contactNotification.style.display = 'block';
  contactNotification.style.color = type === 'success' ? '#CFBC76' : 'red';
  setTimeout(() => {
    contactNotification.style.display = 'none';
  }, 5000);
}
