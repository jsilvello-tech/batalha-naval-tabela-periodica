// Sintetizador Sonoro Procedural usando Web Audio API Nativo
// 100% autônomo, offline e sem arquivos de áudio externos

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initAudioOnUserGesture();
  }

  initAudioOnUserGesture() {
    const unlock = () => {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Clique de botão / seleção
  playClick() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Disparo de canhão / míssil atômico
  playShot() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  // FOGO! Acerto em elemento com frota inimiga
  playHit() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    // Ruído percussivo + onda grave
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    // Oscilador de laser agudo
    const laser = ctx.createOscillator();
    const laserGain = ctx.createGain();
    laser.type = 'sawtooth';
    laser.frequency.setValueAtTime(900, ctx.currentTime);
    laser.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.2);
    laserGain.gain.setValueAtTime(0.15, ctx.currentTime);
    laserGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    laser.connect(laserGain);
    gain.connect(ctx.destination);
    laserGain.connect(ctx.destination);

    osc.start();
    laser.start();
    osc.stop(ctx.currentTime + 0.35);
    laser.stop(ctx.currentTime + 0.2);
  }

  // ÁGUA! Tiro na água / elemento vazio
  playMiss() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  // AFUNDOU! Embarcação inteiramente destruída
  playSink() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const freqs = [330, 260, 195, 130];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.1;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  // Radar / Sonda de Nêutrons ativada
  playRadar() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }

  // Vitória triunfante
  playVictory() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Dó maior arpejo
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  // Erro / Ação inválida
  playError() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.setValueAtTime(120, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }
}

const soundFX = new SoundFX();
