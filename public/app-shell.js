// Client shell for /app/[screen] pages. Loaded as a static asset (no bundler).
// Reads pre-rendered body + meta + data from the DOM and builds the app shell.
// In-app navigation is client-side (fetch + swap) so the session in memory is
// never re-checked and nav links never dead-end on a login bounce.
(function () {
  var KEY = 'atunse_demo_session';
  var META = JSON.parse(document.getElementById('screen-meta').textContent);
  var BODY = document.getElementById('body-src').innerHTML;
  var APP = JSON.parse(document.getElementById('app-data').textContent);
  var SCREENS = APP.screens, PERSONAS = APP.personas;
  var group = META.group, title = META.title, screenId = META.screenId;

  var sesh = null;
  try { sesh = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  // Fallback: if storage is empty/cleared, restore from ?p=<id> so the page
  // still renders instead of dead-ending on a login bounce.
  if (!sesh || !sesh.id) {
    try {
      var sp = new URLSearchParams(location.search).get('p');
      if (sp) {
        var fp = PERSONAS.find(function (x) { return x.id === sp; });
        if (fp) {
          sesh = { id: fp.id, name: fp.name, role: fp.role, username: fp.username, initials: fp.initials, accent: fp.accent, at: Date.now() };
          try { localStorage.setItem(KEY, JSON.stringify(sesh)); } catch (e2) {}
        }
      }
    } catch (e) {}
  }
  if (!sesh || !sesh.id) { location.replace('/'); return; }
  var me = PERSONAS.find(function (p) { return p.id === sesh.id; });
  if (!me) { location.replace('/'); return; }
  me = Object.assign({}, me, { name: sesh.name || me.name, role: sesh.role || me.role });

  function canView(g) {
    if (!me.allow) return false;
    if (me.deny && me.deny.indexOf(g) !== -1) return false;
    return me.allow.indexOf(g) !== -1;
  }
  if (!canView(group)) { location.replace('/app/dashboard/' + me.id + '/'); return; }

  var ORDER = [
    ['Overview', 'Dashboards'], ['Patients', 'Patient'], ['Appointments', 'Scheduling'],
    ['Clinical', 'Clinical'], ['Protocols', 'Protocols'], ['Trust & Governance', 'Compliance & Ledgers'],
    ['Billing', 'Billing & Finance'], ['Ogami', 'AI Assistant'], ['Reports', 'Operations & Intelligence'],
    ['Administration', 'Administration'], ['Mobile', 'Mobile']
  ];
  var CLINICAL_PATIENT = ['fe22f6b0e70e44e69c62b4c69019163d', 'e1c47f5b53fb4efeb13cd44e5e82cbfa', 'eaeb377d6e70427195a93f5f7fae47f5'];
  var MOBILE_HOME = '484bcbff1a75426cb9f6c1ee990f2e06';
  var P = '?p=' + me.id;
  function href(h) { return h.indexOf('?') === -1 ? h + P : h; }
  function screensFor(g) {
    if (g === 'Dashboards') return [{ title: 'My dashboard', href: '/app/dashboard/' + me.id + '/' + P, id: '__dash' }];
    if (g === 'Mobile') {
      var m = SCREENS.find(function (x) { return !x.asset && x.id === MOBILE_HOME; });
      return m ? [{ title: 'Mobile companion', href: '/app/' + m.id + '/' + P, id: m.id }] : [];
    }
    var list = SCREENS.filter(function (x) { return !x.asset && x.group === g; });
    if (g === 'Patient' && me.id !== 'patient') {
      list = list.filter(function (x) { return CLINICAL_PATIENT.indexOf(x.id) !== -1; });
    }
    return list.map(function (x) { return { title: x.title, href: '/app/' + x.id + '/' + P, id: x.id }; });
  }

  var root = document.getElementById('root');
  var stage, sidenav;

  function navHTML() {
    return ORDER.filter(function (o) { return canView(o[1]); })
      .map(function (o) {
        var items = screensFor(o[1]);
        if (!items.length) return '';
        var links = items.map(function (it) {
          var active = (it.id === screenId) ? ' active' : '';
          return '<a class="nav-link' + active + '" href="' + it.href + '" data-nav>' + it.title + '</a>';
        }).join('');
        return '<div class="nav-group"><div class="nav-group-label">' + o[0] + '</div>' + links + '</div>';
      }).join('');
  }

  function renderShell() {
    root.className = 'app-shell';
    root.innerHTML =
      '<aside class="sidenav"><div class="nav-head"><img src="/assets/atunse_gold_transparent.png" alt="Atunse Health" class="logo" /><span class="brand">Atunse Health</span></div>' +
      '<div class="who">' + me.name + ' &middot; <b>' + me.role + '</b></div>' +
      '<nav class="nav" id="sidenav">' + navHTML() + '</nav>' +
      '<div class="nav-foot"><a class="btn-logout" href="/?p=' + me.id + '" onclick="try{localStorage.removeItem(\'atunse_demo_session\');}catch(e){}">Log out</a></div></aside>' +
      '<section class="stage" id="stage"><header class="stage-bar"><span class="crumb" id="crumb">' + title + '</span>' +
      '<div class="user-chip"><div class="un"><div class="nm">' + me.name + '</div><div class="rl">' + me.role + '</div></div><div class="ava">' + (me.initials || me.name.charAt(0)) + '</div></div></header>' +
      '<div class="dash" id="dash"><a class="back" href="/app/dashboard/' + me.id + '/' + P + '" data-nav>&larr; Back to dashboard</a>' +
      '<h1 class="dash-greet" id="greet">' + title + '</h1><div id="bodywrap">' + BODY + '</div></div></section>';
    sidenav = document.getElementById('sidenav');
    stage = document.getElementById('stage');
    wireNav();
    applyPatientFilter();
  }

  // Client-side navigation: fetch target page, extract its body-src + meta, swap the stage.
  // No full reload => session in memory stays valid, links never dead-end.
  function navigate(href) {
    fetch(href, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var newMeta = doc.getElementById('screen-meta');
        var newBody = doc.getElementById('body-src');
        if (!newMeta || !newBody) { location.href = href; return; }
        var nm;
        try { nm = JSON.parse(newMeta.textContent); } catch (e) { location.href = href; return; }
        if (!canView(nm.group)) { location.href = '/app/dashboard/' + me.id + '/'; return; }
        screenId = nm.screenId; group = nm.group; title = nm.title;
        history.pushState({ href: href(href) }, '', href(href));
        document.getElementById('greet').textContent = title;
        document.getElementById('crumb').textContent = title;
        document.getElementById('bodywrap').innerHTML = newBody.innerHTML;
        // refresh active state in nav
        sidenav.innerHTML = navHTML();
        wireNav();
        applyPatientFilter();
        window.scrollTo(0, 0);
      })
      .catch(function () { location.href = href; });
  }

  function wireNav() {
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        navigate(a.getAttribute('href'));
      });
    });
  }

  function applyPatientFilter() {
    if (group !== 'Patient') return;
    if (me.id === 'patient') {
      document.querySelectorAll('[data-patient]').forEach(function (el) { el.hidden = (el.getAttribute('data-patient') !== 'ATN-000201'); });
      var sel = document.getElementById('ptSelect');
      if (sel) sel.value = 'ATN-000201';
    }
    // clinician/attending/mobile: first patient (Amina) visible by default
  }

  // Intercept back/forward
  window.addEventListener('popstate', function () { location.reload(); });

  renderShell();
})();
