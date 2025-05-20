// Characters present in each scene
// Keys are scene names and values are arrays of character variable names
const defaultScenes = [
  'farmMap','picnic','tunnel','pond','cave','greenhouse','swing','swing2',
  'barn','barnInside','bench','dogHouse','donkey','field','flowers','flowers2',
  'garden','vegetables','vegetables2','grass','greenhouseInside','loft','loftEntrance','mirror','pond2',
  'radioRoom','studio','start'
];

const sceneCharacters = {};
// Optional position/size overrides per scene
// sceneCharacterSettings[scene][character] = {x, y, size}
const sceneCharacterSettings = {};

// Arrange characters on the farm map so they don't overlap
sceneCharacterSettings['farmMap'] = {
  duck:      { x: 60,  y: 500, size: 80 },
  rabbit:    { x: 150, y: 500, size: 80 },
  owl:       { x: 600, y: 100, size: 80 },
  dog:       { x: 640, y: 420, size: 100 },
  sheep:     { x: 420, y: 380, size: 100 },
  sheepbaby: { x: 500, y: 420, size: 80 },
  pig:       { x: 260, y: 460, size: 100 }
};

defaultScenes.forEach(scene => {
  sceneCharacters[scene] = ['duck', 'rabbit'];
});

['flowers', 'flowers2', 'loft', 'farmMap'].forEach(scene => {
  sceneCharacters[scene].push('owl');
});

sceneCharacters.barn.push('donkey');
sceneCharacters.donkey.push('donkey');
sceneCharacters.donkey.push('orangecat');

// Dog appears only in the dogHouse, barn, and farmMap scenes
['dogHouse', 'barn', 'farmMap'].forEach(scene => {
  sceneCharacters[scene].push('dog');
});

sceneCharacters.loftEntrance.push('graytortiecat');

['farmMap', 'field', 'barn'].forEach(scene => {
  sceneCharacters[scene].push('sheep', 'sheepbaby');
});

sceneCharacters.radioRoom.push('chick');
sceneCharacters.barnInside.push('bat');

['farmMap', 'swing', 'swing2'].forEach(scene => {
  sceneCharacters[scene].push('pig');
});

sceneCharacters.greenhouseInside.push('trayA');
sceneCharacters.greenhouseInside.push('trayB');

// Use combined duck/rabbit swing animation in swing2
sceneCharacters['swing2'] = sceneCharacters['swing2'].filter(c => c !== 'duck' && c !== 'rabbit');
sceneCharacters['swing2'].push('duckRabbitSwing');

if (typeof window !== 'undefined') {
  window.sceneCharacters = sceneCharacters;
  window.sceneCharacterSettings = sceneCharacterSettings;
}
