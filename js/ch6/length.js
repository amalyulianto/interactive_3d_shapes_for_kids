/**
 * Chapter 6, Lesson 1: Length Studio (cm & m) — Interactive Engine
 * Aligned with Active Maths Stage 2 Textbook pp. 83–89 & Workbook WS 1–3 (pp. 63–67)
 * Zero-Build Architecture — Alapakadala Studio
 */
(function () {
  'use strict';

  const Data = window.LengthData;

  /* ==========================================================================
     GLOBAL STUDIO STATE
     ========================================================================== */
  const state = {
    mode: 'cm', // 'cm' | 'metres' | 'draw' | 'compare' | 'quiz'

    cm: {
      subMode: 'bench', // 'bench' | 'faulty' | 'curve'
      itemIndex: 0,
      slidToZero: false,
      hopCount: 0,
      solvedIds: new Set(),

      faulty: {
        crossed5: false,
        crossed10: false,
        fixed5: false,
        fixed10: false,
        nailSolved: false,
        feedback: ''
      },

      curve: {
        index: 0,
        step: 0, // 0 = curved only, 1 = string laid, 2 = snipped, 3 = straightened on ruler
        solvedIds: new Set()
      }
    },

    metres: {
      subMode: 'scenes', // 'scenes' | 'units'
      sceneIndex: 0,
      showRules: true,
      highlightCount: 0,
      selectedChoice: null,
      solvedScenes: new Set(),
      unitAnswers: {} // id -> 'cm' | 'm'
    },

    draw: {
      subMode: 'lines', // 'lines' | 'momo'
      challengeIndex: 0,
      lineStart: null,
      lineEnd: null,
      isDragging: false,
      hoverTick: 0,
      pendingTapStart: null,
      solvedChallenges: new Set(),

      momo: {
        connectedIndex: 0, // 0 means waiting for 'A' (or 'A' auto-lit, tap B..H) -> let's start at 0 so tapping A starts, or A is start and tap B..H! Let's let tapping A or B work seamlessly!
        showRuler: false,
        offsetMode: false, // false => D at 0cm, E at 4cm; true => D at 3cm, E at 7cm
        deSolved: false
      }
    },

    compare: {
      subMode: 'aligned', // 'aligned' | 'flowers' | 'bathroom' | 'giraffes'
      alignedPart: 'pencils', // 'pencils' | 'desk'
      bathroomSlideZero: false,
      metrePart: 'giraffes', // 'giraffes' | 'planes'
      giraffeOrder: [] // array of letters e.g. ['E','B','C','A','D']
    },

    quiz: {
      level: 1,
      qIndex: 0,
      score: 0,
      answered: false,
      selectedIdx: null,
      questions: [],
      finished: false
    }
  };

  /* ==========================================================================
     AUDIO & HELPERS
     ========================================================================== */
  function playPop() {
    if (window.sound) window.sound.playPop();
  }
  function playCorrect() {
    if (window.sound) window.sound.playCorrect();
  }
  function playWrong() {
    if (window.sound) window.sound.playWrong();
  }
  function playFanfare() {
    if (window.sound) window.sound.playFanfare();
  }
  function celebrate() {
    if (window.AppUtils) window.AppUtils.confetti();
  }

  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.textContent = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  /* ==========================================================================
     TOP-LEVEL MODE SWITCHING
     ========================================================================== */
  window.switchLengthMode = function (mode) {
    state.mode = mode;
    playPop();

    document.querySelectorAll('.studio-mode-bar .tab-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`tabBtn_${mode}`);
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(`view_${mode}`);
    if (panel) panel.classList.add('active');

    if (mode === 'cm') renderCmView();
    if (mode === 'metres') renderMetresView();
    if (mode === 'draw') renderDrawView();
    if (mode === 'compare') renderCompareView();
    if (mode === 'quiz') window.startLengthQuiz(state.quiz.level);
  };

  /* ==========================================================================
     SHARED SVG RULER BUILDER (0–15 cm Horizontal Yellow School Ruler)
     ========================================================================== */
  function buildHorizontalRulerSvg(yTop, xZero, pxPerCm, maxCm, opts) {
    const options = opts || {};
    const rulerHeight = options.height || 54;
    const plasticMargin = 18;
    const rulerX = xZero - plasticMargin;
    const rulerWidth = maxCm * pxPerCm + plasticMargin * 2;
    let ticks = '';

    for (let cm = 0; cm <= maxCm; cm++) {
      const x = xZero + cm * pxPerCm;
      // Major cm tick
      ticks += `<line x1="${x}" y1="${yTop}" x2="${x}" y2="${yTop + 18}" stroke="#78350F" stroke-width="2.2"/>`;
      ticks += `<text x="${x}" y="${yTop + 36}" text-anchor="middle" fill="#451A03" font-family="JetBrains Mono, monospace" font-weight="800" font-size="14">${cm}</text>`;

      if (cm < maxCm) {
        for (let mm = 1; mm <= 9; mm++) {
          const mx = x + (mm / 10) * pxPerCm;
          const tickLen = mm === 5 ? 12 : 7;
          const sw = mm === 5 ? 1.5 : 0.9;
          ticks += `<line x1="${mx}" y1="${yTop}" x2="${mx}" y2="${yTop + tickLen}" stroke="#92400E" stroke-width="${sw}"/>`;
        }
      }
    }

    const unitLabel = `<text x="${xZero + maxCm * pxPerCm + 2}" y="${yTop + 48}" text-anchor="end" fill="#92400E" font-family="Nunito, sans-serif" font-weight="900" font-size="11">cm</text>`;

    let zeroCallout = '';
    if (options.showZeroArrow) {
      zeroCallout = `
        <g>
          <path d="M ${xZero} ${yTop + rulerHeight + 3} L ${xZero - 6} ${yTop + rulerHeight + 13} L ${xZero + 6} ${yTop + rulerHeight + 13} Z" fill="#EF4444"/>
          <rect x="${xZero - 34}" y="${yTop + rulerHeight + 13}" width="68" height="20" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
          <text x="${xZero}" y="${yTop + rulerHeight + 27}" text-anchor="middle" fill="#B91C1C" font-family="Nunito, sans-serif" font-weight="900" font-size="11">0 cm mark</text>
        </g>`;
    }

    return `
      <g class="school-ruler-svg">
        <rect x="${rulerX}" y="${yTop}" width="${rulerWidth}" height="${rulerHeight}" rx="7" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
        <rect x="${rulerX + 2}" y="${yTop + 2}" width="${rulerWidth - 4}" height="6" rx="3" fill="#FEF08A" opacity="0.7"/>
        ${ticks}
        ${unitLabel}
        ${zeroCallout}
      </g>`;
  }

  /* ==========================================================================
     TAB 1: MEASURE IN CENTIMETRES (cm)
     ========================================================================== */
  window.setCmSubMode = function (sub) {
    state.cm.subMode = sub;
    playPop();

    ['bench', 'faulty', 'curve'].forEach(k => {
      const pill = document.getElementById(`cmSub_${k}`);
      if (pill) pill.classList.toggle('active', k === sub);
    });

    document.getElementById('cmBenchSection').classList.toggle('hidden', sub !== 'bench');
    document.getElementById('cmFaultySection').classList.toggle('hidden', sub !== 'faulty');
    document.getElementById('cmCurveSection').classList.toggle('hidden', sub !== 'curve');

    renderCmView();
  };

  function renderCmView() {
    if (state.cm.subMode === 'bench') renderCmBench();
    else if (state.cm.subMode === 'faulty') renderFaultyRuler();
    else renderCurveLab();
  }

  window.selectCmItem = function (idx) {
    state.cm.itemIndex = idx;
    state.cm.slidToZero = false;
    state.cm.hopCount = 0;
    playPop();
    renderCmBench();
  };

  window.toggleSlideToZero = function () {
    state.cm.slidToZero = !state.cm.slidToZero;
    state.cm.hopCount = 0;
    playPop();
    renderCmBench();
  };

  window.stepCmHop = function () {
    const item = Data.CM_ITEMS[state.cm.itemIndex];
    const start = state.cm.slidToZero ? 0 : item.startCm;
    const totalNeeded = Math.round(item.endCm - item.startCm);
    if (state.cm.hopCount < totalNeeded) {
      state.cm.hopCount++;
      playPop();
    } else {
      state.cm.hopCount = 0;
      playPop();
    }
    renderCmBenchStageOnly();
  };

  window.allCmHops = function () {
    const item = Data.CM_ITEMS[state.cm.itemIndex];
    state.cm.hopCount = Math.round(item.endCm - item.startCm);
    playCorrect();
    renderCmBenchStageOnly();
  };

  function renderCmBench() {
    const item = Data.CM_ITEMS[state.cm.itemIndex];
    const badgeEl = document.getElementById('cmHeaderBadge');
    if (badgeEl) badgeEl.textContent = item.badge;

    // 1. Item Pills
    const pillsEl = document.getElementById('cmItemPills');
    pillsEl.innerHTML = Data.CM_ITEMS.map((it, idx) => {
      const done = state.cm.solvedIds.has(it.id) ? ' ✅' : '';
      return `<button class="item-chip ${idx === state.cm.itemIndex ? 'active' : ''}" onclick="selectCmItem(${idx})">${it.name}${done}</button>`;
    }).join('');

    // 2. Character Bar
    const avatars = { Tim: '👦', Momo: '🐭', Ada: '👧', Vera: '👧🏻', Coco: '🐱' };
    document.getElementById('cmCharacterBar').innerHTML = `
      <span class="char-avatar">${avatars[item.character] || '🐭'}</span>
      <div class="char-text">
        <strong>${item.character}'s Tip (${item.badge}):</strong>
        <span>${item.bubble}</span>
      </div>`;

    // 3. Stage & Tools
    renderCmBenchStageOnly();

    // 4. Answer Panel
    const ansEl = document.getElementById('cmAnswerPanel');
    if (item.mode === 'between') {
      ansEl.innerHTML = `
        <div class="answer-sentence">
          <span>The highlighter is <strong>more than</strong></span>
          <input type="number" id="cmAnsLow" class="num-input" min="0" max="15" placeholder="?">
          <span><strong>cm</strong> and <strong>less than</strong></span>
          <input type="number" id="cmAnsHigh" class="num-input" min="0" max="15" placeholder="?">
          <span><strong>cm</strong>.</span>
          <button class="btn-primary btn-compact" onclick="checkCmBenchAnswer()">Check ✓</button>
        </div>
        <div id="cmFeedbackMsg" class="feedback-msg"></div>`;
    } else {
      const eqHint = item.mode === 'nonzero' && !state.cm.slidToZero
        ? `<div class="eq-helper-row">
             <span class="eq-tag">Subtract Readings:</span>
             <strong>${item.endCm} cm − ${item.startCm} cm = ?</strong>
           </div>`
        : '';
      ansEl.innerHTML = `
        ${eqHint}
        <div class="answer-sentence">
          <span>${item.prompt.replace('___', '<input type="number" id="cmAnsExact" class="num-input" min="0" max="15" placeholder="?">')}</span>
          <button class="btn-primary btn-compact" onclick="checkCmBenchAnswer()">Check ✓</button>
          <button class="btn-secondary btn-compact" onclick="nextCmItem()">Next ➔</button>
        </div>
        <div class="quick-num-pad">
          ${Array.from({ length: 15 }, (_, i) => i + 1).map(n =>
            `<button class="pad-chip" onclick="fillCmQuickNum(${n})">${n}</button>`
          ).join('')}
        </div>
        <div id="cmFeedbackMsg" class="feedback-msg"></div>`;
    }
  }

  function renderCmBenchStageOnly() {
    const item = Data.CM_ITEMS[state.cm.itemIndex];
    const xZero = 48;
    const pxPerCm = 48;
    const yRuler = 96;
    const startCm = state.cm.slidToZero ? 0 : item.startCm;
    const endCm = state.cm.slidToZero ? (item.endCm - item.startCm) : item.endCm;

    const objX = xZero + startCm * pxPerCm;
    const objW = (endCm - startCm) * pxPerCm;
    const endX = xZero + endCm * pxPerCm;

    // Number line aligned below ruler
    const yLine = 198;
    let numLine = `<line x1="${xZero}" y1="${yLine}" x2="${xZero + 15 * pxPerCm}" y2="${yLine}" stroke="#64748B" stroke-width="2.5"/>`;
    for (let c = 0; c <= 15; c++) {
      const cx = xZero + c * pxPerCm;
      numLine += `<line x1="${cx}" y1="${yLine - 5}" x2="${cx}" y2="${yLine + 5}" stroke="#475569" stroke-width="2"/>`;
      numLine += `<text x="${cx}" y="${yLine + 20}" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-weight="700" font-size="12">${c}</text>`;
    }

    // Counting-on hops
    let hopsSvg = '';
    for (let h = 0; h < state.cm.hopCount; h++) {
      const hx1 = xZero + (startCm + h) * pxPerCm;
      const hx2 = xZero + (startCm + h + 1) * pxPerCm;
      const mid = (hx1 + hx2) / 2;
      hopsSvg += `
        <path d="M ${hx1} ${yLine - 4} Q ${mid} ${yLine - 28} ${hx2} ${yLine - 4}" fill="none" stroke="#EF4444" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="${hx2}" cy="${yLine - 4}" r="3.2" fill="#EF4444"/>
        <text x="${mid}" y="${yLine - 19}" text-anchor="middle" fill="#DC2626" font-family="Nunito, sans-serif" font-weight="900" font-size="11">+1</text>`;
    }

    // Circle highlight for "between 8 and 9"
    const betweenRing = item.mode === 'between'
      ? `<circle cx="${endX}" cy="${yRuler + 10}" r="18" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-dasharray="4 3"/>`
      : '';

    document.getElementById('cmRulerStage').innerHTML = `
      <svg viewBox="0 0 820 232" class="responsive-stage-svg" role="img" aria-label="0 to 15 cm ruler measurement stage">
        <!-- Dashed alignment guides -->
        <line x1="${objX}" y1="24" x2="${objX}" y2="${yRuler + 54}" stroke="#2563EB" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="${endX}" y1="24" x2="${endX}" y2="${yRuler + 54}" stroke="#EF4444" stroke-width="2" stroke-dasharray="5 4"/>

        <!-- Object SVG -->
        <foreignObject x="${objX}" y="22" width="${Math.max(objW, 24)}" height="68">
          <div xmlns="http://www.w3.org/1999/xhtml" class="stage-obj-wrap">
            ${Data.getObjectSvg(item.svgId, objW)}
          </div>
        </foreignObject>

        <!-- Yellow School Ruler -->
        ${buildHorizontalRulerSvg(yRuler, xZero, pxPerCm, 15, { showZeroArrow: startCm === 0 })}
        ${betweenRing}

        <!-- Synchronized Number Line & Hops -->
        <text x="${xZero}" y="${yLine - 14}" fill="#64748B" font-family="Nunito, sans-serif" font-weight="800" font-size="11">Number Line:</text>
        ${numLine}
        ${hopsSvg}
      </svg>`;

    // Tools bar
    const toolsBar = document.getElementById('cmToolsBar');
    if (item.mode === 'nonzero') {
      toolsBar.innerHTML = `
        <button class="btn-secondary btn-compact" onclick="stepCmHop()">🐸 Hop +1 cm (${state.cm.hopCount})</button>
        <button class="btn-secondary btn-compact" onclick="allCmHops()">⚡ Show All Hops</button>
        <button class="btn-warning btn-compact" onclick="toggleSlideToZero()">
          ${state.cm.slidToZero ? '↩️ Put Back at ' + item.startCm + ' cm' : '🧲 Slide to 0 cm to Compare'}
        </button>`;
    } else if (item.mode === 'exact') {
      toolsBar.innerHTML = `
        <button class="btn-secondary btn-compact" onclick="stepCmHop()">🐸 Count +1 cm Hops (${state.cm.hopCount})</button>`;
    } else {
      toolsBar.innerHTML = '';
    }
  }

  window.fillCmQuickNum = function (n) {
    const inp = document.getElementById('cmAnsExact');
    if (inp) {
      inp.value = n;
      playPop();
      window.checkCmBenchAnswer();
    }
  };

  window.checkCmBenchAnswer = function () {
    const item = Data.CM_ITEMS[state.cm.itemIndex];
    const msg = document.getElementById('cmFeedbackMsg');
    if (!msg) return;

    if (item.mode === 'between') {
      const low = parseInt(document.getElementById('cmAnsLow')?.value, 10);
      const high = parseInt(document.getElementById('cmAnsHigh')?.value, 10);
      if (low === item.answerLow && high === item.answerHigh) {
        state.cm.solvedIds.add(item.id);
        playCorrect();
        celebrate();
        msg.className = 'feedback-msg ok';
        msg.innerHTML = `🎉 Spot on! The tip stops between <strong>8 cm</strong> and <strong>9 cm</strong>, so it is more than 8 cm and less than 9 cm!`;
        renderCmPillsUpdate();
      } else {
        playWrong();
        msg.className = 'feedback-msg err';
        msg.innerHTML = `🔍 Look closely at the dashed circle on the ruler — which two whole numbers sit to the left and right of the tip?`;
      }
      return;
    }

    const val = parseInt(document.getElementById('cmAnsExact')?.value, 10);
    if (val === item.answer) {
      state.cm.solvedIds.add(item.id);
      playCorrect();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = item.mode === 'nonzero'
        ? `🎉 Awesome! <strong>${item.endCm} cm − ${item.startCm} cm = ${item.answer} cm</strong>!`
        : `🎉 Correct! The ${item.name.toLowerCase()} is <strong>${item.answer} cm</strong> long!`;
      renderCmPillsUpdate();
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      if (item.mode === 'nonzero' && val === item.endCm) {
        msg.innerHTML = `⚠️ Careful! It ends at ${item.endCm} cm, but it started at <strong>${item.startCm} cm</strong> (not 0 cm)! Subtract ${item.endCm} − ${item.startCm}.`;
      } else {
        msg.innerHTML = `🔍 Try counting +1 cm hops from ${item.startCm} cm to ${item.endCm} cm!`;
      }
    }
  };

  function renderCmPillsUpdate() {
    const pillsEl = document.getElementById('cmItemPills');
    if (!pillsEl) return;
    pillsEl.innerHTML = Data.CM_ITEMS.map((it, idx) => {
      const done = state.cm.solvedIds.has(it.id) ? ' ✅' : '';
      return `<button class="item-chip ${idx === state.cm.itemIndex ? 'active' : ''}" onclick="selectCmItem(${idx})">${it.name}${done}</button>`;
    }).join('');
  }

  window.nextCmItem = function () {
    const nextIdx = (state.cm.itemIndex + 1) % Data.CM_ITEMS.length;
    window.selectCmItem(nextIdx);
  };

  /* ---------- Sub-view 1B: Faulty Ruler Detective (WS 1 Q3) ---------- */
  function renderFaultyRuler() {
    const f = state.cm.faulty;
    const fr = Data.FAULTY_RULER;
    const xZero = 46;
    const pxPerCm = 48;
    const yRuler = 92;

    const nailX = xZero + fr.nailStartCm * pxPerCm;
    const nailW = (fr.nailEndCm - fr.nailStartCm) * pxPerCm;
    const nailEndX = xZero + fr.nailEndCm * pxPerCm;

    let ticksHtml = '';
    fr.printedMarks.forEach((printedNum, idx) => {
      const x = xZero + idx * pxPerCm;
      ticksHtml += `<line x1="${x}" y1="${yRuler}" x2="${x}" y2="${yRuler + 18}" stroke="#78350F" stroke-width="2.2"/>`;
      if (idx < 15) {
        const mx = x + 0.5 * pxPerCm;
        ticksHtml += `<line x1="${mx}" y1="${yRuler}" x2="${mx}" y2="${yRuler + 11}" stroke="#92400E" stroke-width="1.4"/>`;
      }

      const isWrong5 = idx === 5;
      const isWrong10 = idx === 10;
      const crossed = (isWrong5 && f.crossed5) || (isWrong10 && f.crossed10);
      const fixed = (isWrong5 && f.fixed5) || (isWrong10 && f.fixed10);

      ticksHtml += `
        <g class="faulty-tick-group" onclick="tapFaultyTick(${idx})" style="cursor:pointer">
          <rect x="${x - 16}" y="${yRuler + 21}" width="32" height="28" rx="6" fill="${crossed ? '#FEE2E2' : '#FEF9C3'}" stroke="${crossed ? '#EF4444' : '#CA8A04'}" stroke-width="1.6"/>
          <text x="${x}" y="${yRuler + 40}" text-anchor="middle" fill="#451A03" font-family="JetBrains Mono, monospace" font-weight="800" font-size="14">${printedNum}</text>
          ${crossed ? `<line x1="${x - 11}" y1="${yRuler + 25}" x2="${x + 11}" y2="${yRuler + 45}" stroke="#DC2626" stroke-width="3"/><line x1="${x + 11}" y1="${yRuler + 25}" x2="${x - 11}" y2="${yRuler + 45}" stroke="#DC2626" stroke-width="3"/>` : ''}
          ${fixed ? `<rect x="${x - 16}" y="${yRuler + 54}" width="32" height="24" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/><text x="${x}" y="${yRuler + 71}" text-anchor="middle" fill="#15803D" font-family="JetBrains Mono, monospace" font-weight="900" font-size="14">${idx}</text>` : ''}
        </g>`;
    });

    document.getElementById('faultyRulerStage').innerHTML = `
      <svg viewBox="0 0 820 195" class="responsive-stage-svg">
        <line x1="${nailX}" y1="28" x2="${nailX}" y2="${yRuler + 50}" stroke="#2563EB" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="${nailEndX}" y1="28" x2="${nailEndX}" y2="${yRuler + 50}" stroke="#EF4444" stroke-width="2" stroke-dasharray="5 4"/>
        <foreignObject x="${nailX}" y="28" width="${nailW}" height="46">
          <div xmlns="http://www.w3.org/1999/xhtml" class="stage-obj-wrap">${Data.getObjectSvg('nail', nailW)}</div>
        </foreignObject>
        <rect x="${xZero - 18}" y="${yRuler}" width="${15 * pxPerCm + 36}" height="54" rx="7" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
        ${ticksHtml}
      </svg>`;

    let fixControls = '';
    if (f.crossed5 && !f.fixed5) {
      fixControls += `
        <div class="fix-choice-row">
          <span>✏️ Replace crossed-out <strong>7</strong> (between 4 and 6) with:</span>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(5, 4)">4</button>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(5, 5)">5</button>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(5, 6)">6</button>
        </div>`;
    }
    if (f.crossed10 && !f.fixed10) {
      fixControls += `
        <div class="fix-choice-row">
          <span>✏️ Replace crossed-out <strong>11</strong> (between 9 and 11) with:</span>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(10, 9)">9</button>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(10, 10)">10</button>
          <button class="btn-secondary btn-compact" onclick="fixFaultyMark(10, 12)">12</button>
        </div>`;
    }

    const bothFixed = f.fixed5 && f.fixed10;
    document.getElementById('faultyAnswerPanel').innerHTML = `
      <div class="faulty-status-pills">
        <span class="metric-pill ${f.fixed5 ? 'gold' : ''}">Mistake 1: ${f.fixed5 ? '✅ Fixed to 5' : f.crossed5 ? '✗ Crossed! Pick number' : 'Tap wrong mark #1'}</span>
        <span class="metric-pill ${f.fixed10 ? 'gold' : ''}">Mistake 2: ${f.fixed10 ? '✅ Fixed to 10' : f.crossed10 ? '✗ Crossed! Pick number' : 'Tap wrong mark #2'}</span>
        <button class="btn-secondary btn-compact" onclick="resetFaultyRuler()">🔄 Reset</button>
      </div>
      ${fixControls}
      <div class="answer-sentence" style="margin-top:10px">
        <span>The nail is</span>
        <input type="number" id="faultyNailInput" class="num-input" min="0" max="15" value="${f.nailSolved ? 5 : ''}" placeholder="?">
        <span><strong>cm</strong> long.</span>
        <button class="btn-primary btn-compact" onclick="checkFaultyNail()">Check Nail ✓</button>
      </div>
      <div id="faultyFeedbackMsg" class="feedback-msg ${f.feedback ? 'info' : ''}">${f.feedback}</div>`;
  }

  window.tapFaultyTick = function (idx) {
    const f = state.cm.faulty;
    if (idx === 5) {
      f.crossed5 = true;
      f.feedback = '✅ Good eye! "7" does not belong between 4 and 6. Choose the right number below!';
      playCorrect();
    } else if (idx === 10) {
      f.crossed10 = true;
      f.feedback = '✅ Found it! There cannot be two "11" marks — choose what belongs after 9!';
      playCorrect();
    } else {
      f.feedback = `🔍 The mark "${Data.FAULTY_RULER.printedMarks[idx]}" at position ${idx} is already right! Count 0, 1, 2, 3, 4... to spot the 2 misprints.`;
      playWrong();
    }
    renderFaultyRuler();
  };

  window.fixFaultyMark = function (idx, val) {
    const f = state.cm.faulty;
    if (idx === 5 && val === 5) {
      f.fixed5 = true;
      f.feedback = '🎉 Fixed! Between 4 and 6 is 5 cm!';
      playCorrect();
    } else if (idx === 10 && val === 10) {
      f.fixed10 = true;
      f.feedback = '🎉 Fixed! Between 9 and 11 is 10 cm! Now find the length of the nail (10 cm − 5 cm).';
      playCorrect();
    } else {
      f.feedback = '🔍 Count by 1s along the ruler and try again!';
      playWrong();
    }
    renderFaultyRuler();
  };

  window.checkFaultyNail = function () {
    const f = state.cm.faulty;
    const val = parseInt(document.getElementById('faultyNailInput')?.value, 10);
    const msg = document.getElementById('faultyFeedbackMsg');
    if (!f.fixed5 || !f.fixed10) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🕵️ Tap and fix both misprinted numbers on the ruler first so you can read the true marks!';
      return;
    }
    if (val === 5) {
      f.nailSolved = true;
      playFanfare();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = '🏆 Brilliant Detective Work! You fixed 5 cm and 10 cm, and 10 cm − 5 cm = <strong>5 cm</strong>!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Now that the marks are fixed, the nail goes from 5 cm to 10 cm. Subtract 10 − 5!';
    }
  };

  window.resetFaultyRuler = function () {
    state.cm.faulty = { crossed5: false, crossed10: false, fixed5: false, fixed10: false, nailSolved: false, feedback: '' };
    playPop();
    renderFaultyRuler();
  };

  /* ---------- Sub-view 1C: Curved String Lab (Textbook p. 86) ---------- */
  window.selectCurveItem = function (idx) {
    state.cm.curve.index = idx;
    state.cm.curve.step = 0;
    playPop();
    renderCurveLab();
  };

  window.setCurveStep = function (step) {
    state.cm.curve.step = step;
    if (step === 3) playCorrect();
    else playPop();
    renderCurveLab();
  };

  function renderCurveLab() {
    const cState = state.cm.curve;
    const item = Data.CURVED_LINES[cState.index];
    const xZero = 48;
    const pxPerCm = 48;
    const yRuler = 128;

    document.getElementById('curveItemPills').innerHTML = Data.CURVED_LINES.map((it, idx) => {
      const done = cState.solvedIds.has(it.id) ? ' ✅' : '';
      return `<button class="item-chip ${idx === cState.index ? 'active' : ''}" onclick="selectCurveItem(${idx})">${it.name}${done}</button>`;
    }).join('');

    document.getElementById('curveSpeechBar').innerHTML = `
      <span class="char-avatar">🐭</span>
      <div class="char-text">
        <strong>Momo's Dive Deeper! (${item.badge}):</strong>
        <span>${item.momoQuestion}</span>
      </div>`;

    document.getElementById('curveStepControls').innerHTML = `
      <button class="btn-secondary btn-compact ${cState.step >= 1 ? 'step-done' : ''}" onclick="setCurveStep(1)">1️⃣ Place String on Curve</button>
      <button class="btn-secondary btn-compact ${cState.step >= 2 ? 'step-done' : ''}" onclick="setCurveStep(2)">2️⃣ Cut at End ✂️</button>
      <button class="btn-primary btn-compact ${cState.step === 3 ? 'step-done' : ''}" onclick="setCurveStep(3)">3️⃣ Straighten on Ruler 📏</button>
      <button class="btn-secondary btn-compact" onclick="setCurveStep(0)">🔄 Reset</button>`;

    // Build curve path in stage pixels
    let curvePathD = '';
    let baseColor = '#2563EB';
    let endCurvePt = { x: xZero + item.spanEndCm * pxPerCm, y: 55 };

    if (item.svgType === 'letterS') {
      // Horizontal S between xZero (0 cm) and xZero + 48 (1 cm), path length ~ 144 px (3 cm)
      const x0 = xZero;
      const x1 = xZero + pxPerCm;
      curvePathD = `M ${x0} 68 C ${x0} 18, ${x0 + 24} 18, ${x0 + 24} 52 C ${x0 + 24} 86, ${x1} 86, ${x1} 36`;
      endCurvePt = { x: x1, y: 36 };
      baseColor = '#2563EB';
    } else if (item.svgType === 'greenWave') {
      const x0 = xZero;
      const w = item.spanEndCm * pxPerCm;
      curvePathD = `M ${x0} 58 C ${x0 + w * 0.25} 6, ${x0 + w * 0.45} 106, ${x0 + w * 0.7} 42 C ${x0 + w * 0.85} 10, ${x0 + w * 0.95} 86, ${x0 + w} 54`;
      endCurvePt = { x: x0 + w, y: 54 };
      baseColor = '#64748B';
    } else {
      const x0 = xZero;
      const w = item.spanEndCm * pxPerCm;
      curvePathD = `M ${x0} 62 Q ${x0 + w * 0.16} 10, ${x0 + w * 0.33} 62 T ${x0 + w * 0.66} 62 T ${x0 + w} 62`;
      endCurvePt = { x: x0 + w, y: 62 };
      baseColor = '#DB2777';
    }

    const stringOverlay = cState.step >= 1 && cState.step < 3
      ? `<path d="${curvePathD}" fill="none" stroke="#16A34A" stroke-width="6" stroke-dasharray="8 4" stroke-linecap="round"/>`
      : '';

    const scissorsIcon = cState.step === 2
      ? `<text x="${endCurvePt.x + 8}" y="${endCurvePt.y + 6}" font-size="24">✂️</text>`
      : '';

    const straightLenPx = item.trueLengthCm * pxPerCm;
    const straightString = cState.step === 3
      ? `<g>
          <line x1="${xZero}" y1="104" x2="${xZero + straightLenPx}" y2="104" stroke="#16A34A" stroke-width="7" stroke-linecap="round"/>
          <line x1="${xZero}" y1="96" x2="${xZero}" y2="${yRuler + 50}" stroke="#16A34A" stroke-width="2" stroke-dasharray="4 3"/>
          <line x1="${xZero + straightLenPx}" y1="96" x2="${xZero + straightLenPx}" y2="${yRuler + 50}" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="4 3"/>
          <rect x="${xZero + straightLenPx / 2 - 64}" y="74" width="128" height="22" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
          <text x="${xZero + straightLenPx / 2}" y="89" text-anchor="middle" fill="#15803D" font-family="Nunito, sans-serif" font-weight="900" font-size="12">Straightened String!</text>
        </g>`
      : `<g>
          <line x1="${xZero}" y1="36" x2="${xZero}" y2="${yRuler}" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="4 4"/>
          <line x1="${endCurvePt.x}" y1="36" x2="${endCurvePt.x}" y2="${yRuler}" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="4 4"/>
        </g>`;

    document.getElementById('curveSvgStage').innerHTML = `
      <svg viewBox="0 0 820 205" class="responsive-stage-svg">
        <path d="${curvePathD}" fill="none" stroke="${baseColor}" stroke-width="5" stroke-linecap="round" opacity="${cState.step === 3 ? 0.35 : 1}"/>
        ${stringOverlay}
        ${scissorsIcon}
        ${straightString}
        ${buildHorizontalRulerSvg(yRuler, xZero, pxPerCm, 15, { showZeroArrow: true })}
      </svg>`;

    const extraCompare = item.compareAnswer
      ? `<div class="answer-sentence" style="margin-bottom:8px">
           <span>Compared to 1 cm, the curved letter <strong>S</strong> is</span>
           <select id="curveCompareSel" class="inline-select">
             <option value="">choose...</option>
             <option value="longer than">longer than</option>
             <option value="shorter than">shorter than</option>
             <option value="equal to">equal to</option>
           </select>
           <span><strong>1 cm</strong>.</span>
         </div>`
      : '';

    document.getElementById('curveAnswerPanel').innerHTML = `
      ${extraCompare}
      <div class="answer-sentence">
        <span>The length of this curved line is</span>
        <input type="number" id="curveLenInput" class="num-input" min="1" max="15" placeholder="?">
        <span><strong>cm</strong>.</span>
        <button class="btn-primary btn-compact" onclick="checkCurveAnswer()">Check ✓</button>
      </div>
      <div id="curveFeedbackMsg" class="feedback-msg"></div>`;
  }

  window.checkCurveAnswer = function () {
    const cState = state.cm.curve;
    const item = Data.CURVED_LINES[cState.index];
    const msg = document.getElementById('curveFeedbackMsg');
    const val = parseInt(document.getElementById('curveLenInput')?.value, 10);

    if (cState.step < 3) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🧵 Click <strong>Step 3: Straighten on Ruler</strong> first so you can measure the stretched string accurately!';
      return;
    }

    if (item.compareAnswer) {
      const sel = document.getElementById('curveCompareSel')?.value;
      if (sel !== item.compareAnswer) {
        playWrong();
        msg.className = 'feedback-msg err';
        msg.innerHTML = '🔍 Look at the straightened string: 3 cm is <strong>longer than</strong> 1 cm!';
        return;
      }
    }

    if (val === item.trueLengthCm) {
      cState.solvedIds.add(item.id);
      playCorrect();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = `🎉 Spot on! Once straightened from 0 cm, the string measures <strong>${item.trueLengthCm} cm</strong>!`;
      renderCurveLabPills();
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = `🔍 Follow the red dashed line at the right end of the straightened green string down to the ruler!`;
    }
  };

  function renderCurveLabPills() {
    const el = document.getElementById('curveItemPills');
    if (!el) return;
    el.innerHTML = Data.CURVED_LINES.map((it, idx) => {
      const done = state.cm.curve.solvedIds.has(it.id) ? ' ✅' : '';
      return `<button class="item-chip ${idx === state.cm.curve.index ? 'active' : ''}" onclick="selectCurveItem(${idx})">${it.name}${done}</button>`;
    }).join('');
  }

  /* ==========================================================================
     TAB 2: METRES (m) & SUITABLE UNITS (cm vs m)
     ========================================================================== */
  window.setMetresSubMode = function (sub) {
    state.metres.subMode = sub;
    playPop();

    document.getElementById('mSub_scenes').classList.toggle('active', sub === 'scenes');
    document.getElementById('mSub_units').classList.toggle('active', sub === 'units');

    document.getElementById('metresScenesSection').classList.toggle('hidden', sub !== 'scenes');
    document.getElementById('metresUnitsSection').classList.toggle('hidden', sub !== 'units');

    renderMetresView();
  };

  function renderMetresView() {
    if (state.metres.subMode === 'scenes') renderMetreScene();
    else renderUnitSorter();
  }

  window.selectMetreScene = function (idx) {
    state.metres.sceneIndex = idx;
    state.metres.selectedChoice = null;
    playPop();
    renderMetreScene();
  };

  window.toggleMetreRules = function () {
    state.metres.showRules = !state.metres.showRules;
    playPop();
    renderMetreScene();
  };

  function buildMetreSceneSvg(scene, showRules) {
    if (scene.orientation === 'vertical') {
      // Vertical scene: floor at y=220, 1m stick = 100px tall
      const floorY = 220;
      const unitPx = 95;
      const objHeight = scene.objectRatio * scene.rulesCount * unitPx;
      const objTop = floorY - objHeight;
      const ruleTop = floorY - scene.rulesCount * unitPx;

      let objGraphic = '';
      if (scene.id === 'doorknob') {
        // Full door is 190px tall, doorknob is right at 1m (floorY - 95 = 125)!
        objGraphic = `
          <rect x="240" y="${floorY - 185}" width="110" height="185" rx="4" fill="#D97706" stroke="#78350F" stroke-width="3"/>
          <rect x="254" y="${floorY - 170}" width="82" height="62" rx="3" fill="#F59E0B" stroke="#92400E" stroke-width="2"/>
          <rect x="254" y="${floorY - 82}" width="82" height="66" rx="3" fill="#F59E0B" stroke="#92400E" stroke-width="2"/>
          <circle cx="334" cy="${floorY - unitPx}" r="8" fill="#FDE047" stroke="#78350F" stroke-width="2.5"/>
          <line x1="334" y1="${floorY - unitPx}" x2="435" y2="${floorY - unitPx}" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="5 4"/>
          <text x="295" y="${floorY - 194}" text-anchor="middle" fill="#78350F" font-weight="800" font-size="13">Classroom Door</text>`;
      } else if (scene.id === 'notice_tall') {
        objGraphic = `
          <rect x="200" y="${objTop}" width="190" height="${objHeight}" rx="6" fill="#D97706" stroke="#78350F" stroke-width="4"/>
          <rect x="210" y="${objTop + 10}" width="170" height="${objHeight - 20}" fill="#FBBF24"/>
          <text x="295" y="${objTop + 28}" text-anchor="middle" fill="#78350F" font-weight="900" font-size="13">Class 2A Board</text>
          <rect x="224" y="${objTop + 38}" width="42" height="36" fill="#FFFFFF" stroke="#94A3B8"/>
          <rect x="280" y="${objTop + 40}" width="42" height="36" fill="#E0F2FE" stroke="#0284C7"/>
          <rect x="332" y="${objTop + 38}" width="38" height="36" fill="#DCFCE7" stroke="#16A34A"/>
          <line x1="390" y1="${objTop}" x2="455" y2="${objTop}" stroke="#EF4444" stroke-width="2" stroke-dasharray="5 4"/>`;
      } else {
        // Grandfather clock
        objGraphic = `
          <rect x="255" y="${objTop}" width="80" height="${objHeight}" rx="8" fill="#92400E" stroke="#451A03" stroke-width="3"/>
          <circle cx="295" cy="${objTop + 36}" r="24" fill="#FEF9C3" stroke="#78350F" stroke-width="3"/>
          <line x1="295" y1="${objTop + 36}" x2="295" y2="${objTop + 20}" stroke="#1E293B" stroke-width="2.5"/>
          <line x1="295" y1="${objTop + 36}" x2="309" y2="${objTop + 36}" stroke="#1E293B" stroke-width="2.5"/>
          <rect x="273" y="${objTop + 72}" width="44" height="82" rx="4" fill="#78350F"/>
          <line x1="295" y1="${objTop + 74}" x2="295" y2="${objTop + 126}" stroke="#FACC15" stroke-width="3"/>
          <circle cx="295" cy="${objTop + 130}" r="10" fill="#FACC15"/>
          <line x1="335" y1="${objTop}" x2="455" y2="${objTop}" stroke="#EF4444" stroke-width="2" stroke-dasharray="5 4"/>`;
      }

      const ruleSvg = showRules ? `
        <g>
          <rect x="425" y="${ruleTop}" width="28" height="${unitPx}" rx="4" fill="#FDE047" stroke="#A16207" stroke-width="2.5"/>
          <text x="439" y="${ruleTop + unitPx / 2 + 5}" text-anchor="middle" fill="#451A03" font-weight="900" font-size="13">1 m</text>
          <line x1="418" y1="${ruleTop}" x2="462" y2="${ruleTop}" stroke="#16A34A" stroke-width="2.5"/>
        </g>` : '';

      return `
        <svg viewBox="0 0 680 250" class="responsive-stage-svg">
          <line x1="80" y1="${floorY}" x2="600" y2="${floorY}" stroke="#64748B" stroke-width="3"/>
          ${objGraphic}
          ${ruleSvg}
        </svg>`;
    }

    // Horizontal scenes
    const startX = 70;
    const rulePx = scene.rulesCount >= 4 ? 120 : 170;
    const totalRulesPx = scene.rulesCount * rulePx;
    const objPx = scene.objectRatio * totalRulesPx;

    let objSvg = '';
    if (scene.id === 'whiteboard') {
      objSvg = `<rect x="${startX}" y="34" width="${objPx}" height="96" rx="6" fill="#FFFFFF" stroke="#475569" stroke-width="5"/>
                <text x="${startX + objPx / 2}" y="86" text-anchor="middle" fill="#334155" font-weight="800" font-size="16">Active Primary Whiteboard</text>`;
    } else if (scene.id === 'student_desk') {
      objSvg = `<rect x="${startX}" y="68" width="${objPx}" height="16" rx="4" fill="#FB923C" stroke="#9A3412" stroke-width="2.5"/>
                <rect x="${startX + 10}" y="84" width="10" height="48" fill="#64748B"/>
                <rect x="${startX + objPx - 20}" y="84" width="10" height="48" fill="#64748B"/>`;
    } else if (scene.id === 'teacher_desk') {
      objSvg = `<rect x="${startX}" y="60" width="${objPx}" height="18" rx="4" fill="#B45309" stroke="#78350F" stroke-width="2.5"/>
                <rect x="${startX + 12}" y="78" width="${objPx - 24}" height="54" rx="3" fill="#92400E" stroke="#451A03" stroke-width="2"/>
                <rect x="${startX + 26}" y="38" width="34" height="22" rx="2" fill="#3B82F6"/>`;
    } else if (scene.id === 'notice_len') {
      objSvg = `<rect x="${startX}" y="34" width="${objPx}" height="94" rx="6" fill="#FBBF24" stroke="#92400E" stroke-width="5"/>
                <text x="${startX + objPx / 2}" y="86" text-anchor="middle" fill="#78350F" font-weight="900" font-size="16">Active Primary School • Class 2A</text>`;
    } else if (scene.id === 'shadow') {
      objSvg = `<circle cx="${startX + 18}" cy="52" r="14" fill="#FDBA74" stroke="#9A3412" stroke-width="2"/>
                <rect x="${startX + 8}" y="66" width="20" height="36" rx="5" fill="#38BDF8"/>
                <ellipse cx="${startX + objPx / 2}" cy="118" rx="${objPx / 2}" ry="12" fill="#334155" opacity="0.45"/>
                <text x="${startX + objPx / 2}" y="122" text-anchor="middle" fill="#0F172A" font-weight="800" font-size="12">Cyrus's Shadow</text>`;
    } else if (scene.id === 'pond') {
      objSvg = `<ellipse cx="${startX + objPx / 2}" cy="84" rx="${objPx / 2}" ry="42" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
                <circle cx="${startX + objPx * 0.3}" cy="82" r="16" fill="#4ADE80"/>
                <circle cx="${startX + objPx * 0.72}" cy="90" r="14" fill="#4ADE80"/>
                <text x="${startX + objPx * 0.3}" y="87" text-anchor="middle" font-size="16">🐸</text>`;
    }

    let rulesBar = '';
    if (showRules) {
      for (let r = 0; r < scene.rulesCount; r++) {
        const rx = startX + r * rulePx;
        rulesBar += `
          <rect x="${rx}" y="152" width="${rulePx - 2}" height="28" rx="4" fill="#FDE047" stroke="#A16207" stroke-width="2.5"/>
          <text x="${rx + rulePx / 2}" y="171" text-anchor="middle" fill="#451A03" font-weight="900" font-size="13">1 m rule (#${r + 1})</text>`;
      }
      rulesBar += `
        <line x1="${startX}" y1="34" x2="${startX}" y2="186" stroke="#2563EB" stroke-width="2" stroke-dasharray="4 3"/>
        <line x1="${startX + totalRulesPx}" y1="34" x2="${startX + totalRulesPx}" y2="186" stroke="#16A34A" stroke-width="2.2" stroke-dasharray="5 4"/>
        <line x1="${startX + objPx}" y1="34" x2="${startX + objPx}" y2="186" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="5 4"/>`;
    }

    return `
      <svg viewBox="0 0 680 205" class="responsive-stage-svg">
        ${objSvg}
        ${rulesBar}
      </svg>`;
  }

  function renderMetreScene() {
    const m = state.metres;
    const scene = Data.METRE_SCENES[m.sceneIndex];

    document.getElementById('metreScenePills').innerHTML = Data.METRE_SCENES.map((sc, i) => {
      const done = m.solvedScenes.has(sc.id) ? ' ✅' : '';
      return `<button class="item-chip ${i === m.sceneIndex ? 'active' : ''}" onclick="selectMetreScene(${i})">${sc.icon} ${sc.title}${done}</button>`;
    }).join('');

    document.getElementById('metreSvgStage').innerHTML = `
      <div class="stage-top-meta">
        <span class="badge-pill">${scene.badge}</span>
        <button class="btn-secondary btn-compact" onclick="toggleMetreRules()">
          ${m.showRules ? '🙈 Hide Metre Rules' : '📏 Show Metre Rules'}
        </button>
      </div>
      ${buildMetreSceneSvg(scene, m.showRules)}`;

    const choices = ['less than', 'about', 'more than'];
    const blankDisplay = m.selectedChoice ? `<strong>${m.selectedChoice}</strong>` : '_________';

    document.getElementById('metreAnswerPanel').innerHTML = `
      <div class="answer-sentence large-sentence">
        <span>${scene.sentenceBefore} <span class="blank-slot">${blankDisplay}</span> <strong>${scene.sentenceAfter}</strong></span>
      </div>
      <div class="choice-btn-row">
        ${choices.map(ch => `
          <button class="btn-secondary choice-pill-btn ${m.selectedChoice === ch ? 'selected' : ''}" onclick="pickMetreChoice('${ch}')">
            ${ch}
          </button>`).join('')}
        <button class="btn-primary btn-compact" onclick="nextMetreScene()">Next Scene ➔</button>
      </div>
      <div id="metreFeedbackMsg" class="feedback-msg"></div>`;
  }

  window.pickMetreChoice = function (choice) {
    const m = state.metres;
    const scene = Data.METRE_SCENES[m.sceneIndex];
    m.selectedChoice = choice;
    renderMetreScene();

    const msg = document.getElementById('metreFeedbackMsg');
    if (choice === scene.answer) {
      m.solvedScenes.add(scene.id);
      playCorrect();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = `🎉 Correct! ${scene.tip}`;
      // refresh checkmark on pill
      document.getElementById('metreScenePills').innerHTML = Data.METRE_SCENES.map((sc, i) => {
        const done = m.solvedScenes.has(sc.id) ? ' ✅' : '';
        return `<button class="item-chip ${i === m.sceneIndex ? 'active' : ''}" onclick="selectMetreScene(${i})">${sc.icon} ${sc.title}${done}</button>`;
      }).join('');
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = `🔍 Compare the object's red dashed line with the green dashed end of the ${scene.rulesCount} metre rule${scene.rulesCount > 1 ? 's' : ''}!`;
    }
  };

  window.nextMetreScene = function () {
    const next = (state.metres.sceneIndex + 1) % Data.METRE_SCENES.length;
    window.selectMetreScene(next);
  };

  /* ---------- Sub-view 2B: cm vs m Unit Sorter ---------- */
  function renderUnitSorter() {
    const answers = state.metres.unitAnswers;
    let correctCount = 0;
    Data.UNIT_SORTER_ITEMS.forEach(it => {
      if (answers[it.id] === it.answer) correctCount++;
    });

    const scoreEl = document.getElementById('unitSorterScore');
    if (scoreEl) scoreEl.textContent = `${correctCount} / ${Data.UNIT_SORTER_ITEMS.length} Solved`;

    document.getElementById('unitSorterDeck').innerHTML = Data.UNIT_SORTER_ITEMS.map(it => {
      const picked = answers[it.id];
      const isRight = picked === it.answer;
      const statusClass = !picked ? '' : isRight ? 'card-ok' : 'card-err';
      return `
        <div class="unit-card ${statusClass}">
          <div class="unit-card-top">
            <span class="unit-emoji">${it.icon}</span>
            <span class="badge-pill">${it.badge}</span>
          </div>
          <p class="unit-sentence">
            ${it.before} <span class="blank-slot">${picked || '___'}</span> ${it.after}
          </p>
          <div class="unit-btn-pair">
            <button class="btn-secondary btn-compact ${picked === 'cm' ? 'selected' : ''}" onclick="pickUnitItem('${it.id}', 'cm')">cm</button>
            <button class="btn-secondary btn-compact ${picked === 'm' ? 'selected' : ''}" onclick="pickUnitItem('${it.id}', 'm')">m</button>
          </div>
          ${picked ? `<div class="unit-explain ${isRight ? 'ok' : 'err'}">${isRight ? '✅ ' : '🔍 '}${it.explain}</div>` : ''}
        </div>`;
    }).join('');
  }

  window.pickUnitItem = function (id, unit) {
    const item = Data.UNIT_SORTER_ITEMS.find(x => x.id === id);
    if (!item) return;
    state.metres.unitAnswers[id] = unit;
    if (unit === item.answer) {
      const allDone = Data.UNIT_SORTER_ITEMS.every(x => state.metres.unitAnswers[x.id] === x.answer);
      if (allDone) {
        playFanfare();
        celebrate();
      } else {
        playCorrect();
      }
    } else {
      playWrong();
    }
    renderUnitSorter();
  };

  window.resetUnitSorter = function () {
    state.metres.unitAnswers = {};
    playPop();
    renderUnitSorter();
  };

  /* ==========================================================================
     TAB 3: DRAW STRAIGHT LINES & MOMO'S CHEESE PATH
     ========================================================================== */
  window.setDrawSubMode = function (sub) {
    state.draw.subMode = sub;
    playPop();

    document.getElementById('drawSub_lines').classList.toggle('active', sub === 'lines');
    document.getElementById('drawSub_momo').classList.toggle('active', sub === 'momo');

    document.getElementById('drawLinesSection').classList.toggle('hidden', sub !== 'lines');
    document.getElementById('drawMomoSection').classList.toggle('hidden', sub !== 'momo');

    renderDrawView();
  };

  function renderDrawView() {
    if (state.draw.subMode === 'lines') renderDrawLines();
    else renderMomoPath();
  }

  window.selectDrawChallenge = function (idx) {
    state.draw.challengeIndex = idx;
    state.draw.lineStart = null;
    state.draw.lineEnd = null;
    state.draw.pendingTapStart = null;
    playPop();
    renderDrawLines();
  };

  window.clearDrawnLine = function () {
    state.draw.lineStart = null;
    state.draw.lineEnd = null;
    state.draw.pendingTapStart = null;
    playPop();
    renderDrawLines();
  };

  function renderDrawLines() {
    const d = state.draw;
    const ch = Data.DRAW_CHALLENGES[d.challengeIndex];

    document.getElementById('drawChallengePills').innerHTML = Data.DRAW_CHALLENGES.map((c, idx) => {
      const done = d.solvedChallenges.has(c.id) ? ' ✅' : '';
      return `<button class="item-chip ${idx === d.challengeIndex ? 'active' : ''}" onclick="selectDrawChallenge(${idx})">${c.title}${done}</button>`;
    }).join('');

    document.getElementById('drawInstructionBar').innerHTML = `
      <span class="char-avatar">👧</span>
      <div class="char-text">
        <strong>Ada's Drawing Studio (${ch.badge}):</strong>
        <span>${ch.instruction} <em>(Drag along the ruler edge, OR tap your Start number then your Stop number!)</em></span>
      </div>`;

    drawRulerCanvasUpdate();

    const currentLen = (d.lineStart !== null && d.lineEnd !== null)
      ? Math.abs(d.lineEnd - d.lineStart)
      : null;

    document.getElementById('drawFeedbackPanel').innerHTML = `
      <div class="draw-controls-row">
        <span class="metric-pill blue">
          ${currentLen !== null
            ? `✏️ Drawn: ${Math.min(d.lineStart, d.lineEnd)} cm → ${Math.max(d.lineStart, d.lineEnd)} cm (${currentLen} cm)`
            : d.pendingTapStart !== null
              ? `📍 Started at ${d.pendingTapStart} cm — now tap where to stop!`
              : '✏️ Drag or tap a mark on the ruler to start'}
        </span>
        <button class="btn-secondary btn-compact" onclick="clearDrawnLine()">🗑️ Erase</button>
        <button class="btn-primary btn-compact" onclick="checkDrawnLine()">Check My Line ✓</button>
      </div>
      <div id="drawFeedbackMsg" class="feedback-msg"></div>`;
  }

  function drawRulerCanvasUpdate() {
    const d = state.draw;
    const xZero = 52;
    const pxPerCm = 46;
    const yLineDraw = 96;
    const yRuler = 104;

    const hasLine = d.lineStart !== null && d.lineEnd !== null;
    const sCm = hasLine ? Math.min(d.lineStart, d.lineEnd) : null;
    const eCm = hasLine ? Math.max(d.lineStart, d.lineEnd) : null;

    const lineSvg = hasLine ? `
      <g>
        <line x1="${xZero + sCm * pxPerCm}" y1="${yLineDraw}" x2="${xZero + eCm * pxPerCm}" y2="${yLineDraw}" stroke="#1D4ED8" stroke-width="5.5" stroke-linecap="round"/>
        <circle cx="${xZero + sCm * pxPerCm}" cy="${yLineDraw}" r="5.5" fill="#2563EB"/>
        <circle cx="${xZero + eCm * pxPerCm}" cy="${yLineDraw}" r="5.5" fill="#EF4444"/>
      </g>` : d.pendingTapStart !== null ? `
      <circle cx="${xZero + d.pendingTapStart * pxPerCm}" cy="${yLineDraw}" r="6.5" fill="#2563EB"/>` : '';

    // Zoom Magnifier showing active end or hover tick
    const focusCm = d.lineEnd !== null ? d.lineEnd : (d.pendingTapStart !== null ? d.pendingTapStart : d.hoverTick);
    const zoomCenterX = 720;
    const zoomCenterY = 48;
    let zoomTicks = '';
    for (let z = Math.max(0, focusCm - 1); z <= Math.min(15, focusCm + 1); z++) {
      const dx = (z - focusCm) * 28;
      zoomTicks += `<line x1="${zoomCenterX + dx}" y1="${zoomCenterY + 4}" x2="${zoomCenterX + dx}" y2="${zoomCenterY + 18}" stroke="#78350F" stroke-width="2"/>`;
      zoomTicks += `<text x="${zoomCenterX + dx}" y="${zoomCenterY + 32}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="800" fill="#451A03">${z}</text>`;
    }

    // Tap targets for 0..15 marks
    let tapButtons = '';
    for (let c = 0; c <= 15; c++) {
      const cx = xZero + c * pxPerCm;
      tapButtons += `<rect x="${cx - 18}" y="${yRuler - 26}" width="36" height="84" fill="transparent" style="cursor:crosshair" data-cm="${c}"/>`;
    }

    const container = document.getElementById('drawCanvasContainer');
    container.innerHTML = `
      <svg id="drawInteractiveSvg" viewBox="0 0 800 185" class="responsive-stage-svg draw-touch-svg">
        <!-- Paper background -->
        <rect x="16" y="12" width="768" height="162" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <text x="34" y="36" fill="#64748B" font-family="Nunito, sans-serif" font-weight="800" font-size="13">📄 Drawing Sheet — Drag or Tap Numbers on the Ruler</text>

        <!-- Zoom Lens -->
        <g>
          <circle cx="${zoomCenterX}" cy="${zoomCenterY}" r="38" fill="#FEFCE8" stroke="#0284C7" stroke-width="3"/>
          <rect x="${zoomCenterX - 34}" y="${zoomCenterY + 4}" width="68" height="30" rx="4" fill="#FDE047"/>
          ${zoomTicks}
          <polygon points="${zoomCenterX},${zoomCenterY + 3} ${zoomCenterX - 5},${zoomCenterY - 12} ${zoomCenterX + 5},${zoomCenterY - 12}" fill="#EF4444"/>
          <text x="${zoomCenterX - 46}" y="${zoomCenterY + 4}" text-anchor="end" fill="#0369A1" font-weight="800" font-size="11">🔍 ${focusCm} cm</text>
        </g>

        ${lineSvg}
        ${buildHorizontalRulerSvg(yRuler, xZero, pxPerCm, 15, { showZeroArrow: true })}
        ${tapButtons}
      </svg>`;

    bindDrawRulerEvents();
  }

  function clientToCm(svg, clientX) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = 0;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const raw = (svgP.x - 52) / 46;
    return Math.max(0, Math.min(15, Math.round(raw)));
  }

  function bindDrawRulerEvents() {
    const svg = document.getElementById('drawInteractiveSvg');
    if (!svg) return;

    let dragMoved = false;
    let downCm = null;

    svg.addEventListener('pointerdown', e => {
      const cm = clientToCm(svg, e.clientX);
      downCm = cm;
      dragMoved = false;
      state.draw.isDragging = true;
      state.draw.hoverTick = cm;
      if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId);
    });

    svg.addEventListener('pointermove', e => {
      const cm = clientToCm(svg, e.clientX);
      state.draw.hoverTick = cm;
      if (!state.draw.isDragging) return;
      if (cm !== downCm) {
        dragMoved = true;
        state.draw.pendingTapStart = null;
        state.draw.lineStart = downCm;
        state.draw.lineEnd = cm;
        drawRulerCanvasOnlyRefresh();
      }
    });

    svg.addEventListener('pointerup', e => {
      if (!state.draw.isDragging) return;
      state.draw.isDragging = false;
      const upCm = clientToCm(svg, e.clientX);

      if (!dragMoved) {
        // Tap-Start then Tap-End workflow!
        if (state.draw.pendingTapStart === null) {
          state.draw.pendingTapStart = upCm;
          state.draw.lineStart = null;
          state.draw.lineEnd = null;
          playPop();
        } else if (state.draw.pendingTapStart === upCm) {
          state.draw.pendingTapStart = null;
          playPop();
        } else {
          state.draw.lineStart = state.draw.pendingTapStart;
          state.draw.lineEnd = upCm;
          state.draw.pendingTapStart = null;
          playPop();
        }
      } else {
        playPop();
      }
      renderDrawLines();
    });
  }

  function drawRulerCanvasOnlyRefresh() {
    // Update the drawn line and pill smoothly during drag without detaching pointer listeners
    const d = state.draw;
    const pill = document.querySelector('#drawFeedbackPanel .metric-pill');
    if (pill && d.lineStart !== null && d.lineEnd !== null) {
      const s = Math.min(d.lineStart, d.lineEnd);
      const e = Math.max(d.lineStart, d.lineEnd);
      pill.textContent = `✏️ Drawn: ${s} cm → ${e} cm (${e - s} cm)`;
    }
    const svg = document.getElementById('drawInteractiveSvg');
    if (!svg || d.lineStart === null || d.lineEnd === null) return;
    let preview = svg.querySelector('#liveDragPreview');
    if (!preview) {
      preview = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      preview.setAttribute('id', 'liveDragPreview');
      preview.setAttribute('y1', '96');
      preview.setAttribute('y2', '96');
      preview.setAttribute('stroke', '#1D4ED8');
      preview.setAttribute('stroke-width', '5.5');
      preview.setAttribute('stroke-linecap', 'round');
      svg.appendChild(preview);
    }
    preview.setAttribute('x1', String(52 + d.lineStart * 46));
    preview.setAttribute('x2', String(52 + d.lineEnd * 46));
  }

  window.checkDrawnLine = function () {
    const d = state.draw;
    const ch = Data.DRAW_CHALLENGES[d.challengeIndex];
    const msg = document.getElementById('drawFeedbackMsg');

    if (d.lineStart === null || d.lineEnd === null) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '✏️ Draw a line first! Tap your start number on the ruler, then tap your stop number (or drag across).';
      return;
    }

    const s = Math.min(d.lineStart, d.lineEnd);
    const e = Math.max(d.lineStart, d.lineEnd);
    const len = e - s;

    if (ch.requiredStart !== null && s !== ch.requiredStart) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = `🔍 This challenge asks you to start right at the <strong>${ch.requiredStart} cm</strong> mark! (${ch.hint})`;
      return;
    }

    if (len === ch.targetLength) {
      d.solvedChallenges.add(ch.id);
      playCorrect();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = `🎉 Awesome! From <strong>${s} cm</strong> to <strong>${e} cm</strong> is a straight line of <strong>${len} cm</strong>!`;
      document.getElementById('drawChallengePills').innerHTML = Data.DRAW_CHALLENGES.map((c, idx) => {
        const done = d.solvedChallenges.has(c.id) ? ' ✅' : '';
        return `<button class="item-chip ${idx === d.challengeIndex ? 'active' : ''}" onclick="selectDrawChallenge(${idx})">${c.title}${done}</button>`;
      }).join('');
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = `🔍 Your line is <strong>${len} cm</strong> long (${e} − ${s} = ${len}), but we need <strong>${ch.targetLength} cm</strong>! ${ch.hint}`;
    }
  };

  /* ---------- Sub-view 3B: Momo's Path to the Cheese (WS 2 Q2) ---------- */
  function renderMomoPath() {
    const m = state.draw.momo;
    const dots = Data.MOMO_PATH.dots;
    const px = 44; // 1 cm = 44 px
    const ox = 40;
    const oy = 16;

    const allConnected = m.connectedIndex >= dots.length - 1;
    const nextLetter = !allConnected ? dots[m.connectedIndex + 1].label : 'Done!';

    document.getElementById('momoSpeechBar').innerHTML = `
      <span class="char-avatar">🐭</span>
      <div class="char-text">
        <strong>Help Momo Reach the Cheese! (${Data.MOMO_PATH.badge}):</strong>
        <span>${allConnected
          ? '🎉 Momo reached the cheese! Now place the ruler on segment <strong>D–E</strong> and measure its length!'
          : `Momo is at <strong>${dots[m.connectedIndex].label}</strong>! Tap red dot <strong>${nextLetter}</strong> next to join A → H in alphabetical order!`}</span>
      </div>`;

    let linesSvg = '';
    for (let i = 0; i < m.connectedIndex; i++) {
      const p1 = dots[i];
      const p2 = dots[i + 1];
      const isDE = p1.label === 'D' && p2.label === 'E';
      linesSvg += `<line x1="${ox + p1.xCm * px}" y1="${oy + p1.yCm * px}" x2="${ox + p2.xCm * px}" y2="${oy + p2.yCm * px}" stroke="${isDE ? '#EF4444' : '#2563EB'}" stroke-width="${isDE ? 4.5 : 3.5}" stroke-linecap="round"/>`;
    }

    let dotsSvg = '';
    dots.forEach((pt, idx) => {
      const cx = ox + pt.xCm * px;
      const cy = oy + pt.yCm * px;
      const visited = idx <= m.connectedIndex;
      const isNext = idx === m.connectedIndex + 1;
      dotsSvg += `
        <g onclick="tapMomoDot(${idx})" style="cursor:pointer">
          ${isNext ? `<circle cx="${cx}" cy="${cy}" r="16" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 2"/>` : ''}
          <circle cx="${cx}" cy="${cy}" r="9" fill="${visited ? '#16A34A' : '#EF4444'}" stroke="#FFFFFF" stroke-width="2.5"/>
          <text x="${cx - 15}" y="${cy - 10}" text-anchor="middle" fill="#1E293B" font-family="Nunito, sans-serif" font-weight="900" font-size="15">${pt.label}</text>
        </g>`;
    });

    // Optional cm ruler placed directly under D-E (D is at xCm=6, yCm=5.6; E is at xCm=10, yCm=5.6)
    let rulerOverlay = '';
    if (m.showRuler) {
      const dPt = dots[3]; // D
      const rulerZeroX = m.offsetMode ? (ox + (dPt.xCm - 3) * px) : (ox + dPt.xCm * px);
      const rulerY = oy + dPt.yCm * px + 10;
      rulerOverlay = buildHorizontalRulerSvg(rulerY, rulerZeroX, px, 10, { height: 46 });
    }

    const momoPos = allConnected ? dots[dots.length - 1] : dots[m.connectedIndex];
    const cheesePt = dots[dots.length - 1];

    document.getElementById('momoStageContainer').innerHTML = `
      <svg viewBox="0 0 760 335" class="responsive-stage-svg">
        <rect x="12" y="8" width="736" height="318" rx="14" fill="#FFFBEB" stroke="#FDE68A" stroke-width="2.5"/>
        ${linesSvg}
        ${dotsSvg}
        <text x="${ox + momoPos.xCm * px - 26}" y="${oy + momoPos.yCm * px + 10}" font-size="28">🐭</text>
        <text x="${ox + cheesePt.xCm * px + 22}" y="${oy + cheesePt.yCm * px + 10}" font-size="30">🧀</text>
        ${rulerOverlay}
      </svg>`;

    document.getElementById('momoAnswerPanel').innerHTML = `
      <div class="draw-controls-row">
        <button class="btn-warning btn-compact" onclick="toggleMomoRuler()">
          ${m.showRuler ? '🙈 Hide Ruler on D–E' : '📏 Place Ruler on Line D–E'}
        </button>
        ${m.showRuler ? `<button class="btn-secondary btn-compact" onclick="toggleMomoRulerOffset()">${m.offsetMode ? '🧲 Align D at 0 cm' : '↔️ Try D at 3 cm'}</button>` : ''}
        <button class="btn-secondary btn-compact" onclick="resetMomoPath()">🔄 Restart Path</button>
      </div>
      <div class="answer-sentence" style="margin-top:10px">
        <span>The length of the line from points <strong>D to E</strong> is about</span>
        <input type="number" id="momoDeInput" class="num-input" min="1" max="15" value="${m.deSolved ? 4 : ''}" placeholder="?">
        <span><strong>cm</strong>.</span>
        <button class="btn-primary btn-compact" onclick="checkMomoDeAnswer()">Check ✓</button>
      </div>
      <div id="momoFeedbackMsg" class="feedback-msg"></div>`;
  }

  window.tapMomoDot = function (idx) {
    const m = state.draw.momo;
    const msg = document.getElementById('momoFeedbackMsg');
    if (idx === m.connectedIndex + 1) {
      m.connectedIndex = idx;
      if (idx === Data.MOMO_PATH.dots.length - 1) {
        m.showRuler = true;
        playFanfare();
        celebrate();
      } else {
        playPop();
      }
      renderMomoPath();
    } else if (idx <= m.connectedIndex) {
      playPop();
    } else {
      playWrong();
      if (msg) {
        msg.className = 'feedback-msg err';
        msg.innerHTML = `🐭 Go in alphabetical order! After <strong>${Data.MOMO_PATH.dots[m.connectedIndex].label}</strong> comes <strong>${Data.MOMO_PATH.dots[m.connectedIndex + 1].label}</strong>!`;
      }
    }
  };

  window.toggleMomoRuler = function () {
    state.draw.momo.showRuler = !state.draw.momo.showRuler;
    playPop();
    renderMomoPath();
  };

  window.toggleMomoRulerOffset = function () {
    state.draw.momo.offsetMode = !state.draw.momo.offsetMode;
    playPop();
    renderMomoPath();
  };

  window.resetMomoPath = function () {
    state.draw.momo = { connectedIndex: 0, showRuler: false, offsetMode: false, deSolved: false };
    playPop();
    renderMomoPath();
  };

  window.checkMomoDeAnswer = function () {
    const m = state.draw.momo;
    const val = parseInt(document.getElementById('momoDeInput')?.value, 10);
    const msg = document.getElementById('momoFeedbackMsg');
    if (m.connectedIndex < 4) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🐭 Connect the dots at least up to D → E first, then place the ruler!';
      return;
    }
    if (val === Data.MOMO_PATH.deLengthCm) {
      m.deSolved = true;
      playCorrect();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = m.offsetMode
        ? '🎉 Super! Even with D at 3 cm and E at 7 cm, 7 cm − 3 cm = <strong>4 cm</strong>!'
        : '🎉 Correct! Line D–E is <strong>4 cm</strong> long — and Momo loves the cheese!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Click <strong>Place Ruler on Line D–E</strong> and read how many cm go from D to E!';
    }
  };

  /* ==========================================================================
     TAB 4: COMPARE LENGTHS (cm & m)
     ========================================================================== */
  window.setCompareSubMode = function (sub) {
    state.compare.subMode = sub;
    playPop();

    ['aligned', 'flowers', 'bathroom', 'giraffes'].forEach(k => {
      const btn = document.getElementById(`compSub_${k}`);
      if (btn) btn.classList.toggle('active', k === sub);
    });

    renderCompareView();
  };

  function renderCompareView() {
    const sub = state.compare.subMode;
    if (sub === 'aligned') renderCompareAligned();
    else if (sub === 'flowers') renderCompareFlowers();
    else if (sub === 'bathroom') renderCompareBathroom();
    else renderCompareGiraffes();
  }

  /* ---------- 4A: Aligned at 0 cm (Pencils & WS 3 Q1) ---------- */
  window.setAlignedPart = function (part) {
    state.compare.alignedPart = part;
    playPop();
    renderCompareAligned();
  };

  function renderCompareAligned() {
    const part = state.compare.alignedPart;
    const xZero = 52;
    const pxPerCm = 46;
    const items = part === 'pencils'
      ? Data.COMPARE_SCENES.aligned.pencils
      : Data.COMPARE_SCENES.aligned.wsItems;

    const rowHeight = 42;
    const yRuler = 24 + items.length * rowHeight;

    let rowsSvg = `<line x1="${xZero}" y1="16" x2="${xZero}" y2="${yRuler + 50}" stroke="#2563EB" stroke-width="2" stroke-dasharray="5 4"/>`;
    items.forEach((it, idx) => {
      const y = 18 + idx * rowHeight;
      const w = it.end * pxPerCm;
      rowsSvg += `
        <line x1="${xZero + w}" y1="${y + 14}" x2="${xZero + w}" y2="${yRuler}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 3"/>
        <foreignObject x="${xZero}" y="${y}" width="${w}" height="36">
          <div xmlns="http://www.w3.org/1999/xhtml" class="stage-obj-wrap">${Data.getObjectSvg(it.svgId, w)}</div>
        </foreignObject>
        <text x="${xZero + w + 8}" y="${y + 22}" fill="#1E293B" font-family="Nunito, sans-serif" font-weight="800" font-size="13">${it.name} (${it.end} cm)</text>`;
    });

    const questionsHtml = part === 'pencils' ? `
      <div class="comp-questions-stack">
        <div class="comp-q-row">1. Ada's pencil is the <select id="al_p1" class="inline-select"><option value="">choose...</option><option value="longest">longest</option><option value="shortest">shortest</option></select>, and Vera's pencil is the <select id="al_p2" class="inline-select"><option value="">choose...</option><option value="longest">longest</option><option value="shortest">shortest</option></select>.</div>
        <div class="comp-q-row">2. Ada's pencil (15 cm) is <input type="number" id="al_p3" class="num-input" placeholder="?"> cm <strong>longer than</strong> Cyrus's pencil (14 cm).</div>
        <div class="comp-q-row">3. Vera's pencil (9 cm) is <input type="number" id="al_p4" class="num-input" placeholder="?"> cm <strong>shorter than</strong> Ada's pencil (15 cm).</div>
        <button class="btn-primary btn-compact" onclick="checkCompareAligned()">Check Answers ✓</button>
        <div id="compAlignedMsg" class="feedback-msg"></div>
      </div>` : `
      <div class="comp-questions-stack">
        <div class="comp-q-row">a. The spoon (12 cm) is <input type="number" id="al_w1" class="num-input" placeholder="?"> cm shorter than the <select id="al_w2" class="inline-select"><option value="">choose...</option><option value="straw">straw</option><option value="hair clip">hair clip</option><option value="clothes peg">clothes peg</option></select>.</div>
        <div class="comp-q-row">b. The clothes peg (6 cm) is <input type="number" id="al_w3" class="num-input" placeholder="?"> cm shorter than the straw (15 cm).</div>
        <div class="comp-q-row">c. The spoon (12 cm) is 8 cm <select id="al_w4" class="inline-select"><option value="">choose...</option><option value="longer than">longer than</option><option value="shorter than">shorter than</option></select> the hair clip (4 cm).</div>
        <button class="btn-primary btn-compact" onclick="checkCompareAligned()">Check Answers ✓</button>
        <div id="compAlignedMsg" class="feedback-msg"></div>
      </div>`;

    document.getElementById('compareDynamicContainer').innerHTML = `
      <div class="item-pill-strip">
        <button class="item-chip ${part === 'pencils' ? 'active' : ''}" onclick="setAlignedPart('pencils')">✏️ Ada, Cyrus &amp; Vera's Pencils (TB pp. 88–89)</button>
        <button class="item-chip ${part === 'desk' ? 'active' : ''}" onclick="setAlignedPart('desk')">🥄 Clip, Peg, Spoon &amp; Straw (WS 3 Q1)</button>
      </div>
      <div class="ruler-stage-box">
        <svg viewBox="0 0 840 ${yRuler + 82}" class="responsive-stage-svg">
          ${rowsSvg}
          ${buildHorizontalRulerSvg(yRuler, xZero, pxPerCm, 15, { showZeroArrow: true })}
        </svg>
      </div>
      ${questionsHtml}`;
  }

  window.checkCompareAligned = function () {
    const msg = document.getElementById('compAlignedMsg');
    if (state.compare.alignedPart === 'pencils') {
      const p1 = document.getElementById('al_p1')?.value;
      const p2 = document.getElementById('al_p2')?.value;
      const p3 = parseInt(document.getElementById('al_p3')?.value, 10);
      const p4 = parseInt(document.getElementById('al_p4')?.value, 10);
      if (p1 === 'longest' && p2 === 'shortest' && p3 === 1 && p4 === 6) {
        playFanfare();
        celebrate();
        msg.className = 'feedback-msg ok';
        msg.innerHTML = '🎉 All 3 correct! 15 − 14 = 1 cm, and 15 − 9 = 6 cm!';
      } else {
        playWrong();
        msg.className = 'feedback-msg err';
        msg.innerHTML = '🔍 Check each blank: Ada = 15 cm, Cyrus = 14 cm, Vera = 9 cm!';
      }
    } else {
      const w1 = parseInt(document.getElementById('al_w1')?.value, 10);
      const w2 = document.getElementById('al_w2')?.value;
      const w3 = parseInt(document.getElementById('al_w3')?.value, 10);
      const w4 = document.getElementById('al_w4')?.value;
      if (w1 === 3 && w2 === 'straw' && w3 === 9 && w4 === 'longer than') {
        playFanfare();
        celebrate();
        msg.className = 'feedback-msg ok';
        msg.innerHTML = '🎉 Perfect! Spoon (12 cm) is 3 cm shorter than Straw (15 cm), Peg (6 cm) is 9 cm shorter than Straw, and Spoon is 8 cm longer than Hair clip (4 cm)!';
      } else {
        playWrong();
        msg.className = 'feedback-msg err';
        msg.innerHTML = '🔍 Check your subtractions: Straw = 15 cm, Spoon = 12 cm, Clothes peg = 6 cm, Hair clip = 4 cm!';
      }
    }
  };

  /* ---------- 4B: Vertical Flower Ruler (Textbook p. 89 Dive deeper!) ---------- */
  function renderCompareFlowers() {
    const yZero = 22;
    const px = 14; // 0..20 cm => 280px tall
    const rulerX = 95;

    let vTicks = '';
    for (let c = 0; c <= 20; c++) {
      const y = yZero + c * px;
      vTicks += `<line x1="${rulerX + 42}" y1="${y}" x2="${rulerX + 28}" y2="${y}" stroke="#78350F" stroke-width="1.8"/>`;
      vTicks += `<text x="${rulerX + 16}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="10" fill="#451A03">${c}</text>`;
    }

    const drawFlower = (fl, xCenter) => {
      const yTop = yZero + fl.topCm * px;
      const yBot = yZero + fl.bottomCm * px;
      return `
        <line x1="${rulerX + 42}" y1="${yTop}" x2="${xCenter}" y2="${yTop}" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="${rulerX + 42}" y1="${yBot}" x2="${xCenter}" y2="${yBot}" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="${xCenter}" y1="${yTop + 16}" x2="${xCenter}" y2="${yBot}" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="${xCenter + 9}" cy="${(yTop + yBot) / 2 + 12}" rx="10" ry="5" fill="#22C55E" transform="rotate(-25 ${xCenter + 9} ${(yTop + yBot) / 2 + 12})"/>
        <circle cx="${xCenter}" cy="${yTop + 12}" r="12" fill="${fl.color}" stroke="#78350F" stroke-width="1.8"/>
        <circle cx="${xCenter}" cy="${yTop + 12}" r="5" fill="#FEF08A"/>
        <text x="${xCenter}" y="${yBot + 16}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#1E293B">${fl.name}</text>
        <text x="${xCenter}" y="${yBot + 30}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="11" fill="#64748B">(${fl.topCm}→${fl.bottomCm} cm)</text>`;
    };

    const fls = Data.COMPARE_SCENES.flowers.items;

    document.getElementById('compareDynamicContainer').innerHTML = `
      <div class="character-speech-bar">
        <span class="char-avatar">👧</span>
        <div class="char-text">
          <strong>Dive Deeper! Vertical Flower Ruler (Textbook p. 89):</strong>
          <span>Momo notices the flowers are <strong>not placed at 0 cm</strong>! Ada says: <em>"Find the height of each flower first before comparing them!"</em></span>
        </div>
      </div>
      <div class="flowers-split-grid">
        <div class="ruler-stage-box">
          <svg viewBox="0 0 420 345" class="responsive-stage-svg">
            <rect x="${rulerX}" y="${yZero - 10}" width="42" height="${20 * px + 20}" rx="6" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
            ${vTicks}
            ${drawFlower(fls[0], 205)}
            ${drawFlower(fls[1], 280)}
            ${drawFlower(fls[2], 355)}
          </svg>
        </div>

        <div class="comp-questions-stack">
          <h4>Step 1: Find each flower's height</h4>
          <div class="comp-q-row">🌷 Tulip (2 cm to 16 cm): <input type="number" id="fl_tulip" class="num-input" value="14"> cm</div>
          <div class="comp-q-row">🌹 Rose (10 cm to 19 cm): <input type="number" id="fl_rose" class="num-input" value="9"> cm</div>
          <div class="comp-q-row">🌼 Daisy (1 cm to 12 cm): <input type="number" id="fl_daisy" class="num-input" placeholder="?"> cm</div>

          <h4 style="margin-top:8px">Step 2: Compare the flowers</h4>
          <div class="comp-q-row">• The daisy is <input type="number" id="fl_c1" class="num-input" placeholder="?"> cm <strong>shorter than</strong> the tulip and <input type="number" id="fl_c2" class="num-input" placeholder="?"> cm <strong>taller than</strong> the rose.</div>
          <div class="comp-q-row">• The tulip is <input type="number" id="fl_c3" class="num-input" placeholder="?"> cm <select id="fl_c4" class="inline-select"><option value="">choose...</option><option value="taller">taller</option><option value="shorter">shorter</option></select> than the rose and <input type="number" id="fl_c5" class="num-input" placeholder="?"> cm <select id="fl_c6" class="inline-select"><option value="">choose...</option><option value="taller">taller</option><option value="shorter">shorter</option></select> than the daisy.</div>
          <button class="btn-primary btn-compact" onclick="checkCompareFlowers()">Check Flowers ✓</button>
          <div id="compFlowersMsg" class="feedback-msg"></div>
        </div>
      </div>`;
  }

  window.checkCompareFlowers = function () {
    const msg = document.getElementById('compFlowersMsg');
    const t = parseInt(document.getElementById('fl_tulip')?.value, 10);
    const r = parseInt(document.getElementById('fl_rose')?.value, 10);
    const d = parseInt(document.getElementById('fl_daisy')?.value, 10);
    const c1 = parseInt(document.getElementById('fl_c1')?.value, 10);
    const c2 = parseInt(document.getElementById('fl_c2')?.value, 10);
    const c3 = parseInt(document.getElementById('fl_c3')?.value, 10);
    const c4 = document.getElementById('fl_c4')?.value;
    const c5 = parseInt(document.getElementById('fl_c5')?.value, 10);
    const c6 = document.getElementById('fl_c6')?.value;

    if (d !== 11 || t !== 14 || r !== 9) {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Check Step 1 first! Daisy goes from 1 cm to 12 cm → 12 − 1 = <strong>11 cm</strong>!';
      return;
    }
    if (c1 === 3 && c2 === 2 && c3 === 5 && c4 === 'taller' && c5 === 3 && c6 === 'taller') {
      playFanfare();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = '🎉 Brilliant! Tulip (14 cm) > Daisy (11 cm) > Rose (9 cm)!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Now use Tulip = 14 cm, Daisy = 11 cm, and Rose = 9 cm to check the differences!';
    }
  };

  /* ---------- 4C: Non-Zero Bathroom Objects (Workbook p. 66 Q2) ---------- */
  window.toggleBathroomSlide = function () {
    state.compare.bathroomSlideZero = !state.compare.bathroomSlideZero;
    playPop();
    renderCompareBathroom();
  };

  function renderCompareBathroom() {
    const slideZero = state.compare.bathroomSlideZero;
    const xZero = 52;
    const pxPerCm = 46;
    const items = Data.COMPARE_SCENES.bathroom.items;
    const yRuler = 196;

    let rowsSvg = '';
    items.forEach((it, idx) => {
      const s = slideZero ? 0 : it.start;
      const e = slideZero ? it.length : it.end;
      const y = 18 + idx * 42;
      const x = xZero + s * pxPerCm;
      const w = (e - s) * pxPerCm;
      rowsSvg += `
        <line x1="${x}" y1="${y + 14}" x2="${x}" y2="${yRuler}" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="${x + w}" y1="${y + 14}" x2="${x + w}" y2="${yRuler}" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4 3"/>
        <foreignObject x="${x}" y="${y}" width="${w}" height="36">
          <div xmlns="http://www.w3.org/1999/xhtml" class="stage-obj-wrap">${Data.getObjectSvg(it.svgId, w)}</div>
        </foreignObject>
        <text x="${x + w + 8}" y="${y + 22}" fill="#1E293B" font-family="Nunito, sans-serif" font-weight="800" font-size="12">${it.name} (${s}→${e} cm)</text>`;
    });

    document.getElementById('compareDynamicContainer').innerHTML = `
      <div class="stage-top-meta">
        <span class="tip-inline-clean">🕵️ <strong>Workbook p. 66 Q2 Trap Alert:</strong> Soap ends at 14 cm while Toothbrush ends at 13 cm — find each true length first!</span>
        <button class="btn-warning btn-compact" onclick="toggleBathroomSlide()">
          ${slideZero ? '↩️ Restore Original Offsets' : '🧲 Slide All to 0 cm to Check!'}
        </button>
      </div>
      <div class="ruler-stage-box">
        <svg viewBox="0 0 850 278" class="responsive-stage-svg">
          ${rowsSvg}
          ${buildHorizontalRulerSvg(yRuler, xZero, pxPerCm, 15, { showZeroArrow: slideZero })}
        </svg>
      </div>
      <div class="comp-questions-stack">
        <div class="comp-q-row">a. The <select id="ba_a" class="inline-select"><option value="">choose...</option><option value="comb">comb</option><option value="toothbrush">toothbrush</option><option value="nail clipper">nail clipper</option><option value="bar of soap">bar of soap</option></select> has the <strong>longest</strong> length.</div>
        <div class="comp-q-row">b. The <select id="ba_b" class="inline-select"><option value="">choose...</option><option value="comb">comb</option><option value="toothbrush">toothbrush</option><option value="nail clipper">nail clipper</option><option value="bar of soap">bar of soap</option></select> has the <strong>shortest</strong> length.</div>
        <div class="comp-q-row">c. The comb is <input type="number" id="ba_c1" class="num-input" placeholder="?"> cm <select id="ba_c2" class="inline-select"><option value="">choose...</option><option value="longer than">longer than</option><option value="shorter than">shorter than</option></select> the nail clipper.</div>
        <div class="comp-q-row">d. The bar of soap is <input type="number" id="ba_d" class="num-input" placeholder="?"> cm shorter than the toothbrush.</div>
        <div class="comp-q-row">e. The toothbrush is <input type="number" id="ba_e1" class="num-input" placeholder="?"> cm shorter than the <select id="ba_e2" class="inline-select"><option value="">choose...</option><option value="comb">comb</option><option value="bar of soap">bar of soap</option><option value="nail clipper">nail clipper</option></select>.</div>
        <button class="btn-primary btn-compact" onclick="checkCompareBathroom()">Check Bathroom Shelf ✓</button>
        <div id="compBathroomMsg" class="feedback-msg"></div>
      </div>`;
  }

  window.checkCompareBathroom = function () {
    const msg = document.getElementById('compBathroomMsg');
    const a = document.getElementById('ba_a')?.value;
    const b = document.getElementById('ba_b')?.value;
    const c1 = parseInt(document.getElementById('ba_c1')?.value, 10);
    const c2 = document.getElementById('ba_c2')?.value;
    const d = parseInt(document.getElementById('ba_d')?.value, 10);
    const e1 = parseInt(document.getElementById('ba_e1')?.value, 10);
    const e2 = document.getElementById('ba_e2')?.value;

    if (a === 'comb' && b === 'nail clipper' && c1 === 10 && c2 === 'longer than' && d === 3 && e1 === 4 && e2 === 'comb') {
      playFanfare();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = '🏆 Superstar! Comb = 15 cm, Toothbrush = 11 cm, Soap = 8 cm, Nail clipper = 5 cm!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Subtract each item\'s start from its end: Comb = 15−0 = 15 cm, Toothbrush = 13−2 = 11 cm, Clipper = 10−5 = 5 cm, Soap = 14−6 = 8 cm!';
    }
  };

  /* ---------- 4D: Planes & 5 Giraffes in Metres (TB p. 89 & WS 3 Q3) ---------- */
  window.setMetreComparePart = function (part) {
    state.compare.metrePart = part;
    playPop();
    renderCompareGiraffes();
  };

  window.tapGiraffeOrder = function (letter) {
    const arr = state.compare.giraffeOrder;
    const idx = arr.indexOf(letter);
    if (idx >= 0) arr.splice(idx, 1);
    else if (arr.length < 5) arr.push(letter);
    playPop();
    renderCompareGiraffes();
  };

  window.clearGiraffeOrder = function () {
    state.compare.giraffeOrder = [];
    playPop();
    renderCompareGiraffes();
  };

  function renderCompareGiraffes() {
    const part = state.compare.metrePart;

    if (part === 'planes') {
      const planes = Data.COMPARE_SCENES.giraffes.planes;
      document.getElementById('compareDynamicContainer').innerHTML = `
        <div class="item-pill-strip">
          <button class="item-chip" onclick="setMetreComparePart('giraffes')">🦒 5 Giraffes Safari (WS 3 Q3)</button>
          <button class="item-chip active" onclick="setMetreComparePart('planes')">✈️ 3 Aeroplanes (Textbook p. 89)</button>
        </div>
        <div class="planes-showcase">
          ${planes.map(p => `
            <div class="plane-bar-row">
              <span class="plane-label">✈️ <strong>${p.name}</strong></span>
              <div class="plane-visual-bar" style="width:${(p.length / 60) * 72}%; background:${p.color}">${p.length} m</div>
            </div>`).join('')}
        </div>
        <div class="comp-questions-stack">
          <div class="comp-q-row">• Aeroplane C (60 m) is <strong>20 m longer than</strong> Aeroplane B (40 m) and <strong>10 m longer than</strong> Aeroplane A (50 m).</div>
          <div class="comp-q-row">• Aeroplane B (40 m) is <input type="number" id="pl_1" class="num-input" placeholder="?"> m <strong>shorter than</strong> Aeroplane A (50 m) and 20 m <select id="pl_2" class="inline-select"><option value="">choose...</option><option value="shorter">shorter</option><option value="longer">longer</option></select> than Aeroplane C (60 m).</div>
          <button class="btn-primary btn-compact" onclick="checkComparePlanes()">Check Aeroplanes ✓</button>
          <div id="compPlanesMsg" class="feedback-msg"></div>
        </div>`;
      return;
    }

    // 5 Giraffes A..E beside 6 stacked 1-m sticks
    const herd = Data.COMPARE_SCENES.giraffes.herd;
    const groundY = 232;
    const mPx = 32; // 6 m = 192 px

    let guidesSvg = '';
    [3, 4, 5, 6].forEach(h => {
      const y = groundY - h * mPx;
      guidesSvg += `<line x1="50" y1="${y}" x2="615" y2="${y}" stroke="#94A3B8" stroke-width="1.4" stroke-dasharray="5 4"/>`;
    });

    let sticksSvg = '';
    for (let m = 0; m < 6; m++) {
      const y = groundY - (m + 1) * mPx;
      const xOff = m % 2 === 0 ? 608 : 622;
      sticksSvg += `
        <rect x="${xOff}" y="${y}" width="22" height="${mPx}" rx="3" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        <text x="${xOff + 36}" y="${y + 20}" font-family="JetBrains Mono, monospace" font-weight="800" font-size="11" fill="#334155">${m + 1} m</text>`;
    }

    let giraffesSvg = '';
    herd.forEach((g, idx) => {
      const gx = 95 + idx * 105;
      const topY = groundY - g.height * mPx;
      const bodyY = groundY - 56;
      giraffesSvg += `
        <g>
          <!-- Legs -->
          <line x1="${gx - 10}" y1="${bodyY + 14}" x2="${gx - 10}" y2="${groundY}" stroke="#D97706" stroke-width="5"/>
          <line x1="${gx + 10}" y1="${bodyY + 14}" x2="${gx + 10}" y2="${groundY}" stroke="#D97706" stroke-width="5"/>
          <!-- Body -->
          <ellipse cx="${gx}" cy="${bodyY + 6}" rx="20" ry="13" fill="#FBBF24" stroke="#B45309" stroke-width="2.2"/>
          <!-- Long Neck -->
          <line x1="${gx + 8}" y1="${bodyY}" x2="${gx + 10}" y2="${topY + 12}" stroke="#FBBF24" stroke-width="11" stroke-linecap="round"/>
          <circle cx="${gx + 9}" cy="${(bodyY + topY) / 2 + 8}" r="3" fill="#B45309"/>
          <circle cx="${gx - 4}" cy="${bodyY + 5}" r="3.5" fill="#B45309"/>
          <!-- Head & Ossicones -->
          <line x1="${gx + 8}" y1="${topY + 8}" x2="${gx + 6}" y2="${topY}" stroke="#92400E" stroke-width="2.5"/>
          <line x1="${gx + 13}" y1="${topY + 8}" x2="${gx + 15}" y2="${topY}" stroke="#92400E" stroke-width="2.5"/>
          <ellipse cx="${gx + 13}" cy="${topY + 12}" rx="11" ry="7" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
          <circle cx="${gx + 16}" cy="${topY + 11}" r="1.8" fill="#1E293B"/>
          <!-- Label -->
          <rect x="${gx - 18}" y="${groundY + 6}" width="36" height="22" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
          <text x="${gx}" y="${groundY + 21}" text-anchor="middle" font-weight="900" font-size="13" fill="#92400E">${g.id} (${g.height}m)</text>
        </g>`;
    });

    const order = state.compare.giraffeOrder;

    document.getElementById('compareDynamicContainer').innerHTML = `
      <div class="item-pill-strip">
        <button class="item-chip active" onclick="setMetreComparePart('giraffes')">🦒 5 Giraffes Safari (WS 3 Q3)</button>
        <button class="item-chip" onclick="setMetreComparePart('planes')">✈️ 3 Aeroplanes (Textbook p. 89)</button>
      </div>
      <div class="ruler-stage-box">
        <svg viewBox="0 0 700 268" class="responsive-stage-svg">
          <line x1="36" y1="${groundY}" x2="664" y2="${groundY}" stroke="#16A34A" stroke-width="4"/>
          ${guidesSvg}
          ${sticksSvg}
          ${giraffesSvg}
        </svg>
      </div>
      <div class="comp-questions-stack">
        <div class="comp-q-row">a. Giraffe A (3 m) is <strong>as tall as</strong> Giraffe <select id="gi_a" class="inline-select"><option value="">?</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option></select>.</div>
        <div class="comp-q-row">b. Giraffe E (6 m) is <input type="number" id="gi_b" class="num-input" placeholder="?"> m <strong>taller than</strong> Giraffe C (4 m).</div>
        <div class="comp-q-row">c. Giraffe B (5 m) is <input type="number" id="gi_c1" class="num-input" placeholder="?"> m <strong>shorter than</strong> Giraffe <select id="gi_c2" class="inline-select"><option value="">?</option><option value="A">A</option><option value="C">C</option><option value="D">D</option><option value="E">E</option></select>.</div>
        <div class="comp-q-row">d. Giraffe E (6 m) is as tall as the <strong>total heights</strong> of Giraffe <select id="gi_d1" class="inline-select"><option value="">?</option><option value="A">A</option><option value="B">B</option><option value="C">C</option></select> and Giraffe <select id="gi_d2" class="inline-select"><option value="">?</option><option value="B">B</option><option value="C">C</option><option value="D">D</option></select>.</div>
        <div class="comp-q-row">e. Giraffe D (3 m) is <input type="number" id="gi_e" class="num-input" placeholder="?"> m <strong>shorter than</strong> Giraffe E (6 m).</div>

        <div class="giraffe-order-box">
          <div class="order-prompt">f. Tap giraffes to arrange them in order, starting with the <strong>tallest</strong>:</div>
          <div class="order-slots-row">
            ${[0, 1, 2, 3, 4].map(i => `
              <div class="order-slot ${order[i] ? 'filled' : ''}" onclick="${order[i] ? `tapGiraffeOrder('${order[i]}')` : ''}">
                <span>${order[i] || '?'}</span>
                ${i === 0 ? '<small>tallest</small>' : i === 4 ? '<small>shortest</small>' : ''}
              </div>`).join('')}
            <button class="btn-secondary btn-compact" onclick="clearGiraffeOrder()">Clear</button>
          </div>
          <div class="order-pick-row">
            ${['A', 'B', 'C', 'D', 'E'].map(letter => `
              <button class="pad-chip ${order.includes(letter) ? 'used' : ''}" onclick="tapGiraffeOrder('${letter}')">Giraffe ${letter}</button>
            `).join('')}
          </div>
        </div>

        <button class="btn-primary btn-compact" onclick="checkCompareGiraffes()">Check Giraffe Safari ✓</button>
        <div id="compGiraffeMsg" class="feedback-msg"></div>
      </div>`;
  }

  window.checkComparePlanes = function () {
    const p1 = parseInt(document.getElementById('pl_1')?.value, 10);
    const p2 = document.getElementById('pl_2')?.value;
    const msg = document.getElementById('compPlanesMsg');
    if (p1 === 10 && p2 === 'shorter') {
      playFanfare();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = '🎉 Correct! Aeroplane B (40 m) is 10 m shorter than A (50 m) and 20 m shorter than C (60 m)!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = '🔍 Compare 40 m against 50 m (50 − 40 = 10 m) and against 60 m!';
    }
  };

  window.checkCompareGiraffes = function () {
    const msg = document.getElementById('compGiraffeMsg');
    const a = document.getElementById('gi_a')?.value;
    const b = parseInt(document.getElementById('gi_b')?.value, 10);
    const c1 = parseInt(document.getElementById('gi_c1')?.value, 10);
    const c2 = document.getElementById('gi_c2')?.value;
    const d1 = document.getElementById('gi_d1')?.value;
    const d2 = document.getElementById('gi_d2')?.value;
    const e = parseInt(document.getElementById('gi_e')?.value, 10);
    const ord = state.compare.giraffeOrder.join(',');

    const validSum = (d1 === 'A' && d2 === 'D');
    const validOrder = ord === 'E,B,C,A,D' || ord === 'E,B,C,D,A';

    if (a === 'D' && b === 2 && c1 === 1 && c2 === 'E' && validSum && e === 3 && validOrder) {
      playFanfare();
      celebrate();
      msg.className = 'feedback-msg ok';
      msg.innerHTML = '🏆 Zoo Master! Giraffe E (6 m) > B (5 m) > C (4 m) > A & D (3 m), and A + D = 3 m + 3 m = 6 m!';
    } else {
      playWrong();
      msg.className = 'feedback-msg err';
      msg.innerHTML = !validOrder
        ? '🔍 Check part (f): Arrange all 5 giraffes from tallest (6 m) to shortest (3 m), and verify blanks (a)–(e)!'
        : '🔍 Almost there! Double-check each blank: A=3m, B=5m, C=4m, D=3m, E=6m (notice 3m + 3m = 6m!).';
    }
  };

  /* ==========================================================================
     TAB 5: 4-LEVEL MASTERY QUIZ
     ========================================================================== */
  window.startLengthQuiz = function (level) {
    const lvlData = Data.QUIZ_LEVELS[level];
    if (!lvlData) return;

    state.quiz.level = level;
    state.quiz.qIndex = 0;
    state.quiz.score = 0;
    state.quiz.answered = false;
    state.quiz.selectedIdx = null;
    state.quiz.finished = false;

    // Shuffle options per question while tracking correct answer
    state.quiz.questions = lvlData.questions.map(q => {
      const tagged = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correct }));
      const shuffled = window.AppUtils ? window.AppUtils.shuffle(tagged) : tagged;
      return {
        prompt: q.prompt,
        explain: q.explain,
        options: shuffled.map(o => o.text),
        correctIndex: shuffled.findIndex(o => o.isCorrect)
      };
    });

    [1, 2, 3, 4].forEach(l => {
      const b = document.getElementById(`quizLvl_${l}`);
      if (b) b.classList.toggle('active', l === level);
    });

    renderQuizQuestion();
  };

  function renderQuizQuestion() {
    const qz = state.quiz;
    const scorePill = document.getElementById('quizScorePill');
    if (scorePill) scorePill.textContent = `⭐ Score: ${qz.score} / ${qz.questions.length}`;

    const playEl = document.getElementById('quizPlayArea');
    if (qz.finished) {
      const stars = qz.score === 5 ? '⭐⭐⭐' : qz.score >= 4 ? '⭐⭐' : '⭐';
      playEl.innerHTML = `
        <div class="quiz-summary-card">
          <div class="quiz-stars">${stars}</div>
          <h3>${Data.QUIZ_LEVELS[qz.level].title} Complete!</h3>
          <p>You scored <strong>${qz.score} out of ${qz.questions.length}</strong>!</p>
          <div class="choice-btn-row" style="justify-content:center; margin-top:16px">
            <button class="btn-secondary btn-compact" onclick="startLengthQuiz(${qz.level})">🔄 Replay Level ${qz.level}</button>
            ${qz.level < 4 ? `<button class="btn-primary btn-compact" onclick="startLengthQuiz(${qz.level + 1})">Next Level (${qz.level + 1}) ➔</button>` : ''}
          </div>
        </div>`;
      return;
    }

    const cur = qz.questions[qz.qIndex];
    const progressPct = ((qz.qIndex + (qz.answered ? 1 : 0)) / qz.questions.length) * 100;

    playEl.innerHTML = `
      <div class="quiz-progress-row">
        <span class="badge-pill">${Data.QUIZ_LEVELS[qz.level].title}</span>
        <span class="badge-pill">Question ${qz.qIndex + 1} of ${qz.questions.length}</span>
      </div>
      <div class="quiz-progress-track">
        <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
      </div>

      <h3 class="quiz-prompt-text">${cur.prompt}</h3>

      <div class="quiz-options-grid">
        ${cur.options.map((opt, idx) => {
          let cls = 'quiz-opt-btn';
          if (qz.answered) {
            if (idx === cur.correctIndex) cls += ' correct';
            else if (idx === qz.selectedIdx) cls += ' wrong';
          }
          return `<button class="${cls}" ${qz.answered ? 'disabled' : ''} onclick="pickLengthQuizOption(${idx})">${opt}</button>`;
        }).join('')}
      </div>

      ${qz.answered ? `
        <div class="feedback-msg ${qz.selectedIdx === cur.correctIndex ? 'ok' : 'err'}">
          ${qz.selectedIdx === cur.correctIndex ? '🎉 Correct! ' : '💡 Good try! '}${cur.explain}
        </div>
        <div style="text-align:right; margin-top:12px">
          <button class="btn-primary btn-compact" onclick="nextLengthQuizQuestion()">
            ${qz.qIndex + 1 < qz.questions.length ? 'Next Question ➔' : 'See Final Score 🏆'}
          </button>
        </div>` : ''}`;
  }

  window.pickLengthQuizOption = function (idx) {
    const qz = state.quiz;
    if (qz.answered) return;
    qz.answered = true;
    qz.selectedIdx = idx;
    const cur = qz.questions[qz.qIndex];
    if (idx === cur.correctIndex) {
      qz.score++;
      playCorrect();
      celebrate();
    } else {
      playWrong();
    }
    renderQuizQuestion();
  };

  window.nextLengthQuizQuestion = function () {
    const qz = state.quiz;
    if (qz.qIndex + 1 < qz.questions.length) {
      qz.qIndex++;
      qz.answered = false;
      qz.selectedIdx = null;
      playPop();
    } else {
      qz.finished = true;
      playFanfare();
      celebrate();
    }
    renderQuizQuestion();
  };

  /* ==========================================================================
     BOOTSTRAP ON DOM READY
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    renderCmView();
  });
})();
