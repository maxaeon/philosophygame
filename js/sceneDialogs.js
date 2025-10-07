/* js/sceneDialogs.js — scene micro-dialogues (starter → options → pressure → revise)
   Notes:
   - Keys should match your scene IDs. Unused keys are safe no-ops.
   - Each scene opens once on first entry (handled by sceneInquiry.js).
*/

window.SCENE_DIALOGS = Object.assign(window.SCENE_DIALOGS || {}, {
  // Classic philosophy of mind: Nagel
  bat: [{
    starter: "If you knew every fact about bats, would you know bat-feeling?",
    options: [
      { move: "reason",        text: "Yes—facts are enough, because…" },
      { move: "reason",        text: "No—feeling is different, because…" },
      { move: "question",      text: "What counts as ‘feeling’ here?" },
      { move: "counterexample",text: "What about tasting a new fruit?" },
      { move: "rule_change",   text: "Knowing-how vs knowing-that?" }
    ],
    pressure: "Is tasting a new fruit the same kind of knowing as ‘bat-feeling’? What's similar or different?",
    revisePrompt: "Want to refine your rule?"
  }],

  // Classic epistemology/metaphysics: Plato
  cave: [{
    starter: "If shadows look like horses, are they horses?",
    options: [
      { move: "reason",        text: "No—appearance isn’t reality, because…" },
      { move: "question",      text: "When can appearance be enough?" },
      { move: "counterexample",text: "AR masks that track perfectly?" },
      { move: "rule_change",   text: "Trust appearances unless… (exceptions)" },
      { move: "analogy",       text: "It’s like a mirror/picture…" }
    ],
    pressure: "Name a time a picture or reflection fooled you. Does your rule handle that?",
    revisePrompt: "Add an exception?"
  }],

  // Trolley-like toy rule
  tracks: [{
    starter: "A cart rolls toward many toys. A lever diverts it onto your own toy. Should you pull it?",
    options: [
      { move: "reason",        text: "Yes—fewer toys break, because…" },
      { move: "reason",        text: "No—don’t break your own toy, because…" },
      { move: "question",      text: "Whose toys? Are any already broken?" },
      { move: "counterexample",text: "What if the other toys are already broken?" },
      { move: "rule_change",   text: "Don’t break things unless… (state rule)" }
    ],
    pressure: "Does the same rule work if it’s someone else’s toy?",
    revisePrompt: "Write your ‘toy rule’ in 7 words."
  }],

  // Identity/essence vs function
  field: [{
    starter: "If a robot looks, baas, and grazes like a sheep, is it a sheep?",
    options: [
      { move: "reason",        text: "Yes—same job/behaviors, because…" },
      { move: "reason",        text: "No—being alive matters, because…" },
      { move: "question",      text: "What makes something a ‘real’ sheep?" },
      { move: "counterexample",text: "A toy sheep that can't grow wool?" },
      { move: "rule_change",   text: "Call it a sheep if it can live and grow." }
    ],
    pressure: "Does your rule work for newborn lambs or sheared sheep?",
    revisePrompt: "Tweak your ‘sheep rule’?"
  }],

  // Stereotypes/fairness; appearance vs evidence
  dogHouse: [{
    starter: "Should we judge Dog by looks or by evidence of behavior?",
    options: [
      { move: "reason",        text: "Evidence first—looks can mislead, because…" },
      { move: "reason",        text: "Looks can matter for safety, because…" },
      { move: "question",      text: "What counts as good evidence?" },
      { move: "counterexample",text: "A calm dog that looks scary?" },
      { move: "rule_change",   text: "Start with kindness; change with real facts." }
    ],
    pressure: "How much evidence is enough to change how we act?",
    revisePrompt: "Add a safety clause?"
  }],

  // Sorites (heap)
  picnic: [{
    starter: "How many vegetables make a ‘heap’?",
    options: [
      { move: "reason",        text: "Set a number threshold, because…" },
      { move: "question",      text: "Can a heap have fuzzy edges?" },
      { move: "counterexample",text: "If we remove one carrot at a time… still a heap?" },
      { move: "rule_change",   text: "Use a ‘close enough’ rule for vague words." },
      { move: "analogy",       text: "Like ‘tall’ people—no sharp line." }
    ],
    pressure: "Your rule says a heap at N. What about N−1?",
    revisePrompt: "Add a tolerance (‘about N’)?"
  }],

  // Animal minds/other minds
  tunnel: [{
    starter: "How can we tell if animals have feelings and thoughts?",
    options: [
      { move: "reason",        text: "Behavior shows it, because…" },
      { move: "analogy",       text: "Their brains are like ours, so…" },
      { move: "question",      text: "What would count as good evidence?" },
      { move: "counterexample",text: "A robot says ‘I’m sad about the plant’?" },
      { move: "rule_change",   text: "Treat beings with care unless strong evidence says not." }
    ],
    pressure: "Does your rule protect shy animals who don’t show feelings?",
    revisePrompt: "Adjust for quiet behavior?"
  }],

  // Local right-action choice; care/deontology conflict
  greenhouseInside: [{
    starter: "What makes an action ‘the right thing’ here?",
    options: [
      { move: "reason",        text: "Do what helps plants thrive (care), because…" },
      { move: "reason",        text: "Follow the rule we agreed on (duty), because…" },
      { move: "question",      text: "What is the goal of this task?" },
      { move: "counterexample",text: "What if breaking a small rule saves the seedlings?" },
      { move: "rule_change",   text: "Rules with an emergency exception." }
    ],
    pressure: "Does your rule allow unfairness or harm by accident?",
    revisePrompt: "Add a fairness/harm-prevention clause?"
  }],

  // Evidence/testimony hierarchy
  radioRoom: [{
    starter: "Two reports disagree—who should we trust?",
    options: [
      { move: "reason",        text: "The one with better track record, because…" },
      { move: "question",      text: "Can we check ourselves (see or measure)?" },
      { move: "counterexample",text: "A careful newbie vs a sloppy expert?" },
      { move: "rule_change",   text: "Rank evidence: seeing > measuring > testimony." },
      { move: "analogy",       text: "Like checking a recipe with a taste test." }
    ],
    pressure: "What if we can’t measure—how do we break the tie?",
    revisePrompt: "Add a fallback (two independent sources)?"
  }],

  // Self & representation
  mirror: [{
    starter: "Is your mirror‑self really you?",
    options: [
      { move: "reason",        text: "No—it’s an image, because…" },
      { move: "analogy",       text: "Like a photo/video call—not me, but about me." },
      { move: "question",      text: "What makes ‘you’ you?" },
      { move: "counterexample",text: "If the image moves *before* you do?" },
      { move: "rule_change",   text: "Images stand for us but aren’t us." }
    ],
    pressure: "Does this rule work for avatars and recordings?",
    revisePrompt: "Add a representation clause?"
  }],

  // Fiction & knowledge
  studio: [{
    starter: "Can we learn true things from made‑up stories?",
    options: [
      { move: "reason",        text: "Yes—about feelings/fairness, because…" },
      { move: "reason",        text: "Not about facts (like how many carrots), because…" },
      { move: "question",      text: "Which truths are we after?" },
      { move: "counterexample",text: "A story that teaches a real science fact?" },
      { move: "rule_change",   text: "Stories teach values; facts need checking." }
    ],
    pressure: "If many stories agree, does that count as evidence?",
    revisePrompt: "Add ‘stories suggest, tests confirm’?"
  }],

  // Question quality (meta-epistemology)
  bench: [{
    starter: "What makes a *good* question?",
    options: [
      { move: "reason",        text: "It leads to more questions, because…" },
      { move: "reason",        text: "It asks for reasons, not just answers, because…" },
      { move: "question",      text: "How can we test if a question is good?" },
      { move: "counterexample",text: "A tricky question that confuses everyone?" },
      { move: "rule_change",   text: "Good = clear, invites reasons, worth debating." }
    ],
    pressure: "Can a yes/no question ever be good? When?",
    revisePrompt: "Refine your test?"
  }],

  // Environmental value
  pond: [{
    starter: "Why protect nature here—what kind of value does it have?",
    options: [
      { move: "reason",        text: "Beauty matters even if no one sees it, because…" },
      { move: "reason",        text: "It helps us live (air, water), because…" },
      { move: "question",      text: "Do plants/animals have rights?" },
      { move: "counterexample",text: "What if saving one harms many?" },
      { move: "rule_change",   text: "Care for ecosystems unless strong reason not." }
    ],
    pressure: "Does your rule cover tiny creatures too?",
    revisePrompt: "Add a small‑life clause?"
  }],

  // Counting truth
  vegetables: [{
    starter: "If we disagree about how many carrots there are, can we both be right?",
    options: [
      { move: "reason",        text: "No—counting settles it, because…" },
      { move: "analogy",       text: "It’s not like favorite colors." },
      { move: "question",      text: "Are we counting the same thing?" },
      { move: "counterexample",text: "Carrot pieces vs whole carrots?" },
      { move: "rule_change",   text: "Truth tracks the world, not wishes." }
    ],
    pressure: "What if the light is bad—do we pause and check?",
    revisePrompt: "Add a ‘check when unsure’ step?"
  }],

  // Generalization & counterexample
  vegetables2: [{
    starter: "Are all carrots orange?",
    options: [
      { move: "reason",        text: "Yes—every carrot I’ve seen is, because…" },
      { move: "counterexample",text: "Purple carrots exist!" },
      { move: "question",      text: "What counts as a real counterexample?" },
      { move: "rule_change",   text: "Change to: ‘Many carrots are orange.’" },
      { move: "analogy",       text: "Like birds—most fly, but not all." }
    ],
    pressure: "Does one counterexample break a rule or just narrow it?",
    revisePrompt: "Weaken the generalization?"
  }]
});
