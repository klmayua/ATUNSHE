// Client-side demo auth. NOT real security — this is a clickable mock demo.
// The "session" is just a localStorage flag so the gate works on a static Vercel deploy.
const KEY = 'atunse_demo_session';

export function isAuthed() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function login(persona) {
  if (!persona) return false;
  localStorage.setItem(
    KEY,
    JSON.stringify({
      id: persona.id,
      name: persona.name,
      role: persona.role,
      username: persona.username,
      initials: persona.initials,
      accent: persona.accent,
      landing: persona.landing,
      at: Date.now(),
    })
  );
  return true;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function guard() {
  // Call on app pages at load. Returns the session or redirects to login.
  const s = isAuthed();
  if (!s) window.location.replace('/');
  return s;
}
