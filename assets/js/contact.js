// Script for the contact google sheet form
const contactFormScriptURL = 'https://script.google.com/macros/s/AKfycbwXSYSz1ZnqkUxVAWFMLIKwWMSkZpqwwXk7CKm5v7gHJRbQTmgyipcL-GcD4NQ04j3kGg/exec';
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch(contactFormScriptURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(contactForm))
  })
  .then(response => response.json())
  .then(data => console.log('Success!', data))
  .catch(error => console.error('Error!', error.message));
});

