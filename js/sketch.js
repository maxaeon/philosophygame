let currentScene = 'farmMap';
let duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick;
let duckRabbitIcon, barnIcon;

const orderedScenes = [
  'farmMap',
  'picnic', 'tunnel', 'pond', 'cave', 'greenhouse', 'cave',
  'swing', 'swing2', 'greenhouse', 'cave', 'farmMap',
  'greenhouse', 'cave', 'farmMap', 'greenhouse',
  'cave', 'farmMap', 'farmMap', 'greenhouse', 'cave',
  'farmMap', 'greenhouse', 'cave', 'farmMap',
  'greenhouse', 'farmMap'
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
  // Optional: set x/y coordinates

  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  barnIcon = loadImage('assets/images/icons/barndefault.png');

  preloadScenes();
  preloadLetters();
}

function setup() {
  createCanvas(800, 600);
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
  alert("Duck-Rabbit says: Think about things from a different perspective!");
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
