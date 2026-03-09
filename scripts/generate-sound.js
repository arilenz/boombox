// Generate a simple beep WAV file
const fs = require('fs');

const sampleRate = 44100;
const duration = 0.3; // seconds
const frequency = 880; // Hz (A5 note)
const numSamples = Math.floor(sampleRate * duration);

// WAV header + PCM data
const buffer = Buffer.alloc(44 + numSamples * 2);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);

// fmt chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);       // chunk size
buffer.writeUInt16LE(1, 20);        // PCM format
buffer.writeUInt16LE(1, 22);        // mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
buffer.writeUInt16LE(2, 32);        // block align
buffer.writeUInt16LE(16, 34);       // bits per sample

// data chunk
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  // Fade in/out envelope to avoid clicks
  const envelope = Math.min(1, t * 20) * Math.min(1, (duration - t) * 20);
  const sample = Math.sin(2 * Math.PI * frequency * t) * 0.5 * envelope;
  buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
}

fs.writeFileSync(__dirname + '/beep.wav', buffer);
console.log('Generated beep.wav');
