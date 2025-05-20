class Character {
  constructor(name, states, size = 100) {
    this.name = name;
    this.images = {};
    // Default to the neutral mouth-closed pose when the character is created
    this.state = 'mouth-closed';
    this.x = random(100, 700);
    this.y = random(300, 500);
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.baseSize = size;
    this.states = Array.isArray(states) && states.length ? states.slice() : [];

    // Ensure base states are always available
    if (!this.states.includes('idle')) {
      this.states.unshift('idle');
    }
    if (!this.states.includes('default')) {
      this.states.unshift('default');
    }

    // Always attempt to preload a mouth-closed image so characters can
    // revert to it when not speaking. If the image doesn't exist, the
    // fallback in preloadImages will load the default instead.
    if (!this.states.includes('mouth-closed')) {
      this.states.push('mouth-closed');
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
    image(this.images[this.state], this.x, this.y, this.size, this.size);
  }

  reset() {
    this.x = this.baseX;
    this.y = this.baseY;
    this.size = this.baseSize;
  }

  initBase() {
    this.baseX = this.x;
    this.baseY = this.y;
    this.baseSize = this.size;
  }

  // Allows new poses to be added on the fly so scenes can introduce
  // additional movements or expressions later.
  addState(name, path) {
    if (this.states.includes(name)) return;
    this.states.push(name);
    const imgPath = path || `assets/images/${this.name}/${name}.png`;
    this.images[name] = loadImage(imgPath);
  }

  setState(newState) {
    this.state = newState;
  }
}
