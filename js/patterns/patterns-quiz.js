/**
 * Patterns Studio - Activity 4: Pattern Mastery Quizzes
 * 4 Graded Curriculum Levels covering 2D & 3D patterns, repeating units, orientation, and tessellations.
 */

(function () {
  'use strict';

  let currentLevelData = null;
  let currentQuestionIndex = 0;
  let currentScore = 0;
  let hasAnsweredCurrent = false;

  function initPatternsQuiz() {
    showQuizLevelSelect();
  }

  function showQuizLevelSelect() {
    const selectView = document.getElementById('patQuizSelectScreen');
    const activeView = document.getElementById('patQuizActiveScreen');
    const endView = document.getElementById('patQuizEndScreen');

    if (selectView) selectView.classList.remove('hidden');
    if (activeView) activeView.classList.add('hidden');
    if (endView) endView.classList.add('hidden');
  }

  function startPatternsQuizLevel(levelId) {
    currentLevelData = window.PATTERNS_QUIZ_LEVELS.find(lvl => lvl.levelId === levelId);
    if (!currentLevelData) return;

    currentQuestionIndex = 0;
    currentScore = 0;

    const selectView = document.getElementById('patQuizSelectScreen');
    const activeView = document.getElementById('patQuizActiveScreen');
    const endView = document.getElementById('patQuizEndScreen');

    if (selectView) selectView.classList.add('hidden');
    if (activeView) activeView.classList.remove('hidden');
    if (endView) endView.classList.add('hidden');

    const titleEl = document.getElementById('patQuizTitle');
    if (titleEl) titleEl.textContent = currentLevelData.title;

    renderCurrentQuizQuestion();
  }

  function renderCurrentQuizQuestion() {
    if (!currentLevelData) return;
    hasAnsweredCurrent = false;

    const qData = currentLevelData.questions[currentQuestionIndex];
    if (!qData) {
      finishPatternsQuiz();
      return;
    }

    // Update Counter & Score
    const counterEl = document.getElementById('patQuizCounter');
    const scoreEl = document.getElementById('patQuizScore');
    const progressFill = document.getElementById('patQuizProgressFill');

    if (counterEl) counterEl.textContent = `Question ${currentQuestionIndex + 1} / ${currentLevelData.questions.length}`;
    if (scoreEl) scoreEl.textContent = currentScore;
    if (progressFill) {
      const pct = ((currentQuestionIndex + 1) / currentLevelData.questions.length) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // Render Question Text
    const qTextEl = document.getElementById('patQuestionText');
    if (qTextEl) qTextEl.textContent = qData.q;

    // Render Visual Track
    const visualEl = document.getElementById('patQuestionVisual');
    if (visualEl) {
      if (qData.visual && qData.visual.length > 0) {
        let vHtml = '<div class="quiz-visual-track">';
        qData.visual.forEach(vKey => {
          if (vKey === 'blank') {
            vHtml += '<div class="quiz-track-slot blank-slot"><span>?</span></div>';
          } else if (vKey === 'trophy') {
            vHtml += '<div class="quiz-track-slot trophy-slot"><span>🏆</span></div>';
          } else {
            vHtml += `<div class="quiz-track-slot">${window.renderPatternSvg(vKey, 44)}</div>`;
          }
        });
        vHtml += '</div>';
        visualEl.innerHTML = vHtml;
        visualEl.classList.remove('hidden');
      } else {
        visualEl.classList.add('hidden');
      }
    }

    // Render Options
    const optionsGrid = document.getElementById('patQuizOptions');
    if (optionsGrid) {
      let optHtml = '';
      qData.options.forEach((opt, idx) => {
        const svgPreview = opt.key ? window.renderPatternSvg(opt.key, 40) : '';
        optHtml += `
          <button class="quiz-option-card" onclick="selectQuizAnswer(${idx})">
            ${svgPreview ? `<div class="opt-svg-wrap">${svgPreview}</div>` : ''}
            <span class="opt-txt">${opt.text}</span>
          </button>
        `;
      });
      optionsGrid.innerHTML = optHtml;
    }

    // Reset feedback and next button
    const feedbackEl = document.getElementById('patQuizFeedback');
    const nextBtn = document.getElementById('patBtnNext');
    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback hidden';
      feedbackEl.innerHTML = '';
    }
    if (nextBtn) nextBtn.classList.add('hidden');
  }

  function selectQuizAnswer(optIndex) {
    if (hasAnsweredCurrent || !currentLevelData) return;
    hasAnsweredCurrent = true;

    const qData = currentLevelData.questions[currentQuestionIndex];
    const selectedOpt = qData.options[optIndex];
    const isCorrect = selectedOpt.isCorrect;

    const optionButtons = document.querySelectorAll('#patQuizOptions .quiz-option-card');
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (qData.options[idx].isCorrect) {
        btn.classList.add('correct');
      } else if (idx === optIndex && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const feedbackEl = document.getElementById('patQuizFeedback');
    const nextBtn = document.getElementById('patBtnNext');

    if (isCorrect) {
      currentScore += 20;
      const scoreEl = document.getElementById('patQuizScore');
      if (scoreEl) scoreEl.textContent = currentScore;

      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();

      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback correct';
        feedbackEl.innerHTML = `
          <div class="feedback-icon">🎉 ✨</div>
          <div class="feedback-text">
            <strong>Excellent!</strong>
            <p>${qData.tip}</p>
          </div>
        `;
        feedbackEl.classList.remove('hidden');
      }
    } else {
      if (window.sound && window.sound.playBuzz) window.sound.playBuzz();

      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback wrong';
        feedbackEl.innerHTML = `
          <div class="feedback-icon">💡</div>
          <div class="feedback-text">
            <strong>Good try!</strong>
            <p>${qData.tip}</p>
          </div>
        `;
        feedbackEl.classList.remove('hidden');
      }
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = currentQuestionIndex === currentLevelData.questions.length - 1 ? 'See Results 🏆' : 'Next Question ➔';
    }
  }

  function onNextQuizQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentLevelData.questions.length) {
      renderCurrentQuizQuestion();
    } else {
      finishPatternsQuiz();
    }
  }

  function finishPatternsQuiz() {
    const activeView = document.getElementById('patQuizActiveScreen');
    const endView = document.getElementById('patQuizEndScreen');

    if (activeView) activeView.classList.add('hidden');
    if (endView) endView.classList.remove('hidden');

    const finalScoreVal = document.getElementById('patFinalScoreVal');
    const finalStars = document.getElementById('patFinalStars');
    const endTitle = document.getElementById('patQuizEndTitle');
    const endMsg = document.getElementById('patQuizEndMessage');

    if (finalScoreVal) finalScoreVal.textContent = currentScore;

    let stars = '⭐⭐⭐⭐⭐';
    if (currentScore <= 40) stars = '⭐⭐';
    else if (currentScore <= 60) stars = '⭐⭐⭐';
    else if (currentScore <= 80) stars = '⭐⭐⭐⭐';

    if (finalStars) finalStars.textContent = stars;

    if (currentScore >= 80) {
      if (endTitle) endTitle.textContent = 'Outstanding Pattern Master! 🏆';
      if (endMsg) endMsg.textContent = 'You cracked the repeating rules and completed every pattern!';
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }
      if (window.sound && window.sound.playFanfare) window.sound.playFanfare();
    } else {
      if (endTitle) endTitle.textContent = 'Great Effort! 🌟';
      if (endMsg) endMsg.textContent = 'Practice makes pattern detective skills sharper!';
      if (window.sound && window.sound.playChime) window.sound.playChime();
    }
  }

  function retryCurrentQuiz() {
    if (currentLevelData) {
      startPatternsQuizLevel(currentLevelData.levelId);
    }
  }

  function returnToQuizSelect() {
    showQuizLevelSelect();
  }

  // Window exports
  window.initPatternsQuiz = initPatternsQuiz;
  window.startPatternsQuizLevel = startPatternsQuizLevel;
  window.selectQuizAnswer = selectQuizAnswer;
  window.onNextQuizQuestion = onNextQuizQuestion;
  window.retryCurrentQuiz = retryCurrentQuiz;
  window.returnToQuizSelect = returnToQuizSelect;

})();
