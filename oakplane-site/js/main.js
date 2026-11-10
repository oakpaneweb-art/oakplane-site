/* ==========================================================
   OAKPLANE OS - main.js
   Boot screen, pixel page transitions, sound, scroll reveals,
   project windows, contact form. No libraries.
   ========================================================== */
(function () {
  'use strict';

  /* ----- EDIT THESE ----------------------------------------- */
  var OAK = {
    email: 'hello@oakplane.com',
    // Get a free key at https://web3forms.com (enter hello@oakplane.com) and paste it here:
    web3formsKey: '8246d99b-1bf6-448d-86c2-6b3146ca8b80',
    // Paste your Calendly / Cal.com link here when you have one, e.g. 'https://calendly.com/your-name/intro'
    calendly: ''
  };
  /* ---------------------------------------------------------- */

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function mk(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function store(kind) {
    return {
      get: function (k) { try { return window[kind].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window[kind].setItem(k, v); } catch (e) {} }
    };
  }
  var local = store('localStorage'), session = store('sessionStorage');
  function ico(name) { return '<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>'; }

  /* ----- sound (off by default) ----------------------------- */
  var soundOn = local.get('oak-sound') === '1';
  var actx = null;
  function beep(freq, dur) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = 'square'; o.frequency.value = freq || 520; g.gain.value = 0.04;
      o.connect(g); g.connect(actx.destination); o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + (dur || 0.06));
      o.stop(actx.currentTime + (dur || 0.06) + 0.02);
    } catch (e) {}
  }
  document.addEventListener('pointerdown', function (e) {
    if (e.target.closest && e.target.closest('.btn,.dock-item,.dicon,.folder,.pick,.mb-btn,summary,.x')) beep(520, 0.05);
  });
  function paintSound(btn) {
    btn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    btn.querySelector('use').setAttribute('href', soundOn ? '#i-sound' : '#i-mute');
    btn.querySelector('span').textContent = soundOn ? 'Sound on' : 'Sound off';
  }
  $$('[data-sound]').forEach(function (btn) {
    paintSound(btn);
    btn.addEventListener('click', function () {
      soundOn = !soundOn; local.set('oak-sound', soundOn ? '1' : '0'); paintSound(btn); beep(soundOn ? 880 : 300, 0.1);
    });
  });

  /* ----- clock, year ---------------------------------------- */
  function tick() {
    var t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    $$('[data-clock]').forEach(function (n) { n.textContent = t; });
  }
  tick(); setInterval(tick, 20000);
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* ----- booking link (Calendly) ---------------------------- */
  var cal = (OAK.calendly || '').trim();
  $$('[data-calendly]').forEach(function (a) { if (cal) { a.href = cal; a.target = '_blank'; a.rel = 'noopener'; } });
  $$('[data-has-calendly]').forEach(function (n) { n.hidden = !cal; });
  $$('[data-no-calendly]').forEach(function (n) { n.hidden = !!cal; });

  /* ----- images with a fallback ------------------------------ */
  $$('img[data-fallback]').forEach(function (img) {
    function swap() { img.replaceWith(mk('span', '', ico(img.getAttribute('data-fallback')))); }
    if (img.complete && img.naturalWidth === 0) swap(); else img.addEventListener('error', swap);
  });

  /* ----- pixel transition ------------------------------------ */
  function makePx(mode) {
    var size = Math.max(64, Math.ceil(window.innerWidth / 26));
    var cols = Math.ceil(window.innerWidth / size), rows = Math.ceil(window.innerHeight / size);
    var el = mk('div', 'px ' + mode);
    el.setAttribute('aria-hidden', 'true');
    el.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
    el.style.gridTemplateRows = 'repeat(' + rows + ',1fr)';
    var frag = document.createDocumentFragment();
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var i = mk('i'), r = Math.random();
        i.style.background = r < 0.5 ? '#010514' : r < 0.74 ? '#000D35' : r < 0.95 ? '#0941FD' : '#63DEFE';
        i.style.setProperty('--d', Math.round((x + y) * 8 + Math.random() * 150) + 'ms');
        frag.appendChild(i);
      }
    }
    el.appendChild(frag);
    return el;
  }
  var leaving = false;
  function go(url) {
    if (leaving) return;
    leaving = true; beep(660, 0.08);
    document.body.appendChild(makePx('in'));
    setTimeout(function () { window.location.href = url; }, 650);
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    var u;
    try { u = new URL(a.href, window.location.href); } catch (err) { return; }
    if (['http:', 'https:', 'file:'].indexOf(u.protocol) < 0) return;
    if (u.origin !== window.location.origin) return;
    if (u.pathname === window.location.pathname && u.search === window.location.search) {
      if (!u.hash) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
      return; // same page: normal in-page jump
    }
    if (reduce) return;
    e.preventDefault(); go(u.href);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { leaving = false; $$('.px').forEach(function (n) { n.remove(); }); }
  });
  function revealIn() {
    if (reduce) { root.classList.remove('cover-on'); return; }
    var o = makePx('out');
    document.body.appendChild(o);
    root.classList.remove('cover-on');
    setTimeout(function () { o.remove(); }, 900);
  }

  /* ----- boot screen (first visit of a session) --------------- */
  var booted = session.get('oak-booted') === '1';
  function runBoot() {
    var lines = [
      'OAKPLANE OS  v1.0',
      '> checking creativity ......... OK',
      '> loading pixels .............. OK',
      '> warming up the statue ....... OK',
      '> ready.'
    ];
    var boot = mk('div', 'boot',
      '<img class="boot-logo" src="assets/oakplane-logo-small.png" alt="">' +
      '<pre class="boot-log" aria-hidden="true"></pre>' +
      '<div class="boot-bar" aria-hidden="true">' + new Array(13).join('<i></i>') + '</div>' +
      '<button class="btn btn-ghost boot-skip" type="button">Skip</button>');
    boot.setAttribute('role', 'status');
    boot.setAttribute('aria-label', 'Loading Oakplane OS');
    document.body.appendChild(boot);
    root.classList.remove('cover-on');
    var log = $('.boot-log', boot), bars = $$('.boot-bar i', boot), n = 0, finished = false, timers = [];
    function step() {
      if (n < lines.length) { log.textContent += (n ? '\n' : '') + lines[n]; n++; beep(300 + n * 120, 0.05); }
      var upto = Math.round(n / lines.length * bars.length);
      bars.forEach(function (b, i) { b.classList.toggle('on', i < upto); });
      if (n < lines.length) timers.push(setTimeout(step, 380)); else timers.push(setTimeout(finish, 450));
    }
    function finish() {
      if (finished) return; finished = true;
      timers.forEach(clearTimeout);
      session.set('oak-booted', '1');
      boot.classList.add('done');
      setTimeout(function () { boot.remove(); showNotice(); }, 450);
    }
    $('.boot-skip', boot).addEventListener('click', finish);
    document.addEventListener('keydown', function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter') { finish(); document.removeEventListener('keydown', onKey); } });
    step();
  }
  $$('[data-replay-boot]').forEach(function (b) {
    b.addEventListener('click', function () { session.set('oak-booted', '0'); runBoot(); });
  });

  /* ----- privacy window + cookie notice ----------------------- */
  var privacyDlg = null;
  function openPrivacy() {
    if (!privacyDlg) {
      privacyDlg = mk('dialog', 'win-dialog',
        '<div class="win"><div class="win-bar"><span class="win-btns" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="win-title">privacy.txt</span><form method="dialog"><button class="x" aria-label="Close">X</button></form></div>' +
        '<div class="win-body"><h2 id="priv-h">Privacy &amp; cookies</h2>' +
        '<p><b>Who I am.</b> Oakplane is a web development business run by Pedro Vasconcelos in Madrid, Spain. You can reach me at <a href="mailto:' + OAK.email + '">' + OAK.email + '</a>.</p>' +
        '<p><b>What I collect.</b> Only what you type into the contact form: your name, email address, message and the type of project you are interested in.</p>' +
        '<p><b>Why.</b> To reply to your message. I do not use it for anything else and I do not sell or share it.</p>' +
        '<p><b>Who handles it.</b> The form is sent through Web3Forms and delivered to my email inbox (Gmail).</p>' +
        '<p><b>How long.</b> I keep your message only as long as needed to answer you or to run a project together.</p>' +
        '<p><b>Your rights.</b> You can ask me to show, correct or delete your data at any time by emailing me. You can also complain to the Spanish data protection authority (AEPD).</p>' +
        '<p><b>Cookies.</b> This site does not use tracking or advertising cookies. It saves two small settings in your browser (whether sound is on and whether you closed the notice) and nothing else.</p>' +
        '</div></div>');
      privacyDlg.setAttribute('aria-labelledby', 'priv-h');
      privacyDlg.addEventListener('click', function (e) { if (e.target === privacyDlg) privacyDlg.close(); });
      document.body.appendChild(privacyDlg);
    }
    if (privacyDlg.showModal) privacyDlg.showModal(); else privacyDlg.setAttribute('open', '');
  }
  $$('[data-privacy]').forEach(function (b) { b.addEventListener('click', openPrivacy); });

  function showNotice() {
    if (local.get('oak-notice') === '1' || $('.notice')) return;
    var box = mk('aside', 'notice win',
      '<div class="win-bar"><span class="win-btns" aria-hidden="true"><i></i><i></i><i></i></span><span class="win-title">notice.txt</span></div>' +
      '<div class="win-body"><p>No tracking cookies here. I only remember two tiny settings in your browser.</p>' +
      '<div class="btn-row"><button class="btn" type="button" data-ok>' + ico('check') + 'Got it</button>' +
      '<button class="linkbtn" type="button" data-more>Read more</button></div></div>');
    box.setAttribute('aria-label', 'Cookie notice');
    document.body.appendChild(box);
    $('[data-ok]', box).addEventListener('click', function () { local.set('oak-notice', '1'); box.remove(); });
    $('[data-more]', box).addEventListener('click', openPrivacy);
  }
  if (booted || reduce) setTimeout(showNotice, 1200);

  /* ----- scroll reveals + process bar ------------------------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('is-in'); io.unobserve(it.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
  }
  var process = $('[data-process]');
  if (process) {
    var segs = $$('.pbar i', process), steps = $$('.steps li', process);
    function runProcess() {
      segs.forEach(function (s, i) {
        setTimeout(function () { s.classList.add('on'); if (steps[i]) steps[i].classList.add('on'); beep(380 + i * 90, 0.05); }, reduce ? 0 : i * 450);
      });
    }
    if ('IntersectionObserver' in window && !reduce) {
      var po = new IntersectionObserver(function (items) {
        if (items[0].isIntersecting) { po.disconnect(); runProcess(); }
      }, { threshold: 0.35 });
      po.observe(process);
    } else { runProcess(); }
  }

  /* ----- concept project illustrations ------------------------ */
  var PROJECTS = {
    cafe: {
      name: 'Brew & Bloom', type: 'Neighbourhood café & florist', file: 'brew-and-bloom.exe',
      text: 'A warm one-page site with the menu, opening hours and a map. A reservation form sends each booking straight to the owner\'s inbox.',
      tags: ['One page', 'Contact form', 'Google Maps'],
      colors: ['#F6E7CC', '#C8553D', '#2E1F14']
    },
    physio: {
      name: 'Peak Physio', type: 'Physiotherapy clinic', file: 'peak-physio.exe',
      text: 'A five-page site covering services, the team and prices, with an online booking link. The layout is built for people booking from their phone.',
      tags: ['5 pages', 'Online booking', 'Mobile first'],
      colors: ['#E4F4F1', '#1F8A8A', '#0E3B43']
    },
    verde: {
      name: 'Studio Verde', type: 'Architecture studio', file: 'studio-verde.exe',
      text: 'A portfolio-first site with a project gallery and an enquiry form. The layout stays quiet so the photography carries every page.',
      tags: ['Gallery', 'Enquiry form', 'Fast loading'],
      colors: ['#EDF0E4', '#3C6E47', '#1B2A1E']
    }
  };
  function mock(kind) {
    var c = PROJECTS[kind].colors, bg = c[0], ac = c[1], dk = c[2];
    var s = '<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="320" height="200" fill="' + bg + '"/>' +
      '<rect width="320" height="22" fill="#010514"/><circle cx="12" cy="11" r="3.5" fill="#EAF1FF"/><circle cx="24" cy="11" r="3.5" fill="#63DEFE"/><circle cx="36" cy="11" r="3.5" fill="#0941FD"/>' +
      '<rect x="56" y="6" width="150" height="10" rx="5" fill="#0B1A55"/>';
    if (kind === 'cafe') {
      s += '<rect x="16" y="32" width="60" height="8" rx="4" fill="' + dk + '"/><rect x="230" y="34" width="22" height="5" rx="2.5" fill="' + ac + '"/><rect x="262" y="34" width="22" height="5" rx="2.5" fill="' + ac + '"/>' +
        '<rect x="20" y="62" width="130" height="14" rx="3" fill="' + dk + '"/><rect x="20" y="82" width="100" height="14" rx="3" fill="' + dk + '"/>' +
        '<rect x="20" y="108" width="110" height="6" rx="3" fill="' + dk + '" opacity=".45"/><rect x="20" y="120" width="90" height="6" rx="3" fill="' + dk + '" opacity=".45"/>' +
        '<rect x="20" y="138" width="64" height="20" rx="10" fill="' + ac + '"/>' +
        '<rect x="176" y="50" width="128" height="104" rx="16" fill="' + ac + '"/><circle cx="240" cy="102" r="30" fill="' + bg + '"/><rect x="224" y="90" width="32" height="26" rx="6" fill="' + dk + '"/>' +
        '<rect x="20" y="170" width="86" height="22" rx="6" fill="' + dk + '" opacity=".14"/><rect x="117" y="170" width="86" height="22" rx="6" fill="' + dk + '" opacity=".14"/><rect x="214" y="170" width="86" height="22" rx="6" fill="' + dk + '" opacity=".14"/>';
    } else if (kind === 'physio') {
      s += '<rect x="16" y="32" width="50" height="8" rx="4" fill="' + dk + '"/><rect x="200" y="34" width="26" height="5" rx="2.5" fill="' + ac + '"/><rect x="236" y="34" width="26" height="5" rx="2.5" fill="' + ac + '"/><rect x="272" y="34" width="26" height="5" rx="2.5" fill="' + ac + '"/>' +
        '<rect x="70" y="60" width="180" height="14" rx="3" fill="' + dk + '"/><rect x="100" y="80" width="120" height="14" rx="3" fill="' + dk + '"/>' +
        '<rect x="115" y="104" width="90" height="6" rx="3" fill="' + dk + '" opacity=".45"/>' +
        '<rect x="125" y="120" width="70" height="20" rx="10" fill="' + ac + '"/>' +
        [20, 117, 214].map(function (x) { return '<rect x="' + x + '" y="152" width="86" height="40" rx="8" fill="#fff"/><circle cx="' + (x + 18) + '" cy="168" r="8" fill="' + ac + '"/><rect x="' + (x + 32) + '" y="162" width="40" height="5" rx="2.5" fill="' + dk + '"/><rect x="' + (x + 32) + '" y="172" width="30" height="5" rx="2.5" fill="' + dk + '" opacity=".4"/>'; }).join('');
    } else {
      s += '<rect y="22" width="86" height="178" fill="' + dk + '"/><rect x="14" y="38" width="50" height="9" rx="4" fill="' + bg + '"/>' +
        [64, 82, 100, 118].map(function (y) { return '<rect x="14" y="' + y + '" width="' + (46 + (y % 3) * 6) + '" height="6" rx="3" fill="' + bg + '" opacity=".55"/>'; }).join('') +
        '<rect x="14" y="160" width="54" height="18" rx="9" fill="' + ac + '"/>' +
        '<rect x="100" y="34" width="106" height="74" rx="6" fill="' + ac + '"/><rect x="214" y="34" width="94" height="74" rx="6" fill="' + dk + '"/>' +
        '<rect x="100" y="116" width="62" height="74" rx="6" fill="' + dk + '" opacity=".75"/><rect x="170" y="116" width="138" height="74" rx="6" fill="' + ac + '" opacity=".6"/>' +
        '<path d="M100 108l30-28 24 20 20-14 32 22z" fill="' + bg + '" opacity=".55"/>';
    }
    return s + '</svg>';
  }
  $$('[data-mock]').forEach(function (n) { if (PROJECTS[n.getAttribute('data-mock')]) n.innerHTML = mock(n.getAttribute('data-mock')); });

  var dlg = $('#project-dialog');
  function openProject(key) {
    var p = PROJECTS[key];
    if (!dlg || !p) return;
    $('#pd-file').textContent = p.file;
    $('#pd-thumb').innerHTML = mock(key);
    $('#pd-thumb').setAttribute('aria-label', 'Preview illustration of the ' + p.name + ' concept site');
    $('#pd-title').textContent = p.name;
    $('#pd-type').textContent = p.type;
    $('#pd-text').textContent = p.text;
    $('#pd-tags').innerHTML = p.tags.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
    try { history.replaceState(null, '', '#' + key); } catch (e) {}
  }
  if (dlg) {
    $$('[data-project]').forEach(function (b) { b.addEventListener('click', function () { openProject(b.getAttribute('data-project')); }); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { try { history.replaceState(null, '', window.location.pathname); } catch (e) {} });
    var h = window.location.hash.replace('#', '');
    if (PROJECTS[h]) setTimeout(function () { openProject(h); }, reduce ? 400 : (booted ? 900 : 3300));
  }

  /* ----- contact form ----------------------------------------- */
  var form = $('#contact-form');
  if (form) {
    var status = $('.form-status', form), send = $('button[type=submit]', form);
    function say(msg, bad) { status.textContent = msg; status.className = 'form-status' + (bad ? ' err' : ''); }
    function fly() {
      if (reduce) return;
      var r = send.getBoundingClientRect();
      var el = mk('div', 'fly', ico('mail'));
      el.style.left = (r.left + 16) + 'px'; el.style.top = (r.top + 4) + 'px';
      document.body.appendChild(el);
      var a = el.animate([
        { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'translate(' + Math.round(window.innerWidth * 0.35) + 'px,' + (-Math.round(window.innerHeight * 0.6)) + 'px) rotate(28deg) scale(.4)', opacity: 0 }
      ], { duration: 900, easing: 'cubic-bezier(.4,0,.2,1)' });
      a.onfinish = function () { el.remove(); };
    }
    function done() {
      fly();
      setTimeout(function () {
        $('[data-form-body]').hidden = true;
        var ok = $('[data-sent]'); ok.hidden = false;
        var hd = $('h2', ok); hd.setAttribute('tabindex', '-1'); hd.focus();
        beep(784, 0.12);
      }, reduce ? 0 : 500);
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.elements.botcheck && form.elements.botcheck.checked) { done(); return; } // spam bot: pretend it worked
      if (!OAK.web3formsKey || OAK.web3formsKey === 'YOUR_ACCESS_KEY_HERE') {
        say('The form is not connected yet. Add your Web3Forms key in js/main.js (see README). Until then, email me at ' + OAK.email + '.', true);
        return;
      }
      var fd = new FormData(form), data = {};
      fd.forEach(function (v, k) { data[k] = v; });
      data.access_key = OAK.web3formsKey;
      send.disabled = true; say('Sending...');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && res.success) { say(''); done(); }
        else { send.disabled = false; say('Something went wrong. Please email me directly at ' + OAK.email + '.', true); }
      }).catch(function () {
        send.disabled = false; say('Could not send (are you offline?). Please email me directly at ' + OAK.email + '.', true);
      });
    });
  }

  /* ----- start ------------------------------------------------ */
  if (!booted && !reduce) runBoot();
  else { session.set('oak-booted', '1'); revealIn(); }
})();
