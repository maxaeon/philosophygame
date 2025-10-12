const GameStates = {
  SCENE_ACTIVE: 'SCENE_ACTIVE',
  PAUSED_UI: 'PAUSED_UI'
};

const GameStateManager = (() => {
  const stateStack = [GameStates.SCENE_ACTIVE];
  const listeners = new Set();
  let locked = false;

  function currentState() {
    return stateStack[stateStack.length - 1];
  }

  function notify() {
    const state = currentState();
    locked = state === GameStates.PAUSED_UI;
    if (typeof window !== 'undefined') {
      window.gameState = state;
    }
    listeners.forEach(fn => {
      try {
        fn(state);
      } catch (err) {
        console.error(err);
      }
    });
  }

  function push(state) {
    stateStack.push(state);
    notify();
    let active = true;
    return () => {
      if (!active) return currentState();
      active = false;
      pop();
      return currentState();
    };
  }

  function pop() {
    if (stateStack.length > 1) {
      stateStack.pop();
      notify();
    }
    return currentState();
  }

  function replace(state) {
    stateStack[stateStack.length - 1] = state;
    notify();
    return currentState();
  }

  function lockUi() {
    return push(GameStates.PAUSED_UI);
  }

  function withUiLock(fn) {
    const release = lockUi();
    try {
      return fn();
    } finally {
      release();
    }
  }

  function isUiLocked() {
    return locked;
  }

  function reset() {
    stateStack.length = 1;
    stateStack[0] = GameStates.SCENE_ACTIVE;
    notify();
  }

  function onChange(fn) {
    if (typeof fn === 'function') {
      listeners.add(fn);
    }
    return () => listeners.delete(fn);
  }

  // Initialize window.gameState
  notify();

  return {
    state: currentState,
    push,
    pop,
    replace,
    lockUi,
    withUiLock,
    isUiLocked,
    reset,
    onChange
  };
})();

const Overlay = (() => {
  const registered = new Set();
  const active = new Map();

  function ensureElement(id) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Overlay element #${id} not found.`);
    }
    return el;
  }

  function show(id, options = {}) {
    registered.add(id);
    const el = ensureElement(id);
    if (!el) return null;
    const { lock = true } = options;
    el.style.display = options.display || 'block';
    if (!active.has(id)) {
      let release = null;
      if (lock && typeof GameStateManager.lockUi === 'function') {
        release = GameStateManager.lockUi();
      }
      active.set(id, { release, lock });
    }
    return el;
  }

  function hide(id) {
    registered.add(id);
    const el = ensureElement(id);
    if (el) {
      el.style.display = 'none';
      if (typeof el.onclick === 'function') {
        el.onclick = null;
      }
    }
    const entry = active.get(id);
    if (entry && typeof entry.release === 'function') {
      entry.release();
    }
    active.delete(id);
  }

  function hideAll() {
    Array.from(active.keys()).forEach(hide);
    registered.forEach(id => {
      if (!active.has(id)) {
        const el = document.getElementById(id);
        if (el) {
          el.style.display = 'none';
        }
      }
    });
  }

  return {
    register(id) {
      registered.add(id);
    },
    show,
    hide,
    hideAll
  };
})();

['letterInfoBox', 'adviceBox', 'notificationBox', 'answersBox'].forEach(id => {
  Overlay.register(id);
});

if (typeof window !== 'undefined') {
  window.GameStates = GameStates;
  window.GameStateManager = GameStateManager;
  window.Overlay = Overlay;
}
