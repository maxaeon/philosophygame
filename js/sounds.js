let sounds = {};
function preloadSounds() {
  sounds.transition = loadSound('assets/audio/transition.mp3');
  sounds.continue = loadSound('assets/audio/continue.mp3');
  sounds.dog = loadSound('assets/audio/dog.mp3');
  sounds.sheep = loadSound('assets/audio/sheep.mp3');
  sounds.pig = loadSound('assets/audio/pig.mp3');
  sounds.owl = loadSound('assets/audio/owl.mp3');
  sounds.donkey = loadSound('assets/audio/donkey.mp3');
  sounds.bat = loadSound('assets/audio/bat.mp3');
}
function playSound(name) {
  const s = sounds[name];
  if (s) s.play();
}
if (typeof window !== 'undefined') {
  window.preloadSounds = preloadSounds;
  window.playSound = playSound;
}
