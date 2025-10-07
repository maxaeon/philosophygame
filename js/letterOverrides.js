/* js/letterOverrides.js — fit-for-purpose options per letter. Safe: only merges if letter matches. */

window.LETTER_OVERRIDES = {
  A: { // Autonomy
    starter: "Should parents ever decide for you?",
    options: [
      { move:"reason",        text:"Yes—safety comes first, because…" },
      { move:"reason",        text:"No—choosing is how I learn, because…" },
      { move:"question",      text:"What counts as a ‘big’ choice?" },
      { move:"counterexample",text:"What if I want to do something risky?" },
      { move:"rule_change",   text:"Adults guide; kids decide when ready." }
    ],
    pressure: "Does your rule change with age or situation?",
    revisePrompt: "Add an age/safety clause?"
  },

  B: { // Believing & evidence
    starter: "Is it okay to believe with no evidence?",
    options: [
      { move:"reason",        text:"Yes—for fun hopes, because…" },
      { move:"reason",        text:"No—beliefs guide actions, because…" },
      { move:"question",      text:"What *is* evidence here?" },
      { move:"counterexample",text:"A trusted friend’s promise?" },
      { move:"rule_change",   text:"Okay for hopes; not for actions." }
    ],
    pressure: "What if a belief could harm someone?",
    revisePrompt: "Add a harm clause?"
  },

  D: { // Difference/criteria
    starter: "What makes a dog different from a cat?",
    options: [
      { move:"reason",        text:"Body/biology differences matter, because…" },
      { move:"analogy",       text:"Jobs/behaviors differ (herding vs climbing), because…" },
      { move:"question",      text:"Which differences *really* matter?" },
      { move:"counterexample",text:"A dog that climbs and purrs?" },
      { move:"rule_change",   text:"Differences by kind, not looks alone." }
    ],
    pressure: "Are there mixed cases? How do we decide?",
    revisePrompt: "Tweak your criteria?"
  },

  E: { // Ethics
    starter: "What’s the right thing to do here?",
    options: [
      { move:"reason",        text:"Help whoever needs it most, because…" },
      { move:"reason",        text:"Keep our promise, because…" },
      { move:"question",      text:"What’s the goal and who’s affected?" },
      { move:"counterexample",text:"Promise vs saving someone?" },
      { move:"rule_change",   text:"Rule with an emergency exception." }
    ],
    pressure: "Does your rule ever allow unfairness?",
    revisePrompt: "Add a fairness clause?"
  },

  I: { // Identity over time
    starter: "What makes something the same over time?",
    options: [
      { move:"reason",        text:"Same story/history matters, because…" },
      { move:"reason",        text:"Same pieces matter, because…" },
      { move:"question",      text:"What if parts are replaced slowly?" },
      { move:"counterexample",text:"A bike with every part replaced?" },
      { move:"rule_change",   text:"Same if memory/projects continue." }
    ],
    pressure: "If we reassemble the old parts elsewhere, which is original?",
    revisePrompt: "Choose story vs matter?"
  },

  J: { // Judging (fallibilism)
    starter: "Are grown‑up judgments always right?",
    options: [
      { move:"reason",        text:"No—everyone can err, because…" },
      { move:"reason",        text:"Often right—more experience, because…" },
      { move:"question",      text:"What makes a judgment *good*?" },
      { move:"counterexample",text:"A kid corrects an adult?" },
      { move:"rule_change",   text:"Judge by reasons, not age." }
    ],
    pressure: "How should we handle disagreement kindly?",
    revisePrompt: "Add a civility step?"
  },

  K: { // Knowledge sources
    starter: "How do you gain knowledge?",
    options: [
      { move:"reason",        text:"By seeing/doing it, because…" },
      { move:"reason",        text:"By learning from others, because…" },
      { move:"question",      text:"When is testimony enough?" },
      { move:"counterexample",text:"A rumor that seems true?" },
      { move:"rule_change",   text:"Prefer seeing; accept testimony with checks." }
    ],
    pressure: "What if seeing misleads (optical illusion)?",
    revisePrompt: "Add a cross‑check?"
  },

  L: { // Logic
    starter: "When do you use logic?",
    options: [
      { move:"reason",        text:"When I test if reasons fit, because…" },
      { move:"analogy",       text:"Like math steps—each must follow." },
      { move:"question",      text:"What makes a reason *valid*?" },
      { move:"counterexample",text:"A reason that sounds right but doesn’t follow?" },
      { move:"rule_change",   text:"‘If… then…’ needs a true ‘if’." }
    ],
    pressure: "Can true reasons still lead to wrong conclusions?",
    revisePrompt: "Clarify your ‘if’ condition?"
  },

  M: { // Minds
    starter: "Do other animals think and feel like we do?",
    options: [
      { move:"reason",        text:"Yes—similar brains/behavior, because…" },
      { move:"reason",        text:"Some do, some don’t, because…" },
      { move:"question",      text:"What *counts* as feeling?" },
      { move:"counterexample",text:"An octopus solving puzzles?" },
      { move:"rule_change",   text:"Respect unless strong evidence otherwise." }
    ],
    pressure: "Does your rule protect less showy animals?",
    revisePrompt: "Add a ‘quiet animals’ clause?"
  },

  P: { // Promises
    starter: "Is it ever okay to break a promise?",
    options: [
      { move:"reason",        text:"Yes—when keeping it causes harm, because…" },
      { move:"reason",        text:"No—promises build trust, because…" },
      { move:"question",      text:"What counts as a good excuse?" },
      { move:"counterexample",text:"A promise vs a real emergency?" },
      { move:"rule_change",   text:"Keep promises except emergency cases." }
    ],
    pressure: "What about small harms vs big harms?",
    revisePrompt: "Add a threshold?"
  },

  Q: { // Qualia
    starter: "What is it like to taste a new fruit?",
    options: [
      { move:"reason",        text:"You only know by trying, because…" },
      { move:"question",      text:"Can a description ever be enough?" },
      { move:"counterexample",text:"A flavor you already know well?" },
      { move:"analogy",       text:"Like riding a bike—you must try." },
      { move:"rule_change",   text:"Try first when safe; read to prepare." }
    ],
    pressure: "When is ‘read first’ wiser than ‘try first’?",
    revisePrompt: "Add a safety clause?"
  },

  R: { // Reality (tooth fairy / make-believe)
    starter: "Do you think the tooth fairy is real?",
    options: [
      { move:"reason",        text:"It’s a story we tell, because…" },
      { move:"reason",        text:"It could be real—I lack proof, because…" },
      { move:"question",      text:"What makes something *real*?" },
      { move:"counterexample",text:"Money appears—does that count as evidence?" },
      { move:"rule_change",   text:"Believe stories for fun; check claims for action." }
    ],
    pressure: "What would change your mind either way?",
    revisePrompt: "Add an evidence test?"
  },

  S: { // Stories & truth
    starter: "Are stories true?",
    options: [
      { move:"reason",        text:"True about feelings and values, because…" },
      { move:"reason",        text:"Not true about facts without checks, because…" },
      { move:"question",      text:"What kind of truth do you mean?" },
      { move:"counterexample",text:"A story that gets a science fact right?" },
      { move:"rule_change",   text:"Stories suggest; tests confirm." }
    ],
    pressure: "If many stories agree, does that count as evidence?",
    revisePrompt: "Clarify ‘truth about what’?"
  },

  T: { // Truth
    starter: "Why does truth matter?",
    options: [
      { move:"reason",        text:"It helps us solve problems together, because…" },
      { move:"reason",        text:"It keeps us safe (medicine, maps), because…" },
      { move:"question",      text:"How do we check what’s true?" },
      { move:"counterexample",text:"A comforting false belief?" },
      { move:"rule_change",   text:"Care for feelings; act on truths." }
    ],
    pressure: "When is comfort worth it, if ever?",
    revisePrompt: "Add a care clause?"
  },

  X: { // eXperience
    starter: "What can experience teach that reading can’t?",
    options: [
      { move:"reason",        text:"Skills—riding, tasting, balancing—because…" },
      { move:"question",      text:"Can reading sometimes be enough?" },
      { move:"counterexample",text:"Tasting a hot pepper after reading about it?" },
      { move:"analogy",       text:"Like swimming—you must get wet." },
      { move:"rule_change",   text:"Try first when safe; read to prepare." }
    ],
    pressure: "Can ‘try first’ ever be unsafe?",
    revisePrompt: "Add a safety check?"
  },

  Y: { // You (virtue reflection)
    starter: "Name one strength and one thing to practice.",
    options: [
      { move:"reason",        text:"Strength: … because…" },
      { move:"reason",        text:"Practice: … because…" },
      { move:"question",      text:"What helps you practice?" },
      { move:"counterexample",text:"A time it didn’t work—what blocked you?" },
      { move:"rule_change",   text:"Set a small daily step." }
    ],
    pressure: "How will you know it’s working?",
    revisePrompt: "Add a check‑in?"
  }
};
