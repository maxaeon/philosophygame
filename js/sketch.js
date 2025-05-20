let currentScene = 'start';
// Declare character variables with var so they become properties on the global
// window object. drawSceneCharacters in scenes.js accesses characters via
// window[name], so using var ensures they are available there.
var duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick, bat, pig;
let letterGFound = false;
let letterHFound = false;
let duckRabbitIcon, barnIcon;
let picnicReached = false,
    mapIcon;

const orderedScenes = [
  'start', 'bench', 'pond', 'pond2', 'flowers', 'grass', 'flowers2',
  'greenhouse', 'greenhouseInside', 'vegetables', 'tunnel', 'cave',
  'vegetables2', 'picnic', 'farmMap'
];
let sceneIndex = 0;
let continueBtn;

function preload() {
  duck = new Character('duck', [
    'left',
    'right',
    'left-eyes-closed',
    'slight-left'
  ]);
  rabbit = new Character('rabbit', ['right-talking']);
  // Donkey has a default image plus open and closed mouth states
  donkey = new Character('donkey', ['open', 'closed']);
  donkey.images['idle'] = loadImage('assets/images/donkey/default.png');
  donkey.state = 'idle';
  donkey.x = 380;
  donkey.y = 420;
  donkey.initBase();

  dog = new Character('dog', ['happy', 'sad']);
  dog.images['idle'] = loadImage('assets/images/dog/default.png');
  dog.state = 'idle';
  dog.x = 620;
  dog.y = 440;
  dog.initBase();

  sheep = new Character('sheep', [
    'forward-talking',
    'grinning',
    'left-forward-talking',
    'left-talking',
    'right',
    'walking'
  ]);
  sheep.state = 'idle';
  sheep.x = 460;
  sheep.y = 420;
  sheep.initBase();

  sheepbaby = new Character('sheepbaby', ['slight-right']);
  sheepbaby.images['idle'] = loadImage('assets/images/sheepbaby/default.png');
  sheepbaby.state = 'idle';
  sheepbaby.x = 520;
  sheepbaby.y = 440;
  sheepbaby.initBase();

  owl = new Character('owl', [
    'eyes-closed-mouth-open',
    'eyes-closed',
    'mouth-open'
  ]);

  graytortiecat = new Character('graytortiecat', ['fluffy', 'hairless']);
  graytortiecat.images['idle'] = loadImage('assets/images/graytortiecat/default.png');
  graytortiecat.state = 'idle';

  orangecat = new Character('orangecat', [
    'forward',
    'right-pose',
    'shifted-right',
    'talking-cat',
    'walk1',
    'walk2',
    'walk3'
  ]);
  orangecat.images['idle'] = loadImage('assets/images/orangecat/default.png');
  orangecat.state = 'idle';
  orangecat.x = 450;
  orangecat.y = 430;
  orangecat.initBase();

  chick = new Character('chick', ['eggcited', 'in-egg-closed', 'in-egg-open']);
  chick.images['idle'] = loadImage('assets/images/chick/default.png');
  chick.state = 'idle';

  bat = new Character('bat', ['wings-flap']);
  bat.images['idle'] = loadImage('assets/images/bat/default.png');
  bat.images['flap'] = loadImage('assets/images/bat/wings-flap.png');
  bat.state = 'idle';
  bat.x = 420;
  bat.y = 180;
  bat.initBase();
  // Optional: set x/y coordinates

  pig = {
    images: {
      swing1: loadImage('assets/images/pig/swing1.png'),
      swing2: loadImage('assets/images/pig/swing2.png'),
      neutral: loadImage('assets/images/pig/swing-neutral.png'),
      up: loadImage('assets/images/pig/swing-up.png')
    },
    current: 'swing1',
    lastSwitch: 0,
    x: 360,
    y: 420,
    size: 100,
    baseX: 360,
    baseY: 420,
    baseSize: 100,
    display() {
      this.update();
      image(this.images[this.current], this.x, this.y, this.size, this.size);
    },
    reset() {
      this.x = this.baseX;
      this.y = this.baseY;
      this.size = this.baseSize;
    },
    initBase() {
      this.baseX = this.x;
      this.baseY = this.y;
      this.baseSize = this.size;
    },
    update() {
      if ((currentScene === 'farmMap' || currentScene === 'swing') && !letterGFound) {
        if (this.current !== 'swing1' && this.current !== 'swing2') {
          this.current = 'swing1';
        }
        if (frameCount - this.lastSwitch > 60) {
          this.current = this.current === 'swing1' ? 'swing2' : 'swing1';
          this.lastSwitch = frameCount;
        }
      } else if (currentScene === 'swing2' && !letterHFound) {
        if (this.current !== 'neutral' && this.current !== 'up') {
          this.current = 'neutral';
        }
        if (frameCount - this.lastSwitch > 60) {
          this.current = this.current === 'neutral' ? 'up' : 'neutral';
          this.lastSwitch = frameCount;
        }
      }
    }
  };
  pig.initBase();

  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  barnIcon = loadImage('assets/images/icons/barndefault.png');
  mapIcon = loadImage('assets/images/icons/map.png');

  preloadScenes();
  preloadLetters();
}

function setup() {
  createCanvas(800, 600);
  initLetterBottomPositions();
  setupScenes();
  continueBtn = document.getElementById('continueBtn');
  continueBtn.addEventListener('click', advanceScene);
  continueBtn.style.display = currentScene === 'farmMap' ? 'none' : 'block';
}

function draw() {
  background(220);
  picnicReached = picnicReached || currentScene === 'picnic';
  drawScene(currentScene); // from scenes.js
  drawLetters(currentScene); // from letters.js
  drawSceneCharacters(currentScene); // from scenes.js
  if (currentScene === 'farmMap') {
    const iconSize = 40;
    scenes.interactiveAreas.forEach(area => {
      if (['pond', 'pond2', 'vegetables', 'picnic'].includes(area.name)) {
        image(scenes[area.name], area.x, area.y, iconSize, iconSize);
      }
    });
  }
  if (currentScene === 'donkey') {
    image(barnIcon, 10, 10, 50, 50);
  }
  if (picnicReached && currentScene !== 'farmMap') {
    image(mapIcon, 10, 10, 50, 50);
  }
  image(duckRabbitIcon, width - 70, 10, 60, 60);
}

function mousePressed() {
  handleSceneClicks(mouseX, mouseY);
  handleLetterClicks(mouseX, mouseY);
  if (currentScene === 'barn') {
    if (mouseX > donkey.x && mouseX < donkey.x + 100 && mouseY > donkey.y && mouseY < donkey.y + 100) {
      currentScene = 'donkey';
      return;
    }
  }
  if (currentScene === 'donkey') {
    if (mouseX >= 10 && mouseX <= 60 && mouseY >= 10 && mouseY <= 60) {
      currentScene = 'barn';
      return;
    }
  }
  if (picnicReached && currentScene !== 'farmMap') {
    if (mouseX >= 10 && mouseX <= 60 && mouseY >= 10 && mouseY <= 60) {
      currentScene = 'farmMap';
      return;
    }
  }
  if (mouseX > width - 70 && mouseY < 70) {
    showAdvice();
  }
}

function showAdvice() {
  if (lettersFoundCount >= 26) {
    alert("Duck-Rabbit says: Great job finding all the letters!");
  } else {
    alert("Duck-Rabbit says: Think about things from a different perspective!");
  }
}

function advanceScene() {
  sceneIndex++;
  if (sceneIndex >= orderedScenes.length) {
    continueBtn.style.display = 'none';
    return;
  }
  currentScene = orderedScenes[sceneIndex];
  if (currentScene === 'farmMap') {
    continueBtn.style.display = 'none';
  } else {
    continueBtn.style.display = 'none';
  }
}
