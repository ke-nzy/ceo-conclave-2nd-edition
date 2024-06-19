// document.getElementById('mobile-menu').addEventListener('click', function () {
//     const sidebar = document.getElementById('sidebar');
//     if (sidebar.style.left === '0px') {
//         sidebar.style.left = '-250px';
//     } else {
//         sidebar.style.left = '0px';
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    var countDownDate = new Date("Aug 18, 2024 19:00:00").getTime();

    // Update the countdown every 1 second
    var x = setInterval(function () {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".timer").innerHTML = "EXPIRED";
        }
    }, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
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
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  });

