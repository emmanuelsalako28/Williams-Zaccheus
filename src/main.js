(function(){

  /* ---------- LOADER ---------- */
  window.addEventListener('load', function(){
    var loader = document.getElementById('loader');
    setTimeout(function(){
      loader.classList.add('hide');
    }, 700);
  });

  /* ---------- PARTICLES ---------- */
  var field = document.getElementById('particle-field');
  var count = window.innerWidth < 700 ? 14 : 26;
  for(var i=0;i<count;i++){
    var p = document.createElement('div');
    p.className = 'particle';
    var size = Math.random()*10 + 4;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    var duration = Math.random()*14 + 12;
    p.style.animationDuration = duration+'s';
    p.style.animationDelay = (Math.random()*duration)+'s';
    p.style.setProperty('--drift', (Math.random()*80-40)+'px');
    field.appendChild(p);
  }

  /* ---------- MOBILE NAV ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(function(el){ revealObserver.observe(el); });

  /* ---------- SKILL BARS ---------- */
  var skillItems = document.querySelectorAll('.skill-item');
  var skillObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var fillEl = entry.target.querySelector('.skill-fill');
        var labelEl = entry.target.querySelector('.skill-top span:last-child');
        var target = parseInt(fillEl.getAttribute('data-fill'), 10);
        fillEl.style.width = target + '%';

        var current = 0;
        var stepTime = 14;
        var timer = setInterval(function(){
          current += 2;
          if(current >= target){
            current = target;
            clearInterval(timer);
          }
          labelEl.textContent = current + '%';
        }, stepTime);

        skillObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  skillItems.forEach(function(el){ skillObserver.observe(el); });

  /* ---------- SMOOTH SCROLL (with header offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top: top, behavior:'smooth'});
      }
    });
  });

  /* ---------- HEADER SCROLL INTERACTION ---------- */
  var header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ---------- THEME SWITCHER ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var body = document.body;

  // Retrieve saved preference or default to dark
  var currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    var isLight = body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

})();
