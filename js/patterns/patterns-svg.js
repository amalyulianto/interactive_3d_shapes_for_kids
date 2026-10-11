/**
 * Patterns Studio - Vector SVG Illustration Library
 * Geometrically accurate 2D shapes and 3D solids with multi-attribute variations:
 * - Shape / Solid identity
 * - Orientation / Rotation (upright, inverted, tilted, pointing right/down)
 * - Size / Height (tall vs short cylinder, big vs small)
 * - Colors matching elementary school Grade 2 curriculum worksheets
 */

(function () {
  'use strict';

  function renderPatternSvg(itemKey, size = 56) {
    if (!itemKey) return '';

    // If an object with properties is passed
    let key = typeof itemKey === 'string' ? itemKey : itemKey.key || itemKey.id;

    switch (key) {
      // ===== 2D SHAPES (From Worksheets 1 & 2) =====
      case 'triangle_up_red':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 10,54 54,54" fill="#EF4444" stroke="#991B1B" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'triangle_up_orange':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 10,54 54,54" fill="#F97316" stroke="#9A3412" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'triangle_up_yellow':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 10,54 54,54" fill="#FBBF24" stroke="#B45309" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'triangle_down_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,56 10,10 54,10" fill="#22C55E" stroke="#15803D" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'triangle_right_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="12,12 52,40 12,54" fill="#84CC16" stroke="#4D7C0F" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'rect_tall_yellow':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <rect x="22" y="6" width="20" height="52" rx="4" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/>
        </svg>`;

      case 'circle_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="#60A5FA" stroke="#1D4ED8" stroke-width="3"/>
        </svg>`;

      case 'circle_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <circle cx="32" cy="32" r="20" fill="#4ADE80" stroke="#15803D" stroke-width="3"/>
        </svg>`;

      case 'square_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <rect x="14" y="14" width="36" height="36" rx="4" fill="#93C5FD" stroke="#1D4ED8" stroke-width="3"/>
        </svg>`;

      case 'square_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <rect x="14" y="14" width="36" height="36" rx="4" fill="#4ADE80" stroke="#15803D" stroke-width="3"/>
        </svg>`;

      case 'hexagon_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 52,19 52,45 32,56 12,45 12,19" fill="#3B82F6" stroke="#1E40AF" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'diamond_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 52,32 32,56 12,32" fill="#60A5FA" stroke="#1E40AF" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'pentagon_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,8 54,24 45,54 19,54 10,24" fill="#38BDF8" stroke="#0369A1" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'octagon_orange':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="21,9 43,9 55,21 55,43 43,55 21,55 9,43 9,21" fill="#FB923C" stroke="#C2410C" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      case 'octagon_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="21,9 43,9 55,21 55,43 43,55 21,55 9,43 9,21" fill="#3B82F6" stroke="#1E40AF" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;

      // ===== 3D SOLIDS (From Worksheets 1, 2, and Lesson 5) =====
      case 'cylinder_tall_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Cylinder Body -->
          <path d="M 22,14 L 22,50 C 22,54 42,54 42,50 L 42,14 Z" fill="#4D7C0F" stroke="#1E293B" stroke-width="2.5"/>
          <ellipse cx="32" cy="14" rx="10" ry="4" fill="#84CC16" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M 22,50 C 22,54 42,54 42,50" fill="none" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;

      case 'cylinder_short_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Short Cylinder Body -->
          <path d="M 23,28 L 23,48 C 23,52 41,52 41,48 L 41,28 Z" fill="#2563EB" stroke="#1E293B" stroke-width="2.5"/>
          <ellipse cx="32" cy="28" rx="9" ry="3.8" fill="#60A5FA" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M 23,48 C 23,52 41,52 41,48" fill="none" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;

      case 'cylinder_tilted_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <g transform="rotate(-30 32 32)">
            <path d="M 22,14 L 22,50 C 22,54 42,54 42,50 L 42,14 Z" fill="#4D7C0F" stroke="#1E293B" stroke-width="2.5"/>
            <ellipse cx="32" cy="14" rx="10" ry="4" fill="#84CC16" stroke="#1E293B" stroke-width="2.5"/>
            <path d="M 22,50 C 22,54 42,54 42,50" fill="none" stroke="#1E293B" stroke-width="2.5"/>
          </g>
        </svg>`;

      case 'cylinder_brown':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <path d="M 20,12 L 20,52 C 20,56 44,56 44,52 L 44,12 Z" fill="#B45309" stroke="#1E293B" stroke-width="2.5"/>
          <ellipse cx="32" cy="12" rx="12" ry="4.5" fill="#F59E0B" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M 20,52 C 20,56 44,56 44,52" fill="none" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;

      case 'cone_up_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Cone Upright -->
          <path d="M 32,8 L 14,48 C 14,54 50,54 50,48 Z" fill="#3B82F6" stroke="#1E293B" stroke-width="2.5"/>
          <ellipse cx="32" cy="48" rx="18" ry="6" fill="#1D4ED8" stroke="#1E293B" stroke-width="2.5"/>
          <!-- Shading highlight -->
          <path d="M 32,8 L 32,54 C 40,54 50,52 50,48 Z" fill="#1E40AF" opacity="0.25"/>
        </svg>`;

      case 'cone_down_blue':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Cone Inverted (Tip pointing down) -->
          <path d="M 14,16 L 32,56 L 50,16 Z" fill="#3B82F6" stroke="#1E293B" stroke-width="2.5"/>
          <ellipse cx="32" cy="16" rx="18" ry="6" fill="#60A5FA" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M 32,56 L 32,10 C 40,10 50,12 50,16 Z" fill="#1E40AF" opacity="0.25"/>
        </svg>`;

      case 'cone_down_purple':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Purple Cone Tilted/Down -->
          <g transform="rotate(150 32 32)">
            <path d="M 32,10 L 16,50 C 16,55 48,55 48,50 Z" fill="#8B5CF6" stroke="#1E293B" stroke-width="2.5"/>
            <ellipse cx="32" cy="50" rx="16" ry="5.5" fill="#C4B5FD" stroke="#1E293B" stroke-width="2.5"/>
          </g>
        </svg>`;

      case 'pyramid_purple':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Square / Triangular Pyramid Upright -->
          <!-- Base edges / side faces -->
          <polygon points="32,8 10,48 34,56" fill="#A78BFA" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="32,8 34,56 54,44" fill="#7C3AED" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>`;

      case 'pyramid_pink':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Pink Pyramid Upright -->
          <polygon points="32,8 10,48 34,56" fill="#F472B6" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="32,8 34,56 54,44" fill="#DB2777" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>`;

      case 'pyramid_sideways_orange':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Oblique / Tilted Pyramid Pointing Sideways -->
          <polygon points="56,28 12,14 26,52" fill="#F97316" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
          <polygon points="56,28 26,52 46,50" fill="#EA580C" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>`;

      case 'cube_green':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <!-- Top face -->
          <polygon points="32,10 52,22 32,34 12,22" fill="#86EFAC" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Left face -->
          <polygon points="12,22 32,34 32,54 12,42" fill="#22C55E" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Right face -->
          <polygon points="32,34 52,22 52,42 32,54" fill="#15803D" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>`;

      // Line art / Worksheet Wireframes for Choice Selectors
      case 'wire_pyramid_up':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="32,10 12,48 36,54" fill="#F8FAFC" stroke="#0F172A" stroke-width="2.5"/>
          <polygon points="32,10 36,54 52,44" fill="#F1F5F9" stroke="#0F172A" stroke-width="2.5"/>
          <line x1="12" y1="48" x2="52" y2="44" stroke="#0F172A" stroke-width="1.5" stroke-dasharray="3,3"/>
        </svg>`;

      case 'wire_pyramid_side':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <polygon points="54,28 14,14 28,52" fill="#F8FAFC" stroke="#0F172A" stroke-width="2.5"/>
          <polygon points="54,28 28,52 46,48" fill="#F1F5F9" stroke="#0F172A" stroke-width="2.5"/>
        </svg>`;

      case 'wire_cylinder_tall':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <path d="M 22,12 L 22,52 C 22,56 42,56 42,52 L 42,12 Z" fill="#F8FAFC" stroke="#0F172A" stroke-width="2.5"/>
          <ellipse cx="32" cy="12" rx="10" ry="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
          <path d="M 22,52 C 22,56 42,56 42,52" fill="none" stroke="#0F172A" stroke-width="2.5"/>
        </svg>`;

      case 'wire_cylinder_short':
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
          <path d="M 24,28 L 24,48 C 24,52 40,52 40,48 L 40,28 Z" fill="#F8FAFC" stroke="#0F172A" stroke-width="2.5"/>
          <ellipse cx="32" cy="28" rx="8" ry="3.5" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
          <path d="M 24,48 C 24,52 40,52 40,48" fill="none" stroke="#0F172A" stroke-width="2.5"/>
        </svg>`;

      default:
        // Fallback to shapes-svg if available
        if (typeof window.getShapeOrObjectSvg === 'function') {
          return window.getShapeOrObjectSvg(key, size);
        }
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"><rect x="12" y="12" width="40" height="40" fill="#CBD5E1"/></svg>`;
    }
  }

  // Expose to window for zero-build script loading
  window.renderPatternSvg = renderPatternSvg;

})();
