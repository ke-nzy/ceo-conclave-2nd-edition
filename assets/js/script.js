document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  // Countdown timer
  var countDownDate = new Date("Aug 16, 2024 19:00:00").getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown timer elements if they exist
    var daysElement = document.getElementById("days");
    if (daysElement) daysElement.innerHTML = days;

    var hoursElement = document.getElementById("hours");
    if (hoursElement) hoursElement.innerHTML = hours;

    var minutesElement = document.getElementById("minutes");
    if (minutesElement) minutesElement.innerHTML = minutes;

    var secondsElement = document.getElementById("seconds");
    if (secondsElement) secondsElement.innerHTML = seconds;

    // Display "EXPIRED" if countdown is finished
    if (distance < 0) {
      clearInterval(x);
      var timerElement = document.querySelector(".timer");
      if (timerElement) timerElement.innerHTML = "EXPIRED";
    }
  }, 1000);

  // Speakers slider initialization (assuming Swiper is correctly loaded)
  var swiper = new Swiper('.speakers-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    },
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  // Tab functionality
  // const tabLinks = document.querySelectorAll('.tab-link');
  // const tabContents = document.querySelectorAll('.tab-pane');

  // tabLinks.forEach(function (link) {
  //     link.addEventListener('click', function () {
  //         const tabId = this.getAttribute('data-tab');

  //         // Remove active class from all tab links and hide all tab contents
  //         tabLinks.forEach(function (tab) {
  //             tab.classList.remove('active');
  //         });
  //         tabContents.forEach(function (content) {
  //             content.classList.remove('active');
  //         });

  //         // Add active class to the clicked tab link and show its corresponding content
  //         this.classList.add('active');
  //         var selectedTab = document.getElementById(tabId);
  //         if (selectedTab) selectedTab.classList.add('active');
  //     });
  // });
});

// Navbar scrolling effect
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});
