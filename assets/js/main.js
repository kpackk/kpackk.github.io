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
      var isOpen = burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    var links = mobileMenu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
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
    }, { threshold: 0.01 });

    elements.forEach(function (el) { observer.observe(el); });

    // Failsafe: reveal all elements after 1.5s in case IO doesn't trigger
    setTimeout(function () {
      elements.forEach(function (el) {
        if (!el.classList.contains('animated')) {
          el.classList.add('animated');
        }
      });
    }, 1500);
  }

  /* ----------------------------------------------------------
     Lightbox for Portfolio & Product Galleries
     ---------------------------------------------------------- */
  function initLightbox() {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<span class="lightbox-close">&times;</span>' +
      '<button class="lightbox-prev" aria-label="Previous">&#10094;</button>' +
      '<button class="lightbox-next" aria-label="Next">&#10095;</button>' +
      '<img class="lightbox-img" src="" alt="">' +
      '<div class="lightbox-caption"></div>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(lightbox);

    var img = lightbox.querySelector('.lightbox-img');
    var caption = lightbox.querySelector('.lightbox-caption');
    var counter = lightbox.querySelector('.lightbox-counter');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');

    var galleryImages = [];
    var currentIndex = 0;

    function getImageUrl(el) {
      var imgTag = el.querySelector('img');
      if (imgTag) return imgTag.src || imgTag.getAttribute('data-src');
      var bg = el.style.backgroundImage;
      var match = bg.match(/url\(["']?([^"')]+)["']?\)/);
      return match ? match[1] : null;
    }

    function showImage(index) {
      if (index < 0 || index >= galleryImages.length) return;
      currentIndex = index;
      img.src = galleryImages[index].url;
      caption.textContent = galleryImages[index].caption || '';
      if (galleryImages.length > 1) {
        counter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        counter.style.display = '';
        prevBtn.style.display = '';
        nextBtn.style.display = '';
      } else {
        counter.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    }

    function showPrev() {
      showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
    }

    function showNext() {
      showImage((currentIndex + 1) % galleryImages.length);
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      galleryImages = [];
    }

    lightbox.addEventListener('click', closeLightbox);
    img.addEventListener('click', function (e) { e.stopPropagation(); });
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showNext(); });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Touch swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showNext();
        else showPrev();
      }
    });

    // Delegate clicks on portfolio items (single image)
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.portfolio-item');
      if (!item) return;

      var url = getImageUrl(item);
      if (!url) return;

      var hoverText = item.querySelector('.portfolio-hover-text span');
      galleryImages = [{ url: url, caption: hoverText ? hoverText.textContent : '' }];
      currentIndex = 0;
      showImage(0);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Delegate clicks on product gallery items (navigable gallery)
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.product-gallery-item');
      if (!item) return;

      var gallery = item.closest('.product-gallery');
      if (!gallery) return;

      var items = gallery.querySelectorAll('.product-gallery-item');
      galleryImages = [];
      var clickedIndex = 0;

      items.forEach(function (el, i) {
        var url = getImageUrl(el);
        if (url) {
          if (el === item) clickedIndex = galleryImages.length;
          galleryImages.push({ url: url, caption: '' });
        }
      });

      if (!galleryImages.length) return;

      currentIndex = clickedIndex;
      showImage(currentIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  /* ----------------------------------------------------------
     Service Worker Registration
     ---------------------------------------------------------- */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    }
  }

  /* ----------------------------------------------------------
     7. GA4 Event Tracking
     ---------------------------------------------------------- */
  function initGA4Tracking() {
    if (typeof window.gtag !== 'function') return;

    // Track WhatsApp link clicks
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="wa.me"]');
      if (!link) return;
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: link.href,
        link_url: link.href
      });
    });

    // Track phone call clicks
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="tel:"]');
      if (!link) return;
      window.gtag('event', 'phone_call', {
        event_category: 'engagement',
        event_label: link.href.replace('tel:', '')
      });
    });

    // Track WhatsApp form submissions
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-whatsapp-form]');
      if (!form) return;
      window.gtag('event', 'form_submit_whatsapp', {
        event_category: 'engagement',
        event_label: document.title
      });
    });
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
    initLightbox();
    initGA4Tracking();
    registerServiceWorker();
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
