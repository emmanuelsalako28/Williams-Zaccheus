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
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      if (toggle && links) {
        toggle.classList.remove('open');
        links.classList.remove('open');
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!links || !toggle) return;
    var isClickInsideNav = links.contains(event.target);
    var isClickInsideToggle = toggle.contains(event.target);
    if (!isClickInsideNav && !isClickInsideToggle) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });

  /* ---------- THEME SWITCHER ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var body = document.body;

  // Retrieve saved preference or default to light
  var currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    var isLight = body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  /* ---------- PROJECTS DASHBOARD LOGIC ---------- */
  
  // 1. Tab Switching logic
  var tabBtns = document.querySelectorAll('.project-tab-btn');
  var panels = document.querySelectorAll('.project-panel');
  
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetTab = this.getAttribute('data-tab');
      
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      
      this.classList.add('active');
      var targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 2. Canned Responses Library Logic
  var cannedData = [
    {
      num: "#1",
      title: "First outreach after enquiry",
      category: "welcome",
      catName: "Welcome",
      text: "Hi [Name]! My name is Williams and I am reaching out because I noticed your interest in our products or services. I would love to help you find exactly what you need. Feel free to ask me anything and I will be happy to assist!"
    },
    {
      num: "#2",
      title: "Welcome after first purchase",
      category: "welcome",
      catName: "Welcome",
      text: "Hi [Name], welcome and thank you so much for your order! We are thrilled to have you as a customer. Your order is being processed and you will receive an update shortly. Do not hesitate to reach out if you need anything at all."
    },
    {
      num: "#4",
      title: "Order confirmation",
      category: "orders",
      catName: "Order Mgmt",
      text: "Hi [Name]! Your order has been confirmed and is being processed. You will receive a shipping notification as soon as it is on its way. Thank you for shopping with us!"
    },
    {
      num: "#5",
      title: "Order delayed",
      category: "orders",
      catName: "Order Mgmt",
      text: "Hi [Name], we sincerely apologise for the delay with your order. We are actively working to get it to you as quickly as possible and will send you an update within 24 hours. Thank you for your patience."
    },
    {
      num: "#10",
      title: "Refund request acknowledged",
      category: "refunds",
      catName: "Refunds",
      text: "Hi [Name], we have received your refund request and are processing it now. You can expect the funds to be returned to your original payment method within 5 to 7 business days. We appreciate your patience."
    },
    {
      num: "#11",
      title: "Refund approved",
      category: "refunds",
      catName: "Refunds",
      text: "Hi [Name], great news! Your refund has been approved. You should see the amount reflected in your account within 5 to 7 business days depending on your bank. Thank you for your patience throughout this process."
    },
    {
      num: "#16",
      title: "Acknowledging a complaint",
      category: "complaints",
      catName: "Complaints",
      text: "Hi [Name], thank you for bringing this to our attention. I am truly sorry for the experience you have had and I want to assure you that this is being taken seriously. Please give me a moment to look into this and I will get back to you with a resolution as quickly as possible."
    },
    {
      num: "#17",
      title: "Escalating an issue",
      category: "complaints",
      catName: "Complaints",
      text: "Hi [Name], I want to make sure this gets the attention it deserves, so I am escalating your case to our specialist team right now. You will hear back from us within 24 hours with a full update. I appreciate your patience."
    },
    {
      num: "#19",
      title: "Shipping confirmation",
      category: "shipping",
      catName: "Shipping",
      text: "Hi [Name], your order is on its way! Your tracking number is [number]. You can use it to follow your package in real time. Expected delivery is [date]. Thank you for your order!"
    },
    {
      num: "#20",
      title: "Tracking not updating",
      category: "shipping",
      catName: "Shipping",
      text: "Hi [Name], we understand this can be concerning. Tracking information sometimes takes 24 to 48 hours to update after dispatch. If it still has not moved after that window, please reach out and we will investigate with the carrier on your behalf."
    },
    {
      num: "#24",
      title: "Product availability",
      category: "inquiries",
      catName: "Product Inq",
      text: "Hi [Name], thank you for your interest! [Product name] is currently [in stock or out of stock]. If it is out of stock, you can sign up for restock notifications on the product page and we will let you know as soon as it is available again."
    },
    {
      num: "#29",
      title: "Password reset assistance",
      category: "support",
      catName: "Tech Support",
      text: "Hi [Name], no worries! You can reset your password by clicking the Forgot Password link on the login page. A reset link will be sent to your registered email. If you do not receive it within a few minutes, please check your spam folder."
    },
    {
      num: "#37",
      title: "Customer asks about business hours",
      category: "support",
      catName: "Tech Support",
      text: "Hi [Name], great question! Our customer support team is available [hours and days]. Outside of these hours, you can leave us a message and we will get back to you as soon as we are online. We appreciate your patience!"
    },
    {
      num: "#B1",
      title: "Sizing question on social media",
      category: "social",
      catName: "Social Media",
      text: "Hey! Great question! We would recommend going with a Large for the best fit and comfort at your size. Our bottoms are designed to make you feel relaxed and move with you, so a Large will give you that perfect feel without being too snug. We are always here if you need anything else!"
    }
  ];

  var cannedList = document.getElementById('cannedList');
  var cannedSearch = document.getElementById('cannedSearch');
  var cannedCategoryFilter = document.getElementById('cannedCategoryFilter');

  // Create Toast Container
  var toast = document.createElement('div');
  toast.id = 'toastNotification';
  toast.innerHTML = '<span>✓</span> Response template copied!';
  document.body.appendChild(toast);

  function renderTemplates() {
    if (!cannedList) return;
    cannedList.innerHTML = '';
    
    var query = cannedSearch ? cannedSearch.value.toLowerCase() : '';
    var cat = cannedCategoryFilter ? cannedCategoryFilter.value : 'all';
    
    var filtered = cannedData.filter(function(item) {
      var matchesSearch = item.title.toLowerCase().indexOf(query) !== -1 || item.text.toLowerCase().indexOf(query) !== -1;
      var matchesCat = cat === 'all' || item.category === cat;
      return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
      cannedList.innerHTML = '<p style="text-align:center;color:var(--brown-soft);padding:2rem;">No matching templates found.</p>';
      return;
    }

    filtered.forEach(function(item) {
      var card = document.createElement('div');
      card.className = 'canned-card';
      
      card.innerHTML = `
        <div class="canned-card-header">
          <div class="canned-num-title">
            <span class="canned-badge">${item.num}</span>
            <h4>${item.title}</h4>
          </div>
          <span class="canned-cat-tag">${item.catName}</span>
        </div>
        <div class="canned-text-container">
          <div class="canned-text-body">${item.text}</div>
          <button class="canned-copy-btn">
            <span class="copy-icon">📋</span> Copy
          </button>
        </div>
      `;
      
      var copyBtn = card.querySelector('.canned-copy-btn');
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(item.text).then(function() {
          copyBtn.innerHTML = '<span>✓</span> Copied!';
          copyBtn.classList.add('copied');
          
          toast.classList.add('show');
          
          setTimeout(function() {
            copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
          
          setTimeout(function() {
            toast.classList.remove('show');
          }, 3000);
        }).catch(function(err) {
          console.error('Failed to copy text: ', err);
        });
      });

      cannedList.appendChild(card);
    });
  }

  if (cannedSearch && cannedCategoryFilter) {
    cannedSearch.addEventListener('input', renderTemplates);
    cannedCategoryFilter.addEventListener('change', renderTemplates);
    renderTemplates(); // initial render
  }

  // 3. Inbox Organizer view toggle
  var inboxClutteredBtn = document.getElementById('inboxClutteredBtn');
  var inboxSortedBtn = document.getElementById('inboxSortedBtn');
  var inboxClutteredView = document.getElementById('inboxClutteredView');
  var inboxSortedView = document.getElementById('inboxSortedView');

  if (inboxClutteredBtn && inboxSortedBtn) {
    inboxClutteredBtn.addEventListener('click', function() {
      inboxClutteredBtn.classList.add('active');
      inboxSortedBtn.classList.remove('active');
      inboxClutteredView.classList.add('active');
      inboxSortedView.classList.remove('active');
    });

    inboxSortedBtn.addEventListener('click', function() {
      inboxSortedBtn.classList.add('active');
      inboxClutteredBtn.classList.remove('active');
      inboxSortedView.classList.add('active');
      inboxClutteredView.classList.remove('active');
    });
  }

  // Folder pill filter logic inside Sorted Inbox
  var folderPills = document.querySelectorAll('.folder-pill');
  var sortedRows = document.querySelectorAll('.sorted-row');

  folderPills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      folderPills.forEach(function(p) { p.classList.remove('active'); });
      this.classList.add('active');
      
      var targetFolder = this.getAttribute('data-folder');
      sortedRows.forEach(function(row) {
        if (targetFolder === 'all' || row.getAttribute('data-category') === targetFolder) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 4. Support & Sales Scripts view toggle
  var scriptChatBtn = document.getElementById('scriptChatBtn');
  var scriptCallBtn = document.getElementById('scriptCallBtn');
  var scriptChatView = document.getElementById('scriptChatView');
  var scriptCallView = document.getElementById('scriptCallView');

  if (scriptChatBtn && scriptCallBtn) {
    scriptChatBtn.addEventListener('click', function() {
      scriptChatBtn.classList.add('active');
      scriptCallBtn.classList.remove('active');
      scriptChatView.classList.add('active');
      scriptCallView.classList.remove('active');
    });

    scriptCallBtn.addEventListener('click', function() {
      scriptCallBtn.classList.add('active');
      scriptChatBtn.classList.remove('active');
      scriptCallView.classList.add('active');
      scriptChatView.classList.remove('active');
    });
  }

  // 5. Task & Data Tracker filtering logic
  var dashCards = document.querySelectorAll('.tracker-dashboard .dash-card');
  var trackerRows = document.querySelectorAll('#trackerTable tbody tr');
  var trackerSearch = document.getElementById('trackerSearch');

  function filterTrackerTable() {
    var activeCard = document.querySelector('.tracker-dashboard .dash-card.active-filter');
    var filterValue = activeCard ? activeCard.getAttribute('data-filter') : 'all';
    var query = trackerSearch ? trackerSearch.value.toLowerCase() : '';

    trackerRows.forEach(function(row) {
      var status = row.getAttribute('data-status');
      var priority = row.getAttribute('data-priority');
      var client = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      var description = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
      var category = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

      var matchesFilter = filterValue === 'all' || status === filterValue || priority === filterValue;
      var matchesSearch = client.indexOf(query) !== -1 || description.indexOf(query) !== -1 || category.indexOf(query) !== -1;

      if (matchesFilter && matchesSearch) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }

  dashCards.forEach(function(card) {
    card.addEventListener('click', function() {
      dashCards.forEach(function(c) { c.classList.remove('active-filter'); });
      this.classList.add('active-filter');
      filterTrackerTable();
    });
  });

  if (trackerSearch) {
    trackerSearch.addEventListener('input', filterTrackerTable);
  }

})();
