const dialogues = {
  start: [
    { speaker: 'duck', text: 'Welcome to the Duck-Rabbit Farm!' },
    { speaker: 'rabbit', text: 'Click Continue and look for letters to learn more.' }
  ],
  benchIntro: [
    { speaker: 'duck', text: 'When you see letters around the farm, try clicking on them!' },
    { speaker: 'rabbit', text: 'Each one will tell us something new.' }
  ],
  benchRest: [
    { speaker: 'duck', text: 'Take a seat, Rabbit. Let\'s rest for a bit.' },
    { speaker: 'rabbit', text: 'Good idea! We still have many letters to find.' }
  ],
  pond: [
    { speaker: 'duck', text: 'Nature sure is beautiful.' },
    { speaker: 'rabbit', text: "Yes, there's so much to discover. Let's keep exploring!" }
  ],
  pond2: [
    { speaker: 'rabbit', text: "Duck, you're lucky you can swim!" },
    { speaker: 'duck', text: "It's great we're different—each with our own skills!" },
    { speaker: 'duck', text: 'Try guiding me around! Can you find the hidden letter?' }
  ],
  flowers: [
    { speaker: 'owl', text: "Duck, Rabbit, can you help me? The robin family's birdhouse needs repairs before the eggs hatch!" },
    { speaker: 'duck', text: "Of course! Let's get started." },
    { speaker: 'rabbit', text: "Of course! Let's get started." }
  ],
  grass: [
    { speaker: 'duck', text: 'As we replace these boards, is it still the same birdhouse?' },
    { speaker: 'rabbit', text: 'Or is it becoming a totally new one?' },
    { speaker: 'duck', text: 'Hmm, a bit like the Ship of Theseus!' }
  ],
  flowers2: [
    { speaker: 'owl', text: "Thank you so much! I've left some seedlings for you both in the greenhouse." },
    { speaker: 'duck', text: "Let's go see!" },
    { speaker: 'rabbit', text: "I'm excited to plant something new!" }
  ],
  greenhouse: [
    { speaker: 'duck', text: "Here's the greenhouse! Let's check out our seedlings." }
  ],
  greenhouseInside: [
    { speaker: 'rabbit', text: 'Oh no, we must move the watering line! Should we save the tray with 2 plants, or the one with 10?' }
  ],
  greenhouseInside_trayA: [
    { speaker: 'rabbit', text: 'Great choice! Now even more plants will get water.' },
    { speaker: 'duck', text: 'Thanks for helping so many seedlings!' }
  ],
  greenhouseInside_trayB: [
    { speaker: 'rabbit', text: 'Okay! We\'ll hand water the other tray tomorrow.' },
    { speaker: 'duck', text: 'Every plant will get its turn to grow.' }
  ],
  vegetables: [
    { speaker: 'duck', text: "I'm getting hungry." },
    { speaker: 'rabbit', text: 'Let\'s grab some food from my tunnels under the garden.' }
  ],
  tunnel: [
    { speaker: 'rabbit', text: 'I think those vegetables are around here somewhere...' }
  ],
  cave: [
    { speaker: 'duck', text: 'Found them!', pose: 'backwards' },
    { speaker: 'rabbit', text: "Silly Duck, you've mistaken shadows for reality!" },
    { speaker: 'duck', text: 'Oh, reality is so much brighter and better!' }
  ],
  vegetables2: [
    { speaker: 'duck', text: "Let's find a good picnic spot by the swing!" },
    { speaker: 'rabbit', text: 'Sounds perfect.' }
  ],
  picnic: [
    { speaker: 'duck', text: 'We have a heap of vegetables!' },
    { speaker: 'rabbit', text: "I wonder how much we have to eat before it's no longer a heap?" }
  ],
  farmMap: [
    { speaker: 'duck', text: "There's still so much to see." },
    { speaker: 'rabbit', text: 'Click around the map to revisit or explore new areas!' }
  ],
  swing: [
    { speaker: 'duck', text: 'Hey Pig, mind if we share the swing?' },
    { speaker: 'pig', text: 'Sure! There\'s room for everyone.' }
  ],
  swing2: [
    { speaker: 'duck', text: 'Thanks for sharing, Pig!' },
    { speaker: 'rabbit', text: 'Thanks for sharing, Pig!' }
  ],
  dogHouse: [
    { speaker: 'dog', text: "I'm sad; people fear me just because of how I look.", pose: 'sad' },
    { speaker: 'duck', text: 'We understand, we judged shadows as reality before knowing the truth.' },
    { speaker: 'rabbit', text: "We'd love to be your friends!" },
    { speaker: 'dog', text: 'Really? Thank you!' }
  ],
  field: [
    { speaker: 'rabbit', text: 'Are these real sheep?' },
    { speaker: 'sheep', text: "I don't think we are robots!" },
    { speaker: 'duck', text: 'Good point!' }
  ],
  barn: [
    { speaker: 'duck', text: 'Should we talk to Donkey, explore the barn, or look at the map?' },
    { speaker: 'rabbit', text: 'You decide!' }
  ],
  donkey: [
    { speaker: 'rabbit', text: 'Donkey, can we share your strawberries?' },
    { speaker: 'orangecat', text: 'Those hurt my belly! Maybe we can share something else?' },
    { speaker: 'duck', text: 'How about some milk instead? That seems fair!' }
  ],
  barnInside: [
    { speaker: 'duck', text: "We've always wondered what it's like to be a bat!" },
    { speaker: 'bat', text: 'I fly and see with my ears!' },
    { speaker: 'rabbit', text: 'Impossible!' },
    { speaker: 'bat', text: "Possible for bats! It's wonderful to appreciate each other's differences." }
  ],
  studio: [
    { speaker: 'duck', text: 'Paint and canvas! What makes this art?' },
    { speaker: 'rabbit', text: 'Maybe the intention behind it?' }
  ],
  mirror: [
    { speaker: 'duck', text: "Look, it's you! You're special!" },
    { speaker: 'rabbit', text: 'Yes, uniquely wonderful!' }
  ],
  radioRoom: [
    { speaker: 'chick', text: 'Colors and light—I know all about them!' },
    { speaker: 'duck', text: "But do you know what it's like to actually see colors?" },
    { speaker: 'chick', text: 'Wow, seeing color is so beautiful! I never truly understood.' }
  ],
  loftEntrance: [
    { speaker: 'graytortiecat', text: 'If I changed completely, would I still be me?' },
    { speaker: 'rabbit', text: 'Interesting question! What makes us who we are?' }
  ],
  loft: [
    { speaker: 'owl', text: "Let's meditate together. Close your eyes. Focus your thoughts and relax." }
  ]
};

let dialogueActive = false;
const dialoguesPlayed = {};
let duckFacingBackwards = false;

function setCharacterState(name, speaking, pose) {
  const ch = window[name];
  if (!ch || typeof ch.setState !== 'function') return;
  if (
    name === 'duck' &&
    typeof currentScene !== 'undefined' &&
    currentScene === 'pond2'
  ) {
    if (!speaking) {
      if (!ch.state.startsWith('swim-')) {
        ch.setState('swim-down');
      }
    }
    return;
  }
  if (speaking) {
    // Use the default talking image unless a specific pose is provided
    ch.setState(pose || 'default');
  } else {
    // When done speaking, return to the neutral mouth-closed pose
    if (name === 'duck' && duckFacingBackwards) {
      ch.setState('backwards');
    } else if (ch.states.includes('mouth-closed')) {
      ch.setState('mouth-closed');
    } else if (ch.states.includes('closed')) {
      ch.setState('closed');
    } else {
      ch.setState('idle');
    }
  }
}

function playDialogue(scene, callback) {
  const lines = dialogues[scene];
  if (!Array.isArray(lines) || !lines.length) {
    dialoguesPlayed[scene] = true;
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) continueBtn.style.display = 'block';
    if (callback) callback();
    return;
  }
  const box = document.getElementById('dialogueBox');
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) continueBtn.style.display = 'none';
  if (scene === 'cave') {
    duckFacingBackwards = true;
    const d = window.duck;
    if (d && typeof d.setState === 'function') {
      d.setState('backwards');
    }
  }
  dialogueActive = true;
  box.style.display = 'block';
  let index = 0;
  let prevSpeaker = null;
  function next() {
    if (scene === 'cave' && index === 2) {
      duckFacingBackwards = false;
    }
    if (prevSpeaker) setCharacterState(prevSpeaker, false);
    if (index >= lines.length) {
      box.style.display = 'none';
      box.onclick = null;
      dialogueActive = false;
      dialoguesPlayed[scene] = true;
      if (continueBtn) {
        if (
          scene === 'barnInside' ||
          scene === 'pond2' ||
          scene === 'farmMap' ||
          scene === 'greenhouseInside' ||
          scene === 'barn' ||
          scene === 'bench' ||
          scene === 'benchIntro' ||
          scene === 'benchRest'
        ) {
          continueBtn.style.display = 'none';
        } else {
          continueBtn.style.display = 'block';
        }
      }
      if (callback) callback();
      return;
    }
    const line = lines[index++];
    prevSpeaker = line.speaker;
    box.textContent = line.text;
    setCharacterState(line.speaker, true, line.pose);
  }
  box.onclick = next;
  next();
}

if (typeof window !== 'undefined') {
  window.playDialogue = playDialogue;
  window.dialoguesPlayed = dialoguesPlayed;
  window.isDialogueActive = () => dialogueActive;
  window.duckFacingBackwards = () => duckFacingBackwards;
}
