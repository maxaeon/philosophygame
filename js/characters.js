class Character {
  constructor(name) {
    this.name = name;
    this.images = {};
    this.state = 'idle';
    this.x = random(100, 700);
    this.y = random(300, 500);
    this.preloadImages();
  }

  preloadImages() {
    let states = ['left', 'right', 'talking', 'thinking'];
    states.forEach(state => {
      this.images[state] = loadImage(`assets/images/${this.name}/${state}.png`);
    });
  }

  display() {
    image(this.images[this.state], this.x, this.y, 100, 100);
  }

  setState(newState) {
    this.state = newState;
  }
}

function handleCharacterClicks(mx, my) {
  [duck, rabbit].forEach(char => {
    if (mx > char.x && mx < char.x + 100 && my > char.y && my < char.y + 100) {
      characterInteracted = true;
    }
  });
}
