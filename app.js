(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.index a'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  function activate(id) {
    var target = byId[id];
    if (!target) return;
    links.forEach(function (a) { a.removeAttribute('aria-current'); });
    target.setAttribute('aria-current', 'true');
    var list = target.parentNode.parentNode;
    if (list.scrollWidth > list.clientWidth) {
      list.scrollLeft = target.offsetLeft - (list.clientWidth - target.clientWidth) / 2;
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
