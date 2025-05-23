class Character {
  constructor(name, states, size = 100, x = 0, y = 0) {
    this.name = name;
    this.images = {};
    // Start with a neutral pose. If a specific mouth-closed image exists
    // include it, otherwise fall back to the default image.
    const hasMouthClosed = Array.isArray(states) && states.includes('mouth-closed');
    this.state = hasMouthClosed ? 'mouth-closed' : 'default';
    this.baseState = this.state;
    this.lastScene = null;
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.baseSize = size;
    this.states = Array.isArray(states) && states.length ? states.slice() : [];
    this.interactive = false;
    this.stateScales = {};

    // Ensure base states are always available
    if (!this.states.includes('idle')) {
      this.states.unshift('idle');
    }
    if (!this.states.includes('default')) {
      this.states.unshift('default');
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

  isHovered() {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.size &&
      mouseY >= this.y &&
      mouseY <= this.y + this.size
    );
  }

  display() {
    let dSize = this.size;
    let dx = this.x;
    let dy = this.y;
    const scale = this.stateScales[this.state] || 1;
    if (scale !== 1) {
      const newSize = dSize * scale;
      dx -= (newSize - dSize) / 2;
      dy -= (newSize - dSize) / 2;
      dSize = newSize;
    }
    if (this.interactive && this.isHovered()) {
      const newSize = dSize * 1.05;
      dx -= (newSize - dSize) / 2;
      dy -= (newSize - dSize) / 2;
      dSize = newSize;
    }
    const img = this.images[this.state];
    const ratio = img.height && img.width ? img.height / img.width : 1;
    const drawH = dSize * ratio;
    const drawY = dy - (drawH - dSize);
    image(img, dx, drawY, dSize, drawH);
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
    this.baseState = this.state;
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

  setStateScale(state, scale) {
    this.stateScales[state] = scale;
  }
}
