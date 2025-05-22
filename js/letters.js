let letters = [];
let lettersFoundCount = 0;
let pendingDialogueScene = null;

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
    scene: 'greenhouseInside',
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
    question: 'What makes someone a good friend?',
    x: 200, y: 260
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
    x: 650, y: 500
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
    x: 400, y: 90
  });
  letters.push({
    scene: 'tunnel',
    letter: 'M',
    concept: 'Minds',
    description: 'Our memories, feelings, thoughts, and experiences are part of our minds... Only you can access yours!',
    question: 'Do other animals think and feel like we do?',
    x: 350, y: 150
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
    x: 560, y: 395
  });
  letters.push({
    scene: 'farmMap',
    letter: 'P',
    concept: 'Possibilities',
    description: 'There are so many ways things could be!',
    question: 'What are some ways this story could end?',
    x: 470, y: 140
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
    x: 150, y: 100
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
    x: 400, y: 300
  });
  letters.push({
    scene: 'loft',
    letter: 'Z',
    concept: 'Zen',
    description: 'Living with nature and in peace.',
    question: 'How can you calm down when you are upset?',
    x: 560, y: 520
  });


  // preload images for alphabet letters
  letters.forEach(l => {
    if (l.letter !== '?') {
      l.img = loadImage(`assets/images/letters/${l.letter.toLowerCase()}.png`);
    }
    l.found = false;
    l.size = 32;
    l.baseSize = 32;
    l.answer = '';
  });
}

function initLetterBottomPositions() {
  letters.forEach(l => {
    const idx = l.letter.charCodeAt(0) - 65;
    if (idx >= 0 && idx < 26) {
      const spacing = (width - 60) / 26;
      l.bottomX = spacing * (idx + 0.5);
      l.bottomY = height - l.size / 2 - 10;
    }
  });
}

function handleLetterClicks(mx, my) {
  letters.forEach(l => {
    const half = l.size / 2;
    const within =
      l.scene === currentScene &&
      !l.found &&
      mx >= l.x - half && mx <= l.x + half &&
      my >= l.y - half && my <= l.y + half;
    if (within) {
      const handleFound = () => {
        showLetterInfo(l);
        if (!l.found) {
          l.found = true;
          l.x = l.bottomX;
          l.y = l.bottomY;
          lettersFoundCount++;
          if (typeof playSound === 'function') playSound('achieve');
          if (lettersFoundCount === 26 && typeof playSound === 'function') {
            playSound('win');
          }
        }
        if (l.letter === 'G') {
          letterGFound = true;
        }
        if (l.letter === 'H') {
          letterHFound = true;
        }
        if (
          currentScene !== 'bench' &&
          currentScene !== 'farmMap' &&
          typeof playDialogue === 'function' &&
          allLettersFoundForScene(currentScene) &&
          !dialoguesPlayed[currentScene]
        ) {
          showContinueForDialogue(currentScene);
        }
      };

      if (currentScene === 'pond2' && typeof duck !== 'undefined') {
        duck.baseX = l.x - duck.size / 2;
        duck.baseY = l.y - duck.size / 2;
        if (typeof clampDuckPond2 === 'function') clampDuckPond2();
        setTimeout(handleFound, 75);
      } else {
        handleFound();
      }
    }
  });
}

// Check if the duck has collided with any letters in the current scene
function checkDuckLetterCollision(duck) {
  letters.forEach(l => {
    if (l.scene !== currentScene || l.found) {
      return;
    }
    const within =
      l.x >= duck.baseX &&
      l.x <= duck.baseX + duck.size &&
      l.y >= duck.baseY &&
      l.y <= duck.baseY + duck.size;
    if (within) {
      showLetterInfo(l);
      if (!l.found) {
        l.found = true;
        l.x = l.bottomX;
        l.y = l.bottomY;
        lettersFoundCount++;
        if (typeof playSound === 'function') playSound('achieve');
        if (lettersFoundCount === 26 && typeof playSound === 'function') {
          playSound('win');
        }
      }
      if (l.letter === 'G') {
        letterGFound = true;
      }
      if (l.letter === 'H') {
        letterHFound = true;
      }
      if (
        currentScene !== 'bench' &&
        currentScene !== 'farmMap' &&
        typeof playDialogue === 'function' &&
        allLettersFoundForScene(currentScene) &&
        !dialoguesPlayed[currentScene]
      ) {
        showContinueForDialogue(currentScene);
      }
    }
  });
}

function showLetterInfo(letter) {
  const box = document.getElementById('letterInfoBox');
  if (!box) return;
  box.innerHTML =
    `<strong>${letter.letter} for ${letter.concept}</strong><br><br>${letter.description}<br><br><em>${letter.question}</em><br>` +
    `<input id="letterAnswerInput" type="text" maxlength="50" value="${letter.answer || ''}" placeholder="Your answer" style="width:90%;font-size:16px;margin-top:6px;"/><br>` +
    `<button id="letterSaveBtn">Save</button> <button id="letterCloseBtn">Close</button>`;
  box.style.display = 'block';
  if (typeof box.focus === 'function') box.focus();
  const input = document.getElementById('letterAnswerInput');
  const saveBtn = document.getElementById('letterSaveBtn');
  const closeBtn = document.getElementById('letterCloseBtn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      letter.answer = input.value.slice(0, 50);
      closeLetterInfo();
    };
  }
  if (closeBtn) {
    closeBtn.onclick = () => {
      closeLetterInfo();
    };
  }
}

function closeLetterInfo() {
  const box = document.getElementById('letterInfoBox');
  if (box) {
    box.style.display = 'none';
  }
  if (pendingDialogueScene) {
    playDialogue(pendingDialogueScene);
    pendingDialogueScene = null;
  } else {
    const btn = document.getElementById('continueBtn');
    if (
      btn &&
      currentScene !== 'farmMap' &&
      dialoguesPlayed[currentScene] &&
      allLettersFoundForScene(currentScene)
    ) {
      btn.style.display = 'block';
    }
  }
}

// Draw letter indicators for the current scene
function drawLetters(scene) {
  letters.forEach(l => {
    if (
      l.scene === 'pond2' &&
      l.letter === 'D' &&
      currentScene === 'pond2' &&
      isDialogueActive()
    ) {
      return;
    }
    if (
      l.scene === 'bench' &&
      !l.found &&
      currentScene === 'bench' &&
      isDialogueActive()
    ) {
      return;
    }
    if (l.found) {
      let dSize = l.size;
      let dx = l.bottomX - l.size / 2;
      let dy = l.bottomY - l.size / 2;
      if (
        mouseX >= l.bottomX - l.size / 2 &&
        mouseX <= l.bottomX + l.size / 2 &&
        mouseY >= l.bottomY - l.size / 2 &&
        mouseY <= l.bottomY + l.size / 2
      ) {
        dSize *= 1.05;
        dx = l.bottomX - dSize / 2;
        dy = l.bottomY - dSize / 2;
      }
      if (l.img) {
        image(l.img, dx, dy, dSize, dSize);
      } else {
        ellipse(l.bottomX, l.bottomY, dSize, dSize);
        textAlign(CENTER, CENTER);
        fill(0);
        text(l.letter, l.bottomX, l.bottomY);
      }
    } else if (l.scene === scene) {
      let dSize = l.size;
      let dx = l.x - l.size / 2;
      let dy = l.y - l.size / 2;
      if (
        mouseX >= l.x - l.size / 2 &&
        mouseX <= l.x + l.size / 2 &&
        mouseY >= l.y - l.size / 2 &&
        mouseY <= l.y + l.size / 2
      ) {
        dSize *= 1.05;
        dx = l.x - dSize / 2;
        dy = l.y - dSize / 2;
      }
      if (l.img) {
        image(l.img, dx, dy, dSize, dSize);
      } else {
        ellipse(l.x, l.y, dSize, dSize);
        textAlign(CENTER, CENTER);
        fill(0);
        text(l.letter, l.x, l.y);
      }
    }
  });
}

function allLettersFoundForScene(scene) {
  return letters
    .filter(l => l.scene === scene)
    .every(l => l.found);
}

function sceneHasLetters(scene) {
  return letters.some(l => l.scene === scene);
}

function isLetterFound(letter, scene) {
  const l = letters.find(
    lt => lt.letter === letter && (scene ? lt.scene === scene : true)
  );
  return !!(l && l.found);
}

function highlightMissingLetters(scene) {
  letters.forEach(l => {
    if (l.scene === scene && !l.found) {
      l.size = l.baseSize * 2;
      setTimeout(() => {
        l.size = l.baseSize;
      }, 1000);
    }
  });
}

function showContinueForDialogue(scene) {
  const btn = document.getElementById('continueBtn');
  if (btn) btn.style.display = 'none';
  pendingDialogueScene = scene;
}

