/**
 * Patterns Studio - Main Application Coordinator & Mode Switcher
 */

(function () {
  'use strict';

  let currentMode = 'ring';

  function switchPatternMode(mode) {
    currentMode = mode;

    // Update active tab buttons
    const tabMap = {
      ring: 'tabRing',
      shapes: 'tabShapes',
      solids: 'tabSolids',
      quiz: 'tabQuiz'
    };

    Object.keys(tabMap).forEach(key => {
      const btn = document.getElementById(tabMap[key]);
      if (btn) btn.classList.toggle('active', key === mode);
    });

    // Update view panels
    const viewMap = {
      ring: 'ringView',
      shapes: 'shapesView',
      solids: 'solidsView',
      quiz: 'quizView'
    };

    Object.keys(viewMap).forEach(key => {
      const view = document.getElementById(viewMap[key]);
      if (view) view.classList.toggle('active', key === mode);
    });

    // Mode-specific initializers
    if (mode === 'ring' && typeof window.initUnitDetective === 'function') {
      window.initUnitDetective();
    } else if (mode === 'shapes' && typeof window.initMissingShapes === 'function') {
      window.initMissingShapes();
    } else if (mode === 'solids' && typeof window.initMissingSolids === 'function') {
      window.initMissingSolids();
    } else if (mode === 'quiz' && typeof window.initPatternsQuiz === 'function') {
      window.initPatternsQuiz();
    }

    if (window.sound && window.sound.playPop) {
      window.sound.playPop();
    }
  }

  function toggleAudio() {
    if (window.sound && typeof window.sound.toggleMute === 'function') {
      const isMuted = window.sound.toggleMute();
      const soundBtn = document.getElementById('soundToggle');
      if (soundBtn) {
        soundBtn.textContent = isMuted ? '🔇' : '🔊';
        soundBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
      }
    }
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '1') switchPatternMode('ring');
    else if (e.key === '2') switchPatternMode('shapes');
    else if (e.key === '3') switchPatternMode('solids');
    else if (e.key === '4') switchPatternMode('quiz');
    else if (e.key === 'm' || e.key === 'M') toggleAudio();
  });

  // Bootstrap when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    switchPatternMode('ring');
  });

  // Global window exports
  window.switchPatternMode = switchPatternMode;
  window.toggleAudio = toggleAudio;

})();
