/**
 * Patterns Studio - Missing Shapes & Solids Engine
 * Supports:
 * - Activity 2: Missing 2D Shapes (Spaces A & B)
 * - Activity 3: Missing 3D Solids (Solids A & B)
 */

(function () {
  'use strict';

  // Mode: 'shapes' or 'solids'
  let currentActiveMode = 'shapes';
  let shapesChallengeIdx = 0;
  let solidsChallengeIdx = 0;

  let filledA = null;
  let filledB = null;
  let selectedTargetSlot = 'A';

  function initMissingShapes() {
    currentActiveMode = 'shapes';
    renderChallenge(shapesChallengeIdx);
  }

  function initMissingSolids() {
    currentActiveMode = 'solids';
    renderChallenge(solidsChallengeIdx);
  }

  function getCurrentChallenge() {
    if (currentActiveMode === 'shapes') {
      return (window.MISSING_SHAPES_CHALLENGES || [])[shapesChallengeIdx];
    } else {
      return (window.MISSING_SOLIDS_CHALLENGES || [])[solidsChallengeIdx];
    }
  }

  function renderChallenge(index) {
    if (currentActiveMode === 'shapes') {
      shapesChallengeIdx = index;
    } else {
      solidsChallengeIdx = index;
    }

    const challenge = getCurrentChallenge();
    if (!challenge) return;

    filledA = null;
    filledB = null;
    selectedTargetSlot = 'A';

    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';

    const titleEl = document.getElementById(`${prefix}Title`);
    const sourceEl = document.getElementById(`${prefix}Source`);
    const promptEl = document.getElementById(`${prefix}Prompt`);
    const feedbackEl = document.getElementById(`${prefix}Feedback`);
    const nextBtn = document.getElementById(`${prefix}BtnNext`);
    const checkBtn = document.getElementById(`${prefix}BtnCheck`);

    if (titleEl) titleEl.textContent = challenge.title;
    if (sourceEl) sourceEl.textContent = challenge.source;
    if (promptEl) promptEl.textContent = challenge.prompt;

    if (feedbackEl) {
      feedbackEl.className = 'pattern-feedback hidden';
      feedbackEl.innerHTML = '';
    }
    if (nextBtn) nextBtn.classList.add('hidden');
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.textContent = 'Check Pattern 🚀';
    }

    renderSequenceTrack();
    renderOptionsTray();
  }

  function renderSequenceTrack() {
    const challenge = getCurrentChallenge();
    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';
    const trackEl = document.getElementById(`${prefix}Track`);
    if (!challenge || !trackEl) return;

    let html = '';
    challenge.sequence.forEach((item, idx) => {
      if (item.blank) {
        const slotName = item.blank; // 'A' or 'B'
        const currentFill = slotName === 'A' ? filledA : filledB;
        const isTarget = selectedTargetSlot === slotName;
        const activeClass = isTarget ? 'active-target' : '';
        const filledContent = currentFill
          ? window.renderPatternSvg(currentFill, 48)
          : `<span class="blank-letter-tag">${slotName}</span>`;

        html += `
          <div class="pattern-item-slot blank-slot ${activeClass}" 
               id="${prefix}_slot_${slotName}" 
               onclick="selectTargetSlot('${slotName}')">
            <div class="blank-drop-target">
              ${filledContent}
            </div>
            <span class="slot-badge">${currentActiveMode === 'solids' ? 'Solid' : 'Space'} ${slotName}</span>
          </div>
        `;
      } else {
        const svg = window.renderPatternSvg(item.key, 48);
        html += `
          <div class="pattern-item-slot fixed-slot">
            <div class="item-visual">${svg}</div>
            <span class="item-pos-label">${idx + 1}</span>
          </div>
        `;
      }
    });

    trackEl.innerHTML = html;
  }

  function renderOptionsTray() {
    const challenge = getCurrentChallenge();
    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';
    const optionsEl = document.getElementById(`${prefix}Options`);
    if (!challenge || !optionsEl) return;

    let html = '';
    challenge.options.forEach((opt) => {
      const svg = window.renderPatternSvg(opt.key, 52);
      html += `
        <button class="pattern-option-card" onclick="placeOptionInSlot('${opt.key}')" title="Choose ${opt.label}">
          <div class="opt-svg">${svg}</div>
          <span class="opt-label">${opt.label}</span>
        </button>
      `;
    });

    optionsEl.innerHTML = html;
  }

  function selectTargetSlot(slotName) {
    selectedTargetSlot = slotName;
    if (window.sound && window.sound.playPop) window.sound.playPop();
    renderSequenceTrack();
  }

  function placeOptionInSlot(itemKey) {
    if (selectedTargetSlot === 'A') {
      filledA = itemKey;
      if (!filledB) selectedTargetSlot = 'B';
    } else {
      filledB = itemKey;
      if (!filledA) selectedTargetSlot = 'A';
    }

    if (window.sound && window.sound.playPop) window.sound.playPop();
    renderSequenceTrack();

    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';
    const checkBtn = document.getElementById(`${prefix}BtnCheck`);
    if (checkBtn) {
      checkBtn.disabled = !(filledA && filledB);
    }
  }

  function clearSlots() {
    filledA = null;
    filledB = null;
    selectedTargetSlot = 'A';
    if (window.sound && window.sound.playPop) window.sound.playPop();
    renderSequenceTrack();

    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';
    const checkBtn = document.getElementById(`${prefix}BtnCheck`);
    const feedbackEl = document.getElementById(`${prefix}Feedback`);
    if (checkBtn) checkBtn.disabled = true;
    if (feedbackEl) feedbackEl.classList.add('hidden');
  }

  function checkPattern() {
    const challenge = getCurrentChallenge();
    const prefix = currentActiveMode === 'shapes' ? 'ms' : 'sol';
    const feedbackEl = document.getElementById(`${prefix}Feedback`);
    const nextBtn = document.getElementById(`${prefix}BtnNext`);
    if (!challenge || !feedbackEl) return;

    feedbackEl.classList.remove('hidden');

    const isACorrect = filledA === challenge.correctA;
    const isBCorrect = filledB === challenge.correctB;

    if (isACorrect && isBCorrect) {
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      }

      feedbackEl.className = 'pattern-feedback success';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🎉 🏆</div>
        <div class="feedback-text">
          <strong>Perfect Match! You Solved A and B!</strong>
          <p>${challenge.explanation}</p>
        </div>
      `;

      if (nextBtn) nextBtn.classList.remove('hidden');
    } else {
      if (window.sound && window.sound.playBuzz) window.sound.playBuzz();
      feedbackEl.className = 'pattern-feedback warning';

      if (isACorrect && !isBCorrect) {
        feedbackEl.innerHTML = `
          <div class="feedback-icon">💡</div>
          <div class="feedback-text">
            <strong>Blank A is correct!</strong>
            <p>Blank B is not quite right. Look at what should follow Blank A in the repeating group!</p>
          </div>
        `;
        selectedTargetSlot = 'B';
      } else if (!isACorrect && isBCorrect) {
        feedbackEl.innerHTML = `
          <div class="feedback-icon">💡</div>
          <div class="feedback-text">
            <strong>Blank B is correct!</strong>
            <p>Blank A is not quite right. Check what comes right before B in the repeating block!</p>
          </div>
        `;
        selectedTargetSlot = 'A';
      } else {
        feedbackEl.innerHTML = `
          <div class="feedback-icon">🔍</div>
          <div class="feedback-text">
            <strong>Look Closely at the Repeating Rule!</strong>
            <p>Neither A nor B match yet. Trace the repeating cycle from the beginning to find which shapes or solids belong here!</p>
          </div>
        `;
      }
      renderSequenceTrack();
    }
  }

  function nextChallenge() {
    const list = currentActiveMode === 'shapes' ? window.MISSING_SHAPES_CHALLENGES : window.MISSING_SOLIDS_CHALLENGES;
    const currentIdx = currentActiveMode === 'shapes' ? shapesChallengeIdx : solidsChallengeIdx;
    const nextIdx = (currentIdx + 1) % list.length;
    renderChallenge(nextIdx);
  }

  // Export to window
  window.initMissingShapes = initMissingShapes;
  window.initMissingSolids = initMissingSolids;
  window.selectTargetSlot = selectTargetSlot;
  window.placeOptionInSlot = placeOptionInSlot;
  window.clearSlots = clearSlots;
  window.checkPattern = checkPattern;
  window.nextChallenge = nextChallenge;

})();
