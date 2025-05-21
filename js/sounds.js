let sounds = {};
function preloadSounds() {
  sounds.transition = loadSound('assets/audio/transition.wav');
  sounds.continue = loadSound('assets/audio/continue.wav');
  sounds.dog = loadSound('assets/audio/dog.wav');
  sounds.sheep = loadSound('assets/audio/sheep.wav');
  sounds.pig1 = loadSound('assets/audio/pig1.wav');
  sounds.pig2 = loadSound('assets/audio/pig2.wav');
  sounds.owl = loadSound('assets/audio/owl.wav');
  sounds.donkey = loadSound('assets/audio/donkey.mp3');
  sounds.bat = loadSound('assets/audio/bat.wav');
  sounds.graytortiecat = loadSound('assets/audio/cat1.wav');
  sounds.orangecat = loadSound('assets/audio/cat2.wav');
  sounds.back = loadSound('assets/audio/back.wav');
}
function playSound(name) {
  let s;
  if (name === 'pig') {
    const opts = [sounds.pig1, sounds.pig2].filter(Boolean);
    if (opts.length) s = opts[Math.floor(Math.random() * opts.length)];
  } else {
    s = sounds[name];
  }
  if (s) s.play();
}
if (typeof window !== 'undefined') {
  window.preloadSounds = preloadSounds;
  window.playSound = playSound;
}
