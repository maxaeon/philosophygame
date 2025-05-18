let scenes = {};

function preloadScenes() {
  scenes.farmMap = loadImage('assets/images/scenes/farm-map.png');
  scenes.batCave = loadImage('assets/images/scenes/bat-cave.png');
  scenes.greenhouse = loadImage('assets/images/scenes/greenhouse.png');
  // Additional scenes...
}

function setupScenes() {
  // Define interactive areas on the farm map
  scenes.interactiveAreas = [
    {name: 'batCave', x: 100, y: 200, w: 150, h: 150},
    {name: 'greenhouse', x: 300, y: 200, w: 150, h: 150}
    // Additional areas...
  ];
}

function drawScene(scene) {
  image(scenes[scene], 0, 0, width, height);
}

function handleSceneClicks(mx, my) {
  if (currentScene === 'farmMap') {
    scenes.interactiveAreas.forEach(area => {
      if (mx > area.x && mx < area.x + area.w && my > area.y && my < area.y + area.h) {
        currentScene = area.name;
      }
    });
  }
}
