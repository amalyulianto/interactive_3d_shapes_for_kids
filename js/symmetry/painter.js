/**
 * Lines of Symmetry Studio - Activity 3: Mirror Painter
 * Interactive pixel symmetry studio supporting Guided Challenge Mode and Free-Draw Magic Mode.
 */

let painterMode = 'guided'; // 'guided' | 'free'
let activePattern = null;
let activeColor = '#EF4444';
let isEraserActive = false;
let gridState = Array(8).fill(null).map(() => Array(8).fill(null));

function initPainterActivity() {
  if (window.GUIDED_PATTERNS) activePattern = window.GUIDED_PATTERNS[0];
  if (window.PAINTER_COLORS) activeColor = window.PAINTER_COLORS[0];
  initPainterSwatches();
  initPatternChips();
  initInspirationChips();
  if (activePattern) loadGuidedPattern(activePattern);
}

function initPainterSwatches() {
  const container = document.getElementById('painterSwatches');
  if (!container || !window.PAINTER_COLORS) return;
  container.innerHTML = '';

  window.PAINTER_COLORS.forEach((color, idx) => {
    const dot = document.createElement('div');
    dot.className = `paint-color-dot ${idx === 0 ? 'active' : ''}`;
    dot.style.background = color;
    dot.onclick = () => selectPainterColor(color, dot);
    container.appendChild(dot);
  });
}

function initPatternChips() {
  const chipsContainer = document.getElementById('patternChipsList');
  if (!chipsContainer || !window.GUIDED_PATTERNS) return;
  chipsContainer.innerHTML = '';

  window.GUIDED_PATTERNS.forEach((p, idx) => {
    const chip = document.createElement('button');
    chip.className = `hud-chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `${p.icon} ${p.name}`;
    chip.onclick = () => selectGuidedPattern(p.id);
    chipsContainer.appendChild(chip);
  });
}

function initInspirationChips() {
  const container = document.getElementById('inspirationChipsList');
  if (!container || !window.FREE_DRAW_INSPIRATIONS) return;
  container.innerHTML = '';

  window.FREE_DRAW_INSPIRATIONS.forEach((insp) => {
    const chip = document.createElement('button');
    chip.className = 'inspire-chip';
    chip.innerHTML = `${insp.icon} ${insp.name}`;
    chip.onclick = () => loadInspiration(insp.id);
    container.appendChild(chip);
  });
}

function loadInspiration(inspId) {
  if (!window.FREE_DRAW_INSPIRATIONS) return;
  const insp = window.FREE_DRAW_INSPIRATIONS.find(i => i.id === inspId);
  if (!insp) return;
  if (window.sound) window.sound.playPop();

  document.querySelectorAll('#inspirationChipsList .inspire-chip').forEach(c => {
    c.classList.toggle('active', c.textContent.includes(insp.name));
  });

  gridState = Array(8).fill(null).map(() => Array(8).fill(null));
  insp.cells.forEach(cell => {
    gridState[cell.r][cell.c] = cell.color;
  });
  renderPainterGrid();
}

function setPainterMode(mode) {
  if (window.sound) window.sound.playPop();
  painterMode = mode;

  const btnGuided = document.getElementById('btnModeGuided');
  const btnFree = document.getElementById('btnModeFree');
  const guidedRow = document.getElementById('guidedSelectorRow');
  const inspirationsRow = document.getElementById('freeDrawInspirationsRow');
  const instruction = document.getElementById('painterInstructionText');
  const btnCheck = document.getElementById('btnCheckPainter');
  const modeBadge = document.getElementById('painterModeBadge');
  const modeBannerText = document.getElementById('painterModeBannerText');
  const sidebarBadge = document.getElementById('painterSidebarBadge');

  if (btnGuided) btnGuided.classList.toggle('active', mode === 'guided');
  if (btnFree) btnFree.classList.toggle('active', mode === 'free');

  if (mode === 'free') {
    if (guidedRow) guidedRow.style.display = 'none';
    if (inspirationsRow) inspirationsRow.classList.remove('hidden');
    if (btnCheck) btnCheck.style.display = 'none';
    if (modeBadge) {
      modeBadge.textContent = '✨ Free-Draw Magic Mode';
      modeBadge.style.background = '#8B5CF6';
    }
    if (modeBannerText) {
      modeBannerText.textContent = 'Tap anywhere! Both sides paint together in real-time magic symmetry!';
    }
    if (sidebarBadge) sidebarBadge.textContent = 'Free-Draw Magic';
    if (instruction) {
      instruction.textContent = 'Paint anywhere on either side of the glowing mirror line! Every square you color mirrors automatically across the line in real-time reflection!';
    }
    clearPainterGrid();
  } else {
    if (guidedRow) guidedRow.style.display = 'flex';
    if (inspirationsRow) inspirationsRow.classList.add('hidden');
    if (btnCheck) btnCheck.style.display = 'inline-block';
    if (modeBadge) {
      modeBadge.textContent = '🧩 Guided Puzzle Mode';
      modeBadge.style.background = '#4F46E5';
    }
    if (modeBannerText) {
      modeBannerText.textContent = 'Look at the left side and color the matching squares on the right side!';
    }
    if (sidebarBadge) sidebarBadge.textContent = 'Guided Puzzle';
    if (instruction) {
      instruction.textContent = 'Look at the colored squares on the left side of the glowing mirror line. Tap the exact matching distance on the right side to create a perfectly symmetrical artwork!';
    }
    if (activePattern) loadGuidedPattern(activePattern);
  }
}

function selectGuidedPattern(patternId) {
  if (!window.GUIDED_PATTERNS) return;
  const p = window.GUIDED_PATTERNS.find(pat => pat.id === patternId);
  if (!p) return;
  if (window.sound) window.sound.playPop();
  activePattern = p;

  const chips = document.querySelectorAll('#patternChipsList .hud-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', window.GUIDED_PATTERNS[idx].id === patternId);
  });

  const patName = document.getElementById('currentPatternName');
  if (patName) patName.textContent = p.name;

  loadGuidedPattern(p);
}

function loadGuidedPattern(pattern) {
  gridState = Array(8).fill(null).map(() => Array(8).fill(null));

  pattern.leftCells.forEach(cell => {
    gridState[cell.r][cell.c] = cell.color;
  });

  const accuracyText = document.getElementById('painterAccuracyText');
  if (accuracyText) accuracyText.textContent = 'In Progress';
  const feedback = document.getElementById('painterFeedback');
  if (feedback) feedback.classList.add('hidden');

  renderPainterGrid();
}

function selectPainterColor(colorOrEraser, dotElement) {
  if (window.sound) window.sound.playPop();
  const eraserBtn = document.getElementById('btnEraser');

  if (colorOrEraser === 'eraser') {
    isEraserActive = true;
    if (eraserBtn) eraserBtn.classList.add('active');
    document.querySelectorAll('.paint-color-dot').forEach(d => d.classList.remove('active'));
  } else {
    isEraserActive = false;
    activeColor = colorOrEraser;
    if (eraserBtn) eraserBtn.classList.remove('active');
    document.querySelectorAll('.paint-color-dot').forEach(d => d.classList.remove('active'));
    if (dotElement) dotElement.classList.add('active');
  }
}

function renderPainterGrid() {
  const container = document.getElementById('paintGridContainer');
  if (!container) return;
  container.innerHTML = '';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = document.createElement('div');
      cell.className = 'paint-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;

      const cellColor = gridState[r][c];
      cell.style.background = cellColor || '#FFFFFF';

      if (painterMode === 'guided' && c < 4) {
        cell.classList.add('locked');
        cell.title = 'Reference pattern (left side)';
      } else {
        cell.onclick = () => onCellClicked(r, c);
      }

      container.appendChild(cell);
    }
  }
}

function onCellClicked(r, c) {
  if (window.sound) window.sound.playPop();
  const colorToApply = isEraserActive ? null : activeColor;

  if (painterMode === 'free') {
    gridState[r][c] = colorToApply;
    const mirrorC = 7 - c;
    gridState[r][mirrorC] = colorToApply;
    renderPainterGrid();
  } else {
    if (c >= 4) {
      gridState[r][c] = colorToApply;
      updateSingleCellDisplay(r, c, colorToApply);
    }
  }
}

function updateSingleCellDisplay(r, c, color) {
  const container = document.getElementById('paintGridContainer');
  if (!container) return;
  const index = r * 8 + c;
  const cell = container.children[index];
  if (cell) {
    cell.style.background = color || '#FFFFFF';
  }
}

function checkPainterSymmetry() {
  if (painterMode !== 'guided') return;

  let totalTargetCells = 0;
  let correctMatches = 0;
  let mistakes = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 4; c++) {
      const leftColor = gridState[r][c];
      const mirrorC = 7 - c;
      const rightColor = gridState[r][mirrorC];

      if (leftColor) {
        totalTargetCells++;
        if (rightColor === leftColor) {
          correctMatches++;
        } else {
          mistakes++;
        }
      } else {
        if (rightColor) {
          mistakes++;
        }
      }
    }
  }

  const feedback = document.getElementById('painterFeedback');
  const accuracyText = document.getElementById('painterAccuracyText');
  if (!feedback) return;
  feedback.classList.remove('hidden');

  if (mistakes === 0 && correctMatches === totalTargetCells) {
    if (window.sound) window.sound.playFanfare();
    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    }
    feedback.className = 'match-feedback-banner correct';
    feedback.innerHTML = `🌟 <strong>Symmetrical Masterpiece!</strong> Every square is a perfect mirror reflection! Outstanding job! 🎨✨`;
    if (accuracyText) accuracyText.textContent = '100% Perfect! ⭐';
  } else {
    if (window.sound) window.sound.playBuzz();
    feedback.className = 'match-feedback-banner wrong';
    const percent = Math.round((correctMatches / totalTargetCells) * 100);
    feedback.innerHTML = `Keep going! You have matched <strong>${correctMatches} of ${totalTargetCells}</strong> squares correctly (${percent}%). Check the distance from the glowing middle line!`;
    if (accuracyText) accuracyText.textContent = `${percent}% Match`;
  }
}

function clearPainterGrid() {
  if (window.sound) window.sound.playPop();
  gridState = Array(8).fill(null).map(() => Array(8).fill(null));
  if (painterMode === 'guided') {
    if (activePattern) loadGuidedPattern(activePattern);
  } else {
    renderPainterGrid();
  }
}

// Global window attachments
window.initPainterActivity = initPainterActivity;
window.setPainterMode = setPainterMode;
window.selectGuidedPattern = selectGuidedPattern;
window.selectPainterColor = selectPainterColor;
window.renderPainterGrid = renderPainterGrid;
window.checkPainterSymmetry = checkPainterSymmetry;
window.clearPainterGrid = clearPainterGrid;
window.loadInspiration = loadInspiration;
