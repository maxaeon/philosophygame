let currentScene = 'farmMap';
let duck, rabbit, duckRabbitIcon;
let letterRead = false;
let characterInteracted = false;
const sceneOrder = ['farmMap', 'batCave', 'greenhouse'];
let continueBtn;

function preload() {
  duck = new Character('duck');
  rabbit = new Character('rabbit');
  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  preloadScenes();
  preloadLetters();
}

function setup() {
  createCanvas(800, 600);
  setupScenes();
  continueBtn = document.getElementById('continueBtn');
  continueBtn.addEventListener('click', advanceScene);
}

function draw() {
  background(220);
  drawScene(currentScene);
  duck.display();
  rabbit.display();
  image(duckRabbitIcon, width - 70, 10, 60, 60);
}

function mousePressed() {
  handleSceneClicks(mouseX, mouseY);
  handleLetterClicks(mouseX, mouseY);
  handleCharacterClicks(mouseX, mouseY);
  if (mouseX > width - 70 && mouseY < 70) {
    showAdvice();
  }
  if (letterRead && characterInteracted) {
    continueBtn.hidden = false;
  }
}

function showAdvice() {
  alert("Duck-Rabbit says: Think about things from a different perspective!");
}

function advanceScene() {
  const idx = sceneOrder.indexOf(currentScene);
  if (idx >= 0 && idx < sceneOrder.length - 1) {
    currentScene = sceneOrder[idx + 1];
  }
  continueBtn.hidden = true;
  letterRead = false;
  characterInteracted = false;
}
