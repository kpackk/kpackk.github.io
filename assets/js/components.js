/* ============================================================
   SOLARA DESIGN - Component Loader
   Loads shared header and footer from separate HTML files.
   Also injects analytics (GA4 + Yandex.Metrica) on first load.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Analytics ---------- */
  // GA4 — replace G-XXXXXXXXXX with your Measurement ID
  (function(id){
    if (!id || id === 'G-XXXXXXXXXX') return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', id);
    window.gtag = gtag;
  })('G-XXXXXXXXXX');

  // Yandex.Metrica — replace XXXXXXXXX with your counter ID
  (function(id){
    if (!id || id === 'XXXXXXXXX') return;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
    k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
    })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
    ym(id, 'init', {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
  })('XXXXXXXXX');

  /**
   * Fetch an HTML fragment and inject it into the element with the given ID.
   * @param {string} id   - The ID of the target container element.
   * @param {string} path - Relative path to the HTML component file.
   */
  function loadComponent(id, path) {
    var target = document.getElementById(id);
    if (!target) return;

    fetch(path)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load ' + path + ' (' + response.status + ')');
        }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;

        // Dispatch a custom event so other scripts know the component is ready
        target.dispatchEvent(new CustomEvent('component:loaded', { bubbles: true }));
      })
      .catch(function () {
        // Silent fail - expected when opening via file:// protocol
        // Components will not render, but the page remains functional
      });
  }

  /**
   * Calculate the relative path prefix based on the data-depth attribute
   * on the <html> element. Pages at the root have depth 0, pages one level
   * deep (e.g. /shtory/) have depth 1, etc.
   *
   * Example:
   *   depth 0 => prefix = ""          (root: index.html)
   *   depth 1 => prefix = "../"       (e.g. shtory/index.html)
   *   depth 2 => prefix = "../../"    (e.g. shtory/tyul/index.html)
   */
  function getPathPrefix() {
    // data-basepath overrides depth calculation (used by 404.html which can be served from any URL)
    var basepath = document.documentElement.getAttribute('data-basepath');
    if (basepath) return basepath;

    var depth = parseInt(document.documentElement.getAttribute('data-depth') || '0', 10);
    if (depth <= 0) return '';
    var prefix = '';
    for (var i = 0; i < depth; i++) {
      prefix += '../';
    }
    return prefix;
  }

  // ---- Initialise on DOM ready ----
  document.addEventListener('DOMContentLoaded', function () {
    var prefix = getPathPrefix();

    loadComponent('site-header', prefix + 'components/header.html');
    loadComponent('site-footer', prefix + 'components/footer.html');
  });
})();
