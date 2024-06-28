const scriptURL = 'https://script.google.com/macros/s/AKfycby80YksGAHLvPYyQu7eNPycSvuuTmwEjqegCBVDrjMO-2bWCxN5BS6DkmPtxozey3ib3Q/exec';
const form = document.forms['sponsorForm'];
const notification = document.getElementById('notification');
const submitButton = document.getElementById('submitButton');

form.addEventListener('submit', e => {
  e.preventDefault();
  submitButton.disabled = true; // Disable submit button

  fetch(scriptURL, {
    method: 'POST',
    mode: 'cors', // This is important for CORS
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(form)) // Using URLSearchParams for better compatibility
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
  })
  .catch(error => {
    showNotification('Error! ' + error.message, 'error');
    submitButton.disabled = false; // Re-enable submit button
  });
});

function showNotification(message, type) {
  notification.textContent = message;
  notification.style.display = 'block';
  notification.style.color = type === 'success' ? '#CFBC76' : 'red';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}
