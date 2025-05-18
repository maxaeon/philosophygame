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
    const placeholder = `assets/images/${this.name}/placeholder.png`;
    this.states.forEach(state => {
      const path = `assets/images/${this.name}/${state}.png`;
      this.images[state] = loadImage(
        path,
        img => {
          this.images[state] = img;
        },
        () => {
          console.warn(`Missing ${path}, falling back to placeholder`);
          this.images[state] = loadImage(placeholder);
        }
      );
    });
  }

  display() {
    image(this.images[this.state], this.x, this.y, 100, 100);
  }

  setState(newState) {
    this.state = newState;
  }
}
