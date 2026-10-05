/**
 * Lines of Symmetry Studio - Data Schemas & Challenge Sets
 * Contains all geometric and real-world SVG models, detective line datasets,
 * pixel painter patterns, mirror matching pairs, and grade 2 quizzes.
 */

// ================= ACTIVITY 1: FOLD & REVEAL ITEMS =================
const FOLD_ITEMS = [
  {
    id: 'butterfly',
    name: 'Monarch Butterfly',
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
    id: 'sandwich',
    name: 'Deli Sandwich',
    icon: '🥪',
    isSymmetric: true,
    validOrientations: ['horizontal'],
    rule: 'Fold horizontally across the middle: the top curved bread crust lands right on top of the bottom crust!',
    validLinesText: '1 Line (Horizontal ↔)',
    funTip: 'A sandwich cut horizontally has top-to-bottom symmetry! Vertical fold fails because left and right edges are shaped differently.',
    svg: `
      <!-- Top Bread Crust (Arched) -->
      <path d="M 80,185 Q 200,85 340,185 L 340,195 L 80,195 Z" fill="#D97706" stroke="#92400E" stroke-width="5"/>
      <ellipse cx="140" cy="165" rx="18" ry="8" fill="#F59E0B" opacity="0.6"/>
      <ellipse cx="230" cy="145" rx="22" ry="9" fill="#F59E0B" opacity="0.6"/>
      <!-- Center Fillings (Symmetrical across Y=200) -->
      <rect x="70" y="195" width="280" height="10" rx="4" fill="#10B981" stroke="#047857" stroke-width="2"/>
      <rect x="90" y="193" width="70" height="14" rx="3" fill="#EF4444"/>
      <rect x="230" y="193" width="70" height="14" rx="3" fill="#EF4444"/>
      <!-- Bottom Bread Crust (Mirror of top bread) -->
      <path d="M 80,215 Q 200,315 340,215 L 340,205 L 80,205 Z" fill="#D97706" stroke="#92400E" stroke-width="5"/>
      <ellipse cx="140" cy="235" rx="18" ry="8" fill="#F59E0B" opacity="0.6"/>
      <ellipse cx="230" cy="255" rx="22" ry="9" fill="#F59E0B" opacity="0.6"/>
    `
  },
  {
    id: 'fish',
    name: 'Tropical Angelfish',
    icon: '🐟',
    isSymmetric: true,
    validOrientations: ['horizontal'],
    rule: 'Fold horizontally across the water line: the tall top dorsal fin folds right onto the matching bottom ventral fin!',
    validLinesText: '1 Line (Horizontal ↔)',
    funTip: 'Angelfish have horizontal mirror fins as they swim through coral reefs! Notice vertical fold fails because the tail is on the left and face is on the right.',
    svg: `
      <!-- Top Dorsal Fin -->
      <path d="M 140,135 Q 185,50 250,135 Z" fill="#FACC15" stroke="#EAB308" stroke-width="4"/>
      <!-- Bottom Ventral Fin (Exact Mirror across Y=200) -->
      <path d="M 140,265 Q 185,350 250,265 Z" fill="#FACC15" stroke="#EAB308" stroke-width="4"/>
      <!-- Tail Fin -->
      <polygon points="100,200 45,120 45,280" fill="#F97316" stroke="#C2410C" stroke-width="4"/>
      <!-- Main Body -->
      <ellipse cx="200" cy="200" rx="115" ry="70" fill="#06B6D4" stroke="#0891B2" stroke-width="5"/>
      <!-- Body Stripes (Mirror across Y=200) -->
      <path d="M 160,135 L 160,265" stroke="#0891B2" stroke-width="6"/>
      <path d="M 215,135 L 215,265" stroke="#0891B2" stroke-width="6"/>
      <!-- Eyes Top and Bottom -->
      <circle cx="270" cy="180" r="10" fill="#FFFFFF" stroke="#0E7490" stroke-width="3"/>
      <circle cx="272" cy="180" r="5" fill="#1E293B"/>
      <circle cx="270" cy="220" r="10" fill="#FFFFFF" stroke="#0E7490" stroke-width="3"/>
      <circle cx="272" cy="220" r="5" fill="#1E293B"/>
      <!-- Mouth -->
      <ellipse cx="315" cy="200" rx="10" ry="14" fill="#F43F5E"/>
    `
  },
  {
    id: 'diamond',
    name: 'Diamond Gem',
    icon: '💎',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal', 'diagonal'],
    rule: 'Test the DIAGONAL fold! Watch opposite corners kiss! This diamond folds diagonally, vertically, AND horizontally!',
    validLinesText: '4 Lines (↕, ↔, ⤢, ⤡)',
    funTip: 'A diamond has 4 lines of symmetry: vertical, horizontal, and both corner diagonals!',
    svg: `
      <!-- Diamond Outer Rhombus -->
      <polygon points="200,60 340,200 200,340 60,200" fill="#38BDF8" stroke="#0284C7" stroke-width="6"/>
      <!-- Inner Facet Medallion -->
      <polygon points="200,110 290,200 200,290 110,200" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>
      <!-- Facet Lines -->
      <line x1="200" y1="60" x2="200" y2="110" stroke="#0284C7" stroke-width="3"/>
      <line x1="340" y1="200" x2="290" y2="200" stroke="#0284C7" stroke-width="3"/>
      <line x1="200" y1="340" x2="200" y2="290" stroke="#0284C7" stroke-width="3"/>
      <line x1="60" y1="200" x2="110" y2="200" stroke="#0284C7" stroke-width="3"/>
      <circle cx="200" cy="200" r="28" fill="#FFFFFF" opacity="0.8"/>
    `
  },
  {
    id: 'skateboard',
    name: 'Skateboard Deck',
    icon: '🛹',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal'],
    rule: 'Fold vertically (nose onto tail) OR horizontally (top rail onto bottom rail): both directions match perfectly!',
    validLinesText: '2 Lines (Vertical ↕ & Horizontal ↔)',
    funTip: 'Twin-tip skateboards have both vertical and horizontal symmetry so skaters can ride regular or switch!',
    svg: `
      <!-- Deck Board -->
      <rect x="60" y="145" width="280" height="110" rx="55" fill="#8B5CF6" stroke="#5B21B6" stroke-width="6"/>
      <!-- Grip Tape Center Inlay -->
      <rect x="90" y="160" width="220" height="80" rx="35" fill="#1E293B"/>
      <!-- Center Flame Emblem -->
      <circle cx="200" cy="200" r="22" fill="#F59E0B" stroke="#D97706" stroke-width="3"/>
      <polygon points="200,185 208,205 200,198 192,205" fill="#EF4444"/>
      <!-- Left Truck Bolts -->
      <circle cx="120" cy="180" r="4" fill="#F1F5F9"/>
      <circle cx="120" cy="220" r="4" fill="#F1F5F9"/>
      <circle cx="140" cy="180" r="4" fill="#F1F5F9"/>
      <circle cx="140" cy="220" r="4" fill="#F1F5F9"/>
      <!-- Right Truck Bolts (Exact Mirror) -->
      <circle cx="260" cy="180" r="4" fill="#F1F5F9"/>
      <circle cx="260" cy="220" r="4" fill="#F1F5F9"/>
      <circle cx="280" cy="180" r="4" fill="#F1F5F9"/>
      <circle cx="280" cy="220" r="4" fill="#F1F5F9"/>
    `
  },
  {
    id: 'flower',
    name: 'Sunny Flower',
    icon: '🌸',
    isSymmetric: true,
    validOrientations: ['vertical', 'horizontal', 'diagonal'],
    rule: 'This 8-petal blossom has radial symmetry: it folds vertically, horizontally, AND diagonally!',
    validLinesText: 'Multiple Lines (↕, ↔, ⤢)',
    funTip: 'Nature often creates radial blossoms with 4 or 8 symmetry lines!',
    svg: `
      <!-- 8 Petals spaced evenly -->
      <circle cx="200" cy="110" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="200" cy="290" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="110" cy="200" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="290" cy="200" r="38" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
      <circle cx="136" cy="136" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="264" cy="264" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="264" cy="136" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <circle cx="136" cy="264" r="38" fill="#FB7185" stroke="#BE185D" stroke-width="4"/>
      <!-- Center Disc -->
      <circle cx="200" cy="200" r="42" fill="#FDE047" stroke="#CA8A04" stroke-width="4"/>
    `
  },
  {
    id: 'teapot',
    name: 'Teapot with Spout',
    icon: '🫖',
    isSymmetric: false,
    validOrientations: [],
    rule: 'Asymmetry Trap! The long pouring spout is on the left and the looped handle is on the right. No fold line will ever align both sides!',
    validLinesText: '0 Lines (Not Symmetrical ❌)',
    funTip: 'Not everything in the world is symmetrical! An everyday teapot is asymmetrical so you can hold it and pour comfortably.',
    svg: `
      <!-- Main Teapot Body -->
      <ellipse cx="200" cy="225" rx="85" ry="70" fill="#EC4899" stroke="#9D174D" stroke-width="6"/>
      <!-- Spout on Left ONLY -->
      <path d="M 125,230 Q 75,210 60,150 Q 85,160 135,200 Z" fill="#F472B6" stroke="#9D174D" stroke-width="5"/>
      <!-- Looped Handle on Right ONLY -->
      <path d="M 275,180 C 350,190 350,270 275,280" fill="none" stroke="#9D174D" stroke-width="16" stroke-linecap="round"/>
      <path d="M 275,180 C 350,190 350,270 275,280" fill="none" stroke="#F472B6" stroke-width="8" stroke-linecap="round"/>
      <!-- Lid & Knob -->
      <path d="M 160,160 Q 200,135 240,160 Z" fill="#BE185D" stroke="#9D174D" stroke-width="4"/>
      <circle cx="200" cy="130" r="14" fill="#FACC15" stroke="#CA8A04" stroke-width="3"/>
      <!-- Base Stand -->
      <rect x="150" y="290" width="100" height="15" rx="6" fill="#BE185D"/>
    `
  },
  {
    id: 'rocket',
    name: 'Space Rocket',
    icon: '🚀',
    isSymmetric: true,
    validOrientations: ['vertical'],
    rule: 'Fold vertically along the center axis: the fuselage, window, and twin fins match like mirror twins!',
    validLinesText: '1 Line (Vertical ↕)',
    funTip: 'Rockets need vertical symmetry to fly straight into space without spinning out of control!',
    svg: `
      <!-- Rocket Body -->
      <path d="M 200,45 Q 260,120 260,260 L 140,260 Q 140,120 200,45 Z" fill="#F1F5F9" stroke="#334155" stroke-width="5"/>
      <!-- Nose Cone -->
      <path d="M 200,45 Q 235,90 240,130 L 160,130 Q 165,90 200,45 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <!-- Fins -->
      <path d="M 140,220 L 70,300 L 140,280 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <path d="M 260,220 L 330,300 L 260,280 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>
      <!-- Window -->
      <circle cx="200" cy="180" r="26" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
      <circle cx="192" cy="172" r="6" fill="#FFFFFF"/>
      <!-- Thruster Flame -->
      <polygon points="165,260 200,350 235,260" fill="#F97316"/>
      <polygon points="180,260 200,315 220,260" fill="#FDE047"/>
    `
  }
];

// ================= ACTIVITY 2: DETECTIVE SHAPES =================
const DETECTIVE_SHAPES = [
  {
    id: 'chair',
    name: 'Wooden Chair',
    icon: '🪑',
    totalLines: 1,
    clue: 'Look from the front: the backrest slats, seat, and twin legs mirror across the vertical center line!',
    tip: 'A chair only has 1 line of symmetry (vertical). A horizontal fold would put the tall backrest over the open floor legs!',
    shapeSvg: `
      <!-- Backrest Uprights & Top rail -->
      <path d="M 120,60 L 280,60 L 280,210 L 120,210 Z" fill="#D97706" stroke="#92400E" stroke-width="6"/>
      <line x1="160" y1="65" x2="160" y2="205" stroke="#FDE68A" stroke-width="8"/>
      <line x1="200" y1="65" x2="200" y2="205" stroke="#FDE68A" stroke-width="8"/>
      <line x1="240" y1="65" x2="240" y2="205" stroke="#FDE68A" stroke-width="8"/>
      <rect x="95" y="210" width="210" height="35" rx="8" fill="#F59E0B" stroke="#B45309" stroke-width="6"/>
      <rect x="110" y="245" width="20" height="115" rx="4" fill="#92400E"/>
      <rect x="270" y="245" width="20" height="115" rx="4" fill="#92400E"/>
      <rect x="125" y="300" width="150" height="12" rx="3" fill="#B45309"/>
    `,
    lines: [
      { id: 'vert', name: 'Vertical Center Line ↕', x1: 200, y1: 30, x2: 200, y2: 375, isSymmetric: true, desc: 'Perfect! Splits chair backrest, seat, and twin legs into matching halves!' },
      { id: 'horiz_seat', name: 'Horizontal Cut at Seat ↔ (Trap!)', x1: 40, y1: 225, x2: 360, y2: 225, isSymmetric: false, desc: 'Trap! The tall wooden backrest above does not match the empty chair legs below!' },
      { id: 'diag_tilt', name: 'Corner Diagonal ⤢ (Trap!)', x1: 60, y1: 60, x2: 340, y2: 340, isSymmetric: false, desc: 'Trap! Slanted fold puts the backrest corner onto empty leg space!' }
    ]
  },
  {
    id: 'sandwich',
    name: 'Deli Sandwich',
    icon: '🥪',
    totalLines: 1,
    clue: 'Attention Detective: This delicious sub sandwich has HORIZONTAL symmetry! The top bread crust mirrors the bottom crust.',
    tip: 'Not all symmetry is vertical! Folding top-to-bottom across the filling creates an exact mirror match.',
    shapeSvg: `
      <path d="M 80,180 Q 200,70 340,180 L 340,195 L 80,195 Z" fill="#D97706" stroke="#92400E" stroke-width="5"/>
      <ellipse cx="140" cy="155" rx="18" ry="8" fill="#F59E0B" opacity="0.6"/>
      <ellipse cx="230" cy="135" rx="22" ry="9" fill="#F59E0B" opacity="0.6"/>
      <rect x="70" y="195" width="280" height="10" rx="4" fill="#10B981" stroke="#047857" stroke-width="2"/>
      <rect x="90" y="193" width="70" height="14" rx="3" fill="#EF4444"/>
      <rect x="230" y="193" width="70" height="14" rx="3" fill="#EF4444"/>
      <path d="M 80,220 Q 200,330 340,220 L 340,205 L 80,205 Z" fill="#D97706" stroke="#92400E" stroke-width="5"/>
      <ellipse cx="140" cy="245" rx="18" ry="8" fill="#F59E0B" opacity="0.6"/>
      <ellipse cx="230" cy="265" rx="22" ry="9" fill="#F59E0B" opacity="0.6"/>
    `,
    lines: [
      { id: 'horiz', name: 'Horizontal Center Line ↔', x1: 40, y1: 200, x2: 360, y2: 200, isSymmetric: true, desc: 'Brilliant! Top curved bread and toppings fold right onto matching bottom bread!' },
      { id: 'vert_cut', name: 'Vertical Cut ↕ (Trap!)', x1: 200, y1: 40, x2: 200, y2: 360, isSymmetric: false, desc: 'Trap! The left side has a rounded crust tip while the right side has a cut angle!' },
      { id: 'diag_cut', name: 'Slanted Cut ⤢ (Trap!)', x1: 60, y1: 80, x2: 340, y2: 320, isSymmetric: false, desc: 'Trap! Slanted fold misses the horizontal symmetry axis!' }
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Gem',
    icon: '💎',
    totalLines: 4,
    clue: 'A diamond has 4 lines of symmetry: 1 vertical, 1 horizontal, and 2 diagonals connecting corner to corner!',
    tip: 'Try the diagonal lines: on a rhombus diamond, corner diagonals fold opposite points directly onto each other!',
    shapeSvg: `
      <polygon points="200,60 340,200 200,340 60,200" fill="#38BDF8" stroke="#0284C7" stroke-width="8"/>
      <polygon points="200,120 280,200 200,280 120,200" fill="#BAE6FD" stroke="#0284C7" stroke-width="4"/>
    `,
    lines: [
      { id: 'diag1', name: 'Corner Diagonal 1 ⤢', x1: 50, y1: 50, x2: 350, y2: 350, isSymmetric: true, desc: 'Awesome diagonal fold! Top-left corner matches bottom-right corner!' },
      { id: 'diag2', name: 'Corner Diagonal 2 ⤡', x1: 350, y1: 50, x2: 50, y2: 350, isSymmetric: true, desc: 'Awesome diagonal fold! Top-right corner matches bottom-left corner!' },
      { id: 'vert', name: 'Vertical Center Line ↕', x1: 200, y1: 30, x2: 200, y2: 370, isSymmetric: true, desc: 'Splits left diamond tip onto right tip!' },
      { id: 'horiz', name: 'Horizontal Center Line ↔', x1: 30, y1: 200, x2: 370, y2: 200, isSymmetric: true, desc: 'Splits top diamond tip onto bottom tip!' },
      { id: 'trap_off', name: 'Off-Axis Cut (Trap!)', x1: 90, y1: 60, x2: 310, y2: 340, isSymmetric: false, desc: 'Trap! Off-axis line does not connect opposing corners!' }
    ]
  },
  {
    id: 'skateboard',
    name: 'Skateboard Deck',
    icon: '🛹',
    totalLines: 2,
    clue: 'This skateboard has 2 lines of symmetry: vertical (nose to tail) AND horizontal (top rail to bottom rail)!',
    tip: 'A rectangle or skateboard deck has 2 symmetry lines (↕ and ↔). But its corner diagonals are NOT symmetry lines!',
    shapeSvg: `
      <rect x="50" y="130" width="300" height="140" rx="70" fill="#8B5CF6" stroke="#5B21B6" stroke-width="6"/>
      <rect x="80" y="150" width="240" height="100" rx="50" fill="#1E293B"/>
      <circle cx="200" cy="200" r="24" fill="#F59E0B" stroke="#D97706" stroke-width="3"/>
      <circle cx="110" cy="175" r="5" fill="#F1F5F9"/>
      <circle cx="110" cy="225" r="5" fill="#F1F5F9"/>
      <circle cx="135" cy="175" r="5" fill="#F1F5F9"/>
      <circle cx="135" cy="225" r="5" fill="#F1F5F9"/>
      <circle cx="265" cy="175" r="5" fill="#F1F5F9"/>
      <circle cx="265" cy="225" r="5" fill="#F1F5F9"/>
      <circle cx="290" cy="175" r="5" fill="#F1F5F9"/>
      <circle cx="290" cy="225" r="5" fill="#F1F5F9"/>
    `,
    lines: [
      { id: 'vert', name: 'Vertical Split (Nose to Tail) ↕', x1: 200, y1: 30, x2: 200, y2: 370, isSymmetric: true, desc: 'Great! Splits nose onto tail with matching wheels and bolts!' },
      { id: 'horiz', name: 'Horizontal Line ↔', x1: 20, y1: 200, x2: 380, y2: 200, isSymmetric: true, desc: 'Great! Top rail edge folds cleanly down onto matching bottom rail!' },
      { id: 'diag_trap', name: 'Corner Diagonal ⤢ (Trap!)', x1: 60, y1: 100, x2: 340, y2: 300, isSymmetric: false, desc: 'Trap! Long boards do not have diagonal symmetry: corners stick out into empty air!' }
    ]
  },
  {
    id: 'mug',
    name: 'Mug with Handle',
    icon: '☕',
    totalLines: 0,
    clue: 'Attention Detective: Look at the handle on the right! Does the left side have a handle to match?',
    tip: 'Not everything has symmetry! An everyday coffee mug with a handle on only one side has 0 lines of symmetry.',
    shapeSvg: `
      <rect x="120" y="110" width="160" height="190" rx="18" fill="#EC4899" stroke="#9D174D" stroke-width="7"/>
      <ellipse cx="200" cy="110" rx="80" ry="20" fill="#F472B6" stroke="#9D174D" stroke-width="5"/>
      <ellipse cx="200" cy="110" rx="65" ry="12" fill="#78350F"/>
      <path d="M 280,140 C 345,150 345,245 280,255" fill="none" stroke="#EC4899" stroke-width="24" stroke-linecap="round"/>
      <path d="M 280,140 C 345,150 345,245 280,255" fill="none" stroke="#9D174D" stroke-width="7" stroke-linecap="round"/>
    `,
    lines: [
      { id: 'vert_test', name: 'Vertical Center Line ↕ (Trap!)', x1: 200, y1: 20, x2: 200, y2: 360, isSymmetric: false, desc: 'Caught the trap! The right side has a big looped handle, but the left side has smooth ceramic with NO handle!' },
      { id: 'horiz_test', name: 'Horizontal Cut ↔ (Trap!)', x1: 40, y1: 205, x2: 360, y2: 205, isSymmetric: false, desc: 'Trap! The top open rim with hot cocoa does not match the flat solid bottom base!' }
    ]
  },
  {
    id: 'square',
    name: 'Square',
    icon: '🟦',
    totalLines: 4,
    clue: 'A square has 4 true lines of symmetry! 1 vertical, 1 horizontal, and 2 corner diagonals.',
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
    id: 'guitar',
    name: 'Acoustic Guitar',
    icon: '🎸',
    totalLines: 1,
    clue: 'An acoustic guitar has an hourglass wooden body, a round center soundhole, and a straight neck with tuning pegs.',
    tip: 'Guitar bodies are crafted symmetrically so strings resonate with pure, balanced acoustic tone!',
    shapeSvg: `
      <rect x="188" y="30" width="24" height="60" rx="4" fill="#78350F" stroke="#451A03" stroke-width="3"/>
      <rect x="191" y="90" width="18" height="90" fill="#B45309" stroke="#451A03" stroke-width="3"/>
      <circle cx="178" cy="45" r="6" fill="#F59E0B"/>
      <circle cx="178" cy="65" r="6" fill="#F59E0B"/>
      <circle cx="222" cy="45" r="6" fill="#F59E0B"/>
      <circle cx="222" cy="65" r="6" fill="#F59E0B"/>
      <ellipse cx="200" cy="210" rx="65" ry="45" fill="#D97706" stroke="#78350F" stroke-width="5"/>
      <ellipse cx="200" cy="285" rx="90" ry="65" fill="#D97706" stroke="#78350F" stroke-width="5"/>
      <circle cx="200" cy="225" r="24" fill="#1E293B" stroke="#78350F" stroke-width="4"/>
      <rect x="175" y="300" width="50" height="12" rx="3" fill="#451A03"/>
    `,
    lines: [
      { id: 'vert', name: 'Vertical String Line ↕', x1: 200, y1: 15, x2: 200, y2: 375, isSymmetric: true, desc: 'Brilliant! Splits the guitar neck, soundhole, and hourglass body into perfect twin sides!' },
      { id: 'horiz_waist', name: 'Horizontal Cut at Waist ↔ (Trap!)', x1: 30, y1: 235, x2: 370, y2: 235, isSymmetric: false, desc: 'Trap! The thin wooden neck at the top does not match the wide curved soundboard at the bottom!' },
      { id: 'diag_chord', name: 'Slanted Cut ⤢ (Trap!)', x1: 60, y1: 70, x2: 340, y2: 330, isSymmetric: false, desc: 'Trap! Diagonal line tilts across and misses the opposite curves completely!' }
    ]
  },
  {
    id: 'stop_sign',
    name: 'STOP Sign (Octagon)',
    icon: '🛑',
    totalLines: 8,
    clue: 'A regular octagon STOP sign has 8 equal sides and 8 lines of symmetry!',
    tip: 'Regular polygons always have as many lines of symmetry as they have equal sides: 8 sides = 8 lines!',
    shapeSvg: `<polygon points="200,45 310,90 355,200 310,310 200,355 90,310 45,200 90,90" fill="#EF4444" stroke="#991B1B" stroke-width="8"/>
               <text x="200" y="215" font-family="'Nunito', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle">STOP</text>`,
    lines: [
      { id: 'vert', name: 'Vertical Axis ↕', x1: 200, y1: 25, x2: 200, y2: 375, isSymmetric: true, desc: 'Splits top side to bottom side!' },
      { id: 'horiz', name: 'Horizontal Axis ↔', x1: 25, y1: 200, x2: 375, y2: 200, isSymmetric: true, desc: 'Splits left side to right side!' },
      { id: 'diag1', name: 'Diagonal 1 ⤢', x1: 50, y1: 50, x2: 350, y2: 350, isSymmetric: true, desc: 'Connects opposite vertex pair!' },
      { id: 'diag2', name: 'Diagonal 2 ⤡', x1: 350, y1: 50, x2: 50, y2: 350, isSymmetric: true, desc: 'Connects opposite vertex pair!' },
      { id: 'trap_cut', name: 'Corner Slice (Trap!)', x1: 60, y1: 150, x2: 300, y2: 350, isSymmetric: false, desc: 'Trap! Off-center cut slices uneven pieces that do not mirror!' }
    ]
  }
];

// ================= ACTIVITY 3: MIRROR PAINTER DATA =================
const PAINTER_COLORS = [
  '#EF4444', '#F97316', '#FACC15', '#10B981',
  '#38BDF8', '#6366F1', '#EC4899', '#1E293B'
];

const GUIDED_PATTERNS = [
  {
    id: 'heart',
    name: '8-Bit Heart',
    icon: '❤️',
    leftCells: [
      { r: 1, c: 1, color: '#EF4444' }, { r: 1, c: 2, color: '#EF4444' },
      { r: 2, c: 0, color: '#EF4444' }, { r: 2, c: 1, color: '#EF4444' }, { r: 2, c: 2, color: '#EF4444' }, { r: 2, c: 3, color: '#EF4444' },
      { r: 3, c: 0, color: '#EF4444' }, { r: 3, c: 1, color: '#EF4444' }, { r: 3, c: 2, color: '#EF4444' }, { r: 3, c: 3, color: '#EF4444' },
      { r: 4, c: 1, color: '#EF4444' }, { r: 4, c: 2, color: '#EF4444' }, { r: 4, c: 3, color: '#EF4444' },
      { r: 5, c: 2, color: '#EF4444' }, { r: 5, c: 3, color: '#EF4444' },
      { r: 6, c: 3, color: '#EF4444' }
    ]
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    icon: '🦋',
    leftCells: [
      { r: 1, c: 1, color: '#38BDF8' }, { r: 1, c: 2, color: '#38BDF8' },
      { r: 2, c: 0, color: '#38BDF8' }, { r: 2, c: 1, color: '#38BDF8' }, { r: 2, c: 2, color: '#38BDF8' }, { r: 2, c: 3, color: '#1E293B' },
      { r: 3, c: 1, color: '#38BDF8' }, { r: 3, c: 2, color: '#38BDF8' }, { r: 3, c: 3, color: '#1E293B' },
      { r: 4, c: 2, color: '#1E293B' }, { r: 4, c: 3, color: '#1E293B' },
      { r: 5, c: 1, color: '#EC4899' }, { r: 5, c: 2, color: '#EC4899' }, { r: 5, c: 3, color: '#1E293B' },
      { r: 6, c: 0, color: '#EC4899' }, { r: 6, c: 1, color: '#EC4899' }, { r: 6, c: 2, color: '#EC4899' }
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Gem',
    icon: '💎',
    leftCells: [
      { r: 1, c: 3, color: '#6366F1' },
      { r: 2, c: 2, color: '#6366F1' }, { r: 2, c: 3, color: '#38BDF8' },
      { r: 3, c: 1, color: '#6366F1' }, { r: 3, c: 2, color: '#38BDF8' }, { r: 3, c: 3, color: '#38BDF8' },
      { r: 4, c: 0, color: '#6366F1' }, { r: 4, c: 1, color: '#38BDF8' }, { r: 4, c: 2, color: '#38BDF8' }, { r: 4, c: 3, color: '#6366F1' },
      { r: 5, c: 1, color: '#6366F1' }, { r: 5, c: 2, color: '#38BDF8' }, { r: 5, c: 3, color: '#38BDF8' },
      { r: 6, c: 2, color: '#6366F1' }, { r: 6, c: 3, color: '#38BDF8' },
      { r: 7, c: 3, color: '#6366F1' }
    ]
  },
  {
    id: 'castle',
    name: 'Castle Tower',
    icon: '🏰',
    leftCells: [
      { r: 1, c: 1, color: '#F59E0B' }, { r: 1, c: 3, color: '#F59E0B' },
      { r: 2, c: 1, color: '#F59E0B' }, { r: 2, c: 2, color: '#F59E0B' }, { r: 2, c: 3, color: '#F59E0B' },
      { r: 3, c: 1, color: '#F59E0B' }, { r: 3, c: 2, color: '#F59E0B' }, { r: 3, c: 3, color: '#F59E0B' },
      { r: 4, c: 1, color: '#F59E0B' }, { r: 4, c: 2, color: '#F59E0B' }, { r: 4, c: 3, color: '#F59E0B' },
      { r: 5, c: 0, color: '#D97706' }, { r: 5, c: 1, color: '#D97706' }, { r: 5, c: 2, color: '#D97706' }, { r: 5, c: 3, color: '#D97706' },
      { r: 6, c: 0, color: '#D97706' }, { r: 6, c: 1, color: '#D97706' }, { r: 6, c: 2, color: '#D97706' }, { r: 6, c: 3, color: '#1E293B' },
      { r: 7, c: 0, color: '#D97706' }, { r: 7, c: 1, color: '#D97706' }, { r: 7, c: 2, color: '#D97706' }, { r: 7, c: 3, color: '#1E293B' }
    ]
  },
  {
    id: 'alien',
    name: 'Space Alien',
    icon: '👾',
    leftCells: [
      { r: 1, c: 2, color: '#10B981' },
      { r: 2, c: 1, color: '#10B981' }, { r: 2, c: 3, color: '#10B981' },
      { r: 3, c: 0, color: '#10B981' }, { r: 3, c: 1, color: '#10B981' }, { r: 3, c: 2, color: '#10B981' }, { r: 3, c: 3, color: '#10B981' },
      { r: 4, c: 0, color: '#10B981' }, { r: 4, c: 1, color: '#1E293B' }, { r: 4, c: 2, color: '#10B981' }, { r: 4, c: 3, color: '#10B981' },
      { r: 5, c: 0, color: '#10B981' }, { r: 5, c: 1, color: '#10B981' }, { r: 5, c: 2, color: '#10B981' }, { r: 5, c: 3, color: '#10B981' },
      { r: 6, c: 0, color: '#10B981' }, { r: 6, c: 2, color: '#10B981' },
      { r: 7, c: 1, color: '#10B981' }, { r: 7, c: 3, color: '#10B981' }
    ]
  },
  {
    id: 'flower',
    name: 'Magic Flower',
    icon: '🌸',
    leftCells: [
      { r: 1, c: 3, color: '#EC4899' },
      { r: 2, c: 2, color: '#EC4899' }, { r: 2, c: 3, color: '#EC4899' },
      { r: 3, c: 1, color: '#EC4899' }, { r: 3, c: 2, color: '#EC4899' }, { r: 3, c: 3, color: '#FACC15' },
      { r: 4, c: 1, color: '#EC4899' }, { r: 4, c: 2, color: '#EC4899' }, { r: 4, c: 3, color: '#FACC15' },
      { r: 5, c: 2, color: '#EC4899' }, { r: 5, c: 3, color: '#EC4899' },
      { r: 6, c: 3, color: '#10B981' },
      { r: 7, c: 2, color: '#10B981' }, { r: 7, c: 3, color: '#10B981' }
    ]
  }
];

const FREE_DRAW_INSPIRATIONS = [
  {
    id: 'mushroom',
    name: 'Mushroom',
    icon: '🍄',
    cells: [
      { r: 1, c: 3, color: '#EF4444' }, { r: 1, c: 4, color: '#EF4444' },
      { r: 2, c: 2, color: '#EF4444' }, { r: 2, c: 3, color: '#FFFFFF' }, { r: 2, c: 4, color: '#FFFFFF' }, { r: 2, c: 5, color: '#EF4444' },
      { r: 3, c: 1, color: '#EF4444' }, { r: 3, c: 2, color: '#EF4444' }, { r: 3, c: 3, color: '#EF4444' }, { r: 3, c: 4, color: '#EF4444' }, { r: 3, c: 5, color: '#EF4444' }, { r: 3, c: 6, color: '#EF4444' },
      { r: 4, c: 0, color: '#EF4444' }, { r: 4, c: 1, color: '#EF4444' }, { r: 4, c: 2, color: '#EF4444' }, { r: 4, c: 3, color: '#EF4444' }, { r: 4, c: 4, color: '#EF4444' }, { r: 4, c: 5, color: '#EF4444' }, { r: 4, c: 6, color: '#EF4444' }, { r: 4, c: 7, color: '#EF4444' },
      { r: 5, c: 3, color: '#F1F5F9' }, { r: 5, c: 4, color: '#F1F5F9' },
      { r: 6, c: 3, color: '#F1F5F9' }, { r: 6, c: 4, color: '#F1F5F9' }
    ]
  },
  {
    id: 'crown',
    name: 'Crown',
    icon: '👑',
    cells: [
      { r: 2, c: 1, color: '#FACC15' }, { r: 2, c: 3, color: '#FACC15' }, { r: 2, c: 4, color: '#FACC15' }, { r: 2, c: 6, color: '#FACC15' },
      { r: 3, c: 1, color: '#FACC15' }, { r: 3, c: 2, color: '#EF4444' }, { r: 3, c: 3, color: '#FACC15' }, { r: 3, c: 4, color: '#FACC15' }, { r: 3, c: 5, color: '#EF4444' }, { r: 3, c: 6, color: '#FACC15' },
      { r: 4, c: 1, color: '#FACC15' }, { r: 4, c: 2, color: '#FACC15' }, { r: 4, c: 3, color: '#FACC15' }, { r: 4, c: 4, color: '#FACC15' }, { r: 4, c: 5, color: '#FACC15' }, { r: 4, c: 6, color: '#FACC15' },
      { r: 5, c: 1, color: '#FACC15' }, { r: 5, c: 2, color: '#FACC15' }, { r: 5, c: 3, color: '#FACC15' }, { r: 5, c: 4, color: '#FACC15' }, { r: 5, c: 5, color: '#FACC15' }, { r: 5, c: 6, color: '#FACC15' }
    ]
  },
  {
    id: 'alien',
    name: 'Alien',
    icon: '👾',
    cells: [
      { r: 1, c: 2, color: '#10B981' }, { r: 1, c: 5, color: '#10B981' },
      { r: 2, c: 1, color: '#10B981' }, { r: 2, c: 3, color: '#10B981' }, { r: 2, c: 4, color: '#10B981' }, { r: 2, c: 6, color: '#10B981' },
      { r: 3, c: 0, color: '#10B981' }, { r: 3, c: 1, color: '#10B981' }, { r: 3, c: 2, color: '#10B981' }, { r: 3, c: 3, color: '#10B981' }, { r: 3, c: 4, color: '#10B981' }, { r: 3, c: 5, color: '#10B981' }, { r: 3, c: 6, color: '#10B981' }, { r: 3, c: 7, color: '#10B981' },
      { r: 4, c: 0, color: '#10B981' }, { r: 4, c: 1, color: '#1E293B' }, { r: 4, c: 2, color: '#10B981' }, { r: 4, c: 3, color: '#10B981' }, { r: 4, c: 4, color: '#10B981' }, { r: 4, c: 5, color: '#10B981' }, { r: 4, c: 6, color: '#1E293B' }, { r: 4, c: 7, color: '#10B981' },
      { r: 5, c: 0, color: '#10B981' }, { r: 5, c: 1, color: '#10B981' }, { r: 5, c: 2, color: '#10B981' }, { r: 5, c: 3, color: '#10B981' }, { r: 5, c: 4, color: '#10B981' }, { r: 5, c: 5, color: '#10B981' }, { r: 5, c: 6, color: '#10B981' }, { r: 5, c: 7, color: '#10B981' },
      { r: 6, c: 0, color: '#10B981' }, { r: 6, c: 2, color: '#10B981' }, { r: 6, c: 5, color: '#10B981' }, { r: 6, c: 7, color: '#10B981' },
      { r: 7, c: 1, color: '#10B981' }, { r: 7, c: 3, color: '#10B981' }, { r: 7, c: 4, color: '#10B981' }, { r: 7, c: 6, color: '#10B981' }
    ]
  },
  {
    id: 'sailboat',
    name: 'Sailboat',
    icon: '⛵',
    cells: [
      { r: 1, c: 3, color: '#38BDF8' },
      { r: 2, c: 2, color: '#38BDF8' }, { r: 2, c: 3, color: '#38BDF8' },
      { r: 3, c: 1, color: '#38BDF8' }, { r: 3, c: 2, color: '#38BDF8' }, { r: 3, c: 3, color: '#38BDF8' },
      { r: 4, c: 3, color: '#1E293B' }, { r: 4, c: 4, color: '#1E293B' },
      { r: 5, c: 1, color: '#F97316' }, { r: 5, c: 2, color: '#F97316' }, { r: 5, c: 3, color: '#F97316' }, { r: 5, c: 4, color: '#F97316' }, { r: 5, c: 5, color: '#F97316' }, { r: 5, c: 6, color: '#F97316' },
      { r: 6, c: 2, color: '#F97316' }, { r: 6, c: 3, color: '#F97316' }, { r: 6, c: 4, color: '#F97316' }, { r: 6, c: 5, color: '#F97316' }
    ]
  },
  {
    id: 'diamond',
    name: 'Gem',
    icon: '💎',
    cells: [
      { r: 1, c: 3, color: '#6366F1' }, { r: 1, c: 4, color: '#6366F1' },
      { r: 2, c: 2, color: '#6366F1' }, { r: 2, c: 3, color: '#38BDF8' }, { r: 2, c: 4, color: '#38BDF8' }, { r: 2, c: 5, color: '#6366F1' },
      { r: 3, c: 1, color: '#6366F1' }, { r: 3, c: 2, color: '#38BDF8' }, { r: 3, c: 3, color: '#38BDF8' }, { r: 3, c: 4, color: '#38BDF8' }, { r: 3, c: 5, color: '#38BDF8' }, { r: 3, c: 6, color: '#6366F1' },
      { r: 4, c: 0, color: '#6366F1' }, { r: 4, c: 1, color: '#38BDF8' }, { r: 4, c: 2, color: '#38BDF8' }, { r: 4, c: 3, color: '#6366F1' }, { r: 4, c: 4, color: '#6366F1' }, { r: 4, c: 5, color: '#38BDF8' }, { r: 4, c: 6, color: '#38BDF8' }, { r: 4, c: 7, color: '#6366F1' },
      { r: 5, c: 1, color: '#6366F1' }, { r: 5, c: 2, color: '#38BDF8' }, { r: 5, c: 3, color: '#38BDF8' }, { r: 5, c: 4, color: '#38BDF8' }, { r: 5, c: 5, color: '#38BDF8' }, { r: 5, c: 6, color: '#6366F1' },
      { r: 6, c: 2, color: '#6366F1' }, { r: 6, c: 3, color: '#38BDF8' }, { r: 6, c: 4, color: '#38BDF8' }, { r: 6, c: 5, color: '#6366F1' },
      { r: 7, c: 3, color: '#6366F1' }, { r: 7, c: 4, color: '#6366F1' }
    ]
  }
];

// ================= ACTIVITY 4: MIRROR MATCH ITEMS =================
const MIRROR_MATCH_ITEMS = [
  {
    id: 'waving_cat',
    name: 'Waving Kitty 🐱',
    hint: 'Look closely: which paw is raised high waving hello?',
    feedback: 'Splendid! In the mirror, the raised left paw reflects over to the right side! 🐱✨',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <path d="M 45,55 L 25,20 L 65,40 Z" fill="#F59E0B" stroke="#B45309" stroke-width="3"/>
        <path d="M 115,55 L 135,20 L 95,40 Z" fill="#F59E0B" stroke="#B45309" stroke-width="3"/>
        <ellipse cx="80" cy="75" rx="45" ry="38" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
        <circle cx="65" cy="70" r="6" fill="#1E293B"/>
        <circle cx="95" cy="70" r="6" fill="#1E293B"/>
        <polygon points="80,80 75,76 85,76" fill="#EF4444"/>
        <ellipse cx="80" cy="125" rx="38" ry="30" fill="#F59E0B" stroke="#B45309" stroke-width="3"/>
        <ellipse cx="28" cy="85" rx="14" ry="20" transform="rotate(-30 28 85)" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
        <circle cx="24" cy="77" r="4" fill="#FB7185"/>
        <ellipse cx="120" cy="130" rx="12" ry="10" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
      </svg>
    `,
    choices: [
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! This is identical to the original; it did not flip across the mirror!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! This is flipped upside-down, not across the vertical mirror!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! This is flipped both ways (upside-down and backwards)!' }
    ]
  },
  {
    id: 'teapot',
    name: 'Tea Pot 🫖',
    hint: 'Look at the long spout on the left and the round handle on the right!',
    feedback: 'Spot on! The spout pointing left reflects to point right in the mirror! 🫖✨',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <circle cx="85" cy="95" r="42" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
        <ellipse cx="85" cy="55" rx="24" ry="8" fill="#0284C7"/>
        <circle cx="85" cy="46" r="6" fill="#FBBF24"/>
        <path d="M 45,95 Q 18,90 22,65 Q 32,65 52,82 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
        <path d="M 125,75 Q 155,95 125,115" fill="none" stroke="#0284C7" stroke-width="8" stroke-linecap="round"/>
      </svg>
    `,
    choices: [
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! The spout is still on the left!' },
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! The teapot is upside down!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Tea would spill everywhere upside down!' }
    ]
  },
  {
    id: 'arrow',
    name: 'Turn Arrow ↗️',
    hint: 'Look which way the arrow points: up and curving to the right!',
    feedback: 'Fantastic! An arrow pointing right reflects to point left! ↖️✨',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <path d="M 40,130 C 40,85 70,55 110,55" fill="none" stroke="#10B981" stroke-width="14" stroke-linecap="round"/>
        <polygon points="125,55 95,35 100,75" fill="#10B981"/>
      </svg>
    `,
    choices: [
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Arrow is pointing downwards!' },
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! Arrow is still pointing right!' },
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'rotate(90deg)', isCorrect: false, tip: 'Trap! Arrow is rotated sideways!' }
    ]
  },
  {
    id: 'sailboat',
    name: 'Ocean Sailboat ⛵',
    hint: 'Look at the sail curving to the right and the red flag waving right!',
    feedback: 'Super sailor! The sail and flag mirror from pointing right to pointing left! ⛵🌊',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <path d="M 25,120 L 135,120 L 115,145 L 45,145 Z" fill="#D97706" stroke="#92400E" stroke-width="3"/>
        <line x1="75" y1="35" x2="75" y2="120" stroke="#78350F" stroke-width="5"/>
        <polygon points="75,35 105,42 75,50" fill="#EF4444"/>
        <path d="M 80,48 Q 130,85 80,115 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="3"/>
      </svg>
    `,
    choices: [
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! Boat is floating upside down in the sky!' },
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! Did not flip across the mirror!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Hull is in the air!' }
    ]
  },
  {
    id: 'letter_r',
    name: 'Alphabet Letter R 🔤',
    hint: 'Look at the straight vertical bar on the left, and the round loop on the right!',
    feedback: 'Great eye! The round loop flips to the left side in the mirror reflection! 🔤',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <path d="M 50,30 L 95,30 C 115,30 115,75 95,75 L 50,75 Z" fill="#6366F1" stroke="#3730A3" stroke-width="4"/>
        <path d="M 80,75 L 115,130 L 90,130 L 60,80 Z" fill="#6366F1" stroke="#3730A3" stroke-width="4"/>
        <rect x="42" y="30" width="22" height="100" rx="4" fill="#6366F1" stroke="#3730A3" stroke-width="4"/>
        <circle cx="78" cy="52" r="10" fill="#FFFFFF"/>
      </svg>
    `,
    choices: [
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! That is an unflipped letter R!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! The letter is upside down!' },
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! Flipped upside down and backwards!' }
    ]
  },
  {
    id: 'snail',
    name: 'Garden Snail 🐌',
    hint: 'Look at the spiral shell on the left and the head with eye tentacles facing right!',
    feedback: 'Champion! The snail crawling right reflects to crawl left! 🐌🌱',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <path d="M 25,130 C 50,130 90,130 135,130 C 145,130 148,110 135,100 C 125,90 120,105 110,115 C 80,120 40,125 25,130 Z" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
        <line x1="130" y1="100" x2="142" y2="80" stroke="#B45309" stroke-width="3"/>
        <circle cx="143" cy="78" r="4" fill="#EF4444"/>
        <circle cx="70" cy="95" r="32" fill="#F97316" stroke="#C2410C" stroke-width="4"/>
        <circle cx="70" cy="95" r="20" fill="#EA580C" stroke="#9A3412" stroke-width="3"/>
        <circle cx="70" cy="95" r="8" fill="#FDE047"/>
      </svg>
    `,
    choices: [
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! The snail is sliding upside down!' },
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! Still crawling to the right!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Shell is at the bottom upside down!' }
    ]
  },
  {
    id: 'car',
    name: 'Speedy Car 🚗',
    hint: 'Look at the tall spoiler on the back left and the yellow headlights on the front right!',
    feedback: 'Zoom zoom! The headlights mirror to shine to the left! 🚗💨',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <rect x="25" y="70" width="8" height="25" fill="#EF4444"/>
        <rect x="20" y="65" width="22" height="6" rx="2" fill="#B91C1C"/>
        <path d="M 30,95 L 50,65 L 105,65 L 135,95 L 140,115 L 25,115 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="3"/>
        <polygon points="56,70 76,70 76,90 42,90" fill="#E0F2FE"/>
        <polygon points="82,70 102,70 125,90 82,90" fill="#E0F2FE"/>
        <ellipse cx="138" cy="100" rx="4" ry="7" fill="#FDE047"/>
        <circle cx="48" cy="120" r="14" fill="#1E293B"/>
        <circle cx="48" cy="120" r="6" fill="#CBD5E1"/>
        <circle cx="118" cy="120" r="14" fill="#1E293B"/>
        <circle cx="118" cy="120" r="6" fill="#CBD5E1"/>
      </svg>
    `,
    choices: [
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! Headlights are still shining right!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Wheels are in the air!' },
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! Upside down car!' }
    ]
  },
  {
    id: 'hand_point',
    name: 'Pointing Hand 👉',
    hint: 'Look which way the index finger is pointing: to the right!',
    feedback: 'Direct hit! The index finger mirrors across the line to point left! 👈✨',
    svg: `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <rect x="15" y="60" width="30" height="50" rx="4" fill="#4F46E5" stroke="#3730A3" stroke-width="3"/>
        <ellipse cx="65" cy="85" rx="25" ry="22" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
        <rect x="75" y="70" width="55" height="15" rx="7" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
        <ellipse cx="60" cy="72" rx="10" ry="8" fill="#FBBF24" stroke="#B45309" stroke-width="2"/>
      </svg>
    `,
    choices: [
      { id: 'correct', transform: 'scaleX(-1)', isCorrect: true, tip: 'Horizontal mirror flip!' },
      { id: 'rotated', transform: 'scale(-1, -1)', isCorrect: false, tip: 'Trap! Hand is flipped upside down!' },
      { id: 'unflipped', transform: 'none', isCorrect: false, tip: 'Trap! Still pointing right!' },
      { id: 'upside_down', transform: 'scaleY(-1)', isCorrect: false, tip: 'Trap! Pointing down!' }
    ]
  }
];

// ================= ACTIVITY 5: SYMMETRY CHALLENGE QUIZZES =================
const SYMM_QUIZ_LEVELS = [
  {
    id: 'basics',
    title: 'Level 1: Is It Symmetrical?',
    desc: 'Can these objects fold into matching twin halves?',
    icon: '🦋',
    questions: [
      {
        illustration: '🦋',
        question: 'Does this butterfly have matching left and right halves?',
        options: ['Yes, both wings match! 🦋', 'No, they don\'t match ❌'],
        correct: 0,
        feedback: 'Correct! When folded down the middle, both butterfly wings match up perfectly!'
      },
      {
        illustration: '☕',
        question: 'Does a coffee mug with 1 handle have matching left and right halves?',
        options: ['No, the handle is on one side only! ❌', 'Yes, both sides match'],
        correct: 0,
        feedback: 'Great eye! The handle sticks out on one side, so the halves do not match!'
      },
      {
        illustration: '❤️',
        question: 'Can you fold a love heart down the center so both sides match?',
        options: ['Yes! Both sides match! ❤️', 'No, they are different ❌'],
        correct: 0,
        feedback: 'Spot on! The left curved loop matches the right curved loop!'
      },
      {
        illustration: '🚀',
        question: 'Does a space rocket have a vertical line of symmetry down the middle?',
        options: ['Yes, left and right fins match! 🚀', 'No, rockets don\'t match ❌'],
        correct: 0,
        feedback: 'Awesome! Both rocket fins match so the rocket flies straight up into space!'
      },
      {
        illustration: '📄',
        question: 'What does "Symmetrical" mean in math?',
        options: ['Both sides match when folded in half! ✨', 'The shape is made of wood', 'One side is bigger than the other'],
        correct: 0,
        feedback: 'Perfect! Symmetrical means both halves match up like mirror twins!'
      }
    ]
  },
  {
    id: 'direction',
    title: 'Level 2: Up-Down or Left-Right?',
    desc: 'Find which direction the fold line goes: vertical or horizontal!',
    icon: '↕️',
    questions: [
      {
        illustration: '🥪',
        question: 'Which way can you fold this sandwich so top bread matches bottom bread?',
        options: ['Horizontal fold (Top to Bottom) ↔', 'Vertical fold (Left to Right) ↕'],
        correct: 0,
        feedback: 'Yum! Folding horizontally across the middle matches top crust to bottom crust!'
      },
      {
        illustration: '🪑',
        question: 'Which way can you fold a wooden chair so both sides match?',
        options: ['Vertical fold (Left to Right) ↕', 'Horizontal fold (Top to Bottom) ↔'],
        correct: 0,
        feedback: 'Correct! The left legs and right legs match across the center vertical line!'
      },
      {
        illustration: '🛹',
        question: 'Can a skateboard fold BOTH top-to-bottom and left-to-right?',
        options: ['Yes! It has 2 lines of symmetry! 🛹', 'No, only 1 way', '0 ways'],
        correct: 0,
        feedback: 'Champion! A skateboard matches both ways: across its length and across its width!'
      },
      {
        illustration: '💎',
        question: 'Can a diamond gem fold in more than one direction?',
        options: ['Yes, it can fold across its corners and center! 💎', 'No, only one way'],
        correct: 0,
        feedback: 'Brilliant! A diamond has multiple lines of symmetry passing through opposite points!'
      },
      {
        illustration: '🫖',
        question: 'Can a teapot with a spout on one side and handle on the other fold to match?',
        options: ['No, it does not match (Asymmetrical) ❌', 'Yes, any fold works'],
        correct: 0,
        feedback: 'Sharp detective! The spout and handle are completely different, so it cannot fold to match!'
      }
    ]
  },
  {
    id: 'letters',
    title: 'Level 3: Letter & Number Fun',
    desc: 'Discover secret symmetry in alphabet letters and numbers!',
    icon: '🅰️',
    questions: [
      {
        illustration: '🅰️',
        question: 'Can you fold the capital letter "A" down the middle to match?',
        options: ['Yes, vertical fold down the middle! ↕', 'No, it cannot fold ❌'],
        correct: 0,
        feedback: 'Correct! A vertical line right down the peak folds both legs of "A" together!'
      },
      {
        illustration: '🅱️',
        question: 'Which way can you fold the capital letter "B"?',
        options: ['Horizontal fold across the middle! ↔', 'Vertical fold down the middle ↕'],
        correct: 0,
        feedback: 'Spot on! Fold top-to-bottom so the top loop covers the bottom loop!'
      },
      {
        illustration: '🔤',
        question: 'Can you fold the letter "F" into matching halves?',
        options: ['No, letter "F" has no symmetry lines! ❌', 'Yes, it matches both ways'],
        correct: 0,
        feedback: 'Great eye! The bars on "F" stick out on the right only, so neither fold will align!'
      },
      {
        illustration: '8️⃣',
        question: 'Does the number "8" have lines of symmetry?',
        options: ['Yes, both top-to-bottom and left-to-right! ✨', 'No, zero lines'],
        correct: 0,
        feedback: 'Super! The two round loops reflect in both directions!'
      },
      {
        illustration: 'Ⓜ️',
        question: 'Which fold makes matching halves for the capital letter "M"?',
        options: ['Vertical fold down the center! ↕', 'Horizontal fold across the middle ↔'],
        correct: 0,
        feedback: 'Champion! Left and right peaks of "M" fold together vertically!'
      }
    ]
  },
  {
    id: 'shapes',
    title: 'Level 4: Shape Detective',
    desc: 'Count fold lines in basic shapes and mirror reflections!',
    icon: '⭐',
    questions: [
      {
        illustration: '🟦',
        question: 'How many ways can you fold a square into matching halves?',
        options: ['4 ways (Up-down, Left-right, and 2 Diagonals) ⭐', 'Only 1 way', '0 ways'],
        correct: 0,
        feedback: 'You rock! A square can fold 4 different ways and always match!'
      },
      {
        illustration: '⭕',
        question: 'How many fold lines can you make on a round circle?',
        options: ['Lots and lots (as many as you want!) ⭕', 'Only 1 line', 'Only 2 lines'],
        correct: 0,
        feedback: 'Amazing! Any straight line going through the center of a circle cuts it into matching halves!'
      },
      {
        illustration: '🔺',
        question: 'A triangle where all 3 sides are equal has how many fold lines?',
        options: ['3 fold lines (one from each corner point) 🔺', '1 line only', '0 lines'],
        correct: 0,
        feedback: 'Correct! Each of the 3 corners can fold down to the opposite side!'
      },
      {
        illustration: '🛑',
        question: 'An 8-sided STOP sign has how many fold lines?',
        options: ['8 fold lines! 🛑', 'Only 2 fold lines', '0 fold lines'],
        correct: 0,
        feedback: 'Outstanding! An 8-sided regular shape has 8 lines of symmetry!'
      },
      {
        illustration: '🪞',
        question: 'When you wave your right hand in a mirror, which hand does your reflection wave?',
        options: ['Left hand (it\'s a mirror reflection!) 🪞', 'Right foot', 'Both hands'],
        correct: 0,
        feedback: 'Brilliant! Mirrors flip left and right—that\'s how reflection symmetry works!'
      }
    ]
  }
];

// Attach to window
window.FOLD_ITEMS = FOLD_ITEMS;
window.DETECTIVE_SHAPES = DETECTIVE_SHAPES;
window.PAINTER_COLORS = PAINTER_COLORS;
window.GUIDED_PATTERNS = GUIDED_PATTERNS;
window.FREE_DRAW_INSPIRATIONS = FREE_DRAW_INSPIRATIONS;
window.MIRROR_MATCH_ITEMS = MIRROR_MATCH_ITEMS;
window.SYMM_QUIZ_LEVELS = SYMM_QUIZ_LEVELS;
