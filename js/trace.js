/* js/trace.js — store/export “reason trace” (global) */

var reasonTrace = [];

function logReason(entry) {
  // entry: { sceneOrLetter, move, reasonText, confidence }
  entry.t = Date.now();
  reasonTrace.push(entry);
  try { localStorage.setItem('philoReasonTrace', JSON.stringify(reasonTrace)); } catch(e){}
}

(function loadReasonTrace(){
  try {
    var v = JSON.parse(localStorage.getItem('philoReasonTrace')||'null');
    if (Array.isArray(v)) reasonTrace = v;
  } catch(e){}
})();

function exportReasonTrace(){
  var data = JSON.stringify(reasonTrace, null, 2);
  var blob = new Blob([data], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'reason-trace.json';
  a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
}
