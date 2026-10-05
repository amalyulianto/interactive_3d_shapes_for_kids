/**
 * Lines of Symmetry Studio - Main Application Coordinator
 * Bootstraps all 5 symmetry learning activities and manages mode navigation.
 */

let currentSymmetryMode = 'fold';

function toggleAudio() {
  if (window.sound) {
    window.sound.enabled = !window.sound.enabled;
    const btn = document.getElementById('soundToggle');
    if (btn) {
      btn.textContent = window.sound.enabled ? '🔊' : '🔇';
      btn.title = window.sound.enabled ? 'Sound On' : 'Sound Muted';
    }
  }
}

function switchSymmetryMode(mode) {
  currentSymmetryMode = mode;
  if (window.sound) window.sound.playPop();

  // Update tab buttons
  const tabs = {
    fold: document.getElementById('tabFold'),
    detective: document.getElementById('tabDetective'),
    painter: document.getElementById('tabPainter'),
    match: document.getElementById('tabMatch'),
    quiz: document.getElementById('tabQuiz')
  };
  Object.keys(tabs).forEach(k => {
    if (tabs[k]) tabs[k].classList.toggle('active', k === mode);
  });

  // Update view panels
  const panels = {
    fold: document.getElementById('foldView'),
    detective: document.getElementById('detectiveView'),
    painter: document.getElementById('painterView'),
    match: document.getElementById('matchView'),
    quiz: document.getElementById('quizView')
  };
  Object.keys(panels).forEach(k => {
    if (panels[k]) panels[k].classList.toggle('active', k === mode);
  });

  if (mode === 'painter' && typeof renderPainterGrid === 'function') {
    renderPainterGrid();
  } else if (mode === 'match' && typeof initMirrorMatch === 'function') {
    initMirrorMatch();
  } else if (mode === 'quiz' && typeof startSymmQuiz === 'function') {
    startSymmQuiz();
  }
}

function bootSymmetryApp() {
  if (typeof initFoldActivity === 'function') initFoldActivity();
  if (typeof initDetectiveActivity === 'function') initDetectiveActivity();
  if (typeof initPainterActivity === 'function') initPainterActivity();
  if (typeof initMirrorMatch === 'function') initMirrorMatch();
  if (typeof renderSymmQuizLevelSelect === 'function') renderSymmQuizLevelSelect();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSymmetryApp);
} else {
  bootSymmetryApp();
}

// Global window attachments
window.switchSymmetryMode = switchSymmetryMode;
window.toggleAudio = toggleAudio;
window.bootSymmetryApp = bootSymmetryApp;
