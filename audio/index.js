const AudioContext = require("web-audio-engine").RenderingAudioContext;
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");

async function playWoodwind(note, duration) {
  const audioCtx = new AudioContext();

  const frequency = noteToFrequency(note);

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  // Oscillator settings (square wave for clarinet-like tone)
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  // Bandpass filter to shape the timbre
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency * 2, audioCtx.currentTime);
  filter.Q.setValueAtTime(20, audioCtx.currentTime); // Resonance

  // Amplitude envelope (ADSR)
  gainNode.gain.setValueAtTime(0.6, 0); // Sustain

  for (let t = 0; t * 1000 < duration; t += 2) {
    gainNode.gain.exponentialRampToValueAtTime(0.3, t + 1);
    gainNode.gain.exponentialRampToValueAtTime(0.6, t + 2);
  }

  // Connect nodes
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();

  oscillator.stop(duration / 1000);

  audioCtx.processTo("5");

  const audioData = audioCtx.exportAsAudioData();

  const arrayBuffer = await audioCtx.encodeAudioData(audioData);
  fs.writeFileSync("temp.wav", Buffer.from(arrayBuffer));
  await new Promise((resolve) =>
    ffmpeg("temp.wav")
      .audioCodec("libmp3lame")
      .format("mp3")
      .on("end", () => {
        console.log("Conversion finished!");
        resolve();
      })
      .on("error", (err) => {
        console.error("An error occurred:", err);
      })
      .pipe(
        fs.createWriteStream(
          `${note.replace("b", "Flat").replace("#", "Sharp")}.mp3`
        )
      )
  );
}

function noteToFrequency(note) {
  const A4 = 440;
  const notes = {
    C: -9,
    "C#": -8,
    Db: -8,
    D: -7,
    "D#": -6,
    Eb: -6,
    E: -5,
    F: -4,
    "F#": -3,
    Gb: -3,
    G: -2,
    "G#": -1,
    Ab: -1,
    A: 0,
    "A#": 1,
    Bb: 1,
    B: 2,
  };

  const match = note.match(/^([A-Ga-g]#?|b?)(\d)$/);
  if (!match) return A4;

  const [, pitch, octave] = match;
  const semitoneOffset = notes[pitch.toUpperCase()] + (octave - 4) * 12;

  return A4 * Math.pow(2, semitoneOffset / 12);
}

async function exportNote(note) {
  await playWoodwind(note, 5000);
}

const notes = ["C", "D", "E", "F", "G", "A", "B"];
const octaves = [2, 3, 4, 5, 6];
const modifiers = ["b", "", "#"];

async function main() {
  for (let octave of octaves) {
    for (let note of notes) {
      for (let modifier of modifiers) {
        await exportNote(`${note}${octave}${modifier}`);
      }
    }
  }
}
main();
