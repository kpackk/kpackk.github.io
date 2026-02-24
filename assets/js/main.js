/* ============================================================
   SOLARA DESIGN - Main JavaScript
   Mobile menu, FAQ accordion, lazy loading, scroll effects,
   WhatsApp form handler.
   ============================================================ */

(function () {
  'use strict';

  var WHATSAPP_PHONE = '971589408100';

  /* ----------------------------------------------------------
     1. Mobile Menu Toggle
     ---------------------------------------------------------- */
  var mobileMenuInitialized = false;

  function initMobileMenu() {
    if (mobileMenuInitialized) return;
    var burger = document.querySelector('.burger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (!burger || !mobileMenu) return;

    mobileMenuInitialized = true;

    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    var links = mobileMenu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ----------------------------------------------------------
     2. FAQ Accordion
     ---------------------------------------------------------- */
  function initFaqAccordion() {
    var questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach(function (question) {
      question.addEventListener('click', function () {
        var item = this.closest('.faq-item');
        if (!item) return;

        var answer = item.querySelector('.faq-answer');
        var inner = item.querySelector('.faq-answer-inner');
        var isActive = item.classList.contains('active');

        // Close all other open items
        var allItems = document.querySelectorAll('.faq-item.active');
        allItems.forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('active');
            var openAnswer = openItem.querySelector('.faq-answer');
            if (openAnswer) {
              openAnswer.style.maxHeight = '0';
            }
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          if (answer) answer.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          if (answer && inner) {
            answer.style.maxHeight = inner.scrollHeight + 'px';
          }
        }
      });
    });
  }

  /* ----------------------------------------------------------
     3. Lazy Loading Images
     ---------------------------------------------------------- */
  function initLazyLoading() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    // Use IntersectionObserver if available
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var img = entry.target;
              img.src = img.getAttribute('data-src');

              var srcset = img.getAttribute('data-srcset');
              if (srcset) {
                img.srcset = srcset;
              }

              img.addEventListener('load', function () {
                img.classList.add('loaded');
              });

              img.removeAttribute('data-src');
              img.removeAttribute('data-srcset');
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '200px 0px',
          threshold: 0.01,
        }
      );

      lazyImages.forEach(function (img) {
        observer.observe(img);
      });
    } else {
      // Fallback: load all images immediately
      lazyImages.forEach(function (img) {
        img.src = img.getAttribute('data-src');
        img.classList.add('loaded');
      });
    }
  }

  /* ----------------------------------------------------------
     4. Header Scroll Effect
     ---------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    var threshold = 100;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > threshold) {
            header.classList.add('header-scrolled');
          } else {
            header.classList.remove('header-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on load in case page is already scrolled
    onScroll();
  }

  /* ----------------------------------------------------------
     5. Form → WhatsApp Handler
     ---------------------------------------------------------- */
  function initWhatsAppForm() {
    var forms = document.querySelectorAll('[data-whatsapp-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(form);
        var parts = [];

        formData.forEach(function (value, key) {
          if (value && value.toString().trim()) {
            // Use the data-label attribute on the input if available, else use key
            var input = form.querySelector('[name="' + key + '"]');
            var label = input
              ? input.getAttribute('data-label') || key
              : key;
            parts.push(label + ': ' + value.toString().trim());
          }
        });

        if (!parts.length) return;

        var message = encodeURIComponent(parts.join('\n'));
        var url =
          'https://wa.me/' + WHATSAPP_PHONE + '?text=' + message;

        window.open(url, '_blank');
      });
    });
  }

  /* ----------------------------------------------------------
     6. Smooth Scroll for Anchor Links
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = document.querySelector('.header')
        ? document.querySelector('.header').offsetHeight
        : 0;

      var top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     Scroll Animations (IntersectionObserver)
     ---------------------------------------------------------- */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      elements.forEach(function (el) { el.classList.add('animated'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     Initialise Everything
     ---------------------------------------------------------- */
  function init() {
    initMobileMenu();
    initFaqAccordion();
    initLazyLoading();
    initHeaderScroll();
    initWhatsAppForm();
    initSmoothScroll();
    initScrollAnimations();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialise some features when components are loaded dynamically
  document.addEventListener('component:loaded', function () {
    initMobileMenu();
    initHeaderScroll();
  });
})();
