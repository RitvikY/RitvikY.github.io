console.log('Hello from index.js!');


// JavaScript to toggle content visibility
document.addEventListener("DOMContentLoaded", function() {
    // Initially hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show content when a header is clicked
    const headerLinks = document.querySelectorAll('nav a');
    headerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Hide all content sections
                contentSections.forEach(section => {
                    section.classList.add('hidden');
                });
                // Show the selected content section
                targetSection.classList.remove('hidden');
            }
        });
    });
});
