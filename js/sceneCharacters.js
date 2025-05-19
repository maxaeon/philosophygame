// Characters present in each scene
// Keys are scene names and values are arrays of character variable names
const defaultScenes = [
  'farmMap','picnic','tunnel','pond','cave','greenhouse','swing','swing2',
  'barn','barnInside','bench','dogHouse','donkey','field','flowers','flowers2',
  'garden','grass','greenhouseInside','loft','loftEntrance','mirror','pond2',
  'radioRoom','studio'
];

const sceneCharacters = {};

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

if (typeof window !== 'undefined') {
  window.sceneCharacters = sceneCharacters;
}
