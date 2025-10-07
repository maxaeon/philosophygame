/* js/sceneDialogs.js — minimal micro-dialogue content for scenes */
window.SCENE_DIALOGS = {
  barnInside: [{
    title: "Barn Bat",
    concept: "Bat Feelings",
    starter: "If you knew every fact about bats, would you know bat-feeling?",
    options: [
      { move: "reason",        text: "Yes—facts are enough, because…" },
      { move: "reason",        text: "No—feeling is different, because…" },
      { move: "question",      text: "What counts as ‘feeling’ here?" },
      { move: "counterexample",text: "What about tasting a new fruit?" },
      { move: "rule_change",   text: "Knowing-how vs knowing-that?" }
    ],
    pressure: "Is tasting a new fruit the same kind of knowing as ‘bat-feeling’? What’s similar or different?",
    revisePrompt: "Want to refine your rule?"
  }],
  cave: [{
    title: "Shadow Cave",
    concept: "Appearance and Reality",
    starter: "If shadows look like horses, are they horses?",
    options: [
      { move: "reason",        text: "No—appearance isn’t reality, because…" },
      { move: "question",      text: "When can appearance be enough?" },
      { move: "counterexample",text: "AR masks that track perfectly?" },
      { move: "rule_change",   text: "Trust appearances unless… (exceptions)" },
      { move: "analogy",       text: "It’s like a mirror / picture…" }
    ],
    pressure: "Name a time a picture or reflection fooled you. Does your rule handle that?",
    revisePrompt: "Add an exception?"
  }],
  donkey: [{
    title: "Toy Tracks",
    concept: "Sharing the Tracks",
    starter: "A cart is rolling toward many toys. A lever can divert it onto your own toy. Should you pull it?",
    options: [
      { move: "reason",        text: "Yes—fewer toys break, because…" },
      { move: "reason",        text: "No—don’t break your own toy, because…" },
      { move: "question",      text: "Whose toys? Are any already broken?" },
      { move: "counterexample",text: "What if the other toys are already broken?" },
      { move: "rule_change",   text: "Don’t break things unless… (state rule)" }
    ],
    pressure: "Does the same rule work if it’s someone else’s toy?",
    revisePrompt: "Write your ‘toy rule’ in 7 words."
  }]
};
