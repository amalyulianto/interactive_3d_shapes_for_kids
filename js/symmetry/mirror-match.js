/**
 * Lines of Symmetry Studio - Activity 4: Mirror Match
 * Speed recognition of authentic mirror reflections vs rotated/inverted trap cards.
 */

let matchRoundIndex = 0;
let matchScore = 0;
let matchStreak = 0;
let matchAnswered = false;

function initMirrorMatch() {
  matchRoundIndex = 0;
  matchScore = 0;
  matchStreak = 0;
  renderMirrorMatchRound();
}

function renderMirrorMatchRound() {
  if (!window.MIRROR_MATCH_ITEMS) return;
  matchAnswered = false;
  const item = window.MIRROR_MATCH_ITEMS[matchRoundIndex];
  if (!item) return;

  const roundEl = document.getElementById('matchRoundIndicator');
  const streakEl = document.getElementById('matchStreakBadge');
  const scoreEl = document.getElementById('matchScore');
  const nameEl = document.getElementById('matchItemName');
  const cardEl = document.getElementById('matchSourceCard');
  const hintEl = document.getElementById('matchItemHint');
  const choicesGrid = document.getElementById('matchChoicesGrid');
  const feedback = document.getElementById('matchFeedbackBanner');
  const nextBtn = document.getElementById('btnNextMatch');

  if (roundEl) roundEl.textContent = `Challenge ${matchRoundIndex + 1} of ${window.MIRROR_MATCH_ITEMS.length}`;
  if (streakEl) streakEl.textContent = `🔥 Streak: ${matchStreak}`;
  if (scoreEl) scoreEl.textContent = matchScore;
  if (nameEl) nameEl.textContent = item.name;
  if (cardEl) cardEl.innerHTML = item.svg;
  if (hintEl) hintEl.textContent = item.hint;
  if (feedback) feedback.classList.add('hidden');
  if (nextBtn) nextBtn.classList.add('hidden');

  if (choicesGrid) {
    choicesGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    item.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = 'match-choice-card';
      card.id = `choiceCard_${idx}`;
      card.onclick = () => handleMirrorChoiceClick(choice, card);

      card.innerHTML = `
        <div class="choice-letter-badge">${letters[idx]}</div>
        <div class="choice-svg-preview" style="transform: ${choice.transform}">
          ${item.svg}
        </div>
      `;

      choicesGrid.appendChild(card);
    });
  }
}

function handleMirrorChoiceClick(choice, clickedCard) {
  if (matchAnswered) return;
  if (!window.MIRROR_MATCH_ITEMS) return;
  const item = window.MIRROR_MATCH_ITEMS[matchRoundIndex];
  const feedback = document.getElementById('matchFeedbackBanner');
  const streakEl = document.getElementById('matchStreakBadge');
  const scoreEl = document.getElementById('matchScore');
  const nextBtn = document.getElementById('btnNextMatch');

  if (choice.isCorrect) {
    matchAnswered = true;
    if (window.sound) window.sound.playChime();
    clickedCard.classList.add('correct');
    matchStreak++;
    matchScore += 20 + Math.min(matchStreak * 5, 25);

    if (streakEl) streakEl.textContent = `🔥 Streak: ${matchStreak}`;
    if (scoreEl) scoreEl.textContent = matchScore;

    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.className = 'match-feedback-banner correct';
      feedback.innerHTML = `🎉 <strong>Correct Mirror Reflection!</strong> ${item.feedback}`;
    }

    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    }

    if (nextBtn) {
      const isLast = matchRoundIndex === window.MIRROR_MATCH_ITEMS.length - 1;
      nextBtn.textContent = isLast ? 'Play Again 🔄' : 'Next Challenge ➡️';
      nextBtn.classList.remove('hidden');
    }
  } else {
    if (window.sound) window.sound.playBuzz();
    clickedCard.classList.add('wrong');
    matchStreak = 0;
    if (streakEl) streakEl.textContent = `🔥 Streak: 0`;

    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.className = 'match-feedback-banner wrong';
      feedback.innerHTML = `❌ <strong>Not quite!</strong> ${choice.tip} Try another choice!`;
    }
  }
}

function nextMirrorMatchRound() {
  if (window.sound) window.sound.playPop();
  if (!window.MIRROR_MATCH_ITEMS) return;
  matchRoundIndex = (matchRoundIndex + 1) % window.MIRROR_MATCH_ITEMS.length;
  renderMirrorMatchRound();
}

// Global window attachments
window.initMirrorMatch = initMirrorMatch;
window.renderMirrorMatchRound = renderMirrorMatchRound;
window.handleMirrorChoiceClick = handleMirrorChoiceClick;
window.nextMirrorMatchRound = nextMirrorMatchRound;
