console.log('hi');

const context = new AudioContext();
const audioNode = document.querySelector('audio');
const mediaElementSource = context.createMediaElementSource(audioNode);

mediaElementSource.connect(context.destination);

function playPause() {
  if (audioNode.paused) {
    context.resume();
    audioNode.play();
  } else {
    audioNode.pause();
  }
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    playPause();
  }
});

const controls = document.querySelector('.controls');
controls.querySelector('.play').addEventListener('click', () => {
  context.resume();
  audioNode.play();
});
audioNode.addEventListener('play', () => {
  controls.classList.replace('paused', 'playing');
});
controls.querySelector('.pause').addEventListener('click', () => {
  audioNode.pause();
});
audioNode.addEventListener('pause', () => {
  controls.classList.replace('playing', 'paused');
});
audioNode.addEventListener('timeupdate', schedulePaint);

let paintScheduled = false;
const progress = controls.querySelector('.progress');
function schedulePaint() {
  if (paintScheduled) {
    return;
  }

  requestAnimationFrame(() => {
    const percent = 100 * audioNode.currentTime / audioNode.duration;
    progress.style.width = `${percent}%`; 
  });
}
