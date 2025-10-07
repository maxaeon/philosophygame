/* js/moves.js — inquiry moves + virtue badge scoring (global, no modules) */

var INQUIRY_MOVES = [
  { id: 'reason',        label: 'Take a side + reason' },
  { id: 'question',      label: 'Ask for missing info' },
  { id: 'counterexample',label: 'Offer a counterexample' },
  { id: 'rule_change',   label: 'Change the rule' },
  { id: 'analogy',       label: 'Compare to something' }
];

var virtueBadges = { curiosity:0, charity:0, consistency:0, courage:0, patience:0 };

function scoreMove(moveId) {
  var delta = { curiosity:0, charity:0, consistency:0, courage:0, patience:0 };
  if (moveId === 'question')       delta.curiosity++;
  if (moveId === 'counterexample') delta.consistency++;
  if (moveId === 'rule_change')    delta.courage++;
  if (moveId === 'analogy')        delta.charity++;
  if (moveId === 'reason')         delta.patience++;
  for (var k in delta) { virtueBadges[k] = (virtueBadges[k]||0) + delta[k]; }
  try { localStorage.setItem('virtueBadges', JSON.stringify(virtueBadges)); } catch(e) {}
  return delta;
}

(function loadVirtueBadges(){
  try {
    var v = JSON.parse(localStorage.getItem('virtueBadges')||'null');
    if (v) virtueBadges = v;
  } catch(e){}
})();
