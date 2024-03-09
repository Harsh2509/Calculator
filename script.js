const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");

playButton.addEventListener("click", () => {
  playText(textInput.value);
});

pauseButton.addEventListener("click", pauseText);

stopButton.addEventListener("click", stopText);

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speading)
    return speechSynthesis.resume();

  if (speechSynthesis.speaking) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = speedInput.value || 1;
  utterance.addEventListener("end", () => {
    textInput.disabled = false;
  });
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
