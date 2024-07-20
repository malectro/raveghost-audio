console.log('hi');

const context = new AudioContext();
const audioNode = document.querySelector('audio');
const mediaElementSource = context.createMediaElementSource(audioNode);

mediaElementSource.connect(context.destination);

console.log('registering');
document.body.addEventListener('click', () => {
  console.log('starting');
  context.resume();
  if (audioNode.paused) {
    audioNode.play();
  } else {
    audioNode.pause();
  }
});

const controls = document.querySelector('.controls');
audioNode.addEventListener('play', () => {
  controls.classList.replace('paused', 'playing');
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
