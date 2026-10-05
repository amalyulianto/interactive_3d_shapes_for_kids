/**
 * Lines of Symmetry Studio - Activity 2: Line Detective
 * Shape analysis, interactive test guidelines, trap detection, and confirmation tracking.
 */

let activeDetectiveShape = null;
let foundLines = new Set();

function initDetectiveActivity() {
  const shelf = document.getElementById('detectiveShapesShelf');
  if (!shelf || !window.DETECTIVE_SHAPES) return;
  shelf.innerHTML = '';

  activeDetectiveShape = window.DETECTIVE_SHAPES[0];

  window.DETECTIVE_SHAPES.forEach((shape, idx) => {
    const chip = document.createElement('div');
    chip.className = `shelf-chip ${idx === 0 ? 'active' : ''}`;
    chip.onclick = () => selectDetectiveShape(shape.id);
    chip.innerHTML = `
      <span class="chip-icon">${shape.icon}</span>
      <span class="chip-name">${shape.name}</span>
    `;
    shelf.appendChild(chip);
  });

  renderDetectiveShape(activeDetectiveShape);
}

function selectDetectiveShape(shapeId) {
  if (!window.DETECTIVE_SHAPES) return;
  const shape = window.DETECTIVE_SHAPES.find(s => s.id === shapeId);
  if (!shape) return;
  if (window.sound) window.sound.playPop();
  activeDetectiveShape = shape;
  foundLines.clear();

  const chips = document.querySelectorAll('#detectiveShapesShelf .shelf-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', window.DETECTIVE_SHAPES[idx].id === shapeId);
  });

  renderDetectiveShape(activeDetectiveShape);
}

function renderDetectiveShape(shape) {
  const nameEl = document.getElementById('detectiveShapeName');
  const titleEl = document.getElementById('detectiveTitle');
  const iconEl = document.getElementById('detectiveIcon');
  const totalBadge = document.getElementById('detectiveTotalLinesBadge');
  const clueEl = document.getElementById('detectiveClueText');
  const tipEl = document.getElementById('detectiveTipText');
  const feedbackEl = document.getElementById('detectiveFeedback');
  const listEl = document.getElementById('confirmedLinesList');

  if (nameEl) nameEl.textContent = shape.name;
  if (titleEl) titleEl.textContent = shape.name;
  if (iconEl) iconEl.textContent = shape.icon;
  if (totalBadge) totalBadge.textContent = shape.totalLines === 999 ? 'Infinite Lines of Symmetry ♾️' : `${shape.totalLines} Lines of Symmetry`;
  if (clueEl) clueEl.textContent = shape.clue;
  if (tipEl) tipEl.textContent = shape.tip;
  if (feedbackEl) feedbackEl.classList.add('hidden');
  if (listEl) listEl.innerHTML = '';

  updateDetectiveCounter();
  renderDetectiveSvgAndButtons();
}

function renderDetectiveSvgAndButtons() {
  const svg = document.getElementById('detectiveSvg');
  if (!svg || !activeDetectiveShape) return;

  let svgContent = activeDetectiveShape.shapeSvg;

  activeDetectiveShape.lines.forEach((line) => {
    const isFound = foundLines.has(line.id);
    const strokeColor = isFound ? '#10B981' : '#6366F1';
    const strokeWidth = isFound ? '4.5' : '3';
    const strokeDash = isFound ? 'none' : '7,7';

    svgContent += `
      <g class="detective-guide-group" onclick="testDetectiveLineById('${line.id}')" title="Tap to test: ${line.name}">
        <!-- Wide Hit Area for Easy Touch/Click -->
        <line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" 
              stroke="transparent" stroke-width="38" stroke-linecap="round"/>
        <!-- Visible Guideline -->
        <line id="svgLine_${line.id}" class="guideline-visible ${isFound ? 'verified' : ''}" 
              x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" 
              stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-dasharray="${strokeDash}" stroke-linecap="round"/>
        <!-- Endpoint Handle Pin 1 -->
        <circle id="handle1_${line.id}" class="line-handle-circle ${isFound ? 'verified' : ''}" cx="${line.x1}" cy="${line.y1}" r="13" 
                fill="${isFound ? '#10B981' : '#4F46E5'}" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="${line.x1}" y="${line.y1}" text-anchor="middle" dy="4" font-size="11" font-weight="900" fill="#FFFFFF" pointer-events="none">${isFound ? '✓' : '👆'}</text>
        <!-- Endpoint Handle Pin 2 -->
        <circle id="handle2_${line.id}" class="line-handle-circle ${isFound ? 'verified' : ''}" cx="${line.x2}" cy="${line.y2}" r="13" 
                fill="${isFound ? '#10B981' : '#4F46E5'}" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="${line.x2}" y="${line.y2}" text-anchor="middle" dy="4" font-size="11" font-weight="900" fill="#FFFFFF" pointer-events="none">${isFound ? '✓' : '👆'}</text>
      </g>
    `;
  });

  svg.innerHTML = svgContent;
}

function testDetectiveLineById(lineId) {
  if (!activeDetectiveShape) return;
  const line = activeDetectiveShape.lines.find(l => l.id === lineId);
  if (line) testDetectiveLine(line);
}

function testDetectiveLine(line) {
  const feedback = document.getElementById('detectiveFeedback');
  const listEl = document.getElementById('confirmedLinesList');
  if (!feedback) return;

  feedback.classList.remove('hidden');

  if (line.isSymmetric) {
    if (window.sound) window.sound.playChime();
    foundLines.add(line.id);

    feedback.className = 'match-feedback-banner correct';
    feedback.innerHTML = `🎉 <strong>Match!</strong> ${line.name} is a TRUE line of symmetry! ${line.desc}`;

    if (listEl && !document.getElementById(`conf_${line.id}`)) {
      const li = document.createElement('li');
      li.id = `conf_${line.id}`;
      li.innerHTML = `<span class="check-icon">✓</span> <strong>${line.name}:</strong> ${line.desc}`;
      listEl.appendChild(li);
    }

    renderDetectiveSvgAndButtons();
    updateDetectiveCounter();

    const allSymmLines = activeDetectiveShape.lines.filter(l => l.isSymmetric);
    if (foundLines.size >= allSymmLines.length) {
      if (window.sound) window.sound.playFanfare();
      if (window.AppUtils && window.AppUtils.confetti) {
        window.AppUtils.confetti({ particleCount: 50, spread: 70, origin: { y: 0.55 } });
      } else if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.55 } });
      }
      feedback.innerHTML += `<div style="margin-top:6px; font-size:1.05rem;">🌟 <strong>Mystery Solved!</strong> You discovered all lines of symmetry for the ${activeDetectiveShape.name}!</div>`;
    }
  } else {
    if (window.sound) window.sound.playBuzz();
    feedback.className = 'match-feedback-banner wrong';
    feedback.innerHTML = `❌ <strong>Trap! Not a line of symmetry!</strong> ${line.desc}`;

    const svgLine = document.getElementById(`svgLine_${line.id}`);
    const h1 = document.getElementById(`handle1_${line.id}`);
    const h2 = document.getElementById(`handle2_${line.id}`);
    if (svgLine) svgLine.classList.add('failed');
    if (h1) h1.classList.add('failed');
    if (h2) h2.classList.add('failed');

    setTimeout(() => {
      if (svgLine) svgLine.classList.remove('failed');
      if (h1) h1.classList.remove('failed');
      if (h2) h2.classList.remove('failed');
    }, 1200);
  }
}

function updateDetectiveCounter() {
  const badge = document.getElementById('detectiveFoundBadge');
  if (!badge || !activeDetectiveShape) return;
  const targetTotal = activeDetectiveShape.totalLines === 999 ? 'Infinite' : activeDetectiveShape.totalLines;
  badge.textContent = `Lines Found: ${foundLines.size} / ${targetTotal}`;
}

function resetDetectiveLines() {
  if (window.sound) window.sound.playPop();
  foundLines.clear();
  const feedback = document.getElementById('detectiveFeedback');
  const listEl = document.getElementById('confirmedLinesList');
  if (feedback) feedback.classList.add('hidden');
  if (listEl) listEl.innerHTML = '';
  updateDetectiveCounter();
  renderDetectiveSvgAndButtons();
}

// Global window attachments
window.initDetectiveActivity = initDetectiveActivity;
window.selectDetectiveShape = selectDetectiveShape;
window.renderDetectiveShape = renderDetectiveShape;
window.renderDetectiveSvgAndButtons = renderDetectiveSvgAndButtons;
window.testDetectiveLineById = testDetectiveLineById;
window.testDetectiveLine = testDetectiveLine;
window.updateDetectiveCounter = updateDetectiveCounter;
window.resetDetectiveLines = resetDetectiveLines;
