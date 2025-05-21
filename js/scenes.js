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
    {name: 'barn', label: 'barn', x: 220, y: 160, w: 150, h: 150},
    {name: 'swing', label: 'swing', x: 360, y: 420, w: 140, h: 120},
    {name: 'dogHouse', label: 'doghouse', x: 310, y: 360, w: 120, h: 100},
    {name: 'bench', label: 'bench', x: 180, y: 220, w: 120, h: 80},
    {name: 'pond', label: 'pond', x: 300, y: 420, w: 140, h: 120},
    {name: 'greenhouse', label: 'greenhouse', x: 300, y: 200, w: 150, h: 150},
    {name: 'picnic', label: 'picnic', x: 420, y: 260, w: 140, h: 100},
    {name: 'vegetables', label: 'vegetables', x: 280, y: 80, w: 120, h: 80}
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
        currentScene = area.name;
        if (typeof orderedScenes !== 'undefined') {
          const idx = orderedScenes.indexOf(area.name);
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
      currentScene = 'field';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('field');
      }
      return;
    }

    if (typeof pig !== 'undefined' && withinChar(pig)) {
      currentScene = 'swing';
      if (typeof orderedScenes !== 'undefined') {
        sceneIndex = orderedScenes.indexOf('swing');
      }
      return;
    }
  }
  if (currentScene === 'greenhouseInside') {
    if (!trayChoiceMade) {
      const withinTrayA =
        mx >= trayA.x && mx <= trayA.x + trayA.size &&
        my >= trayA.y && my <= trayA.y + trayA.size;
      const withinTrayB =
        mx >= trayB.x && mx <= trayB.x + trayB.size &&
        my >= trayB.y && my <= trayB.y + trayB.size;
      if (withinTrayA && trayOnTable !== 'trayA') {
        const tX = trayA.baseX;
        const tY = trayA.baseY;
        trayA.baseX = trayB.baseX;
        trayA.baseY = trayB.baseY;
        trayB.baseX = tX;
        trayB.baseY = tY;
        trayOnTable = 'trayA';
        trayA.reset();
        trayB.reset();
        if (typeof playDialogue === 'function' && !dialoguesPlayed['greenhouseInside_trayA']) {
          playDialogue('greenhouseInside_trayA');
        }
        trayChoiceMade = true;
        clicked = true;
      } else if (withinTrayB && trayOnTable !== 'trayB') {
        const tX = trayA.baseX;
        const tY = trayA.baseY;
        trayA.baseX = trayB.baseX;
        trayA.baseY = trayB.baseY;
        trayB.baseX = tX;
        trayB.baseY = tY;
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
    const areas = [
      {name: 'studio', x: 250, y: 270, w: 100, h: 100},
      {name: 'mirror', x: 230, y: 110, w: 100, h: 100},
      {name: 'radioRoom', x: 150, y: 330, w: 100, h: 100},
      {name: 'loftEntrance', x: 380, y: 360, w: 100, h: 100}
    ];
    areas.forEach(area => {
      const within =
        mx >= area.x && mx <= area.x + area.w &&
        my >= area.y && my <= area.y + area.h;
      if (within) {
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
      // Mark interactive characters for hover effects
      charObj.interactive = false;
      if (scene === 'barn' && (name === 'donkey' || name === 'bat')) {
        charObj.interactive = true;
      }
      if (scene === 'greenhouseInside' && (name === 'trayA' || name === 'trayB')) {
        charObj.interactive = true;
      }
      charObj.display();
    }
  });
}
