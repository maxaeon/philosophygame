const dialogues = {
  bench: [
    { speaker: 'duck', text: 'Take a seat, Rabbit. Let\'s rest for a bit.' },
    { speaker: 'rabbit', text: 'Good idea! We still have many letters to find.' }
  ]
};

let dialogueActive = false;
const dialoguesPlayed = {};

function setCharacterState(name, speaking, pose) {
  const ch = window[name];
  if (!ch || typeof ch.setState !== 'function') return;
  if (speaking) {
    ch.setState(pose || 'default');
  } else {
    if (ch.states.includes('mouth-closed')) {
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
  dialogueActive = true;
  box.style.display = 'block';
  let index = 0;
  let prevSpeaker = null;
  function next() {
    if (prevSpeaker) setCharacterState(prevSpeaker, false);
    if (index >= lines.length) {
      box.style.display = 'none';
      box.onclick = null;
      dialogueActive = false;
      dialoguesPlayed[scene] = true;
      if (continueBtn) continueBtn.style.display = 'block';
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
}
