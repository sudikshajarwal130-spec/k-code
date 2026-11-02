
const startBtn = document.getElementById("startBtn");
const soundBtn = document.getElementById("soundBtn");
const messageArea = document.getElementById("messageArea");
const loadingStatus = document.getElementById("loadingStatus");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const finalMessage = document.getElementById("finalMessage");

let soundEnabled = true;
let audioContext = null;
let isStarted = false;

const paragraphs = [
  "Karan, I don't think you realize how special you are to me. Sometimes, even the simplest conversations with you can make an ordinary day feel a little more beautiful. You have a way of making me smile without even trying. 💜",

  "I may not always find the perfect words to express what I feel, but I genuinely want you to know that your presence means a lot to me. It's not about grand gestures or perfect moments. It's about the little things that make you, YOU. ✨",

  "No matter how busy life gets, I hope you never forget that someone out here genuinely wishes the best for you. I want to see you grow, achieve everything you dream of, and always have reasons to smile. You deserve beautiful things. 🦋",

  "And finally, this entire little digital world was created just to remind you of one simple thing: you are appreciated, you are important, and you hold a very special place in my heart. Never doubt that. 💙"
];

// AUDIO INITIALIZATION
function setupAudio() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      console.log("Web Audio API is not supported.");
      return;
    }

    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

// LOUDER TYPING SOUND
function playKeySound() {
  if (!soundEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";

  // Randomized keyboard-like frequency
  oscillator.frequency.value = 750 + Math.random() * 500;

  // Increased sound level
  gain.gain.setValueAtTime(
    0.12,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.045
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);
}

// WAIT FUNCTION
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TYPE EACH PARAGRAPH
async function typeParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.className = "message";

  messageArea.appendChild(paragraph);

  for (let i = 0; i < text.length; i++) {
    paragraph.textContent += text[i];

    if (text[i] !== " " && i % 2 === 0) {
      playKeySound();
    }

    await wait(23);
  }

  await wait(500);
}

// MAIN DECRYPTION FUNCTION
async function startDecryption() {
  if (isStarted) return;

  isStarted = true;

  startBtn.disabled = true;
  startBtn.textContent = "DECRYPTING...";

  setupAudio();

  messageArea.innerHTML = "";

  loadingStatus.textContent =
    "ESTABLISHING SECURE CONNECTION";

  // PROGRESS ANIMATION
  for (let i = 0; i <= 100; i++) {
    progressFill.style.width = i + "%";
    progressPercent.textContent = i + "%";

    if (i === 30) {
      loadingStatus.textContent =
        "BYPASSING ENCRYPTION";
    }

    if (i === 65) {
      loadingStatus.textContent =
        "DECODING PRIVATE MESSAGE";
    }

    if (i === 100) {
      loadingStatus.textContent =
        "ACCESS GRANTED";
    }

    await wait(25);
  }

  await wait(500);

  // DISPLAY FOUR PARAGRAPHS
  for (const paragraph of paragraphs) {
    await typeParagraph(paragraph);
  }

  // FINAL REVEAL
  finalMessage.classList.remove("hidden");

  loadingStatus.textContent =
    "TRANSMISSION SUCCESSFUL";

  startBtn.textContent =
    "✓ DECRYPTION COMPLETE";
}

// START BUTTON
startBtn.addEventListener("click", startDecryption);

// SOUND ON / OFF BUTTON
soundBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;

  soundBtn.textContent = soundEnabled
    ? "♫ SOUND: ON"
    : "♫ SOUND: OFF";

  if (soundEnabled) {
    setupAudio();
  }
});
