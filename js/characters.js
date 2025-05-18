class Character {
  constructor(name) {
    this.name = name;
    this.images = {};
    this.state = 'idle';
    this.x = random(100, 700);
    this.y = random(300, 500);
    // default display scale (35% of original)
    this.scale = 0.35;
    this.preloadImages();
  }

  preloadImages() {
    let states = ['left', 'right', 'talking', 'thinking'];
    states.forEach(state => {
      this.images[state] = loadImage(`assets/images/${this.name}/${state}.png`);
    });
  }

  display(x = this.x, y = this.y, scale = this.scale) {
    image(this.images[this.state], x, y, 100 * scale, 100 * scale);
  }

  setState(newState) {
    this.state = newState;
  }
}
