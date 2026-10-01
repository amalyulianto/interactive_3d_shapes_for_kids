/**
 * Lines of Symmetry Studio - Interactive Learning Engine
 * Created by Alapakadala Studio for Grade 2 Elementary Students
 */

// ================= AUDIO SYNTHESIZER =================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  playBuzz() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.09;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.28, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  playFoldSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

const sound = new SoundFX();

function toggleAudio() {
  sound.enabled = !sound.enabled;
  const btn = document.getElementById('soundToggle');
  if (btn) {
    btn.textContent = sound.enabled ? '🔊' : '🔇';
    btn.title = sound.enabled ? 'Sound On' : 'Sound Muted';
  }
}

// ================= GLOBAL STATE =================
let currentSymmetryMode = 'fold';

function switchSymmetryMode(mode) {
  currentSymmetryMode = mode;
  sound.playPop();

  // Update tabs
  const tabs = {
    fold: document.getElementById('tabFold'),
    detective: document.getElementById('tabDetective'),
    painter: document.getElementById('tabPainter'),
    quiz: document.getElementById('tabQuiz')
  };
  Object.keys(tabs).forEach(k => {
    if (tabs[k]) tabs[k].classList.toggle('active', k === mode);
  });

  // Update panels
  const panels = {
    fold: document.getElementById('foldView'),
    detective: document.getElementById('detectiveView'),
    painter: document.getElementById('painterView'),
    quiz: document.getElementById('quizView')
  };
  Object.keys(panels).forEach(k => {
    if (panels[k]) panels[k].classList.toggle('active', k === mode);
  });

  if (mode === 'painter') {
    renderPainterGrid();
  } else if (mode === 'quiz') {
    startSymmQuiz();
  }
}

// ================= ACTIVITY 1: FOLD & REVEAL MAGIC MIRROR =================
const FOLD_ITEMS = [
  {
    id: 'butterfly',
    name: 'Butterfly',
    icon: '🦋',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold down the center vertical line: the colorful left and right wings match up point for point!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Butterflies are famous examples of bilateral symmetry in nature!',
    svg: `
      <!-- Wings Left and Right -->
      <path d="M 200,140 C 130,40 30,80 50,190 C 65,270 140,240 200,220 C 260,240 335,270 350,190 C 370,80 270,40 200,140 Z" fill="#818CF8" stroke="#4338CA" stroke-width="4"/>
      <path d="M 200,220 C 140,240 70,300 110,360 C 150,390 190,300 200,250 C 210,300 250,390 290,360 C 330,300 260,240 200,220 Z" fill="#C084FC" stroke="#7E22CE" stroke-width="4"/>
      <!-- Wing Spot Decorations -->
      <circle cx="120" cy="160" r="22" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/>
      <circle cx="280" cy="160" r="22" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/>
      <circle cx="140" cy="310" r="14" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
      <circle cx="260" cy="310" r="14" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
      <!-- Body -->
      <ellipse cx="200" cy="220" rx="14" ry="90" fill="#1E293B" stroke="#0F172A" stroke-width="3"/>
      <!-- Head and Antennae -->
      <circle cx="200" cy="120" r="18" fill="#1E293B"/>
      <path d="M 194,110 Q 170,70 150,80" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="150" cy="80" r="5" fill="#1E293B"/>
      <path d="M 206,110 Q 230,70 250,80" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="250" cy="80" r="5" fill="#1E293B"/>
    `
  },
  {
    id: 'heart',
    name: 'Love Heart',
    icon: '❤️',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold right down the middle from the top dip to the bottom tip: both smooth curves overlap perfectly!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Hearts are symmetrical vertically! But fold them horizontally and the top curves clash with the bottom point.',
    svg: `
      <path d="M 200,120 C 170,40 60,50 60,170 C 60,250 160,310 200,360 C 240,310 340,250 340,170 C 340,50 230,40 200,120 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="6"/>
      <ellipse cx="140" cy="140" rx="20" ry="12" fill="#FDA4AF" opacity="0.8" transform="rotate(-25 140 140)"/>
      <ellipse cx="260" cy="140" rx="20" ry="12" fill="#FDA4AF" opacity="0.8" transform="rotate(25 260 140)"/>
    `
  },
  {
    id: 'star',
    name: '5-Point Star',
    icon: '⭐',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold down from the top point through the center: the two left star arms land right on top of the right arms!',
    validLinesText: '5 Lines of Symmetry!',
    funTip: 'A regular 5-point star has 5 lines of symmetry—one passing through every single tip!',
    svg: `
      <polygon points="200,50 240,160 355,160 262,228 297,340 200,270 103,340 138,228 45,160 160,160" fill="#FACC15" stroke="#EAB308" stroke-width="6" stroke-linejoin="round"/>
      <polygon points="200,110 220,180 290,180 235,220 255,290 200,245 145,290 165,220 110,180 180,180" fill="#FEF08A" opacity="0.75"/>
    `
  },
  {
    id: 'rocket',
    name: 'Space Rocket',
    icon: '🚀',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold vertically along the center axis: the fuselage, window, and left and right fins match like twin twins!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Rockets need symmetry to fly straight into space without spinning out of control!',
    svg: `
      <!-- Rocket Body -->
      <path d="M 200,50 Q 260,120 260,260 L 140,260 Q 140,120 200,50 Z" fill="#F1F5F9" stroke="#334155" stroke-width="5"/>
      <!-- Nose Cone -->
      <path d="M 200,50 Q 235,90 240,130 L 160,130 Q 165,90 200,50 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <!-- Fins -->
      <path d="M 140,220 L 70,300 L 140,280 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <path d="M 260,220 L 330,300 L 260,280 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <!-- Window -->
      <circle cx="200" cy="180" r="26" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
      <circle cx="192" cy="172" r="6" fill="#FFFFFF"/>
      <!-- Thruster Flame -->
      <polygon points="170,260 200,340 230,260" fill="#F97316"/>
      <polygon points="185,260 200,310 215,260" fill="#FDE047"/>
    `
  },
  {
    id: 'smiley',
    name: 'Happy Face',
    icon: '😊',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'The two cheerful eyes, round rosy cheeks, and smiling mouth are mirror reflections across the center!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Human faces are naturally almost symmetrical, which helps us recognize friendly expressions!',
    svg: `
      <circle cx="200" cy="200" r="140" fill="#FDE047" stroke="#EAB308" stroke-width="6"/>
      <!-- Eyes -->
      <ellipse cx="145" cy="170" rx="14" ry="20" fill="#1E293B"/>
      <circle cx="140" cy="162" r="5" fill="#FFFFFF"/>
      <ellipse cx="255" cy="170" rx="14" ry="20" fill="#1E293B"/>
      <circle cx="250" cy="162" r="5" fill="#FFFFFF"/>
      <!-- Cheeks -->
      <circle cx="120" cy="225" r="18" fill="#FCA5A5" opacity="0.7"/>
      <circle cx="280" cy="225" r="18" fill="#FCA5A5" opacity="0.7"/>
      <!-- Smile -->
      <path d="M 135,225 Q 200,300 265,225" stroke="#1E293B" stroke-width="7" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'letter_a',
    name: 'Letter A',
    icon: '🅰️',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold right down the peak of the letter A: the slanted legs and middle crossbar align completely!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Many capital letters have symmetry: A, M, T, V, W, Y are vertical; B, C, D, E, K are horizontal; H, I, O, X have both!',
    svg: `
      <path d="M 200,60 L 90,340 L 140,340 L 165,270 L 235,270 L 260,340 L 310,340 Z" fill="#6366F1" stroke="#4338CA" stroke-width="5"/>
      <polygon points="200,140 178,225 222,225" fill="#FFFFFF" stroke="#4338CA" stroke-width="4"/>
    `
  },
  {
    id: 'letter_m',
    name: 'Letter M',
    icon: 'Ⓜ️',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold vertically down the center valley: the outer poles and inner diagonal peaks match up!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'The letter M is symmetrical, but its neighbor letter N is NOT symmetrical across a line fold!',
    svg: `
      <path d="M 90,340 L 90,80 L 140,80 L 200,230 L 260,80 L 310,80 L 310,340 L 265,340 L 265,160 L 215,280 L 185,280 L 135,160 L 135,340 Z" fill="#10B981" stroke="#047857" stroke-width="5"/>
    `
  },
  {
    id: 'leaf',
    name: 'Oak Leaf',
    icon: '🍃',
    isSymmetric: false,
    validOrientations: [],
    rule: 'Notice how the leaf curves slightly, and the lobes and veins on the left are shaped differently from the right!',
    validLinesText: '0 Lines (Not Symmetrical)',
    funTip: 'Most natural leaves have tiny uneven curves and alternating side-veins that make them asymmetrical!',
    svg: `
      <!-- Asymmetrical Leaf Contour -->
      <path d="M 200,50 C 130,80 90,140 120,200 C 70,230 80,310 160,330 L 200,370 L 205,370 C 230,340 300,320 290,260 C 330,190 280,120 200,50 Z" fill="#84CC16" stroke="#4D7C0F" stroke-width="5"/>
      <!-- Main curved stem -->
      <path d="M 200,50 Q 185,210 200,370" stroke="#4D7C0F" stroke-width="5" fill="none"/>
      <!-- Asymmetrical Veins -->
      <path d="M 190,130 Q 140,110 120,125" stroke="#4D7C0F" stroke-width="3" fill="none"/>
      <path d="M 195,180 Q 250,150 280,170" stroke="#4D7C0F" stroke-width="3" fill="none"/>
      <path d="M 188,230 Q 120,220 95,250" stroke="#4D7C0F" stroke-width="3" fill="none"/>
      <path d="M 196,280 Q 250,260 275,290" stroke="#4D7C0F" stroke-width="3" fill="none"/>
    `
  },
  {
    id: 'letter_f',
    name: 'Letter F',
    icon: '🔤',
    isSymmetric: false,
    validOrientations: [],
    rule: 'The letter F has horizontal bars only reaching out to the right side! If folded, the left side has empty air!',
    validLinesText: '0 Lines (Not Symmetrical)',
    funTip: 'Letter F has no lines of symmetry! Neither vertical nor horizontal fold will make it match up.',
    svg: `
      <path d="M 110,340 L 110,70 L 290,70 L 290,125 L 175,125 L 175,190 L 260,190 L 260,245 L 175,245 L 175,340 Z" fill="#F97316" stroke="#C2410C" stroke-width="5"/>
    `
  },
  {
    id: 'scalene_tri',
    name: 'Scalene Triangle',
    icon: '📐',
    isSymmetric: false,
    validOrientations: [],
    rule: 'All three sides and angles have different lengths! Folding along any line leaves corners hanging out unevenly.',
    validLinesText: '0 Lines (Not Symmetrical)',
    funTip: 'Only Equilateral triangles (3 lines) and Isosceles triangles (1 line) have symmetry! Scalene triangles have 0.',
    svg: `
      <polygon points="100,330 330,310 150,80" fill="#06B6D4" stroke="#0E7490" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="100" cy="330" r="7" fill="#0E7490"/>
      <circle cx="330" cy="310" r="7" fill="#0E7490"/>
      <circle cx="150" cy="80" r="7" fill="#0E7490"/>
    `
  },
  {
    id: 'letter_h',
    name: 'Letter H',
    icon: '🏨',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal'],
    rule: 'Letter H is a symmetry champion! It folds vertically down the center crossbar, AND horizontally across the middle!',
    validLinesText: '2 Lines (Vertical ↕ & Horizontal ↔)',
    funTip: 'Letter H, I, O, and X all have both vertical and horizontal lines of symmetry!',
    svg: `
      <path d="M 110,70 L 110,330 L 165,330 L 165,225 L 235,225 L 235,330 L 290,330 L 290,70 L 235,70 L 235,175 L 165,175 L 165,70 Z" fill="#6366F1" stroke="#3730A3" stroke-width="5"/>
    `
  },
  {
    id: 'diamond',
    name: 'Diamond (Rhombus)',
    icon: '💎',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal', 'diagonal'],
    rule: 'A diamond has 4 lines of symmetry: vertical, horizontal, AND corner-to-corner diagonal folds match up!',
    validLinesText: '4 Lines (↕, ↔, ⤢, ⤡)',
    funTip: 'Try the diagonal fold on the diamond: watch the opposite corners kiss!',
    svg: `
      <polygon points="200,60 340,200 200,340 60,200" fill="#38BDF8" stroke="#0284C7" stroke-width="6"/>
      <polygon points="200,110 290,200 200,290 110,200" fill="#E0F2FE" opacity="0.7"/>
    `
  },
  {
    id: 'letter_e',
    name: 'Letter E',
    icon: '🇪',
    isSymmetric: true,
    validOrientations: ['horizontal'],
    rule: 'Letter E has a HORIZONTAL line of symmetry! Fold top to bottom across the middle bar and both halves match!',
    validLinesText: '1 Line (Horizontal ↔)',
    funTip: 'Letter E does NOT have vertical symmetry (the open side has nothing on the left), but it DOES have horizontal symmetry!',
    svg: `
      <path d="M 120,70 L 120,330 L 280,330 L 280,275 L 180,275 L 180,225 L 260,225 L 260,175 L 180,175 L 180,125 L 280,125 L 280,70 Z" fill="#F59E0B" stroke="#B45309" stroke-width="5"/>
    `
  },
  {
    id: 'flower',
    name: 'Sunny Flower',
    icon: '🌸',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal', 'diagonal'],
    rule: 'This flower has 8 round petals placed evenly all around! It folds vertically, horizontally, and diagonally!',
    validLinesText: 'Multiple Lines (↕, ↔, ⤢)',
    funTip: 'Flowers in nature often display radial symmetry with many lines of symmetry!',
    svg: `
      <circle cx="200" cy="110" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="200" cy="290" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="110" cy="200" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="290" cy="200" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="136" cy="136" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="264" cy="264" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="264" cy="136" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="136" cy="264" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="200" cy="200" r="42" fill="#FDE047" stroke="#CA8A04" stroke-width="4"/>
    `
  }
];

let activeFoldItem = FOLD_ITEMS[0];
let activeFoldOrientation = 'vertical'; // 'vertical' | 'horizontal' | 'diagonal'
let foldProgress = 0; // 0 to 100
let autoFoldAnimId = null;

function initFoldActivity() {
  const shelf = document.getElementById('foldItemsShelf');
  if (!shelf) return;
  shelf.innerHTML = '';

  FOLD_ITEMS.forEach((item, idx) => {
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
  const item = FOLD_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  sound.playPop();
  activeFoldItem = item;

  // Update shelf selection
  const chips = document.querySelectorAll('#foldItemsShelf .shelf-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', FOLD_ITEMS[idx].id === itemId);
  });

  resetFoldState();
  renderFoldItem(activeFoldItem);
}

function renderFoldItem(item) {
  // Update Educational Details Sidebar
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

  // Update Left & Right Halves
  updateFoldHalvesSvg(item);
}

let foldSoundPlayed = false;

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
      <g clip-path="url(#clipDiagLeft)">${item.svg}</g>
    `;
    rightSvg.innerHTML = `
      <defs>
        <clipPath id="clipDiagRight">
          <polygon points="0,0 400,0 400,400"/>
        </clipPath>
      </defs>
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
  sound.playPop();
  activeFoldOrientation = orientation;

  // Update HUD chips
  const btnV = document.getElementById('btnLineVert');
  const btnH = document.getElementById('btnLineHoriz');
  const btnD = document.getElementById('btnLineDiag');
  if (btnV) btnV.classList.toggle('active', orientation === 'vertical');
  if (btnH) btnH.classList.toggle('active', orientation === 'horizontal');
  if (btnD) btnD.classList.toggle('active', orientation === 'diagonal');

  resetFoldState();
  updateFoldHalvesSvg(activeFoldItem);
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
      // Rotate upwards around top hinge over the top half
      const deg = (progress / 100) * 180;
      rightHalf.style.transform = `rotateX(${deg}deg)`;
      rightHalf.style.opacity = progress > 50 ? '0.88' : '1';
    } else if (activeFoldOrientation === 'diagonal') {
      // Rotate across 45-degree diagonal axis (1, 1, 0)
      const deg = (progress / 100) * 180;
      rightHalf.style.transform = `rotate3d(1, 1, 0, ${deg}deg)`;
      rightHalf.style.opacity = progress > 50 ? '0.88' : '1';
    } else {
      // Vertical rotate leftwards around left hinge
      const deg = -(progress / 100) * 180;
      rightHalf.style.transform = `rotateY(${deg}deg)`;
      rightHalf.style.opacity = progress > 50 ? '0.88' : '1';
    }
  }

  if (progress < 90) {
    foldSoundPlayed = false;
  }

  // Check overlap feedback at 100% fold
  if (progress >= 98) {
    const isOrientationValid = activeFoldItem.validOrientations.includes(activeFoldOrientation);
    if (banner) {
      banner.classList.remove('hidden');
      if (isOrientationValid) {
        banner.className = 'match-feedback-banner correct';
        banner.innerHTML = `🎉 <strong>Perfect Overlap!</strong> Both halves match up with no edges sticking out! This is a true Line of Symmetry! ✨`;
        if (!foldSoundPlayed) {
          foldSoundPlayed = true;
          if (typeof confetti === 'function') {
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          }
          sound.playChime();
        }
      } else {
        banner.className = 'match-feedback-banner wrong';
        banner.innerHTML = `❌ <strong>Halves Do Not Match!</strong> The folded edges stick out and do not align! This is <u>NOT</u> a line of symmetry along this axis.`;
        if (!foldSoundPlayed) {
          foldSoundPlayed = true;
          sound.playBuzz();
        }
      }
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }
}

function triggerAutoFold() {
  sound.playFoldSound();
  if (autoFoldAnimId) cancelAnimationFrame(autoFoldAnimId);

  // If already at 100, reset first
  if (foldProgress >= 95) {
    foldProgress = 0;
    foldSoundPlayed = false;
    applyFoldTransform(0);
  }

  const startProgress = foldProgress;
  const targetProgress = 100;
  const startTime = performance.now();
  const duration = 1200; // ms

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    // Smooth ease-in-out
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

// ================= ACTIVITY 2: LINE DETECTIVE =================
const DETECTIVE_SHAPES = [
  {
    id: 'square',
    name: 'Square',
    icon: '🟦',
    totalLines: 4,
    clue: 'A square has 4 true lines of symmetry! Be careful not to pick off-center cuts.',
    tip: 'Regular shapes with equal sides have the same number of symmetry lines as their sides: 4 equal sides = 4 symmetry lines!',
    shapeSvg: `<rect x="70" y="70" width="260" height="260" rx="4" fill="#818CF8" stroke="#3730A3" stroke-width="8"/>`,
    lines: [
      { id: 'vert', name: 'Vertical Line ↕', x1: 200, y1: 40, x2: 200, y2: 360, isSymmetric: true, desc: 'Folds left half onto right half perfectly!' },
      { id: 'horiz', name: 'Horizontal Line ↔', x1: 40, y1: 200, x2: 360, y2: 200, isSymmetric: true, desc: 'Folds top half onto bottom half perfectly!' },
      { id: 'diag1', name: 'Diagonal 1 ⤢', x1: 50, y1: 50, x2: 350, y2: 350, isSymmetric: true, desc: 'Folds top-left triangle onto bottom-right triangle!' },
      { id: 'diag2', name: 'Diagonal 2 ⤡', x1: 350, y1: 50, x2: 50, y2: 350, isSymmetric: true, desc: 'Folds top-right triangle onto bottom-left triangle!' },
      { id: 'trap_offcenter', name: 'Off-Center Fold (Trap!)', x1: 40, y1: 130, x2: 360, y2: 130, isSymmetric: false, desc: 'Trap! Not centered: folds a small top strip onto a huge bottom half!' }
    ]
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    icon: '🟨',
    totalLines: 2,
    clue: 'A rectangle has ONLY 2 lines of symmetry (↕ and ↔)! Its corner diagonals are famous traps!',
    tip: 'Try folding notebook paper across the diagonal corner-to-corner: the corners stick out, so diagonals are NOT symmetry lines for rectangles!',
    shapeSvg: `<rect x="50" y="110" width="300" height="180" rx="4" fill="#FBBF24" stroke="#B45309" stroke-width="8"/>`,
    lines: [
      { id: 'vert', name: 'Vertical Line ↕', x1: 200, y1: 60, x2: 200, y2: 340, isSymmetric: true, desc: 'Folds left rectangle half onto right half!' },
      { id: 'horiz', name: 'Horizontal Line ↔', x1: 20, y1: 200, x2: 380, y2: 200, isSymmetric: true, desc: 'Folds top rectangle half onto bottom half!' },
      { id: 'diag1', name: 'Diagonal 1 ⤢ (Trap!)', x1: 40, y1: 100, x2: 360, y2: 300, isSymmetric: false, desc: 'Corner trap! Diagonals leave pointed corners sticking out into empty air!' },
      { id: 'diag2', name: 'Diagonal 2 ⤡ (Trap!)', x1: 360, y1: 100, x2: 40, y2: 300, isSymmetric: false, desc: 'Corner trap! Folds corner across but ends up askew!' }
    ]
  },
  {
    id: 'equilateral_tri',
    name: 'Equilateral Triangle',
    icon: '🔺',
    totalLines: 3,
    clue: 'All 3 sides are equal! 3 lines of symmetry pass from each tip to the opposite side midpoint.',
    tip: 'An equilateral triangle has 3 equal sides and exactly 3 lines of symmetry!',
    shapeSvg: `<polygon points="200,60 340,320 60,320" fill="#F43F5E" stroke="#9F1239" stroke-width="8" stroke-linejoin="round"/>`,
    lines: [
      { id: 'vert', name: 'Vertical (Top Vertex) ↕', x1: 200, y1: 30, x2: 200, y2: 360, isSymmetric: true, desc: 'Splits triangle into two identical mirror right-triangles!' },
      { id: 'diag1', name: 'Left Vertex to Side ⤡', x1: 50, y1: 330, x2: 280, y2: 180, isSymmetric: true, desc: 'Folds bottom-left corner across to opposite edge!' },
      { id: 'diag2', name: 'Right Vertex to Side ⤢', x1: 350, y1: 330, x2: 120, y2: 180, isSymmetric: true, desc: 'Folds bottom-right corner across to opposite edge!' },
      { id: 'trap_horiz', name: 'Horizontal Cut ↔ (Trap!)', x1: 40, y1: 220, x2: 360, y2: 220, isSymmetric: false, desc: 'Trap! Folds a pointy top triangle onto a flat trapezoid base—halves do not match!' }
    ]
  },
  {
    id: 'isosceles_tri',
    name: 'Isosceles Triangle',
    icon: '📐',
    totalLines: 1,
    clue: 'An isosceles triangle has 2 equal sides and ONLY 1 line of symmetry right down the middle!',
    tip: 'Side-to-vertex folds fail because the base is a different length from the other two sides.',
    shapeSvg: `<polygon points="200,50 310,340 90,340" fill="#10B981" stroke="#047857" stroke-width="8" stroke-linejoin="round"/>`,
    lines: [
      { id: 'vert', name: 'Vertical Center Line ↕', x1: 200, y1: 20, x2: 200, y2: 370, isSymmetric: true, desc: 'The ONLY line of symmetry that splits the two twin sides!' },
      { id: 'horiz', name: 'Horizontal Line ↔ (Trap!)', x1: 60, y1: 220, x2: 340, y2: 220, isSymmetric: false, desc: 'Trap! The top tip does not match the wide bottom base!' },
      { id: 'diag', name: 'Slanted Line ⤢ (Trap!)', x1: 80, y1: 350, x2: 260, y2: 190, isSymmetric: false, desc: 'Trap! Angles do not match when folded across!' }
    ]
  },
  {
    id: 'circle',
    name: 'Circle',
    icon: '🟣',
    totalLines: 999, // Infinite
    clue: 'A circle has INFINITE lines of symmetry! But lines MUST pass through the center point!',
    tip: 'Because a circle is perfectly round all the way around 360°, every diameter through the center is a line of symmetry!',
    shapeSvg: `<circle cx="200" cy="200" r="140" fill="#A855F7" stroke="#6B21A8" stroke-width="8"/>
               <circle cx="200" cy="200" r="6" fill="#FFFFFF"/>`,
    lines: [
      { id: 'vert', name: 'Vertical Diameter ↕', x1: 200, y1: 30, x2: 200, y2: 370, isSymmetric: true, desc: 'Cuts circle into twin left and right semicircles!' },
      { id: 'horiz', name: 'Horizontal Diameter ↔', x1: 30, y1: 200, x2: 370, y2: 200, isSymmetric: true, desc: 'Cuts circle into twin top and bottom semicircles!' },
      { id: 'diag1', name: 'Diagonal 1 ⤢', x1: 70, y1: 70, x2: 330, y2: 330, isSymmetric: true, desc: 'Passes right through center point: perfect match!' },
      { id: 'trap_chord', name: 'Off-Center Cut (Trap!)', x1: 80, y1: 100, x2: 320, y2: 100, isSymmetric: false, desc: 'Trap! Does not pass through the center point, cutting uneven slices!' }
    ]
  },
  {
    id: 'regular_hexagon',
    name: 'Regular Hexagon',
    icon: '🛑',
    totalLines: 6,
    clue: 'A regular 6-sided hexagon has 6 lines of symmetry! Don\'t fall for off-angle cuts.',
    tip: 'Hexagons are the building blocks of honeycombs because their symmetry makes them fit together seamlessly!',
    shapeSvg: `<polygon points="200,50 330,125 330,275 200,350 70,275 70,125" fill="#EC4899" stroke="#9D174D" stroke-width="8" stroke-linejoin="round"/>`,
    lines: [
      { id: 'vert', name: 'Vertex to Vertex ↕', x1: 200, y1: 30, x2: 200, y2: 370, isSymmetric: true, desc: 'Cuts from top vertex to bottom vertex!' },
      { id: 'horiz', name: 'Side to Side Midpoint ↔', x1: 40, y1: 200, x2: 360, y2: 200, isSymmetric: true, desc: 'Cuts through flat horizontal sides!' },
      { id: 'diag1', name: 'Vertex Pair ⤢', x1: 50, y1: 115, x2: 350, y2: 285, isSymmetric: true, desc: 'Connects opposite diagonal corners!' },
      { id: 'diag2', name: 'Vertex Pair ⤡', x1: 350, y1: 115, x2: 50, y2: 285, isSymmetric: true, desc: 'Connects opposite diagonal corners!' },
      { id: 'trap_slice', name: 'Off-Angle Slice (Trap!)', x1: 90, y1: 70, x2: 310, y2: 330, isSymmetric: false, desc: 'Trap! Skewed angle cuts uneven edges that cannot fold together!' }
    ]
  },
  {
    id: 'scalene_trap',
    name: 'Scalene Triangle',
    icon: '📐',
    totalLines: 0,
    clue: 'A scalene triangle has NO lines of symmetry! All 3 sides are unequal, so no fold line will ever align the sides.',
    tip: 'If all 3 side lengths are different, the shape has 0 lines of symmetry.',
    shapeSvg: `<polygon points="80,330 350,300 160,70" fill="#0EA5E9" stroke="#0369A1" stroke-width="8" stroke-linejoin="round"/>`,
    lines: [
      { id: 'test1', name: 'Vertical Test Line ↕ (Trap!)', x1: 200, y1: 40, x2: 200, y2: 360, isSymmetric: false, desc: 'Trap! Left side has acute corner, right side has long leg.' },
      { id: 'test2', name: 'Top Vertex to Base ⤢ (Trap!)', x1: 160, y1: 40, x2: 215, y2: 350, isSymmetric: false, desc: 'Trap! Left and right base lengths are completely different!' }
    ]
  }
];

let activeDetectiveShape = DETECTIVE_SHAPES[0];
let foundLines = new Set();

function initDetectiveActivity() {
  const shelf = document.getElementById('detectiveShapesShelf');
  if (!shelf) return;
  shelf.innerHTML = '';

  DETECTIVE_SHAPES.forEach((shape, idx) => {
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
  const shape = DETECTIVE_SHAPES.find(s => s.id === shapeId);
  if (!shape) return;
  sound.playPop();
  activeDetectiveShape = shape;
  foundLines.clear();

  const chips = document.querySelectorAll('#detectiveShapesShelf .shelf-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', DETECTIVE_SHAPES[idx].id === shapeId);
  });

  renderDetectiveShape(activeDetectiveShape);
}

function renderDetectiveShape(shape) {
  const nameEl = document.getElementById('detectiveShapeName');
  const foundBadge = document.getElementById('detectiveFoundBadge');
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
  if (!svg) return;

  // SVG Base Shape
  let svgContent = activeDetectiveShape.shapeSvg;

  // Render Interactive Candidate Lines directly in SVG (Approach B)
  activeDetectiveShape.lines.forEach((line) => {
    const isFound = foundLines.has(line.id);
    const strokeColor = isFound ? '#10B981' : '#6366F1';
    const strokeWidth = isFound ? '4.5' : '3';
    const strokeDash = isFound ? 'none' : '7,7';

    svgContent += `
      <g class="detective-guide-group" onclick="testDetectiveLineById('${line.id}')" title="Tap to test: ${line.name}">
        <!-- Invisible Wide Hit Area for Easy Touch/Click -->
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
  const line = activeDetectiveShape.lines.find(l => l.id === lineId);
  if (line) testDetectiveLine(line);
}

function testDetectiveLine(line) {
  const feedback = document.getElementById('detectiveFeedback');
  const listEl = document.getElementById('confirmedLinesList');
  if (!feedback) return;

  feedback.classList.remove('hidden');

  if (line.isSymmetric) {
    sound.playChime();
    foundLines.add(line.id);

    feedback.className = 'match-feedback-banner correct';
    feedback.innerHTML = `🎉 <strong>Match!</strong> ${line.name} is a TRUE line of symmetry! ${line.desc}`;

    // Add to confirmed lines list if not present
    if (listEl && !document.getElementById(`conf_${line.id}`)) {
      const li = document.createElement('li');
      li.id = `conf_${line.id}`;
      li.innerHTML = `<span class="check-icon">✓</span> <strong>${line.name}:</strong> ${line.desc}`;
      listEl.appendChild(li);
    }

    renderDetectiveSvgAndButtons();
    updateDetectiveCounter();

    // Check if all symmetry lines for this shape found
    const allSymmLines = activeDetectiveShape.lines.filter(l => l.isSymmetric);
    if (foundLines.size >= allSymmLines.length) {
      sound.playFanfare();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.55 } });
      }
      feedback.innerHTML += `<div style="margin-top:6px; font-size:1.05rem;">🌟 <strong>Mystery Solved!</strong> You discovered all lines of symmetry for the ${activeDetectiveShape.name}!</div>`;
    }
  } else {
    sound.playBuzz();
    feedback.className = 'match-feedback-banner wrong';
    feedback.innerHTML = `❌ <strong>Trap! Not a line of symmetry!</strong> ${line.desc}`;

    // Visually flag the failed line on the shape
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
  if (!badge) return;
  const targetTotal = activeDetectiveShape.totalLines === 999 ? 'Infinite' : activeDetectiveShape.totalLines;
  badge.textContent = `Lines Found: ${foundLines.size} / ${targetTotal}`;
}

function resetDetectiveLines() {
  sound.playPop();
  foundLines.clear();
  const feedback = document.getElementById('detectiveFeedback');
  const listEl = document.getElementById('confirmedLinesList');
  if (feedback) feedback.classList.add('hidden');
  if (listEl) listEl.innerHTML = '';
  updateDetectiveCounter();
  renderDetectiveSvgAndButtons();
}

// ================= ACTIVITY 3: MIRROR PAINTER =================
const PAINTER_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FACC15', // Yellow
  '#10B981', // Green
  '#38BDF8', // Sky Blue
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#1E293B'  // Dark Charcoal
];

const GUIDED_PATTERNS = [
  {
    id: 'heart',
    name: 'Mini Heart',
    icon: '❤️',
    leftCells: [
      { r: 3, c: 4, color: '#EF4444' },
      { r: 3, c: 3, color: '#EF4444' },
      { r: 4, c: 5, color: '#EF4444' },
      { r: 4, c: 4, color: '#EF4444' },
      { r: 4, c: 2, color: '#EF4444' },
      { r: 5, c: 4, color: '#EF4444' },
      { r: 6, c: 5, color: '#EF4444' }
    ]
  },
  {
    id: 'tree',
    name: 'Pine Tree',
    icon: '🌲',
    leftCells: [
      { r: 2, c: 5, color: '#10B981' },
      { r: 3, c: 5, color: '#10B981' },
      { r: 3, c: 4, color: '#10B981' },
      { r: 4, c: 5, color: '#10B981' },
      { r: 4, c: 4, color: '#10B981' },
      { r: 4, c: 3, color: '#10B981' },
      { r: 5, c: 5, color: '#F97316' },
      { r: 6, c: 5, color: '#F97316' }
    ]
  },
  {
    id: 'butterfly',
    name: 'Mini Butterfly',
    icon: '🦋',
    leftCells: [
      { r: 3, c: 4, color: '#6366F1' },
      { r: 3, c: 3, color: '#6366F1' },
      { r: 4, c: 5, color: '#1E293B' },
      { r: 4, c: 4, color: '#FACC15' },
      { r: 4, c: 2, color: '#6366F1' },
      { r: 5, c: 5, color: '#1E293B' },
      { r: 5, c: 3, color: '#38BDF8' }
    ]
  },
  {
    id: 'house',
    name: 'Cozy House',
    icon: '🏠',
    leftCells: [
      { r: 3, c: 5, color: '#EF4444' },
      { r: 4, c: 5, color: '#EF4444' },
      { r: 4, c: 4, color: '#EF4444' },
      { r: 5, c: 5, color: '#F59E0B' },
      { r: 5, c: 4, color: '#38BDF8' },
      { r: 6, c: 5, color: '#F59E0B' },
      { r: 6, c: 4, color: '#F59E0B' }
    ]
  }
];

const FREE_DRAW_INSPIRATIONS = [
  {
    id: 'mushroom',
    name: 'Mushroom',
    icon: '🍄',
    cells: [
      { r: 2, c: 5, color: '#EF4444' }, { r: 2, c: 6, color: '#EF4444' },
      { r: 3, c: 4, color: '#EF4444' }, { r: 3, c: 5, color: '#FFFFFF' }, { r: 3, c: 6, color: '#FFFFFF' }, { r: 3, c: 7, color: '#EF4444' },
      { r: 4, c: 3, color: '#EF4444' }, { r: 4, c: 4, color: '#EF4444' }, { r: 4, c: 5, color: '#EF4444' }, { r: 4, c: 6, color: '#EF4444' }, { r: 4, c: 7, color: '#EF4444' }, { r: 4, c: 8, color: '#EF4444' },
      { r: 5, c: 5, color: '#F1F5F9' }, { r: 5, c: 6, color: '#F1F5F9' },
      { r: 6, c: 5, color: '#F1F5F9' }, { r: 6, c: 6, color: '#F1F5F9' }
    ]
  },
  {
    id: 'crown',
    name: 'Crown',
    icon: '👑',
    cells: [
      { r: 3, c: 3, color: '#FACC15' }, { r: 3, c: 5, color: '#FACC15' }, { r: 3, c: 6, color: '#FACC15' }, { r: 3, c: 8, color: '#FACC15' },
      { r: 4, c: 3, color: '#FACC15' }, { r: 4, c: 4, color: '#EF4444' }, { r: 4, c: 5, color: '#FACC15' }, { r: 4, c: 6, color: '#FACC15' }, { r: 4, c: 7, color: '#EF4444' }, { r: 4, c: 8, color: '#FACC15' },
      { r: 5, c: 3, color: '#FACC15' }, { r: 5, c: 4, color: '#FACC15' }, { r: 5, c: 5, color: '#FACC15' }, { r: 5, c: 6, color: '#FACC15' }, { r: 5, c: 7, color: '#FACC15' }, { r: 5, c: 8, color: '#FACC15' }
    ]
  },
  {
    id: 'alien',
    name: 'Alien',
    icon: '👾',
    cells: [
      { r: 2, c: 4, color: '#10B981' }, { r: 2, c: 7, color: '#10B981' },
      { r: 3, c: 4, color: '#10B981' }, { r: 3, c: 5, color: '#10B981' }, { r: 3, c: 6, color: '#10B981' }, { r: 3, c: 7, color: '#10B981' },
      { r: 4, c: 3, color: '#10B981' }, { r: 4, c: 4, color: '#1E293B' }, { r: 4, c: 5, color: '#10B981' }, { r: 4, c: 6, color: '#10B981' }, { r: 4, c: 7, color: '#1E293B' }, { r: 4, c: 8, color: '#10B981' },
      { r: 5, c: 4, color: '#10B981' }, { r: 5, c: 7, color: '#10B981' }
    ]
  },
  {
    id: 'sailboat',
    name: 'Sailboat',
    icon: '⛵',
    cells: [
      { r: 2, c: 5, color: '#38BDF8' },
      { r: 3, c: 5, color: '#38BDF8' }, { r: 3, c: 4, color: '#38BDF8' },
      { r: 4, c: 5, color: '#1E293B' },
      { r: 5, c: 4, color: '#F97316' }, { r: 5, c: 5, color: '#F97316' }, { r: 5, c: 6, color: '#F97316' }, { r: 5, c: 7, color: '#F97316' },
      { r: 6, c: 5, color: '#F97316' }, { r: 6, c: 6, color: '#F97316' }
    ]
  },
  {
    id: 'diamond',
    name: 'Gem',
    icon: '💎',
    cells: [
      { r: 2, c: 5, color: '#6366F1' }, { r: 2, c: 6, color: '#6366F1' },
      { r: 3, c: 4, color: '#6366F1' }, { r: 3, c: 5, color: '#38BDF8' }, { r: 3, c: 6, color: '#38BDF8' }, { r: 3, c: 7, color: '#6366F1' },
      { r: 4, c: 3, color: '#6366F1' }, { r: 4, c: 4, color: '#38BDF8' }, { r: 4, c: 5, color: '#38BDF8' }, { r: 4, c: 6, color: '#38BDF8' }, { r: 4, c: 7, color: '#38BDF8' }, { r: 4, c: 8, color: '#6366F1' },
      { r: 5, c: 4, color: '#6366F1' }, { r: 5, c: 5, color: '#38BDF8' }, { r: 5, c: 6, color: '#38BDF8' }, { r: 5, c: 7, color: '#6366F1' },
      { r: 6, c: 5, color: '#6366F1' }, { r: 6, c: 6, color: '#6366F1' }
    ]
  }
];

let painterMode = 'guided'; // 'guided' | 'free'
let activePattern = GUIDED_PATTERNS[0];
let activeColor = PAINTER_COLORS[0];
let isEraserActive = false;
let gridState = Array(12).fill(null).map(() => Array(12).fill(null));

function initPainterActivity() {
  initPainterSwatches();
  initPatternChips();
  initInspirationChips();
  loadGuidedPattern(activePattern);
}

function initPainterSwatches() {
  const container = document.getElementById('painterSwatches');
  if (!container) return;
  container.innerHTML = '';

  PAINTER_COLORS.forEach((color, idx) => {
    const dot = document.createElement('div');
    dot.className = `paint-color-dot ${idx === 0 ? 'active' : ''}`;
    dot.style.background = color;
    dot.onclick = () => selectPainterColor(color, dot);
    container.appendChild(dot);
  });
}

function initPatternChips() {
  const chipsContainer = document.getElementById('patternChipsList');
  if (!chipsContainer) return;
  chipsContainer.innerHTML = '';

  GUIDED_PATTERNS.forEach((p, idx) => {
    const chip = document.createElement('button');
    chip.className = `hud-chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `${p.icon} ${p.name}`;
    chip.onclick = () => selectGuidedPattern(p.id);
    chipsContainer.appendChild(chip);
  });
}

function initInspirationChips() {
  const container = document.getElementById('inspirationChipsList');
  if (!container) return;
  container.innerHTML = '';

  FREE_DRAW_INSPIRATIONS.forEach((insp) => {
    const chip = document.createElement('button');
    chip.className = 'inspire-chip';
    chip.innerHTML = `${insp.icon} ${insp.name}`;
    chip.onclick = () => loadInspiration(insp.id);
    container.appendChild(chip);
  });
}

function loadInspiration(inspId) {
  const insp = FREE_DRAW_INSPIRATIONS.find(i => i.id === inspId);
  if (!insp) return;
  sound.playPop();

  // Highlight active inspiration chip
  document.querySelectorAll('#inspirationChipsList .inspire-chip').forEach(c => {
    c.classList.toggle('active', c.textContent.includes(insp.name));
  });

  // Populate grid with inspiration
  gridState = Array(12).fill(null).map(() => Array(12).fill(null));
  insp.cells.forEach(cell => {
    gridState[cell.r][cell.c] = cell.color;
  });
  renderPainterGrid();
}

function setPainterMode(mode) {
  sound.playPop();
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
    loadGuidedPattern(activePattern);
  }
}

function selectGuidedPattern(patternId) {
  const p = GUIDED_PATTERNS.find(pat => pat.id === patternId);
  if (!p) return;
  sound.playPop();
  activePattern = p;

  const chips = document.querySelectorAll('#patternChipsList .hud-chip');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', GUIDED_PATTERNS[idx].id === patternId);
  });

  const patName = document.getElementById('currentPatternName');
  if (patName) patName.textContent = p.name;

  loadGuidedPattern(p);
}

function loadGuidedPattern(pattern) {
  gridState = Array(12).fill(null).map(() => Array(12).fill(null));

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
  sound.playPop();
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

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'paint-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;

      const cellColor = gridState[r][c];
      cell.style.background = cellColor || '#FFFFFF';

      if (painterMode === 'guided' && c < 6) {
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
  sound.playPop();
  const colorToApply = isEraserActive ? null : activeColor;

  if (painterMode === 'free') {
    gridState[r][c] = colorToApply;
    const mirrorC = 11 - c;
    gridState[r][mirrorC] = colorToApply;
    renderPainterGrid();
  } else {
    if (c >= 6) {
      gridState[r][c] = colorToApply;
      updateSingleCellDisplay(r, c, colorToApply);
    }
  }
}

function updateSingleCellDisplay(r, c, color) {
  const container = document.getElementById('paintGridContainer');
  if (!container) return;
  const index = r * 12 + c;
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

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 6; c++) {
      const leftColor = gridState[r][c];
      const mirrorC = 11 - c;
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
    sound.playFanfare();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    }
    feedback.className = 'match-feedback-banner correct';
    feedback.innerHTML = `🌟 <strong>Symmetrical Masterpiece!</strong> Every square is a perfect mirror reflection! Outstanding job! 🎨✨`;
    if (accuracyText) accuracyText.textContent = '100% Perfect! ⭐';
  } else {
    sound.playBuzz();
    feedback.className = 'match-feedback-banner wrong';
    const percent = Math.round((correctMatches / totalTargetCells) * 100);
    feedback.innerHTML = `Keep going! You have matched <strong>${correctMatches} of ${totalTargetCells}</strong> squares correctly (${percent}%). Check the distance from the glowing middle line!`;
    if (accuracyText) accuracyText.textContent = `${percent}% Match`;
  }
}

function clearPainterGrid() {
  sound.playPop();
  gridState = Array(12).fill(null).map(() => Array(12).fill(null));
  if (painterMode === 'guided') {
    loadGuidedPattern(activePattern);
  } else {
    renderPainterGrid();
  }
}

// ================= ACTIVITY 4: SYMMETRY CHALLENGE QUIZZES (4 LEVELS) =================
const SYMM_QUIZ_LEVELS = [
  {
    id: 'basics',
    title: 'Level 1: Symmetry Basics',
    desc: 'Can these real-world objects fold into identical matching halves?',
    icon: '🦋',
    questions: [
      {
        illustration: '🦋',
        question: 'Does this butterfly have a vertical line of symmetry down its middle?',
        options: ['Yes! Left and right wings match ✅', 'No, the wings are completely different ❌'],
        correct: 0,
        feedback: 'Correct! Nature gave butterflies bilateral symmetry: the vertical fold line matches both wings!'
      },
      {
        illustration: '❤️',
        question: 'Does a love heart have a vertical line of symmetry?',
        options: ['Yes! Left and right curves match ✅', 'No, it is not symmetrical'],
        correct: 0,
        feedback: 'Spot on! Folding down the center dip to the bottom tip aligns both curved lobes!'
      },
      {
        illustration: '🍃',
        question: 'Does this oak leaf have a line of symmetry?',
        options: ['Yes, it matches perfectly', 'No! Lobes and side veins are uneven ❌'],
        correct: 1,
        feedback: 'Great eye! Natural leaves have uneven curves and alternating veins, making them asymmetrical!'
      },
      {
        illustration: '🚀',
        question: 'Does a space rocket have a vertical line of symmetry?',
        options: ['Yes, left and right fins & body match ✅', 'No, rockets are asymmetrical'],
        correct: 0,
        feedback: 'Exactly! Rockets need symmetry so they fly straight up into space without spinning!'
      },
      {
        illustration: '📄',
        question: 'What does "Symmetrical" mean?',
        options: ['Both halves match in shape and size ✅', 'The shape has sharp 3D corners', 'One side is larger than the other', 'It is made of wood'],
        correct: 0,
        feedback: 'Perfect! "Symmetrical" means both halves match up point-for-point when folded!'
      }
    ]
  },
  {
    id: 'shapes',
    title: 'Level 2: Counting Symmetry Lines',
    desc: 'Master the number of symmetry lines in 2D geometric shapes!',
    icon: '🟦',
    questions: [
      {
        illustration: '🟦',
        question: 'How many lines of symmetry does a SQUARE have?',
        options: ['4 Lines (1 vertical, 1 horizontal, 2 diagonals) ✅', '2 Lines only', '1 Line only', '8 Lines'],
        correct: 0,
        feedback: 'Champion! A square has 4 lines of symmetry: vertical, horizontal, and both corner-to-corner diagonals!'
      },
      {
        illustration: '🟨',
        question: 'How many lines of symmetry does a RECTANGLE have?',
        options: ['4 Lines', '2 Lines (vertical & horizontal) ✅', '1 Line', '0 Lines'],
        correct: 1,
        feedback: 'Brilliant! A rectangle has only 2 lines. Diagonal folds do NOT match because pointed corners stick out!'
      },
      {
        illustration: '🔺',
        question: 'An EQUILATERAL triangle has 3 equal sides. How many lines of symmetry does it have?',
        options: ['3 Lines (one from each vertex) ✅', '1 Line only', '0 Lines', '6 Lines'],
        correct: 0,
        feedback: 'Super! An equilateral triangle has 3 lines of symmetry passing from each tip to the opposite midpoint!'
      },
      {
        illustration: '📐',
        question: 'How many lines of symmetry does a SCALENE triangle (all sides different) have?',
        options: ['0 Lines (No lines match!) ✅', '1 Line', '2 Lines', '3 Lines'],
        correct: 0,
        feedback: 'Correct! Scalene triangles have 0 lines of symmetry because all three sides are different lengths!'
      },
      {
        illustration: '⭕',
        question: 'Which shape has INFINITE lines of symmetry?',
        options: ['Circle ✅', 'Square', 'Rectangle', 'Hexagon'],
        correct: 0,
        feedback: 'Hooray! Any straight line passing right through the center point of a circle divides it into twin halves!'
      }
    ]
  },
  {
    id: 'letters',
    title: 'Level 3: Alphabet & Numbers',
    desc: 'Discover which letters and numbers hide secret symmetry lines!',
    icon: '🅰️',
    questions: [
      {
        illustration: '🅰️',
        question: 'Does the capital letter "A" have a line of symmetry?',
        options: ['Yes, 1 Vertical line ↕ ✅', 'Yes, 1 Horizontal line ↔', 'No lines', '2 Lines'],
        correct: 0,
        feedback: 'Correct! A vertical fold down the peak through the crossbar folds both legs together!'
      },
      {
        illustration: '🏨',
        question: 'Does the capital letter "H" have BOTH vertical and horizontal symmetry?',
        options: ['Yes! Both ↕ and ↔ work ✅', 'Only vertical', 'Only horizontal', 'No symmetry'],
        correct: 0,
        feedback: 'Superstar! Letter H can be folded vertically or horizontally across its center bar!'
      },
      {
        illustration: '🇪',
        question: 'What kind of symmetry does the capital letter "E" have?',
        options: ['Horizontal line ↔ ✅', 'Vertical line ↕', 'Diagonal line ⤢', 'No symmetry'],
        correct: 0,
        feedback: 'Spot on! Fold top to bottom across the middle bar: both halves match!'
      },
      {
        illustration: '8️⃣',
        question: 'Does the digit "8" have lines of symmetry?',
        options: ['Yes, both vertical and horizontal ✅', 'Only vertical', 'No symmetry', 'Only diagonal'],
        correct: 0,
        feedback: 'Great eye! The number 8 has two loops that reflect vertically and horizontally!'
      },
      {
        illustration: '🔤',
        question: 'Which of these letters has NO lines of symmetry?',
        options: ['Letter F ❌', 'Letter M', 'Letter T', 'Letter Y'],
        correct: 0,
        feedback: 'Exactly right! Letter F has bars on the right side only—neither fold will align!'
      }
    ]
  },
  {
    id: 'nature',
    title: 'Level 4: Real-World & Nature',
    desc: 'Explore symmetry in animals, plants, and everyday real objects!',
    icon: '⭐',
    questions: [
      {
        illustration: '⭐',
        question: 'A sea starfish has 5 equal arms. How many lines of symmetry does it have?',
        options: ['5 Lines (one through each arm) ✅', '1 Line only', '0 Lines', '10 Lines'],
        correct: 0,
        feedback: 'Fantastic! A regular 5-arm starfish has 5 lines of symmetry cutting through each arm!'
      },
      {
        illustration: '🛑',
        question: 'A STOP sign has 8 equal sides (Octagon). How many lines of symmetry does a regular octagon have?',
        options: ['8 Lines ✅', '4 Lines', '2 Lines', '1 Line'],
        correct: 0,
        feedback: 'Master level! Regular shapes have the same number of symmetry lines as their sides: 8 sides = 8 lines!'
      },
      {
        illustration: '😊',
        question: 'Why do human faces have vertical symmetry?',
        options: ['Two eyes, two ears, and a center nose/mouth ✅', 'Faces are asymmetrical circles', 'Only one side of the face works', 'Faces have 4 symmetry lines'],
        correct: 0,
        feedback: 'Awesome! Human faces have bilateral symmetry across the center vertical line!'
      },
      {
        illustration: '🐝',
        question: 'Honeybee honeycomb cells are regular HEXAGONS. Why do bees use hexagons?',
        options: ['Their 6-fold symmetry lets them fit together without any gaps ✅', 'Hexagons are round', 'Hexagons have 0 symmetry', 'Hexagons melt easily'],
        correct: 0,
        feedback: 'Genius! The 6-line symmetry of hexagons lets bees pack honeycombs perfectly with zero wasted space!'
      },
      {
        illustration: '🪞',
        question: 'When you stand directly in front of a mirror, what is the line of symmetry?',
        options: ['The mirror surface acting as the reflection line ✅', 'The ceiling above', 'Your left shoe', 'The wall behind you'],
        correct: 0,
        feedback: 'Brilliant! The mirror acts as the reflection line, showing your mirror twin!'
      }
    ]
  }
];

let currentSymmLevel = SYMM_QUIZ_LEVELS[0];
let symmQuizIndex = 0;
let symmQuizScore = 0;
let symmQuizAnswered = false;

function startSymmQuiz() {
  renderSymmQuizLevelSelect();
}

function renderSymmQuizLevelSelect() {
  const levelSelectCard = document.getElementById('symmQuizLevelSelect');
  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  const grid = document.getElementById('symmQuizLevelsGrid');

  if (levelSelectCard) levelSelectCard.classList.remove('hidden');
  if (quizCard) quizCard.classList.add('hidden');
  if (endCard) endCard.classList.add('hidden');

  if (!grid) return;
  grid.innerHTML = '';

  SYMM_QUIZ_LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'symm-level-card';
    card.onclick = () => selectSymmQuizLevel(level.id);
    card.innerHTML = `
      <div class="level-card-top">
        <span class="level-card-icon">${level.icon}</span>
        <span class="level-badge-pill">5 Questions</span>
      </div>
      <h3 class="level-card-title">${level.title}</h3>
      <p class="level-card-desc">${level.desc}</p>
      <div class="level-card-footer">Start Quiz ➔</div>
    `;
    grid.appendChild(card);
  });
}

function selectSymmQuizLevel(levelId) {
  const level = SYMM_QUIZ_LEVELS.find(l => l.id === levelId);
  if (!level) return;
  sound.playPop();
  currentSymmLevel = level;
  symmQuizIndex = 0;
  symmQuizScore = 0;
  symmQuizAnswered = false;

  const levelSelectCard = document.getElementById('symmQuizLevelSelect');
  const quizCard = document.getElementById('symmQuizCard');
  const levelNameEl = document.getElementById('symmQuizLevelName');

  if (levelSelectCard) levelSelectCard.classList.add('hidden');
  if (quizCard) quizCard.classList.remove('hidden');
  if (levelNameEl) levelNameEl.textContent = level.title;

  renderSymmQuizQuestion();
}

function returnToSymmQuizSelect() {
  sound.playPop();
  renderSymmQuizLevelSelect();
}

function renderSymmQuizQuestion() {
  symmQuizAnswered = false;
  const q = currentSymmLevel.questions[symmQuizIndex];

  const qNum = document.getElementById('symmQuestionNum');
  const scoreEl = document.getElementById('symmScore');
  const visualEl = document.getElementById('symmQuestionVisual');
  const textEl = document.getElementById('symmQuestionText');
  const optionsEl = document.getElementById('symmQuizOptions');
  const progressFill = document.getElementById('symmProgressFill');
  const feedbackEl = document.getElementById('symmFeedback');
  const nextBtn = document.getElementById('btnSymmNextQuestion');

  if (qNum) qNum.textContent = symmQuizIndex + 1;
  if (scoreEl) scoreEl.textContent = symmQuizScore;
  if (visualEl) visualEl.textContent = q.illustration;
  if (textEl) textEl.textContent = q.question;
  if (progressFill) {
    const pct = ((symmQuizIndex + 1) / currentSymmLevel.questions.length) * 100;
    progressFill.style.width = `${pct}%`;
  }
  if (feedbackEl) feedbackEl.classList.add('hidden');
  if (nextBtn) nextBtn.classList.add('hidden');

  if (optionsEl) {
    optionsEl.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.onclick = () => onSelectSymmOption(optIdx);
      optionsEl.appendChild(btn);
    });
  }
}

function onSelectSymmOption(selectedIdx) {
  if (symmQuizAnswered) return;
  symmQuizAnswered = true;

  const q = currentSymmLevel.questions[symmQuizIndex];
  const isCorrect = selectedIdx === q.correct;
  const options = document.querySelectorAll('#symmQuizOptions .quiz-opt-btn');
  const feedback = document.getElementById('symmFeedback');
  const nextBtn = document.getElementById('btnSymmNextQuestion');
  const scoreEl = document.getElementById('symmScore');

  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('wrong');
    }
  });

  if (feedback) {
    feedback.classList.remove('hidden');
    if (isCorrect) {
      sound.playChime();
      symmQuizScore += 20;
      if (scoreEl) scoreEl.textContent = symmQuizScore;
      feedback.className = 'quiz-feedback correct';
      feedback.innerHTML = `🎉 <strong>Correct!</strong> ${q.feedback}`;
      if (typeof confetti === 'function') {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      sound.playBuzz();
      feedback.className = 'quiz-feedback wrong';
      feedback.innerHTML = `❌ <strong>Not quite!</strong> ${q.feedback}`;
    }
  }

  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = symmQuizIndex === currentSymmLevel.questions.length - 1 ? 'See Results 🏆' : 'Next Question ➡️';
  }
}

function onNextSymmQuestion() {
  sound.playPop();
  symmQuizIndex++;
  if (symmQuizIndex < currentSymmLevel.questions.length) {
    renderSymmQuizQuestion();
  } else {
    showSymmQuizResults();
  }
}

function showSymmQuizResults() {
  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  const finalScore = document.getElementById('symmFinalScore');
  const finalStars = document.getElementById('symmFinalStars');
  const endTitle = document.getElementById('symmEndTitle');
  const endMsg = document.getElementById('symmEndMessage');

  if (quizCard) quizCard.classList.add('hidden');
  if (endCard) endCard.classList.remove('hidden');

  if (finalScore) finalScore.textContent = symmQuizScore;

  if (symmQuizScore >= 80) {
    sound.playFanfare();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }
    if (finalStars) finalStars.textContent = '⭐⭐⭐⭐⭐';
    if (endTitle) endTitle.textContent = `🏆 ${currentSymmLevel.title} Master!`;
    if (endMsg) endMsg.textContent = `Incredible job! You scored ${symmQuizScore}/100 and demonstrated master understanding of symmetry!`;
  } else if (symmQuizScore >= 60) {
    sound.playChime();
    if (finalStars) finalStars.textContent = '⭐⭐⭐';
    if (endTitle) endTitle.textContent = '🎉 Great Detective Work!';
    if (endMsg) endMsg.textContent = `You scored ${symmQuizScore}/100! Review the activities to reach a perfect score!`;
  } else {
    sound.playPop();
    if (finalStars) finalStars.textContent = '⭐⭐';
    if (endTitle) endTitle.textContent = 'Keep Practicing!';
    if (endMsg) endMsg.textContent = `You scored ${symmQuizScore}/100. Try again to boost your score!`;
  }

  // Smooth scroll to top of card so results are front-and-center
  if (endCard) {
    endCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function retrySymmQuiz() {
  sound.playPop();
  symmQuizIndex = 0;
  symmQuizScore = 0;
  symmQuizAnswered = false;

  const quizCard = document.getElementById('symmQuizCard');
  const endCard = document.getElementById('symmEndCard');
  if (quizCard) quizCard.classList.remove('hidden');
  if (endCard) endCard.classList.add('hidden');

  renderSymmQuizQuestion();
}

// ================= BOOTSTRAP ON LOAD =================
function bootSymmetryApp() {
  initFoldActivity();
  initDetectiveActivity();
  initPainterActivity();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSymmetryApp);
} else {
  bootSymmetryApp();
}
