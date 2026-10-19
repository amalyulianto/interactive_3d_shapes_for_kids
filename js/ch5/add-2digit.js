/**
 * Lesson 3: Adding Up to 2-Digit Numbers
 * 1-Digit Addition with Regrouping, Adding Tens, Split Strategy, and Mastery Quiz
 * Zero-Build Architecture - Alapakadala Studio
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentMode: 'single', // 'single' | 'tens' | 'split' | 'quiz'
    single: {
      num1: 27,
      num2: 5,
      regrouped: false
    },
    tens: {
      num: 34,
      addTens: 20
    },
    split: {
      a: 35,
      b: 24
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
  window.switchAddMode = function (mode) {
    state.currentMode = mode;
    if (window.sound) window.sound.playPop();

    // Update Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`tabBtn_${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Panels
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`view_${mode}`);
    if (activePanel) activePanel.classList.add('active');

    // Sync Mobile Activity Select
    const mobileSelect = document.getElementById('mobileActivitySelect');
    if (mobileSelect) mobileSelect.value = mode;

    // Trigger Initial Renders
    if (mode === 'single') renderSingleMat();
    if (mode === 'tens') renderTensFocus();
    if (mode === 'split') renderSplitStrategy();
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

  /* ================= MODULE 1: ADD 1-DIGIT & REGROUPING ================= */
  function renderSingleMat() {
    const n1 = state.single.num1;
    const n2 = state.single.num2;
    const sum = n1 + n2;
    const baseTens = Math.floor(n1 / 10);
    const ones1 = n1 % 10;
    const totalOnes = ones1 + n2;
    const needsRegroup = totalOnes >= 10;
    const isRegrouped = state.single.regrouped;

    // Display equation
    const eqNum1 = document.getElementById('singleEqNum1');
    const eqNum2 = document.getElementById('singleEqNum2');
    const eqSum = document.getElementById('singleEqSum');
    const tensRack = document.getElementById('matTensContent');
    const onesRack = document.getElementById('matOnesContent');
    const tensCount = document.getElementById('matTensCount');
    const onesCount = document.getElementById('matOnesCount');
    const banner = document.getElementById('regroupBanner');

    if (eqNum1) eqNum1.textContent = n1;
    if (eqNum2) eqNum2.textContent = n2;
    if (eqSum) eqSum.textContent = sum;

    // Effective tens and ones
    const displayTens = isRegrouped ? (baseTens + 1) : baseTens;
    const displayOnes = isRegrouped ? (totalOnes - 10) : totalOnes;

    if (tensCount) tensCount.textContent = `${displayTens} Tens (${displayTens * 10})`;
    if (onesCount) onesCount.textContent = `${displayOnes} Ones`;

    // Render Tens Rods
    if (tensRack) {
      tensRack.innerHTML = '';
      for (let t = 0; t < displayTens; t++) {
        const rod = document.createElement('div');
        rod.className = 'mat-rod';
        rod.title = 'Ten Rod (10)';
        for (let b = 0; b < 10; b++) {
          const blk = document.createElement('div');
          blk.className = 'mat-rod-block';
          rod.appendChild(blk);
        }
        tensRack.appendChild(rod);
      }
    }

    // Render Ones Cubes
    if (onesRack) {
      onesRack.innerHTML = '';
      if (!isRegrouped) {
        // Original ones (blue)
        for (let i = 0; i < ones1; i++) {
          const cube = document.createElement('div');
          cube.className = 'mat-cube';
          cube.textContent = '1';
          onesRack.appendChild(cube);
        }
        // Added ones (yellow)
        for (let i = 0; i < n2; i++) {
          const cube = document.createElement('div');
          cube.className = 'mat-cube added';
          cube.textContent = '+1';
          onesRack.appendChild(cube);
        }
      } else {
        // Regrouped ones remaining
        for (let i = 0; i < displayOnes; i++) {
          const cube = document.createElement('div');
          cube.className = 'mat-cube';
          cube.textContent = '1';
          onesRack.appendChild(cube);
        }
      }
    }

    // Regroup Banner UI
    if (banner) {
      if (needsRegroup && !isRegrouped) {
        banner.style.display = 'flex';
        banner.innerHTML = `
          <div class="regroup-info">
            ✨ <strong>Look!</strong> You have <strong>${totalOnes} Ones</strong>! 10 loose ones can snap together into 1 new Ten Rod!
          </div>
          <button class="regroup-btn" onclick="doRegroup()">
            ⚡ Snap 10 Ones into 1 Ten!
          </button>
        `;
      } else if (isRegrouped) {
        banner.style.display = 'flex';
        banner.innerHTML = `
          <div class="regroup-info" style="color:#047857;">
            🎉 <strong>Regrouped!</strong> 10 ones became 1 extra Ten Rod. Now you have <strong>${displayTens} Tens</strong> and <strong>${displayOnes} Ones = ${sum}</strong>!
          </div>
        `;
      } else {
        banner.style.display = 'none';
      }
    }
  }

  window.doRegroup = function () {
    state.single.regrouped = true;
    if (window.sound) window.sound.playCorrect();
    if (window.AppUtils) window.AppUtils.confetti({ particleCount: 45 });
    renderSingleMat();
  };

  window.setSingleProblem = function (n1, n2) {
    state.single.num1 = n1;
    state.single.num2 = n2;
    state.single.regrouped = false;
    if (window.sound) window.sound.playPop();
    renderSingleMat();
  };

  window.randomizeSingleProblem = function () {
    const tens = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const ones = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const n1 = tens * 10 + ones;
    const n2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    window.setSingleProblem(n1, n2);
  };

  /* ================= MODULE 2: ADDING WHOLE TENS ================= */
  function renderTensFocus() {
    const num = state.tens.num;
    const addTens = state.tens.addTens;
    const sum = num + addTens;

    const t1 = Math.floor(num / 10);
    const o1 = num % 10;
    const t2 = Math.floor(addTens / 10);
    const sumTens = t1 + t2;

    const mainEq = document.getElementById('tensMainEq');
    const tensRow = document.getElementById('tensRowVisual');
    const onesRow = document.getElementById('onesRowVisual');
    const tipEl = document.getElementById('tensInsightTip');

    if (mainEq) {
      mainEq.innerHTML = `
        <span class="digit-tens">${t1}</span><span class="digit-ones">${o1}</span>
        + 
        <span class="digit-tens">${t2}0</span>
        = 
        <span class="digit-tens">${sumTens}</span><span class="digit-ones">${o1}</span>
      `;
    }

    if (tensRow) {
      tensRow.innerHTML = `
        <span><strong style="color:#D97706;">Tens:</strong> ${t1} tens (${t1 * 10}) + ${t2} tens (${t2 * 10}) = <strong>${sumTens} tens (${sumTens * 10})</strong></span>
      `;
    }

    if (onesRow) {
      onesRow.innerHTML = `
        <span><strong style="color:#0284C7;">Ones:</strong> ${o1} ones + 0 ones = <strong>${o1} ones (Unchanged!)</strong></span>
      `;
    }

    if (tipEl) {
      tipEl.innerHTML = `
        💡 <strong>Golden Rule:</strong> When adding tens, only the <strong>TENS digit</strong> increases from <strong>${t1}</strong> to <strong>${sumTens}</strong>. The ones digit stays <strong>${o1}</strong>!
      `;
    }
  }

  window.setTensProblem = function (num, addTens) {
    state.tens.num = num;
    state.tens.addTens = addTens;
    if (window.sound) window.sound.playPop();
    renderTensFocus();
  };

  window.randomizeTensProblem = function () {
    const tens1 = Math.floor(Math.random() * 5) + 1;
    const ones1 = Math.floor(Math.random() * 9) + 1;
    const tens2 = Math.floor(Math.random() * 4) + 1;
    window.setTensProblem(tens1 * 10 + ones1, tens2 * 10);
  };

  /* ================= MODULE 3: SPLIT STRATEGY ================= */
  function renderSplitStrategy() {
    const a = state.split.a;
    const b = state.split.b;
    const sum = a + b;

    const tensA = Math.floor(a / 10) * 10;
    const onesA = a % 10;
    const tensB = Math.floor(b / 10) * 10;
    const onesB = b % 10;

    const sumTens = tensA + tensB;
    const sumOnes = onesA + onesB;

    const mainEq = document.getElementById('splitMainEq');
    const step1Math = document.getElementById('step1Math');
    const step2Math = document.getElementById('step2Math');
    const step3Math = document.getElementById('step3Math');
    const step4Math = document.getElementById('step4Math');

    if (mainEq) mainEq.textContent = `${a} + ${b} = ${sum}`;
    if (step1Math) step1Math.innerHTML = `Split <strong>${a}</strong> ➔ (${tensA} + ${onesA}) &nbsp;•&nbsp; Split <strong>${b}</strong> ➔ (${tensB} + ${onesB})`;
    if (step2Math) step2Math.innerHTML = `Add Tens: <strong>${tensA} + ${tensB} = ${sumTens}</strong>`;
    if (step3Math) step3Math.innerHTML = `Add Ones: <strong>${onesA} + ${onesB} = ${sumOnes}</strong>`;
    if (step4Math) step4Math.innerHTML = `Combine: <strong>${sumTens} + ${sumOnes} = ${sum}</strong> 🎉`;
  }

  window.setSplitProblem = function (a, b) {
    state.split.a = a;
    state.split.b = b;
    if (window.sound) window.sound.playPop();
    renderSplitStrategy();
  };

  window.randomizeSplitProblem = function () {
    const a = (Math.floor(Math.random() * 4) + 1) * 10 + (Math.floor(Math.random() * 5) + 1);
    const b = (Math.floor(Math.random() * 4) + 1) * 10 + (Math.floor(Math.random() * 4) + 1);
    window.setSplitProblem(a, b);
  };

  /* ================= MODULE 4: MASTERY QUIZ ================= */
  const QUIZ_LEVEL_PRESETS = {
    1: [
      { q: "Add a 1-digit number:", visual: "43 + 5 = [ ? ]", correct: 48, options: [46, 47, 48, 50], exp: "Add ones: 3 + 5 = 8. So 43 + 5 = 48." },
      { q: "Add a 1-digit number:", visual: "62 + 4 = [ ? ]", correct: 66, options: [64, 66, 68, 70], exp: "2 + 4 = 6, so 62 + 4 = 66." },
      { q: "Add a 1-digit number:", visual: "31 + 7 = [ ? ]", correct: 38, options: [37, 38, 39, 41], exp: "1 + 7 = 8, so 31 + 7 = 38." },
      { q: "Add a 1-digit number:", visual: "85 + 3 = [ ? ]", correct: 88, options: [87, 88, 89, 90], exp: "5 + 3 = 8, so 85 + 3 = 88." },
      { q: "Add a 1-digit number:", visual: "54 + 5 = [ ? ]", correct: 59, options: [57, 58, 59, 60], exp: "4 + 5 = 9, so 54 + 5 = 59." }
    ],
    2: [
      { q: "Add whole tens:", visual: "38 + 20 = [ ? ]", correct: 58, options: [48, 58, 68, 50], exp: "3 tens + 2 tens = 5 tens. Ones stay 8! Total = 58." },
      { q: "Add whole tens:", visual: "54 + 30 = [ ? ]", correct: 84, options: [74, 84, 94, 80], exp: "5 tens + 3 tens = 8 tens. Ones stay 4! Total = 84." },
      { q: "Add whole tens:", visual: "27 + 40 = [ ? ]", correct: 67, options: [57, 67, 77, 87], exp: "2 tens + 4 tens = 6 tens. Total = 67." },
      { q: "Add whole tens:", visual: "71 + 20 = [ ? ]", correct: 91, options: [81, 91, 92, 100], exp: "7 tens + 2 tens = 9 tens. Total = 91." },
      { q: "What is 46 + 10?", visual: "46 + 10 = [ ? ]", correct: 56, options: [47, 50, 56, 60], exp: "Add 1 ten: 46 + 10 = 56." }
    ],
    3: [
      { q: "Regrouping alert! 7 + 6 = 13:", visual: "27 + 6 = [ ? ]", correct: 33, options: [31, 32, 33, 34], exp: "7 + 6 = 13 (1 ten, 3 ones). 20 + 13 = 33!" },
      { q: "Regrouping alert! 8 + 5 = 13:", visual: "48 + 5 = [ ? ]", correct: 53, options: [51, 52, 53, 54], exp: "48 + 2 = 50, plus 3 = 53!" },
      { q: "Regrouping alert! 9 + 4 = 13:", visual: "39 + 4 = [ ? ]", correct: 43, options: [41, 42, 43, 45], exp: "39 + 1 = 40, plus 3 = 43!" },
      { q: "Regrouping alert! 6 + 7 = 13:", visual: "56 + 7 = [ ? ]", correct: 63, options: [61, 62, 63, 65], exp: "56 + 4 = 60, plus 3 = 63!" },
      { q: "Regrouping alert! 5 + 8 = 13:", visual: "65 + 8 = [ ? ]", correct: 73, options: [71, 72, 73, 75], exp: "65 + 5 = 70, plus 3 = 73!" }
    ],
    4: [
      { q: "Split Strategy Master:", visual: "35 + 24 = [ ? ]", correct: 59, options: [57, 58, 59, 60], exp: "30 + 20 = 50, and 5 + 4 = 9. Total = 59!" },
      { q: "Split Strategy Master:", visual: "42 + 36 = [ ? ]", correct: 78, options: [76, 77, 78, 80], exp: "40 + 30 = 70, and 2 + 6 = 8. Total = 78!" },
      { q: "Split Strategy Master:", visual: "51 + 27 = [ ? ]", correct: 78, options: [76, 78, 80, 88], exp: "50 + 20 = 70, and 1 + 7 = 8. Total = 78!" },
      { q: "Split Strategy Master:", visual: "63 + 25 = [ ? ]", correct: 88, options: [86, 87, 88, 89], exp: "60 + 20 = 80, and 3 + 5 = 8. Total = 88!" },
      { q: "Split Strategy Master:", visual: "24 + 35 = [ ? ]", correct: 59, options: [57, 58, 59, 61], exp: "20 + 30 = 50, and 4 + 5 = 9. Total = 59!" }
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

    // Highlight options & lock buttons
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
        feedbackEl.innerHTML = `🌟 Fantastic! ${q.exp}`;
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

    // Reveal Next Button instead of setTimeout
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
    renderSingleMat();
    renderTensFocus();
    renderSplitStrategy();
    startQuiz(1);
  });

})();
