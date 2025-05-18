let currentScene = 'farmMap';
let duck, rabbit, duckRabbitIcon;

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
  if (mouseX > width - 70 && mouseY < 70) {
    showAdvice();
  }
}

function showAdvice() {
  alert("Duck-Rabbit says: Think about things from a different perspective!");
}
