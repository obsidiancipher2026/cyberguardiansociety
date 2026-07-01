(function () {
  'use strict';

  var CGS = window.CGS || {};
  CGS.TeamAnimations = {
    initialized: false,

    init: function () {
      if (this.initialized) return;
      this.initialized = true;

      var section = document.querySelector('.team-section');
      if (!section) return;

      var hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced || !hasGSAP) {
        this.fallback(section);
        return;
      }

      this.gsapAnimate(section);
    },

    gsapAnimate: function (section) {
      var header = section.querySelector('.team-header');
      var cards = section.querySelectorAll('.team-card');

      // Animate header
      if (header) {
        var eyebrow = header.querySelector('.team-eyebrow');
        var title = header.querySelector('.team-title');
        var subtitle = header.querySelector('.team-subtitle');
        var divider = header.querySelector('.team-divider');

        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        if (eyebrow) tl.fromTo(eyebrow, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        if (title) tl.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
        if (subtitle) tl.fromTo(subtitle, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
        if (divider) tl.fromTo(divider, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      }

      // Animate cards in hierarchy order (leadership first, then core, then general)
      if (cards.length > 0) {
        var leadershipCards = section.querySelectorAll('.team-card.leadership');
        var coreCards = section.querySelectorAll('.team-card.core');
        var generalCards = section.querySelectorAll('.team-card.general');

        gsap.set(cards, { y: 30, opacity: 0 });

        function animateCards(cardList, stagger, delay) {
          if (!cardList || cardList.length === 0) return;
          gsap.to(cardList, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: stagger || 0.1,
            delay: delay || 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardList[0],
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          });
        }

        animateCards(leadershipCards, 0, 0.2);
        animateCards(coreCards, 0.1, 0.3);
        animateCards(generalCards, 0.08, 0.4);
      }
    },

    fallback: function (section) {
      var header = section.querySelector('.team-header');
      if (header) header.classList.add('team-header-animate');

      var cards = section.querySelectorAll('.team-card');
      cards.forEach(function (card, i) {
        setTimeout(function () {
          card.classList.add('visible');
        }, 300 + i * 80);
      });
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      CGS.TeamAnimations.init();
    });
  } else {
    CGS.TeamAnimations.init();
  }

  window.CGS = CGS;
})();
