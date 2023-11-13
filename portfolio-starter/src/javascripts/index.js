document.addEventListener('DOMContentLoaded', () => {
  // Card expansion functionality (Projects and Experience)
  const cards = document.querySelectorAll('.card, .experience-card')
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const overlay = document.querySelector('.overlay-background')
      if (!overlay) {
        console.error('Overlay element not found!')
        return
      }

      const expandedContent = card.querySelector('.expanded-content')
      if (!expandedContent) {
        console.error('Expanded content not found in card!')
        return
      }

      if (!card.classList.contains('expanded')) {
        // Close any other expanded card
        const expandedCard = document.querySelector('.card.expanded, .experience-card.expanded')
        if (expandedCard) {
          expandedCard.classList.remove('expanded')
          const otherExpandedContent = expandedCard.querySelector('.expanded-content')
          if (otherExpandedContent) {
            otherExpandedContent.classList.add('hidden')
            otherExpandedContent.style.display = ''
          }
        }
        // Expand the clicked card
        card.classList.add('expanded')
        expandedContent.classList.remove('hidden')
        expandedContent.style.display = 'block'
        overlay.classList.add('show')
      } else {
        // Close the expanded card
        card.classList.remove('expanded')
        expandedContent.classList.add('hidden')
        expandedContent.style.display = ''
        overlay.classList.remove('show')
      }
    })
  })

  // Overlay functionality
  const overlay = document.querySelector('.overlay-background')
  if (!overlay) {
    console.error('Overlay element not found!')
  } else {
    overlay.addEventListener('click', () => {
      const expandedCard = document.querySelector('.card.expanded, .experience-card.expanded')
      if (expandedCard) {
        expandedCard.classList.remove('expanded')
        const expandedContent = expandedCard.querySelector('.expanded-content')
        if (expandedContent) {
          expandedContent.classList.add('hidden')
          expandedContent.style.display = ''
        }
      }
      overlay.classList.remove('show')
    })
  }

  // Form submission handling
  const contactForm = document.getElementById('contact-form')
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault()
      console.log('Form submission triggered')
    })
  } else {
    console.error('Contact form not found!')
  }
})
