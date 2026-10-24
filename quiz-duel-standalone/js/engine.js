/**
 * Standalone Quiz Duel Game Engine
 * 
 * Supports:
 * - Turn-based classroom duels (Team 1 vs Team 2)
 * - Configurable turn timers (Untimed, 15s, 20s, 25s, 30s)
 * - Automatic 2s turn advance + instant-skip buttons
 * - Knockout conditions (lead of 4) or 8-round victory
 * - Modular question sets from QuestionProvider
 */

(function () {
  'use strict';

  /* ================= ENGINE STATE ================= */
  const state = {
    selectedSetKey: 'set1',
    mode: 'tug_of_war', // 'tug_of_war' | 'speed_duel' | 'sudden_death'
    turnTimeLimit: 0,   // 0 = untimed, or 15, 20, 25, 30
    timerRemaining: 0,
    timerInterval: null,
    autoAdvanceTimer: null,
    autoAdvanceCountdown: null,
    inLobby: true,
    currentRound: 1,
    totalRounds: 8,
    knockoutLead: 4,
    currentTurn: 'team1',
    ropePosition: 0,
    team1Score: 0,
    team2Score: 0,
    answered: false,
    gameOver: false,
    questionsTeam1: [],
    questionsTeam2: [],
    qIndexTeam1: 0,
    qIndexTeam2: 0,
    currentActiveQ: null
  };

  /* ================= AUTO-ADVANCE HELPERS ================= */
  function clearAutoAdvance() {
    if (state.autoAdvanceTimer) {
      clearTimeout(state.autoAdvanceTimer);
      state.autoAdvanceTimer = null;
    }
    if (state.autoAdvanceCountdown) {
      clearInterval(state.autoAdvanceCountdown);
      state.autoAdvanceCountdown = null;
    }
  }

  function triggerTurnTransition(isLastTurn, nextTeamName) {
    clearAutoAdvance();

    const isT1 = (state.currentTurn === 'team1');
    const sideNextBtn = document.getElementById(isT1 ? 'team1NextBtn' : 'team2NextBtn');
    const stadiumBar = document.getElementById('stadiumActionBar');
    const stadiumNextBtn = document.getElementById('stadiumNextBtn');

    if (stadiumBar) stadiumBar.style.display = 'flex';
    if (sideNextBtn) {
      sideNextBtn.style.display = 'block';
      sideNextBtn.classList.add('visible');
    }

    let secLeft = 2;
    const setLabels = () => {
      const text = isLastTurn
        ? `🏆 See Final Results (${secLeft}s)`
        : `Next: ${nextTeamName} ➔ (${secLeft}s)`;
      if (stadiumNextBtn) stadiumNextBtn.innerHTML = text;
      if (sideNextBtn) sideNextBtn.innerHTML = text;
    };
    setLabels();

    state.autoAdvanceCountdown = setInterval(() => {
      secLeft--;
      if (secLeft > 0) {
        setLabels();
      } else {
        if (state.autoAdvanceCountdown) {
          clearInterval(state.autoAdvanceCountdown);
          state.autoAdvanceCountdown = null;
        }
      }
    }, 1000);

    // Auto-advance automatically after 2.2 seconds
    state.autoAdvanceTimer = setTimeout(() => {
      clearAutoAdvance();
      if (!state.gameOver && state.answered && !state.inLobby) {
        if (isLastTurn) {
          finishMatch('completed');
        } else {
          advanceTurn();
        }
      }
    }, 2200);

    // Instant-skip click handler
    const clickHandler = () => {
      clearAutoAdvance();
      if (isLastTurn) {
        finishMatch('completed');
      } else {
        advanceTurn();
      }
    };

    if (stadiumNextBtn) stadiumNextBtn.onclick = clickHandler;
    if (sideNextBtn) sideNextBtn.onclick = clickHandler;

    try {
      if (stadiumBar) stadiumBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {}
  }

  /* ================= TIMER FUNCTIONS ================= */
  function stopTurnTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    const pill = document.getElementById('hudTimerPill');
    if (pill) {
      pill.classList.remove('alert');
    }
  }

  function startTurnTimer() {
    stopTurnTimer();
    const pill = document.getElementById('hudTimerPill');

    if (state.turnTimeLimit <= 0) {
      if (pill) {
        pill.textContent = '⏱️ Untimed';
        pill.classList.remove('alert');
      }
      return;
    }

    state.timerRemaining = state.turnTimeLimit;
    if (pill) {
      pill.textContent = `⏱️ ${state.timerRemaining}s`;
      pill.classList.remove('alert');
    }

    state.timerInterval = setInterval(() => {
      if (state.answered || state.gameOver || state.inLobby) {
        stopTurnTimer();
        return;
      }

      state.timerRemaining--;

      if (pill) {
        pill.textContent = `⏱️ ${Math.max(0, state.timerRemaining)}s`;
        if (state.timerRemaining <= 5 && state.timerRemaining > 0) {
          pill.classList.add('alert');
          try {
            if (window.sound && typeof window.sound.playPop === 'function') {
              window.sound.playPop();
            }
          } catch (e) {}
        }
      }

      if (state.timerRemaining <= 0) {
        stopTurnTimer();
        handleTurnTimeout();
      }
    }, 1000);
  }

  function handleTurnTimeout() {
    if (state.answered || state.gameOver) return;
    state.answered = true;

    const isT1 = (state.currentTurn === 'team1');
    const activeQ = state.currentActiveQ;
    if (!activeQ) return;

    const activePanel = document.getElementById(isT1 ? 'team1Panel' : 'team2Panel');
    const allBtns = activePanel ? activePanel.querySelectorAll('.choice-btn') : [];

    allBtns.forEach(btn => {
      btn.disabled = true;
      const val = parseInt(btn.textContent.trim(), 10);
      if (val === activeQ.correct) {
        btn.classList.add('correct-pick');
      }
    });

    try {
      if (window.sound && typeof window.sound.playBuzz === 'function') {
        window.sound.playBuzz();
      }
    } catch (e) {}

    const feedbackEl = document.getElementById(isT1 ? 'team1Feedback' : 'team2Feedback');
    if (feedbackEl) {
      feedbackEl.className = 'feedback-box wrong';
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `⏰ <strong>TIME'S UP!</strong> Answer: <strong>${activeQ.correct}</strong>. ${activeQ.tip}`;
    }

    const isLastTurn = (state.currentRound === state.totalRounds && state.currentTurn === 'team2');
    const nextTeamName = isT1 ? "Team 2" : "Team 1";
    triggerTurnTransition(isLastTurn, nextTeamName);
  }

  /* ================= LOBBY CONTROLS ================= */
  window.selectTurnTimer = function (seconds) {
    state.turnTimeLimit = parseInt(seconds, 10);
    document.querySelectorAll('.timer-choice-btn').forEach(btn => {
      const val = parseInt(btn.getAttribute('data-time'), 10);
      btn.classList.toggle('active', val === state.turnTimeLimit);
    });
    const pill = document.getElementById('hudTimerPill');
    if (pill) {
      pill.textContent = state.turnTimeLimit > 0 ? `⏱️ ${state.turnTimeLimit}s` : '⏱️ Untimed';
    }
    try { if (window.sound && typeof window.sound.playPop === 'function') window.sound.playPop(); } catch (e) {}
  };

  window.selectLobbyMatchSet = function (setKey) {
    state.selectedSetKey = setKey;
    document.querySelectorAll('.lobby-match-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set') === setKey);
    });
    const b1 = document.getElementById('btnSet1');
    const b2 = document.getElementById('btnSet2');
    const bS = document.getElementById('btnShuffle');
    if (b1) b1.classList.toggle('active', setKey === 'set1');
    if (b2) b2.classList.toggle('active', setKey === 'set2');
    if (bS) bS.classList.toggle('active', setKey === 'shuffle');
    try { if (window.sound && typeof window.sound.playPop === 'function') window.sound.playPop(); } catch (e) {}
  };

  window.startDuelFromLobby = function () {
    const lobby = document.getElementById('startLobbyOverlay');
    if (lobby) lobby.classList.add('hidden');
    state.inLobby = false;
    startMatch(state.selectedSetKey, false);
    startTurnTimer();
  };

  window.openLobby = function () {
    clearAutoAdvance();
    stopTurnTimer();
    state.inLobby = true;
    const stadiumBar = document.getElementById('stadiumActionBar');
    if (stadiumBar) stadiumBar.style.display = 'none';
    const lobby = document.getElementById('startLobbyOverlay');
    if (lobby) lobby.classList.remove('hidden');
  };

  /* ================= START MATCH ================= */
  window.startMatch = function (setKey, showLobby) {
    clearAutoAdvance();
    stopTurnTimer();
    state.selectedSetKey = setKey || 'set1';
    state.currentRound = 1;
    state.currentTurn = 'team1';
    state.ropePosition = 0;
    state.team1Score = 0;
    state.team2Score = 0;
    state.answered = false;
    state.gameOver = false;
    state.qIndexTeam1 = 0;
    state.qIndexTeam2 = 0;

    state.inLobby = (showLobby === true);
    const lobby = document.getElementById('startLobbyOverlay');
    if (lobby) {
      if (state.inLobby) {
        lobby.classList.remove('hidden');
      } else {
        lobby.classList.add('hidden');
      }
    }

    const stadiumBar = document.getElementById('stadiumActionBar');
    if (stadiumBar) stadiumBar.style.display = 'none';

    // Load questions from QuestionProvider
    if (window.QuestionProvider) {
      const qData = window.QuestionProvider.getQuestions(state.selectedSetKey);
      state.questionsTeam1 = qData.team1;
      state.questionsTeam2 = qData.team2;
    }

    // Sync Header buttons
    const btnSet1 = document.getElementById('btnSet1');
    const btnSet2 = document.getElementById('btnSet2');
    const btnShuffle = document.getElementById('btnShuffle');
    if (btnSet1) btnSet1.classList.toggle('active', state.selectedSetKey === 'set1');
    if (btnSet2) btnSet2.classList.toggle('active', state.selectedSetKey === 'set2');
    if (btnShuffle) btnShuffle.classList.toggle('active', state.selectedSetKey === 'shuffle');

    // Sync Lobby buttons
    document.querySelectorAll('.lobby-match-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set') === state.selectedSetKey);
    });

    const victoryModal = document.getElementById('victoryModal');
    if (victoryModal) victoryModal.classList.remove('active');

    const svgEl = document.getElementById('stadiumSvg');
    if (svgEl) svgEl.setAttribute('class', 'stadium-svg idle');

    updateHUD();
    renderCurrentQuestion();
    updateRopeVisual(false);

    if (showLobby) {
      openLobby();
    } else if (!state.inLobby) {
      startTurnTimer();
    }

    try {
      if (window.sound && typeof window.sound.playPop === 'function') {
        window.sound.playPop();
      }
    } catch (e) {}
  };

  /* ================= UPDATE HUD ================= */
  function updateHUD() {
    const hudT1 = document.getElementById('hudTeam1Score');
    const hudT2 = document.getElementById('hudTeam2Score');
    const roundTxt = document.getElementById('hudRoundText');
    const scoreCircleT1 = document.getElementById('team1ScoreCircle');
    const scoreCircleT2 = document.getElementById('team2ScoreCircle');

    if (hudT1) hudT1.textContent = state.team1Score;
    if (hudT2) hudT2.textContent = state.team2Score;
    if (roundTxt) roundTxt.textContent = `Round ${state.currentRound} of ${state.totalRounds}`;
    if (scoreCircleT1) scoreCircleT1.textContent = state.team1Score;
    if (scoreCircleT2) scoreCircleT2.textContent = state.team2Score;

    const panel1 = document.getElementById('team1Panel');
    const panel2 = document.getElementById('team2Panel');

    if (state.currentTurn === 'team1') {
      if (panel1) {
        panel1.classList.remove('inactive-turn');
        panel1.classList.add('active-turn');
      }
      if (panel2) {
        panel2.classList.remove('active-turn');
        panel2.classList.add('inactive-turn');
      }
    } else {
      if (panel1) {
        panel1.classList.remove('active-turn');
        panel1.classList.add('inactive-turn');
      }
      if (panel2) {
        panel2.classList.remove('inactive-turn');
        panel2.classList.add('active-turn');
      }
    }
  }

  /* ================= ROPE VISUAL ================= */
  function updateRopeVisual(animateTug, winningTeam) {
    const tugSystem = document.getElementById('tugSystem');
    const svgEl = document.getElementById('stadiumSvg');

    const clampPos = Math.max(-state.knockoutLead, Math.min(state.knockoutLead, state.ropePosition));
    const offsetX = clampPos * 25;

    if (tugSystem) {
      tugSystem.style.transform = `translateX(${offsetX}px)`;
    }

    if (animateTug && svgEl) {
      if (winningTeam === 'team1') {
        svgEl.setAttribute('class', 'stadium-svg pull-team1');
        setTimeout(() => { if (!state.gameOver) svgEl.setAttribute('class', 'stadium-svg idle'); }, 1500);
      } else if (winningTeam === 'team2') {
        svgEl.setAttribute('class', 'stadium-svg pull-team2');
        setTimeout(() => { if (!state.gameOver) svgEl.setAttribute('class', 'stadium-svg idle'); }, 1500);
      }
    } else if (!state.gameOver && svgEl) {
      svgEl.setAttribute('class', 'stadium-svg idle');
    }
  }

  /* ================= RENDER CURRENT QUESTION ================= */
  function renderCurrentQuestion() {
    state.answered = false;
    clearAutoAdvance();

    const stadiumBar = document.getElementById('stadiumActionBar');
    if (stadiumBar) stadiumBar.style.display = 'none';

    const isT1 = (state.currentTurn === 'team1');
    const activeQ = isT1
      ? state.questionsTeam1[state.qIndexTeam1]
      : state.questionsTeam2[state.qIndexTeam2];

    state.currentActiveQ = activeQ;
    if (!activeQ) return;

    const activeTopic = document.getElementById(isT1 ? 'team1TopicTag' : 'team2TopicTag');
    const activeEqBox = document.getElementById(isT1 ? 'team1EquationBox' : 'team2EquationBox');
    const activeGrid = document.getElementById(isT1 ? 'team1OptionsGrid' : 'team2OptionsGrid');
    const activeFeedback = document.getElementById(isT1 ? 'team1Feedback' : 'team2Feedback');
    const activeNextBtn = document.getElementById(isT1 ? 'team1NextBtn' : 'team2NextBtn');

    const inactiveTopic = document.getElementById(isT1 ? 'team2TopicTag' : 'team1TopicTag');
    const inactiveEqBox = document.getElementById(isT1 ? 'team2EquationBox' : 'team1EquationBox');
    const inactiveGrid = document.getElementById(isT1 ? 'team2OptionsGrid' : 'team1OptionsGrid');
    const inactiveFeedback = document.getElementById(isT1 ? 'team2Feedback' : 'team1Feedback');
    const inactiveNextBtn = document.getElementById(isT1 ? 'team2NextBtn' : 'team1NextBtn');

    // 1. Populate Active Panel
    if (activeTopic) activeTopic.textContent = activeQ.topic;
    if (activeEqBox) activeEqBox.textContent = activeQ.visual;

    if (activeFeedback) {
      activeFeedback.className = 'feedback-box';
      activeFeedback.style.display = 'none';
      activeFeedback.innerHTML = '';
    }

    if (activeNextBtn) {
      activeNextBtn.classList.remove('visible');
      activeNextBtn.style.display = 'none';
    }

    if (activeGrid) {
      activeGrid.innerHTML = '';
      const shuffled = window.AppUtils ? window.AppUtils.shuffle(activeQ.options) : [...activeQ.options];
      shuffled.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = opt;
        btn.onclick = function () { onChoiceClicked(this); };
        activeGrid.appendChild(btn);
      });
    }

    // 2. Inactive Panel (Blurred waiting state)
    if (inactiveTopic) inactiveTopic.textContent = 'Waiting for Turn...';
    if (inactiveEqBox) inactiveEqBox.textContent = '? + ? = ?';
    if (inactiveFeedback) inactiveFeedback.style.display = 'none';
    if (inactiveNextBtn) inactiveNextBtn.style.display = 'none';
    if (inactiveGrid) {
      inactiveGrid.innerHTML = `
        <button class="choice-btn" disabled>?</button>
        <button class="choice-btn" disabled>?</button>
        <button class="choice-btn" disabled>?</button>
        <button class="choice-btn" disabled>?</button>
      `;
    }
  }

  /* ================= ON CHOICE CLICKED ================= */
  window.onChoiceClicked = function (clickedBtn) {
    if (state.answered || state.gameOver || state.inLobby) return;
    state.answered = true;
    stopTurnTimer();

    const isT1 = (state.currentTurn === 'team1');
    const activeQ = state.currentActiveQ || (isT1 ? state.questionsTeam1[0] : state.questionsTeam2[0]);
    if (!activeQ) return;

    const selectedVal = parseInt(clickedBtn.textContent.trim(), 10);
    const isCorrect = (selectedVal === activeQ.correct);

    const activePanel = document.getElementById(isT1 ? 'team1Panel' : 'team2Panel');
    const allBtns = activePanel ? activePanel.querySelectorAll('.choice-btn') : [];

    allBtns.forEach(btn => {
      btn.disabled = true;
      const val = parseInt(btn.textContent.trim(), 10);
      if (val === activeQ.correct) {
        btn.classList.add('correct-pick');
      } else if (btn === clickedBtn && !isCorrect) {
        btn.classList.add('wrong-pick');
      }
    });

    const feedbackEl = document.getElementById(isT1 ? 'team1Feedback' : 'team2Feedback');

    if (isCorrect) {
      try { if (window.sound) window.sound.playCorrect(); } catch (e) {}

      if (isT1) {
        state.ropePosition -= 1;
        state.team1Score += 1;
        updateRopeVisual(true, 'team1');
      } else {
        state.ropePosition += 1;
        state.team2Score += 1;
        updateRopeVisual(true, 'team2');
      }

      if (feedbackEl) {
        feedbackEl.className = 'feedback-box correct';
        feedbackEl.style.display = 'block';
        feedbackEl.innerHTML = `🎉 <strong>GREAT PULL!</strong> ${activeQ.tip}`;
      }
    } else {
      try { if (window.sound) window.sound.playBuzz(); } catch (e) {}

      if (feedbackEl) {
        feedbackEl.className = 'feedback-box wrong';
        feedbackEl.style.display = 'block';
        feedbackEl.innerHTML = `💦 <strong>MISSED!</strong> Answer: <strong>${activeQ.correct}</strong>. ${activeQ.tip}`;
      }
    }

    updateHUD();

    // Knockout check (lead of 4)
    if (Math.abs(state.ropePosition) >= state.knockoutLead) {
      setTimeout(() => {
        finishMatch(state.ropePosition <= -state.knockoutLead ? 'team1_knockout' : 'team2_knockout');
      }, 1200);
      return;
    }

    // Last turn of match
    const isLastTurn = (state.currentRound === state.totalRounds && state.currentTurn === 'team2');
    const nextTeamName = isT1 ? "Team 2" : "Team 1";
    triggerTurnTransition(isLastTurn, nextTeamName);
  };

  /* ================= ADVANCE TURN ================= */
  window.advanceTurn = function () {
    clearAutoAdvance();
    stopTurnTimer();
    const stadiumBar = document.getElementById('stadiumActionBar');
    if (stadiumBar) stadiumBar.style.display = 'none';

    try { if (window.sound) window.sound.playPop(); } catch (e) {}

    if (state.currentTurn === 'team1') {
      state.currentTurn = 'team2';
      state.qIndexTeam1++;
    } else {
      state.currentTurn = 'team1';
      state.qIndexTeam2++;
      state.currentRound++;
    }

    updateHUD();
    renderCurrentQuestion();
    if (!state.inLobby && !state.gameOver) {
      startTurnTimer();
    }
  };

  /* ================= FINISH MATCH ================= */
  function finishMatch(reason) {
    clearAutoAdvance();
    stopTurnTimer();
    state.gameOver = true;

    const stadiumBar = document.getElementById('stadiumActionBar');
    if (stadiumBar) stadiumBar.style.display = 'none';

    let winner = 'tie';
    let victoryTitle = "🤝 IT'S A TIE!";
    let victoryMsg = "Incredible duel! Both teams competed with equal strength!";

    if (reason === 'team1_knockout' || state.ropePosition < 0 || (state.ropePosition === 0 && state.team1Score > state.team2Score)) {
      winner = 'team1';
      victoryTitle = "🦁 TEAM 1 (LIONS) WINS!";
      victoryMsg = (reason === 'team1_knockout')
        ? "KNOCKOUT VICTORY! Team 1 pulled the rope all the way to their side!"
        : `Team 1 triumphs with ${state.team1Score} successful points!`;
    } else if (reason === 'team2_knockout' || state.ropePosition > 0 || (state.ropePosition === 0 && state.team2Score > state.team1Score)) {
      winner = 'team2';
      victoryTitle = "🐺 TEAM 2 (WOLVES) WINS!";
      victoryMsg = (reason === 'team2_knockout')
        ? "KNOCKOUT VICTORY! Team 2 pulled the rope across the center line!"
        : `Team 2 triumphs with ${state.team2Score} successful points!`;
    }

    try {
      if (window.sound) window.sound.playFanfare();
      if (window.confetti) {
        window.confetti({ particleCount: 110, spread: 90 });
      }
    } catch (e) {}

    const modal = document.getElementById('victoryModal');
    const titleEl = document.getElementById('victoryTitle');
    const msgEl = document.getElementById('victoryMsg');
    const t1Pill = document.getElementById('victoryT1Pill');
    const t2Pill = document.getElementById('victoryT2Pill');
    const mascotWrap = document.getElementById('victoryMascotWrap');

    if (titleEl) titleEl.textContent = victoryTitle;
    if (msgEl) msgEl.textContent = victoryMsg;
    if (t1Pill) t1Pill.textContent = `🦁 Team 1: ${state.team1Score} / ${state.totalRounds}`;
    if (t2Pill) t2Pill.textContent = `🐺 Team 2: ${state.team2Score} / ${state.totalRounds}`;

    if (mascotWrap) {
      if (winner === 'team1') {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🦁</span><span class="trophy-badge">🏆</span>`;
      } else if (winner === 'team2') {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🐺</span><span class="trophy-badge">🏆</span>`;
      } else {
        mascotWrap.innerHTML = `<span class="big-victory-mascot">🦁 🤝 🐺</span>`;
      }
    }

    if (modal) modal.classList.add('active');
  }

  /* ================= AUDIO TOGGLE ================= */
  window.toggleAudio = function () {
    if (window.sound) {
      window.sound.enabled = !window.sound.enabled;
      const btn = document.getElementById('soundToggle');
      if (btn) btn.innerHTML = window.sound.enabled ? '🔊' : '🔇';
    }
  };

  // Expose state and public methods
  window.DuelEngine = {
    state,
    startMatch,
    advanceTurn,
    openLobby
  };

  // Initialize on page load with lobby
  document.addEventListener('DOMContentLoaded', () => {
    window.startMatch('set1', true);
  });

})();
