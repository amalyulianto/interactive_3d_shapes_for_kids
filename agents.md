# Interactive Math Studio - Architecture & Agent Documentation

> **Grade Level**: Elementary School (Grade 2 Curriculum Aligned)  
> **Studio**: Alapakadala Studio  
> **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+), Three.js (r128), Web Audio API, Canvas 2D  
> **Build System**: **Zero-Build Architecture** (Directly executable in standard web browsers and `file:///` without bundlers or node servers)

---

## 1. Project Overview & Architectural Vision

The **Interactive Math Studio** is a browser-based, interactive mathematics educational platform designed specifically for elementary students (Grade 2). The project emphasizes:
- **Spatial intuition and physical manipulation** (360° interactive 3D rotation, face explosion slider, realistic textures).
- **Active exploration over passive reading** (paper-folding simulation, detective guideline testing, 8×8 symmetry pixel painter, drag-and-drop sorting).
- **Curriculum alignment** with Common Core State Standards (CCSS.MATH.CONTENT.2.G.A.1 - 2D and 3D shapes, attributes, faces, edges, vertices, and line symmetry).
- **Kid-friendly sensory feedback** (Web Audio API procedural sound synthesizers, confetti celebrations, high-contrast visual cues).

---

## 2. Directory & File Organization

The codebase has been refactored from monolithic scripts into clean, decoupled domain modules organized under `js/`:

```
d:\coding\interactive_math\
├── index.html                  # Landing Hub (Grade listview -> Grade 2 lessons listview)
├── hub.css                     # Shared landing hub styles, grade listview, responsive layout
│
├── shapes.html                 # Lesson 1: 3D Solid Shapes Adventure
├── style.css                   # Lesson 1 stylesheet (3D canvas, HUD, color palette, Sorter Lab)
├── app.js                      # Legacy bundle / fallback reference (kept for 100% backward compatibility)
│
├── symmetry.html               # Lesson 2: Lines of Symmetry Studio
├── symmetry.css                # Lesson 2 stylesheet (3D paper sheet, painter grid, mirror cards)
├── symmetry.js                 # Legacy bundle / fallback reference (kept for 100% backward compatibility)
│
├── js/
│   ├── common/
│   │   ├── sound.js            # Unified Web Audio API synthesizer singleton (window.sound)
│   │   └── utils.js            # Shared DOM & animation helpers (confetti wrapper, shuffle, scroll)
│   │
│   ├── shapes/
│   │   ├── shapes-svg.js       # Geometrically accurate 3D vector SVG illustration library
│   │   ├── shapes-data.js      # Procedural TextureBuilder & 9 solid shape definitions
│   │   ├── shapes-3d.js        # Three.js scene, camera, materials, explode slider & highlights
│   │   ├── quiz-game.js        # 4 themed 5-question quizzes + quiz engine
│   │   ├── sorter-game.js      # 5 hands-on Sorter Lab challenges (drag-and-drop + tap-to-place)
│   │   └── shapes-main.js      # Main coordinator, shelf renderer, mode switcher & responsive header
│   │
│   └── symmetry/
│       ├── symmetry-data.js    # Datasets for Fold items, Detective shapes, Painter & Match cards
│       ├── fold-reveal.js      # Activity 1: 3D paper folding physics & overlap verification
│       ├── detective.js        # Activity 2: Line Detective candidate line tests & trap detection
│       ├── painter.js          # Activity 3: 8×8 Pixel Symmetry Studio (Guided & Free-Draw)
│       ├── mirror-match.js     # Activity 4: Mirror Match speed reflection challenge
│       ├── symmetry-quiz.js    # Activity 5: 4 Grade 2 Symmetry Mastery Quizzes
│       └── symmetry-main.js    # Main coordinator, activity tab switcher & bootstrapper
│
└── agents.md                   # This architectural guide and developer manual
```

---

## 3. Core Architecture & Design Patterns

### 3.1 Zero-Build Vanilla JavaScript
- **No Bundler Requirement**: The application runs directly out of the box in any modern browser by opening `index.html` via `file:///` or any static HTTP server.
- **Global Window Coordination**: Because standard ES module `import`/`export` is blocked by browser CORS security when opened via `file:///`, scripts are loaded using standard `<script src="...">` tags in dependency order.
- **Namespaces & Window Exposure**: Reusable functions bound to HTML inline `onclick` handlers (e.g., `toggleFloorGrid()`, `startQuizWithLevel()`, `selectFoldShape()`) are explicitly exported to `window` for reliable access.

### 3.2 Script Loading Dependency Order

#### For `shapes.html`:
```html
<!-- 1. Common Audio & Utilities -->
<script src="js/common/sound.js"></script>
<script src="js/common/utils.js"></script>

<!-- 2. Domain Data & Vector Library -->
<script src="js/shapes/shapes-svg.js"></script>
<script src="js/shapes/shapes-data.js"></script>

<!-- 3. 3D Engine & Game Modes -->
<script src="js/shapes/shapes-3d.js"></script>
<script src="js/shapes/quiz-game.js"></script>
<script src="js/shapes/sorter-game.js"></script>

<!-- 4. Application Bootstrap -->
<script src="js/shapes/shapes-main.js"></script>
```

#### For `symmetry.html`:
```html
<!-- 1. Common Audio & Utilities -->
<script src="js/common/sound.js"></script>
<script src="js/common/utils.js"></script>

<!-- 2. Symmetry Datasets -->
<script src="js/symmetry/symmetry-data.js"></script>

<!-- 3. The 5 Interactive Activities -->
<script src="js/symmetry/fold-reveal.js"></script>
<script src="js/symmetry/detective.js"></script>
<script src="js/symmetry/painter.js"></script>
<script src="js/symmetry/mirror-match.js"></script>
<script src="js/symmetry/symmetry-quiz.js"></script>

<!-- 4. Activity Coordinator -->
<script src="js/symmetry/symmetry-main.js"></script>
```

---

## 4. Subsystem Details

### 4.1 Audio Engine (`js/common/sound.js`)
- Uses procedural **Web Audio API** oscillator nodes (`sine`, `triangle`, `sawtooth`) and gain nodes.
- Zero external MP3/WAV assets needed — loads instantly with 0KB network payload.
- Methods:
  - `playPop()`: UI click / tap feedback (sine frequency sweep).
  - `playCorrect()` / `playChime()`: Correct answer / match chime (arpeggiated notes).
  - `playWrong()` / `playBuzz()`: Incorrect answer / trap warning (sawtooth buzz).
  - `playFanfare()`: Activity completion celebration (5-note harmonic progression).
  - `playFoldSound()`: Paper sheet creasing effect.

### 4.2 Vector Illustration Library (`js/shapes/shapes-svg.js`)
- Replaces ambiguous system emoji renderings with dedicated, geometrically accurate 3D vector SVG illustrations.
- `getShapeOrObjectSvg(id, size)`: Renders isometric/orthographic 3D vectors for:
  - The 9 solids: `cube`, `cuboid`, `cylinder`, `cone`, `sphere`, `triangular_prism`, `square_pyramid`, `triangular_pyramid`, `hexagonal_prism`.
  - Real-world objects: `traffic_cone`, `rubiks`, `waffle_cone`, `partyhat`, `dice`, `juice`, `brick`, `soda`, `drum`, `soccer`, `bball`, `pencil`, `giza`, `teabag`, `tent`, `roof`, `toblerone`, `cheese`, `teepee`, `lantern`, `marble`, `orange`, `globe`, `book`, `eraser`, `battery`, `icecube`, etc.
  - Sorter categories: `roll`, `both`, `stack`, `flat_only`, `curved_only`, `pointy`, `smooth`.

### 4.3 3D Spatial Geometry Engine (`js/shapes/shapes-3d.js`)
- **Three.js Scene**: Perspective camera, orbit controls with damping, directional & ambient lighting, grid helper.
- **Explode Faces Feature**: Uses `PlaneGeometry` and `BufferGeometry` groups positioned radially from the center with `THREE.DoubleSide` materials so inside surfaces never vanish during rotation.
- **Real-World Texture Mode**: Procedural high-resolution canvas textures (`TextureBuilder`) for dice dots, cola cans, juice cartons, basketball seams, and waffle cones.
- **Highlight Subsystem**: Edge highlights (`THREE.EdgesGeometry` line segments) and vertex sphere markers (`THREE.SphereGeometry` red spheres).

### 4.4 Sorter Lab Engine (`js/shapes/sorter-game.js`)
- Dual-input engine: supports both **HTML5 Drag-and-Drop** on desktop and **Tap-to-Select + Tap-to-Place** on tablets and mobile phones.
- 5 Curriculum Games:
  1. Roll vs. Stack / Slide
  2. Flat Faces vs. Curved Surfaces
  3. Pointy Vertices vs. Smooth (0 Vertices)
  4. Real-World Object Matcher (Part 1)
  5. Real-World Object Matcher (Part 2)

### 4.5 Symmetry Studio Activities (`js/symmetry/`)
1. **Fold & Reveal**: 3D CSS `rotateY`, `rotateX`, and `rotate3d(1, 1, 0, deg)` paper folding physics showing real-time overlap alignment with automatic animated folding.
2. **Line Detective**: Interactive guideline testing directly inside SVGs with touch pins and mathematical trap detection (off-center cuts, asymmetrical features).
3. **Mirror Painter**: 8×8 interactive pixel grid with Guided Challenge mode (color right half to mirror locked left half) and Free-Draw Magic mode (real-time bilateral symmetry).
4. **Mirror Match**: Rapid visual discrimination distinguishing true reflection from identical (unflipped), upside-down, and rotated trap cards.
5. **Symmetry Challenge Quizzes**: 4 graded 5-question quizzes covering everyday objects, orientation, letters, and 2D polygons.

---

## 5. Data Contracts & Schemas

### 5.1 Solid Shape Object Schema (`SHAPES_DATA`)
```typescript
interface ShapeDescriptor {
  id: string;                      // Unique identifier, e.g. 'cube', 'cuboid'
  name: string;                    // Kid-friendly title, e.g. 'Cube'
  icon: string;                    // Emoji / icon preview
  subtitle: string;                // Educational explanation
  color: number;                   // Hex integer, e.g. 0x6366F1
  faces: number;                   // Total faces count
  facesDesc: string;               // Text descriptor, e.g. '6 Equal Square Faces'
  flatFaces: number;               // Count of flat faces
  curvedFaces: number;             // Count of curved surfaces
  faceShapes: Array<{              // 2D shape decomposition of faces
    name: string;                  // e.g. 'Square'
    count: number;                 // e.g. 6
    shape: string;                 // 'square' | 'rect' | 'circle' | 'triangle' | 'hexagon'
    color: string;
  }>;
  edges: number;                   // Edge count
  edgesDesc: string;               // e.g. '12 Straight Edges'
  vertices: number;                // Vertex count
  verticesDesc: string;            // e.g. '8 Corner Vertices'
  examples: string[];              // Real-world examples
  tip: string;                     // Fun educational tip
  createGeom(): THREE.BufferGeometry;
  createExplodedGroup(offset: number, mat: THREE.Material): THREE.Group;
  createRealMesh?(): THREE.Group;
  getVerticesCoords(): Array<[number, number, number]>;
}
```

### 5.2 Detective Shape Schema (`DETECTIVE_SHAPES`)
```typescript
interface DetectiveShape {
  id: string;
  name: string;
  icon: string;
  totalLines: number;              // Total true lines of symmetry
  clue: string;
  tip: string;
  shapeSvg: string;                // Inner SVG geometry elements
  lines: Array<{
    id: string;
    name: string;
    x1: number; y1: number;
    x2: number; y2: number;
    isSymmetric: boolean;          // True symmetry axis or educational trap
    desc: string;                  // Immediate explanatory feedback
  }>;
}
```

---

## 6. Guidelines for Future AI Agents

When modifying, extending, or maintaining this codebase, adhere strictly to the following rules:

1. **Zero Regressions & Zero Breakages**:
   - Always verify that all inline HTML `onclick` functions exist on `window`.
   - Never remove global function bindings that HTML buttons rely on.
2. **Preserve Zero-Build Compatibility**:
   - Do NOT introduce npm packages, bundlers (Vite/Webpack), or ES module imports between files that would break direct browser loading via `file:///`.
   - Always load external scripts via standard HTML `<script>` tags in clean dependency order.
3. **Maintain Visual Fidelity (3D Vector SVGs)**:
   - When adding real-world objects or shapes to quizzes and sorters, use `getShapeOrObjectSvg()` instead of system emojis.
   - If adding a new object, add its vector path into `js/shapes/shapes-svg.js`.
4. **Kid-Friendly Grade 2 Principles**:
   - Keep touch targets large (minimum 44×44px).
   - Keep colors bright, accessible, and high-contrast (WCAG AA compliant).
   - Provide immediate, encouraging feedback with clear hints rather than plain "Incorrect" messages.
5. **Clean Separation of Concerns**:
   - Keep geometric equations and data arrays in `*-data.js`.
   - Keep audio synthesizer in `sound.js`.
   - Keep DOM coordinators in `*-main.js`.
6. **Strict Two-Tier Navigation Hierarchy**:
   - From lesson-level pages (`shapes.html`, `symmetry.html`), back navigation must route to the grade's lesson list page (`index.html#grade-2`), NOT to the root grade selection screen.
   - From the grade's lesson list page (`#lessonsView` in `index.html`), provide explicit back navigation to the grades selection screen (`#gradesView` / `showGradesView()`).
