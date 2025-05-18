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
  letters.push({
    scene: 'greenhouse',
    letter: 'B',
    concept: 'Believing',
    description: 'Trusting something is true.',
    question: 'What do you believe in?',
    x: 150, y: 120
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'C',
    concept: 'Change',
    description: 'How things become different.',
    question: 'How have you changed this year?',
    x: 450, y: 180
  });
  letters.push({
    scene: 'batCave',
    letter: 'D',
    concept: 'Doubt',
    description: 'Not being sure about something.',
    question: 'When do you feel uncertain?',
    x: 350, y: 220
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'E',
    concept: 'Ethics',
    description: 'Figuring out right and wrong.',
    question: 'What do you think is the right thing to do?',
    x: 600, y: 200
  });
  letters.push({
    scene: 'batCave',
    letter: 'F',
    concept: 'Freedom',
    description: 'Being able to choose.',
    question: 'Why is freedom important?',
    x: 200, y: 400
  });
  letters.push({
    scene: 'farmMap',
    letter: 'G',
    concept: 'Goodness',
    description: 'Being kind and helpful.',
    question: 'How can you show goodness?',
    x: 220, y: 250
  });
  letters.push({
    scene: 'farmMap',
    letter: 'H',
    concept: 'Happiness',
    description: 'Feeling joy inside.',
    question: 'What makes you happy?',
    x: 450, y: 100
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'I',
    concept: 'Identity',
    description: 'Who you are.',
    question: 'What makes you unique?',
    x: 300, y: 320
  });
  letters.push({
    scene: 'batCave',
    letter: 'J',
    concept: 'Justice',
    description: 'Being fair to everyone.',
    question: 'How do you know something is fair?',
    x: 550, y: 350
  });
  letters.push({
    scene: 'farmMap',
    letter: 'K',
    concept: 'Knowledge',
    description: 'What you learn and know.',
    question: 'How do you gain knowledge?',
    x: 650, y: 180
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'L',
    concept: 'Logic',
    description: 'Using reason to solve problems.',
    question: 'When do you use logic?',
    x: 400, y: 240
  });
  letters.push({
    scene: 'batCave',
    letter: 'M',
    concept: 'Morality',
    description: 'Knowing right from wrong.',
    question: 'Where do your ideas of right and wrong come from?',
    x: 250, y: 150
  });
  letters.push({
    scene: 'farmMap',
    letter: 'N',
    concept: 'Nature',
    description: 'The world around us.',
    question: 'What do you like about nature?',
    x: 500, y: 450
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'O',
    concept: 'Observation',
    description: 'Watching carefully to learn.',
    question: 'What have you discovered by observing?',
    x: 200, y: 380
  });
  letters.push({
    scene: 'batCave',
    letter: 'P',
    concept: 'Perspective',
    description: 'Seeing things in different ways.',
    question: 'Can you think of another viewpoint?',
    x: 480, y: 260
  });
  letters.push({
    scene: 'farmMap',
    letter: 'Q',
    concept: 'Questioning',
    description: 'Asking why and how.',
    question: 'What big question do you have?',
    x: 120, y: 300
  });
  letters.push({
    scene: 'farmMap',
    letter: 'R',
    concept: 'Reason',
    description: 'Thinking clearly about ideas.',
    question: 'How do you reason about choices?',
    x: 700, y: 300
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'S',
    concept: 'Self',
    description: 'Understanding who you are.',
    question: 'What do you like about yourself?',
    x: 520, y: 330
  });
  letters.push({
    scene: 'batCave',
    letter: 'T',
    concept: 'Truth',
    description: 'What is real and honest.',
    question: 'Why does truth matter?',
    x: 320, y: 90
  });
  letters.push({
    scene: 'farmMap',
    letter: 'U',
    concept: 'Understanding',
    description: 'Making sense of something.',
    question: 'How do you show understanding?',
    x: 370, y: 370
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'V',
    concept: 'Virtue',
    description: 'Good qualities like courage.',
    question: 'Which virtues are important to you?',
    x: 650, y: 420
  });
  letters.push({
    scene: 'batCave',
    letter: 'W',
    concept: 'Wisdom',
    description: 'Using experience to make good choices.',
    question: 'Who do you think is wise?',
    x: 430, y: 410
  });
  letters.push({
    scene: 'farmMap',
    letter: 'X',
    concept: 'eXperience',
    description: 'Learning from what happens to you.',
    question: 'What experience taught you a lot?',
    x: 290, y: 220
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'Y',
    concept: 'Yearning',
    description: 'Wanting to know or do more.',
    question: 'What do you yearn to learn?',
    x: 280, y: 160
  });
  letters.push({
    scene: 'farmMap',
    letter: 'Z',
    concept: 'Zest',
    description: 'Excitement and enthusiasm for life.',
    question: 'When do you feel full of zest?',
    x: 560, y: 520
  });
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

