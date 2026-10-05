/**
 * Lines of Symmetry Studio - Activity 1: Fold & Reveal Magic Mirror
 * 3D paper folding interactive physics, angle transformations, and overlap validation.
 */

let activeFoldItem = null;
let activeFoldOrientation = 'vertical'; // 'vertical' | 'horizontal' | 'diagonal'
let foldProgress = 0; // 0 to 100
let autoFoldAnimId = null;
let foldSoundPlayed = false;

function initFoldActivity() {
  const shelf = document.getElementById('foldItemsShelf');
  if (!shelf || !window.FOLD_ITEMS) return;
  shelf.innerHTML = '';

  activeFoldItem = window.FOLD_ITEMS[0];

  window.FOLD_ITEMS.forEach((item, idx) => {
    const chip = document.createElement('div');
    chip.className = `shelf-chip ${idx === 0 ? 'active' : ''}`;
    chip.onclick = () => selectFoldItem(item.id);
    chip.innerHTML = `
      <span class="chip-icon">${item.icon}</span>
      <span class="chip-name">${item.name}</span>
    `;
    shelf.appendChild(chip);
  });

  renderFoldItem(activeFoldItem);
}

function selectFoldItem(itemId) {
  if (!window.FOLD_ITEMS) return;
  const item = window.FOLD_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (window.sound) window.sound.playPop();
  activeFoldItem = item;

  const chips = document.querySelectorAll('#foldItemsShelf .shelf-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', window.FOLD_ITEMS[idx].id === itemId);
  });

  resetFoldState();
  renderFoldItem(activeFoldItem);
}

function renderFoldItem(item) {
  const icon = document.getElementById('foldItemIcon');
  const name = document.getElementById('foldItemName');
  const badge = document.getElementById('foldItemSymmetryBadge');
  const rule = document.getElementById('foldItemRule');
  const statSymm = document.getElementById('statIsSymmetric');
  const statLines = document.getElementById('statLineCount');
  const funTip = document.getElementById('foldItemFunTip');

  if (icon) icon.textContent = item.icon;
  if (name) name.textContent = item.name;
  if (badge) {
    badge.textContent = item.isSymmetric ? 'Symmetrical' : 'Asymmetrical';
    badge.style.background = item.isSymmetric ? '#D1FAE5' : '#FEE2E2';
    badge.style.color = item.isSymmetric ? '#065F46' : '#991B1B';
  }
  if (rule) rule.textContent = item.rule;
  if (statSymm) statSymm.textContent = item.isSymmetric ? 'YES ✅' : 'NO ❌';
  if (statLines) statLines.textContent = item.validLinesText;
  if (funTip) funTip.textContent = item.funTip;

  updateFoldHalvesSvg(item);
}

function updateFoldHalvesSvg(item) {
  const leftSvg = document.getElementById('svgLeftHalf');
  const rightSvg = document.getElementById('svgRightHalf');
  const sheet = document.getElementById('paperSheet');
  const badge = document.getElementById('mirrorLineBadge');

  if (!leftSvg || !rightSvg || !sheet) return;

  sheet.classList.remove('horizontal-mode', 'diagonal-mode');

  if (activeFoldOrientation === 'horizontal') {
    sheet.classList.add('horizontal-mode');
    leftSvg.setAttribute('viewBox', '0 0 400 200');
    rightSvg.setAttribute('viewBox', '0 200 400 200');
    if (badge) badge.textContent = 'Horizontal Fold Line ↔';
    leftSvg.innerHTML = item.svg;
    rightSvg.innerHTML = item.svg;
  } else if (activeFoldOrientation === 'diagonal') {
    sheet.classList.add('diagonal-mode');
    leftSvg.setAttribute('viewBox', '0 0 400 400');
    rightSvg.setAttribute('viewBox', '0 0 400 400');
    if (badge) badge.textContent = 'Diagonal Fold Line ⤢';

    leftSvg.innerHTML = `
      <defs>
        <clipPath id="clipDiagLeft">
          <polygon points="0,0 400,400 0,400"/>
        </clipPath>
      </defs>
      <polygon points="0,0 400,400 0,400" fill="#FFFFFF"/>
      <g clip-path="url(#clipDiagLeft)">${item.svg}</g>
    `;
    rightSvg.innerHTML = `
      <defs>
        <clipPath id="clipDiagRight">
          <polygon points="0,0 400,0 400,400"/>
        </clipPath>
      </defs>
      <polygon points="0,0 400,0 400,400" fill="#FFFFFF"/>
      <g clip-path="url(#clipDiagRight)">${item.svg}</g>
    `;
  } else {
    // vertical
    leftSvg.setAttribute('viewBox', '0 0 200 400');
    rightSvg.setAttribute('viewBox', '200 0 200 400');
    if (badge) badge.textContent = 'Vertical Fold Line ↕';
    leftSvg.innerHTML = item.svg;
    rightSvg.innerHTML = item.svg;
  }
}

function setFoldLineOrientation(orientation) {
  if (window.sound) window.sound.playPop();
  activeFoldOrientation = orientation;

  const btnV = document.getElementById('btnLineVert');
  const btnH = document.getElementById('btnLineHoriz');
  const btnD = document.getElementById('btnLineDiag');
  if (btnV) btnV.classList.toggle('active', orientation === 'vertical');
  if (btnH) btnH.classList.toggle('active', orientation === 'horizontal');
  if (btnD) btnD.classList.toggle('active', orientation === 'diagonal');

  resetFoldState();
  if (activeFoldItem) updateFoldHalvesSvg(activeFoldItem);
}

function onFoldSliderChange(val) {
  foldProgress = parseInt(val, 10);
  applyFoldTransform(foldProgress);
}

function applyFoldTransform(progress) {
  const rightHalf = document.getElementById('rightHalfContainer');
  const degreeText = document.getElementById('foldDegreeText');
  const slider = document.getElementById('foldSlider');
  const banner = document.getElementById('foldResultBanner');

  if (slider) slider.value = progress;
  if (degreeText) {
    degreeText.textContent = `${progress}% (${progress === 100 ? 'Folded Closed' : progress === 0 ? 'Flat Open' : 'Folding...'})`;
  }

  if (rightHalf) {
    if (activeFoldOrientation === 'horizontal') {
      const deg = (progress / 100) * 180;
      rightHalf.style.transform = `rotateX(${deg}deg)`;
      rightHalf.style.opacity = progress > 50 ? '0.88' : '1';
    } else if (activeFoldOrientation === 'diagonal') {
      const deg = -(progress / 100) * 180;
      rightHalf.style.transform = `rotate3d(1, 1, 0, ${deg}deg)`;
      rightHalf.style.filter = progress > 5 && progress < 95
        ? 'drop-shadow(4px 8px 18px rgba(0, 0, 0, 0.25))'
        : 'none';
      rightHalf.style.opacity = '1';
    } else {
      const deg = -(progress / 100) * 180;
      rightHalf.style.transform = `rotateY(${deg}deg)`;
      rightHalf.style.opacity = progress > 50 ? '0.88' : '1';
    }
  }

  if (progress < 90) {
    foldSoundPlayed = false;
  }

  if (progress >= 98 && activeFoldItem) {
    const isOrientationValid = activeFoldItem.validOrientations.includes(activeFoldOrientation);
    if (banner) {
      banner.classList.remove('hidden');
      if (isOrientationValid) {
        banner.className = 'match-feedback-banner correct';
        banner.innerHTML = `🎉 <strong>Perfect Overlap!</strong> Both halves match up with no edges sticking out! This is a true Line of Symmetry! ✨`;
        if (!foldSoundPlayed) {
          foldSoundPlayed = true;
          if (window.AppUtils && window.AppUtils.confetti) {
            window.AppUtils.confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          } else if (typeof confetti === 'function') {
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          }
          if (window.sound) window.sound.playChime();
        }
      } else {
        banner.className = 'match-feedback-banner wrong';
        banner.innerHTML = `❌ <strong>Halves Do Not Match!</strong> The folded edges stick out and do not align! This is <u>NOT</u> a line of symmetry along this axis.`;
        if (!foldSoundPlayed) {
          foldSoundPlayed = true;
          if (window.sound) window.sound.playBuzz();
        }
      }
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }
}

function triggerAutoFold() {
  if (window.sound) window.sound.playFoldSound();
  if (autoFoldAnimId) cancelAnimationFrame(autoFoldAnimId);

  if (foldProgress >= 95) {
    foldProgress = 0;
    foldSoundPlayed = false;
    applyFoldTransform(0);
  }

  const startProgress = foldProgress;
  const targetProgress = 100;
  const startTime = performance.now();
  const duration = 1200;

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const current = Math.round(startProgress + (targetProgress - startProgress) * ease);

    applyFoldTransform(current);

    if (t < 1) {
      autoFoldAnimId = requestAnimationFrame(animate);
    }
  }

  autoFoldAnimId = requestAnimationFrame(animate);
}

function resetFoldState() {
  if (autoFoldAnimId) cancelAnimationFrame(autoFoldAnimId);
  foldProgress = 0;
  foldSoundPlayed = false;
  const rightHalf = document.getElementById('rightHalfContainer');
  if (rightHalf) {
    rightHalf.style.transform = '';
    rightHalf.style.opacity = '1';
  }
  applyFoldTransform(0);
}

// Global window attachments
window.initFoldActivity = initFoldActivity;
window.selectFoldItem = selectFoldItem;
window.selectFoldShape = selectFoldItem; // Compatibility alias
window.renderFoldItem = renderFoldItem;
window.updateFoldHalvesSvg = updateFoldHalvesSvg;
window.setFoldLineOrientation = setFoldLineOrientation;
window.onFoldSliderChange = onFoldSliderChange;
window.applyFoldTransform = applyFoldTransform;
window.triggerAutoFold = triggerAutoFold;
window.resetFoldState = resetFoldState;
