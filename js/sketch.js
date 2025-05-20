let currentScene = 'start';
// Declare character variables with var so they become properties on the global
// window object. drawSceneCharacters in scenes.js accesses characters via
// window[name], so using var ensures they are available there.
var duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick, bat, pig, duckRabbitSwing;
let letterGFound = false;
let letterHFound = false;
let duckRabbitIcon, barnIcon;
let picnicReached = false,
    mapIcon;
let mapUnlocked = false;

// Movement variables for the duck in pond2
let duckTargetX = null;
let duckTargetY = null;
const duckMoveSpeed = 2;
let moveLeft = false,
    moveRight = false,
    moveUp = false,
    moveDown = false;

const orderedScenes = [
  'start', 'bench', 'pond', 'pond2', 'flowers', 'grass', 'flowers2',
  'greenhouse', 'greenhouseInside', 'vegetables', 'tunnel', 'cave',
  'vegetables2', 'picnic', 'farmMap',
  // post map flow
  'swing', 'swing2', 'dogHouse', 'field', 'barn',
  'barnInside', 'loftEntrance', 'loft', 'barnInside'
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
      up: loadImage('assets/images/pig/swing-up.png'),
      default: loadImage('assets/images/pig/default.png'),
      chattering: loadImage('assets/images/pig/chattering.png')
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
      } else if (currentScene === 'swing2') {
        if (this.current !== 'default' && this.current !== 'chattering') {
          this.current = 'default';
        }
        const interval = 90; // ~1.5 seconds
        if (frameCount - this.lastSwitch > interval) {
          this.current = this.current === 'default' ? 'chattering' : 'default';
          this.lastSwitch = frameCount;
        }
      } else {
        this.current = 'default';
      }
    }
  };
  pig.initBase();

  duckRabbitSwing = {
    images: {
      neutral: loadImage('assets/images/swing/swing-neutral.png'),
      up: loadImage('assets/images/swing/swing-up.png')
    },
    current: 'neutral',
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
      if (currentScene === 'swing2') {
        if (frameCount - this.lastSwitch > 60) {
          this.current = this.current === 'neutral' ? 'up' : 'neutral';
          this.lastSwitch = frameCount;
        }
      } else {
        this.current = 'neutral';
      }
    }
  };
  duckRabbitSwing.initBase();

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
  mapUnlocked = mapUnlocked || currentScene === 'farmMap';
  if (currentScene === 'pond2') {
    if (moveLeft || moveRight || moveUp || moveDown) {
      duckTargetX = null;
      duckTargetY = null;
      if (moveLeft)  duck.baseX -= duckMoveSpeed;
      if (moveRight) duck.baseX += duckMoveSpeed;
      if (moveUp)    duck.baseY -= duckMoveSpeed;
      if (moveDown)  duck.baseY += duckMoveSpeed;
    } else if (duckTargetX !== null && duckTargetY !== null) {
      const dx = duckTargetX - duck.baseX;
      const dy = duckTargetY - duck.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > duckMoveSpeed) {
        duck.baseX += duckMoveSpeed * dx / dist;
        duck.baseY += duckMoveSpeed * dy / dist;
      } else {
        duck.baseX = duckTargetX;
        duck.baseY = duckTargetY;
        duckTargetX = null;
        duckTargetY = null;
      }
    }
  }
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
  if (
    mapUnlocked &&
    currentScene !== 'farmMap' &&
    allLettersFoundForScene(currentScene)
  ) {
    image(mapIcon, 10, 10, 50, 50);
  }
  image(duckRabbitIcon, width - 70, 10, 60, 60);
}

function mousePressed() {
  handleSceneClicks(mouseX, mouseY);
  handleLetterClicks(mouseX, mouseY);
  if (currentScene === 'pond2') {
    duckTargetX = mouseX;
    duckTargetY = mouseY;
  }
  if (currentScene === 'barn') {
    if (mouseX > donkey.x && mouseX < donkey.x + 100 && mouseY > donkey.y && mouseY < donkey.y + 100) {
      currentScene = 'donkey';
      sceneIndex = orderedScenes.indexOf('barn');
      return;
    }
  }
  if (currentScene === 'donkey') {
    if (mouseX >= 10 && mouseX <= 60 && mouseY >= 10 && mouseY <= 60) {
      currentScene = 'barn';
      sceneIndex = orderedScenes.indexOf('barn');
      return;
    }
  }
  if (
    mapUnlocked &&
    currentScene !== 'farmMap' &&
    allLettersFoundForScene(currentScene)
  ) {
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
  if (currentScene === 'donkey') {
    currentScene = 'barn';
    sceneIndex = orderedScenes.indexOf('barn');
    continueBtn.style.display = 'none';
    return;
  }
  if (['studio','mirror','radioRoom'].includes(currentScene)) {
    currentScene = 'barnInside';
    sceneIndex = orderedScenes.indexOf('barnInside');
    continueBtn.style.display = 'none';
    return;
  }
  sceneIndex++;
  if (sceneIndex >= orderedScenes.length) {
    continueBtn.style.display = 'none';
    return;
  }
  currentScene = orderedScenes[sceneIndex];
  continueBtn.style.display = currentScene === 'farmMap' ? 'none' : 'none';
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) moveLeft = true;
  if (keyCode === RIGHT_ARROW) moveRight = true;
  if (keyCode === UP_ARROW) moveUp = true;
  if (keyCode === DOWN_ARROW) moveDown = true;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) moveLeft = false;
  if (keyCode === RIGHT_ARROW) moveRight = false;
  if (keyCode === UP_ARROW) moveUp = false;
  if (keyCode === DOWN_ARROW) moveDown = false;
}
