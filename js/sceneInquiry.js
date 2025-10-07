/* js/sceneInquiry.js — open micro-dialog on first entry to selected scenes */
(function(){
  var opened = {}; // sceneId -> true
  var active = null; // { sceneId, stepIndex, spec }

  function letterFromSceneSpec(sceneId, spec, lastAnswer){
    return {
      letter: spec.title || "Scene",
      concept: spec.concept || sceneId,
      description: "",
      starter: spec.starter,
      options: (Array.isArray(spec.options) && spec.options.length ? spec.options : (window.INQUIRY_MOVES||[]).map(function(m){return {move:m.id, text:m.label};})),
      answer: lastAnswer || "",
      // flag so letters.js logs ‘scene:<id>’
      _fromSceneId: sceneId
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
      if (!active) {
        box.style.display = 'none';
        return;
      }
      // reopen the letter-like UI prefilled with last reason if available
      var spec2 = active && active.spec ? active.spec : spec;
      var ltr = letterFromSceneSpec(active.sceneId, spec2, active && active.lastReason);
      if (window.showLetterInfo) showLetterInfo(ltr);
      box.style.display = 'none';
    };
    if (cont) cont.onclick = function(){
      box.style.display = 'none';
    };
  }

  // public
  window.maybeOpenSceneInquiry = function(sceneId){
    if (!window.SCENE_DIALOGS || !SCENE_DIALOGS[sceneId]) return;
    if (opened[sceneId]) return;
    opened[sceneId] = true;
    var spec = SCENE_DIALOGS[sceneId][0];
    active = { sceneId: sceneId, stepIndex: 0, spec: spec, lastReason: '' };
    // Use the letter overlay UI for the starter step
    var ltr = letterFromSceneSpec(sceneId, spec, active.lastReason);
    if (window.showLetterInfo) showLetterInfo(ltr);
  };

  // Chain the pressure/revise panel after the player saves a reason
  var oldHook = window.onAfterInquirySave;
  window.onAfterInquirySave = function(payload){
    try {
      if (active && payload && payload.letter && payload.letter._fromSceneId === active.sceneId) {
        active.lastReason = payload.letter.answer || '';
        showPressure(active.spec);
      }
    } finally {
      if (typeof oldHook === 'function') oldHook(payload);
    }
  };

  // Best-effort: if there is a known scene-change function, append our call
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
  // Try a few likely names; the first that exists gets patched
  if (!(attachAfter('goToScene') || attachAfter('changeScene') || attachAfter('setScene'))) {
    // If none found, nothing breaks; you can manually call maybeOpenSceneInquiry(sceneId) where you set the scene.
  }
})();
