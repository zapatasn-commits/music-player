// Select elements
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.textContent = '⏸️';
  audio.play();
  cover.style.animationPlayState = 'running';
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.textContent = '▶️';
  audio.pause();
  cover.style.animationPlayState = 'paused';
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Update progress bar + time
audio.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;

  // progress bar
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // time display
  currentTimeEl.textContent = formatTime(currentTime);
  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }
});

// Click progress bar to seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Format time helper
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Reset when song ends
audio.addEventListener('ended', () => {
  pauseSong();
  audio.currentTime = 0;
  progress.style.width = '0%';
  currentTimeEl.textContent = '0:00';
});
