document.addEventListener("DOMContentLoaded", function () {
  // Countdown timer
  var countDownDate = new Date("Nov 15, 2024 19:00:00").getTime();

  // Initially, all time elements should have the loading class
  var timeElements = document.querySelectorAll(".time");
  timeElements.forEach(function (element) {
    element.classList.add("loading");
  });

  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Elements that need to be updated
    var elements = [
      { id: "days", value: days },
      { id: "hours", value: hours },
      { id: "minutes", value: minutes },
      { id: "seconds", value: seconds },
      { id: "bubble-days", value: days },
      { id: "bubble-hours", value: hours },
      { id: "bubble-minutes", value: minutes },
      { id: "bubble-seconds", value: seconds },
    ];

    elements.forEach(function (element) {
      var el = document.getElementById(element.id);
      if (el) {
        // Set the value but keep the loading class for a brief moment
        setTimeout(function () {
          el.innerHTML = element.value;
          el.classList.remove("loading");
        }, 500); 
      }
    });

    if (distance < 0) {
      clearInterval(x);
      var timerElement = document.querySelector(".timer");
      if (timerElement) timerElement.innerHTML = "EXPIRED";
    }
  }, 1000);

  var swiper = new Swiper(".speakers-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var navbarButton = document.querySelector(".navbar-button a");
  if (navbarButton) {
    navbarButton.addEventListener("click", function (event) {
      event.preventDefault();
      var targetId = this.getAttribute("href").substring(1);
      var targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
        history.pushState(null, null, " ");
      }
    });
  }
});

// Script for the loader gif
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});

// Navbar scrolling effect
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// Countdown bubble
window.addEventListener("scroll", function () {
  const heroSection = document.querySelector(".hero");
  const countdownBubble = document.querySelector(".countdown-bubble");
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

  if (window.scrollY > heroBottom) {
    countdownBubble.classList.add("show");
  } else {
    countdownBubble.classList.remove("show");
  }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
  }
});
