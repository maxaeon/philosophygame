const dialogues = {
  start: [
    { speaker: 'duck', text: 'Welcome to the Duck-Rabbit Farm!' },
    { speaker: 'rabbit', text: 'Click Continue and look for letters to learn more.' },
    { speaker: 'duck', text: 'Is our duck-rabbit icon a duck or a rabbit?' },
    { speaker: 'rabbit', text: 'Maybe it depends on how you look at it!' },
    { speaker: 'duck', text: "Right—maybe sometimes the answer isn't just yes or no!" }
  ],
  benchIntro: [
    { speaker: 'duck', text: 'When you see letters around the farm, try clicking on them!' },
    { speaker: 'rabbit', text: 'Each one will tell us something fascinating.' }
  ],
  benchRest: [
    { speaker: 'duck', text: 'Take a seat, Rabbit. Let\'s rest for a bit.' },
    { speaker: 'rabbit', text: 'Good idea! We still have a lot to explore.' }
  ],
  pond: [
    { speaker: 'duck', text: 'Nature sure is incredible- there is always something new to notice.' },
    { speaker: 'rabbit', text: "Yes, and every discovery changes how we see the world!!" }
  ],
  pond2: [
    { speaker: 'rabbit', text: "Duck, you're lucky you can swim!" },
    { speaker: 'duck', text: "Thanks! Our differences make us special."},
    { speaker: 'duck', text: "Can you help me find the letter hidden here?"}
  ],
  flowers: [
    { speaker: 'owl', text: "Duck, Rabbit, can you help me? The Robin family's birdhouse needs repairs before the eggs hatch!" },
    { speaker: 'rabbit', text: "Of course! Let's get started." }
  ],
  grass: [
    { speaker: 'duck', text: 'We’ve changed so many boards! If we replace all of the parts, is it still the same birdhouse?' },
    { speaker: 'rabbit', text: 'Interesting question! And if we put all the old parts together again, which birdhouse is the same one as before?' }
  ],
  flowers2: [
    { speaker: 'owl', text: "Thank you both! As a token of my gratitude, I left seedlings in the greenhouse for you." },
    { speaker: 'duck', text: "Thank you, Owl! Let's go see!" }
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
    { speaker: 'rabbit', text: 'Let\'s grab a tasty treat from my tunnels beneath the garden.' }
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
    { speaker: 'pig', text: "Sure! That's only fair." }
  ],
  swing2: [
    { speaker: 'duck', text: 'Thanks for sharing, Pig!' },
    { speaker: 'rabbit', text: 'Yes, this is so fun!' }
  ],
  dogHouse: [
    { speaker: 'dog', text: "I'm sad; people ask me if I am a pitbull, or dalmation, or herding dog, and assume I'm dangerous because of how I look.", pose: 'sad' },
    { speaker: 'duck', text: "That's just like when I thought shadows were reality. I judged too quickly by appearances, but that's wrong to do." },
    { speaker: 'rabbit', text: "We won't judge you too quickly- we'd love to be your friends!" },
    { speaker: 'dog', text: 'Really? Thank you!' }
  ],
  dogHouseReturn: [
    { speaker: 'dog', text: 'Hi Duck and Rabbit! Thank you for being my friends!', pose: 'happy' }
  ],
  field: [
    { speaker: 'rabbit', text: 'Are these real sheep?' },
    { speaker: 'sheep', text: "I don't think we are robots!" },
    { speaker: 'duck', text: 'Hmm, you kind of look like fake sheep to me...' }
  ],
  barn: [
    { speaker: 'duck', text: 'Should we talk to Donkey, explore the barn, or look at the map?' },
    { speaker: 'rabbit', text: 'You decide!' }
  ],
  donkey: [
    {  speaker: 'donkey', text: 'Hi Duck and Rabbit! I brought a load of sweet strawberries to share with everyone.'},
    {speaker: 'rabbit', text: 'I think it would be most fair to share them evenly with everyone!' },
    { speaker: 'orangecat', text: 'Those hurt my belly! Maybe we can share something else?' },
     {  speaker: 'rabbit', text: "Oh, no! I didn't think about how different animals have different needs!" },
    { speaker: 'donkey', text: "How about some milk instead for those who don't like strawberries? I have some in my cart!"},
    {speaker: 'duck', text: 'That seems fair!' },
    {speaker: 'cat', text: "I'd love that! But what about animals who need more to feel full?"},
    {speaker: 'rabbit', text: 'I think it would be most fair to give every animal a belly full of a treat they like!'}
  ],
  barnInside: [
    { speaker: 'rabbit', text: "We've always wondered, what is it like to be a bat?" },
    { speaker: 'bat', text: 'I enjoy sleeping in the dark barn during the day.'},
     { speaker: 'duck', text: 'But what about swimming in bright ponds?'},
        { speaker: 'bat', text: "Swimming and bright ponds aren't fun for me. I fly around at night..."},
     { speaker: 'duck', text: "I'll fly when I'm older!"},
      {speaker: 'bat', text: "Not quite like me- I 'see' with my ears!" },
    { speaker: 'rabbit', text: 'Impossible!' },
    { speaker: 'bat', text: "Maybe for some animals, but every bat I know does it!"},
      { speaker: 'rabbit', text: "I can't imagine that... I guess we will never know what it's like to be a bat!"},
      { speaker: 'bat', text: "It's true we cannot know what it's like to be each other-- but we can appreciate our differences!" }
  ],
  studio: [
    { speaker: 'duck', text: 'Paint and canvas! How fun!' },
    { speaker: 'rabbit', text: 'What kind of art do you like to make?' }
  ],
  mirror: [
    { speaker: 'duck', text: "Look, it's you! You're special!" },
    { speaker: 'rabbit', text: 'Yes, uniquely wonderful!' }
  ],
  radioRoom: [
    { speaker: 'radio', text: '...and that concludes our podcast on The Complete Physical Account of Color Vision.'},
    { speaker: 'chick', text: 'Colors and light—I know all about them!', pose: 'default' },
    { speaker: 'duck', text: "But do you know what it's like to actually see colors?" },
    { speaker: 'chick', text: 'Not yet, but let me finish hatching and I will!', pose: 'default' },
    { speaker: 'chick', text: 'Wow, seeing color is so beautiful! I never truly understood.' }
  ],
  loftEntrance: [
    { speaker: 'graytortiecat', text: 'Duck and Rabbit, can you help me? I was wondering, how different could I be and still be a cat?' },
    { speaker: 'rabbit', text: 'Interesting question! What makes us who or what we are?' },
    { speaker: 'graytortiecat', text: 'What if I was hairless, or had extra long fur? Or wagged my tail and barked?'},
    { speaker: 'duck', text: 'If you barked, I think you would be a dog!'},
    { speaker: 'rabbit', text: "That is not true- some rodents bark! That doesn't make them dogs."},
      {speaker: 'graytortiecat', text: "Hmm, I don't know if there's an easy answer to this, but keep thinking about it and let me know if you have any ideas!"}
  ],
  loft: [
    { speaker: 'owl', text: "Let's meditate together."},
    { speaker: 'owl', text: "Close your eyes. Breathe deeply, calm your mind, and relax." }
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
    currentScene === 'pond2' &&
    dialogueActive
  ) {
    ch.setState('swim-down');
    return;
  }
  if (name === 'chick') {
    if (speaking) {
      ch.setState(pose || 'in-egg-open');
    } else {
      ch.setState('default');
    }
    return;
  }
  if (speaking) {
    // Use the default talking image unless a specific pose is provided
    ch.setState(pose || 'default');
  } else {
    // When done speaking, return to the character's base pose
    if (name === 'duck' && duckFacingBackwards) {
      ch.setState('backwards');
    } else if (ch.baseState) {
      ch.setState(ch.baseState);
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
