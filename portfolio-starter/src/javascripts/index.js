document.addEventListener('DOMContentLoaded', () => {
  // ── Modal system ──────────────────────────────────────────────────────────
  const overlay = document.getElementById('modal-overlay');
  let activeModal = null;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (activeModal) activeModal.classList.remove('active');
    modal.classList.add('active');
    overlay.classList.add('show');
    activeModal = modal;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (activeModal) {
      activeModal.classList.remove('active');
      activeModal = null;
    }
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Open modal when a card is clicked
  document.querySelectorAll('.card[data-modal]').forEach((card) => {
    card.addEventListener('click', () => {
      openModal(card.dataset.modal);
    });
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on close button click
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Scroll fade-in animation ──────────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  // ── Navbar scroll shadow ──────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── Contact form ──────────────────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      try {
        const response = await fetch('send-email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
          formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        // Graceful fallback: open mailto link
        const mailtoLink = `mailto:yaragudi.ritvik@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
        window.location.href = mailtoLink;
        formStatus.textContent = 'Opening your email client…';
        formStatus.className = 'form-status success';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
});
