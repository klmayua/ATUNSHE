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
  function firstHref(g) {
    var sc = SCREENS.find(function (x) { return !x.asset && x.group === g; });
    return sc ? '/app/' + sc.id + '/' : '/app/dashboard/' + me.id + '/';
  }
  var nav = ORDER.filter(function (o) { return canView(o[1]); })
    .map(function (o) {
      var href = o[1] === 'Dashboards' ? '/app/dashboard/' + me.id + '/' : firstHref(o[1]);
      var active = o[1] === group ? ' active' : '';
      return '<a class="nav-link' + active + '" href="' + href + '">' + o[0] + '</a>';
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
