/**
 * Lines of Symmetry Studio - Activity 5: Symmetry Challenge Quizzes
 * Grade 2 curriculum aligned mastery quizzes with immediate explanatory feedback.
 */

let currentSymmLevel = null;
let symmQuizIndex = 0;
let symmQuizScore = 0;
let symmQuizAnswered = false;

function startSymmQuiz() {
  renderSymmQuizLevelSelect();
}

function renderSymmQuizLevelSelect() {
  const levelSelectCard = document.getElementById('symmQuizLevelSelect');
  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  const grid = document.getElementById('symmQuizLevelsGrid');

  if (levelSelectCard) levelSelectCard.classList.remove('hidden');
  if (quizCard) quizCard.classList.add('hidden');
  if (endCard) endCard.classList.add('hidden');

  if (!grid || !window.SYMM_QUIZ_LEVELS) return;
  grid.innerHTML = '';

  window.SYMM_QUIZ_LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'symm-level-card';
    card.onclick = () => selectSymmQuizLevel(level.id);
    card.innerHTML = `
      <div class="level-card-top">
        <span class="level-card-icon">${level.icon}</span>
        <span class="level-badge-pill">5 Questions</span>
      </div>
      <h3 class="level-card-title">${level.title}</h3>
      <p class="level-card-desc">${level.desc}</p>
      <div class="level-card-footer">Start Quiz ➔</div>
    `;
    grid.appendChild(card);
  });
}

function selectSymmQuizLevel(levelId) {
  if (!window.SYMM_QUIZ_LEVELS) return;
  const level = window.SYMM_QUIZ_LEVELS.find(l => l.id === levelId);
  if (!level) return;
  if (window.sound) window.sound.playPop();
  currentSymmLevel = level;
  symmQuizIndex = 0;
  symmQuizScore = 0;
  symmQuizAnswered = false;

  const levelSelectCard = document.getElementById('symmQuizLevelSelect');
  const quizCard = document.getElementById('symmQuizCard');
  const levelNameEl = document.getElementById('symmQuizLevelName');

  if (levelSelectCard) levelSelectCard.classList.add('hidden');
  if (quizCard) quizCard.classList.remove('hidden');
  if (levelNameEl) levelNameEl.textContent = level.title;

  renderSymmQuizQuestion();
}

function returnToSymmQuizSelect() {
  if (window.sound) window.sound.playPop();
  renderSymmQuizLevelSelect();
}

function renderSymmQuizQuestion() {
  if (!currentSymmLevel) return;
  symmQuizAnswered = false;
  const q = currentSymmLevel.questions[symmQuizIndex];
  if (!q) return;

  const qNum = document.getElementById('symmQuestionNum');
  const scoreEl = document.getElementById('symmScore');
  const visualEl = document.getElementById('symmQuestionVisual');
  const textEl = document.getElementById('symmQuestionText');
  const optionsEl = document.getElementById('symmQuizOptions');
  const progressFill = document.getElementById('symmProgressFill');
  const feedbackEl = document.getElementById('symmFeedback');
  const nextBtn = document.getElementById('btnSymmNextQuestion');

  if (qNum) qNum.textContent = symmQuizIndex + 1;
  if (scoreEl) scoreEl.textContent = symmQuizScore;
  if (visualEl) visualEl.textContent = q.illustration;
  if (textEl) textEl.textContent = q.question;
  if (progressFill) {
    const pct = ((symmQuizIndex + 1) / currentSymmLevel.questions.length) * 100;
    progressFill.style.width = `${pct}%`;
  }
  if (feedbackEl) feedbackEl.classList.add('hidden');
  if (nextBtn) nextBtn.classList.add('hidden');

  if (optionsEl) {
    optionsEl.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.onclick = () => onSelectSymmOption(optIdx);
      optionsEl.appendChild(btn);
    });
  }
}

function onSelectSymmOption(selectedIdx) {
  if (symmQuizAnswered || !currentSymmLevel) return;
  symmQuizAnswered = true;

  const q = currentSymmLevel.questions[symmQuizIndex];
  const optionsEl = document.getElementById('symmQuizOptions');
  const buttons = optionsEl ? optionsEl.querySelectorAll('.quiz-opt-btn') : [];
  const feedbackEl = document.getElementById('symmFeedback');
  const nextBtn = document.getElementById('btnSymmNextQuestion');
  const scoreEl = document.getElementById('symmScore');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('wrong');
    }
  });

  if (feedbackEl) feedbackEl.classList.remove('hidden');

  if (selectedIdx === q.correct) {
    if (window.sound) window.sound.playChime();
    symmQuizScore += 20;
    if (scoreEl) scoreEl.textContent = symmQuizScore;

    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `🌟 <strong>Great Job!</strong> ${q.feedback}`;
    }

    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    }
  } else {
    if (window.sound) window.sound.playBuzz();
    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback wrong';
      feedbackEl.innerHTML = `💡 <strong>Keep Learning:</strong> ${q.feedback}`;
    }
  }

  if (nextBtn) {
    const isLast = symmQuizIndex === currentSymmLevel.questions.length - 1;
    nextBtn.textContent = isLast ? 'See Quiz Results 🏆' : 'Next Question ➡️';
    nextBtn.classList.remove('hidden');
  }
}

function onNextSymmQuestion() {
  if (window.sound) window.sound.playPop();
  if (!currentSymmLevel) return;
  symmQuizIndex++;

  if (symmQuizIndex < currentSymmLevel.questions.length) {
    renderSymmQuizQuestion();
  } else {
    showSymmQuizResults();
  }
}

function showSymmQuizResults() {
  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  const finalScore = document.getElementById('symmFinalScore');
  const finalStars = document.getElementById('symmFinalStars');
  const endTitle = document.getElementById('symmEndTitle');
  const endMsg = document.getElementById('symmEndMessage');

  if (quizCard) quizCard.classList.add('hidden');
  if (endCard) endCard.classList.remove('hidden');

  if (finalScore) finalScore.textContent = symmQuizScore;

  if (symmQuizScore >= 80) {
    if (window.sound) window.sound.playFanfare();
    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }
    if (finalStars) finalStars.textContent = '⭐⭐⭐⭐⭐';
    if (endTitle && currentSymmLevel) endTitle.textContent = `🏆 ${currentSymmLevel.title} Master!`;
    if (endMsg) endMsg.textContent = `Incredible job! You scored ${symmQuizScore}/100 and demonstrated master understanding of symmetry!`;
  } else if (symmQuizScore >= 60) {
    if (window.sound) window.sound.playChime();
    if (finalStars) finalStars.textContent = '⭐⭐⭐';
    if (endTitle) endTitle.textContent = '🎉 Great Detective Work!';
    if (endMsg) endMsg.textContent = `You scored ${symmQuizScore}/100! Review the activities to reach a perfect score!`;
  } else {
    if (window.sound) window.sound.playPop();
    if (finalStars) finalStars.textContent = '⭐⭐';
    if (endTitle) endTitle.textContent = 'Keep Practicing!';
    if (endMsg) endMsg.textContent = `You scored ${symmQuizScore}/100. Try again to boost your score!`;
  }

  if (endCard) {
    endCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function retrySymmQuiz() {
  if (window.sound) window.sound.playPop();
  symmQuizIndex = 0;
  symmQuizScore = 0;
  symmQuizAnswered = false;

  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  if (quizCard) quizCard.classList.remove('hidden');
  if (endCard) endCard.classList.add('hidden');

  renderSymmQuizQuestion();
}

// Global window attachments
window.startSymmQuiz = startSymmQuiz;
window.renderSymmQuizLevelSelect = renderSymmQuizLevelSelect;
window.selectSymmQuizLevel = selectSymmQuizLevel;
window.returnToSymmQuizSelect = returnToSymmQuizSelect;
window.renderSymmQuizQuestion = renderSymmQuizQuestion;
window.onSelectSymmOption = onSelectSymmOption;
window.onNextSymmQuestion = onNextSymmQuestion;
window.showSymmQuizResults = showSymmQuizResults;
window.retrySymmQuiz = retrySymmQuiz;
