const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');
const tabContent = document.querySelector('.tab-content'); 

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        const tabId = link.getAttribute('data-tab');

        tabLinks.forEach(tl => tl.classList.remove('active'));
        link.classList.add('active');

        tabPanes.forEach(tp => tp.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

        if (!tabContent.classList.contains('active')) {
            tabContent.classList.add('active');
        }
    });
});
