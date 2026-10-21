/**
 * Lesson 1: Number Pairs & Bonds to 20
 * Dual Ten-Frames, Part-Part-Whole Tree, Bridge Through 10, 4-in-1 Story Machine, 3-Part Combiner, and Mastery Quiz
 * Zero-Build Architecture - Alapakadala Studio
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentMode: 'frames', // 'frames' | 'ppw' | 'bridge' | 'story' | 'threepart' | 'quiz'
    frames: {
      redCount: 14
    },
    ppw: {
      mode: 'mystery', // 'explore' | 'mystery'
      exploreVal: 12,
      givenPart: 7,
      missingPartIndex: 2, // 1 or 2
      answered: false
    },
    bridge: {
      currentIndex: 3 // Index in BRIDGE_DATA (e.g. 4+6 -> 14+6)
    },
    story: {
      partA: 17,
      swapped: false,
      poured: null // 'A' | 'B' | null
    },
    threepart: {
      presets: [
        [12, 3, 5],
        [8, 7, 5],
        [10, 6, 4],
        [9, 9, 2],
        [1, 2, 17]
      ],
      presetIndex: 0,
      nums: [12, 3, 5],
      selectedBags: [] // indices of selected bags (0, 1, or 2)
    },
    quiz: {
      level: 1,
      qIndex: 0,
      score: 0,
      answered: false,
      questions: []
    }
  };

  const BRIDGE_DATA = [
    { a: 1, b: 9, tip: "1 and 9 make 10, so 11 and 9 make 20!" },
    { a: 2, b: 8, tip: "2 and 8 make 10, so 12 and 8 make 20!" },
    { a: 3, b: 7, tip: "3 and 7 make 10, so 13 and 7 make 20!" },
    { a: 4, b: 6, tip: "4 and 6 make 10, so 14 and 6 make 20!" },
    { a: 5, b: 5, tip: "5 and 5 make 10, so 15 and 5 make 20!" },
    { a: 6, b: 4, tip: "6 and 4 make 10, so 16 and 4 make 20!" },
    { a: 7, b: 3, tip: "7 and 3 make 10, so 17 and 3 make 20!" },
    { a: 8, b: 2, tip: "8 and 2 make 10, so 18 and 2 make 20!" },
    { a: 9, b: 1, tip: "9 and 1 make 10, so 19 and 1 make 20!" },
    { a: 10, b: 0, tip: "10 and 0 make 10, so 20 and 0 make 20!" }
  ];

  /* ================= MODE SWITCHING ================= */
  window.switchBondsMode = function (mode) {
    state.currentMode = mode;
    const mobileSelect = document.getElementById('activitySelect');
    if (mobileSelect) mobileSelect.value = mode;
    if (window.sound) window.sound.playPop();

    // Update Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`tabBtn_${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Panels
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`view_${mode}`);
    if (activePanel) activePanel.classList.add('active');

    // Trigger Initial Renders
    if (mode === 'frames') renderDualFrames();
    if (mode === 'ppw') renderPPW();
    if (mode === 'bridge') renderBridge();
    if (mode === 'story') renderStoryMachine();
    if (mode === 'threepart') renderThreePart();
    if (mode === 'quiz') startQuiz(state.quiz.level);
  };

  /* ================= AUDIO TOGGLE ================= */
  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.innerHTML = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  /* ================= MODULE 1: DUAL TEN-FRAMES ================= */
  function renderDualFrames() {
    const red = state.frames.redCount;
    const yellow = 20 - red;

    // Update equation display
    const eqRed = document.getElementById('eqRed');
    const eqYellow = document.getElementById('eqYellow');
    const eqSub = document.getElementById('eqSub');
    const slider = document.getElementById('frameSlider');

    if (eqRed) eqRed.textContent = red;
    if (eqYellow) eqYellow.textContent = yellow;
    if (slider) slider.value = red;

    if (eqSub) {
      if (red >= 10) {
        const ones = red - 10;
        eqSub.textContent = `10 (Full Frame) + ${ones} + ${yellow} = 20 Total!`;
      } else {
        const needForTen = 10 - red;
        eqSub.textContent = `${red} + ${needForTen} = 10, plus 10 more = 20!`;
      }
    }

    // Render Grid 1 (Slots 0 to 9)
    const grid1 = document.getElementById('frameGrid1');
    if (grid1) {
      grid1.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', `Slot ${i + 1}`);
        cell.onclick = () => setFrameRed(i + 1);

        if (i < red) {
          const token = document.createElement('div');
          token.className = 'counter-token red';
          token.textContent = i + 1;
          cell.appendChild(token);
        } else {
          const token = document.createElement('div');
          token.className = 'counter-token yellow';
          token.textContent = (i - red) + 1;
          cell.appendChild(token);
        }
        grid1.appendChild(cell);
      }
    }

    // Render Grid 2 (Slots 10 to 19)
    const grid2 = document.getElementById('frameGrid2');
    if (grid2) {
      grid2.innerHTML = '';
      for (let i = 10; i < 20; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', `Slot ${i + 1}`);
        cell.onclick = () => setFrameRed(i + 1);

        if (i < red) {
          const token = document.createElement('div');
          token.className = 'counter-token red';
          token.textContent = i + 1;
          cell.appendChild(token);
        } else {
          const token = document.createElement('div');
          token.className = 'counter-token yellow';
          const yellowIndex = (i < red) ? 0 : (i - red + 1);
          token.textContent = yellowIndex;
          cell.appendChild(token);
        }
        grid2.appendChild(cell);
      }
    }

    // Highlight active preset chip
    document.querySelectorAll('#view_frames .preset-chip').forEach(chip => {
      const chipVal = parseInt(chip.dataset.val, 10);
      chip.classList.toggle('active', chipVal === red);
    });
  }

  window.setFrameRed = function (n) {
    if (n < 0) n = 0;
    if (n > 20) n = 20;
    state.frames.redCount = n;
    if (window.sound) window.sound.playPop();
    renderDualFrames();
  };

  window.adjustFrameRed = function (delta) {
    window.setFrameRed(state.frames.redCount + delta);
  };

  window.onFrameSliderChange = function (val) {
    window.setFrameRed(parseInt(val, 10));
  };

  /* ================= MODULE 2: PART-PART-WHOLE ================= */
  window.setPPWMode = function (mode) {
    state.ppw.mode = mode;
    if (window.sound) window.sound.playPop();

    document.querySelectorAll('.ppw-mode-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`ppwMode_${mode}`);
    if (btn) btn.classList.add('active');

    if (mode === 'mystery') {
      nextMysteryPPW();
    } else {
      renderPPW();
    }
  };

  function nextMysteryPPW() {
    state.ppw.answered = false;
    const part1 = Math.floor(Math.random() * 21);
    state.ppw.givenPart = part1;
    state.ppw.missingPartIndex = Math.random() < 0.5 ? 1 : 2;
    renderPPW();
  }

  function renderPPW() {
    const isMystery = state.ppw.mode === 'mystery';
    const container = document.getElementById('ppwInteractiveArea');
    if (!container) return;

    if (!isMystery) {
      const p1 = state.ppw.exploreVal;
      const p2 = 20 - p1;

      container.innerHTML = `
        <div class="ppw-tree-wrapper">
          <svg class="ppw-svg-lines" viewBox="0 0 320 240">
            <line x1="160" y1="43" x2="59" y2="197" stroke="#059669" stroke-width="4" stroke-dasharray="6,6" />
            <line x1="160" y1="43" x2="261" y2="197" stroke="#059669" stroke-width="4" stroke-dasharray="6,6" />
          </svg>
          <div class="ppw-node ppw-pos-whole theme-whole">
            <span class="ppw-node-val">20</span>
            <span class="ppw-node-lbl">Whole</span>
          </div>
          <div class="ppw-node ppw-pos-part1 theme-part1">
            <span class="ppw-node-val">${p1}</span>
            <span class="ppw-node-lbl">Part</span>
          </div>
          <div class="ppw-node ppw-pos-part2 theme-part2">
            <span class="ppw-node-val">${p2}</span>
            <span class="ppw-node-lbl">Part</span>
          </div>
        </div>

        <div class="ppw-options-bar">
          <div class="ppw-prompt">Pick Part 1 to see how 20 splits:</div>
          <div class="ppw-choices-grid">
            ${Array.from({ length: 21 }, (_, i) => `
              <button class="choice-btn ${i === p1 ? 'active' : ''}" onclick="setPPWExploreVal(${i})">${i}</button>
            `).join('')}
          </div>
          <div class="tip-banner" style="margin-top: 10px;">
            💡 <strong>Equation:</strong> ${p1} + ${p2} = 20 &nbsp;•&nbsp; 20 - ${p1} = ${p2}
          </div>
        </div>
      `;
    } else {
      const given = state.ppw.givenPart;
      const targetMissing = 20 - given;
      const missingIdx = state.ppw.missingPartIndex;

      const choicesSet = new Set([targetMissing]);
      while (choicesSet.size < 4) {
        let fake = targetMissing + (Math.floor(Math.random() * 7) - 3);
        if (fake >= 0 && fake <= 20 && fake !== targetMissing) {
          choicesSet.add(fake);
        } else {
          choicesSet.add(Math.floor(Math.random() * 21));
        }
      }
      const choices = Array.from(choicesSet).sort(() => Math.random() - 0.5);

      const p1Val = missingIdx === 1 ? '?' : given;
      const p2Val = missingIdx === 2 ? '?' : given;

      container.innerHTML = `
        <div class="ppw-tree-wrapper">
          <svg class="ppw-svg-lines" viewBox="0 0 320 240">
            <line x1="160" y1="43" x2="59" y2="197" stroke="#059669" stroke-width="4" />
            <line x1="160" y1="43" x2="261" y2="197" stroke="#059669" stroke-width="4" />
          </svg>
          <div class="ppw-node ppw-pos-whole theme-whole">
            <span class="ppw-node-val">20</span>
            <span class="ppw-node-lbl">Whole</span>
          </div>
          <div class="ppw-node ppw-pos-part1 theme-part1 ${missingIdx === 1 ? 'mystery' : ''}" id="nodePart1">
            <span class="ppw-node-val">${p1Val}</span>
            <span class="ppw-node-lbl">Part</span>
          </div>
          <div class="ppw-node ppw-pos-part2 theme-part2 ${missingIdx === 2 ? 'mystery' : ''}" id="nodePart2">
            <span class="ppw-node-val">${p2Val}</span>
            <span class="ppw-node-lbl">Part</span>
          </div>
        </div>

        <div class="ppw-options-bar">
          <div class="ppw-prompt" id="ppwPromptText">
            What number pairs with <strong>${given}</strong> to make <strong>20</strong>?
          </div>
          <div class="ppw-choices-grid" id="ppwChoicesContainer">
            ${choices.map(c => `
              <button class="choice-btn" onclick="checkPPWMystery(${c}, ${targetMissing})">${c}</button>
            `).join('')}
          </div>
          <div id="ppwFeedback" class="quiz-feedback-banner"></div>
        </div>
      `;
    }
  }

  window.setPPWExploreVal = function (v) {
    state.ppw.exploreVal = v;
    if (window.sound) window.sound.playPop();
    renderPPW();
  };

  window.checkPPWMystery = function (selected, correct) {
    if (state.ppw.answered) return;
    const fb = document.getElementById('ppwFeedback');
    const mysteryNode = document.querySelector('.ppw-node.mystery');

    if (selected === correct) {
      state.ppw.answered = true;
      if (window.sound) window.sound.playCorrect();
      if (window.AppUtils) window.AppUtils.confetti({ particleCount: 30 });

      if (mysteryNode) {
        mysteryNode.classList.remove('mystery');
        mysteryNode.querySelector('.ppw-node-val').textContent = correct;
      }

      if (fb) {
        fb.className = 'quiz-feedback-banner correct';
        fb.innerHTML = `🎉 Correct! <strong>${state.ppw.givenPart} + ${correct} = 20</strong>`;
      }

      setTimeout(() => {
        nextMysteryPPW();
      }, 1600);
    } else {
      if (window.sound) window.sound.playWrong();
      if (fb) {
        fb.className = 'quiz-feedback-banner wrong';
        fb.innerHTML = `💭 Not quite! Try again: what added to ${state.ppw.givenPart} gives 20?`;
      }
    }
  };

  /* ================= MODULE 3: BRIDGE THROUGH 10 ================= */
  function renderBridge() {
    const item = BRIDGE_DATA[state.bridge.currentIndex];
    const leftTenFrame = document.getElementById('bridgeLeftGrid');
    const rightTwentyFrame1 = document.getElementById('bridgeRightGrid1');
    const rightTwentyFrame2 = document.getElementById('bridgeRightGrid2');

    if (leftTenFrame) {
      leftTenFrame.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        const token = document.createElement('div');
        if (i < item.a) {
          token.className = 'counter-token red';
          token.textContent = i + 1;
        } else {
          token.className = 'counter-token yellow';
          token.textContent = i - item.a + 1;
        }
        cell.appendChild(token);
        leftTenFrame.appendChild(cell);
      }
    }

    if (rightTwentyFrame1 && rightTwentyFrame2) {
      rightTwentyFrame1.innerHTML = '';
      rightTwentyFrame2.innerHTML = '';

      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        const token = document.createElement('div');
        token.className = 'counter-token red';
        token.textContent = i + 1;
        cell.appendChild(token);
        rightTwentyFrame1.appendChild(cell);
      }

      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        const token = document.createElement('div');
        if (i < item.a) {
          token.className = 'counter-token red';
          token.textContent = 10 + i + 1;
        } else {
          token.className = 'counter-token yellow';
          token.textContent = i - item.a + 1;
        }
        cell.appendChild(token);
        rightTwentyFrame2.appendChild(cell);
      }
    }

    const leftEq = document.getElementById('bridgeLeftEq');
    const rightEq = document.getElementById('bridgeRightEq');
    const insight = document.getElementById('bridgeInsightText');
    const indexLbl = document.getElementById('bridgeStepLabel');

    if (leftEq) leftEq.innerHTML = `<span style="color:#DC2626">${item.a}</span> + <span style="color:#D97706">${item.b}</span> = 10`;
    if (rightEq) rightEq.innerHTML = `<span style="color:#DC2626">${10 + item.a}</span> + <span style="color:#D97706">${item.b}</span> = 20`;
    if (insight) insight.innerHTML = `🌟 <strong>Pattern Secret:</strong> ${item.tip}`;
    if (indexLbl) indexLbl.textContent = `Pair ${state.bridge.currentIndex + 1} of ${BRIDGE_DATA.length}`;
  }

  window.prevBridge = function () {
    if (state.bridge.currentIndex > 0) {
      state.bridge.currentIndex--;
      if (window.sound) window.sound.playPop();
      renderBridge();
    }
  };

  window.nextBridge = function () {
    if (state.bridge.currentIndex < BRIDGE_DATA.length - 1) {
      state.bridge.currentIndex++;
      if (window.sound) window.sound.playPop();
      renderBridge();
    }
  };

  /* ================= MODULE 4: 4-IN-1 STORY MACHINE ================= */
  function renderStoryMachine() {
    const partA = state.story.partA;
    const partB = 20 - partA;
    const swapped = state.story.swapped;
    const poured = state.story.poured;

    const bagTray = document.getElementById('storyBagTray');
    const statusLabel = document.getElementById('storyBagStatus');
    const slider = document.getElementById('storySlider');

    if (slider) slider.value = partA;

    if (statusLabel) {
      if (poured === 'A') {
        statusLabel.innerHTML = `📤 Took away <strong>${partA} red balls</strong>! <strong>${partB} yellow balls</strong> remain.`;
      } else if (poured === 'B') {
        statusLabel.innerHTML = `📤 Took away <strong>${partB} yellow balls</strong>! <strong>${partA} red balls</strong> remain.`;
      } else if (swapped) {
        statusLabel.innerHTML = `🔄 Turned the bag! Now <strong>${partB} yellow</strong> + <strong>${partA} red</strong> = <strong>20 balls</strong>!`;
      } else {
        statusLabel.innerHTML = `✨ Full Bag: <strong>${partA} red</strong> + <strong>${partB} yellow</strong> = <strong>20 balls</strong>`;
      }
    }

    if (bagTray) {
      bagTray.innerHTML = '';
      const order = swapped ? ['B', 'A'] : ['A', 'B'];

      order.forEach(team => {
        const count = team === 'A' ? partA : partB;
        const colorClass = team === 'A' ? 'red' : 'yellow';
        const isPoured = poured === team;

        for (let i = 0; i < count; i++) {
          const ball = document.createElement('div');
          ball.className = `story-ball ${colorClass} ${isPoured ? 'poured' : ''}`;
          ball.textContent = i + 1;
          ball.title = `${team === 'A' ? 'Red' : 'Yellow'} Ball ${i + 1}`;
          bagTray.appendChild(ball);
        }
      });
    }

    // Update 4 Fact Equations
    const eqAdd1 = document.getElementById('factEq_add1');
    const eqAdd2 = document.getElementById('factEq_add2');
    const eqSub1 = document.getElementById('factEq_sub1');
    const eqSub2 = document.getElementById('factEq_sub2');

    if (eqAdd1) eqAdd1.innerHTML = `<span class="red-txt">${partA}</span> + <span class="yellow-txt">${partB}</span> = 20`;
    if (eqAdd2) eqAdd2.innerHTML = `<span class="yellow-txt">${partB}</span> + <span class="red-txt">${partA}</span> = 20`;
    if (eqSub1) eqSub1.innerHTML = `20 − <span class="red-txt">${partA}</span> = <span class="yellow-txt">${partB}</span>`;
    if (eqSub2) eqSub2.innerHTML = `20 − <span class="yellow-txt">${partB}</span> = <span class="red-txt">${partA}</span>`;

    // Highlight active card
    ['add1', 'add2', 'sub1', 'sub2'].forEach(id => {
      const card = document.getElementById(`factCard_${id}`);
      if (card) card.classList.remove('active-story');
    });

    let activeCardId = 'add1';
    if (poured === 'A') activeCardId = 'sub1';
    else if (poured === 'B') activeCardId = 'sub2';
    else if (swapped) activeCardId = 'add2';

    const targetCard = document.getElementById(`factCard_${activeCardId}`);
    if (targetCard) targetCard.classList.add('active-story');
  }

  window.setStoryPartA = function (val) {
    state.story.partA = Math.max(0, Math.min(20, parseInt(val, 10)));
    state.story.poured = null;
    if (window.sound) window.sound.playPop();
    renderStoryMachine();
  };

  window.adjustStoryPartA = function (delta) {
    window.setStoryPartA(state.story.partA + delta);
  };

  window.onStorySliderChange = function (val) {
    state.story.partA = parseInt(val, 10);
    state.story.poured = null;
    renderStoryMachine();
  };

  window.storySwapParts = function () {
    state.story.swapped = !state.story.swapped;
    state.story.poured = null;
    if (window.sound) window.sound.playPop();
    renderStoryMachine();
  };

  window.storyPourOut = function (part) {
    state.story.poured = (state.story.poured === part) ? null : part;
    if (window.sound) window.sound.playPop();
    renderStoryMachine();
  };

  window.storyResetBag = function () {
    state.story.poured = null;
    state.story.swapped = false;
    if (window.sound) window.sound.playCorrect();
    renderStoryMachine();
  };

  /* ================= MODULE 5: 3-PART COMBINER ================= */
  function renderThreePart() {
    const nums = state.threepart.nums;
    const selected = state.threepart.selectedBags;
    const bagsRow = document.getElementById('threepartBagsRow');
    const treeCard = document.getElementById('threepartTreeCard');
    const runningGrid1 = document.getElementById('runningGrid1');
    const runningGrid2 = document.getElementById('runningGrid2');
    const runningTotalText = document.getElementById('runningTotalText');
    const runningStatus = document.getElementById('runningTotalStatus');

    const emojis = ['⚽', '🏀', '🎾'];
    const bagLetters = ['A', 'B', 'C'];
    const bagColors = ['#059669', '#3B82F6', '#F59E0B'];

    // Render 3 Bags
    if (bagsRow) {
      bagsRow.innerHTML = nums.map((n, idx) => {
        const isChosen = selected.includes(idx);
        const orderNum = selected.indexOf(idx) + 1;
        return `
          <div class="sport-bag-card ${isChosen ? 'chosen' : ''}" onclick="onBagClick(${idx})">
            <div class="bag-icon-bubble">${emojis[idx]}</div>
            <div class="bag-title">Bag ${bagLetters[idx]}</div>
            <div class="bag-count">${n} balls</div>
            <div class="bag-status-badge">
              ${isChosen ? `Joined #${orderNum} ✓` : 'Tap to Join'}
            </div>
          </div>
        `;
      }).join('');
    }

    // Calculate Running Sum
    const currentSum = selected.reduce((sum, idx) => sum + nums[idx], 0);

    // Render Dual Frame Counters
    if (runningGrid1 && runningGrid2) {
      runningGrid1.innerHTML = '';
      runningGrid2.innerHTML = '';

      let counter = 0;
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        if (counter < currentSum) {
          const token = document.createElement('div');
          token.className = 'counter-token green';
          token.textContent = counter + 1;
          cell.appendChild(token);
        }
        runningGrid1.appendChild(cell);
        counter++;
      }

      for (let i = 10; i < 20; i++) {
        const cell = document.createElement('div');
        cell.className = 'frame-cell';
        if (counter < currentSum) {
          const token = document.createElement('div');
          token.className = 'counter-token green';
          token.textContent = counter + 1;
          cell.appendChild(token);
        }
        runningGrid2.appendChild(cell);
        counter++;
      }
    }

    if (runningTotalText) {
      runningTotalText.innerHTML = `Balls joined into big bag: <strong>${currentSum} / 20</strong>`;
    }

    // Render Stepped Tree Card
    if (treeCard) {
      if (selected.length === 0) {
        if (runningStatus) runningStatus.textContent = 'Step 1: Tap 2 friendly bags';
        treeCard.innerHTML = `
          <div class="tree-instruction">
            👆 <strong>Step 1:</strong> Tap two bags above that make a friendly number first!
          </div>
        `;
      } else if (selected.length === 1) {
        if (runningStatus) runningStatus.textContent = 'Step 1: Tap 2nd bag';
        const b1 = nums[selected[0]];
        treeCard.innerHTML = `
          <div class="tree-instruction">
            Now pick another bag to pair with <strong>Bag ${bagLetters[selected[0]]} (${b1})</strong>!
          </div>
        `;
      } else if (selected.length === 2) {
        if (runningStatus) runningStatus.textContent = 'Step 2: Add the last bag';
        const b1 = nums[selected[0]];
        const b2 = nums[selected[1]];
        const sub = b1 + b2;
        const remainingIdx = [0, 1, 2].find(i => !selected.includes(i));
        const b3 = nums[remainingIdx];

        treeCard.innerHTML = `
          <div class="tree-subtotal-bubble">
            🌟 <strong>Step 1 Subtotal:</strong> ${b1} + ${b2} = <strong>${sub}</strong>!
          </div>
          <div class="tree-instruction" style="margin-top:8px;">
            Now tap the last bag <strong>Bag ${bagLetters[remainingIdx]} (${b3})</strong> to complete 20! (${sub} + ${b3} = 20)
          </div>
        `;
      } else if (selected.length === 3) {
        if (runningStatus) runningStatus.textContent = '🎉 Mission Accomplished!';
        const b1 = nums[selected[0]];
        const b2 = nums[selected[1]];
        const b3 = nums[selected[2]];
        const sub = b1 + b2;

        treeCard.innerHTML = `
          <div class="tree-complete-banner">
            🎉 <strong>Great Thinking!</strong> (${b1} + ${b2}) + ${b3} = <strong>${sub} + ${b3} = 20!</strong>
          </div>
          <p style="font-size:0.88rem; color:#065F46; margin-top:6px;">
            You proved that 3 numbers can be added in any friendly order to reach 20!
          </p>
        `;
      }
    }
  }

  window.onBagClick = function (bagIdx) {
    const selected = state.threepart.selectedBags;
    if (selected.includes(bagIdx)) return;

    selected.push(bagIdx);
    if (window.sound) window.sound.playPop();

    if (selected.length === 3) {
      if (window.sound) window.sound.playCorrect();
      if (window.AppUtils) window.AppUtils.confetti({ particleCount: 45 });
    }

    renderThreePart();
  };

  window.resetThreePartStep = function () {
    state.threepart.selectedBags = [];
    if (window.sound) window.sound.playPop();
    renderThreePart();
  };

  window.setThreePartPreset = function (idx) {
    state.threepart.presetIndex = idx;
    state.threepart.nums = [...state.threepart.presets[idx]];
    state.threepart.selectedBags = [];

    document.querySelectorAll('#view_threepart .preset-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === idx);
    });

    if (window.sound) window.sound.playPop();
    renderThreePart();
  };

  window.randomizeThreePart = function () {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * (19 - a)) + 1;
    const c = 20 - a - b;
    state.threepart.nums = [a, b, c];
    state.threepart.selectedBags = [];

    document.querySelectorAll('#view_threepart .preset-chip').forEach(chip => {
      chip.classList.remove('active');
    });

    if (window.sound) window.sound.playPop();
    renderThreePart();
  };

  /* ================= MODULE 6: MASTERY QUIZ ================= */
  const QUIZ_LEVEL_PRESETS = {
    1: [
      { q: "What number pairs with 14 to make 20?", visual: "14 + [ ? ] = 20", correct: 6, options: [4, 6, 8, 16], exp: "14 + 6 = 20 (4 + 6 = 10, plus 10 = 20)" },
      { q: "What number pairs with 8 to make 20?", visual: "8 + [ ? ] = 20", correct: 12, options: [10, 11, 12, 14], exp: "8 + 12 = 20" },
      { q: "Fill in the missing part:", visual: "[ ? ] + 15 = 20", correct: 5, options: [3, 4, 5, 10], exp: "5 + 15 = 20" },
      { q: "What number pairs with 19 to make 20?", visual: "19 + [ ? ] = 20", correct: 1, options: [1, 2, 9, 11], exp: "19 + 1 = 20" },
      { q: "Both parts are equal! What is half of 20?", visual: "[ ? ] + [ ? ] = 20", correct: 10, options: [8, 9, 10, 12], exp: "10 + 10 = 20 (Double 10!)" }
    ],
    2: [
      { q: "Bridge clue: Since 3 + 7 = 10, what is 13 + 7?", visual: "13 + 7 = [ ? ]", correct: 20, options: [17, 19, 20, 21], exp: "The ones make 10, plus 10 = 20!" },
      { q: "Bridge clue: Since 6 + 4 = 10, what pairs with 16 to make 20?", visual: "16 + [ ? ] = 20", correct: 4, options: [2, 4, 6, 14], exp: "16 needs 4 to reach 20." },
      { q: "Bridge clue: Since 8 + 2 = 10, what is 18 + 2?", visual: "18 + 2 = [ ? ]", correct: 20, options: [19, 20, 22, 28], exp: "18 + 2 = 20" },
      { q: "Bridge clue: Since 1 + 9 = 10, what pairs with 11 to make 20?", visual: "11 + [ ? ] = 20", correct: 9, options: [8, 9, 10, 19], exp: "11 + 9 = 20" },
      { q: "Which equation matches: 5 + 5 = 10 bridged to 20?", visual: "[ ? ]", correct: "15 + 5 = 20", options: ["15 + 5 = 20", "15 + 15 = 20", "5 + 20 = 25", "10 + 5 = 20"], exp: "15 + 5 = 20" }
    ],
    3: [
      { q: "Ten-frame eye: A full ten-frame (10) plus 3 more red counters. How many yellow to make 20?", visual: "13 red + [ ? ] yellow = 20", correct: 7, options: [6, 7, 8, 17], exp: "13 + 7 = 20" },
      { q: "You have 17 red dots on dual ten-frames. How many empty slots to 20?", visual: "20 - 17 = [ ? ]", correct: 3, options: [2, 3, 5, 7], exp: "There are 3 empty spots left to fill 20." },
      { q: "If Frame 1 has 9 counters and Frame 2 has 9 counters, do they make 20?", visual: "9 + 9 = [ ? ]", correct: "No (18)", options: ["Yes (20)", "No (18)", "No (19)", "Yes (22)"], exp: "9 + 9 = 18. You need 2 more to make 20!" },
      { q: "How many counters must you add to 11 to fill both 10-frames?", visual: "11 + [ ? ] = 20", correct: 9, options: [7, 8, 9, 10], exp: "11 + 9 = 20" },
      { q: "One full frame of 10 plus 2 counters. What is the partner?", visual: "12 + [ ? ] = 20", correct: 8, options: [6, 7, 8, 9], exp: "12 + 8 = 20" }
    ],
    4: [
      { q: "Speed Bond: Which pair does NOT make 20?", visual: "Spot the impostor!", correct: "13 + 8", options: ["14 + 6", "13 + 8", "12 + 8", "11 + 9"], exp: "13 + 8 = 21, not 20!" },
      { q: "Speed Bond: 7 + 13 = ?", visual: "7 + 13 = [ ? ]", correct: 20, options: [19, 20, 21, 22], exp: "7 + 13 = 20" },
      { q: "Speed Bond: 20 - 4 = ?", visual: "20 - 4 = [ ? ]", correct: 16, options: [14, 15, 16, 17], exp: "20 - 4 = 16" },
      { q: "Speed Bond: 20 - 12 = ?", visual: "20 - 12 = [ ? ]", correct: 8, options: [6, 7, 8, 9], exp: "20 - 12 = 8" },
      { q: "Speed Bond: What is 20 - 18?", visual: "20 - 18 = [ ? ]", correct: 2, options: [1, 2, 3, 4], exp: "20 - 18 = 2" }
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
        <button class="quiz-option-btn" data-val="${opt}" onclick="submitQuizAnswer('${opt}')">${opt}</button>
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

    // Highlight options & lock buttons
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
        feedbackEl.innerHTML = `🌟 Excellent! ${q.exp}`;
      }
    } else {
      if (window.sound) window.sound.playWrong();
      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback-banner wrong';
        feedbackEl.innerHTML = `💡 Nice try! Correct answer: <strong>${q.correct}</strong> (${q.exp})`;
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
        <button class="action-btn" onclick="startQuiz(${state.quiz.level})" style="grid-column: span 2;">
          🔄 Play Again
        </button>
        <button class="action-btn secondary" onclick="startQuiz(${(state.quiz.level % 4) + 1})" style="grid-column: span 2;">
          ⏩ Next Level (Level ${(state.quiz.level % 4) + 1})
        </button>
      `;
    }
  }

  /* ================= BOOTSTRAP ================= */
  window.addEventListener('DOMContentLoaded', () => {
    renderDualFrames();
    renderPPW();
    renderBridge();
    renderStoryMachine();
    renderThreePart();
    startQuiz(1);
  });

})();