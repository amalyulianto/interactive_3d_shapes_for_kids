/**
 * Lesson 2: Number Pairs to Multiples of Ten
 * 100-Rods Base-10 Visualizer, Next-Ten Hopper, 10x Magic Lens, Basketball 80 Target, Target Matcher, and Mastery Quiz
 * Zero-Build Architecture - Alapakadala Studio
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentMode: 'rods', // 'rods' | 'hopper' | 'lens' | 'hoop' | 'matcher' | 'quiz'
    rods: {
      cyanCount: 3 // 3 rods (30) + 7 rods (70) = 100
    },
    hopper: {
      startNum: 34,
      hopped: false
    },
    lens: {
      mode: 'tens', // 'ones' | 'tens'
      partA: 6,
      partB: 2
    },
    hoop: {
      target: 80, // 80 or 100
      activePlayerIndex: 0,
      players: [
        { name: 'Vera', emoji: '👧', start: 60, current: 60 },
        { name: 'Mei', emoji: '👧', start: 50, current: 50 },
        { name: 'Tim', emoji: '👦', start: 40, current: 40 },
        { name: 'Cyrus', emoji: '👦', start: 70, current: 70 }
      ]
    },
    matcher: {
      target: 50,
      cards: [],
      selectedId: null,
      pairsFound: 0
    },
    quiz: {
      level: 1,
      qIndex: 0,
      score: 0,
      answered: false,
      questions: []
    }
  };

  /* ================= MODE SWITCHING ================= */
  window.switchTensMode = function (mode) {
    state.currentMode = mode;
    const mobileSelect = document.getElementById('activitySelect');
    if (mobileSelect) mobileSelect.value = mode;
    if (window.sound) window.sound.playPop();

    // Update Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`tabBtn_${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Panels
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`view_${mode}`);
    if (activePanel) activePanel.classList.add('active');

    // Trigger Initial Renders
    if (mode === 'rods') renderRods();
    if (mode === 'hopper') renderHopper();
    if (mode === 'lens') renderLens();
    if (mode === 'hoop') renderHoop();
    if (mode === 'matcher') setupMatcher(state.matcher.target);
    if (mode === 'quiz') startQuiz(state.quiz.level);
  };

  /* ================= AUDIO TOGGLE ================= */
  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.innerHTML = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  /* ================= MODULE 1: 100-RODS VISUALIZER ================= */
  function renderRods() {
    const cyan = state.rods.cyanCount;
    const amber = 10 - cyan;
    const valCyan = cyan * 10;
    const valAmber = amber * 10;

    const eqLink = document.getElementById('rodsTopLink');
    const eqCyan = document.getElementById('rodsEqCyan');
    const eqAmber = document.getElementById('rodsEqAmber');
    const slider = document.getElementById('tensSlider');
    const rack = document.getElementById('rodsRack');

    if (eqLink) eqLink.innerHTML = `🌟 Look: <strong>${cyan}</strong> + <strong>${amber}</strong> = <strong>10</strong> &nbsp;➔&nbsp; <strong>${valCyan}</strong> + <strong>${valAmber}</strong> = <strong>100</strong>`;
    if (eqCyan) eqCyan.textContent = valCyan;
    if (eqAmber) eqAmber.textContent = valAmber;
    if (slider) slider.value = cyan;

    if (rack) {
      rack.innerHTML = '';
      for (let r = 0; r < 10; r++) {
        const rod = document.createElement('div');
        const isCyan = r < cyan;
        rod.className = `rod-item ${isCyan ? 'cyan' : 'amber'}`;
        rod.title = `Rod ${r + 1} (Value: 10)`;
        rod.onclick = () => setRodsCount(r + 1);

        // 10 blocks per rod
        for (let b = 0; b < 10; b++) {
          const block = document.createElement('div');
          block.className = 'rod-block';
          rod.appendChild(block);
        }

        const lbl = document.createElement('div');
        lbl.className = 'rod-label';
        lbl.textContent = '10';
        rod.appendChild(lbl);

        rack.appendChild(rod);
      }
    }

    // Highlight active preset chip
    document.querySelectorAll('#view_rods .preset-chip').forEach(chip => {
      const chipVal = parseInt(chip.dataset.val, 10);
      chip.classList.toggle('active', chipVal === cyan);
    });
  }

  window.setRodsCount = function (n) {
    if (n < 0) n = 0;
    if (n > 10) n = 10;
    state.rods.cyanCount = n;
    if (window.sound) window.sound.playPop();
    renderRods();
  };

  window.adjustRodsCount = function (delta) {
    window.setRodsCount(state.rods.cyanCount + delta);
  };

  window.onTensSliderChange = function (val) {
    window.setRodsCount(parseInt(val, 10));
  };

  /* ================= MODULE 2: NEXT-TEN HOPPER ================= */
  function renderHopper() {
    const start = state.hopper.startNum;
    const baseTen = Math.floor(start / 10) * 10;
    const nextTen = baseTen === start ? start + 10 : baseTen + 10;
    const jump = nextTen - start;
    const onesDigit = start % 10;

    const startEl = document.getElementById('hopperStartVal');
    const jumpEl = document.getElementById('hopperJumpVal');
    const targetEl = document.getElementById('hopperTargetVal');
    const clueEl = document.getElementById('hopperClueText');
    const ticksRow = document.getElementById('nlTicksRow');
    const frog = document.getElementById('frogMarker');

    if (startEl) startEl.textContent = start;
    if (jumpEl) jumpEl.textContent = `+${jump}`;
    if (targetEl) targetEl.textContent = nextTen;

    if (clueEl) {
      clueEl.innerHTML = `
        💡 <strong>The Secret of the Ones Digit:</strong><br>
        In <strong>${start}</strong>, the ones digit is <strong>${onesDigit}</strong>.<br>
        What pairs with <strong>${onesDigit}</strong> to make 10? Answer: <strong>${jump}</strong>!<br>
        So, <strong>${start} + ${jump} = ${nextTen}</strong>!
      `;
    }

    // Render Number Line Ticks
    if (ticksRow) {
      ticksRow.innerHTML = '';
      for (let v = baseTen; v <= nextTen; v++) {
        const tick = document.createElement('div');
        const isTen = (v % 10 === 0);
        const isStart = (v === start);
        const isTarget = (v === nextTen);

        tick.className = `nl-tick ${isTen ? 'is-ten' : ''} ${isStart ? 'is-start' : ''} ${isTarget ? 'is-target' : ''}`;
        tick.innerHTML = `
          <div class="nl-tick-mark"></div>
          <span class="nl-tick-val">${v}</span>
        `;
        ticksRow.appendChild(tick);
      }
    }

    // Position Frog
    if (frog && ticksRow) {
      const totalSteps = nextTen - baseTen;
      const currentStep = state.hopper.hopped ? totalSteps : (start - baseTen);
      const percent = (currentStep / totalSteps) * 100;
      frog.style.left = `${percent}%`;
    }
  }

  window.hopFrog = function () {
    state.hopper.hopped = true;
    if (window.sound) window.sound.playCorrect();
    if (window.AppUtils) window.AppUtils.confetti({ particleCount: 30 });
    renderHopper();

    setTimeout(() => {
      state.hopper.hopped = false;
      renderHopper();
    }, 1800);
  };

  window.randomizeHopper = function () {
    let rand;
    do {
      rand = Math.floor(Math.random() * 80) + 11;
    } while (rand % 10 === 0);

    state.hopper.startNum = rand;
    state.hopper.hopped = false;
    if (window.sound) window.sound.playPop();
    renderHopper();
  };

  /* ================= MODULE 3: 10× MAGIC LENS ================= */
  function renderLens() {
    const isTens = state.lens.mode === 'tens';
    const a = state.lens.partA;
    const b = state.lens.partB;
    const sum = a + b;

    const displayValA = isTens ? a * 10 : a;
    const displayValB = isTens ? b * 10 : b;
    const displaySum = isTens ? sum * 10 : sum;

    const btnOnes = document.getElementById('btnLensOnes');
    const btnTens = document.getElementById('btnLensTens');
    const noteEl = document.getElementById('lensConceptNote');
    const valAEl = document.getElementById('lensValA');
    const valBEl = document.getElementById('lensValB');
    const sumEl = document.getElementById('lensValSum');
    const tray = document.getElementById('lensManipulativesTray');
    const slider = document.getElementById('lensSlider');

    if (btnOnes) btnOnes.classList.toggle('active', !isTens);
    if (btnTens) btnTens.classList.toggle('active', isTens);
    if (slider) slider.value = a;

    if (valAEl) valAEl.textContent = displayValA;
    if (valBEl) valBEl.textContent = displayValB;
    if (sumEl) sumEl.textContent = displaySum;

    if (noteEl) {
      if (isTens) {
        noteEl.innerHTML = `🔬 <strong>10× Lens:</strong> ${a} tens + ${b} tens = ${sum} tens (<strong>${displayValA} + ${displayValB} = ${displaySum}</strong>)`;
      } else {
        noteEl.innerHTML = `🔍 <strong>1× Ones Lens:</strong> ${a} ones + ${b} ones = <strong>${sum} ones</strong>`;
      }
    }

    if (tray) {
      tray.innerHTML = '';
      const container = document.createElement('div');
      container.className = `lens-blocks-wrapper ${isTens ? 'mode-tens' : 'mode-ones'}`;

      // Group A (Cyan)
      const groupA = document.createElement('div');
      groupA.className = 'lens-group cyan';
      for (let i = 0; i < a; i++) {
        const item = document.createElement('div');
        item.className = isTens ? 'lens-rod' : 'lens-cube';
        if (isTens) {
          for (let k = 0; k < 10; k++) item.appendChild(document.createElement('i'));
          const tag = document.createElement('span');
          tag.textContent = '10';
          item.appendChild(tag);
        } else {
          item.textContent = '1';
        }
        groupA.appendChild(item);
      }

      // Plus Sign Divider
      const plusDivider = document.createElement('div');
      plusDivider.className = 'lens-plus-divider';
      plusDivider.textContent = '+';

      // Group B (Amber)
      const groupB = document.createElement('div');
      groupB.className = 'lens-group amber';
      for (let j = 0; j < b; j++) {
        const item = document.createElement('div');
        item.className = isTens ? 'lens-rod' : 'lens-cube';
        if (isTens) {
          for (let k = 0; k < 10; k++) item.appendChild(document.createElement('i'));
          const tag = document.createElement('span');
          tag.textContent = '10';
          item.appendChild(tag);
        } else {
          item.textContent = '1';
        }
        groupB.appendChild(item);
      }

      container.appendChild(groupA);
      container.appendChild(plusDivider);
      container.appendChild(groupB);
      tray.appendChild(container);
    }
  }

  window.setLensMode = function (m) {
    state.lens.mode = m;
    if (window.sound) window.sound.playPop();
    renderLens();
  };

  window.setLensBridge = function (a, b) {
    state.lens.partA = a;
    state.lens.partB = b;

    document.querySelectorAll('#view_lens .preset-chip').forEach(c => c.classList.remove('active'));
    const chip = document.getElementById(`lensChip_${a}_${b}`);
    if (chip) chip.classList.add('active');

    if (window.sound) window.sound.playPop();
    renderLens();
  };

  window.adjustLensPartA = function (delta) {
    const next = Math.max(1, Math.min(9, state.lens.partA + delta));
    state.lens.partA = next;
    if (window.sound) window.sound.playPop();
    renderLens();
  };

  window.onLensSliderChange = function (val) {
    state.lens.partA = parseInt(val, 10);
    renderLens();
  };

  /* ================= MODULE 4: BASKETBALL TARGET 80 & 100 ================= */
  function renderHoop() {
    const target = state.hoop.target;
    const activeIdx = state.hoop.activePlayerIndex;
    const player = state.hoop.players[activeIdx];
    const current = player.current;
    const needed = Math.max(0, target - current);

    const btn80 = document.getElementById('btnHoopTarget80');
    const btn100 = document.getElementById('btnHoopTarget100');
    const kidsRow = document.getElementById('hoopKidsRow');
    const playerInfo = document.getElementById('hoopPlayerInfo');
    const neededInfo = document.getElementById('hoopNeededInfo');
    const progressBar = document.getElementById('courtProgressBar');
    const progressLabel = document.getElementById('courtProgressLabel');
    const ballsTrack = document.getElementById('hoopBallsTrack');
    const eqText = document.getElementById('hoopEquationText');
    const shootBtn = document.getElementById('btnShootHoop');

    if (btn80) btn80.classList.toggle('active', target === 80);
    if (btn100) btn100.classList.toggle('active', target === 100);

    // Render 4 Player Cards
    if (kidsRow) {
      kidsRow.innerHTML = state.hoop.players.map((p, idx) => {
        const isSelected = idx === activeIdx;
        return `
          <div class="hoop-kid-card ${isSelected ? 'active' : ''}" onclick="selectHoopPlayer(${idx})">
            <div class="kid-avatar">${p.emoji}</div>
            <div class="kid-name">${p.name}</div>
            <div class="kid-score">${p.current} pts</div>
          </div>
        `;
      }).join('');
    }

    if (playerInfo) {
      playerInfo.innerHTML = `${player.emoji} <strong>${player.name}</strong> (Starting score: ${player.start} pts)`;
    }

    if (neededInfo) {
      if (needed === 0) {
        neededInfo.innerHTML = `🎉 <strong>Target ${target} Achieved!</strong>`;
      } else {
        neededInfo.innerHTML = `Needs <strong>${needed} more pts</strong> (${needed / 10} baskets) to reach ${target}`;
      }
    }

    if (progressBar) {
      const pct = Math.min(100, (current / target) * 100);
      progressBar.style.width = `${pct}%`;
    }

    if (progressLabel) {
      progressLabel.textContent = `${current} / ${target} pts`;
    }

    // Render 10-point Basketball Tokens
    if (ballsTrack) {
      ballsTrack.innerHTML = '';
      const totalBalls = target / 10;
      const filledBalls = current / 10;

      for (let i = 0; i < totalBalls; i++) {
        const ball = document.createElement('div');
        const isScored = i < filledBalls;
        ball.className = `court-ball ${isScored ? 'scored' : 'empty'}`;
        ball.textContent = '🏀';
        ball.title = `10 Points (Basket ${i + 1})`;
        ballsTrack.appendChild(ball);
      }
    }

    if (shootBtn) {
      shootBtn.disabled = (current >= target);
    }

    if (eqText) {
      eqText.innerHTML = `
        <strong>${player.start}</strong> + <strong>${target - player.start}</strong> = <strong>${target}</strong>
        &nbsp;•&nbsp;
        <strong>${target}</strong> − <strong>${player.start}</strong> = <strong>${target - player.start}</strong>
      `;
    }
  }

  window.setHoopTarget = function (t) {
    state.hoop.target = t;
    if (window.sound) window.sound.playPop();
    renderHoop();
  };

  window.selectHoopPlayer = function (idx) {
    state.hoop.activePlayerIndex = idx;
    if (window.sound) window.sound.playPop();
    renderHoop();
  };

  window.shootHoopBall = function () {
    const player = state.hoop.players[state.hoop.activePlayerIndex];
    if (player.current < state.hoop.target) {
      player.current += 10;
      if (player.current >= state.hoop.target) {
        if (window.sound) window.sound.playFanfare();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 50, spread: 80 });
      } else {
        if (window.sound) window.sound.playCorrect();
      }
      renderHoop();
    }
  };

  window.resetHoopPlayer = function () {
    const player = state.hoop.players[state.hoop.activePlayerIndex];
    player.current = player.start;
    if (window.sound) window.sound.playPop();
    renderHoop();
  };

  /* ================= MODULE 5: TARGET MATCHER ================= */
  const MATCHER_PRESETS = {
    30: [[12, 18], [25, 5], [10, 20]],
    40: [[26, 14], [31, 9], [20, 20]],
    50: [[32, 18], [45, 5], [24, 26]],
    60: [[42, 18], [35, 25], [15, 45]],
    70: [[54, 16], [48, 22], [30, 40]],
    80: [[63, 17], [55, 25], [42, 38]],
    100: [[30, 70], [45, 55], [18, 82]]
  };

  window.setupMatcher = function (target) {
    state.matcher.target = target;
    state.matcher.selectedId = null;
    state.matcher.pairsFound = 0;

    document.querySelectorAll('.target-badge-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.target, 10) === target);
    });

    const pairs = MATCHER_PRESETS[target] || MATCHER_PRESETS[50];
    let cards = [];
    pairs.forEach((pair, pairIdx) => {
      cards.push({ id: `c_${pairIdx}_a`, val: pair[0], pairId: pairIdx });
      cards.push({ id: `c_${pairIdx}_b`, val: pair[1], pairId: pairIdx });
    });

    state.matcher.cards = cards.sort(() => Math.random() - 0.5);
    renderMatcher();
  };

  function renderMatcher() {
    const grid = document.getElementById('cardsMatchGrid');
    const feedback = document.getElementById('matcherFeedback');
    const prompt = document.getElementById('matcherPrompt');

    if (prompt) {
      prompt.innerHTML = `Find two cards that add up to <strong>${state.matcher.target}</strong>!`;
    }

    if (grid) {
      grid.innerHTML = state.matcher.cards.map(c => `
        <div class="match-number-card ${c.paired ? 'paired' : ''} ${c.id === state.matcher.selectedId ? 'selected' : ''}" 
             id="${c.id}" 
             onclick="onCardClick('${c.id}')">
          ${c.val}
        </div>
      `).join('');
    }

    if (feedback) {
      if (state.matcher.pairsFound === 3) {
        feedback.className = 'quiz-feedback-banner correct';
        feedback.style.display = 'block';
        feedback.innerHTML = `🎉 Superb! All pairs to ${state.matcher.target} completed!`;
      } else {
        feedback.style.display = 'none';
      }
    }
  }

  window.onCardClick = function (cardId) {
    const card = state.matcher.cards.find(c => c.id === cardId);
    if (!card || card.paired) return;

    if (!state.matcher.selectedId) {
      state.matcher.selectedId = cardId;
      if (window.sound) window.sound.playPop();
      renderMatcher();
    } else if (state.matcher.selectedId === cardId) {
      state.matcher.selectedId = null;
      if (window.sound) window.sound.playPop();
      renderMatcher();
    } else {
      const firstCard = state.matcher.cards.find(c => c.id === state.matcher.selectedId);
      const sum = firstCard.val + card.val;

      if (sum === state.matcher.target) {
        firstCard.paired = true;
        card.paired = true;
        state.matcher.selectedId = null;
        state.matcher.pairsFound++;

        if (window.sound) window.sound.playCorrect();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 35 });
        renderMatcher();

        if (state.matcher.pairsFound === 3) {
          if (window.sound) window.sound.playFanfare();
          if (window.AppUtils) window.AppUtils.confetti({ particleCount: 80, spread: 80 });
        }
      } else {
        if (window.sound) window.sound.playWrong();
        const fb = document.getElementById('matcherFeedback');
        if (fb) {
          fb.className = 'quiz-feedback-banner wrong';
          fb.style.display = 'block';
          fb.innerHTML = `💭 ${firstCard.val} + ${card.val} = ${sum}. Not ${state.matcher.target}! Try again!`;
        }
        state.matcher.selectedId = null;
        renderMatcher();
      }
    }
  };

  /* ================= MODULE 6: MASTERY QUIZ ================= */
  const QUIZ_LEVEL_PRESETS = {
    1: [
      { q: "What pairs with 30 to make 100?", visual: "30 + [ ? ] = 100", correct: 70, options: [60, 70, 80, 90], exp: "3 tens + 7 tens = 10 tens (100)!" },
      { q: "What pairs with 80 to make 100?", visual: "80 + [ ? ] = 100", correct: 20, options: [10, 20, 30, 40], exp: "80 + 20 = 100" },
      { q: "Fill in the blank:", visual: "50 + [ ? ] = 100", correct: 50, options: [40, 50, 60, 100], exp: "50 + 50 = 100 (Half of 100!)" },
      { q: "What pairs with 10 to make 100?", visual: "10 + [ ? ] = 100", correct: 90, options: [80, 90, 95, 100], exp: "10 + 90 = 100" },
      { q: "What is 100 - 40?", visual: "100 - 40 = [ ? ]", correct: 60, options: [50, 60, 70, 80], exp: "100 - 40 = 60 (Since 40 + 60 = 100)" }
    ],
    2: [
      { q: "Hop to the next ten! What makes 30?", visual: "24 + [ ? ] = 30", correct: 6, options: [4, 6, 8, 16], exp: "The ones digit is 4. Since 4 + 6 = 10, 24 + 6 = 30!" },
      { q: "Hop to the next ten! What makes 50?", visual: "47 + [ ? ] = 50", correct: 3, options: [2, 3, 7, 13], exp: "7 + 3 = 10, so 47 + 3 = 50!" },
      { q: "Hop to the next ten! What makes 80?", visual: "72 + [ ? ] = 80", correct: 8, options: [6, 7, 8, 12], exp: "2 + 8 = 10, so 72 + 8 = 80!" },
      { q: "What is the jump from 65 to 70?", visual: "65 + [ ? ] = 70", correct: 5, options: [3, 5, 10, 15], exp: "5 + 5 = 10, so 65 + 5 = 70!" },
      { q: "What is the jump from 89 to 90?", visual: "89 + [ ? ] = 90", correct: 1, options: [1, 2, 9, 11], exp: "89 + 1 = 90" }
    ],
    3: [
      { q: "Target multiple: What pairs with 35 to make 50?", visual: "35 + [ ? ] = 50", correct: 15, options: [10, 15, 20, 25], exp: "35 + 5 = 40, plus 10 = 50. Total +15!" },
      { q: "Target multiple: What pairs with 22 to make 40?", visual: "22 + [ ? ] = 40", correct: 18, options: [12, 16, 18, 20], exp: "22 + 8 = 30, plus 10 = 40. Total +18!" },
      { q: "Target multiple: What pairs with 45 to make 60?", visual: "45 + [ ? ] = 60", correct: 15, options: [10, 15, 25, 30], exp: "45 + 15 = 60" },
      { q: "Target multiple: What pairs with 68 to make 80?", visual: "68 + [ ? ] = 80", correct: 12, options: [2, 12, 14, 22], exp: "68 + 2 = 70, plus 10 = 80. Total +12!" },
      { q: "Target multiple: What pairs with 15 to make 30?", visual: "15 + [ ? ] = 30", correct: 15, options: [10, 15, 20, 25], exp: "Double 15 is 30!" }
    ],
    4: [
      { q: "Speed Tens: Which pair does NOT make 100?", visual: "Spot the impostor!", correct: "35 + 75", options: ["20 + 80", "35 + 75", "45 + 55", "10 + 90"], exp: "35 + 75 = 110, not 100!" },
      { q: "Speed Tens: What is 70 + 30?", visual: "70 + 30 = [ ? ]", correct: 100, options: [90, 100, 105, 110], exp: "70 + 30 = 100" },
      { q: "Speed Tens: What pairs with 56 to make 60?", visual: "56 + [ ? ] = 60", correct: 4, options: [2, 4, 6, 14], exp: "6 + 4 = 10, so 56 + 4 = 60" },
      { q: "Speed Tens: What pairs with 81 to make 90?", visual: "81 + [ ? ] = 90", correct: 9, options: [8, 9, 10, 19], exp: "1 + 9 = 10, so 81 + 9 = 90" },
      { q: "Speed Tens: What is 100 - 15?", visual: "100 - 15 = [ ? ]", correct: 85, options: [75, 80, 85, 90], exp: "100 - 15 = 85 (since 85 + 15 = 100)" }
    ]
  };

  window.startQuiz = function (level) {
    state.quiz.level = level;
    state.quiz.qIndex = 0;
    state.quiz.score = 0;
    state.quiz.answered = false;
    state.quiz.questions = [...QUIZ_LEVEL_PRESETS[level]];

    document.querySelectorAll('.level-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.level, 10) === level);
    });

    renderQuizQuestion();
  };

  function renderQuizQuestion() {
    state.quiz.answered = false;
    const q = state.quiz.questions[state.quiz.qIndex];
    const total = state.quiz.questions.length;

    const countEl = document.getElementById('quizQCount');
    const scoreEl = document.getElementById('quizScore');
    const promptEl = document.getElementById('quizPrompt');
    const visualEl = document.getElementById('quizVisual');
    const optionsContainer = document.getElementById('quizOptions');
    const feedbackEl = document.getElementById('quizFeedback');
    const nextContainer = document.getElementById('quizNextContainer');

    if (countEl) countEl.textContent = `Question ${state.quiz.qIndex + 1} of ${total}`;
    if (scoreEl) scoreEl.textContent = `Score: ${state.quiz.score}`;
    if (promptEl) promptEl.textContent = q.q;
    if (visualEl) visualEl.textContent = q.visual;
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'quiz-feedback-banner';
    }
    if (nextContainer) {
      nextContainer.style.display = 'none';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = q.options.map(opt => `
        <button class="quiz-option-btn" data-val="${opt}" onclick="submitQuizAnswer('${opt}')">${opt}</button>
      `).join('');
    }
  }

  window.submitQuizAnswer = function (selected) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;

    const q = state.quiz.questions[state.quiz.qIndex];
    const isCorrect = String(selected) === String(q.correct);
    const feedbackEl = document.getElementById('quizFeedback');
    const nextContainer = document.getElementById('quizNextContainer');
    const nextBtn = document.getElementById('btnNextQuestion');

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      const val = btn.dataset.val;
      btn.classList.add('opt-disabled');
      if (String(val) === String(q.correct)) {
        btn.classList.add('opt-correct');
      } else if (String(val) === String(selected) && !isCorrect) {
        btn.classList.add('opt-wrong');
      }
    });

    if (isCorrect) {
      state.quiz.score += 20;
      if (window.sound) window.sound.playCorrect();
      if (window.AppUtils) window.AppUtils.confetti({ particleCount: 40 });
      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback-banner correct';
        feedbackEl.innerHTML = `🌟 Brilliant! ${q.exp}`;
      }
    } else {
      if (window.sound) window.sound.playWrong();
      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback-banner wrong';
        feedbackEl.innerHTML = `💡 Good try! Correct answer: <strong>${q.correct}</strong> (${q.exp})`;
      }
    }

    const scoreEl = document.getElementById('quizScore');
    if (scoreEl) scoreEl.textContent = `Score: ${state.quiz.score}`;

    if (nextContainer) {
      nextContainer.style.display = 'flex';
      if (nextBtn) {
        const isLast = (state.quiz.qIndex === state.quiz.questions.length - 1);
        nextBtn.innerHTML = isLast ? 'See Results 🏆' : 'Next Question ➔';
      }
    }
  };

  window.goToNextQuestion = function () {
    if (window.sound) window.sound.playPop();
    if (state.quiz.qIndex < state.quiz.questions.length - 1) {
      state.quiz.qIndex++;
      renderQuizQuestion();
    } else {
      showQuizFinished();
    }
  };

  function showQuizFinished() {
    if (window.sound) window.sound.playFanfare();
    if (window.AppUtils) window.AppUtils.confetti({ particleCount: 90, spread: 80 });

    const promptEl = document.getElementById('quizPrompt');
    const visualEl = document.getElementById('quizVisual');
    const optionsContainer = document.getElementById('quizOptions');
    const feedbackEl = document.getElementById('quizFeedback');
    const nextContainer = document.getElementById('quizNextContainer');

    if (promptEl) promptEl.textContent = "🏆 Quiz Complete!";
    if (visualEl) visualEl.innerHTML = `⭐ Final Score: ${state.quiz.score} / 100 ⭐`;
    if (feedbackEl) feedbackEl.style.display = 'none';
    if (nextContainer) nextContainer.style.display = 'none';

    if (optionsContainer) {
      optionsContainer.innerHTML = `
        <button class="action-btn" onclick="startQuiz(${state.quiz.level})" style="grid-column: span 2;">
          🔄 Play Again
        </button>
        <button class="action-btn secondary" onclick="startQuiz(${(state.quiz.level % 4) + 1})" style="grid-column: span 2;">
          ⏩ Next Level (Level ${(state.quiz.level % 4) + 1})
        </button>
      `;
    }
  }

  /* ================= BOOTSTRAP ================= */
  window.addEventListener('DOMContentLoaded', () => {
    renderRods();
    renderHopper();
    renderLens();
    renderHoop();
    setupMatcher(50);
    startQuiz(1);
  });

})();