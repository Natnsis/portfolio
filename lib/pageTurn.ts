// A paper page-turn "swish", synthesized with Web Audio so there's no file to load.
// Shaped noise: a rising rustle as the page lifts, then a soft flap as it lands.

const KEY = "nasi-book-sound";

let ctx: AudioContext | null = null;
const listeners = new Set<() => void>();

// For useSyncExternalStore, so the speaker icon follows the saved setting.
export const subscribeSound = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const soundOn = () => {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
};

export const setSoundOn = (on: boolean) => {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
};

const noise = (ac: AudioContext, seconds: number) => {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  return src;
};

export const playPageTurn = () => {
  if (!soundOn()) return;
  try {
    ctx ??= new AudioContext();
    const ac = ctx;
    if (ac.state === "suspended") void ac.resume();
    const t = ac.currentTime;

    // The rustle: band-passed noise sweeping upward as the page lifts.
    const rustle = noise(ac, 0.7);
    const band = ac.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.8;
    band.frequency.setValueAtTime(900, t);
    band.frequency.exponentialRampToValueAtTime(3600, t + 0.4);
    band.frequency.exponentialRampToValueAtTime(1400, t + 0.7);
    const rg = ac.createGain();
    rg.gain.setValueAtTime(0.0001, t);
    rg.gain.exponentialRampToValueAtTime(0.2, t + 0.18);
    rg.gain.exponentialRampToValueAtTime(0.06, t + 0.5);
    rg.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    rustle.connect(band).connect(rg).connect(ac.destination);
    rustle.start(t);

    // The flap: a short, low thump as the page settles.
    const flap = noise(ac, 0.08);
    const low = ac.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 500;
    const fg = ac.createGain();
    // Lands with the leaf (~0.9s turn, settling from ~0.75s).
    const land = t + 0.78;
    fg.gain.setValueAtTime(0.0001, land);
    fg.gain.exponentialRampToValueAtTime(0.35, land + 0.01);
    fg.gain.exponentialRampToValueAtTime(0.0001, land + 0.08);
    flap.connect(low).connect(fg).connect(ac.destination);
    flap.start(land);
  } catch {
    // Audio is a nicety; never let it break the page.
  }
};
