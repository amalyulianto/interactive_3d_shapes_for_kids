/**
 * Chapter 6, Lesson 1: Length Studio (cm & m) — Data & Vector Illustrations
 * Aligned with Cambridge Primary Active Maths Stage 2:
 *   - Textbook pp. 83–89
 *   - Workbook Worksheets 1, 2, 3 (pp. 63–67)
 * Zero-Build Architecture — Alapakadala Studio
 */
(function () {
  'use strict';

  /* ==========================================================================
     1. VECTOR SVG ILLUSTRATION LIBRARY
     ========================================================================== */
  function getObjectSvg(id, widthPx) {
    const w = widthPx || 160;
    switch (id) {
      case 'finger':
        return `<svg viewBox="0 0 60 90" width="${w}" height="64" aria-hidden="true">
          <rect x="10" y="18" width="40" height="68" rx="20" fill="#FDBA74" stroke="#C2410C" stroke-width="3"/>
          <rect x="17" y="24" width="26" height="20" rx="10" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
          <path d="M16 56 Q30 61 44 56" fill="none" stroke="#C2410C" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

      case 'eraser':
        return `<svg viewBox="0 0 180 54" width="${w}" height="44" aria-hidden="true">
          <rect x="2" y="6" width="176" height="42" rx="7" fill="#FFFFFF" stroke="#475569" stroke-width="3"/>
          <path d="M2 13 Q2 6 9 6 L118 6 L118 48 L9 48 Q2 48 2 41 Z" fill="#2563EB"/>
          <rect x="114" y="6" width="8" height="42" fill="#1D4ED8"/>
          <text x="60" y="33" text-anchor="middle" fill="#FFFFFF" font-family="Nunito, sans-serif" font-weight="900" font-size="16" letter-spacing="1">ERASER</text>
        </svg>`;

      case 'pencil_green':
        return `<svg viewBox="0 0 360 44" width="${w}" height="38" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="8" width="28" height="28" rx="5" fill="#F472B6" stroke="#9D174D" stroke-width="2.5"/>
          <rect x="28" y="8" width="12" height="28" fill="#CBD5E1" stroke="#475569" stroke-width="2.5"/>
          <rect x="40" y="8" width="272" height="28" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
          <line x1="40" y1="17" x2="312" y2="17" stroke="#86EFAC" stroke-width="2"/>
          <line x1="40" y1="27" x2="312" y2="27" stroke="#16A34A" stroke-width="2"/>
          <polygon points="312,8 358,22 312,36" fill="#FDE68A" stroke="#92400E" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="342,17.2 358,22 342,26.8" fill="#1E293B"/>
        </svg>`;

      case 'pencil_red':
        return `<svg viewBox="0 0 360 40" width="${w}" height="32" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="7" width="26" height="26" rx="5" fill="#FBCFE8" stroke="#9D174D" stroke-width="2.5"/>
          <rect x="26" y="7" width="10" height="26" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
          <rect x="36" y="7" width="280" height="26" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5"/>
          <line x1="36" y1="16" x2="316" y2="16" stroke="#FCA5A5" stroke-width="2"/>
          <polygon points="316,7 358,20 316,33" fill="#FDE68A" stroke="#92400E" stroke-width="2.5"/>
          <polygon points="343,15.4 358,20 343,24.6" fill="#1E293B"/>
        </svg>`;

      case 'pencil_blue':
        return `<svg viewBox="0 0 260 40" width="${w}" height="32" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="7" width="24" height="26" rx="5" fill="#FBCFE8" stroke="#9D174D" stroke-width="2.5"/>
          <rect x="24" y="7" width="10" height="26" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
          <rect x="34" y="7" width="186" height="26" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5"/>
          <line x1="34" y1="16" x2="220" y2="16" stroke="#93C5FD" stroke-width="2"/>
          <polygon points="220,7 258,20 220,33" fill="#FDE68A" stroke="#92400E" stroke-width="2.5"/>
          <polygon points="244,15.5 258,20 244,24.5" fill="#1E293B"/>
        </svg>`;

      case 'highlighter':
        return `<svg viewBox="0 0 280 50" width="${w}" height="42" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="9" width="46" height="32" rx="6" fill="#EA580C" stroke="#9A3412" stroke-width="2.5"/>
          <rect x="48" y="7" width="188" height="36" rx="6" fill="#FB923C" stroke="#9A3412" stroke-width="2.5"/>
          <rect x="76" y="15" width="120" height="20" rx="5" fill="#FFEDD5"/>
          <text x="136" y="29" text-anchor="middle" fill="#9A3412" font-family="Nunito, sans-serif" font-weight="900" font-size="12">GLOW</text>
          <polygon points="236,12 264,15 264,35 236,38" fill="#FDBA74" stroke="#9A3412" stroke-width="2.5"/>
          <polygon points="264,17 278,21 278,29 264,33" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
        </svg>`;

      case 'stapler':
        return `<svg viewBox="0 0 240 68" width="${w}" height="52" preserveAspectRatio="none" aria-hidden="true">
          <rect x="4" y="48" width="232" height="14" rx="5" fill="#334155" stroke="#0F172A" stroke-width="2.5"/>
          <rect x="14" y="36" width="206" height="13" rx="3" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
          <path d="M4 34 Q6 10 38 10 L226 18 Q236 20 236 34 L228 40 L4 40 Z" fill="#FACC15" stroke="#A16207" stroke-width="2.8"/>
          <circle cx="26" cy="36" r="5" fill="#475569"/>
        </svg>`;

      case 'clipper':
        return `<svg viewBox="0 0 200 58" width="${w}" height="46" preserveAspectRatio="none" aria-hidden="true">
          <path d="M8 38 L188 44 L196 34 L188 28 L12 30 Z" fill="#CBD5E1" stroke="#475569" stroke-width="2.5"/>
          <path d="M18 28 L168 10 Q180 8 184 16 L176 22 L28 32 Z" fill="#E2E8F0" stroke="#475569" stroke-width="2.5"/>
          <rect x="172" y="18" width="10" height="22" rx="2" fill="#64748B"/>
          <circle cx="22" cy="34" r="5" fill="#FFFFFF" stroke="#475569" stroke-width="2.5"/>
        </svg>`;

      case 'clipper_purple':
        return `<svg viewBox="0 0 200 54" width="${w}" height="36" preserveAspectRatio="none" aria-hidden="true">
          <path d="M6 36 L188 42 L196 32 L186 26 L10 28 Z" fill="#A855F7" stroke="#6B21A8" stroke-width="2.5"/>
          <path d="M18 26 L168 10 Q180 8 184 16 L174 22 L28 30 Z" fill="#C084FC" stroke="#6B21A8" stroke-width="2.5"/>
          <rect x="172" y="18" width="10" height="20" rx="2" fill="#581C87"/>
        </svg>`;

      case 'battery':
        return `<svg viewBox="0 0 200 54" width="${w}" height="44" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="8" width="184" height="38" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="2.5"/>
          <path d="M130 8 L180 8 Q186 8 186 14 L186 40 Q186 46 180 46 L130 46 Z" fill="#D97706" stroke="#92400E" stroke-width="2.5"/>
          <rect x="186" y="18" width="12" height="18" rx="3" fill="#CBD5E1" stroke="#475569" stroke-width="2.5"/>
          <text x="68" y="32" text-anchor="middle" fill="#FACC15" font-family="JetBrains Mono, monospace" font-weight="800" font-size="16">AA +</text>
        </svg>`;

      case 'nail':
        return `<svg viewBox="0 0 200 42" width="${w}" height="36" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="6" width="12" height="30" rx="3" fill="#94A3B8" stroke="#334155" stroke-width="2.5"/>
          <polygon points="14,15 170,15 198,21 170,27 14,27" fill="#CBD5E1" stroke="#334155" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>`;

      case 'hair_clip':
        return `<svg viewBox="0 0 160 36" width="${w}" height="28" preserveAspectRatio="none" aria-hidden="true">
          <path d="M154 12 L14 12 Q4 12 4 19 Q4 26 14 26 L154 24" fill="none" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
          <path d="M24 12 Q36 5 48 12 T72 12 T96 12" fill="none" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="154" cy="12" r="4" fill="#0F172A"/>
          <circle cx="154" cy="24" r="4" fill="#0F172A"/>
        </svg>`;

      case 'clothes_peg':
        return `<svg viewBox="0 0 200 42" width="${w}" height="30" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="2,8 198,13 198,20 2,19" fill="#FDBA74" stroke="#9A3412" stroke-width="2.5"/>
          <polygon points="2,34 198,29 198,22 2,23" fill="#FB923C" stroke="#9A3412" stroke-width="2.5"/>
          <circle cx="96" cy="21" r="6" fill="#64748B" stroke="#1E293B" stroke-width="2"/>
        </svg>`;

      case 'spoon':
        return `<svg viewBox="0 0 280 46" width="${w}" height="34" preserveAspectRatio="none" aria-hidden="true">
          <rect x="4" y="18" width="196" height="10" rx="5" fill="#E2E8F0" stroke="#475569" stroke-width="2.5"/>
          <ellipse cx="236" cy="23" rx="42" ry="17" fill="#F1F5F9" stroke="#475569" stroke-width="2.5"/>
          <ellipse cx="238" cy="21" rx="28" ry="9" fill="#CBD5E1"/>
        </svg>`;

      case 'straw':
        return `<svg viewBox="0 0 340 28" width="${w}" height="24" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="7" width="336" height="14" rx="4" fill="#FFFFFF" stroke="#64748B" stroke-width="2.2"/>
          <line x1="40" y1="7" x2="56" y2="21" stroke="#38BDF8" stroke-width="4"/>
          <line x1="110" y1="7" x2="126" y2="21" stroke="#38BDF8" stroke-width="4"/>
          <line x1="180" y1="7" x2="196" y2="21" stroke="#38BDF8" stroke-width="4"/>
          <line x1="250" y1="7" x2="266" y2="21" stroke="#38BDF8" stroke-width="4"/>
        </svg>`;

      case 'comb':
        return `<svg viewBox="0 0 340 44" width="${w}" height="34" preserveAspectRatio="none" aria-hidden="true">
          <rect x="2" y="4" width="336" height="14" rx="5" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
          ${Array.from({ length: 26 }, (_, i) => `<line x1="${12 + i * 12.6}" y1="18" x2="${12 + i * 12.6}" y2="39" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>`).join('')}
        </svg>`;

      case 'toothbrush':
        return `<svg viewBox="0 0 280 44" width="${w}" height="34" preserveAspectRatio="none" aria-hidden="true">
          <rect x="214" y="6" width="60" height="18" rx="3" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          ${Array.from({ length: 8 }, (_, i) => `<line x1="${220 + i * 7}" y1="8" x2="${220 + i * 7}" y2="24" stroke="#38BDF8" stroke-width="2.5"/>`).join('')}
          <rect x="2" y="22" width="276" height="14" rx="7" fill="#2563EB" stroke="#1E40AF" stroke-width="2.5"/>
          <rect x="24" y="25" width="90" height="8" rx="4" fill="#93C5FD"/>
        </svg>`;

      case 'soap':
        return `<svg viewBox="0 0 200 50" width="${w}" height="38" preserveAspectRatio="none" aria-hidden="true">
          <rect x="3" y="6" width="194" height="38" rx="14" fill="#F9A8D4" stroke="#DB2777" stroke-width="2.5"/>
          <rect x="22" y="13" width="156" height="24" rx="9" fill="#FBCFE8" stroke="#EC4899" stroke-width="1.8"/>
          <text x="100" y="30" text-anchor="middle" fill="#9D174D" font-family="Nunito, sans-serif" font-weight="900" font-size="14">SOAP</text>
        </svg>`;

      default:
        return '';
    }
  }

  /* ==========================================================================
     2. TAB 1 DATASETS — CENTIMETRE RULER, FAULTY RULER & CURVED STRING
     ========================================================================== */
  const CM_ITEMS = [
    {
      id: 'finger',
      name: 'Finger Width',
      badge: 'Textbook p. 84',
      svgId: 'finger',
      startCm: 0,
      endCm: 1,
      mode: 'exact',
      answer: 1,
      character: 'Tim',
      bubble: 'The width of your index finger is about 1 cm! Start right at the 0 cm mark.',
      prompt: 'The width of the finger is ___ cm.'
    },
    {
      id: 'eraser',
      name: 'Blue Eraser',
      badge: 'Textbook p. 84',
      svgId: 'eraser',
      startCm: 0,
      endCm: 4,
      mode: 'exact',
      answer: 4,
      character: 'Momo',
      bubble: 'Start measuring at the 0 cm mark, NOT at the plastic edge of the ruler!',
      prompt: 'The eraser is ___ cm long.'
    },
    {
      id: 'pencil12',
      name: 'Green Pencil (WS 1)',
      badge: 'Workbook p. 63 Q1a',
      svgId: 'pencil_green',
      startCm: 0,
      endCm: 12,
      mode: 'exact',
      answer: 12,
      character: 'Ada',
      bubble: 'The ruler works just like a number line from 0 to 15!',
      prompt: 'The pencil is ___ cm long.'
    },
    {
      id: 'pencil13',
      name: 'Long Pencil (TB)',
      badge: 'Textbook p. 84',
      svgId: 'pencil_green',
      startCm: 0,
      endCm: 13,
      mode: 'exact',
      answer: 13,
      character: 'Ada',
      bubble: 'One end is at 0 cm, so look straight down from the sharp tip!',
      prompt: 'The long pencil is ___ cm long.'
    },
    {
      id: 'highlighter',
      name: 'Orange Highlighter',
      badge: 'Textbook p. 84',
      svgId: 'highlighter',
      startCm: 0,
      endCm: 8.5,
      mode: 'between',
      answerLow: 8,
      answerHigh: 9,
      character: 'Vera',
      bubble: 'Look closely! The tip stops halfway between two whole numbers.',
      prompt: 'The highlighter is more than ___ cm and less than ___ cm.'
    },
    {
      id: 'stapler',
      name: 'Stapler (Non-Zero!)',
      badge: 'Textbook p. 85',
      svgId: 'stapler',
      startCm: 7,
      endCm: 14,
      mode: 'nonzero',
      answer: 7,
      character: 'Coco',
      bubble: 'Not at 0 cm! Count +1 cm hops from 7 to 14, or subtract: 14 cm − 7 cm!',
      prompt: 'The stapler is ___ cm long.'
    },
    {
      id: 'clipper',
      name: 'Nail Clipper (Non-Zero!)',
      badge: 'Textbook p. 85 Q2',
      svgId: 'clipper',
      startCm: 4,
      endCm: 9,
      mode: 'nonzero',
      answer: 5,
      character: 'Coco',
      bubble: 'Left end is at 4 cm and right end is at 9 cm. Subtract smaller from larger!',
      prompt: 'The length of the nail clipper is ___ cm.'
    },
    {
      id: 'battery',
      name: 'AA Battery (Non-Zero!)',
      badge: 'Workbook p. 63 Q1b',
      svgId: 'battery',
      startCm: 5,
      endCm: 10,
      mode: 'nonzero',
      answer: 5,
      character: 'Momo',
      bubble: 'Careful — the battery is not at 0 cm! Do not just read 10 cm!',
      prompt: 'The length of the battery is ___ cm.'
    }
  ];

  const FAULTY_RULER = {
    badge: 'Workbook p. 63 Q3',
    printedMarks: [0, 1, 2, 3, 4, 7, 6, 7, 8, 9, 11, 11, 12, 13, 14, 15],
    mistakes: {
      5: { wrong: 7, correct: 5 },
      10: { wrong: 11, correct: 10 }
    },
    nailStartCm: 5,
    nailEndCm: 10,
    nailAnswer: 5
  };

  const CURVED_LINES = [
    {
      id: 'letter_s',
      name: 'Curved Letter S',
      badge: 'Textbook p. 86',
      spanStartCm: 0,
      spanEndCm: 1,
      trueLengthCm: 3,
      curvedPath: 'M 44 45 C 12 22, 76 18, 44 45 C 12 68, 76 68, 44 45',
      svgType: 'letterS',
      momoQuestion: 'The letter S sits between 0 cm and 1 cm. Once straightened, it is 3 cm! Is it longer than, shorter than, or equal to 1 cm?',
      compareAnswer: 'longer than'
    },
    {
      id: 'green_wave',
      name: 'Green Wavy String',
      badge: 'Textbook p. 86 Example',
      spanStartCm: 0,
      spanEndCm: 6.5,
      trueLengthCm: 9,
      svgType: 'greenWave',
      momoQuestion: 'A ruler cannot bend, so we lay green string along the curve, snip it, and stretch it flat from 0 cm!',
      compareAnswer: null
    },
    {
      id: 'pink_wave',
      name: 'Pink Double-Wave',
      badge: 'Textbook p. 86 Try It!',
      spanStartCm: 0,
      spanEndCm: 8,
      trueLengthCm: 11,
      svgType: 'pinkWave',
      momoQuestion: 'Vera says a measuring tape is a flexible ruler — just like laying string on a curvy path!',
      compareAnswer: null
    }
  ];

  /* ==========================================================================
     3. TAB 2 DATASETS — METRE RULES (m) & SUITABLE UNITS (cm vs m)
     ========================================================================== */
  const METRE_SCENES = [
    {
      id: 'doorknob',
      title: 'Floor to Doorknob Height',
      badge: 'Textbook p. 87',
      rulesCount: 1,
      orientation: 'vertical',
      objectRatio: 1.0, // 1.0 * 1m = right at 1m
      targetMetres: 1,
      sentenceBefore: 'The height from the floor to the doorknob is',
      sentenceAfter: '1 m.',
      answer: 'about',
      tip: 'Tim says: "The height of the door to the doorknob is about 1 m — a great benchmark to remember!"',
      icon: '🚪'
    },
    {
      id: 'whiteboard',
      title: 'Classroom Whiteboard',
      badge: 'Textbook p. 87',
      rulesCount: 2,
      orientation: 'horizontal',
      objectRatio: 1.0, // spans 2 rules cleanly
      targetMetres: 2,
      sentenceBefore: 'The classroom whiteboard is',
      sentenceAfter: '2 m long.',
      answer: 'about',
      tip: 'Ada placed 2 metre rules end-to-end and they match the whiteboard from edge to edge!',
      icon: '📋'
    },
    {
      id: 'student_desk',
      title: 'Orange Student Desk',
      badge: 'Textbook p. 87',
      rulesCount: 1,
      orientation: 'horizontal',
      objectRatio: 0.72,
      targetMetres: 1,
      sentenceBefore: 'The student desk is',
      sentenceAfter: '1 m wide.',
      answer: 'less than',
      tip: 'The 1-metre stick pokes out past the right edge of the student desk, so the desk is less than 1 m!',
      icon: '🪑'
    },
    {
      id: 'teacher_desk',
      title: 'Teacher\'s Big Desk',
      badge: 'Textbook p. 87',
      rulesCount: 1,
      orientation: 'horizontal',
      objectRatio: 1.42,
      targetMetres: 1,
      sentenceBefore: 'The teacher\'s desk is',
      sentenceAfter: '1 m long.',
      answer: 'more than',
      tip: 'One 1-metre rule stops well before the right end of the teacher\'s desk!',
      icon: '📚'
    },
    {
      id: 'notice_len',
      title: 'Class 2A Notice Board (Length)',
      badge: 'Textbook p. 87 Solve this! a',
      rulesCount: 2,
      orientation: 'horizontal',
      objectRatio: 1.25, // 2.5m vs 2m rules
      targetMetres: 2,
      sentenceBefore: 'The Class 2A notice board is',
      sentenceAfter: '2 m long.',
      answer: 'more than',
      tip: 'Two metre rules placed end-to-end stop short of the right edge, so the board is more than 2 m long!',
      icon: '📌'
    },
    {
      id: 'notice_tall',
      title: 'Class 2A Notice Board (Height)',
      badge: 'Textbook p. 87 Solve this! b',
      rulesCount: 1,
      orientation: 'vertical',
      objectRatio: 1.0,
      targetMetres: 1,
      sentenceBefore: 'The Class 2A notice board is',
      sentenceAfter: '1 m tall.',
      answer: 'about',
      tip: 'One vertical metre rule matches the top-to-bottom height of the notice board!',
      icon: '📌'
    },
    {
      id: 'shadow',
      title: 'Cyrus\'s Ground Shadow',
      badge: 'Workbook p. 64 Q4a',
      rulesCount: 2,
      orientation: 'horizontal',
      objectRatio: 0.74, // ~1.48 m vs 2 rules
      targetMetres: 2,
      sentenceBefore: 'Cyrus\'s shadow is',
      sentenceAfter: '2 m long.',
      answer: 'less than',
      tip: 'Cyrus\'s shadow ends halfway along the 2nd metre rule, so it is less than 2 m long.',
      icon: '🧢'
    },
    {
      id: 'pond',
      title: 'Frog & Lily Pond',
      badge: 'Workbook p. 64 Q4b',
      rulesCount: 4,
      orientation: 'horizontal',
      objectRatio: 1.0,
      targetMetres: 4,
      sentenceBefore: 'The pond is',
      sentenceAfter: '4 m long.',
      answer: 'about',
      tip: 'Four 1-metre rules placed end-to-end match the full width of the pond!',
      icon: '🐸'
    },
    {
      id: 'clock',
      title: 'Grandfather Clock',
      badge: 'Workbook p. 64 Q4c',
      rulesCount: 1,
      orientation: 'vertical',
      objectRatio: 1.85,
      targetMetres: 1,
      sentenceBefore: 'The grandfather clock is',
      sentenceAfter: '1 m tall.',
      answer: 'more than',
      tip: 'The tall grandfather clock towers high above the single 1-metre rule!',
      icon: '🕰️'
    }
  ];

  const UNIT_SORTER_ITEMS = [
    { id: 'u1', icon: '🐱', badge: 'WS 1 Q5a', before: 'A cat can jump to a height of about 50', after: 'high.', answer: 'cm', explain: '50 m would be taller than a 15-storey building! 50 cm is half a metre.' },
    { id: 'u2', icon: '🏃', badge: 'WS 1 Q5b', before: 'Cyrus runs around a park path that is 100', after: 'long.', answer: 'm', explain: '100 cm is only 1 step (1 metre). A running track path is 100 m!' },
    { id: 'u3', icon: '📘', badge: 'WS 1 Q5c', before: 'A storybook is 11', after: 'wide.', answer: 'cm', explain: 'A book fits on your ruler — 11 cm is about 11 finger-widths.' },
    { id: 'u4', icon: '🚢', badge: 'WS 1 Q5d', before: 'A large ocean ship is 40', after: 'long.', answer: 'm', explain: 'Ships are huge! 40 m is 40 metre sticks long.' },
    { id: 'u5', icon: '✏️', badge: 'Textbook p. 88', before: 'Ada\'s red pencil is 15', after: 'long.', answer: 'cm', explain: 'A full pencil matches a 15 cm school ruler!' },
    { id: 'u6', icon: '✈️', badge: 'Textbook p. 89', before: 'Aeroplane C at the airport is 60', after: 'long.', answer: 'm', explain: 'An aeroplane carries many passengers and is 60 metres long!' },
    { id: 'u7', icon: '🪥', badge: 'WS 3 Q2', before: 'A bathroom toothbrush is 11', after: 'long.', answer: 'cm', explain: 'Small hand-held items are measured in centimetres (cm).' },
    { id: 'u8', icon: '🦒', badge: 'WS 3 Q3', before: 'Tall Giraffe E at the zoo is 6', after: 'tall.', answer: 'm', explain: 'Giraffes are taller than trees and houses — 6 metres tall!' }
  ];

  /* ==========================================================================
     4. TAB 3 DATASETS — RULER DRAWING & MOMO'S CHEESE PATH
     ========================================================================== */
  const DRAW_CHALLENGES = [
    {
      id: 'tb_11',
      title: 'Challenge 1: Draw an 11 cm Line',
      badge: 'Textbook p. 88',
      instruction: 'Start at the 0 cm mark on the ruler and drag your pencil straight across to 11 cm!',
      requiredStart: 0,
      targetLength: 11,
      hint: 'Place your pencil on 0 and stop right on 11 (11 − 0 = 11 cm).'
    },
    {
      id: 'tb_dive',
      title: 'Challenge 2: Dive Deeper! Start from 2 cm',
      badge: 'Textbook p. 88 Dive deeper!',
      instruction: 'If we start drawing an 11 cm line from the 2 cm mark, where must we stop? Draw it!',
      requiredStart: 2,
      targetLength: 11,
      hint: 'Start at 2 cm and add 11 cm: 2 + 11 = 13 cm!'
    },
    {
      id: 'ws2_9',
      title: 'Challenge 3: A Straight Line 9 cm Long',
      badge: 'Workbook p. 65 Q1a',
      instruction: 'Draw a straight line that is 9 cm long (starting at 0 cm is easiest!).',
      requiredStart: null, // any valid start allowed!
      targetLength: 9,
      hint: 'Try starting at 0 cm and stopping at 9 cm (or any pair where End − Start = 9).'
    },
    {
      id: 'ws2_12',
      title: 'Challenge 4: 3 cm Longer Than 9 cm!',
      badge: 'Workbook p. 65 Q1b',
      instruction: 'Draw a straight line that is 3 cm longer than the 9 cm line above!',
      requiredStart: null,
      targetLength: 12,
      hint: '9 cm + 3 cm = 12 cm! Start at 0 cm and draw all the way to 12 cm.'
    }
  ];

  // Coordinates in cm-grid space (0..15 cm wide, 0..7 cm tall; 1 cm = 44 px)
  // Segment D -> E goes from (6, 5.6) to (10, 5.6) => exact horizontal 4 cm!
  const MOMO_PATH = {
    badge: 'Workbook p. 65 Q2',
    dots: [
      { label: 'A', xCm: 1.5, yCm: 3.6 },
      { label: 'B', xCm: 3.5, yCm: 5.0 },
      { label: 'C', xCm: 4.2, yCm: 1.5 },
      { label: 'D', xCm: 6.0, yCm: 5.6 },
      { label: 'E', xCm: 10.0, yCm: 5.6 },
      { label: 'F', xCm: 9.0, yCm: 3.1 },
      { label: 'G', xCm: 11.2, yCm: 1.3 },
      { label: 'H', xCm: 13.5, yCm: 3.3 }
    ],
    deLengthCm: 4
  };

  /* ==========================================================================
     5. TAB 4 DATASETS — COMPARING LENGTHS (0 cm, NON-ZERO, VERTICAL, METRES)
     ========================================================================== */
  const COMPARE_SCENES = {
    aligned: {
      badge: 'Textbook pp. 88–89 & WS 3 Q1',
      pencils: [
        { name: 'Ada\'s pencil', owner: 'Ada', color: '#EF4444', svgId: 'pencil_red', start: 0, end: 15 },
        { name: 'Cyrus\'s pencil', owner: 'Cyrus', color: '#22C55E', svgId: 'pencil_green', start: 0, end: 14 },
        { name: 'Vera\'s pencil', owner: 'Vera', color: '#3B82F6', svgId: 'pencil_blue', start: 0, end: 9 }
      ],
      wsItems: [
        { name: 'hair clip', svgId: 'hair_clip', start: 0, end: 4 },
        { name: 'clothes peg', svgId: 'clothes_peg', start: 0, end: 6 },
        { name: 'spoon', svgId: 'spoon', start: 0, end: 12 },
        { name: 'straw', svgId: 'straw', start: 0, end: 15 }
      ]
    },
    flowers: {
      badge: 'Textbook p. 89 Dive deeper!',
      items: [
        { id: 'tulip', name: 'Tulip', topCm: 2, bottomCm: 16, length: 14, color: '#FB923C' },
        { id: 'rose', name: 'Rose', topCm: 10, bottomCm: 19, length: 9, color: '#E11D48' },
        { id: 'daisy', name: 'Daisy', topCm: 1, bottomCm: 12, length: 11, color: '#FACC15' }
      ]
    },
    bathroom: {
      badge: 'Workbook p. 66 Q2',
      items: [
        { id: 'comb', name: 'comb', svgId: 'comb', start: 0, end: 15, length: 15 },
        { id: 'toothbrush', name: 'toothbrush', svgId: 'toothbrush', start: 2, end: 13, length: 11 },
        { id: 'nail clipper', name: 'nail clipper', svgId: 'clipper_purple', start: 5, end: 10, length: 5 },
        { id: 'soap', name: 'bar of soap', svgId: 'soap', start: 6, end: 14, length: 8 }
      ]
    },
    giraffes: {
      badge: 'Textbook p. 89 & Workbook p. 67 Q3',
      planes: [
        { id: 'A', name: 'Aeroplane A', length: 50, color: '#22C55E' },
        { id: 'B', name: 'Aeroplane B', length: 40, color: '#3B82F6' },
        { id: 'C', name: 'Aeroplane C', length: 60, color: '#EF4444' }
      ],
      herd: [
        { id: 'A', height: 3 },
        { id: 'B', height: 5 },
        { id: 'C', height: 4 },
        { id: 'D', height: 3 },
        { id: 'E', height: 6 }
      ]
    }
  };

  /* ==========================================================================
     6. TAB 5 — 4 GRADED MASTERY QUIZ LEVELS (20 QUESTIONS)
     ========================================================================== */
  const QUIZ_LEVELS = {
    1: {
      title: 'Level 1: Centimetre Ruler Basics',
      questions: [
        {
          prompt: 'Momo wants to measure an eraser accurately on a cm ruler. Where should Momo place the left end of the eraser?',
          visual: 'ruler_zero_tip',
          options: ['At the 0 cm mark', 'At the left plastic edge of the ruler', 'At the 1 cm mark', 'At the 15 cm mark'],
          correct: 0,
          explain: 'Always align one end at the 0 cm mark — the plastic space before 0 is not part of the scale!'
        },
        {
          prompt: 'Which everyday benchmark has a width of about 1 cm?',
          visual: 'finger_bench',
          options: ['Your index finger', 'A classroom door', 'A whiteboard', 'A school bus'],
          correct: 0,
          explain: 'Tim reminds us that the width of our finger is about 1 cm!'
        },
        {
          prompt: 'A green pencil starts at 0 cm and its sharp tip ends right at 12 cm. How long is the pencil?',
          visual: 'pencil_0_12',
          options: ['12 cm', '11 cm', '13 cm', '15 cm'],
          correct: 0,
          explain: 'Because it starts at 0 cm, the reading at the other end (12 cm) is its exact length!'
        },
        {
          prompt: 'An orange highlighter starts at 0 cm and stops halfway between 8 cm and 9 cm. How do we describe its length?',
          visual: 'highlighter_8_9',
          options: [
            'More than 8 cm and less than 9 cm',
            'Exactly 8 cm',
            'More than 9 cm and less than 10 cm',
            'About 15 cm'
          ],
          correct: 0,
          explain: 'Since the tip is past 8 cm but has not reached 9 cm, it is more than 8 cm and less than 9 cm.'
        },
        {
          prompt: 'Why did measuring a tray with handspans give 5, while pins gave 4?',
          visual: 'non_standard',
          options: [
            'Different-sized objects give different counts, so we use standard cm!',
            'The tray changed its length',
            'Rulers cannot measure trays',
            'Handspans are longer than metres'
          ],
          correct: 0,
          explain: 'Non-standard objects have different sizes. Standard units like cm give everyone the same accurate answer!'
        }
      ]
    },
    2: {
      title: 'Level 2: Non-Zero Starts, Faulty Rulers & Curves',
      questions: [
        {
          prompt: 'A stapler is placed on a ruler with its left end at 7 cm and right end at 14 cm. How long is the stapler?',
          visual: 'stapler_7_14',
          options: ['7 cm', '14 cm', '21 cm', '8 cm'],
          correct: 0,
          explain: 'Subtract the smaller reading from the larger reading: 14 cm − 7 cm = 7 cm!'
        },
        {
          prompt: 'An AA battery sits from the 5 cm mark to the 10 cm mark on a ruler. What is its length?',
          visual: 'battery_5_10',
          options: ['5 cm', '10 cm', '15 cm', '4 cm'],
          correct: 0,
          explain: '10 cm − 5 cm = 5 cm. Counting on from 5 to 10 takes 5 hops of 1 cm!'
        },
        {
          prompt: 'A faulty ruler reads: 0, 1, 2, 3, 4, 7, 6, 7, 8... What number should replace the first 7?',
          visual: 'faulty_5',
          options: ['5', '6', '4', '8'],
          correct: 0,
          explain: 'A ruler is a number line counting by 1s: between 4 and 6 must be 5!'
        },
        {
          prompt: 'How can we accurately find the length of a curved wavy line using a straight wooden ruler?',
          visual: 'curved_string',
          options: [
            'Lay a string along the curve, cut it at the end, and straighten it on the ruler',
            'Only measure the straight gap from start to finish',
            'Bend the wooden ruler until it curves',
            'Guess without any tools'
          ],
          correct: 0,
          explain: 'Laying a flexible string on the curve and straightening it on a ruler gives the true path length!'
        },
        {
          prompt: 'Ada wants to draw an 11 cm straight line, but she starts her pencil at the 2 cm mark. Where should she stop?',
          visual: 'draw_2_13',
          options: ['13 cm mark', '11 cm mark', '9 cm mark', '12 cm mark'],
          correct: 0,
          explain: 'Starting at 2 cm and drawing 11 cm forward reaches 2 + 11 = 13 cm!'
        }
      ]
    },
    3: {
      title: 'Level 3: Metres (m) & Choosing Units',
      questions: [
        {
          prompt: 'Which classroom benchmark has a height of about 1 metre (1 m) from the floor?',
          visual: 'door_1m',
          options: ['The doorknob on a classroom door', 'The width of a finger', 'A small eraser', 'A tall skyscraper'],
          correct: 0,
          explain: 'From the floor to the doorknob is about 1 m!'
        },
        {
          prompt: 'Two 1-metre rules placed end-to-end along Class 2A\'s notice board stop short before the right edge. The notice board is ___ 2 m long.',
          visual: 'notice_more_2m',
          options: ['more than', 'less than', 'about', 'shorter than'],
          correct: 0,
          explain: 'Because the board extends past the 2 metre rules, its length is more than 2 m!'
        },
        {
          prompt: 'Cyrus runs around a park path that is 100 ___ long. Which unit fits best?',
          visual: 'unit_run',
          options: ['m', 'cm', 'mm', 'handspans'],
          correct: 0,
          explain: '100 m is a great running distance! 100 cm would only be 1 single metre.'
        },
        {
          prompt: 'A cat jumps onto a bench about 50 ___ high, while a large ship is 40 ___ long.',
          visual: 'unit_cat_ship',
          options: ['cm and m', 'm and cm', 'cm and cm', 'm and m'],
          correct: 0,
          explain: 'A cat jumps about 50 cm (half a metre), while a big ship is 40 m long!'
        },
        {
          prompt: 'Cyrus\'s shadow stops halfway along the second 1-metre rule. His shadow is ___ 2 m long.',
          visual: 'shadow_less_2m',
          options: ['less than', 'more than', 'about', 'equal to'],
          correct: 0,
          explain: 'Since the shadow ends well before the end of the 2nd metre stick, it is less than 2 m long.'
        }
      ]
    },
    4: {
      title: 'Level 4: Comparing Lengths & Tall Giraffes',
      questions: [
        {
          prompt: 'Ada\'s pencil is 15 cm, Cyrus\'s is 14 cm, and Vera\'s is 9 cm. How much shorter is Vera\'s pencil than Ada\'s?',
          visual: 'pencils_compare',
          options: ['6 cm', '5 cm', '1 cm', '9 cm'],
          correct: 0,
          explain: 'Subtract Vera\'s length from Ada\'s length: 15 cm − 9 cm = 6 cm!'
        },
        {
          prompt: 'On a vertical ruler, a Tulip spans 2 cm to 16 cm, and a Daisy spans 1 cm to 12 cm. Which flower is taller and by how much?',
          visual: 'flowers_compare',
          options: [
            'Tulip is 3 cm taller (14 cm vs 11 cm)',
            'Tulip is 4 cm taller (16 cm vs 12 cm)',
            'Daisy is 1 cm taller',
            'They have the same height'
          ],
          correct: 0,
          explain: 'Find each height first! Tulip = 16 − 2 = 14 cm; Daisy = 12 − 1 = 11 cm. 14 − 11 = 3 cm!'
        },
        {
          prompt: 'A toothbrush sits from 2 cm to 13 cm, and a bar of soap sits from 6 cm to 14 cm. How much shorter is the soap than the toothbrush?',
          visual: 'soap_tooth',
          options: ['3 cm', '1 cm', '4 cm', '8 cm'],
          correct: 0,
          explain: 'Toothbrush = 13 − 2 = 11 cm. Soap = 14 − 6 = 8 cm. Even though soap ends at 14, 11 − 8 = 3 cm!'
        },
        {
          prompt: 'Aeroplane A is 50 m, Aeroplane B is 40 m, and Aeroplane C is 60 m. Aeroplane C is ___ m longer than Aeroplane B.',
          visual: 'planes_compare',
          options: ['20 m', '10 m', '30 m', '40 m'],
          correct: 0,
          explain: '60 m − 40 m = 20 m!'
        },
        {
          prompt: 'Giraffe A is 3 m, Giraffe C is 4 m, Giraffe D is 3 m, and Giraffe E is 6 m. Giraffe E is as tall as the total heights of which two giraffes?',
          visual: 'giraffes_sum',
          options: ['Giraffe A and Giraffe D', 'Giraffe A and Giraffe C', 'Giraffe C and Giraffe D', 'Giraffe A and Giraffe E'],
          correct: 0,
          explain: 'Giraffe A (3 m) + Giraffe D (3 m) = 6 m, which equals Giraffe E (6 m)!'
        }
      ]
    }
  };

  window.LengthData = {
    getObjectSvg,
    CM_ITEMS,
    FAULTY_RULER,
    CURVED_LINES,
    METRE_SCENES,
    UNIT_SORTER_ITEMS,
    DRAW_CHALLENGES,
    MOMO_PATH,
    COMPARE_SCENES,
    QUIZ_LEVELS
  };
})();
