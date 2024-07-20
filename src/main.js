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
