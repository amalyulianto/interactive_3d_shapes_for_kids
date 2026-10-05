/**
 * 3D Solid Shapes Adventure - Vector Illustration Library
 * High-quality, geometrically accurate 3D vector SVGs for all 9 solids and real-world objects.
 */

// Helper to render SVG illustrations for face 2D shapes
function getFaceShapeSvg(shapeType, color = '#6366F1') {
  switch (shapeType) {
    case 'square':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><rect x="4" y="4" width="28" height="28" rx="4" fill="${color}" stroke="#1E293B" stroke-width="2.5"/></svg>`;
    case 'rect':
      return `<svg viewBox="0 0 44 32" class="face-shape-svg" aria-hidden="true"><rect x="3" y="5" width="38" height="22" rx="3" fill="${color}" stroke="#1E293B" stroke-width="2.5"/></svg>`;
    case 'circle':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><circle cx="18" cy="18" r="14" fill="${color}" stroke="#1E293B" stroke-width="2.5"/></svg>`;
    case 'triangle':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><polygon points="18,4 4,32 32,32" fill="${color}" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
    case 'hexagon':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><polygon points="18,4 30,11 30,25 18,32 6,25 6,11" fill="${color}" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
    case 'curved_cylinder':
      return `<svg viewBox="0 0 40 36" class="face-shape-svg" aria-hidden="true"><ellipse cx="20" cy="9" rx="13" ry="5" fill="${color}" stroke="#1E293B" stroke-width="2"/><path d="M 7,9 L 7,27 C 7,30 33,30 33,27 L 33,9" fill="${color}" stroke="#1E293B" stroke-width="2" opacity="0.85"/></svg>`;
    case 'curved_cone':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><path d="M 18,4 L 5,28 C 11,33 25,33 31,28 Z" fill="${color}" stroke="#1E293B" stroke-width="2"/></svg>`;
    case 'sphere_surf':
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><circle cx="18" cy="18" r="14" fill="${color}" stroke="#1E293B" stroke-width="2.5"/><ellipse cx="18" cy="18" rx="14" ry="5" fill="none" stroke="#FFFFFF" stroke-dasharray="3,3" stroke-width="2"/></svg>`;
    default:
      return `<svg viewBox="0 0 36 36" class="face-shape-svg" aria-hidden="true"><rect x="4" y="4" width="28" height="28" rx="4" fill="${color}" stroke="#1E293B" stroke-width="2"/></svg>`;
  }
}

// Dedicated 3D vector SVG illustrations library
function getShapeOrObjectSvg(rawId, size = 52) {
  if (!rawId) return '';

  const idMap = {
    // Emojis to IDs
    '🎲': 'dice', '⚽': 'soccer', '🥫': 'soda', '🎉': 'partyhat', '⛺': 'tent',
    '🧱': 'brick', '🏛️': 'square_pyramid', '🔺': 'triangular_pyramid', '🧃': 'juice',
    '🚧': 'traffic_cone', '✏️': 'pencil', '🧩': 'rubiks', '🏜️': 'giza', '🍵': 'teabag',
    '🍦': 'waffle_cone', '🏀': 'bball', '🔮': 'marble', '🥁': 'drum', '🍊': 'orange',
    '🔲': 'flat_only', '🔵': 'curved_only', '🔄': 'both_surfaces', '✨': 'pointy',
    '🌊': 'smooth', '🌀': 'roll', '🧊': 'icecube', '🎁': 'giftbox', '📚': 'book',
    '🧽': 'eraser', '🧻': 'roll_paper', '🔋': 'battery', '🌍': 'globe', '🏠': 'roof',
    '🍫': 'toblerone', '🧀': 'cheese', '🛖': 'teepee', '🏮': 'lantern', '🔩': 'hexnut',
    '🍯': 'honeycomb',

    // Sorter / Quiz item aliases
    'cube_item': 'dice', 'dice_v': 'dice', 'dice_rw': 'dice',
    'rubiks_item': 'rubiks', 'rubiks_v': 'rubiks', 'rubiks_rw': 'rubiks',
    'icecube_rw': 'icecube', 'giftbox_rw': 'giftbox',
    'juice_item': 'juice', 'juice_v': 'juice', 'juice_rw': 'juice',
    'brick_item': 'brick', 'brick_v': 'brick', 'brick_rw': 'brick',
    'book_rw': 'book', 'eraser_rw': 'eraser',
    'soda_item': 'soda', 'soda_v': 'soda', 'soda_rw': 'soda',
    'drum_item': 'drum', 'drum_v': 'drum', 'drum_rw': 'drum',
    'roll_rw': 'roll_paper', 'battery_rw': 'battery',
    'traffic_item': 'traffic_cone', 'cone_v': 'traffic_cone', 'traffic_rw': 'traffic_cone',
    'hat_item': 'partyhat', 'hat_v': 'partyhat', 'partyhat_rw': 'partyhat',
    'waffle_item': 'waffle_cone', 'waffle_rw': 'waffle_cone',
    'soccer_item': 'soccer', 'soccer_v': 'soccer', 'soccer_rw': 'soccer',
    'bball_v': 'bball', 'bball_rw': 'bball',
    'orange_item': 'orange', 'orange_v': 'orange', 'orange_rw': 'orange',
    'globe_rw': 'globe',
    'tent_item': 'tent', 'tent_v': 'tent', 'tent_p': 'tent',
    'roof_p': 'roof', 'toblerone_p': 'toblerone', 'cheese_p': 'cheese',
    'giza_item': 'giza', 'giza_v': 'giza', 'giza_p': 'giza',
    'teepee_p': 'teepee', 'lantern_p': 'lantern',
    'teabag_item': 'teabag', 'tea_v': 'teabag', 'teabag_p': 'teabag',
    'pyraminx_p': 'pyraminx', 'die4_p': 'die4',
    'pencil_item': 'pencil', 'pencil_v': 'pencil', 'pencil_p': 'pencil',
    'hexnut_p': 'hexnut', 'honeycomb_p': 'honeycomb',

    // Basket category aliases
    'tri_prism': 'triangular_prism',
    'square_pyr': 'square_pyramid',
    'tri_pyr': 'triangular_pyramid',
    'hex_prism': 'hexagonal_prism'
  };

  const key = idMap[rawId] || rawId;
  const svgOpen = `<svg viewBox="0 0 64 64" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;">`;
  const svgClose = `</svg>`;

  switch (key) {
    // ---- 9 SOLIDS (FROM 3D EXPLORER) ----
    case 'cube':
      return `${svgOpen}
        <polygon points="32,8 54,20 32,32 10,20" fill="#818CF8" stroke="#312E81" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="10,20 32,32 32,56 10,44" fill="#6366F1" stroke="#312E81" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,32 54,20 54,44 32,56" fill="#4338CA" stroke="#312E81" stroke-width="1.5" stroke-linejoin="round"/>
      ${svgClose}`;

    case 'cuboid':
      return `${svgOpen}
        <polygon points="26,10 56,18 38,26 8,18" fill="#F472B6" stroke="#831843" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="8,18 38,26 38,56 8,48" fill="#EC4899" stroke="#831843" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="38,26 56,18 56,48 38,56" fill="#BE185D" stroke="#831843" stroke-width="1.5" stroke-linejoin="round"/>
      ${svgClose}`;

    case 'cylinder':
      return `${svgOpen}
        <path d="M14,18 L14,46 C14,52 22,56 32,56 C42,56 50,52 50,46 L50,18 Z" fill="#10B981" stroke="#047857" stroke-width="1.5"/>
        <path d="M14,18 C14,24 22,27 32,27 C42,27 50,24 50,18" fill="#059669" opacity="0.3"/>
        <ellipse cx="32" cy="18" rx="18" ry="7.5" fill="#34D399" stroke="#047857" stroke-width="1.5"/>
        <path d="M14,46 C14,52 22,56 32,56 C42,56 50,52 50,46" fill="none" stroke="#047857" stroke-width="1.5"/>
      ${svgClose}`;

    case 'cone':
      return `${svgOpen}
        <path d="M12,48 L32,10 L52,48 C52,54.5 43,58 32,58 C21,58 12,54.5 12,48 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M32,10 L52,48 C52,54.5 43,58 32,58 Z" fill="#D97706" opacity="0.4"/>
        <ellipse cx="32" cy="48" rx="20" ry="7" fill="none" stroke="#B45309" stroke-width="1.2" stroke-dasharray="3 2"/>
      ${svgClose}`;

    case 'sphere':
      return `${svgOpen}
        <ellipse cx="32" cy="56" rx="18" ry="4" fill="rgba(15,23,42,0.18)"/>
        <circle cx="32" cy="31" r="23" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
        <circle cx="36" cy="35" r="17" fill="#1D4ED8" opacity="0.35"/>
        <circle cx="40" cy="39" r="11" fill="#1E3A8A" opacity="0.3"/>
        <ellipse cx="24" cy="22" rx="7" ry="4" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 24 22)"/>
        <circle cx="21" cy="20" r="2.5" fill="#FFFFFF" opacity="0.9"/>
      ${svgClose}`;

    case 'triangular_prism':
      return `${svgOpen}
        <polygon points="10,48 26,18 42,48" fill="#C084FC" stroke="#581C87" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="26,18 56,24 56,52 42,48" fill="#8B5CF6" stroke="#581C87" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="16,45 26,24 36,45" fill="#E9D5FF" opacity="0.4"/>
      ${svgClose}`;

    case 'square_pyramid':
      return `${svgOpen}
        <polygon points="32,10 8,46 32,54" fill="#2DD4BF" stroke="#042F2E" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,10 32,54 56,46" fill="#0D9488" stroke="#042F2E" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="8" y1="46" x2="32" y2="54" stroke="#115E59" stroke-width="2"/>
        <line x1="32" y1="54" x2="56" y2="46" stroke="#042F2E" stroke-width="2"/>
      ${svgClose}`;

    case 'triangular_pyramid':
      return `${svgOpen}
        <polygon points="12,46 34,54 54,42" fill="#BE123C" opacity="0.4"/>
        <polygon points="32,10 12,46 34,54" fill="#F472B6" stroke="#4C0519" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,10 34,54 54,42" fill="#E11D48" stroke="#4C0519" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="32" y1="10" x2="34" y2="54" stroke="#4C0519" stroke-width="1.5"/>
      ${svgClose}`;

    case 'hexagonal_prism':
      return `${svgOpen}
        <polygon points="32,10 48,15 48,25 32,30 16,25 16,15" fill="#FEF08A" stroke="#713F12" stroke-width="1.3" stroke-linejoin="round"/>
        <polygon points="16,25 32,30 32,54 16,49" fill="#EAB308" stroke="#713F12" stroke-width="1.3" stroke-linejoin="round"/>
        <polygon points="32,30 48,25 48,49 32,54" fill="#CA8A04" stroke="#713F12" stroke-width="1.3" stroke-linejoin="round"/>
      ${svgClose}`;

    // ---- REAL-WORLD OBJECTS ----
    case 'traffic_cone':
      return `${svgOpen}
        <polygon points="8,52 32,58 56,52 32,46" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="20,50 30,12 34,12 44,50" fill="#EA580C" stroke="#C2410C" stroke-width="1.2"/>
        <polygon points="32,12 34,12 44,50 32,51" fill="#C2410C" opacity="0.3"/>
        <polygon points="26,24 38,24 39,30 25,30" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="0.8"/>
        <polygon points="23,37 41,37 43,44 21,44" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="0.8"/>
      ${svgClose}`;

    case 'rubiks':
      return `${svgOpen}
        <polygon points="32,7 55,19 32,31 9,19" fill="#0F172A"/>
        <polygon points="9,19 32,31 32,57 9,45" fill="#0F172A"/>
        <polygon points="32,31 55,19 55,45 32,57" fill="#0F172A"/>
        <polygon points="32,9 38,12 32,15 26,12" fill="#F8FAFC"/>
        <polygon points="39,12.5 45,15.5 39,18.5 33,15.5" fill="#FEF08A"/>
        <polygon points="46,16 52,19 46,22 40,19" fill="#F8FAFC"/>
        <polygon points="25,12.5 31,15.5 25,18.5 19,15.5" fill="#FEF08A"/>
        <polygon points="32,16 38,19 32,22 26,19" fill="#FACC15"/>
        <polygon points="39,19.5 45,22.5 39,25.5 33,22.5" fill="#F8FAFC"/>
        <polygon points="18,16 24,19 18,22 12,19" fill="#F8FAFC"/>
        <polygon points="25,19.5 31,22.5 25,25.5 19,22.5" fill="#FEF08A"/>
        <polygon points="32,23 38,26 32,29 26,26" fill="#F8FAFC"/>
        <polygon points="11,21 17,24 17,31 11,28" fill="#3B82F6"/>
        <polygon points="18,24.5 24,27.5 24,34.5 18,31.5" fill="#10B981"/>
        <polygon points="25,28 31,31 31,38 25,35" fill="#3B82F6"/>
        <polygon points="11,30 17,33 17,40 11,37" fill="#10B981"/>
        <polygon points="18,33.5 24,36.5 24,43.5 18,40.5" fill="#2563EB"/>
        <polygon points="25,37 31,40 31,47 25,44" fill="#10B981"/>
        <polygon points="11,39 17,42 17,49 11,46" fill="#3B82F6"/>
        <polygon points="18,42.5 24,45.5 24,52.5 18,49.5" fill="#10B981"/>
        <polygon points="25,46 31,49 31,56 25,53" fill="#1D4ED8"/>
        <polygon points="33,31 39,28 39,35 33,38" fill="#EF4444"/>
        <polygon points="40,27.5 46,24.5 46,31.5 40,34.5" fill="#F97316"/>
        <polygon points="47,24 53,21 53,28 47,31" fill="#EF4444"/>
        <polygon points="33,40 39,37 39,44 33,47" fill="#F97316"/>
        <polygon points="40,36.5 46,33.5 46,40.5 40,43.5" fill="#DC2626"/>
        <polygon points="47,33 53,30 53,37 47,40" fill="#F97316"/>
        <polygon points="33,49 39,46 39,53 33,56" fill="#EF4444"/>
        <polygon points="40,45.5 46,42.5 46,49.5 40,52.5" fill="#F97316"/>
        <polygon points="47,42 53,39 53,46 47,49" fill="#B91C1C"/>
      ${svgClose}`;

    case 'waffle_cone':
      return `${svgOpen}
        <ellipse cx="32" cy="22" rx="15" ry="14" fill="#F472B6" stroke="#DB2777" stroke-width="1.5"/>
        <ellipse cx="28" cy="18" rx="4" ry="2" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="32" cy="8" r="4.5" fill="#DC2626" stroke="#991B1B" stroke-width="1"/>
        <path d="M32,8 Q35,2 39,4" fill="none" stroke="#15803D" stroke-width="1.5" stroke-linecap="round"/>
        <polygon points="18,26 46,26 32,58" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
        <line x1="22" y1="30" x2="40" y2="48" stroke="#B45309" stroke-width="1.2"/>
        <line x1="26" y1="26" x2="36" y2="52" stroke="#B45309" stroke-width="1.2"/>
        <line x1="42" y1="30" x2="24" y2="48" stroke="#B45309" stroke-width="1.2"/>
        <line x1="38" y1="26" x2="28" y2="52" stroke="#B45309" stroke-width="1.2"/>
      ${svgClose}`;

    case 'partyhat':
      return `${svgOpen}
        <path d="M14,52 L32,14 L50,52 C50,57 41,60 32,60 C23,60 14,57 14,52 Z" fill="#8B5CF6" stroke="#6D28D9" stroke-width="1.5"/>
        <circle cx="26" cy="42" r="3.5" fill="#FACC15"/>
        <circle cx="38" cy="45" r="3" fill="#38BDF8"/>
        <circle cx="32" cy="30" r="3" fill="#F43F5E"/>
        <circle cx="24" cy="50" r="2.5" fill="#34D399"/>
        <circle cx="32" cy="12" r="6" fill="#FBBF24" stroke="#F59E0B" stroke-width="1"/>
        <circle cx="32" cy="12" r="3" fill="#FEF08A"/>
      ${svgClose}`;

    case 'dice':
      return `${svgOpen}
        <polygon points="32,8 54,20 32,32 10,20" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="10,20 32,32 32,56 10,44" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,32 54,20 54,44 32,56" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="32" cy="20" r="3.5" fill="#EF4444"/>
        <circle cx="18" cy="29" r="2.5" fill="#1E293B"/>
        <circle cx="24" cy="45" r="2.5" fill="#1E293B"/>
        <circle cx="39" cy="47" r="2.5" fill="#1E293B"/>
        <circle cx="43" cy="38" r="2.5" fill="#1E293B"/>
        <circle cx="47" cy="29" r="2.5" fill="#1E293B"/>
      ${svgClose}`;

    case 'juice':
      return `${svgOpen}
        <path d="M26,16 L26,6 L18,8" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <polygon points="26,14 52,19 36,25 10,20" fill="#FDBA74" stroke="#C2410C" stroke-width="1.2"/>
        <polygon points="10,20 36,25 36,56 10,51" fill="#FB923C" stroke="#C2410C" stroke-width="1.2"/>
        <polygon points="36,25 52,19 52,50 36,56" fill="#EA580C" stroke="#C2410C" stroke-width="1.2"/>
        <circle cx="23" cy="38" r="6.5" fill="#FEF08A" stroke="#EA580C" stroke-width="1"/>
        <circle cx="23" cy="38" r="4.5" fill="#F97316"/>
      ${svgClose}`;

    case 'brick':
      return `${svgOpen}
        <polygon points="24,12 56,20 38,28 6,20" fill="#EF4444" stroke="#991B1B" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="6,20 38,28 38,52 6,44" fill="#DC2626" stroke="#991B1B" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="38,28 56,20 56,44 38,52" fill="#B91C1C" stroke="#991B1B" stroke-width="1.4" stroke-linejoin="round"/>
        <ellipse cx="18" cy="20" rx="3.5" ry="1.8" fill="#7F1D1D"/>
        <ellipse cx="31" cy="23.5" rx="3.5" ry="1.8" fill="#7F1D1D"/>
        <ellipse cx="44" cy="21.5" rx="3.5" ry="1.8" fill="#7F1D1D"/>
      ${svgClose}`;

    case 'soda':
      return `${svgOpen}
        <path d="M16,20 L16,48 C16,54 23,57 32,57 C41,57 48,54 48,48 L48,20 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5"/>
        <path d="M16,34 Q32,24 48,38 L48,44 Q32,30 16,40 Z" fill="#FFFFFF" opacity="0.9"/>
        <ellipse cx="32" cy="18" rx="16" ry="6.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="32" cy="18" rx="5" ry="2.5" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      ${svgClose}`;

    case 'drum':
      return `${svgOpen}
        <path d="M12,22 L12,46 C12,52 21,56 32,56 C43,56 52,42 52,46 L52,22 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
        <line x1="16" y1="23" x2="16" y2="48" stroke="#94A3B8" stroke-width="2"/>
        <line x1="26" y1="25" x2="26" y2="52" stroke="#94A3B8" stroke-width="2"/>
        <line x1="38" y1="25" x2="38" y2="52" stroke="#94A3B8" stroke-width="2"/>
        <line x1="48" y1="23" x2="48" y2="48" stroke="#94A3B8" stroke-width="2"/>
        <ellipse cx="32" cy="22" rx="20" ry="8" fill="#F8FAFC" stroke="#64748B" stroke-width="1.8"/>
        <line x1="14" y1="12" x2="36" y2="24" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="50" y1="12" x2="28" y2="24" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
      ${svgClose}`;

    case 'soccer':
      return `${svgOpen}
        <ellipse cx="32" cy="56" rx="18" ry="4" fill="rgba(15,23,42,0.18)"/>
        <circle cx="32" cy="32" r="22" fill="#F8FAFC" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="32,24 39,29 36,37 28,37 25,29" fill="#0F172A"/>
        <line x1="32" y1="24" x2="32" y2="10" stroke="#0F172A" stroke-width="1.5"/>
        <line x1="39" y1="29" x2="51" y2="23" stroke="#0F172A" stroke-width="1.5"/>
        <line x1="36" y1="37" x2="46" y2="46" stroke="#0F172A" stroke-width="1.5"/>
        <line x1="28" y1="37" x2="18" y2="46" stroke="#0F172A" stroke-width="1.5"/>
        <line x1="25" y1="29" x2="13" y2="23" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="32,10 26,11 38,11" fill="#0F172A"/>
        <polygon points="51,23 53,30 48,32" fill="#0F172A"/>
        <polygon points="13,23 11,30 16,32" fill="#0F172A"/>
      ${svgClose}`;

    case 'bball':
      return `${svgOpen}
        <ellipse cx="32" cy="56" rx="18" ry="4" fill="rgba(15,23,42,0.18)"/>
        <circle cx="32" cy="32" r="22" fill="#EA580C" stroke="#7C2D12" stroke-width="1.5"/>
        <line x1="10" y1="32" x2="54" y2="32" stroke="#431407" stroke-width="1.8"/>
        <line x1="32" y1="10" x2="32" y2="54" stroke="#431407" stroke-width="1.8"/>
        <path d="M16,16 Q28,32 16,48" fill="none" stroke="#431407" stroke-width="1.8"/>
        <path d="M48,16 Q36,32 48,48" fill="none" stroke="#431407" stroke-width="1.8"/>
      ${svgClose}`;

    case 'pencil':
      return `${svgOpen}
        <polygon points="26,8 38,8 38,14 26,14" fill="#FB7185" stroke="#E11D48" stroke-width="1"/>
        <polygon points="25,14 39,14 39,19 25,19" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
        <polygon points="25,19 29,19 29,45 25,45" fill="#FACC15" stroke="#A16207" stroke-width="0.8"/>
        <polygon points="29,19 35,19 35,45 29,45" fill="#EAB308" stroke="#A16207" stroke-width="0.8"/>
        <polygon points="35,19 39,19 39,45 35,45" fill="#CA8A04" stroke="#A16207" stroke-width="0.8"/>
        <polygon points="25,45 39,45 32,56" fill="#FDE68A" stroke="#A16207" stroke-width="1"/>
        <polygon points="30,52 34,52 32,56" fill="#1E293B"/>
      ${svgClose}`;

    case 'giza':
      return `${svgOpen}
        <path d="M4,54 Q20,48 38,52 Q52,56 60,52 L60,60 L4,60 Z" fill="#D97706"/>
        <circle cx="50" cy="14" r="6" fill="#FBBF24"/>
        <polygon points="30,14 6,48 32,54" fill="#FDE047" stroke="#B45309" stroke-width="1.3" stroke-linejoin="round"/>
        <line x1="22" y1="26" x2="30.5" y2="28" stroke="#CA8A04" stroke-width="1"/>
        <line x1="14" y1="37" x2="31.2" y2="41" stroke="#CA8A04" stroke-width="1"/>
        <polygon points="30,14 32,54 58,46" fill="#D97706" stroke="#92400E" stroke-width="1.3" stroke-linejoin="round"/>
        <line x1="31" y1="28" x2="49" y2="25" stroke="#92400E" stroke-width="1"/>
        <line x1="31.5" y1="41" x2="54" y2="38" stroke="#92400E" stroke-width="1"/>
      ${svgClose}`;

    case 'teabag':
      return `${svgOpen}
        <path d="M32,18 C26,10 16,12 14,18" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
        <polygon points="10,18 18,18 18,25 10,25" fill="#EF4444" stroke="#B91C1C" stroke-width="1"/>
        <polygon points="32,18 12,48 34,55" fill="#F1F5F9" fill-opacity="0.85" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,18 34,55 54,44" fill="#E2E8F0" fill-opacity="0.75" stroke="#94A3B8" stroke-width="1.5" stroke-linejoin="round"/>
        <ellipse cx="28" cy="46" rx="9" ry="5" fill="#78350F" opacity="0.85"/>
        <circle cx="24" cy="44" r="2" fill="#451A03"/>
        <circle cx="30" cy="48" r="1.5" fill="#451A03"/>
        <circle cx="35" cy="45" r="2" fill="#451A03"/>
      ${svgClose}`;

    case 'tent':
      return `${svgOpen}
        <polygon points="6,52 38,56 58,48 24,44" fill="rgba(15,23,42,0.15)"/>
        <polygon points="22,18 56,24 54,48 38,52" fill="#059669" stroke="#047857" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="8,48 22,18 38,52" fill="#10B981" stroke="#047857" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="14,48 22,24 30,50" fill="#047857"/>
        <line x1="22" y1="24" x2="22" y2="49" stroke="#FACC15" stroke-width="1.5"/>
      ${svgClose}`;

    case 'roof':
      return `${svgOpen}
        <polygon points="42,14 48,16 48,24 42,22" fill="#B91C1C" stroke="#7F1D1D" stroke-width="1"/>
        <polygon points="20,18 56,22 56,44 38,48" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="6,44 20,18 38,48" fill="#F87171" stroke="#991B1B" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="26" y1="28" x2="56" y2="31" stroke="#7F1D1D" stroke-width="1"/>
        <line x1="32" y1="38" x2="56" y2="40" stroke="#7F1D1D" stroke-width="1"/>
      ${svgClose}`;

    case 'toblerone':
      return `${svgOpen}
        <polygon points="22,18 56,22 56,46 38,50" fill="#FBBF24" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="8,46 22,18 38,50" fill="#FDE047" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="18,42 22,32 26,42" fill="#78350F"/>
        <text x="24" y="38" font-size="7" font-weight="900" fill="#78350F" transform="rotate(7 24 38)">T</text>
      ${svgClose}`;

    case 'cheese':
      return `${svgOpen}
        <polygon points="18,18 56,22 56,44 36,48" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="8,44 18,18 36,48" fill="#FDE047" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/>
        <ellipse cx="26" cy="38" rx="4" ry="3" fill="#D97706"/>
        <ellipse cx="16" cy="36" rx="2.5" ry="2" fill="#D97706"/>
        <ellipse cx="42" cy="32" rx="3" ry="2" fill="#B45309"/>
      ${svgClose}`;

    case 'teepee':
      return `${svgOpen}
        <line x1="26" y1="6" x2="38" y2="24" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="38" y1="6" x2="26" y2="24" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="32" y1="5" x2="32" y2="24" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="32,18 10,54 32,58" fill="#FED7AA" stroke="#C2410C" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,18 32,58 54,54" fill="#FDBA74" stroke="#C2410C" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="26,57 32,42 38,57" fill="#7C2D12"/>
      ${svgClose}`;

    case 'lantern':
      return `${svgOpen}
        <circle cx="32" cy="10" r="3.5" fill="#EAB308" stroke="#A16207" stroke-width="1.2"/>
        <polygon points="32,14 8,40 32,46" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,14 32,46 56,40" fill="#B91C1C" stroke="#991B1B" stroke-width="1.5" stroke-linejoin="round"/>
        <rect x="22" y="44" width="20" height="14" rx="2" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2"/>
      ${svgClose}`;

    case 'pyraminx':
      return `${svgOpen}
        <polygon points="32,10 12,46 34,54" fill="#0F172A"/>
        <polygon points="32,13 26,24 32,24" fill="#EF4444"/>
        <polygon points="25,26 19,37 25,37" fill="#EF4444"/>
        <polygon points="32,26 26,37 32,37" fill="#EF4444"/>
        <polygon points="18,39 13,48 22,50" fill="#EF4444"/>
        <polygon points="32,10 34,54 54,42" fill="#0F172A"/>
        <polygon points="34,13 34,24 41,21" fill="#3B82F6"/>
        <polygon points="34,26 34,37 41,34" fill="#3B82F6"/>
        <polygon points="42,23 42,34 49,31" fill="#3B82F6"/>
        <polygon points="34,39 34,51 44,46" fill="#3B82F6"/>
      ${svgClose}`;

    case 'die4':
      return `${svgOpen}
        <polygon points="32,10 12,46 34,54" fill="#7C3AED" stroke="#4C1D95" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,10 34,54 54,42" fill="#6D28D9" stroke="#4C1D95" stroke-width="1.5" stroke-linejoin="round"/>
        <text x="24" y="38" font-size="9" font-weight="900" fill="#FDE047" text-anchor="middle">4</text>
        <text x="40" y="36" font-size="9" font-weight="900" fill="#FDE047" text-anchor="middle">1</text>
      ${svgClose}`;

    case 'hexnut':
      return `${svgOpen}
        <polygon points="32,12 48,17 48,27 32,32 16,27 16,17" fill="#CBD5E1" stroke="#475569" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="16,27 32,32 32,52 16,47" fill="#94A3B8" stroke="#475569" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="32,32 48,27 48,47 32,52" fill="#64748B" stroke="#475569" stroke-width="1.4" stroke-linejoin="round"/>
        <ellipse cx="32" cy="22" rx="7" ry="3.5" fill="#334155" stroke="#1E293B" stroke-width="1.2"/>
      ${svgClose}`;

    case 'honeycomb':
      return `${svgOpen}
        <polygon points="32,10 48,15 48,25 32,30 16,25 16,15" fill="#FACC15" stroke="#B45309" stroke-width="1.3"/>
        <polygon points="16,25 32,30 32,54 16,49" fill="#EAB308" stroke="#B45309" stroke-width="1.3"/>
        <polygon points="32,30 48,25 48,49 32,54" fill="#CA8A04" stroke="#B45309" stroke-width="1.3"/>
        <ellipse cx="32" cy="20" rx="8" ry="4" fill="#D97706"/>
        <ellipse cx="30" cy="19" rx="3" ry="1.5" fill="#FEF08A" opacity="0.8"/>
      ${svgClose}`;

    case 'marble':
      return `${svgOpen}
        <ellipse cx="32" cy="56" rx="18" ry="4" fill="rgba(15,23,42,0.18)"/>
        <circle cx="32" cy="32" r="22" fill="#0284C7" stroke="#0369A1" stroke-width="1.5"/>
        <path d="M18,22 Q32,42 46,26" fill="none" stroke="#FACC15" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M22,40 Q32,18 42,38" fill="none" stroke="#F43F5E" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="24" cy="22" rx="6" ry="3" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 24 22)"/>
      ${svgClose}`;

    case 'orange':
      return `${svgOpen}
        <ellipse cx="32" cy="56" rx="18" ry="4" fill="rgba(15,23,42,0.18)"/>
        <circle cx="32" cy="34" r="21" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>
        <circle cx="26" cy="26" r="14" fill="#FB923C" opacity="0.6"/>
        <path d="M32,14 Q32,8 34,6" fill="none" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M33,10 Q42,6 44,14 Q36,16 33,10 Z" fill="#22C55E" stroke="#15803D" stroke-width="1"/>
      ${svgClose}`;

    case 'globe':
      return `${svgOpen}
        <ellipse cx="32" cy="58" rx="14" ry="4" fill="#94A3B8" stroke="#475569" stroke-width="1.2"/>
        <line x1="32" y1="58" x2="32" y2="48" stroke="#64748B" stroke-width="3"/>
        <path d="M14,28 A20,20 0 0,0 32,48" fill="none" stroke="#64748B" stroke-width="2.5"/>
        <circle cx="32" cy="26" r="17" fill="#38BDF8" stroke="#0284C7" stroke-width="1.3"/>
        <path d="M24,20 Q30,16 34,22 Q30,28 26,24 Z" fill="#22C55E"/>
        <path d="M36,26 Q42,24 40,32 Q34,34 36,26 Z" fill="#22C55E"/>
      ${svgClose}`;

    case 'book':
      return `${svgOpen}
        <polygon points="20,12 56,18 42,28 6,22" fill="#2563EB" stroke="#1E40AF" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="6,22 42,28 42,34 6,28" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
        <polygon points="42,28 56,18 56,44 42,52" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
        <polygon points="6,28 42,34 42,54 6,48" fill="#1D4ED8" stroke="#1E40AF" stroke-width="1.4"/>
        <polygon points="6,22 6,48 4,46 4,20" fill="#1E3A8A"/>
      ${svgClose}`;

    case 'eraser':
      return `${svgOpen}
        <polygon points="22,14 56,20 40,28 6,22" fill="#D97706" stroke="#92400E" stroke-width="1.3" stroke-linejoin="round"/>
        <polygon points="6,22 40,28 40,38 6,32" fill="#B45309" stroke="#92400E" stroke-width="1.3" stroke-linejoin="round"/>
        <polygon points="40,28 56,20 56,30 40,38" fill="#92400E" stroke="#78350F" stroke-width="1.3" stroke-linejoin="round"/>
        <polygon points="6,32 40,38 40,48 6,42" fill="#334155" stroke="#1E293B" stroke-width="1.2"/>
        <polygon points="40,38 56,30 56,40 40,48" fill="#1E293B" stroke="#0F172A" stroke-width="1.2"/>
      ${svgClose}`;

    case 'roll_paper':
      return `${svgOpen}
        <path d="M16,18 L16,48 C16,54 23,57 32,57 C41,57 48,54 48,48 L48,18 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
        <ellipse cx="32" cy="18" rx="16" ry="6.5" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <ellipse cx="32" cy="18" rx="6" ry="2.5" fill="#78350F" stroke="#451A03" stroke-width="1"/>
      ${svgClose}`;

    case 'battery':
      return `${svgOpen}
        <ellipse cx="32" cy="10" rx="5" ry="2" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
        <rect x="27" y="10" width="10" height="4" fill="#CBD5E1"/>
        <path d="M18,14 L18,28 C18,32 24,34 32,34 C40,34 46,32 46,28 L46,14 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.3"/>
        <ellipse cx="32" cy="14" rx="14" ry="5" fill="#FCD34D" stroke="#B45309" stroke-width="1.3"/>
        <path d="M18,28 L18,50 C18,55 24,58 32,58 C40,58 46,55 46,50 L46,28 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.3"/>
        <text x="32" y="44" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">+</text>
      ${svgClose}`;

    case 'icecube':
      return `${svgOpen}
        <polygon points="32,8 54,20 32,32 10,20" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="10,20 32,32 32,56 10,44" fill="#BAE6FD" stroke="#38BDF8" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="32,32 54,20 54,44 32,56" fill="#7DD3FC" stroke="#38BDF8" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="16" y1="26" x2="28" y2="34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <line x1="38" y1="36" x2="48" y2="28" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
      ${svgClose}`;

    case 'giftbox':
      return `${svgOpen}
        <ellipse cx="26" cy="8" rx="5" ry="3" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>
        <ellipse cx="38" cy="8" rx="5" ry="3" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>
        <circle cx="32" cy="9" r="3" fill="#EAB308"/>
        <polygon points="32,10 54,22 32,34 10,22" fill="#818CF8" stroke="#3730A3" stroke-width="1.4"/>
        <polygon points="30,11 34,13 34,33 30,31" fill="#FACC15"/>
        <polygon points="19,17 23,19 45,27 41,25" fill="#FACC15"/>
        <polygon points="10,22 32,34 32,56 10,44" fill="#6366F1" stroke="#3730A3" stroke-width="1.4"/>
        <polygon points="19,27 23,29 23,51 19,49" fill="#FACC15"/>
        <polygon points="32,34 54,22 54,44 32,56" fill="#4338CA" stroke="#3730A3" stroke-width="1.4"/>
        <polygon points="41,29 45,27 45,49 41,51" fill="#FACC15"/>
      ${svgClose}`;

    // ---- BASKET CATEGORIES / ATTRIBUTES ----
    case 'roll':
      return `${svgOpen}
        <circle cx="32" cy="32" r="20" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
        <path d="M22,18 A16,16 0 0,1 46,26" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="48,22 48,30 40,28" fill="#FFFFFF"/>
        <path d="M42,46 A16,16 0 0,1 18,38" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="16,42 16,34 24,36" fill="#FFFFFF"/>
      ${svgClose}`;

    case 'both':
    case 'both_surfaces':
      return `${svgOpen}
        <path d="M18,22 L18,46 C18,50 24,53 32,53 C40,53 46,50 46,46 L46,22 Z" fill="#10B981" stroke="#047857" stroke-width="1.5"/>
        <ellipse cx="32" cy="22" rx="14" ry="6" fill="#6EE7B7" stroke="#047857" stroke-width="1.5"/>
        <path d="M12,36 Q8,24 20,14" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M52,28 Q56,40 44,50" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      ${svgClose}`;

    case 'stack':
      return `${svgOpen}
        <polygon points="32,10 46,17 32,24 18,17" fill="#C084FC" stroke="#6B21A8" stroke-width="1"/>
        <polygon points="18,17 32,24 32,34 18,27" fill="#A855F7" stroke="#6B21A8" stroke-width="1"/>
        <polygon points="32,24 46,17 46,27 32,34" fill="#9333EA" stroke="#6B21A8" stroke-width="1"/>
        <polygon points="32,28 48,36 32,44 16,36" fill="#818CF8" stroke="#3730A3" stroke-width="1"/>
        <polygon points="16,36 32,44 32,56 16,48" fill="#6366F1" stroke="#3730A3" stroke-width="1"/>
        <polygon points="32,44 48,36 48,48 32,56" fill="#4338CA" stroke="#3730A3" stroke-width="1"/>
      ${svgClose}`;

    case 'flat_only':
      return `${svgOpen}
        <polygon points="32,8 54,20 32,32 10,20" fill="#A78BFA" stroke="#5B21B6" stroke-width="1.5"/>
        <polygon points="10,20 32,32 32,56 10,44" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.5"/>
        <polygon points="32,32 54,20 54,44 32,56" fill="#7C3AED" stroke="#5B21B6" stroke-width="1.5"/>
      ${svgClose}`;

    case 'curved_only':
      return `${svgOpen}
        <circle cx="32" cy="32" r="22" fill="#06B6D4" stroke="#0891B2" stroke-width="1.5"/>
        <ellipse cx="25" cy="23" rx="7" ry="4" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 25 23)"/>
      ${svgClose}`;

    case 'pointy':
      return `${svgOpen}
        <polygon points="32,6 38,24 56,24 42,35 47,52 32,42 17,52 22,35 8,24 26,24" fill="#F43F5E" stroke="#BE123C" stroke-width="1.5"/>
        <circle cx="32" cy="6" r="3.5" fill="#FDE047" stroke="#CA8A04" stroke-width="1"/>
      ${svgClose}`;

    case 'smooth':
      return `${svgOpen}
        <circle cx="32" cy="32" r="22" fill="#0EA5E9" stroke="#0284C7" stroke-width="1.5"/>
        <path d="M16,34 Q24,26 32,34 T48,34" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      ${svgClose}`;

    default:
      return `${svgOpen}
        <polygon points="32,10 52,21 32,32 12,21" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
        <polygon points="12,21 32,32 32,54 12,43" fill="#64748B" stroke="#475569" stroke-width="1.5"/>
        <polygon points="32,32 52,21 52,43 32,54" fill="#475569" stroke="#334155" stroke-width="1.5"/>
      ${svgClose}`;
  }
}

window.getShapeOrObjectSvg = getShapeOrObjectSvg;
window.getFaceShapeSvg = getFaceShapeSvg;
