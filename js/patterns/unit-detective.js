/**
 * Patterns Studio - Activity 1: Ring the Repeating Group
 * "Draw a ring around the group of shapes/solids that repeats!"
 * Directly interactive: Kids adjust and test the repeating ring on the sequence.
 */

(function () {
  'use strict';

  let currentChallengeIndex = 0;
  let selectedUnitLength = 3;
  let isVerified = false;

  function getChallenges() {
    return window.RING_REPEAT_CHALLENGES || [];
  }

  function initUnitDetective() {
    renderUnitDetectiveChallenge(0);
  }

  function renderUnitDetectiveChallenge(index) {
    const challenges = getChallenges();
    currentChallengeIndex = index;
    const challenge = challenges[index];
    if (!challenge) return;

    isVerified = false;
    selectedUnitLength = Math.max(2, Math.min(challenge.unitLength - 1, 3));

    const titleEl = document.getElementById('udTitle');
    const sourceEl = document.getElementById('udSource');
    const tipEl = document.getElementById('udTip');
    const trackEl = document.getElementById('udTrack');
    const feedbackEl = document.getElementById('udFeedback');
    const nextBtn = document.getElementById('udBtnNext');
    const testBtn = document.getElementById('udBtnTest');

    if (titleEl) titleEl.textContent = challenge.title;
    if (sourceEl) sourceEl.textContent = challenge.source || 'Worksheet: Draw a Ring';
    if (tipEl) tipEl.innerHTML = `💡 <strong>Detective Clue:</strong> ${challenge.tip}`;
    if (feedbackEl) {
      feedbackEl.className = 'pattern-feedback hidden';
      feedbackEl.innerHTML = '';
    }
    if (nextBtn) nextBtn.classList.add('hidden');
    if (testBtn) {
      testBtn.disabled = false;
      testBtn.textContent = 'Test Repeating Ring 🔍';
    }

    updateTrackDisplay();
    updateRingControlDisplay();
  }

  function updateTrackDisplay() {
    const challenges = getChallenges();
    const challenge = challenges[currentChallengeIndex];
    const trackEl = document.getElementById('udTrack');
    if (!challenge || !trackEl) return;

    let html = '';
    challenge.items.forEach((itemKey, idx) => {
      const isInsideFirstRing = idx < selectedUnitLength;
      const ringClass = isInsideFirstRing ? 'in-ring' : '';
      const svg = window.renderPatternSvg(itemKey, 48);

      html += `
        <div class="pattern-item-slot ${ringClass}" data-index="${idx}" onclick="selectUnitLength(${idx + 1})">
          <div class="item-visual">${svg}</div>
          <span class="item-pos-label">${idx + 1}</span>
        </div>
      `;
    });

    trackEl.innerHTML = html;
  }

  function updateRingControlDisplay() {
    const lenDisplay = document.getElementById('udLengthVal');
    if (lenDisplay) lenDisplay.textContent = selectedUnitLength;
  }

  function adjustUnitLength(delta) {
    const challenges = getChallenges();
    const challenge = challenges[currentChallengeIndex];
    if (!challenge) return;

    const newLen = selectedUnitLength + delta;
    if (newLen >= 2 && newLen <= 6) {
      selectedUnitLength = newLen;
      if (window.sound && window.sound.playPop) window.sound.playPop();
      updateTrackDisplay();
      updateRingControlDisplay();
    }
  }

  function selectUnitLength(len) {
    if (len >= 2 && len <= 6) {
      selectedUnitLength = len;
      if (window.sound && window.sound.playPop) window.sound.playPop();
      updateTrackDisplay();
      updateRingControlDisplay();
    }
  }

  function testRepeatingRing() {
    const challenges = getChallenges();
    const challenge = challenges[currentChallengeIndex];
    const feedbackEl = document.getElementById('udFeedback');
    const nextBtn = document.getElementById('udBtnNext');
    if (!challenge || !feedbackEl) return;

    feedbackEl.classList.remove('hidden');

    if (selectedUnitLength === challenge.unitLength) {
      isVerified = true;
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }

      feedbackEl.className = 'pattern-feedback success';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🎉 ⭐</div>
        <div class="feedback-text">
          <strong>Brilliant! You Found the Repeating Group!</strong>
          <p>${challenge.description}</p>
        </div>
      `;

      const trackEl = document.getElementById('udTrack');
      if (trackEl) {
        const slots = trackEl.querySelectorAll('.pattern-item-slot');
        slots.forEach((slot, idx) => {
          const groupIdx = Math.floor(idx / challenge.unitLength);
          slot.classList.add('verified-group', `group-${groupIdx % 3}`);
        });
      }

      if (nextBtn) nextBtn.classList.remove('hidden');
    } else {
      if (window.sound && window.sound.playBuzz) window.sound.playBuzz();
      feedbackEl.className = 'pattern-feedback warning';

      if (selectedUnitLength < challenge.unitLength) {
        feedbackEl.innerHTML = `
          <div class="feedback-icon">🔍</div>
          <div class="feedback-text">
            <strong>Too Short!</strong>
            <p>Your ring only holds ${selectedUnitLength} items. The repeating block hasn't completed yet. Try expanding the ring!</p>
          </div>
        `;
      } else {
        feedbackEl.innerHTML = `
          <div class="feedback-icon">🔍</div>
          <div class="feedback-text">
            <strong>Too Long!</strong>
            <p>The pattern already started repeating earlier inside your ring! Try shortening the ring.</p>
          </div>
        `;
      }
    }
  }

  function nextUnitChallenge() {
    const challenges = getChallenges();
    const nextIdx = (currentChallengeIndex + 1) % challenges.length;
    renderUnitDetectiveChallenge(nextIdx);
  }

  // Export to window
  window.initUnitDetective = initUnitDetective;
  window.renderUnitDetectiveChallenge = renderUnitDetectiveChallenge;
  window.adjustUnitLength = adjustUnitLength;
  window.selectUnitLength = selectUnitLength;
  window.testRepeatingRing = testRepeatingRing;
  window.nextUnitChallenge = nextUnitChallenge;

})();
