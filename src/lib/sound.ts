// Procedural ambient soundscape. No audio files, no autoplay:
// the AudioContext is only created after an explicit user toggle.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let started = false;

function build(audio: AudioContext) {
  const now = audio.currentTime;
  master = audio.createGain();
  master.gain.value = 0;
  master.connect(audio.destination);

  // Warm low pad (two detuned oscillators through a lowpass)
  const padGain = audio.createGain();
  padGain.gain.value = 0.22;
  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 520;
  filter.Q.value = 0.7;
  padGain.connect(filter).connect(master);

  [55, 82.4, 110.1].forEach((freq, i) => {
    const osc = audio.createOscillator();
    osc.type = i === 2 ? 'triangle' : 'sine';
    osc.frequency.value = freq;
    osc.detune.value = (i - 1) * 6;
    const g = audio.createGain();
    g.gain.value = i === 2 ? 0.18 : 0.4;
    osc.connect(g).connect(padGain);
    osc.start(now);
  });

  // Slow filter drift for movement
  const lfo = audio.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoGain = audio.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start(now);

  // Airy noise bed
  const bufferLength = audio.sampleRate * 2;
  const buffer = audio.createBuffer(1, bufferLength, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferLength; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const noiseFilter = audio.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 900;
  noiseFilter.Q.value = 0.5;
  const noiseGain = audio.createGain();
  noiseGain.gain.value = 0.03;
  noise.connect(noiseFilter).connect(noiseGain).connect(master);
  noise.start(now);
}

export async function setSound(on: boolean) {
  if (typeof window === 'undefined') return;
  if (on) {
    if (!ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') await ctx.resume();
    if (!started) {
      build(ctx);
      started = true;
    }
    master?.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.6);
  } else if (ctx && master) {
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
}
