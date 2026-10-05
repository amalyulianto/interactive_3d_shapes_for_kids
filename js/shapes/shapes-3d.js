/**
 * 3D Solid Shapes Adventure - Three.js 3D Engine & Scene Controller
 * Manages WebGL rendering, orbit controls, camera, lights, materials, explosion slider, and highlights.
 */

// 3D Scene State
let currentShapeIndex = 0;
let displayMode = 'geom';
let isAutoRotating = false;
let isHighlightingEdges = false;
let isHighlightingVertices = false;
let isCleanXRay = false;
let isWireframeMesh = false;
let isGridVisible = true;
let currentCustomColor = 0x6366F1;
let explodeVal = 0.0;
let isTheaterMode = false;
let currentBgColor = '#F8FAFC';

// Three.js Scene References
let scene, camera, renderer, controls;
let shapeGroup = null;
let currentMesh = null;
let edgesLine = null;
let vertexGroup = null;
let gridHelper = null;

// Initialize 3D Engine
function initThree() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas) return;
  const container = canvas.parentElement; // #canvasViewport

  scene = new THREE.Scene();
  scene.background = new THREE.Color(currentBgColor);

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(4.5, 3.2, 5.5);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxDistance = 18;
  controls.minDistance = 2;

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.75);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.85);
  dirLight1.position.set(6, 12, 8);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xA5B4FC, 0.4);
  dirLight2.position.set(-6, -4, -6);
  scene.add(dirLight2);

  gridHelper = new THREE.GridHelper(10, 14, 0x94A3B8, 0xCBD5E1);
  gridHelper.position.y = -1.8;
  gridHelper.visible = isGridVisible;
  scene.add(gridHelper);

  shapeGroup = new THREE.Group();
  scene.add(shapeGroup);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('orientationchange', () => setTimeout(onWindowResize, 150));

  function animate() {
    requestAnimationFrame(animate);
    if (isAutoRotating && shapeGroup) {
      shapeGroup.rotation.y += 0.008;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

function onWindowResize() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || !renderer) return;
  const container = canvas.parentElement;
  if (!container || container.clientWidth === 0 || container.clientHeight === 0) return;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Background Color Switcher
function setCanvasBg(hex, btn) {
  if (window.sound) window.sound.playPop();
  currentBgColor = hex;
  if (scene) {
    scene.background = new THREE.Color(hex);
    if (gridHelper) {
      const isDark = hex === '#0F172A' || hex === '#134E4A';
      gridHelper.material.color.setHex(isDark ? 0x475569 : 0xCBD5E1);
    }
  }

  document.querySelectorAll('#bgDots .bg-swatch').forEach(s => s.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// Toggle Base Grid
function toggleFloorGrid() {
  if (window.sound) window.sound.playPop();
  isGridVisible = !isGridVisible;
  if (gridHelper) {
    gridHelper.visible = isGridVisible;
  }
  const btn = document.getElementById('btnToggleGrid');
  const status = document.getElementById('gridStatus');
  if (btn) btn.classList.toggle('active', isGridVisible);
  if (status) status.textContent = isGridVisible ? 'ON' : 'OFF';
}

// Select Shape
function selectShape(idx) {
  currentShapeIndex = idx;
  const shape = SHAPES_DATA[idx];
  if (!shape) return;

  document.querySelectorAll('.shape-chip').forEach((chip, i) => {
    chip.classList.toggle('active', i === idx);
  });

  if (shapeGroup) {
    while (shapeGroup.children.length > 0) {
      const obj = shapeGroup.children[0];
      shapeGroup.remove(obj);
    }
  }

  const explodeCard = document.getElementById('explodeSliderCard');
  if (explodeCard) {
    explodeCard.style.display = displayMode === 'real' ? 'none' : 'flex';
  }

  if (displayMode === 'real' && shape.createRealMesh) {
    currentMesh = shape.createRealMesh();
  } else {
    // Enable DoubleSide so exploded faces remain visible from any angle/backside
    const mat = new THREE.MeshStandardMaterial({
      color: currentCustomColor || shape.color,
      roughness: 0.25,
      metalness: 0.1,
      wireframe: isWireframeMesh,
      transparent: isCleanXRay,
      opacity: isCleanXRay ? 0.28 : 1.0,
      depthWrite: !isCleanXRay,
      side: THREE.DoubleSide
    });

    if (explodeVal > 0.01 && shape.createExplodedGroup) {
      currentMesh = shape.createExplodedGroup(explodeVal, mat);
    } else {
      const geom = shape.createGeom();
      currentMesh = new THREE.Mesh(geom, mat);

      const edgesGeom = new THREE.EdgesGeometry(geom, 22);
      const lineMat = new THREE.LineBasicMaterial({
        color: isCleanXRay ? 0x4338CA : 0x1E1B4B,
        linewidth: isCleanXRay ? 3 : 2
      });
      edgesLine = new THREE.LineSegments(edgesGeom, lineMat);
      currentMesh.add(edgesLine);
    }
  }

  if (shapeGroup) shapeGroup.add(currentMesh);
  setupHighlights(shape);
  updateDetailsCard(shape);
}

// Highlights Setup
function setupHighlights(shape) {
  if (vertexGroup && shapeGroup) shapeGroup.remove(vertexGroup);
  vertexGroup = new THREE.Group();

  const coords = shape.getVerticesCoords ? shape.getVerticesCoords() : [];
  const sphereGeom = new THREE.SphereGeometry(0.13, 16, 16);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xEF4444,
    emissive: 0x991B1B,
    roughness: 0.2
  });

  coords.forEach(pos => {
    const dot = new THREE.Mesh(sphereGeom, sphereMat);
    dot.position.set(pos[0], pos[1], pos[2]);
    vertexGroup.add(dot);
  });

  vertexGroup.visible = isHighlightingVertices;
  if (shapeGroup) shapeGroup.add(vertexGroup);

  applyEdgeHighlight();
}

function applyEdgeHighlight() {
  if (edgesLine) {
    if (isHighlightingEdges) {
      edgesLine.material.color.setHex(0xFBBF24);
      edgesLine.material.linewidth = 4;
      edgesLine.scale.set(1.02, 1.02, 1.02);
    } else {
      edgesLine.material.color.setHex(isCleanXRay ? 0x4338CA : 0x1E1B4B);
      edgesLine.material.linewidth = isCleanXRay ? 3 : 2;
      edgesLine.scale.set(1.0, 1.0, 1.0);
    }
  }
}

// Update Details Card
function updateDetailsCard(shape) {
  const iconEl = document.getElementById('shapeIcon');
  if (iconEl) iconEl.textContent = shape.icon;
  const nameEl = document.getElementById('shapeName');
  if (nameEl) nameEl.textContent = shape.name;
  const subEl = document.getElementById('shapeSubtitle');
  if (subEl) subEl.textContent = shape.subtitle;

  const propFaces = document.getElementById('propFaces');
  if (propFaces) propFaces.textContent = shape.faces;
  const propFacesDesc = document.getElementById('propFacesDesc');
  if (propFacesDesc) propFacesDesc.textContent = shape.facesDesc;

  const propEdges = document.getElementById('propEdges');
  if (propEdges) propEdges.textContent = shape.edges;
  const propEdgesDesc = document.getElementById('propEdgesDesc');
  if (propEdgesDesc) propEdgesDesc.textContent = shape.edgesDesc;

  const propVertices = document.getElementById('propVertices');
  if (propVertices) propVertices.textContent = shape.vertices;
  const propVerticesDesc = document.getElementById('propVerticesDesc');
  if (propVerticesDesc) propVerticesDesc.textContent = shape.verticesDesc;

  const flatEl = document.getElementById('propFlatFaces');
  if (flatEl) flatEl.textContent = shape.flatFaces !== undefined ? shape.flatFaces : shape.faces;

  const curvedEl = document.getElementById('propCurvedFaces');
  if (curvedEl) curvedEl.textContent = shape.curvedFaces !== undefined ? shape.curvedFaces : 0;

  const faceShapesContainer = document.getElementById('faceShapesList');
  if (faceShapesContainer) {
    faceShapesContainer.innerHTML = '';
    if (shape.faceShapes && shape.faceShapes.length > 0) {
      shape.faceShapes.forEach(fs => {
        const item = document.createElement('div');
        item.className = 'face-shape-item';
        const svgContent = typeof getFaceShapeSvg === 'function' ? getFaceShapeSvg(fs.shape, fs.color) : '';
        item.innerHTML = `
          ${svgContent}
          <span class="face-shape-text">${fs.name}</span>
          <span class="face-shape-count-badge">${fs.count}</span>
        `;
        faceShapesContainer.appendChild(item);
      });
    }
  }

  const exContainer = document.getElementById('examplesList');
  if (exContainer) {
    exContainer.innerHTML = '';
    shape.examples.forEach(ex => {
      const tag = document.createElement('span');
      tag.className = 'example-tag';
      tag.textContent = ex;
      exContainer.appendChild(tag);
    });
  }

  const tipEl = document.getElementById('funTipText');
  if (tipEl) tipEl.textContent = shape.tip;
}

// Display Mode: Geometry vs Real World
function setShapeDisplayMode(mode) {
  if (window.sound) window.sound.playPop();
  displayMode = mode;
  const geomBtn = document.getElementById('modeGeomBtn');
  const realBtn = document.getElementById('modeRealBtn');
  if (geomBtn) geomBtn.classList.toggle('active', mode === 'geom');
  if (realBtn) realBtn.classList.toggle('active', mode === 'real');
  selectShape(currentShapeIndex);
}

// Theater / Wide Mode Toggle
function toggleTheaterMode() {
  if (window.sound) window.sound.playPop();
  isTheaterMode = !isTheaterMode;
  const stage = document.getElementById('stageContainer');
  const btn = document.getElementById('btnTheaterMode');
  const icon = document.getElementById('theaterBtnIcon');

  if (stage) stage.classList.toggle('theater-mode', isTheaterMode);
  if (btn) btn.classList.toggle('active', isTheaterMode);
  if (icon) icon.textContent = isTheaterMode ? '🗗' : '⛶';

  setTimeout(onWindowResize, 60);
}

// Auto Rotate
function toggleAutoRotate() {
  if (window.sound) window.sound.playPop();
  isAutoRotating = !isAutoRotating;
  const btn = document.getElementById('btnAutoRotate');
  const status = document.getElementById('autoRotateStatus');
  if (btn) btn.classList.toggle('active', isAutoRotating);
  if (status) status.textContent = isAutoRotating ? 'ON' : 'OFF';
}

function resetCamera() {
  if (window.sound) window.sound.playPop();
  if (camera) camera.position.set(4.5, 3.2, 5.5);
  if (controls) controls.target.set(0, 0, 0);
  if (shapeGroup) shapeGroup.rotation.set(0, 0, 0);
}

function toggleHighlightEdges() {
  if (window.sound) window.sound.playPop();
  isHighlightingEdges = !isHighlightingEdges;
  const btn = document.getElementById('btnHighlightEdges');
  if (btn) btn.classList.toggle('active', isHighlightingEdges);
  applyEdgeHighlight();
}

function toggleHighlightVertices() {
  if (window.sound) window.sound.playPop();
  isHighlightingVertices = !isHighlightingVertices;
  const btn = document.getElementById('btnHighlightVertices');
  if (btn) btn.classList.toggle('active', isHighlightingVertices);
  if (vertexGroup) vertexGroup.visible = isHighlightingVertices;
}

function toggleCleanXRay() {
  if (window.sound) window.sound.playPop();
  isCleanXRay = !isCleanXRay;
  const btn = document.getElementById('btnCleanXRay');
  if (btn) btn.classList.toggle('active', isCleanXRay);
  selectShape(currentShapeIndex);
}

function toggleWireframeMesh() {
  if (window.sound) window.sound.playPop();
  isWireframeMesh = !isWireframeMesh;
  const btn = document.getElementById('btnWireframeMesh');
  if (btn) btn.classList.toggle('active', isWireframeMesh);
  selectShape(currentShapeIndex);
}

function flashHighlight(type) {
  if (window.sound) window.sound.playPop();
  if (type === 'edges') {
    isHighlightingEdges = true;
    const btn = document.getElementById('btnHighlightEdges');
    if (btn) btn.classList.add('active');
    applyEdgeHighlight();
  } else if (type === 'vertices') {
    isHighlightingVertices = true;
    const btn = document.getElementById('btnHighlightVertices');
    if (btn) btn.classList.add('active');
    if (vertexGroup) vertexGroup.visible = true;
  }
}

// Explode Faces Slider
function onExplodeSlider(val) {
  explodeVal = parseFloat(val) / 100;
  const textEl = document.getElementById('explodeValText');
  if (textEl) textEl.textContent = `${val}%`;
  selectShape(currentShapeIndex);
}

// Paint Palette
function setCustomColor(hex, el) {
  if (window.sound) window.sound.playPop();
  currentCustomColor = hex;
  document.querySelectorAll('#colorDots .color-dot').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
  selectShape(currentShapeIndex);
}

// Global window attachments
window.initThree = initThree;
window.onWindowResize = onWindowResize;
window.setCanvasBg = setCanvasBg;
window.toggleFloorGrid = toggleFloorGrid;
window.selectShape = selectShape;
window.setupHighlights = setupHighlights;
window.applyEdgeHighlight = applyEdgeHighlight;
window.updateDetailsCard = updateDetailsCard;
window.setShapeDisplayMode = setShapeDisplayMode;
window.toggleTheaterMode = toggleTheaterMode;
window.toggleAutoRotate = toggleAutoRotate;
window.resetCamera = resetCamera;
window.toggleHighlightEdges = toggleHighlightEdges;
window.toggleHighlightVertices = toggleHighlightVertices;
window.toggleCleanXRay = toggleCleanXRay;
window.toggleWireframeMesh = toggleWireframeMesh;
window.flashHighlight = flashHighlight;
window.onExplodeSlider = onExplodeSlider;
window.setCustomColor = setCustomColor;
