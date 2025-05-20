class Character {
  constructor(name, states) {
    this.name = name;
    this.images = {};
    this.state = 'idle';
    this.x = random(100, 700);
    this.y = random(300, 500);
    this.states = Array.isArray(states) && states.length ? states : [];
    if (!this.states.includes('idle')) {
      this.states.unshift('idle');
    }
    this.preloadImages();
  }

  preloadImages() {
    const defaultPath = `assets/images/${this.name}/default.png`;
    this.states.forEach(state => {
      const path = state === 'idle'
        ? defaultPath
        : `assets/images/${this.name}/${state}.png`;
      this.images[state] = loadImage(
        path,
        img => {
          this.images[state] = img;
        },
        () => {
          console.warn(`Missing ${path}, falling back to default`);
          this.images[state] = loadImage(defaultPath);
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
