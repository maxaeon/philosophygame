const SoundManager = (() => {
  const registry = new Map();
  const activeLoops = new Set();

  function applyOptions(sound, options = {}) {
    if (!sound || typeof sound !== 'object') return;
    const { volume, rate, pan } = options;
    if (typeof volume === 'number' && typeof sound.setVolume === 'function') {
      sound.setVolume(volume);
    }
    if (typeof rate === 'number' && typeof sound.rate === 'function') {
      sound.rate(rate);
    }
    if (typeof pan === 'number' && typeof sound.pan === 'function') {
      sound.pan(pan);
    }
  }

  function register(name, sound) {
    if (!name || !sound) return;
    registry.set(name, sound);
  }

  function get(name) {
    return registry.get(name);
  }

  function stop(name) {
    const sound = get(name);
    if (!sound) return;
    if (typeof sound.stop === 'function') sound.stop();
    if (typeof sound.setLoop === 'function') sound.setLoop(false);
    activeLoops.delete(sound);
  }

  function play(name, options = {}) {
    const sound = get(name);
    if (!sound) return null;
    if (options.loop) {
      return loop(name, options);
    }
    applyOptions(sound, options);
    if (typeof sound.setLoop === 'function') sound.setLoop(false);
    if (typeof sound.stop === 'function') sound.stop();
    if (typeof sound.play === 'function') sound.play();
    return sound;
  }

  function loop(name, options = {}) {
    const sound = get(name);
    if (!sound) return null;
    applyOptions(sound, options);
    if (typeof sound.setLoop === 'function') sound.setLoop(true);
    if (typeof sound.play === 'function') sound.play();
    activeLoops.add(sound);
    return sound;
  }

  function stopAll() {
    activeLoops.forEach(sound => {
      if (!sound) return;
      if (typeof sound.stop === 'function') sound.stop();
      if (typeof sound.setLoop === 'function') sound.setLoop(false);
    });
    activeLoops.clear();
  }

  function isLooping(name) {
    const sound = get(name);
    return sound ? activeLoops.has(sound) : false;
  }

  return { register, get, play, loop, stop, stopAll, isLooping };
})();

let sounds = {};

function registerSound(name, path) {
  const sound = loadSound(path, loaded => {
    SoundManager.register(name, loaded);
  });
  if (sound) {
    sounds[name] = sound;
    SoundManager.register(name, sound);
  }
  return sound;
}

function preloadSounds() {
  registerSound('transition', 'assets/audio/transition.wav');
  registerSound('continue', 'assets/audio/continue.wav');
  registerSound('dog', 'assets/audio/dog.wav');
  registerSound('sheep', 'assets/audio/sheep.wav');
  registerSound('pig1', 'assets/audio/pig1.wav');
  registerSound('pig2', 'assets/audio/pig2.wav');
  registerSound('owl', 'assets/audio/owl.wav');
  registerSound('donkey', 'assets/audio/donkey.mp3');
  registerSound('bat', 'assets/audio/bat.wav');
  registerSound('graytortiecat', 'assets/audio/cat1.wav');
  registerSound('orangecat', 'assets/audio/cat2.wav');
  registerSound('back', 'assets/audio/back.wav');
  registerSound('achieve', 'assets/audio/achieve.wav');
  registerSound('win', 'assets/audio/win.wav');
  registerSound('click', 'assets/audio/click.wav');
}

function playSound(name, options = {}) {
  if (name === 'pig') {
    const pigNames = ['pig1', 'pig2'].filter(n => SoundManager.get(n));
    if (!pigNames.length) return;
    const pick = pigNames[Math.floor(Math.random() * pigNames.length)];
    SoundManager.play(pick, options);
    return;
  }
  SoundManager.play(name, options);
}

if (typeof window !== 'undefined') {
  window.SoundManager = SoundManager;
  window.preloadSounds = preloadSounds;
  window.playSound = playSound;
}
