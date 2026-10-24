/**
 * Lesson 3: Adding Up to 2-Digit Numbers
 * Aligned with Grade 2 Textbook pp. 69–74 and Workbook pp. 53–55
 * Zero-Build Architecture - Alapakadala Studio
 */

(function () {
  'use strict';

  // Global State
  const state = {
    currentMode: 'single', // 'single' | 'tens' | 'split' | 'puzzle' | 'quiz'

    single: {
      subMode: 'line', // 'line' | 'mat'
      num1: 32,
      num2: 4,
      currentHops: 0,
      animating: false
    },

    tens: {
      subMode: 'line', // 'line' | 'mat'
      num: 25,
      addTens: 30,
      currentHops: 0,
      animating: false
    },

    split: {
      a: 21,
      b: 13
    },

    puzzle: {
      subMode: 'match', // 'match' | 'story' | 'tiles'
      matcher: {
        pairs: [
          { id: 1, expr: '43 + 23', sum: 66 },
          { id: 2, expr: '11 + 16', sum: 27 },
          { id: 3, expr: '41 + 51', sum: 92 },
          { id: 4, expr: '21 + 74', sum: 95 }
        ],
        selectedLeft: null,
        selectedRight: null,
        matched: new Set()
      },
      story: {
        current: 1
      },
      tiles: {
        selectedTile: null,
        slots: {
          slotA_tens: null,
          slotA_ones: null,
          slotB_tens: null,
          slotB_ones: null
        }
      }
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

    // Update Header Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`tabBtn_${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update View Panels
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`view_${mode}`);
    if (activePanel) activePanel.classList.add('active');

    // Mobile Select sync
    const mobileSelect = document.getElementById('mobileActivitySelect');
    if (mobileSelect) mobileSelect.value = mode;

    // Render active view
    if (mode === 'single') renderSingleView();
    if (mode === 'tens') renderTensView();
    if (mode === 'split') renderSplitView();
    if (mode === 'puzzle') renderPuzzleView();
    if (mode === 'quiz') window.startQuiz(state.quiz.level);
  };

  /* ================= AUDIO TOGGLE ================= */
  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.innerHTML = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  /* ================= TAB 1: ADD 1-DIGIT ================= */
  window.setSingleSubMode = function (sub) {
    state.single.subMode = sub;
    if (window.sound) window.sound.playPop();

    const lineBtn = document.getElementById('singleSub_line');
    const matBtn = document.getElementById('singleSub_mat');
    const lineSec = document.getElementById('singleNumberLineSection');
    const matSec = document.getElementById('singleMatSection');

    if (lineBtn && matBtn) {
      lineBtn.classList.toggle('active', sub === 'line');
      matBtn.classList.toggle('active', sub === 'mat');
    }

    if (lineSec && matSec) {
      lineSec.style.display = sub === 'line' ? 'flex' : 'none';
      matSec.style.display = sub === 'mat' ? 'grid' : 'none';
    }
  };

  function renderSingleView() {
    const n1 = state.single.num1;
    const n2 = state.single.num2;
    const sum = n1 + n2;

    // Live Equation Bar
    const eq1 = document.getElementById('singleEqNum1');
    const eq2 = document.getElementById('singleEqNum2');
    const eqSum = document.getElementById('singleEqSum');
    if (eq1) eq1.textContent = n1;
    if (eq2) eq2.textContent = n2;
    if (eqSum) eqSum.textContent = sum;

    // Submode 1: Number Line
    renderSingleNumberLine();

    // Submode 2: Mat & Column
    renderSingleMatAndColumn();
  }

  function renderSingleNumberLine() {
    const wrap = document.getElementById('singleNlWrap');
    if (!wrap) return;

    const n1 = state.single.num1;
    const n2 = state.single.num2;
    const hops = state.single.currentHops;
    const landedVal = n1 + hops;

    const statusEl = document.getElementById('nlSingleStatus');
    if (statusEl) {
      statusEl.innerHTML = `Start at <strong>${n1}</strong>, hopped <strong>${hops} of ${n2}</strong> times (+1 each) ➔ Current: <strong style="color:#10B981;">${landedVal}</strong>`;
    }

    // SVG parameters
    const startNum = Math.max(0, n1 - 2);
    const endNum = n1 + n2 + 2;
    const totalTicks = endNum - startNum + 1;

    const width = 640;
    const height = 120;
    const padX = 40;
    const lineY = 85;
    const tickSpacing = (width - 2 * padX) / (totalTicks - 1);

    function getX(val) {
      return padX + (val - startNum) * tickSpacing;
    }

    let svgHtml = `
      <svg class="number-line-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#EF4444" />
          </marker>
        </defs>

        <!-- Main axis line -->
        <line x1="${padX - 10}" y1="${lineY}" x2="${width - padX + 10}" y2="${lineY}" stroke="#475569" stroke-width="3" stroke-linecap="round" />
    `;

    // Ticks & number labels
    for (let v = startNum; v <= endNum; v++) {
      const x = getX(v);
      const isStart = (v === n1);
      const isLanded = (v === landedVal && hops > 0);

      svgHtml += `
        <line x1="${x}" y1="${lineY - 8}" x2="${x}" y2="${lineY + 8}" stroke="${isStart ? '#3B82F6' : '#64748B'}" stroke-width="${isStart ? 3.5 : 2}" />
        <text x="${x}" y="${lineY + 24}" text-anchor="middle" font-size="${isStart || isLanded ? '15' : '13'}" font-weight="${isStart || isLanded ? '800' : '600'}" fill="${isLanded ? '#059669' : (isStart ? '#1D4ED8' : '#334155')}" font-family="Fredoka, sans-serif">${v}</text>
      `;

      if (isStart) {
        // Start marker pin
        svgHtml += `
          <circle cx="${x}" cy="${lineY}" r="5" fill="#3B82F6" />
          <text x="${x}" y="${lineY - 14}" text-anchor="middle" font-size="11" font-weight="800" fill="#2563EB" font-family="Nunito, sans-serif">Start</text>
        `;
      }
    }

    // Hopping Arcs
    for (let h = 0; h < hops; h++) {
      const fromVal = n1 + h;
      const toVal = n1 + h + 1;
      const x1 = getX(fromVal);
      const x2 = getX(toVal);
      const arcHeight = 36;
      const midX = (x1 + x2) / 2;
      const ctrlY = lineY - arcHeight;

      svgHtml += `
        <path d="M ${x1} ${lineY} Q ${midX} ${ctrlY} ${x2} ${lineY}" fill="none" stroke="#EF4444" stroke-width="2.5" marker-end="url(#arrow)" />
        <text x="${midX}" y="${ctrlY + 2}" text-anchor="middle" font-size="12" font-weight="800" fill="#DC2626" font-family="Fredoka, sans-serif">+1</text>
      `;
    }

    // Landed indicator
    if (hops > 0) {
      const landX = getX(landedVal);
      svgHtml += `
        <circle cx="${landX}" cy="${lineY}" r="6" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />
      `;
    }

    svgHtml += `</svg>`;
    wrap.innerHTML = svgHtml;
  }

  window.stepSingleHop = function () {
    const n2 = state.single.num2;
    if (state.single.currentHops < n2) {
      state.single.currentHops++;
      if (window.sound) window.sound.playPop();
      renderSingleNumberLine();

      if (state.single.currentHops === n2) {
        if (window.sound) window.sound.playCorrect();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 30 });
      }
    }
  };

  window.resetSingleHops = function () {
    state.single.currentHops = 0;
    if (window.sound) window.sound.playPop();
    renderSingleNumberLine();
  };

  window.autoSingleHops = function () {
    if (state.single.animating) return;
    state.single.currentHops = 0;
    state.single.animating = true;
    renderSingleNumberLine();

    const n2 = state.single.num2;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      state.single.currentHops = step;
      if (window.sound) window.sound.playPop();
      renderSingleNumberLine();

      if (step >= n2) {
        clearInterval(interval);
        state.single.animating = false;
        if (window.sound) window.sound.playCorrect();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 40 });
      }
    }, 450);
  };

  function renderSingleMatAndColumn() {
    const n1 = state.single.num1;
    const n2 = state.single.num2;
    const sum = n1 + n2;

    const t1 = Math.floor(n1 / 10);
    const o1 = n1 % 10;
    const oSum = o1 + n2;

    // Mat Counts
    const tensCount = document.getElementById('singleTensCount');
    const onesCount = document.getElementById('singleOnesCount');
    if (tensCount) tensCount.textContent = `${t1} Tens (${t1 * 10})`;
    if (onesCount) onesCount.textContent = `${oSum} Ones`;

    // Render Rods
    const tensRack = document.getElementById('singleTensRack');
    if (tensRack) {
      tensRack.innerHTML = '';
      for (let t = 0; t < t1; t++) {
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

    // Render Cubes
    const onesRack = document.getElementById('singleOnesRack');
    if (onesRack) {
      onesRack.innerHTML = '';
      // Initial ones
      for (let i = 0; i < o1; i++) {
        const cube = document.createElement('div');
        cube.className = 'mat-cube';
        cube.textContent = '1';
        onesRack.appendChild(cube);
      }
      // Added ones
      for (let i = 0; i < n2; i++) {
        const cube = document.createElement('div');
        cube.className = 'mat-cube added';
        cube.textContent = '+1';
        onesRack.appendChild(cube);
      }
    }

    // Column Table
    const colT1 = document.getElementById('colSingleT1');
    const colO1 = document.getElementById('colSingleO1');
    const colT2 = document.getElementById('colSingleT2');
    const colO2 = document.getElementById('colSingleO2');
    const colSumT = document.getElementById('colSingleSumT');
    const colSumO = document.getElementById('colSingleSumO');

    if (colT1) colT1.textContent = t1;
    if (colO1) colO1.textContent = o1;
    if (colT2) colT2.textContent = '';
    if (colO2) colO2.textContent = n2;
    if (colSumT) colSumT.textContent = t1;
    if (colSumO) colSumO.textContent = oSum;

    // Explainer sentences
    const onesEq = document.getElementById('singleStepOnesEq');
    const tensEq = document.getElementById('singleStepTensEq');
    if (onesEq) onesEq.textContent = `${o1} ones + ${n2} ones = ${oSum} ones`;
    if (tensEq) tensEq.textContent = `${t1} tens + 0 tens = ${t1} tens`;
  }

  window.setSingleProblem = function (n1, n2) {
    state.single.num1 = n1;
    state.single.num2 = n2;
    state.single.currentHops = 0;
    if (window.sound) window.sound.playPop();

    // Highlight Preset Chip
    document.querySelectorAll('#view_single .preset-chip').forEach(c => {
      c.classList.remove('active');
    });

    renderSingleView();
  };

  window.randomizeSingleProblem = function () {
    const tens = Math.floor(Math.random() * 6) + 1; // 1 to 6
    const ones = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const addOnes = Math.floor(Math.random() * (9 - ones)) + 1; // ensure no regrouping!
    window.setSingleProblem(tens * 10 + ones, addOnes);
  };

  /* ================= TAB 2: ADDING WHOLE TENS ================= */
  window.setTensSubMode = function (sub) {
    state.tens.subMode = sub;
    if (window.sound) window.sound.playPop();

    const lineBtn = document.getElementById('tensSub_line');
    const matBtn = document.getElementById('tensSub_mat');
    const lineSec = document.getElementById('tensNumberLineSection');
    const matSec = document.getElementById('tensMatSection');

    if (lineBtn && matBtn) {
      lineBtn.classList.toggle('active', sub === 'line');
      matBtn.classList.toggle('active', sub === 'mat');
    }

    if (lineSec && matSec) {
      lineSec.style.display = sub === 'line' ? 'flex' : 'none';
      matSec.style.display = sub === 'mat' ? 'grid' : 'none';
    }
  };

  function renderTensView() {
    const num = state.tens.num;
    const addTens = state.tens.addTens;
    const sum = num + addTens;

    // Live Equation Bar
    const eq1 = document.getElementById('tensEqNum1');
    const eq2 = document.getElementById('tensEqNum2');
    const eqSum = document.getElementById('tensEqSum');
    if (eq1) eq1.textContent = num;
    if (eq2) eq2.textContent = addTens;
    if (eqSum) eqSum.textContent = sum;

    renderTensNumberLine();
    renderTensMatAndColumn();
  }

  function renderTensNumberLine() {
    const wrap = document.getElementById('tensNlWrap');
    if (!wrap) return;

    const num = state.tens.num;
    const addTens = state.tens.addTens;
    const totalTensHops = addTens / 10;
    const hops = state.tens.currentHops;
    const landedVal = num + hops * 10;

    const statusEl = document.getElementById('nlTensStatus');
    if (statusEl) {
      statusEl.innerHTML = `Start at <strong>${num}</strong>, hopped <strong>${hops} of ${totalTensHops}</strong> times (+10 each) ➔ Current: <strong style="color:#10B981;">${landedVal}</strong>`;
    }

    const startVal = Math.max(num % 10, num - 10);
    const endVal = num + addTens + 10;
    const totalTicks = (endVal - startVal) / 10 + 1;

    const width = 640;
    const height = 120;
    const padX = 40;
    const lineY = 85;
    const tickSpacing = (width - 2 * padX) / (totalTicks - 1);

    function getX(val) {
      return padX + ((val - startVal) / 10) * tickSpacing;
    }

    let svgHtml = `
      <svg class="number-line-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowTens" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#D97706" />
          </marker>
        </defs>

        <line x1="${padX - 10}" y1="${lineY}" x2="${width - padX + 10}" y2="${lineY}" stroke="#475569" stroke-width="3" stroke-linecap="round" />
    `;

    for (let v = startVal; v <= endVal; v += 10) {
      const x = getX(v);
      const isStart = (v === num);
      const isLanded = (v === landedVal && hops > 0);

      svgHtml += `
        <line x1="${x}" y1="${lineY - 8}" x2="${x}" y2="${lineY + 8}" stroke="${isStart ? '#D97706' : '#64748B'}" stroke-width="${isStart ? 3.5 : 2}" />
        <text x="${x}" y="${lineY + 24}" text-anchor="middle" font-size="${isStart || isLanded ? '15' : '13'}" font-weight="${isStart || isLanded ? '800' : '600'}" fill="${isLanded ? '#059669' : (isStart ? '#B45309' : '#334155')}" font-family="Fredoka, sans-serif">${v}</text>
      `;

      if (isStart) {
        svgHtml += `
          <circle cx="${x}" cy="${lineY}" r="5" fill="#D97706" />
          <text x="${x}" y="${lineY - 14}" text-anchor="middle" font-size="11" font-weight="800" fill="#B45309" font-family="Nunito, sans-serif">Start</text>
        `;
      }
    }

    // Hopping Arcs (+10)
    for (let h = 0; h < hops; h++) {
      const fromVal = num + h * 10;
      const toVal = num + (h + 1) * 10;
      const x1 = getX(fromVal);
      const x2 = getX(toVal);
      const arcHeight = 38;
      const midX = (x1 + x2) / 2;
      const ctrlY = lineY - arcHeight;

      svgHtml += `
        <path d="M ${x1} ${lineY} Q ${midX} ${ctrlY} ${x2} ${lineY}" fill="none" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowTens)" />
        <text x="${midX}" y="${ctrlY + 2}" text-anchor="middle" font-size="13" font-weight="800" fill="#B45309" font-family="Fredoka, sans-serif">+10</text>
      `;
    }

    if (hops > 0) {
      const landX = getX(landedVal);
      svgHtml += `
        <circle cx="${landX}" cy="${lineY}" r="6" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />
      `;
    }

    svgHtml += `</svg>`;
    wrap.innerHTML = svgHtml;
  }

  window.stepTensHop = function () {
    const totalTensHops = state.tens.addTens / 10;
    if (state.tens.currentHops < totalTensHops) {
      state.tens.currentHops++;
      if (window.sound) window.sound.playPop();
      renderTensNumberLine();

      if (state.tens.currentHops === totalTensHops) {
        if (window.sound) window.sound.playCorrect();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 30 });
      }
    }
  };

  window.resetTensHops = function () {
    state.tens.currentHops = 0;
    if (window.sound) window.sound.playPop();
    renderTensNumberLine();
  };

  window.autoTensHops = function () {
    if (state.tens.animating) return;
    state.tens.currentHops = 0;
    state.tens.animating = true;
    renderTensNumberLine();

    const totalHops = state.tens.addTens / 10;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      state.tens.currentHops = step;
      if (window.sound) window.sound.playPop();
      renderTensNumberLine();

      if (step >= totalHops) {
        clearInterval(interval);
        state.tens.animating = false;
        if (window.sound) window.sound.playCorrect();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 40 });
      }
    }, 500);
  };

  function renderTensMatAndColumn() {
    const num = state.tens.num;
    const addTens = state.tens.addTens;
    const sum = num + addTens;

    const t1 = Math.floor(num / 10);
    const o1 = num % 10;
    const t2 = Math.floor(addTens / 10);
    const sumT = t1 + t2;

    const tensCount = document.getElementById('tensMatCount');
    const onesCount = document.getElementById('tensOnesCount');
    if (tensCount) tensCount.textContent = `${sumT} Tens (${sumT * 10})`;
    if (onesCount) onesCount.textContent = `${o1} Ones (Unchanged!)`;

    const tensRack = document.getElementById('tensMatRack');
    if (tensRack) {
      tensRack.innerHTML = '';
      for (let t = 0; t < t1; t++) {
        const rod = document.createElement('div');
        rod.className = 'mat-rod';
        rod.title = 'Initial Ten Rod (10)';
        for (let b = 0; b < 10; b++) {
          const blk = document.createElement('div');
          blk.className = 'mat-rod-block';
          rod.appendChild(blk);
        }
        tensRack.appendChild(rod);
      }
      for (let t = 0; t < t2; t++) {
        const rod = document.createElement('div');
        rod.className = 'mat-rod added';
        rod.title = 'Added Ten Rod (+10)';
        for (let b = 0; b < 10; b++) {
          const blk = document.createElement('div');
          blk.className = 'mat-rod-block';
          rod.appendChild(blk);
        }
        tensRack.appendChild(rod);
      }
    }

    const onesRack = document.getElementById('tensOnesRack');
    if (onesRack) {
      onesRack.innerHTML = '';
      for (let i = 0; i < o1; i++) {
        const cube = document.createElement('div');
        cube.className = 'mat-cube';
        cube.textContent = '1';
        onesRack.appendChild(cube);
      }
    }

    // Column Table
    const colT1 = document.getElementById('colTensT1');
    const colO1 = document.getElementById('colTensO1');
    const colT2 = document.getElementById('colTensT2');
    const colO2 = document.getElementById('colTensO2');
    const colSumT = document.getElementById('colTensSumT');
    const colSumO = document.getElementById('colTensSumO');

    if (colT1) colT1.textContent = t1;
    if (colO1) colO1.textContent = o1;
    if (colT2) colT2.textContent = t2;
    if (colO2) colO2.textContent = 0;
    if (colSumT) colSumT.textContent = sumT;
    if (colSumO) colSumO.textContent = o1;

    const onesEq = document.getElementById('tensStepOnesEq');
    const tensEq = document.getElementById('tensStepTensEq');
    if (onesEq) onesEq.textContent = `${o1} ones + 0 ones = ${o1} ones`;
    if (tensEq) tensEq.textContent = `${t1} tens + ${t2} tens = ${sumT} tens`;
  }

  window.setTensProblem = function (num, addTens) {
    state.tens.num = num;
    state.tens.addTens = addTens;
    state.tens.currentHops = 0;
    if (window.sound) window.sound.playPop();

    document.querySelectorAll('#view_tens .preset-chip').forEach(c => {
      c.classList.remove('active');
    });

    renderTensView();
  };

  window.randomizeTensProblem = function () {
    const tens1 = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const ones1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const maxTens2 = 9 - tens1;
    const tens2 = Math.floor(Math.random() * maxTens2) + 1;
    window.setTensProblem(tens1 * 10 + ones1, tens2 * 10);
  };

  /* ================= TAB 3: DOUBLE-SPLIT & COLUMN ================= */
  function renderSplitView() {
    const a = state.split.a;
    const b = state.split.b;
    const sum = a + b;

    const tA = Math.floor(a / 10) * 10;
    const oA = a % 10;
    const tB = Math.floor(b / 10) * 10;
    const oB = b % 10;

    const sumT = tA + tB;
    const sumO = oA + oB;

    // Header equation
    const valA = document.getElementById('splitValA');
    const valB = document.getElementById('splitValB');
    const valSum = document.getElementById('splitValSum');
    if (valA) valA.textContent = a;
    if (valB) valB.textContent = b;
    if (valSum) valSum.textContent = sum;

    // Render SVG Tree matching Workbook p. 53
    renderSplitTreeSvg(a, b, tA, oA, tB, oB);

    // Fill-in lines
    const onesMath = document.getElementById('wbOnesMath');
    const tensMath = document.getElementById('wbTensMath');
    const totalMath = document.getElementById('wbTotalMath');
    if (onesMath) onesMath.innerHTML = `${oA} + ${oB} = <strong>${sumO}</strong>`;
    if (tensMath) tensMath.innerHTML = `${tA} + ${tB} = <strong>${sumT}</strong>`;
    if (totalMath) totalMath.innerHTML = `${sumT} + ${sumO} = <strong>${sum}</strong> 🎉`;

    // Column addition
    const colT1 = document.getElementById('colSplitT1');
    const colO1 = document.getElementById('colSplitO1');
    const colT2 = document.getElementById('colSplitT2');
    const colO2 = document.getElementById('colSplitO2');
    const colSumT = document.getElementById('colSplitSumT');
    const colSumO = document.getElementById('colSplitSumO');

    if (colT1) colT1.textContent = Math.floor(a / 10);
    if (colO1) colO1.textContent = oA;
    if (colT2) colT2.textContent = Math.floor(b / 10);
    if (colO2) colO2.textContent = oB;
    if (colSumT) colSumT.textContent = Math.floor(sum / 10);
    if (colSumO) colSumO.textContent = sumO;

    const step1 = document.getElementById('colSplitStep1');
    const step2 = document.getElementById('colSplitStep2');
    if (step1) step1.textContent = `${oA} ones + ${oB} ones = ${sumO} ones`;
    if (step2) step2.textContent = `${Math.floor(a / 10)} tens + ${Math.floor(b / 10)} tens = ${Math.floor(sum / 10)} tens`;
  }

  function renderSplitTreeSvg(a, b, tA, oA, tB, oB) {
    const wrap = document.getElementById('splitTreeSvgWrap');
    if (!wrap) return;

    const width = 420;
    const height = 220;

    // Coordinates
    const rootAY = 55;
    const rootAX = 110;
    const childAY = 165;
    const tensAX = 60;
    const onesAX = 160;

    const rootBX = 310;
    const childBY = 165;
    const tensBX = 260;
    const onesBX = 360;

    const svgHtml = `
      <svg class="split-tree-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Connecting branches for A -->
        <line x1="${rootAX}" y1="${rootAY}" x2="${tensAX}" y2="${childAY}" stroke="#D97706" stroke-width="3" stroke-linecap="round" />
        <line x1="${rootAX}" y1="${rootAY}" x2="${onesAX}" y2="${childAY}" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />

        <!-- Connecting branches for B -->
        <line x1="${rootBX}" y1="${rootAY}" x2="${tensBX}" y2="${childBY}" stroke="#D97706" stroke-width="3" stroke-linecap="round" />
        <line x1="${rootBX}" y1="${rootAY}" x2="${onesBX}" y2="${childBY}" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />

        <!-- Plus symbol in center -->
        <text x="210" y="66" text-anchor="middle" font-size="28" font-weight="800" fill="#4F46E5" font-family="Fredoka, sans-serif">+</text>

        <!-- Root Node A -->
        <circle cx="${rootAX}" cy="${rootAY}" r="32" fill="#FFFFFF" stroke="#4F46E5" stroke-width="3" filter="drop-shadow(0 2px 4px rgba(79,70,229,0.15))" />
        <text x="${rootAX}" y="${rootAY + 8}" text-anchor="middle" font-size="24" font-weight="800" fill="#1E1B4B" font-family="Fredoka, sans-serif">${a}</text>

        <!-- Tens Node A -->
        <circle cx="${tensAX}" cy="${childAY}" r="28" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5" />
        <text x="${tensAX}" y="${childAY + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#B45309" font-family="Fredoka, sans-serif">${tA}</text>
        <text x="${tensAX}" y="${childAY + 40}" text-anchor="middle" font-size="11" font-weight="800" fill="#92400E" font-family="Nunito, sans-serif">Tens</text>

        <!-- Ones Node A -->
        <circle cx="${onesAX}" cy="${childAY}" r="28" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
        <text x="${onesAX}" y="${childAY + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#0369A1" font-family="Fredoka, sans-serif">${oA}</text>
        <text x="${onesAX}" y="${childAY + 40}" text-anchor="middle" font-size="11" font-weight="800" fill="#0284C7" font-family="Nunito, sans-serif">Ones</text>

        <!-- Root Node B -->
        <circle cx="${rootBX}" cy="${rootAY}" r="32" fill="#FFFFFF" stroke="#4F46E5" stroke-width="3" filter="drop-shadow(0 2px 4px rgba(79,70,229,0.15))" />
        <text x="${rootBX}" y="${rootAY + 8}" text-anchor="middle" font-size="24" font-weight="800" fill="#1E1B4B" font-family="Fredoka, sans-serif">${b}</text>

        <!-- Tens Node B -->
        <circle cx="${tensBX}" cy="${childBY}" r="28" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5" />
        <text x="${tensBX}" y="${childBY + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#B45309" font-family="Fredoka, sans-serif">${tB}</text>
        <text x="${tensBX}" y="${childBY + 40}" text-anchor="middle" font-size="11" font-weight="800" fill="#92400E" font-family="Nunito, sans-serif">Tens</text>

        <!-- Ones Node B -->
        <circle cx="${onesBX}" cy="${childBY}" r="28" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
        <text x="${onesBX}" y="${childBY + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#0369A1" font-family="Fredoka, sans-serif">${oB}</text>
        <text x="${onesBX}" y="${childBY + 40}" text-anchor="middle" font-size="11" font-weight="800" fill="#0284C7" font-family="Nunito, sans-serif">Ones</text>
      </svg>
    `;

    wrap.innerHTML = svgHtml;
  }

  window.setSplitProblem = function (a, b) {
    state.split.a = a;
    state.split.b = b;
    if (window.sound) window.sound.playPop();

    document.querySelectorAll('#view_split .preset-chip').forEach(c => {
      c.classList.remove('active');
    });

    renderSplitView();
  };

  window.randomizeSplitProblem = function () {
    const tA = (Math.floor(Math.random() * 4) + 1) * 10;
    const tB = (Math.floor(Math.random() * (8 - tA / 10)) + 1) * 10;
    const oA = Math.floor(Math.random() * 5) + 1;
    const oB = Math.floor(Math.random() * (9 - oA)) + 1; // no regrouping
    window.setSplitProblem(tA + oA, tB + oB);
  };

  /* ================= TAB 4: PUZZLES & STORY LAB ================= */
  window.setPuzzleSubMode = function (sub) {
    state.puzzle.subMode = sub;
    if (window.sound) window.sound.playPop();

    const tabs = ['match', 'story', 'tiles'];
    tabs.forEach(t => {
      const btn = document.getElementById(`puzSub_${t}`);
      if (btn) btn.classList.toggle('active', t === sub);
    });

    const mSec = document.getElementById('puzzleMatchSection');
    const sSec = document.getElementById('puzzleStorySection');
    const tSec = document.getElementById('puzzleTilesSection');

    if (mSec) mSec.style.display = sub === 'match' ? 'flex' : 'none';
    if (sSec) sSec.style.display = sub === 'story' ? 'flex' : 'none';
    if (tSec) tSec.style.display = sub === 'tiles' ? 'flex' : 'none';

    if (sub === 'match') renderPuzzleMatcher();
    if (sub === 'story') renderStorySection();
    if (sub === 'tiles') renderTileChallenge();
  };

  function renderPuzzleView() {
    window.setPuzzleSubMode(state.puzzle.subMode);
  }

  /* --- 4A: Jigsaw Puzzle Matcher --- */
  function renderPuzzleMatcher() {
    const leftCol = document.getElementById('puzzleLeftCol');
    const rightCol = document.getElementById('puzzleRightCol');
    const progressEl = document.getElementById('puzzleProgress');
    const statusEl = document.getElementById('puzzleCenterStatus');

    if (!leftCol || !rightCol) return;

    const pairs = state.puzzle.matcher.pairs;
    const matched = state.puzzle.matcher.matched;

    if (progressEl) progressEl.textContent = `Matched: ${matched.size} / ${pairs.length}`;
    if (statusEl) {
      if (matched.size === pairs.length) {
        statusEl.innerHTML = '🎉 All Matched!';
        statusEl.style.borderColor = '#10B981';
        statusEl.style.color = '#065F46';
      } else {
        statusEl.innerHTML = 'Select a piece';
        statusEl.style.borderColor = '#CBD5E1';
        statusEl.style.color = '#64748B';
      }
    }

    // Left Column (Expressions)
    leftCol.innerHTML = pairs.map(p => {
      const isMatched = matched.has(p.id);
      const isSelected = state.puzzle.matcher.selectedLeft === p.id;
      return `
        <div class="puzzle-piece left-piece ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}" onclick="window.selectLeftPiece(${p.id})">
          ${p.expr}
        </div>
      `;
    }).join('');

    // Right Column (Answers - shuffled order 2, 4, 1, 3 for fun)
    const rightOrder = [2, 4, 1, 3];
    rightCol.innerHTML = rightOrder.map(id => {
      const p = pairs.find(x => x.id === id);
      const isMatched = matched.has(p.id);
      const isSelected = state.puzzle.matcher.selectedRight === p.id;
      return `
        <div class="puzzle-piece right-piece ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}" onclick="window.selectRightPiece(${p.id})">
          ${p.sum}
        </div>
      `;
    }).join('');
  }

  window.selectLeftPiece = function (id) {
    if (state.puzzle.matcher.matched.has(id)) return;
    state.puzzle.matcher.selectedLeft = id;
    if (window.sound) window.sound.playPop();
    checkPuzzleMatch();
    renderPuzzleMatcher();
  };

  window.selectRightPiece = function (id) {
    if (state.puzzle.matcher.matched.has(id)) return;
    state.puzzle.matcher.selectedRight = id;
    if (window.sound) window.sound.playPop();
    checkPuzzleMatch();
    renderPuzzleMatcher();
  };

  function checkPuzzleMatch() {
    const left = state.puzzle.matcher.selectedLeft;
    const right = state.puzzle.matcher.selectedRight;

    if (left !== null && right !== null) {
      if (left === right) {
        // Correct match!
        state.puzzle.matcher.matched.add(left);
        state.puzzle.matcher.selectedLeft = null;
        state.puzzle.matcher.selectedRight = null;
        if (window.sound) window.sound.playCorrect();

        if (state.puzzle.matcher.matched.size === state.puzzle.matcher.pairs.length) {
          if (window.sound) window.sound.playFanfare();
          if (window.AppUtils) window.AppUtils.confetti({ particleCount: 70, spread: 80 });
        }
      } else {
        // Wrong match
        if (window.sound) window.sound.playWrong();
        const statusEl = document.getElementById('puzzleCenterStatus');
        if (statusEl) {
          statusEl.innerHTML = '❌ Not a match, try again!';
          statusEl.style.color = '#EF4444';
        }
        setTimeout(() => {
          state.puzzle.matcher.selectedLeft = null;
          state.puzzle.matcher.selectedRight = null;
          renderPuzzleMatcher();
        }, 600);
      }
    }
  }

  window.resetPuzzleMatcher = function () {
    state.puzzle.matcher.matched.clear();
    state.puzzle.matcher.selectedLeft = null;
    state.puzzle.matcher.selectedRight = null;
    if (window.sound) window.sound.playPop();
    renderPuzzleMatcher();
  };

  /* --- 4B: Story Problems Lab --- */
  const STORIES = {
    1: {
      title: "Mrs. Jones' Chicken Pies",
      badge: "Workbook 4 (p. 54 Q3)",
      text: "Mrs Jones made <strong>25 chicken pies</strong>. Then, she made another <strong>42 chicken pies</strong>. How many chicken pies did Mrs Jones make altogether?",
      n1: 25,
      n2: 42,
      ans: 67,
      unit: "chicken pies"
    },
    2: {
      title: "Gerald & June's Pencils",
      badge: "Textbook p. 74 Q2",
      text: "Gerald buys <strong>33 pencils</strong>. June buys <strong>22 more pencils</strong> than Gerald. How many pencils does June buy?",
      n1: 33,
      n2: 22,
      ans: 55,
      unit: "pencils"
    },
    3: {
      title: "Mr. Chan's Classroom Chairs",
      badge: "Textbook p. 74 Q3",
      text: "There are <strong>25 chairs</strong> in the classroom. Mr Chan brings <strong>64 more chairs</strong> into the classroom. How many chairs are there now?",
      n1: 25,
      n2: 64,
      ans: 89,
      unit: "chairs"
    }
  };

  window.selectStoryProblem = function (id) {
    state.puzzle.story.current = id;
    if (window.sound) window.sound.playPop();

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById(`storyTab${i}`);
      if (tab) tab.classList.toggle('active', i === id);
    });

    renderStorySection();
  };

  function renderStorySection() {
    const card = document.getElementById('storyProblemCard');
    if (!card) return;

    const s = STORIES[state.puzzle.story.current];
    const t1 = Math.floor(s.n1 / 10);
    const o1 = s.n1 % 10;
    const t2 = Math.floor(s.n2 / 10);
    const o2 = s.n2 % 10;

    card.innerHTML = `
      <div class="story-header-row">
        <h3 style="font-size:1.2rem; color:#1E1B4B;">${s.title}</h3>
        <span class="story-badge">${s.badge}</span>
      </div>
      <p class="story-text">${s.text}</p>

      <div class="story-interactive-solver">
        <span style="font-size:1.4rem; font-weight:800; color:#3730A3;">${s.n1} + ${s.n2} =</span>
        <input type="number" id="storyUserAns" class="story-input-box" placeholder="?" />
        <button class="action-btn" onclick="window.checkStoryAnswer(${s.ans})">Check Answer</button>
        <span class="story-feedback" id="storyFeedback"></span>
      </div>

      <div class="col-steps-explainer" id="storySteps" style="display:none;">
        <div class="col-step-box step-ones">
          <strong>Step 1 (Add Ones):</strong> ${o1} ones + ${o2} ones = ${o1 + o2} ones
        </div>
        <div class="col-step-box step-tens">
          <strong>Step 2 (Add Tens):</strong> ${t1} tens + ${t2} tens = ${t1 + t2} tens
        </div>
        <div class="col-step-box" style="background:#ECFDF5; border-color:#6EE7B7; color:#065F46; font-weight:800;">
          🎉 Total = ${s.ans} ${s.unit}!
        </div>
      </div>
    `;
  }

  window.checkStoryAnswer = function (expected) {
    const input = document.getElementById('storyUserAns');
    const feedback = document.getElementById('storyFeedback');
    const steps = document.getElementById('storySteps');
    if (!input || !feedback) return;

    const val = parseInt(input.value.trim(), 10);
    if (val === expected) {
      if (window.sound) window.sound.playCorrect();
      if (window.AppUtils) window.AppUtils.confetti({ particleCount: 40 });
      feedback.innerHTML = `<span style="color:#059669;">🌟 Correct! Exactly ${expected}!</span>`;
      if (steps) steps.style.display = 'flex';
    } else {
      if (window.sound) window.sound.playWrong();
      feedback.innerHTML = `<span style="color:#DC2626;">💡 Not quite. Try adding the ones first, then tens!</span>`;
    }
  };

  /* --- 4C: Digit Tile Challenge --- */
  function renderTileChallenge() {
    const pool = ['2', '3', '4', '5'];
    const slots = state.puzzle.tiles.slots;
    const selected = state.puzzle.tiles.selectedTile;

    // Check used digits
    const usedDigits = Object.values(slots).filter(v => v !== null);

    // Update tile buttons in rack
    const rack = document.getElementById('digitTilesRack');
    if (rack) {
      rack.innerHTML = pool.map(d => {
        const isUsed = usedDigits.includes(d);
        const isSel = (selected === d);
        return `
          <button class="digit-tile ${isUsed ? 'used' : ''} ${isSel ? 'selected' : ''}" 
                  onclick="window.pickTile('${d}')" ${isUsed ? 'disabled' : ''}>
            ${d}
          </button>
        `;
      }).join('');
    }

    // Update slots
    ['slotA_tens', 'slotA_ones', 'slotB_tens', 'slotB_ones'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const val = slots[id];
        if (val) {
          el.classList.add('filled');
          el.innerHTML = val;
        } else {
          el.classList.remove('filled');
          const hint = id.includes('tens') ? 'Tens' : 'Ones';
          el.innerHTML = `<span class="slot-hint">${hint}</span>`;
        }
      }
    });

    // Compute live sum
    const sumEl = document.getElementById('tileTotalSum');
    const feedbackEl = document.getElementById('tileFeedback');

    const hasAll = Object.values(slots).every(v => v !== null);
    if (hasAll) {
      const numA = parseInt(slots.slotA_tens, 10) * 10 + parseInt(slots.slotA_ones, 10);
      const numB = parseInt(slots.slotB_tens, 10) * 10 + parseInt(slots.slotB_ones, 10);
      const sum = numA + numB;

      if (sumEl) sumEl.textContent = sum;

      if (sum === 95) {
        if (window.sound) window.sound.playFanfare();
        if (window.AppUtils) window.AppUtils.confetti({ particleCount: 60 });
        if (feedbackEl) {
          feedbackEl.innerHTML = `🌟 <strong>JACKPOT! Maximum Sum Found (95)!</strong> You placed the two largest digits (5 and 4) in the <strong>TENS</strong> place ($50 + 40 = 90$), making the greatest possible sum!`;
        }
      } else {
        if (feedbackEl) {
          feedbackEl.innerHTML = `Sum is <strong>${sum}</strong> (${numA} + ${numB}). Can you get an even larger sum? Hint: Put 5 and 4 in the Tens places!`;
        }
      }
    } else {
      if (sumEl) sumEl.textContent = '--';
      if (feedbackEl) {
        feedbackEl.innerHTML = `Tap an available digit above, then tap an empty Tens or Ones slot!`;
      }
    }
  }

  window.pickTile = function (val) {
    state.puzzle.tiles.selectedTile = val;
    if (window.sound) window.sound.playPop();
    renderTileChallenge();
  };

  window.placeInSlot = function (slotId) {
    const selected = state.puzzle.tiles.selectedTile;
    if (selected) {
      state.puzzle.tiles.slots[slotId] = selected;
      state.puzzle.tiles.selectedTile = null;
      if (window.sound) window.sound.playPop();
      renderTileChallenge();
    } else if (state.puzzle.tiles.slots[slotId]) {
      // Clear slot on click
      state.puzzle.tiles.slots[slotId] = null;
      if (window.sound) window.sound.playPop();
      renderTileChallenge();
    }
  };

  window.resetDigitTiles = function () {
    state.puzzle.tiles.selectedTile = null;
    state.puzzle.tiles.slots = {
      slotA_tens: null,
      slotA_ones: null,
      slotB_tens: null,
      slotB_ones: null
    };
    if (window.sound) window.sound.playPop();
    renderTileChallenge();
  };

  window.revealBestTileSum = function () {
    state.puzzle.tiles.selectedTile = null;
    state.puzzle.tiles.slots = {
      slotA_tens: '5',
      slotA_ones: '3',
      slotB_tens: '4',
      slotB_ones: '2'
    };
    if (window.sound) window.sound.playCorrect();
    renderTileChallenge();
  };

  /* ================= TAB 5: MASTERY QUIZ ================= */
  const QUIZ_LEVEL_PRESETS = {
    // Level 1: 1-Digit Addition (No Regrouping) - Textbook pp. 70, 72 & Workbook p. 55
    1: [
      { q: "Cyrus has 32 balls. Vera gives him 4 more balls:", visual: "32 + 4 = [ ? ]", correct: 36, options: [34, 35, 36, 38], exp: "Add ones: 2 + 4 = 6. So 32 + 4 = 36." },
      { q: "Count on with a 1-digit number:", visual: "24 + 3 = [ ? ]", correct: 27, options: [26, 27, 28, 29], exp: "Add ones: 4 + 3 = 7. Tens stay 2! Total = 27." },
      { q: "Count on with a 1-digit number:", visual: "41 + 7 = [ ? ]", correct: 48, options: [46, 47, 48, 49], exp: "Add ones: 1 + 7 = 8. Total = 48." },
      { q: "Solve using place values:", visual: "55 + 4 = [ ? ]", correct: 59, options: [58, 59, 60, 61], exp: "Add ones: 5 + 4 = 9. Total = 59." },
      { q: "Worksheet 5 (p. 55) problem:", visual: "63 + 6 = [ ? ]", correct: 69, options: [68, 69, 70, 72], exp: "Add ones: 3 + 6 = 9. Total = 69." }
    ],

    // Level 2: Adding Whole Tens - Textbook pp. 71, 72 & Workbook p. 55
    2: [
      { q: "Ada's 25 hockey sticks + Cyrus's 30 hockey sticks:", visual: "25 + 30 = [ ? ]", correct: 55, options: [45, 50, 55, 65], exp: "2 tens + 3 tens = 5 tens. Ones stay 5! Total = 55." },
      { q: "Hop in tens on the number line:", visual: "24 + 50 = [ ? ]", correct: 74, options: [64, 74, 84, 94], exp: "2 tens + 5 tens = 7 tens. Ones stay 4! Total = 74." },
      { q: "Add whole tens to a 2-digit number:", visual: "41 + 30 = [ ? ]", correct: 71, options: [61, 70, 71, 81], exp: "4 tens + 3 tens = 7 tens. Ones stay 1! Total = 71." },
      { q: "Add whole tens:", visual: "55 + 40 = [ ? ]", correct: 95, options: [85, 90, 95, 100], exp: "5 tens + 4 tens = 9 tens. Ones stay 5! Total = 95." },
      { q: "Worksheet 5 (p. 55) problem:", visual: "13 + 40 = [ ? ]", correct: 53, options: [43, 50, 53, 54], exp: "1 ten + 4 tens = 5 tens. Ones stay 3! Total = 53." }
    ],

    // Level 3: 2-Digit Split Strategy - Workbook 4 (p. 53) & Textbook pp. 73–74
    3: [
      { q: "Workbook 4 (p. 53 Q1a) Double-Split:", visual: "21 + 13 = [ ? ]", correct: 34, options: [32, 33, 34, 35], exp: "Add ones: 1 + 3 = 4. Add tens: 20 + 10 = 30. Total = 34." },
      { q: "Workbook 4 (p. 53 Q1b) Double-Split:", visual: "47 + 32 = [ ? ]", correct: 79, options: [77, 78, 79, 80], exp: "7 + 2 = 9 ones, and 40 + 30 = 70 tens. Total = 79." },
      { q: "Workbook 4 (p. 53 Q1c) Double-Split:", visual: "15 + 41 = [ ? ]", correct: 56, options: [54, 55, 56, 57], exp: "5 + 1 = 6 ones, and 10 + 40 = 50 tens. Total = 56." },
      { q: "Workbook 4 (p. 53 Q1d) Double-Split:", visual: "33 + 64 = [ ? ]", correct: 97, options: [95, 96, 97, 98], exp: "3 + 4 = 7 ones, and 30 + 60 = 90 tens. Total = 97." },
      { q: "Textbook p. 74 practice sum:", visual: "43 + 25 = [ ? ]", correct: 68, options: [66, 67, 68, 69], exp: "3 + 5 = 8 ones, and 40 + 20 = 60 tens. Total = 68." }
    ],

    // Level 4: Word Problems & Real-World Lab - Workbook p. 54 & Textbook p. 74
    4: [
      { q: "Mrs. Jones made 25 chicken pies, then 42 more:", visual: "25 + 42 = [ ? ]", correct: 67, options: [65, 66, 67, 68], exp: "25 + 42 = 67 chicken pies altogether!" },
      { q: "Gerald buys 33 pencils. June buys 22 more pencils:", visual: "33 + 22 = [ ? ]", correct: 55, options: [53, 54, 55, 56], exp: "33 + 22 = 55 pencils." },
      { q: "25 chairs in room. Mr. Chan brings 64 more:", visual: "25 + 64 = [ ? ]", correct: 89, options: [87, 88, 89, 90], exp: "25 + 64 = 89 chairs altogether." },
      { q: "Ada's sister has 21 erasers. Ada has 17 more:", visual: "21 + 17 = [ ? ]", correct: 38, options: [36, 37, 38, 39], exp: "21 + 17 = 38 erasers!" },
      { q: "Which digit placement produces the greatest sum?", visual: "Digits 2, 3, 4, 5 in tens vs ones", correct: 95, options: [59, 77, 86, 95], exp: "Placing 5 and 4 in the tens places ($53 + 42$ or $52 + 43$) gives the maximum sum of 95!" }
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
        <button class="quiz-option-btn" data-val="${opt}" onclick="window.submitQuizAnswer('${opt}')">${opt}</button>
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
        <button class="action-btn" onclick="window.startQuiz(${state.quiz.level})" style="grid-column: span 2;">
          🔄 Play Again
        </button>
        <button class="action-btn secondary" onclick="window.startQuiz(${(state.quiz.level % 4) + 1})" style="grid-column: span 2;">
          ⏩ Next Level (Level ${(state.quiz.level % 4) + 1})
        </button>
      `;
    }
  }

  /* ================= INITIALIZATION ================= */
  window.addEventListener('DOMContentLoaded', () => {
    renderSingleView();
    renderTensView();
    renderSplitView();
    renderPuzzleMatcher();
    renderStorySection();
    renderTileChallenge();
    window.startQuiz(1);
  });

})();
