/* ============================================================
   SOLARA DESIGN - Calculator Logic
   Standalone curtain cost calculator.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('calc-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var type = document.getElementById('calc-type');
    var width = parseFloat(document.getElementById('calc-width').value);
    var height = parseFloat(document.getElementById('calc-height').value);
    var fabric = document.getElementById('calc-fabric');
    var motor = document.getElementById('calc-motor').checked;
    var windows = parseInt(document.getElementById('calc-windows').value) || 1;

    if (!width || !height || width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
      document.getElementById('calc-price').textContent = '—';
      document.getElementById('calc-result').style.display = 'block';
      return;
    }

    var basePrice = parseInt(type.selectedOptions[0].dataset.price) || 0;
    var fabricMult = parseFloat(fabric.selectedOptions[0].dataset.mult) || 1;
    var area = width * height;

    var total = area * basePrice * fabricMult * windows;
    if (motor) total += 800 * windows;

    total = Math.round(total);

    document.getElementById('calc-price').textContent = total.toLocaleString('ru-RU') + ' AED';
    document.getElementById('calc-result').style.display = 'block';

    // Update WhatsApp link with details
    var typeName = type.selectedOptions[0].text;
    var msg = encodeURIComponent(
      'Здравствуйте! Рассчитал стоимость на сайте:\n' +
      'Тип: ' + typeName + '\n' +
      'Размер: ' + width + '\u00d7' + height + 'м\n' +
      'Окон: ' + windows + '\n' +
      'Примерная стоимость: ' + total.toLocaleString('ru-RU') + ' AED\n' +
      'Хочу уточнить детали.'
    );
    var waLink = document.querySelector('#calc-result a');
    if (waLink) waLink.href = 'https://wa.me/971589408100?text=' + msg;
  });
});
