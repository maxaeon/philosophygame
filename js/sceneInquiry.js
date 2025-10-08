/* js/sceneInquiry.js — open a scene's micro-dialogue on first entry (reuses letter UI) */
(function(){
  var opened = {}; // sceneId -> true
  var active = null; // { sceneId, spec }

  function sceneHasLetter(sceneId){
    if (!Array.isArray(window.letters)) return false;
    return window.letters.some(function(l){ return l.scene === sceneId; });
  }

  function letterFromSceneSpec(sceneId, spec){
    return {
      letter: "Scene",
      concept: sceneId,
      description: "",
      starter: spec.starter,
      options: (Array.isArray(spec.options) && spec.options.length
        ? spec.options
        : (window.INQUIRY_MOVES||[]).map(m=>({move:m.id, text:m.label}))),
      _fromSceneId: sceneId // used to tag trace as scene context
    };
  }

  function showPressure(spec){
    var box = document.getElementById('dialogueBox');
    if (!box) return;
    var html = "";
    if (spec.pressure) html += "<p><em>"+spec.pressure+"</em></p>";
    if (spec.revisePrompt) html += "<p>"+spec.revisePrompt+"</p>";
    html += '<p><button id="reviseBtn">Revise</button> <button id="continueBtn2">Continue</button></p>';
    box.innerHTML = html;
    box.style.display = 'block';
    var revise = document.getElementById('reviseBtn');
    var cont = document.getElementById('continueBtn2');
    if (revise) revise.onclick = function(){
      var spec2 = active && active.spec ? active.spec : spec;
      var ltr = letterFromSceneSpec(active.sceneId, spec2);
      if (window.showLetterInfo) showLetterInfo(ltr);
    };
    if (cont) cont.onclick = function(){ box.style.display = 'none'; };
  }

  // Public entry: call this when a scene is entered
  window.maybeOpenSceneInquiry = function(sceneId){
    if (!window.SCENE_DIALOGS || !SCENE_DIALOGS[sceneId]) return;
    if (opened[sceneId]) return;
    if (sceneHasLetter(sceneId)) {
      opened[sceneId] = true;
      active = null;
      return;
    }
    opened[sceneId] = true;
    var spec = SCENE_DIALOGS[sceneId][0];
    active = { sceneId: sceneId, spec: spec };
    var ltr = letterFromSceneSpec(sceneId, spec);
    if (window.showLetterInfo) showLetterInfo(ltr);
  };

  // Chain the pressure/revise panel after the player saves a reason
  var oldHook = window.onAfterInquirySave;
  window.onAfterInquirySave = function(payload){
    try {
      if (active && payload && payload.letter && payload.letter._fromSceneId === active.sceneId) {
        showPressure(active.spec);
      }
    } finally {
      if (typeof oldHook === 'function') oldHook(payload);
    }
  };

  // Try to auto-wrap common scene change fns; safe no-ops if absent
  function attachAfter(fnName){
    var fn = window[fnName];
    if (typeof fn !== 'function') return false;
    window[fnName] = function(sceneId){
      var r = fn.apply(this, arguments);
      try { window.maybeOpenSceneInquiry(sceneId); } catch(e){}
      return r;
    };
    return true;
  }
  attachAfter('goToScene') || attachAfter('changeScene') || attachAfter('setScene');
})();
