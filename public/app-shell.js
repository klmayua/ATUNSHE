// Client shell for /app/[screen] pages. Loaded as a static asset (no bundler).
// Reads pre-rendered body + meta + data from the DOM and builds the app shell.
(function () {
  var KEY = 'atunse_demo_session';
  var META = JSON.parse(document.getElementById('screen-meta').textContent);
  var BODY = document.getElementById('body-src').innerHTML;
  var APP = JSON.parse(document.getElementById('app-data').textContent);
  var SCREENS = APP.screens, PERSONAS = APP.personas;
  var group = META.group, title = META.title;

  var sesh = null;
  try { sesh = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!sesh) { location.replace('/'); return; }
  var me = PERSONAS.find(function (p) { return p.id === sesh.id; }) || sesh;

  function canView(g) {
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
  // Screens a non-patient sees under "Patients": the clinical record, not the portal home.
  var CLINICAL_PATIENT = ['fe22f6b0e70e44e69c62b4c69019163d', 'e1c47f5b53fb4efeb13cd44e5e82cbfa', 'eaeb377d6e70427195a93f5f7fae47f5'];
  function screensFor(g) {
    if (g === 'Dashboards') return [{ title: 'My dashboard', href: '/app/dashboard/' + me.id + '/', id: '__dash' }];
    var list = SCREENS.filter(function (x) { return !x.asset && x.group === g; });
    if (g === 'Patient' && me.id !== 'patient') {
      list = list.filter(function (x) { return CLINICAL_PATIENT.indexOf(x.id) !== -1; });
    }
    return list.map(function (x) { return { title: x.title, href: '/app/' + x.id + '/', id: x.id }; });
  }
  var nav = ORDER.filter(function (o) { return canView(o[1]); })
    .map(function (o) {
      var items = screensFor(o[1]);
      if (!items.length) return '';
      var links = items.map(function (it) {
        var active = (it.id === META.screenId) ? ' active' : '';
        return '<a class="nav-link' + active + '" href="' + it.href + '">' + it.title + '</a>';
      }).join('');
      return '<div class="nav-group"><div class="nav-group-label">' + o[0] + '</div>' + links + '</div>';
    }).join('');

  var root = document.getElementById('root');
  root.className = 'app-shell';
  root.innerHTML =
    '<aside class="sidenav"><div class="nav-head"><img src="/assets/atunse_gold_transparent.png" alt="Atunse Health" class="logo" /><span class="brand">Atunse Health</span></div>' +
    '<div class="who">' + me.name + ' &middot; <b>' + me.role + '</b></div>' +
    '<nav class="nav">' + nav + '</nav>' +
    '<div class="nav-foot"><a class="btn-logout" href="/" onclick="localStorage.removeItem(\'atunse_demo_session\');">Log out</a></div></aside>' +
    '<section class="stage"><header class="stage-bar"><span class="crumb">' + title + '</span></header>' +
    '<div class="dash"><a class="back" href="/app/dashboard/' + me.id + '/">&larr; Back to dashboard</a>' +
    '<h1 class="dash-greet">' + title + '</h1>' + BODY + '</div></section>';

  window.ATUNSE_showPatient = function (id) {
    root.querySelectorAll('[data-patient]').forEach(function (el) {
      el.hidden = (el.getAttribute('data-patient') !== id);
    });
  };
  if (group === 'Patient') {
    if (me.id === 'patient') {
      ATUNSE_showPatient('ATN-000201');
      var sel = root.querySelector('#ptSelect');
      if (sel) sel.value = 'ATN-000201';
    }
    // clinician/attending/mobile: first patient (Amina) already visible by default
  }
})();
