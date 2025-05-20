let currentScene = 'start';
let duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick, bat, pig;
let letterGFound = false;
let letterHFound = false;
let duckRabbitIcon, barnIcon;

const orderedScenes = [
  'start', 'bench', 'pond', 'pond2', 'flowers', 'grass', 'flowers2',
  'greenhouse', 'greenhouseInside', 'vegetables', 'tunnel', 'cave',
  'vegetables2', 'picnic', 'farmMap'
];
let sceneIndex = 0;
let continueBtn;

function preload() {
  duck = new Character('duck');
  rabbit = new Character('rabbit');
  // Donkey only has a single default image, so avoid loading default states
  donkey = new Character('donkey', []);
  donkey.images['idle'] = loadImage('assets/images/donkey/default.png');
  donkey.state = 'idle';
  donkey.x = 380;
  donkey.y = 420;

  dog = new Character('dog', []);
  dog.images['idle'] = loadImage('assets/images/dog/default.png');
  dog.state = 'idle';
  dog.x = 620;
  dog.y = 440;

  sheep = new Character('sheep');
  sheep.state = 'idle';
  sheep.x = 460;
  sheep.y = 420;

  sheepbaby = new Character('sheepbaby', []);
  sheepbaby.images['idle'] = loadImage('assets/images/sheepbaby/default.png');
  sheepbaby.state = 'idle';
  sheepbaby.x = 520;
  sheepbaby.y = 440;

  owl = new Character('owl');

  graytortiecat = new Character('graytortiecat', []);
  graytortiecat.images['idle'] = loadImage('assets/images/graytortiecat/default.png');
  graytortiecat.state = 'idle';

  orangecat = new Character('orangecat', []);
  orangecat.images['idle'] = loadImage('assets/images/orangecat/default.png');
  orangecat.state = 'idle';
  orangecat.x = 450;
  orangecat.y = 430;

  chick = new Character('chick', []);
  chick.images['idle'] = loadImage('assets/images/chick/default.png');
  chick.state = 'idle';

  bat = new Character('bat', []);
  bat.images['idle'] = loadImage('assets/images/bat/default.png');
  bat.images['flap'] = loadImage('assets/images/bat/wings-flap.png');
  bat.state = 'idle';
  bat.x = 420;
  bat.y = 180;
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
    display() {
      this.update();
      image(this.images[this.current], this.x, this.y, 100, 100);
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

  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  barnIcon = loadImage('assets/images/icons/barndefault.png');

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
