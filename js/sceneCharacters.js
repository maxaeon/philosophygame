// Characters present in each scene
// Keys are scene names and values are arrays of character variable names
const defaultScenes = [
  'farmMap','picnic','tunnel','pond','cave','greenhouse','swing','swing2',
  'barn','barnInside','bench','dogHouse','donkey','field','flowers','flowers2',
  'vegetables','vegetables2','grass','greenhouseInside','loft','loftEntrance','mirror','pond2',
  'radioRoom','studio','start'
];

const basePositions = {
  duck:            { x: 360, y: 420, size: 100, state: 'mouth-closed' },
  rabbit:          { x: 420, y: 420, size: 100, state: 'mouth-closed' },
  donkey:          { x: 380, y: 420, size: 100, state: 'mouth-closed' },
  dog:             { x: 620, y: 440, size: 100, state: 'mouth-closed' },
  sheep:           { x: 460, y: 420, size: 100, state: 'mouth-closed' },
  sheepbaby:       { x: 520, y: 440, size: 80, state: 'mouth-closed' },
  owl:             { x: 380, y: 420, size: 100, state: 'mouth-closed' },
  graytortiecat:   { x: 380, y: 420, size: 100, state: 'mouth-closed' },
  orangecat:       { x: 450, y: 430, size: 100, state: 'mouth-closed' },
  chick:           { x: 380, y: 420, size: 100, state: 'mouth-closed' },
  bat:             { x: 420, y: 180, size: 100, state: 'mouth-closed' },
  birdhouse:       { x: 380, y: 420, size: 100, state: 'start' },
  pig:             { x: 360, y: 420, size: 100 },
  duckRabbitSwing: { x: 360, y: 420, size: 100 },
  trayA:           { x: 500, y: 420, size: 80 },
  trayB:           { x: 360, y: 420, size: 80 }
};

const sceneCharacters = {};
// Optional position/size/pose overrides per scene
// sceneCharacterSettings[scene][character] = {x, y, size, state}
const sceneCharacterSettings = {};

function addChar(scene, name) {
  sceneCharacters[scene].push(name);
  if (!sceneCharacterSettings[scene]) sceneCharacterSettings[scene] = {};
  const base = basePositions[name];
  if (base) {
    sceneCharacterSettings[scene][name] = { ...base };
  }
}

defaultScenes.forEach(scene => {
  sceneCharacters[scene] = [];
  addChar(scene, 'duck');
  addChar(scene, 'rabbit');
});

['flowers', 'flowers2', 'loft', 'farmMap'].forEach(scene => {
  addChar(scene, 'owl');
});

['flowers', 'grass', 'flowers2'].forEach(scene => {
  addChar(scene, 'birdhouse');
});

addChar('barn', 'donkey');
addChar('barn', 'bat');
addChar('donkey', 'donkey');
addChar('donkey', 'orangecat');

// Dog appears only in the dogHouse, barn, and farmMap scenes
['dogHouse', 'barn', 'farmMap'].forEach(scene => {
  addChar(scene, 'dog');
});

addChar('loftEntrance', 'graytortiecat');

['farmMap', 'field', 'barn'].forEach(scene => {
  addChar(scene, 'sheep');
  addChar(scene, 'sheepbaby');
});

addChar('radioRoom', 'chick');
addChar('barnInside', 'bat');

['farmMap', 'swing', 'swing2'].forEach(scene => {
  addChar(scene, 'pig');
});

addChar('greenhouseInside', 'trayA');
addChar('greenhouseInside', 'trayB');

// Use combined duck/rabbit swing animation in swing2
sceneCharacters['swing2'] = sceneCharacters['swing2'].filter(c => c !== 'duck' && c !== 'rabbit');
sceneCharacters['swing2'].push('duckRabbitSwing');

// Scene-specific position overrides
sceneCharacterSettings['farmMap'] = {
  duck:      { x: 60,  y: 500, size: 80 },
  rabbit:    { x: 150, y: 500, size: 80 },
  owl:       { x: 600, y: 100, size: 80 },
  dog:       { x: 640, y: 420, size: 100 },
  sheep:     { x: 420, y: 380, size: 100 },
  sheepbaby: { x: 500, y: 420, size: 80 },
  pig:       { x: 260, y: 460, size: 100 }
};

// Position adjustments for specific scenes
// Duck and Rabbit start near the bottom of the screen on the start page
sceneCharacterSettings['start'].duck   = { x: 360, y: 500, size: 100 };
sceneCharacterSettings['start'].rabbit = { x: 420, y: 500, size: 100 };

// Both characters sit at the bottom of the bench scene
sceneCharacterSettings['bench'].duck   = { x: 360, y: 500, size: 100 };
sceneCharacterSettings['bench'].rabbit = { x: 420, y: 500, size: 100 };

// In the pond they appear roughly in the middle of the screen
sceneCharacterSettings['pond'].duck   = { x: 360, y: 300, size: 100 };
sceneCharacterSettings['pond'].rabbit = { x: 420, y: 300, size: 100 };

// Adjust positions in pond2: Rabbit sits in the top left and
// Duck uses the swimming pose while remaining in its base position.
sceneCharacterSettings['pond2'].duck = { state: 'swim-down' };
sceneCharacterSettings['pond2'].rabbit = { x: 20, y: 20, size: 100 };

// Adjust positioning in the flowers scene to reduce overlap
sceneCharacterSettings['flowers'].owl = { x: 200, y: 260, size: 100 };
sceneCharacterSettings['flowers'].birdhouse = { x: 380, y: 480, size: 100 };

sceneCharacterSettings['grass'].duck = { x: 100, y: 360, size: 300 };
sceneCharacterSettings['grass'].rabbit = { x: 480, y: 380, size: 300 };
sceneCharacterSettings['grass'].birdhouse = { x: 290, y: 380, size: 100 };

sceneCharacterSettings['flowers2'].owl = { x: 200, y: 260, size: 100 };
sceneCharacterSettings['flowers2'].birdhouse = { x: 380, y: 480, size: 100 };

sceneCharacterSettings['greenhouseInside'].duck = { x: 300, y: 360, size: 100 };
sceneCharacterSettings['greenhouseInside'].rabbit = { x: 380, y: 380, size: 100 };

sceneCharacterSettings['cave'] = {
  duck: { state: 'backwards' }
};

sceneCharacterSettings['dogHouse'] = {
  dog: { state: 'sad' }
};

sceneCharacterSettings['barn'] = {
  donkey: { size: 300 },
  bat: { x: 420, y: 180 }
};

sceneCharacterSettings['swing'] = { pig: { size: 300 } };
sceneCharacterSettings['swing2'] = { pig: { size: 300 } };

if (typeof window !== 'undefined') {
  window.sceneCharacters = sceneCharacters;
  window.sceneCharacterSettings = sceneCharacterSettings;
}
