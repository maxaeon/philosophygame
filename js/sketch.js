let currentScene = 'start';
// Declare character variables with var so they become properties on the global
// window object. drawSceneCharacters in scenes.js accesses characters via
// window[name], so using var ensures they are available there.
var duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick, bat, birdhouse, pig, duckRabbitSwing, trayA, trayB;
let letterGFound = false;
let letterHFound = false;
let duckRabbitIcon, barnIcon;
let picnicReached = false,
    mapIcon;
let mapUnlocked = false;
let trayOnTable = 'trayB';
let trayChoiceMade = false;
let dialogueBox;

// Movement variables for the duck in pond2
let duckTargetX = null;
let duckTargetY = null;
const duckMoveSpeed = 2;
let moveLeft = false,
    moveRight = false,
    moveUp = false,
    moveDown = false;

function clampDuckPond2() {
  if (currentScene !== 'pond2' || typeof duck === 'undefined') return;
  const maxX = width - duck.size;
  const maxY = height - duck.size;
  const minY = height * 0.35;
  if (duck.baseX < 0) duck.baseX = 0;
  if (duck.baseX > maxX) duck.baseX = maxX;
  if (duck.baseY < minY) duck.baseY = minY;
  if (duck.baseY > maxY) duck.baseY = maxY;
}

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
let backBtn;
let sceneHistory = [currentScene];
let dogHouseVisits = 0;

function preload() {
  if (typeof preloadSounds === 'function') preloadSounds();
  duck = new Character('duck', [
    'left',
    'right',
    'left-eyes-closed',
    'slight-left',
    'mouth-closed',
    'backwards',
    'swim-up',
    'swim-down',
    'swim-right',
    'swim-left'
  ], 100, 360, 420);
  rabbit = new Character('rabbit', ['mouth-closed'], 100, 420, 420);
  // Donkey has a default image plus open and closed mouth states
  donkey = new Character('donkey', ['open', 'closed', 'mouth-closed'], 100, 380, 420);
  donkey.images['idle'] = loadImage('assets/images/donkey/default.png');
  donkey.state = 'mouth-closed';
  donkey.initBase();

  dog = new Character('dog', ['happy', 'sad', 'mouth-closed'], 100, 620, 440);
  dog.images['idle'] = loadImage('assets/images/dog/default.png');
  dog.state = 'mouth-closed';
  dog.initBase();

  sheep = new Character('sheep', [
    'forward-talking',
    'grinning',
    'left-forward-talking',
    'left-talking',
    'right',
    'walking',
    'mouth-closed'
  ], 100, 460, 420);
  sheep.state = 'mouth-closed';
  sheep.initBase();

  sheepbaby = new Character('sheepbaby', ['slight-right', 'mouth-closed'], 80, 520, 440);
  sheepbaby.images['idle'] = loadImage('assets/images/sheepbaby/default.png');
  sheepbaby.state = 'mouth-closed';
  sheepbaby.initBase();

  owl = new Character('owl', [
    'eyes-closed-mouth-open',
    'eyes-closed',
    'mouth-closed'
  ], 100, 380, 420);

  graytortiecat = new Character('graytortiecat', ['fluffy', 'hairless', 'mouth-closed'], 100, 380, 420);
  graytortiecat.images['idle'] = loadImage('assets/images/graytortiecat/default.png');
  graytortiecat.state = 'mouth-closed';

  orangecat = new Character('orangecat', [
    'forward',
    'right-pose',
    'shifted-right',
    'talking-cat',
    'walk1',
    'walk2',
    'walk3',
    'mouth-closed'
  ], 100, 450, 430);
  orangecat.images['idle'] = loadImage('assets/images/orangecat/default.png');
  orangecat.state = 'mouth-closed';
  orangecat.initBase();

  chick = new Character('chick', ['eggcited', 'in-egg-open', 'mouth-closed'], 100, 380, 420);
  chick.images['idle'] = loadImage('assets/images/chick/default.png');
  chick.state = 'mouth-closed';

  bat = new Character('bat', ['mouth-closed'], 100, 420, 180);
  bat.images['idle'] = loadImage('assets/images/bat/default.png');
  bat.state = 'mouth-closed';
  bat.initBase();

  birdhouse = new Character('birdhouse', ['start', 'midway', 'done'], 100, 380, 420);
  birdhouse.state = 'start';
  birdhouse.initBase();
  birdhouse.states = ['start', 'midway', 'done'];
  birdhouse.baseState = 'start';
  birdhouse.update = function() {
    if (currentScene === 'flowers2') {
      this.setState('done');
    } else if (currentScene === 'grass') {
      this.setState('midway');
    } else {
      this.setState('start');
    }
  };
  birdhouse.display = function() {
    this.update();
    image(this.images[this.state], this.x, this.y, this.size, this.size);
  };
  // Optional: set x/y coordinates

  pig = {
    images: {
      swing1: loadImage('assets/images/pig/swing1.png'),
      swing2: loadImage('assets/images/pig/swing2.png'),
      'swing-neutral': loadImage('assets/images/pig/swing-neutral.png'),
      'swing-up': loadImage('assets/images/pig/swing-up.png'),
      default: loadImage('assets/images/pig/default.png'),
      'mouth-closed': loadImage('assets/images/pig/mouth-closed.png')
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
      if (currentScene === 'farmMap' || currentScene === 'swing') {
        if (this.current !== 'swing1' && this.current !== 'swing2') {
          this.current = 'swing1';
        }
        if (frameCount - this.lastSwitch > 60) {
          this.current = this.current === 'swing1' ? 'swing2' : 'swing1';
          this.lastSwitch = frameCount;
        }
      } else if (currentScene === 'swing2') {
        if (this.current !== 'swing-neutral' && this.current !== 'swing-up') {
          this.current = 'swing-neutral';
        }
        if (frameCount - this.lastSwitch > 60) {
          this.current =
            this.current === 'swing-neutral' ? 'swing-up' : 'swing-neutral';
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

  trayA = {
    images: { default: loadImage('assets/images/trays/trayA.png') },
    x: 500,
    y: 420,
    size: 80,
    baseX: 500,
    baseY: 420,
    baseSize: 80,
    display() {
      let dSize = this.size;
      let dx = this.x;
      let dy = this.y;
      if (
        currentScene === 'greenhouseInside' &&
        mouseX >= this.x &&
        mouseX <= this.x + this.size &&
        mouseY >= this.y &&
        mouseY <= this.y + this.size
      ) {
        dSize *= 1.05;
        dx -= (dSize - this.size) / 2;
        dy -= (dSize - this.size) / 2;
      }
      image(this.images.default, dx, dy, dSize, dSize);
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
    }
  };
  trayA.initBase();

  trayB = {
    images: { default: loadImage('assets/images/trays/trayB.png') },
    x: 360,
    y: 420,
    size: 80,
    baseX: 360,
    baseY: 420,
    baseSize: 80,
    display() {
      let dSize = this.size;
      let dx = this.x;
      let dy = this.y;
      if (
        currentScene === 'greenhouseInside' &&
        mouseX >= this.x &&
        mouseX <= this.x + this.size &&
        mouseY >= this.y &&
        mouseY <= this.y + this.size
      ) {
        dSize *= 1.05;
        dx -= (dSize - this.size) / 2;
        dy -= (dSize - this.size) / 2;
      }
      image(this.images.default, dx, dy, dSize, dSize);
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
    }
  };
  trayB.initBase();

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
  // Start with the continue button hidden; it will be shown
  // at the appropriate time by playDialogue
  continueBtn.style.display = 'none';
  backBtn = document.getElementById('backBtn');
  backBtn.addEventListener('click', goBackScene);
  backBtn.style.display = 'none';
  dialogueBox = document.getElementById('dialogueBox');
}

function draw() {
  background(220);
  picnicReached = picnicReached || currentScene === 'picnic';
  mapUnlocked = mapUnlocked || currentScene === 'farmMap';
  if (currentScene === 'pond2') {
    if (!dialoguesPlayed['pond2']) {
      if (!isDialogueActive()) {
        playDialogue('pond2');
      }
      moveLeft = moveRight = moveUp = moveDown = false;
      duckTargetX = null;
      duckTargetY = null;
      duck.setState('swim-down');
    } else {
      if (moveLeft || moveRight || moveUp || moveDown) {
        duckTargetX = null;
        duckTargetY = null;
        if (moveLeft)  duck.baseX -= duckMoveSpeed;
        if (moveRight) duck.baseX += duckMoveSpeed;
        if (moveUp)    duck.baseY -= duckMoveSpeed;
        if (moveDown)  duck.baseY += duckMoveSpeed;
        clampDuckPond2();
        if (moveLeft)      duck.setState('swim-left');
        else if (moveRight) duck.setState('swim-right');
        else if (moveUp)    duck.setState('swim-up');
        else if (moveDown)  duck.setState('swim-down');
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
        clampDuckPond2();
        duck.setState('swim-down');
      } else {
        duck.setState('swim-down');
      }
    }
  }
  if (currentScene !== 'pond2' &&
      ['swim-left','swim-right','swim-up','swim-down'].includes(duck.state)) {
    duck.setState('mouth-closed');
  }
  if (sceneHistory[sceneHistory.length - 1] !== currentScene) {
    sceneHistory.push(currentScene);
    if (currentScene === 'dogHouse') {
      dogHouseVisits++;
    }
    if (currentScene === 'greenhouseInside') {
      trayChoiceMade = false;
      trayOnTable = 'trayB';
      if (typeof trayA !== 'undefined' && typeof trayB !== 'undefined') {
        trayA.baseX = 500;
        trayA.baseY = 420;
        trayB.baseX = 360;
        trayB.baseY = 420;
        trayA.reset();
        trayB.reset();
      }
    }
  }
  backBtn.style.display = sceneHistory.length > 1 ? 'block' : 'none';
  drawScene(currentScene); // from scenes.js
  drawSceneCharacters(currentScene); // from scenes.js
  if (
    !isDialogueActive() &&
    currentScene === 'start' &&
    !dialoguesPlayed['start']
  ) {
    playDialogue('start');
  }
  if (!isDialogueActive() && currentScene === 'bench') {
    if (!dialoguesPlayed['benchIntro']) {
      playDialogue('benchIntro');
    } else if (mapUnlocked && !dialoguesPlayed['benchRest']) {
      updateBenchRestDialogue();
      playDialogue('benchRest');
    }
  }
  if (!isDialogueActive() && currentScene === 'dogHouse') {
    if (!dialoguesPlayed['dogHouse']) {
      playDialogue('dogHouse', () => {
        if (sceneCharacterSettings['dogHouse']?.dog) {
          sceneCharacterSettings['dogHouse'].dog.state = 'happy';
        }
      });
    } else if (dogHouseVisits > 1 && !dialoguesPlayed['dogHouseReturn']) {
      if (sceneCharacterSettings['dogHouse']?.dog) {
        sceneCharacterSettings['dogHouse'].dog.state = 'happy';
      }
      playDialogue('dogHouseReturn');
    }
  }
  if (
    !isDialogueActive() &&
    currentScene === 'dogHouse' &&
    dialoguesPlayed.dogHouse &&
    !dialoguesPlayed.dogHouseReturn
  ) {
    if (
      sceneCharacterSettings['dogHouse'] &&
      sceneCharacterSettings['dogHouse'].dog
    ) {
      sceneCharacterSettings['dogHouse'].dog.state = 'happy';
    }
    playDialogue('dogHouseReturn');
  }
  if (
    !isDialogueActive() &&
    currentScene !== 'bench' &&
    !pendingDialogueScene &&
    allLettersFoundForScene(currentScene) &&
    !dialoguesPlayed[currentScene]
  ) {
    playDialogue(currentScene);
  }
  if (currentScene === 'pond2' && dialoguesPlayed['pond2']) {
    checkDuckLetterCollision(duck);
  }
  if (currentScene === 'farmMap') {
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(16);
    scenes.interactiveAreas.forEach(area => {
      const lx = area.labelX !== undefined ? area.labelX : area.x + area.w / 2;
      const ly = area.labelY !== undefined ? area.labelY : area.y + area.h / 2;
      const label = area.label || area.name;
      text(label, lx, ly);
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
  if (currentScene === 'start') {
    image(duckRabbitIcon, width / 2 - 100, height / 2 - 100, 200, 200);
  } else {
    image(duckRabbitIcon, width - 70, 10, 60, 60);
  }
  drawLetters(currentScene); // draw letters on top
}

function mousePressed() {
  handleSceneClicks(mouseX, mouseY);
  handleLetterClicks(mouseX, mouseY);
  if (currentScene === 'pond2' && dialoguesPlayed['pond2']) {
    duckTargetX = mouseX;
    duckTargetY = mouseY;
  }
  if (currentScene === 'barn') {
    const letterV = letters.find(l => l.scene === 'barn' && l.letter === 'V');
    if (letterV && letterV.found && dialoguesPlayed['barn']) {
      if (
        mouseX > donkey.x &&
        mouseX < donkey.x + donkey.size &&
        mouseY > donkey.y &&
        mouseY < donkey.y + donkey.size
      ) {
        if (typeof playSound === 'function') playSound('donkey');
        currentScene = 'donkey';
        sceneIndex = orderedScenes.indexOf('barn');
        return;
      }
      if (
        mouseX > bat.x &&
        mouseX < bat.x + bat.size &&
        mouseY > bat.y &&
        mouseY < bat.y + bat.size
      ) {
        if (typeof playSound === 'function') playSound('bat');
        currentScene = 'barnInside';
        sceneIndex = orderedScenes.indexOf('barnInside');
        return;
      }
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
  highlightMissingLetters(currentScene);
}

function updateBenchRestDialogue() {
  if (!Array.isArray(dialogues.benchRest) || dialogues.benchRest.length < 2) {
    return;
  }
  const lettersLeft = (letters?.length || 26) - lettersFoundCount;
  if (lettersLeft <= 0) {
    dialogues.benchRest[1].text =
      'We worked hard finding all of the letters and learning about philosophy.';
  } else {
    const plural = lettersLeft === 1 ? 'letter' : 'letters';
    dialogues.benchRest[1].text =
      `Good idea! We have ${lettersLeft} ${plural} left to find.`;
  }
}

function advanceScene() {
  if (typeof playSound === 'function') playSound('continue');
  if (currentScene === 'donkey') {
    if (typeof playSound === 'function') playSound('transition');
    currentScene = 'barn';
    sceneIndex = orderedScenes.indexOf('barn');
    continueBtn.style.display = 'none';
    return;
  }
  if (['studio','mirror','radioRoom'].includes(currentScene)) {
    if (typeof playSound === 'function') playSound('transition');
    currentScene = 'barnInside';
    sceneIndex = orderedScenes.indexOf('barnInside');
    continueBtn.style.display = 'none';
    return;
  }
  if (currentScene === 'barnInside') {
    continueBtn.style.display = 'none';
    return;
  }
  sceneIndex++;
  if (sceneIndex >= orderedScenes.length) {
    continueBtn.style.display = 'none';
    return;
  }
  if (typeof playSound === 'function') playSound('transition');
  currentScene = orderedScenes[sceneIndex];
  // Hide the button immediately after switching scenes; it will be
  // displayed again when the next dialogue finishes.
  continueBtn.style.display = 'none';
}

function goBackScene() {
  if (sceneHistory.length > 1) {
    sceneHistory.pop();
    if (typeof playSound === 'function') playSound('transition');
    currentScene = sceneHistory[sceneHistory.length - 1];
    const idx = orderedScenes.indexOf(currentScene);
    if (idx !== -1) sceneIndex = idx;
    continueBtn.style.display = 'none';
    if (currentScene === 'bench') {
      const dlg = mapUnlocked ? 'benchRest' : 'benchIntro';
      if (dlg === 'benchRest') {
        updateBenchRestDialogue();
      }
      playDialogue(dlg);
    } else if (currentScene === 'pond2') {
      const letterD = letters.find(l => l.scene === 'pond2' && l.letter === 'D');
      playDialogue('pond2', () => {
        if (letterD && letterD.found) {
          continueBtn.style.display = 'block';
        }
      });
  } else if (
    sceneHasLetters(currentScene) &&
    allLettersFoundForScene(currentScene) &&
    !pendingDialogueScene
  ) {
    playDialogue(currentScene);
  }
  }
}

function keyPressed() {
  if (currentScene === 'pond2' && !dialoguesPlayed['pond2']) return;
  if (keyCode === LEFT_ARROW) moveLeft = true;
  if (keyCode === RIGHT_ARROW) moveRight = true;
  if (keyCode === UP_ARROW) moveUp = true;
  if (keyCode === DOWN_ARROW) moveDown = true;
}

function keyReleased() {
  if (currentScene === 'pond2' && !dialoguesPlayed['pond2']) return;
  if (keyCode === LEFT_ARROW) moveLeft = false;
  if (keyCode === RIGHT_ARROW) moveRight = false;
  if (keyCode === UP_ARROW) moveUp = false;
  if (keyCode === DOWN_ARROW) moveDown = false;
}
