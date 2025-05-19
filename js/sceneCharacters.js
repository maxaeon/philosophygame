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

sceneCharacters.barn.push('donkey');
sceneCharacters.donkey.push('donkey');

['farmMap', 'field', 'barn'].forEach(scene => {
  sceneCharacters[scene].push('sheep', 'sheepbaby');
});

if (typeof window !== 'undefined') {
  window.sceneCharacters = sceneCharacters;
}
