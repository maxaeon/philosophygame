let currentScene = 'farmMap';
let characters = {};
let duckRabbitIcon;

function preload() {
  characters.duck = new Character('duck');
  characters.rabbit = new Character('rabbit');
  duckRabbitIcon = loadImage('assets/images/icons/duck-rabbit.png');
  preloadScenes();
  preloadLetters();
}

function setup() {
  createCanvas(800, 600);
  setupScenes();
}

function draw() {
  background(220);
  drawScene(currentScene); // from scenes.js
  drawLetters(currentScene); // from letters.js
  if (currentScene !== 'farmMap' && !currentScene.startsWith('barn')) {
    drawSceneCharacters(currentScene);
  }
  image(duckRabbitIcon, width - 70, 10, 60, 60);
}

function mousePressed() {
  handleSceneClicks(mouseX, mouseY);
  handleLetterClicks(mouseX, mouseY);
  if (mouseX > width - 70 && mouseY < 70) {
    showAdvice();
  }
}

function showAdvice() {
  alert("Duck-Rabbit says: Think about things from a different perspective!");
}
