/**
 * Tug of War Math Duel - Chapter 5 (Lessons 1 & 2)
 * Lions vs Wolves Math Battle Arena
 * Zero-Build Architecture - Alapakadala Studio
 */

(function () {
  'use strict';

  /* ================= CURATED QUESTION DATA ================= */
  // 16 questions per set (8 for Lions, 8 for Wolves)
  // Covers: Bonds to 20, Subtraction from 20, 3-Part Combiner to 20, Bonds to 100, Next-Ten Hopper
  const QUESTION_SETS = {
    set1: {
      name: "Match 1",
      lions: [
        {
          id: "s1_l1",
          topic: "Bonds to 20",
          prompt: "What makes 20?",
          visual: "14 + ___ = 20",
          options: [6, 5, 7, 8],
          correct: 6,
          tip: "14 + 6 = 20! 4 and 6 make 10, so 14 and 6 make 20."
        },
        {
          id: "s1_l2",
          topic: "Bonds to 100",
          prompt: "How many more to make 100?",
          visual: "30 + ___ = 100",
          options: [70, 60, 80, 50],
          correct: 70,
          tip: "3 tens + 7 tens = 10 tens (100)!"
        },
        {
          id: "s1_l3",
          topic: "Take Away from 20",
          prompt: "Find the missing part:",
          visual: "20 - 7 = ___",
          options: [13, 12, 14, 11],
          correct: 13,
          tip: "20 - 7 = 13, because 13 + 7 = 20!"
        },
        {
          id: "s1_l4",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next multiple of 10:",
          visual: "45 + ___ = 50",
          options: [5, 4, 6, 15],
          correct: 5,
          tip: "5 more gets us from 45 to the next ten (50)!"
        },
        {
          id: "s1_l5",
          topic: "3-Part Combiner",
          prompt: "Combine 3 bags to make 20:",
          visual: "11 + 4 + ___ = 20",
          options: [5, 4, 6, 7],
          correct: 5,
          tip: "11 + 4 = 15, then 15 + 5 = 20!"
        },
        {
          id: "s1_l6",
          topic: "Bonds to 100",
          prompt: "What makes 100?",
          visual: "80 + ___ = 100",
          options: [20, 30, 10, 40],
          correct: 20,
          tip: "80 + 20 = 100 (8 tens + 2 tens = 10 tens)!"
        },
        {
          id: "s1_l7",
          topic: "Take Away from 20",
          prompt: "Calculate:",
          visual: "20 - 16 = ___",
          options: [4, 5, 3, 6],
          correct: 4,
          tip: "20 - 16 = 4, because 16 + 4 = 20!"
        },
        {
          id: "s1_l8",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next ten:",
          visual: "63 + ___ = 70",
          options: [7, 8, 6, 3],
          correct: 7,
          tip: "3 and 7 make 10, so 63 + 7 = 70!"
        }
      ],
      wolves: [
        {
          id: "s1_w1",
          topic: "Bonds to 20",
          prompt: "What makes 20?",
          visual: "12 + ___ = 20",
          options: [8, 7, 9, 6],
          correct: 8,
          tip: "12 + 8 = 20! 2 and 8 make 10."
        },
        {
          id: "s1_w2",
          topic: "Bonds to 100",
          prompt: "How many more to make 100?",
          visual: "50 + ___ = 100",
          options: [50, 40, 60, 30],
          correct: 50,
          tip: "50 + 50 = 100! Half of 100 is 50."
        },
        {
          id: "s1_w3",
          topic: "Take Away from 20",
          prompt: "Find the missing part:",
          visual: "20 - 9 = ___",
          options: [11, 12, 10, 13],
          correct: 11,
          tip: "20 - 9 = 11, because 11 + 9 = 20!"
        },
        {
          id: "s1_w4",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next multiple of 10:",
          visual: "62 + ___ = 70",
          options: [8, 7, 9, 6],
          correct: 8,
          tip: "2 and 8 make 10, so 62 + 8 = 70!"
        },
        {
          id: "s1_w5",
          topic: "3-Part Combiner",
          prompt: "Combine 3 bags to make 20:",
          visual: "13 + 2 + ___ = 20",
          options: [5, 4, 6, 7],
          correct: 5,
          tip: "13 + 2 = 15, then 15 + 5 = 20!"
        },
        {
          id: "s1_w6",
          topic: "Bonds to 100",
          prompt: "What makes 100?",
          visual: "40 + ___ = 100",
          options: [60, 50, 70, 40],
          correct: 60,
          tip: "40 + 60 = 100 (4 tens + 6 tens = 10 tens)!"
        },
        {
          id: "s1_w7",
          topic: "Take Away from 20",
          prompt: "Calculate:",
          visual: "20 - 15 = ___",
          options: [5, 4, 6, 7],
          correct: 5,
          tip: "20 - 15 = 5, because 15 + 5 = 20!"
        },
        {
          id: "s1_w8",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next ten:",
          visual: "27 + ___ = 30",
          options: [3, 4, 2, 7],
          correct: 3,
          tip: "7 and 3 make 10, so 27 + 3 = 30!"
        }
      ]
    },

    set2: {
      name: "Match 2",
      lions: [
        {
          id: "s2_l1",
          topic: "Bonds to 20",
          prompt: "What makes 20?",
          visual: "17 + ___ = 20",
          options: [3, 2, 4, 5],
          correct: 3,
          tip: "17 + 3 = 20! 7 and 3 make 10."
        },
        {
          id: "s2_l2",
          topic: "Bonds to 100",
          prompt: "How many more to make 100?",
          visual: "60 + ___ = 100",
          options: [40, 50, 30, 20],
          correct: 40,
          tip: "60 + 40 = 100 (6 tens + 4 tens = 10 tens)!"
        },
        {
          id: "s2_l3",
          topic: "Take Away from 20",
          prompt: "Find the missing part:",
          visual: "20 - 4 = ___",
          options: [16, 15, 17, 14],
          correct: 16,
          tip: "20 - 4 = 16, because 16 + 4 = 20!"
        },
        {
          id: "s2_l4",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next multiple of 10:",
          visual: "84 + ___ = 90",
          options: [6, 5, 7, 4],
          correct: 6,
          tip: "4 and 6 make 10, so 84 + 6 = 90!"
        },
        {
          id: "s2_l5",
          topic: "3-Part Combiner",
          prompt: "Combine 3 bags to make 20:",
          visual: "8 + 7 + ___ = 20",
          options: [5, 4, 6, 3],
          correct: 5,
          tip: "8 + 7 = 15, then 15 + 5 = 20!"
        },
        {
          id: "s2_l6",
          topic: "Bonds to 100",
          prompt: "What makes 100?",
          visual: "10 + ___ = 100",
          options: [90, 80, 100, 70],
          correct: 90,
          tip: "10 + 90 = 100 (1 ten + 9 tens = 10 tens)!"
        },
        {
          id: "s2_l7",
          topic: "Take Away from 20",
          prompt: "Calculate:",
          visual: "20 - 12 = ___",
          options: [8, 7, 9, 6],
          correct: 8,
          tip: "20 - 12 = 8, because 12 + 8 = 20!"
        },
        {
          id: "s2_l8",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next ten:",
          visual: "51 + ___ = 60",
          options: [9, 8, 7, 1],
          correct: 9,
          tip: "1 and 9 make 10, so 51 + 9 = 60!"
        }
      ],
      wolves: [
        {
          id: "s2_w1",
          topic: "Bonds to 20",
          prompt: "What makes 20?",
          visual: "9 + ___ = 20",
          options: [11, 10, 12, 9],
          correct: 11,
          tip: "9 + 11 = 20! 9 and 1 make 10, plus 10 is 20."
        },
        {
          id: "s2_w2",
          topic: "Bonds to 100",
          prompt: "How many more to make 100?",
          visual: "20 + ___ = 100",
          options: [80, 70, 90, 60],
          correct: 80,
          tip: "20 + 80 = 100 (2 tens + 8 tens = 10 tens)!"
        },
        {
          id: "s2_w3",
          topic: "Take Away from 20",
          prompt: "Find the missing part:",
          visual: "20 - 8 = ___",
          options: [12, 11, 13, 14],
          correct: 12,
          tip: "20 - 8 = 12, because 12 + 8 = 20!"
        },
        {
          id: "s2_w4",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next multiple of 10:",
          visual: "76 + ___ = 80",
          options: [4, 5, 3, 6],
          correct: 4,
          tip: "6 and 4 make 10, so 76 + 4 = 80!"
        },
        {
          id: "s2_w5",
          topic: "3-Part Combiner",
          prompt: "Combine 3 bags to make 20:",
          visual: "10 + 6 + ___ = 20",
          options: [4, 3, 5, 6],
          correct: 4,
          tip: "10 + 6 = 16, then 16 + 4 = 20!"
        },
        {
          id: "s2_w6",
          topic: "Bonds to 100",
          prompt: "What makes 100?",
          visual: "70 + ___ = 100",
          options: [30, 20, 40, 50],
          correct: 30,
          tip: "70 + 30 = 100 (7 tens + 3 tens = 10 tens)!"
        },
        {
          id: "s2_w7",
          topic: "Take Away from 20",
          prompt: "Calculate:",
          visual: "20 - 18 = ___",
          options: [2, 3, 1, 4],
          correct: 2,
          tip: "20 - 18 = 2, because 18 + 2 = 20!"
        },
        {
          id: "s2_w8",
          topic: "Next-Ten Hopper",
          prompt: "Hop to the next ten:",
          visual: "38 + ___ = 40",
          options: [2, 3, 1, 8],
          correct: 2,
          tip: "8 and 2 make 10, so 38 + 2 = 40!"
        }
      ]
    }
  };

  /* ================= GAME STATE ================= */
  const state = {
    selectedSetKey: 'set1', // 'set1' | 'set2' | 'shuffle'
    currentRound: 1,        // 1 to 8
    currentTurn: 'lions',   // 'lions' | 'wolves'
    ropePosition: 0,        // -4 (Lions Win Knockout) to +4 (Wolves Win Knockout)
    lionsScore: 0,          // 0 to 8
    wolvesScore: 0,         // 0 to 8
    answered: false,
    gameOver: false,
    questionsLions: [],
    questionsWolves: [],
    qIndexLions: 0,
    qIndexWolves: 0
  };

  /* ================= UTILITY HELPERS ================= */
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /* ================= MATCH INITIALIZATION ================= */
  window.startMatch = function (setKey) {
    state.selectedSetKey = setKey || 'set1';
    state.currentRound = 1;
    state.currentTurn = 'lions';
    state.ropePosition = 0;
    state.lionsScore = 0;
    state.wolvesScore = 0;
    state.answered = false;
    state.gameOver = false;
    state.qIndexLions = 0;
    state.qIndexWolves = 0;

    // Load Questions
    if (setKey === 'shuffle') {
      const allLions = [...QUESTION_SETS.set1.lions, ...QUESTION_SETS.set2.lions];
      const allWolves = [...QUESTION_SETS.set1.wolves, ...QUESTION_SETS.set2.wolves];
      state.questionsLions = shuffleArray(allLions).slice(0, 8);
      state.questionsWolves = shuffleArray(allWolves).slice(0, 8);
    } else {
      const selected = QUESTION_SETS[setKey] || QUESTION_SETS.set1;
      state.questionsLions = [...selected.lions];
      state.questionsWolves = [...selected.wolves];
    }

    // Update Set Switcher UI
    document.querySelectorAll('.match-select-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.set === state.selectedSetKey);
    });

    // Close Victory Modal
    const victoryModal = document.getElementById('victoryModal');
    if (victoryModal) victoryModal.classList.remove('active');

    // Reset Mascot Stances
    const lionMascot = document.getElementById('lionMascot');
    const wolfMascot = document.getElementById('wolfMascot');
    if (lionMascot) lionMascot.className = 'team-mascot lion normal';
    if (wolfMascot) wolfMascot.className = 'team-mascot wolf normal';

    updateHUD();
    renderCurrentQuestion();
    updateRopeVisual(false);

    if (window.sound) window.sound.playPop();
  };

  /* ================= UPDATE HUD & STADIUM ================= */
  function updateHUD() {
    const roundEl = document.getElementById('currentRoundBadge');
    const turnBanner = document.getElementById('activeTurnBanner');
    const lionsScoreEl = document.getElementById('lionsScore');
    const wolvesScoreEl = document.getElementById('wolvesScore');
    const lionsPullsEl = document.getElementById('lionsPulls');
    const wolvesPullsEl = document.getElementById('wolvesPulls');

    if (roundEl) {
      roundEl.textContent = `Round ${state.currentRound} / 8`;
    }

    if (lionsScoreEl) lionsScoreEl.textContent = state.lionsScore;
    if (wolvesScoreEl) wolvesScoreEl.textContent = state.wolvesScore;

    if (lionsPullsEl) lionsPullsEl.textContent = `${state.lionsScore} PULLS`;
    if (wolvesPullsEl) wolvesPullsEl.textContent = `${state.wolvesScore} PULLS`;

    if (turnBanner) {
      if (state.currentTurn === 'lions') {
        turnBanner.className = 'active-turn-banner lions-turn';
        turnBanner.innerHTML = `
          <span class="banner-icon">🦁</span>
          <span><strong>TEAM LIONS' TURN</strong> (Question ${state.currentRound}/8)</span>
        `;
      } else {
        turnBanner.className = 'active-turn-banner wolves-turn';
        turnBanner.innerHTML = `
          <span class="banner-icon">🐺</span>
          <span><strong>TEAM WOLVES' TURN</strong> (Question ${state.currentRound}/8)</span>
        `;
      }
    }

    // Toggle glowing active borders on team podiums
    const lionPodium = document.getElementById('lionPodium');
    const wolfPodium = document.getElementById('wolfPodium');
    if (lionPodium) lionPodium.classList.toggle('active-turn', state.currentTurn === 'lions');
    if (wolfPodium) wolfPodium.classList.toggle('active-turn', state.currentTurn === 'wolves');
  }

  /* ================= ROPE PHYSICS & VISUAL ================= */
  function updateRopeVisual(animateTug, winningTeam) {
    const ropeGraphic = document.getElementById('ropeGraphic');
    const centerRibbon = document.getElementById('centerRibbon');
    const balanceMeter = document.getElementById('balanceMeter');

    // Each step moves the rope by ~36px (or ~6.5%)
    // -4 to +4 range: -4 = 100% Lions win, +4 = 100% Wolves win
    const clampPos = Math.max(-4, Math.min(4, state.ropePosition));
    const offsetPercent = clampPos * 9.5; // -38% to +38%

    if (ropeGraphic) {
      ropeGraphic.style.transform = `translateX(${offsetPercent}%)`;
    }

    if (centerRibbon) {
      centerRibbon.style.transform = `translateX(${offsetPercent * 1.5}px)`;
    }

    if (balanceMeter) {
      // Update balance indicator needle
      const needle = document.getElementById('balanceNeedle');
      if (needle) {
        // -4 -> -80deg, 0 -> 0deg, +4 -> +80deg
        const deg = clampPos * 20;
        needle.style.transform = `rotate(${deg}deg)`;
      }
    }

    // Dynamic mascot expressions
    const lionMascot = document.getElementById('lionMascot');
    const wolfMascot = document.getElementById('wolfMascot');

    if (animateTug) {
      if (winningTeam === 'lions') {
        if (lionMascot) {
          lionMascot.className = 'team-mascot lion pulling';
          setTimeout(() => { if (!state.gameOver) lionMascot.className = 'team-mascot lion normal'; }, 700);
        }
        if (wolfMascot) {
          wolfMascot.className = 'team-mascot wolf slipping';
          setTimeout(() => { if (!state.gameOver) wolfMascot.className = 'team-mascot wolf normal'; }, 700);
        }
      } else if (winningTeam === 'wolves') {
        if (wolfMascot) {
          wolfMascot.className = 'team-mascot wolf pulling';
          setTimeout(() => { if (!state.gameOver) wolfMascot.className = 'team-mascot wolf normal'; }, 700);
        }
        if (lionMascot) {
          lionMascot.className = 'team-mascot lion slipping';
          setTimeout(() => { if (!state.gameOver) lionMascot.className = 'team-mascot lion normal'; }, 700);
        }
      }
    }
  }

  /* ================= RENDER CURRENT QUESTION ================= */
  function renderCurrentQuestion() {
    state.answered = false;

    const isLions = state.currentTurn === 'lions';
    const qList = isLions ? state.questionsLions : state.questionsWolves;
    const qIdx = isLions ? state.qIndexLions : state.qIndexWolves;
    const q = qList[qIdx] || qList[0];

    const topicEl = document.getElementById('questionTopic');
    const promptEl = document.getElementById('questionPrompt');
    const equationEl = document.getElementById('questionEquation');
    const optionsGrid = document.getElementById('questionOptionsGrid');
    const feedbackBanner = document.getElementById('turnFeedbackBanner');
    const nextBtnContainer = document.getElementById('nextTurnContainer');

    if (topicEl) {
      topicEl.textContent = `🎯 ${q.topic} • ${isLions ? 'Team Lions' : 'Team Wolves'}`;
      topicEl.className = `question-topic-pill ${isLions ? 'lions-pill' : 'wolves-pill'}`;
    }

    if (promptEl) promptEl.textContent = q.prompt;
    if (equationEl) equationEl.textContent = q.visual;

    if (feedbackBanner) feedbackBanner.className = 'turn-feedback-banner hidden';
    if (nextBtnContainer) nextBtnContainer.className = 'next-turn-container hidden';

    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      // Shuffle options for display variety
      const shuffledOptions = shuffleArray(q.options);
      shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = `duel-option-btn ${isLions ? 'lion-btn' : 'wolf-btn'}`;
        btn.innerHTML = `<span class="opt-num">${opt}</span>`;
        btn.onclick = () => handleAnswer(opt, q, btn);
        optionsGrid.appendChild(btn);
      });
    }
  }

  /* ================= HANDLE ANSWER ================= */
  function handleAnswer(selectedVal, question, clickedBtn) {
    if (state.answered || state.gameOver) return;
    state.answered = true;

    const isLions = state.currentTurn === 'lions';
    const isCorrect = (selectedVal === question.correct);

    // Disable all option buttons
    const allBtns = document.querySelectorAll('.duel-option-btn');
    allBtns.forEach(btn => {
      btn.disabled = true;
      const val = parseInt(btn.textContent.trim(), 10);
      if (val === question.correct) {
        btn.classList.add('correct-choice');
      } else if (btn === clickedBtn && !isCorrect) {
        btn.classList.add('wrong-choice');
      }
    });

    const feedbackBanner = document.getElementById('turnFeedbackBanner');
    const nextBtnContainer = document.getElementById('nextTurnContainer');
    const nextBtn = document.getElementById('nextTurnBtn');

    if (isCorrect) {
      if (window.sound) window.sound.playCorrect();

      // Rope moves toward the active team
      if (isLions) {
        state.ropePosition -= 1; // Left
        state.lionsScore += 1;
        updateRopeVisual(true, 'lions');
      } else {
        state.ropePosition += 1; // Right
        state.wolvesScore += 1;
        updateRopeVisual(true, 'wolves');
      }

      if (feedbackBanner) {
        feedbackBanner.className = 'turn-feedback-banner correct';
        feedbackBanner.innerHTML = `
          <div class="feedback-icon">🎉</div>
          <div class="feedback-text">
            <strong>AWESOME PULL!</strong> ${question.tip}
          </div>
        `;
      }
    } else {
      if (window.sound) window.sound.playBuzz();

      if (feedbackBanner) {
        feedbackBanner.className = 'turn-feedback-banner wrong';
        feedbackBanner.innerHTML = `
          <div class="feedback-icon">💦</div>
          <div class="feedback-text">
            <strong>SLIPPED!</strong> Correct answer was <strong>${question.correct}</strong>. ${question.tip}
          </div>
        `;
      }
    }

    updateHUD();

    // Check early knockout condition (if rope hits -4 or +4)
    if (Math.abs(state.ropePosition) >= 4) {
      setTimeout(() => {
        finishMatch(state.ropePosition <= -4 ? 'lions_knockout' : 'wolves_knockout');
      }, 1000);
      return;
    }

    // Check if this was the last turn of the match
    const isLastTurn = (state.currentRound === 8 && state.currentTurn === 'wolves');

    if (nextBtnContainer && nextBtn) {
      nextBtnContainer.className = 'next-turn-container visible';
      if (isLastTurn) {
        nextBtn.innerHTML = '🏆 See Final Results!';
        nextBtn.onclick = () => finishMatch('completed');
      } else {
        const nextTeamName = (state.currentTurn === 'lions') ? "🐺 Team Wolves" : "🦁 Team Lions";
        nextBtn.innerHTML = `Next: ${nextTeamName} ➔`;
        nextBtn.onclick = advanceTurn;
      }
    }
  }

  /* ================= ADVANCE TURN ================= */
  function advanceTurn() {
    if (window.sound) window.sound.playPop();

    if (state.currentTurn === 'lions') {
      state.currentTurn = 'wolves';
      state.qIndexLions++;
    } else {
      state.currentTurn = 'lions';
      state.qIndexWolves++;
      state.currentRound++;
    }

    updateHUD();
    renderCurrentQuestion();
  }

  /* ================= FINISH MATCH & VICTORY ================= */
  function finishMatch(reason) {
    state.gameOver = true;

    let winner = 'tie';
    let victoryTitle = "🤝 IT'S A TIE!";
    let victoryMsg = "Incredible tug of war! Both teams pulled with equal strength!";

    if (reason === 'lions_knockout' || state.ropePosition < 0 || (state.ropePosition === 0 && state.lionsScore > state.wolvesScore)) {
      winner = 'lions';
      victoryTitle = "🦁 TEAM LIONS WINS!";
      victoryMsg = (reason === 'lions_knockout')
        ? "KNOCKOUT VICTORY! The Lions pulled the rope all the way to their den!"
        : `Lions triumph with ${state.lionsScore} successful pulls!`;
    } else if (reason === 'wolves_knockout' || state.ropePosition > 0 || (state.ropePosition === 0 && state.wolvesScore > state.lionsScore)) {
      winner = 'wolves';
      victoryTitle = "🐺 TEAM WOLVES WINS!";
      victoryMsg = (reason === 'wolves_knockout')
        ? "KNOCKOUT VICTORY! The Wolves pulled the rope across the mud pit!"
        : `Wolves triumph with ${state.wolvesScore} successful pulls!`;
    }

    // Play celebration sound & confetti
    if (window.sound) window.sound.playFanfare();
    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 100, spread: 90 });
    }

    const modal = document.getElementById('victoryModal');
    const titleEl = document.getElementById('victoryTitle');
    const msgEl = document.getElementById('victoryMsg');
    const scoresEl = document.getElementById('victoryScores');
    const mascotWrap = document.getElementById('victoryMascotWrap');

    if (titleEl) titleEl.textContent = victoryTitle;
    if (msgEl) msgEl.textContent = victoryMsg;
    if (scoresEl) {
      scoresEl.innerHTML = `
        <div class="final-score-pill lion-pill">🦁 Lions: ${state.lionsScore} / 8</div>
        <div class="final-score-pill wolf-pill">🐺 Wolves: ${state.wolvesScore} / 8</div>
      `;
    }

    if (mascotWrap) {
      if (winner === 'lions') {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🦁</span><span class="trophy-badge">🏆</span>`;
      } else if (winner === 'wolves') {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🐺</span><span class="trophy-badge">🏆</span>`;
      } else {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🦁 🤝 🐺</span>`;
      }
    }

    if (modal) modal.classList.add('active');
  }

  /* ================= AUDIO TOGGLE ================= */
  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.innerHTML = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  /* ================= BOOTSTRAP ================= */
  window.addEventListener('DOMContentLoaded', () => {
    window.startMatch('set1');
  });

})();
