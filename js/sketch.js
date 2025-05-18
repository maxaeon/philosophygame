let currentScene = 'farmMap';
let duck, rabbit, donkey;
let duckRabbitIcon, barnIcon;

const orderedScenes = [
  'farmMap',
  'picnic', 'tunnel', 'pond', 'batCave', 'greenhouse', 'batCave',
  'swing', 'swing2', 'greenhouse', 'batCave', 'farmMap',
  'greenhouse', 'batCave', 'farmMap', 'greenhouse',
  'batCave', 'farmMap', 'farmMap', 'greenhouse', 'batCave',
  'farmMap', 'greenhouse', 'batCave', 'farmMap',
  'greenhouse', 'farmMap'
];
let sceneIndex = 0;
let continueBtn;

function preload() {
  duck = new Character('duck');
  rabbit = new Character('rabbit');
  donkey = new Character('donkey');
  donkey.images['idle'] = loadImage('assets/images/donkey/placeholder.png');
  donkey.state = 'idle';
  donkey.x = 380;
  donkey.y = 420;

  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  barnIcon = loadImage('assets/images/icons/barnplaceholder.png');

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
  duck.display();
  rabbit.display();
  if (currentScene === 'barn') {
    donkey.display();
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
