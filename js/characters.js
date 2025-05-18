class Character {
  constructor(name, states) {
    this.name = name;
    this.images = {};
    this.state = 'idle';
    this.x = random(100, 700);
    this.y = random(300, 500);
    this.states = Array.isArray(states)
      ? states
      : ['left', 'right', 'talking', 'thinking'];
    this.preloadImages();
  }

  preloadImages() {
    this.states.forEach(state => {
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
