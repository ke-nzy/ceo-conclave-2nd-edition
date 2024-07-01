const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');
const tabContent = document.querySelector('.tab-content'); 

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        const tabId = link.getAttribute('data-tab');

        // Remove active class from all tab links
        tabLinks.forEach(tl => tl.classList.remove('active'));
        // Add active class to clicked tab link
        link.classList.add('active');

        // Remove active class from all tab panes
        tabPanes.forEach(tp => tp.classList.remove('active'));
        // Add active class to corresponding tab pane
        document.getElementById(tabId).classList.add('active');

        // Toggle .tab-content active class based on active tab pane
        if (!tabContent.classList.contains('active')) {
            tabContent.classList.add('active');
        }
    });
});
