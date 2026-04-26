/* ============================================================
   YHA — Young Humanitarians in Action
   Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAV SCROLL BEHAVIOUR ─────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () =>
      nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. HAMBURGER / MOBILE MENU ──────────────────────── */
  const burger = document.querySelector('.nav__hamburger');
  const menu   = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
    // Close on nav-link click (mobile)
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
      })
    );
  }

  /* ── 3. ACTIVE NAV LINK ──────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. SCROLL REVEAL ────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 5. COUNTER ANIMATION ────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ── 6. FAQ ACCORDION ────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(open =>
        open.classList.remove('open')
      );
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 7. PAYMENT MODAL ────────────────────────────────── */
  const modalOverlay = document.getElementById('payment-modal');
  if (modalOverlay) {
    const modalIcon  = modalOverlay.querySelector('#modal-icon');
    const modalTitle = modalOverlay.querySelector('#modal-title');
    const modalSub   = modalOverlay.querySelector('#modal-sub');
    const modalBody  = modalOverlay.querySelector('#modal-body');
    const closeBtn   = modalOverlay.querySelector('.modal__close');

    const paymentDetails = {
      mpesa: {
        icon: '📱',
        title: 'Pay via M-Pesa',
        sub: 'Quick and easy mobile payment — available across Kenya',
        body: `
          <p><strong>Paybill Number:</strong></p>
          <p style="font-size:1.8rem;font-weight:700;color:var(--g-mid);margin:8px 0 16px;">000000</p>
          <p><strong>Account Number:</strong> YHA-DONATE</p>
          <p style="margin-top:14px;font-size:.9rem;color:var(--text-soft);">
            Go to M-Pesa → Lipa na M-Pesa → Paybill → Enter number → Enter Account → Enter Amount → Confirm.
          </p>
          <p style="margin-top:10px;font-size:.85rem;color:var(--text-soft);">
            A confirmation message will be sent to your phone. Thank you for your generosity.
          </p>`
      },
      paypal: {
        icon: '💳',
        title: 'Pay via PayPal',
        sub: 'Donate securely from anywhere in the world',
        body: `
          <p>Send your donation to our PayPal account:</p>
          <p style="font-size:1.2rem;font-weight:700;color:var(--g-mid);margin:12px 0 16px;">donate@younghumanitarians.org</p>
          <p style="font-size:.9rem;color:var(--text-soft);">
            Log in to your PayPal account → Send & Request → Send to the email above → Select "Sending to a friend" or "Goods & Services" → Enter amount → Add note: YHA Donation → Send.
          </p>
          <p style="margin-top:10px;font-size:.85rem;color:var(--text-soft);">
            International donations welcome. PayPal integration coming soon for direct in-page payments.
          </p>`
      },
      bank: {
        icon: '🏦',
        title: 'Bank Transfer',
        sub: 'Direct bank deposit to our organisational account',
        body: `
          <p><strong>Bank Name:</strong> [Bank Name — Placeholder]</p>
          <p style="margin:6px 0;"><strong>Account Name:</strong> Young Humanitarians in Action</p>
          <p style="margin:6px 0;"><strong>Account Number:</strong> 0000000000</p>
          <p style="margin:6px 0;"><strong>Branch:</strong> Nairobi, Kenya</p>
          <p style="margin:6px 0 16px;"><strong>Swift / IBAN:</strong> XXXXXX00</p>
          <p style="font-size:.85rem;color:var(--text-soft);">
            Once the transfer is complete, please email us at donate@younghumanitarians.org with your transaction reference so we can acknowledge your donation.
          </p>`
      }
    };

    document.querySelectorAll('[data-payment]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.dataset.payment;
        const d   = paymentDetails[key];
        if (!d) return;
        modalIcon.textContent  = d.icon;
        modalTitle.textContent = d.title;
        modalSub.textContent   = d.sub;
        modalBody.innerHTML    = d.body;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── 8. SMOOTH SCROLL for anchor links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10);
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 9. HERO PARALLAX (subtle) ───────────────────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      hero.style.setProperty('--parallax-y', `${y * 0.25}px`);
    }, { passive: true });
  }

});
