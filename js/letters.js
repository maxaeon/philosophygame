let letters = [];

function preloadLetters() {
  letters.push({
    scene: 'batCave',
    letter: 'A',
    concept: 'Autonomy',
    description: 'Making your own decisions.',
    question: 'What choices do you make on your own?',
    x: 400, y: 300
  });
  // Add more letters...
}

function handleLetterClicks(mx, my) {
  letters.forEach(l => {
    if (l.scene === currentScene && dist(mx, my, l.x, l.y) < 20) {
      showLetterInfo(l);
    }
  });
}

function showLetterInfo(letter) {
  alert(`${letter.letter} for ${letter.concept}\n\n${letter.description}\n\nQuestion: ${letter.question}`);
}

// Draw letter indicators for the current scene
function drawLetters(scene) {
  letters.forEach(l => {
    if (l.scene === scene) {
      ellipse(l.x, l.y, 30, 30);
      textAlign(CENTER, CENTER);
      fill(0);
      text(l.letter, l.x, l.y);
    }
  });
}

