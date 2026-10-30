const clamp = (value) => Math.max(0, Math.min(1, Number(value) || 0));

/** Procedural, asset-free sound. Audio is only activated following a user gesture. */
export class AudioManager {
  constructor() {
    this.volume = 0.55;
    this.musicVolume = 0;
    this.muted = false;
    this.context = null;
    this.lastCollision = 0;
    this.voices = new Set();
    this.music = [];
    this.unlock = () => this.resume();
    if (typeof window !== "undefined") {
      window.addEventListener("pointerdown", this.unlock);
      window.addEventListener("keydown", this.unlock);
    }
  }

  resume() {
    if (typeof window === "undefined") return;
    try {
      if (!this.context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.effects = this.context.createGain();
        this.musicGain = this.context.createGain();
        this.effects.connect(this.master);
        this.musicGain.connect(this.master);
        this.master.connect(this.context.destination);
        this.updateVolumes();
      }
      if (this.context.state === "suspended")
        this.context.resume().catch(() => {});
      if (this.musicVolume > 0 && !this.music.length) this.startMusic();
    } catch {
      /* Audio is optional on restricted browsers. */
    }
  }

  updateVolumes() {
    if (!this.context) return;
    const now = this.context.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 1, now, 0.03);
    this.effects.gain.setTargetAtTime(this.volume * 0.45, now, 0.03);
    this.musicGain.gain.setTargetAtTime(this.musicVolume * 0.035, now, 0.15);
  }

  setVolume(value) {
    this.volume = clamp(value);
    this.updateVolumes();
  }
  setMusicVolume(value) {
    this.musicVolume = clamp(value);
    if (this.context && this.musicVolume > 0 && !this.music.length)
      this.startMusic();
    this.updateVolumes();
  }
  setMuted(value) {
    this.muted = Boolean(value);
    this.updateVolumes();
  }

  tone(
    frequency,
    duration,
    strength,
    type = "sine",
    delay = 0,
    endFrequency = frequency,
  ) {
    if (!this.context || this.voices.size > 30) return;
    const time = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(20, endFrequency),
      time + duration,
    );
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(Math.max(0.0001, strength), time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(gain);
    gain.connect(this.effects);
    this.voices.add(oscillator);
    oscillator.onended = () => {
      this.voices.delete(oscillator);
      oscillator.disconnect();
      gain.disconnect();
    };
    oscillator.start(time);
    oscillator.stop(time + duration + 0.01);
  }

  play(type, strength = 1) {
    if (
      this.muted ||
      this.volume === 0 ||
      !this.context ||
      this.context.state !== "running"
    )
      return;
    strength = Math.max(0.08, Math.min(1, strength));
    if (type === "collision" || type === "ball") {
      const now = this.context.currentTime;
      if (now - this.lastCollision < 0.012) return;
      this.lastCollision = now;
      this.tone(1700, 0.045, strength * 0.7, "sine", 0, 390);
      this.tone(450, 0.035, strength * 0.22, "triangle");
    } else if (type === "cue" || type === "shoot") {
      this.tone(320, 0.08, strength * 0.7, "triangle", 0, 90);
      this.tone(1800, 0.025, strength * 0.4, "sine", 0, 500);
    } else if (type === "cushion") {
      this.tone(180, 0.075, strength * 0.6, "triangle", 0, 65);
    } else if (type === "pocket") {
      this.tone(160, 0.2, strength * 0.6, "sine", 0, 38);
      this.tone(440, 0.07, strength * 0.18, "triangle", 0.08, 190);
    } else if (type === "win" || type === "victory") {
      [523.25, 659.25, 783.99, 1046.5].forEach((note, index) =>
        this.tone(note, 0.45, 0.24, "sine", index * 0.13),
      );
    } else if (type === "lose" || type === "defeat") {
      [392, 349.23, 293.66].forEach((note, index) =>
        this.tone(note, 0.4, 0.22, "sine", index * 0.15),
      );
    } else {
      this.tone(760, 0.045, 0.18, "sine", 0, 580);
    }
  }

  startMusic() {
    if (!this.context || this.music.length) return;
    // A quiet, slowly breathing chord; no downloaded assets or autoplay dependency.
    [130.8128, 164.8138, 195.9977].forEach((frequency, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      const lfo = this.context.createOscillator();
      const depth = this.context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.2;
      lfo.frequency.value = 0.07 + index * 0.025;
      depth.gain.value = 0.06;
      lfo.connect(depth);
      depth.connect(gain.gain);
      oscillator.connect(gain);
      gain.connect(this.musicGain);
      oscillator.start();
      lfo.start();
      this.music.push({ oscillator, gain, lfo, depth });
    });
  }

  dispose() {
    if (typeof window !== "undefined") {
      window.removeEventListener("pointerdown", this.unlock);
      window.removeEventListener("keydown", this.unlock);
    }
    for (const oscillator of this.voices) {
      try {
        oscillator.stop();
      } catch {}
    }
    this.voices.clear();
    for (const voice of this.music) {
      voice.oscillator.stop();
      voice.lfo.stop();
      voice.oscillator.disconnect();
      voice.gain.disconnect();
      voice.lfo.disconnect();
      voice.depth.disconnect();
    }
    this.music = [];
    this.context?.close().catch(() => {});
    this.context = null;
  }
}

export default AudioManager;
