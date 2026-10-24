class SpatialSoundEngine {
  constructor() {
    this.ctx = null;
    this.subDrone = null;
    this.activeNodes = [];
    this.timers = [];
    this.enabled = false;
    this.volume = 0.35;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.startSubDrone();
  }
  startSubDrone() {
    if (this.subDrone || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(32.4, this.ctx.currentTime);
    gain.gain.setValueAtTime(this.volume * 0.04, this.ctx.currentTime);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start();
    this.subDrone = osc;
  }
  playSpatialClick(freq = 520, panX = 0) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(this.volume * 0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    if (this.ctx.createStereoPanner) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panX)), now);
      osc.connect(gain); gain.connect(panner); panner.connect(this.ctx.destination);
    } else {
      osc.connect(gain); gain.connect(this.ctx.destination);
    }
    osc.start(now); osc.stop(now + 0.08);
  }
  playMicClick() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(140, now);
    gain.gain.setValueAtTime(this.volume * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.05);
  }
  playAnomalyStinger() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [190, 277, 587].forEach(freq => {
      const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.22);
      gain.gain.setValueAtTime(this.volume * 0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.22);
    });
  }
  startAmbient(levelId) {
    this.stopAmbient();
    if (!this.enabled) return;
    this.init();
    if (levelId === 'lvl-fun') {
      const notes = [329.63, 392.00, 493.88, 440.00, 392.00, 329.63, 293.66, 246.94];
      let step = 0;
      const playPluck = () => {
        if (!this.enabled) return;
        const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
        osc.type = 'sine';
        const detune = (step % 3 === 0) ? -3.5 : 0;
        osc.frequency.setValueAtTime(notes[step % notes.length] + detune, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(this.volume * 0.09, this.ctx.currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0008, this.ctx.currentTime + 1.35);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 1.4);
        step++;
      };
      playPluck();
      this.timers.push(setInterval(playPluck, 1450));
      return;
    }
    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
    osc.type = 'sine';
    const freqMap = { 'lvl-0': 44.1, 'lvl-9': 37, 'lvl-10': 33, 'lvl-11': 62, 'lvl-13': 29 };
    osc.frequency.setValueAtTime(freqMap[levelId] || 44, this.ctx.currentTime);
    gain.gain.setValueAtTime(this.volume * 0.05, this.ctx.currentTime);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start();
    this.activeNodes.push(osc);
  }
  stopAmbient() {
    this.activeNodes.forEach(node => { try { node.stop(); } catch (e) {} });
    this.activeNodes = [];
    this.timers.forEach(t => clearInterval(t));
    this.timers = [];
  }
  stopAll() {
    this.stopAmbient();
    if (this.subDrone) { try { this.subDrone.stop(); } catch(e){} this.subDrone = null; }
  }
}

var sound = new SpatialSoundEngine();
