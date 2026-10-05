/**
 * 3D Solid Shapes Adventure - Main Application Coordinator
 * Bootstraps 3D engine, renders shape selector shelf, manages mode switching & responsive header.
 */

// Palette Collapse State
let isPaletteCollapsed = true;

function toggleColorPalette() {
  if (window.sound) window.sound.playPop();
  isPaletteCollapsed = !isPaletteCollapsed;
  const panel = document.getElementById('paletteContentPanel');
  const btn = document.getElementById('btnTogglePalette');
  const arrow = document.getElementById('paletteToggleArrow');

  if (panel) panel.classList.toggle('collapsed', isPaletteCollapsed);
  if (btn) btn.classList.toggle('active', !isPaletteCollapsed);
  if (arrow) arrow.textContent = isPaletteCollapsed ? '▸' : '▾';
}

// Audio Toggle Wrapper
function toggleAudio() {
  if (window.sound) {
    window.sound.enabled = !window.sound.enabled;
    const btn = document.getElementById('soundToggle');
    if (btn) btn.textContent = window.sound.enabled ? '🔊' : '🔇';
    const btnTop = document.getElementById('btnSoundToggle');
    if (btnTop) btnTop.textContent = window.sound.enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
  }
  if (document.activeElement) document.activeElement.blur();
  if (window.innerWidth > 768) {
    const header = document.querySelector('.main-header');
    if (header) header.classList.add('collapsed');
  }
}

// Explorer Mode vs Sorter Mode vs Quiz Mode Switcher
function switchMode(mode) {
  if (window.sound) window.sound.playPop();
  if (document.activeElement) document.activeElement.blur();
  if (window.innerWidth > 768) {
    const header = document.querySelector('.main-header');
    if (header) header.classList.add('collapsed');
  }

  const isExplorer = mode === 'explorer';
  const isSorter = mode === 'sorter';
  const isQuiz = mode === 'quiz';

  const explorerView = document.getElementById('explorerView');
  const sorterView = document.getElementById('sorterView');
  const quizView = document.getElementById('quizView');

  if (explorerView) explorerView.classList.toggle('active', isExplorer);
  if (sorterView) sorterView.classList.toggle('active', isSorter);
  if (quizView) quizView.classList.toggle('active', isQuiz);

  const tabExplorer = document.getElementById('tabExplorer');
  const tabSorter = document.getElementById('tabSorter');
  const tabQuiz = document.getElementById('tabQuiz');

  if (tabExplorer) tabExplorer.classList.toggle('active', isExplorer);
  if (tabSorter) tabSorter.classList.toggle('active', isSorter);
  if (tabQuiz) tabQuiz.classList.toggle('active', isQuiz);

  if (isExplorer && typeof onWindowResize === 'function') {
    setTimeout(onWindowResize, 60);
  }
}

// Render Shape Shelf
function renderShapeShelf() {
  const shelf = document.getElementById('shapesShelf');
  if (!shelf || !window.SHAPES_DATA) return;
  shelf.innerHTML = '';

  window.SHAPES_DATA.forEach((s, idx) => {
    const chip = document.createElement('button');
    chip.className = `shape-chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `
      <span class="chip-icon">${s.icon}</span>
      <span class="chip-name">${s.name}</span>
    `;
    chip.onclick = () => {
      if (window.sound) window.sound.playPop();
      if (typeof selectShape === 'function') selectShape(idx);
    };
    shelf.appendChild(chip);
  });
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  if (typeof initThree === 'function') initThree();
  renderShapeShelf();
  if (typeof selectShape === 'function') selectShape(0);

  const mainHeader = document.querySelector('.main-header');
  if (mainHeader) {
    mainHeader.querySelectorAll('button, a').forEach(el => {
      el.addEventListener('click', () => {
        el.blur();
        if (window.innerWidth > 768) {
          mainHeader.classList.add('collapsed');
        }
      });
    });

    mainHeader.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        mainHeader.classList.remove('collapsed');
      }
    });
  }
});

// Global window attachments
window.toggleColorPalette = toggleColorPalette;
window.toggleAudio = toggleAudio;
window.switchMode = switchMode;
window.renderShapeShelf = renderShapeShelf;
