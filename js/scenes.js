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
  scenes.garden = loadImage('assets/images/scenes/vegetables.png');
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
    {name: 'cave', x: 100, y: 200, w: 150, h: 150},
    {name: 'greenhouse', x: 300, y: 200, w: 150, h: 150},
    // Additional areas
    // Approximated coordinates based on map layout
    {name: 'barn', x: 220, y: 160, w: 150, h: 150},
    {name: 'bench', x: 180, y: 220, w: 120, h: 80},
    {name: 'dogHouse', x: 310, y: 360, w: 120, h: 100},
    // New interactive areas
    {name: 'pond', x: 300, y: 420, w: 140, h: 120},
    {name: 'pond2', x: 340, y: 240, w: 140, h: 120},
    {name: 'vegetables', x: 280, y: 80, w: 120, h: 80},
    {name: 'picnic', x: 420, y: 260, w: 140, h: 100}
  ];
}

function drawScene(scene) {
  image(scenes[scene], 0, 0, width, height);
}

function handleSceneClicks(mx, my) {
  if (currentScene === 'farmMap') {
    scenes.interactiveAreas.forEach(area => {
      const withinArea = mx > area.x && mx < area.x + area.w && my > area.y && my < area.y + area.h;
      const isIcon = ['pond', 'pond2', 'vegetables', 'picnic'].includes(area.name);
      const iconSize = 40;
      const withinIcon = isIcon && mx >= area.x && mx <= area.x + iconSize && my >= area.y && my <= area.y + iconSize;
      if (withinArea || withinIcon) {
        currentScene = area.name;
      }
    });
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
      charObj.display();
    }
  });
}
