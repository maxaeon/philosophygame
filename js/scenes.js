let scenes = {};
// Map of characters that appear in each scene with positioning and scale
let sceneCharacters = {
  batCave: [
    {name: 'duck', x: 340, y: 380},
    {name: 'rabbit', x: 420, y: 380}
  ],
  greenhouse: [
    {name: 'duck', x: 360, y: 420},
    {name: 'rabbit', x: 440, y: 420}
  ],
  picnic: [
    {name: 'duck', x: 350, y: 460},
    {name: 'rabbit', x: 430, y: 460}
  ],
  pond: [
    {name: 'duck', x: 300, y: 400},
    {name: 'rabbit', x: 380, y: 400}
  ]
};

function preloadScenes() {
  scenes.farmMap = loadImage('assets/images/scenes/map.png');
  scenes.batCave = loadImage('assets/images/scenes/cave.png');
  scenes.greenhouse = loadImage('assets/images/scenes/greenhouse.png');

  scenes.barn = loadImage('assets/images/scenes/barn.png');
  scenes.barnInside = loadImage('assets/images/scenes/barnInside.png');
  scenes.bench = loadImage('assets/images/scenes/bench.png');
  scenes.dogHouse = loadImage('assets/images/scenes/dogHouse.png');
  scenes.donkey = loadImage('assets/images/scenes/donkey.png');
  scenes.field = loadImage('assets/images/scenes/field.png');
  scenes.flowers = loadImage('assets/images/scenes/flowers.png');
  scenes.flowers2 = loadImage('assets/images/scenes/flowers2.png');
  scenes.garden = loadImage('assets/images/scenes/garden.png');
  scenes.grass = loadImage('assets/images/scenes/grass.png');
  scenes.greenhouseInside = loadImage('assets/images/scenes/greenhouse-inside.png');
  scenes.loft = loadImage('assets/images/scenes/loft.png');
  scenes.loftEntrance = loadImage('assets/images/scenes/loftEntrance.png');
  scenes.mirror = loadImage('assets/images/scenes/mirror.png');
  scenes.picnic = loadImage('assets/images/scenes/picnic.png');
  scenes.pond = loadImage('assets/images/scenes/pond.png');
  scenes.pond2 = loadImage('assets/images/scenes/pond2.png');
  scenes.radioRoom = loadImage('assets/images/scenes/radioRoom.png');
  scenes.studio = loadImage('assets/images/scenes/studio.png');
  scenes.swingScene = loadImage('assets/images/scenes/swingScene.png');
  scenes.tunnel = loadImage('assets/images/scenes/tunnel.png');
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

// Draw characters for the given scene using the sceneCharacters map
function drawSceneCharacters(scene) {
  const entries = sceneCharacters[scene];
  if (!entries) return;
  entries.forEach(info => {
    const char = characters[info.name];
    if (char) {
      const s = info.scale !== undefined ? info.scale : 0.35;
      char.display(info.x, info.y, s);
    }
  });
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
