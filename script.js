/* ===========================
   HALIMGYM — SCRIPT.JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== HAMBURGER MENU ====================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==================== NAVBAR SCROLL EFFECT ====================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==================== COUNTER ANIMATION ====================
  const statNums = document.querySelectorAll('.stat-num');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;
      statNums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          num.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            num.textContent = target;
          }
        }
        requestAnimationFrame(update);
      });
    }
  }

  // ==================== REVEAL ON SCROLL ====================
  const revealElements = document.querySelectorAll(
    '.about-card, .about-number, .about-text, .class-card, .price-card, .testi-card, .contact-left, .contact-right, .section-header, .feat'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  function revealOnScroll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  // ==================== TESTIMONIAL SLIDER ====================
  const testiTrack = document.getElementById('testiTrack');
  const dotBtns = document.querySelectorAll('.dot-btn');

  if (testiTrack && dotBtns.length) {
    let currentSlide = 0;
    const totalSlides = dotBtns.length;

    function goToSlide(index) {
      currentSlide = index;
      const cardWidth = testiTrack.querySelector('.testi-card').offsetWidth;
      const gap = 24; // 1.5rem gap
      testiTrack.style.transform = `translateX(-${currentSlide * (cardWidth + gap)}px)`;

      dotBtns.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    dotBtns.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-idx'));
        goToSlide(idx);
      });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }, 5000);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testiTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testiTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    });
  }

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    });
  }

  // ==================== SCROLL EVENTS ====================
  window.addEventListener('scroll', () => {
    animateCounters();
    revealOnScroll();
  });

  // Trigger once on load
  revealOnScroll();
  animateCounters();

  // ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

});
