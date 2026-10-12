/**
 * Lines of Symmetry Studio - Activity 6: Colour Mirror Patterns
 * Based on Chapter 4: Shapes and Solids - Colour Mirror Patterns
 * Supports:
 * - 4x4 Grids with Vertical Symmetry Line (Sections 1a-c, 2a-c)
 * - 6x4 Grids with Horizontal Symmetry Line (Sections 1d-f)
 * - Section 3: Design Your Own (Free symmetrical pattern creator)
 */

(function () {
  'use strict';

  let currentSubmode = 'guided'; // 'guided' | 'free'
  let currentChallengeIdx = 0;
  let activeColor = '#EF4444'; // Red default
  let isEraser = false;
  let gridState = []; // 2D array [row][col] -> hex color string or null

  // Free design state
  let freeRows = 4;
  let freeCols = 4;
  let freeAxis = 'vertical'; // 'vertical' | 'horizontal'
  let freeAutoMirror = true;

  function initColorMirror() {
    initSwatches();
    initChallengeChips();
    if (currentSubmode === 'guided') {
      loadChallenge(currentChallengeIdx);
    } else {
      initFreeGrid();
    }
  }

  function initSwatches() {
    const swatchesContainer = document.getElementById('cmSwatches');
    if (!swatchesContainer || !window.COLOR_MIRROR_PALETTE) return;

    swatchesContainer.innerHTML = '';
    window.COLOR_MIRROR_PALETTE.forEach((item, idx) => {
      const dot = document.createElement('div');
      dot.className = `cm-color-swatch ${idx === 0 && !isEraser ? 'active' : ''}`;
      dot.style.background = item.color;
      dot.title = item.name;
      dot.onclick = () => selectColor(item.color, dot);
      swatchesContainer.appendChild(dot);
    });

    // Add Eraser swatch
    const eraser = document.createElement('div');
    eraser.className = `cm-color-swatch eraser-swatch ${isEraser ? 'active' : ''}`;
    eraser.innerHTML = '🧹';
    eraser.title = 'Eraser / Clear Square';
    eraser.onclick = () => selectEraser(eraser);
    swatchesContainer.appendChild(eraser);
  }

  function selectColor(color, element) {
    activeColor = color;
    isEraser = false;
    document.querySelectorAll('.cm-color-swatch').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  function selectEraser(element) {
    isEraser = true;
    document.querySelectorAll('.cm-color-swatch').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  function initChallengeChips() {
    const container = document.getElementById('cmChallengeChips');
    if (!container || !window.COLOR_MIRROR_CHALLENGES) return;

    container.innerHTML = '';
    window.COLOR_MIRROR_CHALLENGES.forEach((ch, idx) => {
      const chip = document.createElement('div');
      chip.className = `shelf-chip ${idx === currentChallengeIdx ? 'active' : ''}`;
      chip.onclick = () => loadChallenge(idx);
      
      const icon = ch.axis === 'vertical' ? '↕️' : '↔️';
      chip.innerHTML = `
        <span class="chip-icon">${icon}</span>
        <span class="chip-name">Ex ${ch.id}</span>
      `;
      container.appendChild(chip);
    });
  }

  function switchColorMirrorSubmode(mode) {
    currentSubmode = mode;

    const btnGuided = document.getElementById('cmBtnSubmodeGuided');
    const btnFree = document.getElementById('cmBtnSubmodeFree');
    const shelfWrapper = document.getElementById('cmShelfWrapper');
    const freeControls = document.getElementById('cmFreeControls');

    if (btnGuided) btnGuided.classList.toggle('active', mode === 'guided');
    if (btnFree) btnFree.classList.toggle('active', mode === 'free');
    if (shelfWrapper) shelfWrapper.classList.toggle('hidden', mode !== 'guided');
    if (freeControls) freeControls.classList.toggle('hidden', mode !== 'free');

    const feedbackEl = document.getElementById('cmFeedback');
    if (feedbackEl) feedbackEl.className = 'cm-feedback hidden';

    if (mode === 'guided') {
      loadChallenge(currentChallengeIdx);
    } else {
      initFreeGrid();
    }

    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  function loadChallenge(index) {
    currentChallengeIdx = index;
    const challenge = (window.COLOR_MIRROR_CHALLENGES || [])[index];
    if (!challenge) return;

    // Update active chip
    document.querySelectorAll('#cmChallengeChips .shelf-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === index);
    });

    const titleEl = document.getElementById('cmTitle');
    const hintEl = document.getElementById('cmHint');
    const feedbackEl = document.getElementById('cmFeedback');
    const nextBtn = document.getElementById('cmBtnNext');

    if (titleEl) titleEl.textContent = `${challenge.section}: ${challenge.label}`;
    if (hintEl) hintEl.innerHTML = `💡 <strong>Mirror Rule:</strong> ${challenge.hint}`;
    if (feedbackEl) feedbackEl.className = 'cm-feedback hidden';
    if (nextBtn) nextBtn.classList.add('hidden');

    // Initialize blank grid
    gridState = Array(challenge.rows).fill(null).map(() => Array(challenge.cols).fill(null));

    // Place given locked cells
    challenge.givenCells.forEach(cell => {
      gridState[cell.r][cell.c] = cell.color;
    });

    renderGrid(challenge.rows, challenge.cols, challenge.axis, challenge.givenHalf);
  }

  function renderGrid(rows, cols, axis, givenHalf = null) {
    const boardEl = document.getElementById('cmGridBoard');
    if (!boardEl) return;

    boardEl.innerHTML = '';
    boardEl.style.gridTemplateRows = `repeat(${rows}, 52px)`;
    boardEl.style.gridTemplateColumns = `repeat(${cols}, 52px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cm-grid-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;

        // Apply symmetry line borders
        if (axis === 'vertical' && c === (cols / 2) - 1) {
          cell.classList.add('axis-vertical-right');
        }
        if (axis === 'horizontal' && r === (rows / 2) - 1) {
          cell.classList.add('axis-horizontal-bottom');
        }

        // Check if locked given cell in guided mode
        let isLocked = false;
        if (currentSubmode === 'guided') {
          if (axis === 'vertical') {
            isLocked = givenHalf === 'left' ? c < cols / 2 : c >= cols / 2;
          } else {
            isLocked = givenHalf === 'top' ? r < rows / 2 : r >= rows / 2;
          }
        }

        if (isLocked) {
          cell.classList.add('locked');
        } else {
          cell.classList.add('editable');
          cell.onclick = () => onCellClicked(r, c, rows, cols, axis);
        }

        const color = gridState[r][c];
        if (color) {
          cell.style.backgroundColor = color;
        }

        boardEl.appendChild(cell);
      }
    }
  }

  function onCellClicked(r, c, rows, cols, axis) {
    const newColor = isEraser ? null : activeColor;
    gridState[r][c] = newColor;

    // In Free Draw with Auto-Mirror: reflect automatically!
    if (currentSubmode === 'free' && freeAutoMirror) {
      if (axis === 'vertical') {
        const mirrorCol = cols - 1 - c;
        gridState[r][mirrorCol] = newColor;
      } else {
        const mirrorRow = rows - 1 - r;
        gridState[mirrorRow][c] = newColor;
      }
    }

    if (window.sound && window.sound.playPop) window.sound.playPop();

    // Re-render
    const challenge = (window.COLOR_MIRROR_CHALLENGES || [])[currentChallengeIdx];
    const givenHalf = currentSubmode === 'guided' ? challenge.givenHalf : null;
    renderGrid(rows, cols, axis, givenHalf);
  }

  function checkGuidedPattern() {
    const challenge = (window.COLOR_MIRROR_CHALLENGES || [])[currentChallengeIdx];
    const feedbackEl = document.getElementById('cmFeedback');
    const nextBtn = document.getElementById('cmBtnNext');
    if (!challenge || !feedbackEl) return;

    feedbackEl.classList.remove('hidden');

    let isCorrect = true;
    let errorsFound = 0;
    const rows = challenge.rows;
    const cols = challenge.cols;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let expectedColor = null;

        if (challenge.axis === 'vertical') {
          const mirrorCol = cols - 1 - c;
          expectedColor = gridState[r][mirrorCol];
        } else {
          const mirrorRow = rows - 1 - r;
          expectedColor = gridState[mirrorRow][c];
        }

        const actualColor = gridState[r][c];
        if (actualColor !== expectedColor) {
          isCorrect = false;
          errorsFound++;
        }
      }
    }

    if (isCorrect) {
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      }

      feedbackEl.className = 'cm-feedback success';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🎉 🪞</div>
        <div class="feedback-text">
          <strong>Perfect Symmetrical Reflection!</strong>
          <p>Every colored square matches its mirror reflection across the dotted line with zero errors!</p>
        </div>
      `;

      if (nextBtn) nextBtn.classList.remove('hidden');
    } else {
      if (window.sound && window.sound.playBuzz) window.sound.playBuzz();
      feedbackEl.className = 'cm-feedback warning';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🔍</div>
        <div class="feedback-text">
          <strong>Not quite symmetrical yet!</strong>
          <p>Check the distance of each square from the dotted mirror line. Squares near the line must stay near the line on the other side!</p>
        </div>
      `;
    }
  }

  function clearStudentSquares() {
    const challenge = (window.COLOR_MIRROR_CHALLENGES || [])[currentChallengeIdx];
    if (!challenge) return;

    const rows = challenge.rows;
    const cols = challenge.cols;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let isStudentHalf = false;
        if (challenge.axis === 'vertical') {
          isStudentHalf = challenge.givenHalf === 'left' ? c >= cols / 2 : c < cols / 2;
        } else {
          isStudentHalf = challenge.givenHalf === 'top' ? r >= rows / 2 : r < rows / 2;
        }

        if (isStudentHalf) {
          gridState[r][c] = null;
        }
      }
    }

    const feedbackEl = document.getElementById('cmFeedback');
    if (feedbackEl) feedbackEl.className = 'cm-feedback hidden';

    if (window.sound && window.sound.playPop) window.sound.playPop();
    renderGrid(rows, cols, challenge.axis, challenge.givenHalf);
  }

  function nextChallenge() {
    const challenges = window.COLOR_MIRROR_CHALLENGES || [];
    const nextIdx = (currentChallengeIdx + 1) % challenges.length;
    loadChallenge(nextIdx);
  }

  // ================= FREE DESIGN SUBMODE =================
  function initFreeGrid() {
    gridState = Array(freeRows).fill(null).map(() => Array(freeCols).fill(null));

    const titleEl = document.getElementById('cmTitle');
    const hintEl = document.getElementById('cmHint');
    if (titleEl) titleEl.textContent = '3. Design Your Own Symmetrical Pattern!';
    if (hintEl) {
      hintEl.innerHTML = freeAutoMirror
        ? '✨ <strong>Magic Mirror Mode ON:</strong> Every square you paint instantly reflects to the other side!'
        : '✏️ <strong>Free Draw Mode:</strong> Paint your own squares, then click "Test Symmetry" to check!';
    }

    renderGrid(freeRows, freeCols, freeAxis, null);
  }

  function setFreePreset(presetType) {
    if (presetType === '4x4_vertical') {
      freeRows = 4;
      freeCols = 4;
      freeAxis = 'vertical';
    } else if (presetType === '6x4_horizontal') {
      freeRows = 4;
      freeCols = 6;
      freeAxis = 'horizontal';
    }

    document.querySelectorAll('.cm-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetType);
    });

    initFreeGrid();
    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  function toggleAutoMirror() {
    freeAutoMirror = !freeAutoMirror;
    const btn = document.getElementById('cmBtnAutoMirror');
    if (btn) {
      btn.classList.toggle('active', freeAutoMirror);
      btn.textContent = freeAutoMirror ? '✨ Auto-Mirror: ON' : '✏️ Auto-Mirror: OFF';
    }

    const hintEl = document.getElementById('cmHint');
    if (hintEl) {
      hintEl.innerHTML = freeAutoMirror
        ? '✨ <strong>Magic Mirror Mode ON:</strong> Every square you paint instantly reflects to the other side!'
        : '✏️ <strong>Free Draw Mode:</strong> Paint your own squares, then click "Test Symmetry" to check!';
    }

    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  function testFreeSymmetry() {
    const feedbackEl = document.getElementById('cmFeedback');
    if (!feedbackEl) return;

    feedbackEl.classList.remove('hidden');

    let isSymmetric = true;
    let coloredCount = 0;

    for (let r = 0; r < freeRows; r++) {
      for (let c = 0; c < freeCols; c++) {
        if (gridState[r][c]) coloredCount++;

        let expectedColor = null;
        if (freeAxis === 'vertical') {
          const mirrorCol = freeCols - 1 - c;
          expectedColor = gridState[r][mirrorCol];
        } else {
          const mirrorRow = freeRows - 1 - r;
          expectedColor = gridState[mirrorRow][c];
        }

        if (gridState[r][c] !== expectedColor) {
          isSymmetric = false;
        }
      }
    }

    if (coloredCount === 0) {
      feedbackEl.className = 'cm-feedback warning';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🎨</div>
        <div class="feedback-text">
          <strong>Grid is empty!</strong>
          <p>Tap any squares on the grid with your favorite colors first!</p>
        </div>
      `;
      return;
    }

    if (isSymmetric) {
      if (window.sound && window.sound.playCorrect) window.sound.playCorrect();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }

      feedbackEl.className = 'cm-feedback success';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🎉 🌟</div>
        <div class="feedback-text">
          <strong>True Symmetrical Pattern!</strong>
          <p>Your design has beautiful reflection symmetry across the dotted ${freeAxis} line!</p>
        </div>
      `;
    } else {
      if (window.sound && window.sound.playBuzz) window.sound.playBuzz();
      feedbackEl.className = 'cm-feedback warning';
      feedbackEl.innerHTML = `
        <div class="feedback-icon">🔍</div>
        <div class="feedback-text">
          <strong>Almost Symmetrical!</strong>
          <p>Some squares on one side do not match the colors or positions on the opposite side.</p>
        </div>
      `;
    }
  }

  function clearFreeGrid() {
    initFreeGrid();
    if (window.sound && window.sound.playPop) window.sound.playPop();
  }

  // Window exports
  window.initColorMirror = initColorMirror;
  window.switchColorMirrorSubmode = switchColorMirrorSubmode;
  window.loadChallenge = loadChallenge;
  window.checkGuidedPattern = checkGuidedPattern;
  window.clearStudentSquares = clearStudentSquares;
  window.nextChallenge = nextChallenge;
  window.setFreePreset = setFreePreset;
  window.toggleAutoMirror = toggleAutoMirror;
  window.testFreeSymmetry = testFreeSymmetry;
  window.clearFreeGrid = clearFreeGrid;

})();
