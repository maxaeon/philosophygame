let letters = [];

function preloadLetters() {
  letters.push({
    scene: 'picnic',
    letter: 'A',
    concept: 'Autonomy',
    description: 'Making your own decisions.',
    question: 'What choices do you make on your own?',
    x: 400, y: 300
  });
  letters.push({
    scene: 'dogHouse',
    letter: 'B',
    concept: 'Believing',
    description: 'Trusting something is true.',
    question: 'What do you believe in?',
    x: 150, y: 120
  });
  letters.push({
    scene: 'grass',
    letter: 'C',
    concept: 'Change',
    description: 'How things become different.',
    question: 'How have you changed this year?',
    x: 450, y: 180
  });
  letters.push({
    scene: 'pond2',
    letter: 'D',
    concept: 'Difference',
    description: 'When things are not the same, something about them is different.',
    question: 'What makes a dog different from a cat?',
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
    scene: 'flowers',
    letter: 'F',
    concept: 'Friend',
    description: 'Friends are people we love.',
    question: 'Why makes someone a good friend?',
    x: 200, y: 400
  });
  letters.push({
    scene: 'swing',
    letter: 'G',
    concept: 'Goodness',
    description: 'Being kind and helpful.',
    question: 'How can you show goodness?',
    x: 220, y: 250
  });
  letters.push({
    scene: 'swing2',
    letter: 'H',
    concept: 'Happiness',
    description: 'Feeling joy inside.',
    question: 'What makes you happy?',
    x: 450, y: 100
  });
  letters.push({
    scene: 'studio',
    letter: 'I',
    concept: 'Imagination',
    description: 'We can imagine things like unicorns, or what we want to be.',
    question: 'What do you imagine?',
    x: 300, y: 320
  });
  letters.push({
    scene: 'greenhouse',
    letter: 'J',
    concept: 'Judging',
    description: 'Deciding what is right or what is true.',
    question: 'Are grownup judgements always right?',
    x: 550, y: 350
  });
  letters.push({
    scene: 'field',
    letter: 'K',
    concept: 'Knowledge',
    description: 'What you learn and know.',
    question: 'How do you gain knowledge?',
    x: 650, y: 180
  });
  letters.push({
    scene: 'vegetables2',
    letter: 'L',
    concept: 'Logic',
    description: 'Using reason to solve problems.',
    question: 'When do you use logic?',
    x: 400, y: 240
  });
  letters.push({
    scene: 'tunnel',
    letter: 'M',
    concept: 'Minds',
    description: 'Our memories, feelings, thoughts, and experiences are part of our minds... Only you can access yours!',
    question: 'Do other animals think and feel like we do?',
    x: 250, y: 150
  });
  letters.push({
    scene: 'pond',
    letter: 'N',
    concept: 'Nature',
    description: 'The world around us.',
    question: 'What do you like about nature?',
    x: 500, y: 450
  });
  letters.push({
    scene: 'radioRoom',
    letter: 'O',
    concept: 'Observation',
    description: 'Watching carefully to learn.',
    question: 'What have you discovered by observing?',
    x: 200, y: 380
  });
  letters.push({
    scene: 'picnic',
    letter: 'P',
    concept: 'Possibilities',
    description: 'There are so many ways things could be!',
    question: 'What are some ways this story could end?',
    x: 480, y: 260
  });
  letters.push({
    scene: 'bench',
    letter: 'Q',
    concept: 'Questioning',
    description: 'Asking why and how.',
    question: 'What big question do you have?',
    x: 120, y: 300
  });
  letters.push({
    scene: 'cave',
    letter: 'R',
    concept: 'Reality',
    description: 'What is real, and not just imaginary.',
    question: 'Do you think the tooth fairy is real?',
    x: 700, y: 300
  });
  letters.push({
    scene: 'donkey',
    letter: 'S',
    concept: 'Solving',
    description: 'Finding answers when there are questions, or finding ways to make things work if there is a problem.',
    question: 'When you get stuck on a problem, how do you figure it out?',
    x: 520, y: 330
  });
  letters.push({
    scene: 'vegetables',
    letter: 'T',
    concept: 'Truth',
    description: 'What is real and honest.',
    question: 'Why does truth matter?',
    x: 320, y: 90
  });
  letters.push({
    scene: 'flowers2',
    letter: 'U',
    concept: 'Understanding',
    description: 'Making sense of something.',
    question: 'How do you show understanding?',
    x: 370, y: 370
  });
  letters.push({
    scene: 'barn',
    letter: 'V',
    concept: 'Values',
    description: 'What matters to you, like family or friends, or doing the right thing.',
    question: 'What do you value?',
    x: 650, y: 420
  });
  letters.push({
    scene: 'loftEntrance',
    letter: 'W',
    concept: 'Wisdom',
    description: 'Using experience to make good choices.',
    question: 'Who do you think is wise?',
    x: 430, y: 410
  });
  letters.push({
    scene: 'barnInside',
    letter: 'X',
    concept: 'eXperience',
    description: 'Learning from what happens to you.',
    question: 'What experience taught you a lot?',
    x: 290, y: 220
  });
  letters.push({
    scene: 'mirror',
    letter: 'Y',
    concept: 'You',
    description: 'You are the wonderful person you are!',
    question: 'What do you like about yourself, and what could you work on to be better?',
    x: 280, y: 160
  });
  letters.push({
    scene: 'loft',
    letter: 'Z',
    concept: 'Zen',
    description: 'Living with nature and in peace.',
    question: 'How can you calm down when you are upset?',
    x: 560, y: 520
  });

  const placeholderScenes = [
    'barn','barnInside','bench','dogHouse','donkey','field','flowers',
    'flowers2','garden','grass','greenhouseInside','loft','loftEntrance',
    'mirror','pond2','radioRoom','studio'
  ];
  placeholderScenes.forEach(s => {
    letters.push({
      scene: s,
      letter: '?',
      concept: 'Coming Soon',
      description: '',
      question: '',
      x: 400, y: 300
    });
  });
}

function handleLetterClicks(mx, my) {
  letters.forEach(l => {
    if (l.scene === currentScene && dist(mx, my, l.x, l.y) < 20) {
      showLetterInfo(l);
      if (typeof continueBtn !== 'undefined') {
        continueBtn.style.display = 'block';
      }
      if (l.letter === 'G') {
        letterGFound = true;
      }
      if (l.letter === 'H') {
        letterHFound = true;
      }
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

