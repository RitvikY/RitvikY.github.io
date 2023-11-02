document.addEventListener("DOMContentLoaded", function () {
    // Card expansion functionality (Projects and Experience)
    const cards = document.querySelectorAll('.card, .experience-card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const overlay = document.querySelector('.overlay-background');
            const expandedContent = card.querySelector('.expanded-content');
            if (!card.classList.contains('expanded')) {
                // Close any other expanded card
                const expandedCard = document.querySelector('.card.expanded, .experience-card.expanded');
                if (expandedCard) {
                    expandedCard.classList.remove('expanded');
                    const otherExpandedContent = expandedCard.querySelector('.expanded-content');
                    if (otherExpandedContent) {
                        otherExpandedContent.classList.add('hidden');
                        otherExpandedContent.style.display = ''; // Reset display property
                    }
                }
                // Expand the clicked card
                card.classList.add('expanded');
                if (expandedContent) {
                    expandedContent.classList.remove('hidden');
                    expandedContent.style.display = 'block'; // Ensure it's visible
                }
                overlay.classList.add('show');
            } else {
                // Close the expanded card
                card.classList.remove('expanded');
                if (expandedContent) {
                    expandedContent.classList.add('hidden');
                    expandedContent.style.display = ''; // Reset display property
                }
                overlay.classList.remove('show');
            }
        });
    });

    // Overlay functionality
    const overlay = document.querySelector('.overlay-background');
    overlay.addEventListener('click', function () {
        const expandedCard = document.querySelector('.card.expanded, .experience-card.expanded');
        if (expandedCard) {
            expandedCard.classList.remove('expanded');
            const expandedContent = expandedCard.querySelector('.expanded-content');
            if (expandedContent) {
                expandedContent.classList.add('hidden');
                expandedContent.style.display = ''; // Reset display property
            }
        }
        overlay.classList.remove('show');
    });
});
