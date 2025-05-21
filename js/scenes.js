let scenes = {};

function preloadScenes() {
  scenes.farmMap = loadImage('assets/images/scenes/farmMap.png');
  scenes.cave = loadImage('assets/images/scenes/cave.png');
  scenes.greenhouse = loadImage('assets/images/scenes/greenhouse.png');

  scenes.barn = loadImage('assets/images/scenes/barn.png');
  scenes.barnInside = loadImage('assets/images/scenes/barnInside.png');
  scenes.bench = loadImage('assets/images/scenes/bench.png');
  scenes.dogHouse = loadImage('assets/images/scenes/dogHouse.png');
  scenes.donkey = loadImage('assets/images/scenes/donkey.png');
  scenes.field = loadImage('assets/images/scenes/field.png');
  scenes.flowers = loadImage('assets/images/scenes/flowers.png');
  scenes.flowers2 = loadImage('assets/images/scenes/flowers2.png');
  scenes.vegetables2 = loadImage('assets/images/scenes/vegetables2.png');
  scenes.grass = loadImage('assets/images/scenes/grass.png');
  scenes.greenhouseInside = loadImage('assets/images/scenes/greenhouseInside.png');
  scenes.loft = loadImage('assets/images/scenes/loft.png');
  scenes.loftEntrance = loadImage('assets/images/scenes/loftEntrance.png');
  scenes.mirror = loadImage('assets/images/scenes/mirror.png');
  scenes.picnic = loadImage('assets/images/scenes/picnic.png');
  scenes.pond = loadImage('assets/images/scenes/pond.png');
  scenes.pond2 = loadImage('assets/images/scenes/pond2.png');
  scenes.radioRoom = loadImage('assets/images/scenes/radioRoom.png');
  scenes.studio = loadImage('assets/images/scenes/studio.png');
  scenes.swing = loadImage('assets/images/scenes/swing.png');
  scenes.swing2 = loadImage('assets/images/scenes/swing2.png');
  scenes.start = loadImage('assets/images/scenes/start.png');
  scenes.vegetables = loadImage('assets/images/scenes/vegetables.png');
  scenes.tunnel = loadImage('assets/images/scenes/tunnel.png');
}

function setupScenes() {
  // Define interactive areas on the farm map
  scenes.interactiveAreas = [
    {name: 'barn', label: 'barn', x: 220, y: 10,  w: 200, h: 200},
    {name: 'swing', label: 'swing', x: 460, y: 0,   w: 50,  h: 50},
    {name: 'dogHouse', label: 'doghouse', x: 30,  y: 30,  w: 50,  h: 50, labelY: 75},
    {name: 'bench', label: 'bench', x: 20,  y: 370, w: 70,  h: 70},
    {name: 'pond', label: 'pond', x: 450, y: 380, w: 100, h: 100},
    {name: 'greenhouse', label: 'greenhouse', x: 500, y: 175, w: 50,  h: 50},
    {name: 'picnic', label: 'picnic', x: 700, y: 140, w: 50,  h: 50},
    {name: 'vegetables', label: 'vegetables', x: 715, y: 300, w: 50, h: 50}
  ];

  // Interactive areas inside the barn
  scenes.barnInsideAreas = [
    {name: 'mirror', label: 'mirror', x: 120,  y: 350, w: 100, h: 100},
    {name: 'radioRoom', label: 'radio room', x: 30,  y: 450, w: 100, h: 100},
    {name: 'loftEntrance', label: 'loft entrance', x: 640, y: 350, w: 100, h: 100, labelX: 680},
    {name: 'studio', label: 'studio', x: 690, y: 450, w: 100, h: 100, labelX: 745}
  ];
}

function drawScene(scene) {
  image(scenes[scene], 0, 0, width, height);
}

function handleSceneClicks(mx, my) {
  let clicked = false;
  if (currentScene === 'farmMap') {
    scenes.interactiveAreas.forEach(area => {
      const withinArea =
        mx > area.x &&
        mx < area.x + area.w &&
        my > area.y &&
        my < area.y + area.h;
      if (withinArea) {
        if (typeof playSound === 'function') playSound('click');
        const dest = area.name === 'pond' ? 'pond2' : area.name;
        currentScene = dest;
        if (typeof orderedScenes !== 'undefined') {
          const idx = orderedScenes.indexOf(dest);
          if (idx !== -1) sceneIndex = idx;
        }
        clicked = true;
      }
    });
    if (clicked) return;

    const withinChar = char =>
      mx >= char.x && mx <= char.x + char.size &&
      my >= char.y && my <= char.y + char.size;

    if (typeof dog !== 'undefined' && withinChar(dog)) {
      if (typeof playSound === 'function') {
        playSound('click');
        playSound('dog');
      }
      currentScene = 'dogHouse';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('dogHouse');
      }
      return;
    }

    if (
      typeof sheep !== 'undefined' && withinChar(sheep) ||
      typeof sheepbaby !== 'undefined' && withinChar(sheepbaby)
    ) {
      if (typeof playSound === 'function') {
        playSound('click');
        playSound('sheep');
      }
      currentScene = 'field';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('field');
      }
      return;
    }

    if (typeof pig !== 'undefined' && withinChar(pig)) {
      if (typeof playSound === 'function') {
        playSound('click');
        playSound('pig');
      }
      currentScene = 'swing';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('swing');
      }
      return;
    }

    if (typeof owl !== 'undefined' && withinChar(owl)) {
      if (typeof playSound === 'function') {
        playSound('click');
        playSound('owl');
      }
      currentScene = 'flowers';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('flowers');
      }
      return;
    }
  }
  if (currentScene === 'greenhouseInside') {
    const letterEFound =
      typeof isLetterFound === 'function' &&
      isLetterFound('E', 'greenhouseInside');
    const promptShown = dialoguesPlayed['greenhouseInside'];
    if (!letterEFound || !promptShown) {
      return;
    }
    if (!trayChoiceMade) {
      const withinTrayA =
        mx >= trayA.x && mx <= trayA.x + trayA.size &&
        my >= trayA.y && my <= trayA.y + trayA.size;
      const withinTrayB =
        mx >= trayB.x && mx <= trayB.x + trayB.size &&
        my >= trayB.y && my <= trayB.y + trayB.size;
      const swapTrays = () => {
        const tX = trayA.baseX;
        const tY = trayA.baseY;
        trayA.baseX = trayB.baseX;
        trayA.baseY = trayB.baseY;
        trayB.baseX = tX;
        trayB.baseY = tY;
        sceneCharacterSettings['greenhouseInside'].trayA.x = trayA.baseX;
        sceneCharacterSettings['greenhouseInside'].trayA.y = trayA.baseY;
        sceneCharacterSettings['greenhouseInside'].trayB.x = trayB.baseX;
        sceneCharacterSettings['greenhouseInside'].trayB.y = trayB.baseY;
      };
      if (withinTrayA) {
        if (typeof playSound === 'function') playSound('click');
        if (trayOnTable !== 'trayA') swapTrays();
        trayOnTable = 'trayA';
        trayA.reset();
        trayB.reset();
        if (typeof playDialogue === 'function' && !dialoguesPlayed['greenhouseInside_trayA']) {
          playDialogue('greenhouseInside_trayA');
        }
        trayChoiceMade = true;
        clicked = true;
      } else if (withinTrayB) {
        if (typeof playSound === 'function') playSound('click');
        if (trayOnTable !== 'trayB') swapTrays();
        trayOnTable = 'trayB';
        trayA.reset();
        trayB.reset();
        if (typeof playDialogue === 'function' && !dialoguesPlayed['greenhouseInside_trayB']) {
          playDialogue('greenhouseInside_trayB');
        }
        trayChoiceMade = true;
        clicked = true;
      }
    }
    if (clicked) return;
  }
  if (currentScene === 'barnInside') {
    if (typeof isDialogueActive === 'function' && isDialogueActive()) return;
    scenes.barnInsideAreas.forEach(area => {
      const within =
        mx >= area.x && mx <= area.x + area.w &&
        my >= area.y && my <= area.y + area.h;
      if (within) {
        if (typeof playSound === 'function') playSound('click');
        currentScene = area.name;
        if (area.name === 'loftEntrance') {
          sceneIndex = orderedScenes.indexOf('loftEntrance');
        } else {
          sceneIndex = orderedScenes.indexOf('barnInside');
        }
        clicked = true;
      }
    });
    if (clicked) return;
  }
}

function drawSceneCharacters(scene) {
  const chars = sceneCharacters[scene];
  if (!Array.isArray(chars)) {
    return;
  }
  chars.forEach(name => {
    const charObj = window[name];
    if (charObj && typeof charObj.display === 'function') {
      if (typeof charObj.reset === 'function') {
        charObj.reset();
      }
      const overrides =
        sceneCharacterSettings[scene] &&
        sceneCharacterSettings[scene][name];
      if (overrides) {
        if (overrides.x !== undefined) charObj.x = overrides.x;
        if (overrides.y !== undefined) charObj.y = overrides.y;
        if (overrides.size !== undefined) charObj.size = overrides.size;
      }
      if (charObj.lastScene !== scene) {
        const state = overrides && overrides.state !== undefined ? overrides.state : charObj.baseState;
        const activeDialogue = typeof isDialogueActive === 'function' && isDialogueActive();
        if (!activeDialogue) {
          if (state && typeof charObj.setState === 'function') {
            charObj.setState(state);
            charObj.baseState = state;
          }
        } else if (state) {
          // Preserve the speaking pose but update the base state for later
          charObj.baseState = state;
        }
        charObj.lastScene = scene;
      }
      // Mark interactive characters for hover effects
      charObj.interactive = false;
      if (scene === 'barn' && (name === 'donkey' || name === 'bat')) {
        const letterV =
          typeof letters !== 'undefined'
            ? letters.find(l => l.scene === 'barn' && l.letter === 'V')
            : null;
        if (letterV && letterV.found && dialoguesPlayed && dialoguesPlayed.barn) {
          charObj.interactive = true;
        }
      }
      if (scene === 'greenhouseInside' && (name === 'trayA' || name === 'trayB')) {
        const letterEFound =
          typeof isLetterFound === 'function' &&
          isLetterFound('E', 'greenhouseInside');
        if (letterEFound) {
          charObj.interactive = true;
        }
      }
      charObj.display();
    }
  });
}
