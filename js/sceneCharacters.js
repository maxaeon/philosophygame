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
  sheepbaby:       { x: 520, y: 440, size: 80, state: 'slight-right' },
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

// Dog appears only in the dogHouse and farmMap scenes
['dogHouse', 'farmMap'].forEach(scene => {
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

// Scene-specific position overrides
sceneCharacterSettings['farmMap'] = {
  // Duck and Rabbit sit where the greenhouse link used to be
  duck:      { x: 300, y: 150, size: 40 },
  rabbit:    { x: 360, y: 150, size: 40 },
  // Owl stays in roughly the same position
  owl:       { x: 80,  y: 250, size: 80 },
  // Dog now lives where the bench link started
  dog:       { x: 30,  y: 40,  size: 50 },
  // Sheep family appears above the owl and slightly left
  sheep:     { x: 15,  y: 160, size: 50 },
  sheepbaby: { x: 75,  y: 180, size: 40 },
  // Pig touches the top edge of the map
  pig:       { x: 465, y: -5, size: 80 }
};

// Position adjustments for specific scenes
// Duck and Rabbit start near the bottom of the screen on the start page
sceneCharacterSettings['start'].duck   = { x: 360, y: 500, size: 100 };
sceneCharacterSettings['start'].rabbit = { x: 420, y: 500, size: 100 };

// Both characters sit at the bottom of the bench scene
sceneCharacterSettings['bench'].duck   = { x: 360, y: 500, size: 100 };
sceneCharacterSettings['bench'].rabbit = { x: 420, y: 500, size: 100 };

// In the picnic scene the duo is larger and spaced apart
sceneCharacterSettings['picnic'] = {
  duck: { x: 250, y: 420, size: 150 },
  rabbit: { x: 500, y: 420, size: 150 }
};

// In the pond they appear roughly in the middle of the screen
sceneCharacterSettings['pond'].duck   = { x: 360, y: 300, size: 100 };
sceneCharacterSettings['pond'].rabbit = { x: 420, y: 300, size: 100 };

// Adjust positions in pond2: Rabbit sits in the top left and
// Duck uses the swimming pose while remaining in its base position.
sceneCharacterSettings['pond2'].duck = { state: 'swim-down' };
sceneCharacterSettings['pond2'].rabbit = { x: 20, y: 20, size: 100 };

// Adjust positioning in the flowers scene to reduce overlap
sceneCharacterSettings['flowers'].owl = { x: 160, y: 320, size: 100 };
sceneCharacterSettings['flowers'].birdhouse = { x: 380, y: 480, size: 100 };

sceneCharacterSettings['grass'].duck = { x: 100, y: 360, size: 300 };
sceneCharacterSettings['grass'].rabbit = { x: 480, y: 380, size: 300 };
sceneCharacterSettings['grass'].birdhouse = { x: 190, y: -10, size: 400 };

// Owl is a bit lower in the second flowers scene
sceneCharacterSettings['flowers2'].owl = { x: 200, y: 320, size: 100 };
sceneCharacterSettings['flowers2'].birdhouse = { x: 380, y: 480, size: 100 };

sceneCharacterSettings['greenhouseInside'].duck = { x: 300, y: 260, size: 100 };
sceneCharacterSettings['greenhouseInside'].rabbit = { x: 380, y: 280, size: 100 };

sceneCharacterSettings['cave'] = {
  duck: { x: 360, y: 420, size: 100 },
  rabbit: { x: 420, y: 420, size: 100 }
};

sceneCharacterSettings['dogHouse'] = {
  dog: { x: 60, y: 420, size: 300, state: 'sad' },
  duck: { x: 560, y: 500 },
  rabbit: { x: 620, y: 500 }
};

sceneCharacterSettings['field'] = {
  sheep: { y: 70 },
  sheepbaby: { x: 520, y: 90 },
  duck: { x: 360, y: 500 }
};

sceneCharacterSettings['barn'] = {
  donkey: { x: 500, size: 300 },
  bat: { x: 420, y: 180 },
  sheep: { x: 120, y: 300, size: 35 },
  sheepbaby: { x: 180, y: 300, size: 35 },
  duck: { x: 360, y: 500, size: 100 },
  rabbit: { x: 420, y: 500, size: 100 }
};

sceneCharacterSettings['donkey'] = {
  donkey: { x: 300, y: 200, size: 440 },
  duck: { x: 150, y: 500, size: 100 },
  rabbit: { x: 210, y: 500, size: 100 },
  orangecat: { x: 20, y: 400, size: 100 }
};

sceneCharacterSettings['tunnel'] = {
  duck: { x: 250, y: 420, size: 130 },
  rabbit: { x: 470, y: 420, size: 130 }
};

sceneCharacterSettings['swing'] = {
  pig: { x: 235, y: 220, size: 330 },
  duck: { x: 60,  y: 500, size: 100 },
  rabbit: { x: 150, y: 500, size: 100 }
};
sceneCharacterSettings['swing2'] = { pig: { x: 235, y: 220, size: 330 } };

sceneCharacterSettings['radioRoom'] = {
  chick: { y: 320, state: 'default' },
  duck: { y: 500 }
};

sceneCharacterSettings['loftEntrance'].graytortiecat = {
  x: 200
};

sceneCharacterSettings['loft'].owl = {
  x: 200
};

if (typeof window !== 'undefined') {
  window.sceneCharacters = sceneCharacters;
  window.sceneCharacterSettings = sceneCharacterSettings;
}
