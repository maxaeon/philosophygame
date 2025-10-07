let currentScene = 'start';
// Declare character variables with var so they become properties on the global
// window object. drawSceneCharacters in scenes.js accesses characters via
// window[name], so using var ensures they are available there.
var duck, rabbit, donkey, dog, sheep, sheepbaby, owl, graytortiecat, orangecat, chick, bat, birdhouse, pig, duckRabbitSwing, trayA, trayB, robinFamily;
let letterGFound = false;
let letterHFound = false;
let duckRabbitIcons = [], duckRabbitIconIndex = 0, barnIcon, answersIcon;
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

function updateCursor() {
  let usePointer = false;

  const chars = sceneCharacters && sceneCharacters[currentScene];
  if (Array.isArray(chars)) {
    for (const name of chars) {
      const charObj = window[name];
      if (
        charObj &&
        charObj.interactive &&
        typeof charObj.isHovered === 'function' &&
        charObj.isHovered()
      ) {
        usePointer = true;
        break;
      }
    }
  }

  if (!usePointer) {
    if (currentScene === 'farmMap' && Array.isArray(scenes.interactiveAreas)) {
      for (const area of scenes.interactiveAreas) {
        const within =
          mouseX > area.x &&
          mouseX < area.x + area.w &&
          mouseY > area.y &&
          mouseY < area.y + area.h;
        if (within) {
          usePointer = true;
          break;
        }
      }
    } else {
      const key = currentScene + 'Areas';
      const areas = scenes[key];
      if (Array.isArray(areas)) {
        for (const area of areas) {
          const within =
            mouseX >= area.x &&
            mouseX <= area.x + area.w &&
            mouseY >= area.y &&
            mouseY <= area.y + area.h;
          if (within) {
            usePointer = true;
            break;
          }
        }
      }
    }
  }

  if (!usePointer && Array.isArray(letters)) {
    for (const l of letters) {
      if (l.scene === currentScene && !l.found) {
        const half = l.size / 2;
        const within =
          mouseX >= l.x - half &&
          mouseX <= l.x + half &&
          mouseY >= l.y - half &&
          mouseY <= l.y + half;
        if (within) {
          usePointer = true;
          break;
        }
      }
    }
  }

  if (
    !usePointer &&
    lettersFoundCount > 0 &&
    mouseX >= width - 60 &&
    mouseX <= width - 10 &&
    mouseY >= height - 60 &&
    mouseY <= height - 10
  ) {
    usePointer = true;
  }

  cursor(usePointer ? 'pointer' : 'default');
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
let pond2Visits = 0;
let radioRoomVisits = 0;
let loftEntranceVisits = 0;
let studioVisits = 0;
let greenhouseInsideVisits = 0;
let donkeyVisits = 0;
let picnicVisits = 0;
let vegetablesVisits = 0;
let fieldVisits = 0;
let mirrorVisits = 0;
let flowersVisits = 0;

function preload() {
  if (typeof preloadSounds === 'function') preloadSounds();
  duck = new Character('duck', [
    'left',
    'right',
    'left-eyes-closed',
    'eyes-closed',
    'meditating',
    'slight-left',
    'mouth-closed',
    'backwards',
    'swim-up',
    'swim-down',
    'swim-right',
    'swim-left'
  ], 100, 360, 420);
  rabbit = new Character('rabbit', [
    'mouth-closed',
    'eyes-closed',
    'meditating',
    'backwards'
  ], 100, 420, 420);
  // Donkey has a default image plus open and closed mouth states
  donkey = new Character('donkey', ['open', 'closed', 'mouth-closed'], 100, 380, 420);
  donkey.images['idle'] = loadImage('assets/images/donkey/default.png');
  donkey.state = 'mouth-closed';
  donkey.initBase();

  dog = new Character('dog', ['happy', 'sad', 'sad-talking', 'mouth-closed'], 100, 620, 440);
  dog.images['idle'] = loadImage('assets/images/dog/default.png');
  dog.state = 'mouth-closed';
  dog.initBase();
  dog.setStateScale('sad-talking', 1);

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

  sheepbaby = new Character('sheepbaby', ['slight-right'], 80, 520, 440);
  sheepbaby.images['idle'] = loadImage('assets/images/sheepbaby/default.png');
  sheepbaby.state = 'slight-right';
  sheepbaby.initBase();

  owl = new Character('owl', [
    'eyes-closed-mouth-open',
    'eyes-closed',
    'mouth-closed',
    'meditating',
    'meditating-mouth-open'
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
          if (typeof playSound === 'function') {
            playSound(this.current === 'swing1' ? 'pig1' : 'pig2');
          }
        }
      } else if (currentScene === 'swing2') {
        if (this.current !== 'swing-neutral' && this.current !== 'swing-up') {
          this.current = 'swing-neutral';
        }
        if (frameCount - this.lastSwitch > 60) {
          this.current =
            this.current === 'swing-neutral' ? 'swing-up' : 'swing-neutral';
          this.lastSwitch = frameCount;
          if (typeof playSound === 'function') {
            playSound(this.current === 'swing-neutral' ? 'pig1' : 'pig2');
          }
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
    x: 470,
    y: 420,
    size: 80,
    baseX: 470,
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
    x: 345,
    y: 420,
    size: 80,
    baseX: 345,
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

  robinFamily = {
    img: loadImage('assets/images/robins/family.png'),
    x: 300,
    y: 250,
    size: 200,
    baseX: 300,
    baseY: 250,
    baseSize: 200,
    display() {
      image(this.img, this.x, this.y, this.size, this.size);
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
    setState() {}
  };
  robinFamily.initBase();

  duckRabbitIcons = [
    loadImage('assets/images/icons/duck-rabbit1.png'),
    loadImage('assets/images/icons/duck-rabbit.png'),
    loadImage('assets/images/icons/duck-rabbit2.png')
  ];
  barnIcon = loadImage('assets/images/icons/barndefault.png');
  mapIcon = loadImage('assets/images/icons/map.png');
  answersIcon = loadImage('assets/images/icons/rabbit.png');

  preloadScenes();
  preloadLetters();
}

function getCanvasSize() {
  const aspect = 4 / 3;
  let w = Math.min(windowWidth, 800);
  let h = w / aspect;
  if (h > windowHeight) {
    h = Math.min(windowHeight, 600);
    w = h * aspect;
  }
  return { w, h };
}

function getCanvasScale() {
  return width / (typeof BASE_W !== 'undefined' ? BASE_W : width);
}

function applyCanvasSize() {
  const { w, h } = getCanvasSize();
  resizeCanvas(w, h);
  const scale = getCanvasScale();
  if (typeof scaleLetters === 'function') {
    scaleLetters(scale);
  }
  if (typeof scaleInteractiveAreas === 'function') {
    scaleInteractiveAreas(scale);
  }
  initLetterBottomPositions();
  letters.forEach(l => {
    if (l.found) {
      l.x = l.bottomX;
      l.y = l.bottomY;
    }
  });
  if (typeof basePositions !== 'undefined') {
    Object.keys(basePositions).forEach(name => {
      const obj = window[name];
      if (obj && obj.lastScene !== undefined) {
        obj.lastScene = null;
      }
    });
  }
}

function setup() {
  const { w, h } = getCanvasSize();
  createCanvas(w, h);
  const scale = getCanvasScale();
  if (typeof scaleLetters === 'function') {
    scaleLetters(scale);
  }
  setupScenes();
  if (typeof scaleInteractiveAreas === 'function') {
    scaleInteractiveAreas(scale);
  }
  initLetterBottomPositions();
  letters.forEach(l => {
    if (l.found) {
      l.x = l.bottomX;
      l.y = l.bottomY;
    }
  });
  continueBtn = document.getElementById('continueBtn');
  continueBtn.addEventListener('click', advanceScene);
  // Start with the continue button hidden; it will be shown
  // at the appropriate time by playDialogue
  continueBtn.style.display = 'none';
  // Temporarily disable the back button due to navigation issues.  We
  // still grab the element so the code can easily be re-enabled later.
  backBtn = document.getElementById('backBtn');
  // backBtn.addEventListener('click', goBackScene);
  // backBtn.style.display = 'none';
  dialogueBox = document.getElementById('dialogueBox');
}

function draw() {
  background(220);
  updateCursor();
  const scale = typeof getCanvasScale === 'function' ? getCanvasScale() : 1;
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
    } else if (pond2Visits > 1 && !dialoguesPlayed['pond2Return']) {
      if (!isDialogueActive()) {
        playDialogue('pond2Return');
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
      dialoguesPlayed['dogHouseReturn'] = false;
    }
    if (currentScene === 'pond2') {
      pond2Visits++;
    }
    if (currentScene === 'radioRoom') {
      radioRoomVisits++;
      dialoguesPlayed['radioRoomReturn'] = false;
    }
    if (currentScene === 'loftEntrance') {
      loftEntranceVisits++;
      dialoguesPlayed['loftEntranceReturn'] = false;
    }
    if (currentScene === 'studio') {
      studioVisits++;
      dialoguesPlayed['studioReturn'] = false;
    }
    if (currentScene === 'donkey') {
      donkeyVisits++;
    }
      if (currentScene === 'picnic') {
      picnicVisits++;
      dialoguesPlayed['picnicReturn'] = false;
    }
    if (currentScene === 'vegetables') {
      vegetablesVisits++;
      dialoguesPlayed['vegetablesReturn'] = false;
    }
    if (currentScene === 'flowers') {
      flowersVisits++;
      dialoguesPlayed['flowersReturn'] = false;

      if (flowersVisits > 1 && mapUnlocked && Array.isArray(sceneCharacters['flowers'])) {
        sceneCharacters['flowers'] = sceneCharacters['flowers'].filter(c => c !== 'owl' && c !== 'birdhouse');
        if (!sceneCharacters['flowers'].includes('robinFamily')) {
          sceneCharacters['flowers'].push('robinFamily');
        }
      }

      if (sceneCharacterSettings['flowers']) {
        if (flowersVisits > 1) {
          sceneCharacterSettings['flowers'].owl.size = 0;
          sceneCharacterSettings['flowers'].birdhouse.size = 0;
          sceneCharacterSettings['flowers'].duck = { x: 560, y: 500, size: 100 };
          sceneCharacterSettings['flowers'].rabbit = { x: 620, y: 500, size: 100 };
        } else {
          sceneCharacterSettings['flowers'].owl = { x: 160, y: 320, size: 100, state: 'mouth-closed' };
          sceneCharacterSettings['flowers'].birdhouse = { x: 380, y: 480, size: 100 };
          sceneCharacterSettings['flowers'].duck = { x: 360, y: 420, size: 100 };
          sceneCharacterSettings['flowers'].rabbit = { x: 420, y: 420, size: 100 };
        }
      }
    }
    if (currentScene === 'field') {
      fieldVisits++;
      dialoguesPlayed['fieldReturn'] = false;
    }
    if (currentScene === 'mirror') {
      mirrorVisits++;
      dialoguesPlayed['mirrorReturn'] = false;
    }
    if (currentScene === 'loft') {
      dialoguesPlayed['loft'] = false;
    }
    if (currentScene === 'swing') {
      dialoguesPlayed['swing'] = false;
    }
    if (currentScene === 'greenhouseInside') {
      greenhouseInsideVisits++;
      trayChoiceMade = false;
      dialoguesPlayed['greenhouseInside'] = false;
      dialoguesPlayed['greenhouseInsideReturn'] = false;
      if (greenhouseInsideVisits === 1) {
        trayOnTable = 'trayB';
        if (typeof trayA !== 'undefined' && typeof trayB !== 'undefined') {
          const scale =
            typeof getCanvasScale === 'function' ? getCanvasScale() : 1;
          trayA.baseX = 470 * scale;
          trayA.baseY = 420 * scale;
          trayB.baseX = 345 * scale;
          trayB.baseY = 420 * scale;
        }
      }
      if (typeof trayA !== 'undefined' && typeof trayB !== 'undefined') {
        const scale =
          typeof getCanvasScale === 'function' ? getCanvasScale() : 1;
        sceneCharacterSettings['greenhouseInside'].trayA.x = trayA.baseX / scale;
        sceneCharacterSettings['greenhouseInside'].trayA.y = trayA.baseY / scale;
        sceneCharacterSettings['greenhouseInside'].trayB.x = trayB.baseX / scale;
        sceneCharacterSettings['greenhouseInside'].trayB.y = trayB.baseY / scale;
        trayA.reset();
        trayB.reset();
      }
    }
  }
  // backBtn.style.display = sceneHistory.length > 1 ? 'block' : 'none';
  drawScene(currentScene); // from scenes.js
  drawSceneCharacters(currentScene); // from scenes.js
  if (currentScene === 'flowers' && flowersVisits > 1 && robinFamily) {
    robinFamily.display();
  }
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
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('B') && currentScene === 'dogHouse') {
    if (!dialoguesPlayed['dogHouse']) {
      playDialogue('dogHouse', () => {
        if (sceneCharacterSettings['dogHouse'] && sceneCharacterSettings['dogHouse'].dog) {
          sceneCharacterSettings['dogHouse'].dog.state = 'happy';
        }
        if (typeof dog !== 'undefined') {
          dog.baseState = 'happy';
          dog.setState('happy');
        }
      });
    } else if (dogHouseVisits > 1 && !dialoguesPlayed['dogHouseReturn']) {
      if (sceneCharacterSettings['dogHouse'] && sceneCharacterSettings['dogHouse'].dog) {
        sceneCharacterSettings['dogHouse'].dog.state = 'happy';
      }
      if (typeof dog !== 'undefined') {
        dog.baseState = 'happy';
        dog.setState('happy');
      }
      playDialogue('dogHouseReturn', () => {
        if (sceneCharacterSettings['dogHouse'] && sceneCharacterSettings['dogHouse'].dog) {
          sceneCharacterSettings['dogHouse'].dog.state = 'happy';
        }
        if (typeof dog !== 'undefined') {
          dog.baseState = 'happy';
          dog.setState('happy');
        }
      });
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('S', 'donkey') && currentScene === 'donkey') {
    if (!dialoguesPlayed['donkey']) {
      playDialogue('donkey');
    } else if (donkeyVisits > 1 && !dialoguesPlayed['donkeyReturn']) {
      playDialogue('donkeyReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('K') && currentScene === 'field') {
    if (!dialoguesPlayed['field']) {
      playDialogue('field');
    } else if (fieldVisits > 1 && !dialoguesPlayed['fieldReturn']) {
      playDialogue('fieldReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('F') && currentScene === 'flowers') {
    if (!dialoguesPlayed['flowers']) {
      playDialogue('flowers');
    } else if (flowersVisits > 1 && !dialoguesPlayed['flowersReturn']) {
      playDialogue('flowersReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('O') && currentScene === 'radioRoom') {
    if (!dialoguesPlayed['radioRoom']) {
      playDialogue('radioRoom', () => {
        if (sceneCharacterSettings['radioRoom'] && sceneCharacterSettings['radioRoom'].chick) {
          sceneCharacterSettings['radioRoom'].chick.state = 'in-egg-open';
        }
        if (typeof chick !== 'undefined') {
          chick.baseState = 'in-egg-open';
          chick.setState('in-egg-open');
        }
      });
    } else if (radioRoomVisits > 1 && !dialoguesPlayed['radioRoomReturn']) {
      playDialogue('radioRoomReturn', () => {
        if (sceneCharacterSettings['radioRoom'] && sceneCharacterSettings['radioRoom'].chick) {
          sceneCharacterSettings['radioRoom'].chick.state = 'in-egg-open';
        }
        if (typeof chick !== 'undefined') {
          chick.baseState = 'in-egg-open';
          chick.setState('in-egg-open');
        }
      });
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('W') && currentScene === 'loftEntrance') {
    if (!dialoguesPlayed['loftEntrance']) {
      playDialogue('loftEntrance');
    } else if (loftEntranceVisits > 1 && !dialoguesPlayed['loftEntranceReturn']) {
      playDialogue('loftEntranceReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('I') && currentScene === 'studio') {
    if (!dialoguesPlayed['studio']) {
      playDialogue('studio');
    } else if (studioVisits > 1 && !dialoguesPlayed['studioReturn']) {
      playDialogue('studioReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('Y') && currentScene === 'mirror') {
    if (!dialoguesPlayed['mirror']) {
      playDialogue('mirror');
    } else if (mirrorVisits > 1 && !dialoguesPlayed['mirrorReturn']) {
      playDialogue('mirrorReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('E', 'greenhouseInside') && currentScene === 'greenhouseInside') {
    if (
      greenhouseInsideVisits > 1 &&
      trayOnTable === 'trayA' &&
      !dialoguesPlayed['greenhouseInsideReturn']
    ) {
      dialoguesPlayed['greenhouseInside'] = true;
      playDialogue('greenhouseInsideReturn');
    } else if (!dialoguesPlayed['greenhouseInside']) {
      playDialogue('greenhouseInside');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('T', 'vegetables') && currentScene === 'vegetables') {
    if (!dialoguesPlayed['vegetables']) {
      playDialogue('vegetables');
    } else if (vegetablesVisits > 1 && !dialoguesPlayed['vegetablesReturn']) {
      playDialogue('vegetablesReturn');
    }
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('Z') && currentScene === 'loft' && !dialoguesPlayed['loft']) {
    playDialogue('loft');
  }
  if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('G') && currentScene === 'swing' && !dialoguesPlayed['swing']) {
    playDialogue('swing');
  }
        if (!isDialogueActive() && !pendingDialogueScene && isLetterFound('A', 'picnic') && currentScene === 'picnic') {
    if (!dialoguesPlayed['picnic']) {
      playDialogue('picnic');
    } else if (picnicVisits > 1 && !dialoguesPlayed['picnicReturn']) {
      playDialogue('picnicReturn');
    }
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
  if (currentScene === 'barnInside') {
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(16);
    scenes.barnInsideAreas.forEach(area => {
      const lx = area.labelX !== undefined ? area.labelX : area.x + area.w / 2;
      const ly = area.labelY !== undefined ? area.labelY : area.y + area.h / 2;
      const label = area.label || area.name;
      text(label, lx, ly);
    });
  }
  if (currentScene === 'donkey') {
    const bSize = 50 * scale;
    const bx = 50 * scale;
    const by = 180 * scale;
    image(barnIcon, bx, by, bSize, bSize);
  }
  if (
    mapUnlocked &&
    currentScene !== 'farmMap' &&
    allLettersFoundForScene(currentScene)
  ) {
    let mSize = 50 * scale;
    let mxPos = 10 * scale;
    let myPos = 10 * scale;
    let dSize = mSize;
    let dx = mxPos;
    let dy = myPos;
    if (
      mouseX >= mxPos &&
      mouseX <= mxPos + mSize &&
      mouseY >= myPos &&
      mouseY <= myPos + mSize
    ) {
      dSize *= 1.05;
      dx -= (dSize - mSize) / 2;
      dy -= (dSize - mSize) / 2;
    }
    image(mapIcon, dx, dy, dSize, dSize);
  }
  if (lettersFoundCount > 0) {
    let aSize = 50 * scale;
    let ax = width - 60 * scale;
    let ay = height - 60 * scale;
    let adSize = aSize;
    let adx = ax;
    let ady = ay;
    if (
      mouseX >= ax &&
      mouseX <= ax + aSize &&
      mouseY >= ay &&
      mouseY <= ay + aSize
    ) {
      adSize *= 1.05;
      adx -= (adSize - aSize) / 2;
      ady -= (adSize - aSize) / 2;
    }
    image(answersIcon, adx, ady, adSize, adSize);
  }
  const baseDrSize = currentScene === 'start' ? 200 : 60;
  let drSize = baseDrSize * scale;
  let drX = currentScene === 'start'
    ? width / 2 - drSize / 2
    : width - drSize - 10;
  let drY = currentScene === 'start' ? height / 2 - drSize / 2 : 10;
  let dSize = drSize;
  let dx = drX;
  let dy = drY;
  if (
    mouseX >= drX &&
    mouseX <= drX + drSize &&
    mouseY >= drY &&
    mouseY <= drY + drSize
  ) {
    dSize *= 1.05;
    dx -= (dSize - drSize) / 2;
    dy -= (dSize - drSize) / 2;
  }
  const drIcon = duckRabbitIcons[duckRabbitIconIndex];
  if (drIcon.width && drIcon.height) {
    const aspect = drIcon.width / drIcon.height;
    let drawW = dSize;
    let drawH = dSize;
    if (aspect > 1) {
      drawH = dSize / aspect;
    } else if (aspect < 1) {
      drawW = dSize * aspect;
    }
    const offsetX = (dSize - drawW) / 2;
    const offsetY = (dSize - drawH) / 2;
    image(drIcon, dx + offsetX, dy + offsetY, drawW, drawH);
  } else {
    image(drIcon, dx, dy, dSize, dSize);
  }
  drawLetters(currentScene); // draw letters on top
}

function mousePressed() {
  // When dialogue is active, let the dialogue box handle clicks to
  // advance the conversation instead of closing it immediately.
  if (isDialogueActive()) {
    return;
  }
  const infoBox = document.getElementById('letterInfoBox');
  if (infoBox && infoBox.style.display === 'block') return;
  const scale = typeof getCanvasScale === 'function' ? getCanvasScale() : 1;
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
        if (typeof playSound === 'function') {
          playSound('click');
          playSound('donkey');
        }
        if (typeof stopDialogue === 'function') stopDialogue();
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
        if (typeof playSound === 'function') {
          playSound('click');
          playSound('bat');
        }
        if (typeof stopDialogue === 'function') stopDialogue();
        currentScene = 'barnInside';
        sceneIndex = orderedScenes.indexOf('barnInside');
        return;
      }
    }
  }
  if (currentScene === 'donkey') {
    const bx1 = 50 * scale;
    const bx2 = 100 * scale;
    const by1 = 160 * scale;
    const by2 = 210 * scale;
    if (mouseX >= bx1 && mouseX <= bx2 && mouseY >= by1 && mouseY <= by2) {
      if (typeof playSound === 'function') playSound('click');
      if (typeof stopDialogue === 'function') stopDialogue();
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
    const mx1 = 10 * scale;
    const mx2 = 60 * scale;
    const my1 = 10 * scale;
    const my2 = 60 * scale;
    if (mouseX >= mx1 && mouseX <= mx2 && mouseY >= my1 && mouseY <= my2) {
      if (typeof playSound === 'function') playSound('click');
      if (typeof stopDialogue === 'function') stopDialogue();
      currentScene = 'farmMap';
      return;
    }
  }
  if (lettersFoundCount > 0) {
    const aSize = 50 * scale;
    const ax = width - 60 * scale;
    const ay = height - 60 * scale;
    if (
      mouseX >= ax &&
      mouseX <= ax + aSize &&
      mouseY >= ay &&
      mouseY <= ay + aSize
    ) {
      if (typeof playSound === 'function') playSound('click');
      showAnswers();
      return;
    }
  }
  const baseDrSize = currentScene === 'start' ? 200 : 60;
  const drSize = baseDrSize * scale;
  const drX = currentScene === 'start'
    ? width / 2 - drSize / 2
    : width - drSize - 10;
  const drY = currentScene === 'start' ? height / 2 - drSize / 2 : 10;
  if (
    mouseX >= drX &&
    mouseX <= drX + drSize &&
    mouseY >= drY &&
    mouseY <= drY + drSize
  ) {
    if (typeof playSound === 'function') playSound('click');
    duckRabbitIconIndex = (duckRabbitIconIndex + 1) % duckRabbitIcons.length;
    showAdvice();
  }
}

function showAdvice() {
  const box = document.getElementById('adviceBox');
  if (!box) return;
  let msg;
  if (lettersFoundCount >= 26) {
    msg = 'Duck-Rabbit says: Great job finding all the letters!';
  } else {
    msg = 'Duck-Rabbit says: Think about things from a different perspective!';
  }
  box.textContent = msg;
  box.style.display = 'block';
  if (typeof box.focus === 'function') box.focus();
  const hide = () => {
    box.style.display = 'none';
    box.onclick = null;
  };
  box.onclick = hide;
  setTimeout(hide, 6000);
  highlightMissingLetters(currentScene);
}

function showAnswers() {
  const box = document.getElementById('answersBox');
  const content = document.getElementById('answersContent');
  if (!box || !content) return;
  let html = '';
  letters.forEach(l => {
    html += `<div class="answer-row"><strong>${l.letter} for ${l.concept}</strong><br><em>${l.question}</em><br><input type="text" maxlength="50" value="${l.answer || ''}" data-letter="${l.letter}"></div>`;
  });
  content.innerHTML = html;
  box.style.display = 'block';
  // Add export button inside modal
  var expDivider = document.createElement('hr');
  var exp = document.createElement('button');
  exp.textContent = 'Export reasoning JSON';
  exp.onclick = function(){ if (typeof exportReasonTrace === 'function') exportReasonTrace(); };
  content.appendChild(expDivider);
  content.appendChild(exp);
  const closeBtn = document.getElementById('closeAnswersBtn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      content.querySelectorAll('input[data-letter]').forEach(inp => {
        const lt = letters.find(x => x.letter === inp.dataset.letter);
        if (lt) lt.answer = inp.value.slice(0, 50);
      });
      box.style.display = 'none';
    };
  }
}

function updateBenchRestDialogue() {
  if (!Array.isArray(dialogues.benchRest) || dialogues.benchRest.length < 2) {
    return;
  }
  const lettersLeft = ((letters && letters.length) || 26) - lettersFoundCount;
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
  if (currentScene === 'farmMap') {
    if (continueBtn) continueBtn.style.display = 'none';
    return;
  }
  if (typeof playSound === 'function') playSound('continue');
  if (currentScene === 'donkey') {
    if (typeof playSound === 'function') playSound('transition');
    if (typeof stopDialogue === 'function') stopDialogue();
    if (typeof hideLetterInfo === 'function') hideLetterInfo();
    currentScene = 'barn';
    sceneIndex = orderedScenes.indexOf('barn');
    continueBtn.style.display = 'none';
    return;
  }
  if (['studio','mirror','radioRoom'].includes(currentScene)) {
    if (typeof playSound === 'function') playSound('transition');
    if (typeof stopDialogue === 'function') stopDialogue();
    if (typeof hideLetterInfo === 'function') hideLetterInfo();
    currentScene = 'barnInside';
    sceneIndex = orderedScenes.indexOf('barnInside');
    continueBtn.style.display = 'none';
    return;
  }
  if (currentScene === 'barnInside') {
    continueBtn.style.display = 'none';
    return;
  }
  if (currentScene === 'flowers' && flowersVisits > 1) {
    if (typeof playSound === 'function') playSound('transition');
    if (typeof stopDialogue === 'function') stopDialogue();
    if (typeof hideLetterInfo === 'function') hideLetterInfo();
    currentScene = 'farmMap';
    sceneIndex = orderedScenes.indexOf('farmMap');
    continueBtn.style.display = 'none';
    return;
  }
  sceneIndex++;
  if (sceneIndex >= orderedScenes.length) {
    continueBtn.style.display = 'none';
    return;
  }
  if (typeof playSound === 'function') playSound('transition');
  if (typeof stopDialogue === 'function') stopDialogue();
  if (typeof hideLetterInfo === 'function') hideLetterInfo();
  currentScene = orderedScenes[sceneIndex];
  // Hide the button immediately after switching scenes; it will be
  // displayed again when the next dialogue finishes.
  continueBtn.style.display = 'none';
}

function goBackScene() {
  if (sceneHistory.length > 1) {
    sceneHistory.pop();
    if (typeof playSound === 'function') playSound('back');
    if (typeof stopDialogue === 'function') stopDialogue();
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
  if (currentScene === 'pond2' && isDialogueActive()) return;
  if (keyCode === LEFT_ARROW) moveLeft = true;
  if (keyCode === RIGHT_ARROW) moveRight = true;
  if (keyCode === UP_ARROW) moveUp = true;
  if (keyCode === DOWN_ARROW) moveDown = true;
}

function keyReleased() {
  if (currentScene === 'pond2' && isDialogueActive()) return;
  if (keyCode === LEFT_ARROW) moveLeft = false;
  if (keyCode === RIGHT_ARROW) moveRight = false;
  if (keyCode === UP_ARROW) moveUp = false;
  if (keyCode === DOWN_ARROW) moveDown = false;
}

function windowResized() {
  applyCanvasSize();
}

(function setupInquiryUI(){
  var exportBtn = document.getElementById('exportBtn');
  if (exportBtn && typeof exportReasonTrace === 'function') {
    exportBtn.onclick = exportReasonTrace;
  }
  var badgesEl = document.getElementById('badges');
  if (badgesEl) {
    window.renderBadges = function(){
      if (typeof virtueBadges === 'undefined') return;
      var labels = { curiosity:"Curiosity", charity:"Charity", consistency:"Consistency", courage:"Courage", patience:"Patience" };
      var html = '';
      for (var k in labels) { html += '<span class="badge">'+labels[k]+': '+(virtueBadges[k]||0)+'</span>'; }
      badgesEl.innerHTML = html;
    };
    renderBadges();
  }
})();
