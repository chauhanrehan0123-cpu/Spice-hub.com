// Web Audio API Ambient Synthesizer for Spice Hub Restro Café
// Synthesizes cozy café atmosphere: warm vinyl crackle, gentle rain/steam, and a soft elegant reservation chime.

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  
  // Audio Nodes
  private vinylNode: AudioNode | null = null;
  private rainNode: AudioNode | null = null;
  private gainVinyl: GainNode | null = null;
  private gainRain: GainNode | null = null;
  private gainMaster: GainNode | null = null;

  constructor() {}

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    
    // Create master gain
    this.gainMaster = this.ctx.createGain();
    this.gainMaster.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.gainMaster.connect(this.ctx.destination);
    
    this.setupVinyl();
    this.setupRain();
  }

  // Synthesizes a warm crackle & hum of a vintage vinyl record player
  private setupVinyl() {
    if (!this.ctx || !this.gainMaster) return;

    // 1. Low frequency hum (oscillator)
    const hum = this.ctx.createOscillator();
    hum.type = "sine";
    hum.frequency.setValueAtTime(50, this.ctx.currentTime); // 50Hz hum

    const humFilter = this.ctx.createBiquadFilter();
    humFilter.type = "lowpass";
    humFilter.frequency.setValueAtTime(80, this.ctx.currentTime);

    // 2. Crackle noise generator (White noise with custom spikes)
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      // Base pink-ish low noise
      let white = Math.random() * 2 - 1;
      // Inject random pop crackles
      const crackleProb = 0.0005;
      if (Math.random() < crackleProb) {
        white += (Math.random() > 0.5 ? 1 : -1) * 0.8;
      }
      output[i] = white * 0.015;
    }

    const crackleSource = this.ctx.createBufferSource();
    crackleSource.buffer = noiseBuffer;
    crackleSource.loop = true;

    // Filters for crackles to sound dust-worn
    const crackleFilter = this.ctx.createBiquadFilter();
    crackleFilter.type = "bandpass";
    crackleFilter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    crackleFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Gains
    this.gainVinyl = this.ctx.createGain();
    this.gainVinyl.gain.setValueAtTime(0, this.ctx.currentTime); // start silent

    // Connections
    hum.connect(humFilter);
    humFilter.connect(this.gainVinyl);
    
    crackleSource.connect(crackleFilter);
    crackleFilter.connect(this.gainVinyl);

    this.gainVinyl.connect(this.gainMaster);

    // Start sound sources
    hum.start(0);
    crackleSource.start(0);
    
    this.vinylNode = hum; // keep reference
  }

  // Synthesizes gentle rain / coffee steam using pink-filtered white noise
  private setupRain() {
    if (!this.ctx || !this.gainMaster) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate pinkish/brownish rain noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.012; // make quiet
      b6 = white * 0.115926;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime); // muffled gentle sound

    this.gainRain = this.ctx.createGain();
    this.gainRain.gain.setValueAtTime(0, this.ctx.currentTime); // start silent

    rainSource.connect(filter);
    filter.connect(this.gainRain);
    this.gainRain.connect(this.gainMaster);

    rainSource.start(0);
    this.rainNode = rainSource;
  }

  // Play a gorgeous, warm chime when reserving a table
  public playChime() {
    this.init();
    if (!this.ctx) return;
    
    // Ensure context is running (needed due to browser user-gesture restrictions)
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    // Ethereal complex chime: 3 warm frequencies
    const frequencies = [329.63, 392.00, 493.88, 587.33]; // E4, G4, B4, D5 (E min 7 chord)
    
    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      const delay = idx * 0.12; // Arpeggiated chime
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      // Lowpass filter for warm tone
      const filter = this.ctx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now + delay);

      // Envelope: gentle attack, long smooth release
      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.08, now + delay + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.0);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.gainMaster!);
      
      osc.start(now + delay);
      osc.stop(now + delay + 2.2);
    });
  }

  // Set individual volumes smoothly
  public setVolumes(vinylVol: number, rainVol: number, masterVol: number) {
    this.init();
    if (!this.ctx) return;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    if (this.gainVinyl) {
      this.gainVinyl.gain.linearRampToValueAtTime(vinylVol * 0.35, now + 0.2);
    }
    if (this.gainRain) {
      this.gainRain.gain.linearRampToValueAtTime(rainVol * 0.3, now + 0.2);
    }
    if (this.gainMaster) {
      this.gainMaster.gain.linearRampToValueAtTime(masterVol * 0.5, now + 0.2);
    }
  }

  // Resume context safely
  public resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
}

export const AmbientSynth = new AmbientSoundEngine();
