/**
 * 3D Solid Shapes Adventure - Grade 2 Elementary Math
 * Developed by Alapakadala Studio
 */

// Sound FX Synthesizer (Web Audio API)
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.08);
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.2, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.01, now + i * 0.07 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.2);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.25);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [
      { f: 523.25, t: 0.0 },
      { f: 659.25, t: 0.12 },
      { f: 783.99, t: 0.24 },
      { f: 1046.50, t: 0.38 }
    ];
    const now = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.3, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.4);
    });
  }
}

const sound = new SoundFX();

function toggleAudio() {
  sound.enabled = !sound.enabled;
  const btn = document.getElementById('soundToggle');
  if (btn) btn.textContent = sound.enabled ? '🔊' : '🔇';
  const btnTop = document.getElementById('btnSoundToggle');
  if (btnTop) btnTop.textContent = sound.enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
  document.activeElement?.blur();
  if (window.innerWidth > 768) {
    const header = document.querySelector('.main-header');
    if (header) header.classList.add('collapsed');
  }
}

// Procedural High-Res Texture Builder
const TextureBuilder = {
  createDiceTexture(num) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 18;
    ctx.strokeRect(10, 10, 492, 492);

    const drawDot = (x, y, isRed = false) => {
      const rad = 42;
      const grad = ctx.createRadialGradient(x - 8, y - 8, 4, x, y, rad);
      if (isRed) {
        grad.addColorStop(0, '#F87171');
        grad.addColorStop(1, '#DC2626');
      } else {
        grad.addColorStop(0, '#334155');
        grad.addColorStop(1, '#0F172A');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    const c = 256, l = 128, r = 384;
    if (num === 1) drawDot(c, c, true);
    if (num === 2) { drawDot(l, l); drawDot(r, r); }
    if (num === 3) { drawDot(l, l); drawDot(c, c); drawDot(r, r); }
    if (num === 4) { drawDot(l, l); drawDot(r, l); drawDot(l, r); drawDot(r, r); }
    if (num === 5) { drawDot(l, l); drawDot(r, l); drawDot(c, c); drawDot(l, r); drawDot(r, r); }
    if (num === 6) { drawDot(l, 110); drawDot(l, 256); drawDot(l, 402); drawDot(r, 110); drawDot(r, 256); drawDot(r, 402); }

    return new THREE.CanvasTexture(canvas);
  },

  createSodaCanLabel() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#BE123C');
    grad.addColorStop(0.3, '#E11D48');
    grad.addColorStop(0.5, '#FB7185');
    grad.addColorStop(0.7, '#E11D48');
    grad.addColorStop(1, '#9F1239');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, 360);
    ctx.bezierCurveTo(256, 300, 768, 420, 1024, 360);
    ctx.lineTo(1024, 512);
    ctx.lineTo(0, 512);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 110px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('COLA FIZZ', 512, 220);

    ctx.fillStyle = '#FFE4E6';
    ctx.font = 'bold 46px Fredoka, Nunito, sans-serif';
    ctx.fillText('REFRESHING & SWEET • 330ml', 512, 290);

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 40; i++) {
      const bx = Math.random() * 1024;
      const by = Math.random() * 512;
      const br = 4 + Math.random() * 12;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  },

  createJuiceBoxLabel() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#F97316';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 340, 512, 172);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 64px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('100% ORANGE', 256, 160);

    ctx.font = '40px Fredoka, Nunito, sans-serif';
    ctx.fillText('FRESH JUICE', 256, 220);

    ctx.font = '100px sans-serif';
    ctx.fillText('🍊 🧃', 256, 440);

    return new THREE.CanvasTexture(canvas);
  },

  createWaffleConeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#D97706';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 10;
    for (let i = -512; i < 1024; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 512, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i, 512);
      ctx.lineTo(i + 512, 0);
      ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
  },

  createBasketballTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#EA580C';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 16;

    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.lineTo(512, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 256, 120, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(412, 256, 120, Math.PI / 2, -Math.PI / 2);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }
};

// 9 SHAPES DATABASE
const SHAPES_DATA = [
  {
    id: 'cube',
    name: 'Cube',
    icon: '🎲',
    subtitle: 'A 3D solid shape with 6 identical square faces',
    color: 0x6366F1,
    faces: 6,
    facesDesc: '6 Equal Square Faces',
    flatFaces: 6,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Square', count: 6, shape: 'square', color: '#6366F1' }
    ],
    edges: 12,
    edgesDesc: '12 Straight Edges',
    vertices: 8,
    verticesDesc: '8 Corner Vertices',
    examples: ['🎲 Playing Dice', '🎁 Gift Box', '🧊 Ice Cube', '🧩 Rubik’s Cube'],
    tip: 'Every single face of a cube is a square of the exact same size!',
    createGeom() {
      return new THREE.BoxGeometry(2.4, 2.4, 2.4);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const s = 2.4;
      const d = (s / 2) + offset * 1.5;
      const plane = new THREE.PlaneGeometry(s, s);

      const makeFace = (pos, rot) => {
        const mesh = new THREE.Mesh(plane, mat);
        mesh.position.set(...pos);
        mesh.rotation.set(...rot);
        group.add(mesh);
      };

      makeFace([0, 0, d], [0, 0, 0]);
      makeFace([0, 0, -d], [0, Math.PI, 0]);
      makeFace([d, 0, 0], [0, Math.PI / 2, 0]);
      makeFace([-d, 0, 0], [0, -Math.PI / 2, 0]);
      makeFace([0, d, 0], [-Math.PI / 2, 0, 0]);
      makeFace([0, -d, 0], [Math.PI / 2, 0, 0]);
      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const materials = [
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(1), roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(6), roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(2), roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(5), roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(3), roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ map: TextureBuilder.createDiceTexture(4), roughness: 0.25 }),
      ];
      const dice = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 2.4), materials);
      group.add(dice);
      return group;
    },
    getVerticesCoords() {
      const h = 1.2;
      return [
        [-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h],
        [-h, -h, h], [h, -h, h], [h, h, h], [-h, h, h]
      ];
    }
  },
  {
    id: 'cuboid',
    name: 'Rectangular Prism (Cuboid)',
    icon: '📦',
    subtitle: 'A 3D box with 6 rectangular faces',
    color: 0xEC4899,
    faces: 6,
    facesDesc: '6 Rectangular Faces',
    flatFaces: 6,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Rectangle', count: 4, shape: 'rect', color: '#EC4899' },
      { name: 'Square End', count: 2, shape: 'square', color: '#8B5CF6' }
    ],
    edges: 12,
    edgesDesc: '12 Straight Edges',
    vertices: 8,
    verticesDesc: '8 Corner Vertices',
    examples: ['🧃 Juice Box', '🧱 Brick', '🧽 Chalkboard Eraser', '📚 Textbook'],
    tip: 'Cereal boxes, books, and juice cartons are cuboids because they pack easily on store shelves!',
    createGeom() {
      return new THREE.BoxGeometry(3.2, 1.8, 1.8);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const w = 3.2, h = 1.8, d = 1.8;
      const off = offset * 1.5;

      const f1 = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      f1.position.set(0, 0, (d / 2) + off);
      group.add(f1);

      const f2 = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      f2.position.set(0, 0, -(d / 2) - off);
      f2.rotation.y = Math.PI;
      group.add(f2);

      const f3 = new THREE.Mesh(new THREE.PlaneGeometry(d, h), mat);
      f3.position.set((w / 2) + off, 0, 0);
      f3.rotation.y = Math.PI / 2;
      group.add(f3);

      const f4 = new THREE.Mesh(new THREE.PlaneGeometry(d, h), mat);
      f4.position.set(-(w / 2) - off, 0, 0);
      f4.rotation.y = -Math.PI / 2;
      group.add(f4);

      const f5 = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
      f5.position.set(0, (h / 2) + off, 0);
      f5.rotation.x = -Math.PI / 2;
      group.add(f5);

      const f6 = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
      f6.position.set(0, -(h / 2) - off, 0);
      f6.rotation.x = Math.PI / 2;
      group.add(f6);

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({
        map: TextureBuilder.createJuiceBoxLabel(),
        roughness: 0.35
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.0, 1.4), bodyMat);
      group.add(body);

      const strawMat = new THREE.MeshStandardMaterial({ color: 0xFACC15 });
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16), strawMat);
      straw.position.set(0.4, 1.7, 0.2);
      straw.rotation.z = -0.25;
      group.add(straw);

      return group;
    },
    getVerticesCoords() {
      const x = 1.6, y = 0.9, z = 0.9;
      return [
        [-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z],
        [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]
      ];
    }
  },
  {
    id: 'cylinder',
    name: 'Cylinder',
    icon: '🥫',
    subtitle: 'Has 2 circular bases and 1 smooth curved surface',
    color: 0x10B981,
    faces: 3,
    facesDesc: '2 Flat Circles + 1 Curved',
    flatFaces: 2,
    curvedFaces: 1,
    faceShapes: [
      { name: 'Flat Circle Base', count: 2, shape: 'circle', color: '#10B981' },
      { name: 'Curved Body Surface', count: 1, shape: 'curved_cylinder', color: '#059669' }
    ],
    edges: 2,
    edgesDesc: '2 Curved Edges',
    vertices: 0,
    verticesDesc: '0 Vertices (No sharp corners)',
    examples: ['🥫 Soda Can', '🥁 Snare Drum', '🪙 Stack of Coins', '🧻 Paper Towel Roll'],
    tip: 'A cylinder rolls straight forward because its curved surface is completely round!',
    createGeom() {
      return new THREE.CylinderGeometry(1.3, 1.3, 2.8, 32);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const r = 1.3, h = 2.8;
      const off = offset * 1.5;

      const top = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mat);
      top.position.set(0, (h / 2) + off, 0);
      top.rotation.x = -Math.PI / 2;
      group.add(top);

      const btm = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mat);
      btm.position.set(0, -(h / 2) - off, 0);
      btm.rotation.x = Math.PI / 2;
      group.add(btm);

      const mid = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), mat);
      group.add(mid);

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const labelMat = new THREE.MeshStandardMaterial({
        map: TextureBuilder.createSodaCanLabel(),
        metalness: 0.4,
        roughness: 0.3
      });
      const can = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.6, 36), labelMat);
      group.add(can);

      const metalMat = new THREE.MeshStandardMaterial({ color: 0xD1D5DB, metalness: 0.9, roughness: 0.2 });
      const topRim = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.08, 16, 36), metalMat);
      topRim.position.y = 1.3;
      topRim.rotation.x = Math.PI / 2;
      group.add(topRim);

      const btmRim = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.08, 16, 36), metalMat);
      btmRim.position.y = -1.3;
      btmRim.rotation.x = Math.PI / 2;
      group.add(btmRim);

      const tab = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.6), metalMat);
      tab.position.set(0, 1.32, 0.2);
      group.add(tab);

      return group;
    },
    getVerticesCoords() {
      return [];
    }
  },
  {
    id: 'cone',
    name: 'Cone',
    icon: '🍦',
    subtitle: 'Has 1 flat circular base and 1 pointy vertex at the top',
    color: 0xF59E0B,
    faces: 2,
    facesDesc: '1 Flat Circle + 1 Curved',
    flatFaces: 1,
    curvedFaces: 1,
    faceShapes: [
      { name: 'Flat Circle Base', count: 1, shape: 'circle', color: '#F59E0B' },
      { name: 'Curved Sloped Surface', count: 1, shape: 'curved_cone', color: '#D97706' }
    ],
    edges: 1,
    edgesDesc: '1 Curved Edge',
    vertices: 1,
    verticesDesc: '1 Apex (Pointy Tip)',
    examples: ['🎉 Birthday Party Hat', '🍦 Ice Cream Cone', '🚧 Traffic Cone', '🌋 Volcano Peak'],
    tip: 'The sharp tip at the top of a cone is called the Apex or Vertex!',
    createGeom() {
      return new THREE.ConeGeometry(1.4, 2.8, 32);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const r = 1.4, h = 2.8;
      const off = offset * 1.5;

      const base = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mat);
      base.position.set(0, -(h / 2) - off, 0);
      base.rotation.x = Math.PI / 2;
      group.add(base);

      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 32, 1, true), mat);
      cone.position.set(0, off, 0);
      group.add(cone);

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const waffleMat = new THREE.MeshStandardMaterial({
        map: TextureBuilder.createWaffleConeTexture(),
        roughness: 0.6
      });
      const cone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.4, 32), waffleMat);
      cone.rotation.x = Math.PI;
      cone.position.y = -0.5;
      group.add(cone);

      const scoop1Mat = new THREE.MeshStandardMaterial({ color: 0x6EE7B7, roughness: 0.5 });
      const scoop1 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 24), scoop1Mat);
      scoop1.position.y = 0.9;
      group.add(scoop1);

      const scoop2Mat = new THREE.MeshStandardMaterial({ color: 0xFB7185, roughness: 0.5 });
      const scoop2 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 24), scoop2Mat);
      scoop2.position.y = 1.9;
      group.add(scoop2);

      const cherryMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.1 });
      const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), cherryMat);
      cherry.position.y = 2.7;
      group.add(cherry);

      return group;
    },
    getVerticesCoords() {
      return [[0, 1.4, 0]];
    }
  },
  {
    id: 'sphere',
    name: 'Sphere',
    icon: '⚽',
    subtitle: 'A perfectly round 3D shape with no edges or vertices',
    color: 0x3B82F6,
    faces: 1,
    facesDesc: '1 Curved Surface',
    flatFaces: 0,
    curvedFaces: 1,
    faceShapes: [
      { name: 'Continuous Curved Surface', count: 1, shape: 'sphere_surf', color: '#3B82F6' }
    ],
    edges: 0,
    edgesDesc: '0 Edges',
    vertices: 0,
    verticesDesc: '0 Vertices',
    examples: ['⚽ Soccer Ball', '🏀 Basketball', '🔮 Glass Marble', '🍊 Fresh Orange'],
    tip: 'A sphere is the smoothest shape in the universe—it can roll freely in any direction!',
    createGeom() {
      return new THREE.SphereGeometry(1.5, 32, 32);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const r = 1.5;
      const off = offset * 1.2;

      const hemi1 = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat);
      hemi1.position.y = off;
      group.add(hemi1);

      const hemi2 = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat);
      hemi2.position.y = -off;
      group.add(hemi2);

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const bballMat = new THREE.MeshStandardMaterial({
        map: TextureBuilder.createBasketballTexture(),
        roughness: 0.4
      });
      const bball = new THREE.Mesh(new THREE.SphereGeometry(1.5, 36, 36), bballMat);
      group.add(bball);
      return group;
    },
    getVerticesCoords() {
      return [];
    }
  },
  {
    id: 'triangular_prism',
    name: 'Triangular Prism',
    icon: '⛺',
    subtitle: 'Has 2 triangular ends connected by 3 rectangle sides',
    color: 0x8B5CF6,
    faces: 5,
    facesDesc: '2 Triangles + 3 Rectangles',
    flatFaces: 5,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Triangle End', count: 2, shape: 'triangle', color: '#8B5CF6' },
      { name: 'Rectangle Side', count: 3, shape: 'rect', color: '#3B82F6' }
    ],
    edges: 9,
    edgesDesc: '9 Straight Edges',
    vertices: 6,
    verticesDesc: '6 Corner Vertices',
    examples: ['⛺ Camping Tent', '🏠 House Roof', '🍫 Toblerone Chocolate', '🧀 Slice of Cheese'],
    tip: 'House roofs are shaped like triangular prisms so rain and snow glide right off!',
    createGeom() {
      return new THREE.CylinderGeometry(1.5, 1.5, 2.6, 3);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const off = offset * 1.5;
      const r = 1.5;
      const h = 2.6;
      const halfH = h / 2;

      function makeTriangle(p0, p1, p2) {
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array([
          p0[0], p0[1], p0[2],
          p1[0], p1[1], p1[2],
          p2[0], p2[1], p2[2]
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geom.computeVertexNormals();
        return new THREE.Mesh(geom, mat);
      }

      // Vertices around Y axis for 3 corners
      const v = [];
      for (let i = 0; i < 3; i++) {
        const ang = (i * 2 * Math.PI) / 3;
        v.push([r * Math.sin(ang), r * Math.cos(ang)]);
      }

      // 1. Top Triangle Face (moves up +Y)
      const topMesh = makeTriangle(
        [v[0][0], halfH, v[0][1]],
        [v[1][0], halfH, v[1][1]],
        [v[2][0], halfH, v[2][1]]
      );
      topMesh.position.y = off;
      group.add(topMesh);

      // 2. Bottom Triangle Face (moves down -Y)
      const btmMesh = makeTriangle(
        [v[0][0], -halfH, v[0][1]],
        [v[2][0], -halfH, v[2][1]],
        [v[1][0], -halfH, v[1][1]]
      );
      btmMesh.position.y = -off;
      group.add(btmMesh);

      // 3. Three Rectangular Side Faces
      const edges = [
        [v[0], v[1]],
        [v[1], v[2]],
        [v[2], v[0]]
      ];

      edges.forEach(([pA, pB]) => {
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array([
          pA[0], -halfH, pA[1],
          pB[0], -halfH, pB[1],
          pB[0],  halfH, pB[1],

          pA[0], -halfH, pA[1],
          pB[0],  halfH, pB[1],
          pA[0],  halfH, pA[1]
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geom.computeVertexNormals();

        const sideMesh = new THREE.Mesh(geom, mat);
        const midX = (pA[0] + pB[0]) / 2;
        const midZ = (pA[1] + pB[1]) / 2;
        const len = Math.hypot(midX, midZ);
        const nx = midX / len;
        const nz = midZ / len;

        sideMesh.position.set(nx * off, 0, nz * off);
        group.add(sideMesh);
      });

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const tentMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.5 });
      const tent = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 2.8, 3), tentMat);
      tent.rotation.z = Math.PI / 2;
      group.add(tent);

      const doorMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24 });
      const door = new THREE.Mesh(new THREE.CircleGeometry(0.7, 3), doorMat);
      door.position.set(1.42, 0, 0);
      door.rotation.y = Math.PI / 2;
      group.add(door);

      return group;
    },
    getVerticesCoords() {
      const r = 1.5, h = 1.3;
      const coords = [];
      for (let i = 0; i < 3; i++) {
        const ang = (i * 2 * Math.PI) / 3;
        const x = r * Math.sin(ang);
        const z = r * Math.cos(ang);
        coords.push([x, h, z]);
        coords.push([x, -h, z]);
      }
      return coords;
    }
  },
  {
    id: 'square_pyramid',
    name: 'Square Pyramid',
    icon: '🏛️',
    subtitle: 'Has 1 square base with 4 triangular faces meeting at the top',
    color: 0x14B8A6,
    faces: 5,
    facesDesc: '1 Square Base + 4 Triangles',
    flatFaces: 5,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Square Base', count: 1, shape: 'square', color: '#14B8A6' },
      { name: 'Triangle Slant', count: 4, shape: 'triangle', color: '#F59E0B' }
    ],
    edges: 8,
    edgesDesc: '8 Straight Edges',
    vertices: 5,
    verticesDesc: '5 Corner Vertices',
    examples: ['🏜️ Great Pyramid of Giza', '🛖 Teepee Tent', '🏮 Lantern Cover', '🔺 Metronome'],
    tip: 'Ancient Egyptian pyramids have stood strong for thousands of years thanks to their wide, stable square base!',
    createGeom() {
      return new THREE.ConeGeometry(1.8, 2.4, 4);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const off = offset * 1.5;
      const d = 1.273; // half-width of base
      const h = 1.2;   // half-height (apex at +h, base at -h)

      function makeTriangle(p0, p1, p2) {
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array([
          p0[0], p0[1], p0[2],
          p1[0], p1[1], p1[2],
          p2[0], p2[1], p2[2]
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geom.computeVertexNormals();
        return new THREE.Mesh(geom, mat);
      }

      // 1. Square Base (moves down along -Y)
      const baseGeom = new THREE.PlaneGeometry(d * 2, d * 2);
      const baseMesh = new THREE.Mesh(baseGeom, mat);
      baseMesh.rotation.x = Math.PI / 2;
      baseMesh.position.set(0, -h - off, 0);
      group.add(baseMesh);

      // 2. Four Triangular Faces
      const apex = [0, h, 0];
      const c = [
        [-d, -h,  d], // Front-Left
        [ d, -h,  d], // Front-Right
        [ d, -h, -d], // Back-Right
        [-d, -h, -d]  // Back-Left
      ];

      // Normal vector calculation for slanted faces
      const totalH = h * 2;
      const slantLen = Math.hypot(d, totalH);
      const ny = d / slantLen;
      const nz = totalH / slantLen;

      const faces = [
        { pA: c[0], pB: c[1], n: [0, ny, nz] },    // Front
        { pA: c[1], pB: c[2], n: [nz, ny, 0] },    // Right
        { pA: c[2], pB: c[3], n: [0, ny, -nz] },   // Back
        { pA: c[3], pB: c[0], n: [-nz, ny, 0] }    // Left
      ];

      faces.forEach(({ pA, pB, n }) => {
        const tri = makeTriangle(pA, pB, apex);
        tri.position.set(n[0] * off, n[1] * off, n[2] * off);
        group.add(tri);
      });

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const stoneMat = new THREE.MeshStandardMaterial({
        color: 0xD97706,
        roughness: 0.8
      });
      const pyr = new THREE.Mesh(new THREE.ConeGeometry(2.0, 2.5, 4), stoneMat);
      pyr.rotation.y = Math.PI / 4;
      group.add(pyr);

      const goldMat = new THREE.MeshStandardMaterial({ color: 0xFCD34D, metalness: 0.8, roughness: 0.2 });
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.8, 4), goldMat);
      cap.position.y = 0.88;
      cap.rotation.y = Math.PI / 4;
      group.add(cap);

      return group;
    },
    getVerticesCoords() {
      const h = 1.2, d = 1.27;
      return [
        [0, h, 0],
        [-d, -h, -d], [d, -h, -d], [d, -h, d], [-d, -h, d]
      ];
    }
  },
  {
    id: 'triangular_pyramid',
    name: 'Triangular Pyramid (Tetrahedron)',
    icon: '🔺',
    subtitle: 'Has 4 triangular faces meeting at 4 corner vertices',
    color: 0xEC4899,
    faces: 4,
    facesDesc: '4 Flat Triangles (1 Base + 3 Sides)',
    flatFaces: 4,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Equilateral Triangle', count: 4, shape: 'triangle', color: '#EC4899' }
    ],
    edges: 6,
    edgesDesc: '6 Straight Edges',
    vertices: 4,
    verticesDesc: '4 Corner Vertices',
    examples: ['🍵 Pyramid Tea Bag', '🔺 Pyraminx Puzzle', '⛺ Tripod Tent', '🎲 4-Sided Die'],
    tip: 'A triangular pyramid is called a tetrahedron! Every single one of its 4 faces is an equilateral triangle!',
    createGeom() {
      return new THREE.ConeGeometry(1.8, 2.4, 3);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const off = offset * 1.5;
      const r = 1.8;
      const h = 1.2;
      const apex = [0, h, 0];

      const c = [];
      for (let i = 0; i < 3; i++) {
        const ang = (i * 2 * Math.PI) / 3;
        c.push([r * Math.sin(ang), -h, r * Math.cos(ang)]);
      }

      function makeTriangle(p0, p1, p2) {
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array([
          p0[0], p0[1], p0[2],
          p1[0], p1[1], p1[2],
          p2[0], p2[1], p2[2]
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geom.computeVertexNormals();
        return new THREE.Mesh(geom, mat);
      }

      // 1. Triangular Base Face (moves down -Y)
      const baseMesh = makeTriangle(c[0], c[2], c[1]);
      baseMesh.position.y = -off;
      group.add(baseMesh);

      // 2. Three Slanted Triangular Side Faces
      for (let i = 0; i < 3; i++) {
        const pA = c[i];
        const pB = c[(i + 1) % 3];
        const tri = makeTriangle(pA, pB, apex);

        const midX = (pA[0] + pB[0]) / 2;
        const midZ = (pA[2] + pB[2]) / 2;
        const totalH = h * 2;
        const radLen = Math.hypot(midX, midZ);
        const slantLen = Math.hypot(radLen, totalH);

        const ny = radLen / slantLen;
        const nRadial = totalH / slantLen;
        const nx = (midX / radLen) * nRadial;
        const nz = (midZ / radLen) * nRadial;

        tri.position.set(nx * off, ny * off, nz * off);
        group.add(tri);
      }

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      // Pyramid Tea Bag
      const bagMat = new THREE.MeshStandardMaterial({
        color: 0xFEF3C7,
        roughness: 0.6,
        transparent: true,
        opacity: 0.9
      });
      const bag = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2.4, 3), bagMat);
      group.add(bag);

      // Tea leaves core inside
      const teaMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.9 });
      const teaCore = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.4, 3), teaMat);
      teaCore.position.y = -0.4;
      group.add(teaCore);

      // String from apex
      const stringGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
      const stringMat = new THREE.MeshBasicMaterial({ color: 0xE2E8F0 });
      const string = new THREE.Mesh(stringGeom, stringMat);
      string.position.set(0.2, 1.8, 0.2);
      string.rotation.z = -0.4;
      group.add(string);

      // Paper tag
      const tagGeom = new THREE.BoxGeometry(0.35, 0.45, 0.02);
      const tagMat = new THREE.MeshStandardMaterial({ color: 0xDC2626 });
      const tag = new THREE.Mesh(tagGeom, tagMat);
      tag.position.set(0.5, 2.3, 0.3);
      tag.rotation.z = -0.3;
      group.add(tag);

      return group;
    },
    getVerticesCoords() {
      const r = 1.8, h = 1.2;
      const coords = [[0, h, 0]];
      for (let i = 0; i < 3; i++) {
        const ang = (i * 2 * Math.PI) / 3;
        coords.push([r * Math.sin(ang), -h, r * Math.cos(ang)]);
      }
      return coords;
    }
  },
  {
    id: 'hexagonal_prism',
    name: 'Hexagonal Prism',
    icon: '✏️',
    subtitle: 'Has 2 hexagon ends connected by 6 rectangle sides',
    color: 0xEAB308,
    faces: 8,
    facesDesc: '2 Hexagons + 6 Rectangles',
    flatFaces: 8,
    curvedFaces: 0,
    faceShapes: [
      { name: 'Hexagon Base', count: 2, shape: 'hexagon', color: '#EAB308' },
      { name: 'Rectangle Side', count: 6, shape: 'rect', color: '#F97316' }
    ],
    edges: 18,
    edgesDesc: '18 Straight Edges',
    vertices: 12,
    verticesDesc: '12 Corner Vertices',
    examples: ['✏️ Wooden Pencil', '🔩 Hex Nut / Bolt', '🍯 Honeycomb Cell', '💎 Beryl Crystal'],
    tip: 'Pencils are made in hexagonal prisms so they do not roll off your desk easily!',
    createGeom() {
      return new THREE.CylinderGeometry(1.4, 1.4, 3.0, 6);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const off = offset * 1.5;
      const r = 1.4;
      const h = 3.0;
      const halfH = h / 2;

      // 1. Top Hexagon Cap (moves up +Y)
      const topCap = new THREE.Mesh(new THREE.CircleGeometry(r, 6), mat);
      topCap.rotation.x = -Math.PI / 2;
      topCap.position.set(0, halfH + off, 0);
      group.add(topCap);

      // 2. Bottom Hexagon Cap (moves down -Y)
      const btmCap = new THREE.Mesh(new THREE.CircleGeometry(r, 6), mat);
      btmCap.rotation.x = Math.PI / 2;
      btmCap.position.set(0, -halfH - off, 0);
      group.add(btmCap);

      // 3. Six Rectangular Side Walls
      const d = r * Math.cos(Math.PI / 6);
      const sideW = 2 * r * Math.sin(Math.PI / 6);

      for (let i = 0; i < 6; i++) {
        const phi = (i * 2 * Math.PI) / 6 + Math.PI / 6;
        const nx = Math.cos(phi);
        const nz = Math.sin(phi);

        const wall = new THREE.Mesh(new THREE.PlaneGeometry(sideW, h), mat);
        wall.position.set(nx * (d + off), 0, nz * (d + off));
        wall.rotation.y = -phi + Math.PI / 2;
        group.add(wall);
      }

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.3 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 3.0, 6), bodyMat);
      group.add(body);

      const woodMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, roughness: 0.7 });
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.2, 24), woodMat);
      tip.position.y = 2.1;
      group.add(tip);

      const leadMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.2 });
      const lead = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.45, 24), leadMat);
      lead.position.y = 2.5;
      group.add(lead);

      const ferruleMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8, roughness: 0.2 });
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.5, 24), ferruleMat);
      ferrule.position.y = -1.75;
      group.add(ferrule);

      const eraserMat = new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.5 });
      const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.5, 24), eraserMat);
      eraser.position.y = -2.25;
      group.add(eraser);

      return group;
    },
    getVerticesCoords() {
      const r = 1.4, h = 1.5;
      const coords = [];
      for (let i = 0; i < 6; i++) {
        const ang = (i * 2 * Math.PI) / 6;
        const x = r * Math.sin(ang);
        const z = r * Math.cos(ang);
        coords.push([x, h, z]);
        coords.push([x, -h, z]);
      }
      return coords;
    }
  }
];

// App State
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

// Three.js Globals
let scene, camera, renderer, controls;
let shapeGroup = null;
let currentMesh = null;
let edgesLine = null;
let vertexGroup = null;
let gridHelper = null;

// Initialize 3D Engine
function initThree() {
  const canvas = document.getElementById('webglCanvas');
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
  sound.playPop();
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
  sound.playPop();
  isGridVisible = !isGridVisible;
  if (gridHelper) {
    gridHelper.visible = isGridVisible;
  }
  const btn = document.getElementById('btnToggleGrid');
  const status = document.getElementById('gridStatus');
  btn.classList.toggle('active', isGridVisible);
  status.textContent = isGridVisible ? 'ON' : 'OFF';
}

// Render 11 Shape Buttons
function renderShapeShelf() {
  const shelf = document.getElementById('shapesShelf');
  shelf.innerHTML = '';

  SHAPES_DATA.forEach((s, idx) => {
    const chip = document.createElement('button');
    chip.className = `shape-chip ${idx === currentShapeIndex ? 'active' : ''}`;
    chip.innerHTML = `
      <span class="chip-icon">${s.icon}</span>
      <span class="chip-name">${s.name}</span>
    `;
    chip.onclick = () => {
      sound.playPop();
      selectShape(idx);
    };
    shelf.appendChild(chip);
  });
}

// Select Shape
function selectShape(idx) {
  currentShapeIndex = idx;
  const shape = SHAPES_DATA[idx];

  document.querySelectorAll('.shape-chip').forEach((chip, i) => {
    chip.classList.toggle('active', i === idx);
  });

  while (shapeGroup.children.length > 0) {
    const obj = shapeGroup.children[0];
    shapeGroup.remove(obj);
  }

  const explodeCard = document.getElementById('explodeSliderCard');
  if (displayMode === 'real') {
    explodeCard.style.display = 'none';
  } else {
    explodeCard.style.display = 'flex';
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
      side: THREE.DoubleSide // BOTH SIDES VISIBLE - Never disappears when rotated!
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

  shapeGroup.add(currentMesh);
  setupHighlights(shape);
  updateDetailsCard(shape);
}

// Highlights Setup
function setupHighlights(shape) {
  if (vertexGroup) shapeGroup.remove(vertexGroup);
  vertexGroup = new THREE.Group();

  const coords = shape.getVerticesCoords();
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
  shapeGroup.add(vertexGroup);

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

// Helper to render SVG illustrations for face shapes
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

// Update Details Card
function updateDetailsCard(shape) {
  document.getElementById('shapeIcon').textContent = shape.icon;
  document.getElementById('shapeName').textContent = shape.name;
  document.getElementById('shapeSubtitle').textContent = shape.subtitle;

  document.getElementById('propFaces').textContent = shape.faces;
  document.getElementById('propFacesDesc').textContent = shape.facesDesc;

  document.getElementById('propEdges').textContent = shape.edges;
  document.getElementById('propEdgesDesc').textContent = shape.edgesDesc;

  document.getElementById('propVertices').textContent = shape.vertices;
  document.getElementById('propVerticesDesc').textContent = shape.verticesDesc;

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
        item.innerHTML = `
          ${getFaceShapeSvg(fs.shape, fs.color)}
          <span class="face-shape-text">${fs.name}</span>
          <span class="face-shape-count-badge">${fs.count}</span>
        `;
        faceShapesContainer.appendChild(item);
      });
    }
  }

  const exContainer = document.getElementById('examplesList');
  exContainer.innerHTML = '';
  shape.examples.forEach(ex => {
    const tag = document.createElement('span');
    tag.className = 'example-tag';
    tag.textContent = ex;
    exContainer.appendChild(tag);
  });

  document.getElementById('funTipText').textContent = shape.tip;
}

// Display Mode: Geometry vs Real World
function setShapeDisplayMode(mode) {
  sound.playPop();
  displayMode = mode;
  document.getElementById('modeGeomBtn').classList.toggle('active', mode === 'geom');
  document.getElementById('modeRealBtn').classList.toggle('active', mode === 'real');
  selectShape(currentShapeIndex);
}

// Theater / Wide Mode Toggle
function toggleTheaterMode() {
  sound.playPop();
  isTheaterMode = !isTheaterMode;
  const stage = document.getElementById('stageContainer');
  const btn = document.getElementById('btnTheaterMode');
  const icon = document.getElementById('theaterBtnIcon');

  stage.classList.toggle('theater-mode', isTheaterMode);
  btn.classList.toggle('active', isTheaterMode);
  icon.textContent = isTheaterMode ? '🗗' : '⛶';

  setTimeout(onWindowResize, 60);
}

// Color & BG Palette (Expand / Collapse)
let isPaletteCollapsed = true;

function toggleColorPalette() {
  sound.playPop();
  isPaletteCollapsed = !isPaletteCollapsed;
  const panel = document.getElementById('paletteContentPanel');
  const btn = document.getElementById('btnTogglePalette');
  const arrow = document.getElementById('paletteToggleArrow');

  if (panel) {
    panel.classList.toggle('collapsed', isPaletteCollapsed);
  }
  if (btn) {
    btn.classList.toggle('active', !isPaletteCollapsed);
  }
  if (arrow) {
    arrow.textContent = isPaletteCollapsed ? '▸' : '▾';
  }
}

// Auto Rotate
function toggleAutoRotate() {
  sound.playPop();
  isAutoRotating = !isAutoRotating;
  const btn = document.getElementById('btnAutoRotate');
  const status = document.getElementById('autoRotateStatus');
  btn.classList.toggle('active', isAutoRotating);
  status.textContent = isAutoRotating ? 'ON' : 'OFF';
}

function resetCamera() {
  sound.playPop();
  camera.position.set(4.5, 3.2, 5.5);
  controls.target.set(0, 0, 0);
  if (shapeGroup) {
    shapeGroup.rotation.set(0, 0, 0);
  }
}

function toggleHighlightEdges() {
  sound.playPop();
  isHighlightingEdges = !isHighlightingEdges;
  document.getElementById('btnHighlightEdges').classList.toggle('active', isHighlightingEdges);
  applyEdgeHighlight();
}

// Highlight Vertices
function toggleHighlightVertices() {
  sound.playPop();
  isHighlightingVertices = !isHighlightingVertices;
  document.getElementById('btnHighlightVertices').classList.toggle('active', isHighlightingVertices);
  if (vertexGroup) {
    vertexGroup.visible = isHighlightingVertices;
  }
}

// Clean X-Ray Mode
function toggleCleanXRay() {
  sound.playPop();
  isCleanXRay = !isCleanXRay;
  document.getElementById('btnCleanXRay').classList.toggle('active', isCleanXRay);
  selectShape(currentShapeIndex);
}

// Full Wireframe Mesh Mode
function toggleWireframeMesh() {
  sound.playPop();
  isWireframeMesh = !isWireframeMesh;
  document.getElementById('btnWireframeMesh').classList.toggle('active', isWireframeMesh);
  selectShape(currentShapeIndex);
}

function flashHighlight(type) {
  sound.playPop();
  if (type === 'edges') {
    isHighlightingEdges = true;
    document.getElementById('btnHighlightEdges').classList.add('active');
    applyEdgeHighlight();
  } else if (type === 'vertices') {
    isHighlightingVertices = true;
    document.getElementById('btnHighlightVertices').classList.add('active');
    if (vertexGroup) vertexGroup.visible = true;
  }
}

// Explode Faces Slider
function onExplodeSlider(val) {
  explodeVal = parseFloat(val) / 100;
  document.getElementById('explodeValText').textContent = `${val}%`;
  selectShape(currentShapeIndex);
}

// Paint Palette
function setCustomColor(hex, el) {
  sound.playPop();
  currentCustomColor = hex;
  document.querySelectorAll('#colorDots .color-dot').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
  selectShape(currentShapeIndex);
}

// Explorer Mode vs Sorter Mode vs Quiz Mode
function switchMode(mode) {
  sound.playPop();
  document.activeElement?.blur();
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

  if (isExplorer) {
    setTimeout(onWindowResize, 60);
  }
}

// ================= HIGH-QUALITY 3D VECTOR SVG LIBRARY =================
// Returns dedicated, geometrically accurate 3D vector SVG illustrations
// for all 9 solids and real-world objects (replacing inaccurate system emojis).
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

  // Header template
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

    // ---- REAL-WORLD OBJECTS (ACCURATE 3D GEOMETRY) ----
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

// ================= 4 THEMED 5-QUESTION QUIZZES =================
const QUIZ_LEVELS = {
  1: {
    title: 'Quiz 1: Shape Explorer',
    questions: [
      {
        text: 'Which 3D solid shape has 6 identical square faces?',
        visual: '🎲',
        visualId: 'cube',
        options: ['Cube', 'Cylinder', 'Sphere', 'Cone'],
        answer: 0,
        hint: 'A playing dice or Rubik’s cube has 6 matching square faces.'
      },
      {
        text: 'What is the name of a round solid shape with zero edges and zero corners?',
        visual: '⚽',
        visualId: 'sphere',
        options: ['Sphere', 'Rectangular Prism', 'Cone', 'Square Pyramid'],
        answer: 0,
        hint: 'Think of soccer balls, basketballs, and marbles.'
      },
      {
        text: 'Which solid shape has 2 flat circular bases and 1 smooth curved surface?',
        visual: '🥫',
        visualId: 'cylinder',
        options: ['Cylinder', 'Cube', 'Triangular Prism', 'Cone'],
        answer: 0,
        hint: 'Think of a soda can, soup can, or drum.'
      },
      {
        text: 'Which solid has 1 flat circle base and slopes up to a single pointy apex at the top?',
        visual: '🎉',
        visualId: 'cone',
        options: ['Sphere', 'Cone', 'Rectangular Prism', 'Cylinder'],
        answer: 1,
        hint: 'A birthday party hat and a traffic cone are classic cones!'
      },
      {
        text: 'Which 3D shape has 2 triangular end faces connected by 3 rectangle sides?',
        visual: '⛺',
        visualId: 'triangular_prism',
        options: ['Triangular Prism', 'Square Pyramid', 'Triangular Pyramid', 'Cube'],
        answer: 0,
        hint: 'A classic camping tent and a Toblerone chocolate bar are triangular prisms!'
      }
    ]
  },
  2: {
    title: 'Quiz 2: Property Detective',
    questions: [
      {
        text: 'How many corner vertices does a CUBE have in total?',
        visual: '🎲',
        visualId: 'cube',
        options: ['4 Vertices', '6 Vertices', '8 Vertices', '12 Vertices'],
        answer: 2,
        hint: 'Count 4 vertices at the top square and 4 vertices at the bottom square.'
      },
      {
        text: 'How many straight edges does a RECTANGULAR PRISM (Cuboid) have?',
        visual: '🧱',
        visualId: 'cuboid',
        options: ['6 Edges', '8 Edges', '10 Edges', '12 Edges'],
        answer: 3,
        hint: 'Like a brick or cereal box, it has 12 straight edges.'
      },
      {
        text: 'Which 3D shapes have ZERO (0) vertices (no sharp corner points at all)?',
        visual: '🔵',
        visualId: 'cylinder',
        options: ['Cube & Cone', 'Sphere & Cylinder', 'Square Pyramid & Cube', 'Triangular Prism & Cone'],
        answer: 1,
        hint: 'Both the sphere and cylinder have smooth continuous curves with no sharp corners.'
      },
      {
        text: 'How many faces does a SQUARE PYRAMID have in total?',
        visual: '🏛️',
        visualId: 'square_pyramid',
        options: ['3 Faces', '4 Faces', '5 Faces', '6 Faces'],
        answer: 2,
        hint: '1 square base on the bottom + 4 slanted triangular walls = 5 faces.'
      },
      {
        text: 'A TRIANGULAR PYRAMID (Tetrahedron) has 4 vertices and how many triangular faces?',
        visual: '🔺',
        visualId: 'triangular_pyramid',
        options: ['3 Faces', '4 Faces', '5 Faces', '6 Faces'],
        answer: 1,
        hint: 'Every face is an equilateral triangle: 1 base triangle + 3 side triangles = 4 faces.'
      }
    ]
  },
  3: {
    title: 'Quiz 3: Real-World Matcher',
    questions: [
      {
        text: 'A juice box, brick, and textbook are everyday examples of which solid shape?',
        visual: '🧃',
        visualId: 'juice',
        options: ['Rectangular Prism (Cuboid)', 'Sphere', 'Cone', 'Cube'],
        answer: 0,
        hint: 'They have 6 rectangular faces and stack neatly.'
      },
      {
        text: 'A traffic safety cone and a birthday party hat match which 3D geometric solid?',
        visual: '🚧',
        visualId: 'traffic_cone',
        options: ['Cylinder', 'Cone', 'Square Pyramid', 'Cube'],
        answer: 1,
        hint: 'Both have a circular base and slope up to a single pointy tip.'
      },
      {
        text: 'A classic wooden pencil has 2 hexagon ends and 6 rectangular sides. What solid is it?',
        visual: '✏️',
        visualId: 'pencil',
        options: ['Hexagonal Prism', 'Sphere', 'Triangular Prism', 'Cone'],
        answer: 0,
        hint: 'Hexagonal prism has 6 flat sides so it doesn’t easily roll off desks!'
      },
      {
        text: 'A Rubik’s cube puzzle and playing dice are real-world examples of which shape?',
        visual: '🧩',
        visualId: 'rubiks',
        options: ['Cube', 'Sphere', 'Cylinder', 'Rectangular Prism'],
        answer: 0,
        hint: 'All 6 faces are identical squares!'
      },
      {
        text: 'The ancient Egyptian Pyramids in Giza have a square base and 4 triangular sides. What shape are they?',
        visual: '🏜️',
        visualId: 'giza',
        options: ['Triangular Prism', 'Square Pyramid', 'Triangular Pyramid', 'Rectangular Prism'],
        answer: 1,
        hint: 'The wide square base makes a Square Pyramid super sturdy!'
      }
    ]
  },
  4: {
    title: 'Quiz 4: "Who Am I?" Riddles',
    questions: [
      {
        text: '"I have no straight edges, no sharp corners, and I can roll forever in any direction. Who am I?"',
        visual: '⚽',
        visualId: 'soccer',
        options: ['Sphere', 'Cube', 'Cone', 'Cylinder'],
        answer: 0,
        hint: 'Soccer balls, basketballs, and marbles share my shape.'
      },
      {
        text: '"I have 2 flat circular faces and 1 curved body. Stand me on my end and I stay still, roll me on my side. Who am I?"',
        visual: '🥫',
        visualId: 'soda',
        options: ['Cube', 'Cylinder', 'Square Pyramid', 'Cone'],
        answer: 1,
        hint: 'Soup cans and soda cans are great examples.'
      },
      {
        text: '"I have 4 vertices and 4 faces. Every single one of my faces is an equilateral triangle. Pyramid tea bags love me! Who am I?"',
        visual: '🍵',
        visualId: 'teabag',
        options: ['Square Pyramid', 'Triangular Pyramid', 'Triangular Prism', 'Cube'],
        answer: 1,
        hint: 'A 4-faced pyramid is also known as a tetrahedron.'
      },
      {
        text: '"I have 1 flat circular base and 1 sharp pointy apex at the top. Ice cream cones and party hats are made in my shape! Who am I?"',
        visual: '🍦',
        visualId: 'waffle_cone',
        options: ['Cylinder', 'Cone', 'Hexagonal Prism', 'Sphere'],
        answer: 1,
        hint: 'Waffle cones hold ice cream deliciously.'
      },
      {
        text: '"I have 2 hexagon faces connected by 6 flat rectangle sides. Wooden pencils use my shape so they don’t roll off your desk. Who am I?"',
        visual: '✏️',
        visualId: 'hexagonal_prism',
        options: ['Hexagonal Prism', 'Triangular Prism', 'Rectangular Prism', 'Cylinder'],
        answer: 0,
        hint: 'Count the 6 rectangular sides connecting the two hexagon ends.'
      }
    ]
  }
};

let currentQuizLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;

function startQuizWithLevel(level) {
  sound.playPop();
  currentQuizLevel = level;
  currentQuestionIndex = 0;
  currentScore = 0;

  document.getElementById('quizLevelSelect').classList.add('hidden');
  document.getElementById('quizEndCard').classList.add('hidden');
  document.getElementById('quizActiveCard').classList.remove('hidden');

  document.getElementById('quizLevelTitle').textContent = QUIZ_LEVELS[level].title;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  const q = quiz.questions[currentQuestionIndex];

  document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
  document.getElementById('liveScore').textContent = currentScore;

  const pct = (currentQuestionIndex / quiz.questions.length) * 100;
  document.getElementById('quizProgressFill').style.width = `${pct}%`;

  // Render dedicated high-quality vector illustration
  document.getElementById('questionVisual').innerHTML = getShapeOrObjectSvg(q.visualId || q.visual, 80);
  document.getElementById('questionText').textContent = q.text;

  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';

  const feedback = document.getElementById('quizFeedback');
  feedback.className = 'quiz-feedback hidden';

  const nextBtn = document.getElementById('btnNextQuestion');
  if (nextBtn) nextBtn.classList.add('hidden');

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = optText;
    btn.onclick = () => handleQuizAnswer(optIdx, btn);
    optContainer.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIdx, clickedBtn) {
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  const q = quiz.questions[currentQuestionIndex];
  const allBtns = document.querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  const feedback = document.getElementById('quizFeedback');
  feedback.classList.remove('hidden');

  if (selectedIdx === q.answer) {
    sound.playCorrect();
    clickedBtn.classList.add('correct');
    currentScore += 20;
    document.getElementById('liveScore').textContent = currentScore;
    feedback.className = 'quiz-feedback correct';
    feedback.textContent = `🌟 AWESOME! That is correct! ${q.hint ? '💡 ' + q.hint : ''}`;

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
    }
  } else {
    sound.playWrong();
    clickedBtn.classList.add('wrong');
    allBtns[q.answer].classList.add('correct');
    feedback.className = 'quiz-feedback wrong';
    feedback.textContent = `💡 Correct answer: "${q.options[q.answer]}". ${q.hint}`;
  }

  // Show Next Question button instead of auto-advancing
  const nextBtn = document.getElementById('btnNextQuestion');
  if (nextBtn) {
    const isLast = currentQuestionIndex === quiz.questions.length - 1;
    nextBtn.textContent = isLast ? 'See Final Results 🏆' : 'Next Question ➡️';
    nextBtn.classList.remove('hidden');
  }
}

function onNextQuizQuestion() {
  sound.playPop();
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.questions.length) {
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  sound.playFanfare();
  document.getElementById('quizActiveCard').classList.add('hidden');
  document.getElementById('quizEndCard').classList.remove('hidden');

  document.getElementById('finalScoreVal').textContent = currentScore;

  let stars = '⭐⭐⭐⭐⭐';
  let title = 'Awesome Job, Shape Champion!';
  let msg = 'Outstanding! You mastered all 5 questions on this challenge.';

  if (currentScore <= 40) {
    stars = '⭐⭐';
    title = 'Keep Going, You Can Do It!';
    msg = 'Good practice! Explore the 3D shapes again and give it another try!';
  } else if (currentScore <= 80) {
    stars = '⭐⭐⭐⭐';
    title = 'Super High Score!';
    msg = 'Almost perfect! You understand 3D solids very well.';
  }

  document.getElementById('finalStars').textContent = stars;
  document.getElementById('quizEndTitle').textContent = title;
  document.getElementById('quizEndMessage').textContent = msg;

  if (typeof confetti === 'function') {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  }
}

function retryCurrentQuiz() {
  startQuizWithLevel(currentQuizLevel);
}

function returnToQuizSelect() {
  sound.playPop();
  document.getElementById('quizEndCard').classList.add('hidden');
  document.getElementById('quizActiveCard').classList.add('hidden');
  document.getElementById('quizLevelSelect').classList.remove('hidden');
}

// ================= SHAPE SORTER LAB GAME ENGINE =================
const SORTER_GAMES = {
  1: {
    id: 1,
    title: 'Game 1: Can It Roll or Stack?',
    instructions: 'Sort items into their movement baskets: Roll Only, Roll & Stack/Slide, or Stack & Slide Only!',
    bins: [
      { id: 'roll', label: 'Can Roll Only', sub: 'Curved Surface Only', color: '#3B82F6', icon: '🌀' },
      { id: 'both', label: 'Can Roll & Stack / Slide', sub: 'Curved + Flat Faces', color: '#10B981', icon: '🔄' },
      { id: 'stack', label: 'Can Stack & Slide Only', sub: 'Flat Faces Only', color: '#8B5CF6', icon: '🧱' }
    ],
    items: [
      { id: 'soccer', name: 'Soccer Ball (Sphere)', icon: '⚽', bin: 'roll', hint: 'A sphere has only 1 smooth curved surface—it rolls in any direction!' },
      { id: 'bball', name: 'Basketball (Sphere)', icon: '🏀', bin: 'roll', hint: 'A sphere rolls freely because it has no flat faces!' },
      { id: 'marble', name: 'Glass Marble (Sphere)', icon: '🔮', bin: 'roll', hint: 'Smooth spherical marble rolls continuously!' },
      { id: 'soda', name: 'Soda Can (Cylinder)', icon: '🥫', bin: 'both', hint: 'Rolls on its round curved side, and stacks on its flat circular ends!' },
      { id: 'drum', name: 'Snare Drum (Cylinder)', icon: '🥁', bin: 'both', hint: 'Rolls on its side and stacks flat on drumheads!' },
      { id: 'traffic_cone', name: 'Traffic Cone (Cone)', icon: '🚧', bin: 'both', hint: 'Rolls in circles on its slanted side, and stands stable on its flat circular base!' },
      { id: 'partyhat', name: 'Party Hat (Cone)', icon: '🎉', bin: 'both', hint: 'Stands on its flat round opening and rolls in a loop on its side!' },
      { id: 'waffle_cone', name: 'Waffle Cone (Cone)', icon: '🍦', bin: 'both', hint: 'Rolls on its conical side and stands on its flat opening!' },
      { id: 'dice', name: 'Playing Dice (Cube)', icon: '🎲', bin: 'stack', hint: 'With 6 flat square faces, cubes stack and slide without rolling!' },
      { id: 'rubiks', name: 'Rubik\'s Cube (Cube)', icon: '🧩', bin: 'stack', hint: 'Flat square faces make it slide and stack easily!' },
      { id: 'juice', name: 'Juice Box (Rectangular Prism)', icon: '🧃', bin: 'stack', hint: 'Flat rectangle faces stack neatly on pantry shelves!' },
      { id: 'brick', name: 'Building Brick (Rectangular Prism)', icon: '🧱', bin: 'stack', hint: '6 flat rectangular faces stack strongly in brick walls!' },
      { id: 'tent', name: 'Camping Tent (Triangular Prism)', icon: '⛺', bin: 'stack', hint: 'Flat triangles and rectangular sides slide and sit flat on the ground!' },
      { id: 'giza', name: 'Egyptian Pyramid (Square Pyramid)', icon: '🏜️', bin: 'stack', hint: 'Wide flat square base sits firmly on the desert sand!' },
      { id: 'teabag', name: 'Pyramid Tea Bag (Triangular Pyramid)', icon: '🍵', bin: 'stack', hint: '4 flat equilateral triangle faces sit flat and slide!' },
      { id: 'pencil', name: 'Wooden Pencil (Hexagonal Prism)', icon: '✏️', bin: 'stack', hint: 'Flat hexagon ends and 6 flat rectangular facets resist rolling!' }
    ]
  },
  2: {
    id: 2,
    title: 'Game 2: Flat Faces vs. Curved Surfaces',
    instructions: 'Sort shapes by their surface geometry: Flat Faces Only, Both, or Curved Only!',
    bins: [
      { id: 'flat_only', label: 'Flat Faces Only', sub: '0 Curved Surfaces', color: '#8B5CF6', icon: '🔲' },
      { id: 'both_surfaces', label: 'Flat & Curved Surfaces', sub: 'Flat Bases + Curved Body', color: '#10B981', icon: '🔄' },
      { id: 'curved_only', label: 'Curved Surface Only', sub: '0 Flat Faces', color: '#06B6D4', icon: '🔵' }
    ],
    items: [
      { id: 'cube_item', name: 'Playing Dice (Cube)', icon: '🎲', bin: 'flat_only', hint: 'Has 6 flat square faces and 0 curved surfaces!' },
      { id: 'rubiks_item', name: 'Rubik\'s Cube (Cube)', icon: '🧩', bin: 'flat_only', hint: 'All 6 faces are completely flat squares!' },
      { id: 'juice_item', name: 'Juice Box (Rectangular Prism)', icon: '🧃', bin: 'flat_only', hint: 'Has 6 flat rectangular faces!' },
      { id: 'brick_item', name: 'Building Brick (Rectangular Prism)', icon: '🧱', bin: 'flat_only', hint: 'Every single face of a cuboid is a flat rectangle!' },
      { id: 'tent_item', name: 'Camping Tent (Triangular Prism)', icon: '⛺', bin: 'flat_only', hint: 'Has 2 flat triangles and 3 flat rectangles!' },
      { id: 'giza_item', name: 'Egyptian Pyramid (Square Pyramid)', icon: '🏜️', bin: 'flat_only', hint: 'Has 1 flat square base and 4 flat triangles!' },
      { id: 'teabag_item', name: 'Pyramid Tea Bag (Triangular Pyramid)', icon: '🍵', bin: 'flat_only', hint: 'All 4 faces are flat equilateral triangles!' },
      { id: 'pencil_item', name: 'Wooden Pencil (Hexagonal Prism)', icon: '✏️', bin: 'flat_only', hint: 'Has 2 flat hexagons and 6 flat rectangles!' },
      { id: 'soda_item', name: 'Soda Can (Cylinder)', icon: '🥫', bin: 'both_surfaces', hint: 'Has 2 flat circular bases AND 1 smooth curved body!' },
      { id: 'drum_item', name: 'Snare Drum (Cylinder)', icon: '🥁', bin: 'both_surfaces', hint: 'Flat top/bottom heads with a curved cylinder body!' },
      { id: 'traffic_item', name: 'Traffic Cone (Cone)', icon: '🚧', bin: 'both_surfaces', hint: 'Has 1 flat circular base AND 1 curved sloped surface!' },
      { id: 'hat_item', name: 'Party Hat (Cone)', icon: '🎉', bin: 'both_surfaces', hint: 'Has a flat circular opening and 1 curved cone surface!' },
      { id: 'waffle_item', name: 'Waffle Cone (Cone)', icon: '🍦', bin: 'both_surfaces', hint: 'Flat round top with curved conical wrap!' },
      { id: 'soccer_item', name: 'Soccer Ball (Sphere)', icon: '⚽', bin: 'curved_only', hint: 'Has only 1 continuous curved surface and 0 flat faces!' },
      { id: 'orange_item', name: 'Fresh Orange (Sphere)', icon: '🍊', bin: 'curved_only', hint: 'Completely curved sphere with zero flat faces!' }
    ]
  },
  3: {
    id: 3,
    title: 'Game 3: Pointy vs. Smooth',
    instructions: 'Does the shape have sharp corner vertices, or is it completely smooth (0 vertices)?',
    bins: [
      { id: 'pointy', label: 'Has Sharp Vertices', sub: 'Corner Points or Apex', color: '#EC4899', icon: '✨' },
      { id: 'smooth', label: '0 Vertices (Smooth)', sub: 'Zero Corner Points', color: '#0EA5E9', icon: '🌊' }
    ],
    items: [
      { id: 'dice_v', name: 'Playing Dice (Cube)', icon: '🎲', bin: 'pointy', hint: 'A cube has 8 sharp corner vertices!' },
      { id: 'rubiks_v', name: 'Rubik\'s Cube (Cube)', icon: '🧩', bin: 'pointy', hint: 'Has 8 corner vertices!' },
      { id: 'juice_v', name: 'Juice Box (Rectangular Prism)', icon: '🧃', bin: 'pointy', hint: 'A rectangular prism has 8 sharp corner vertices!' },
      { id: 'brick_v', name: 'Building Brick (Rectangular Prism)', icon: '🧱', bin: 'pointy', hint: 'Has 8 corner vertices!' },
      { id: 'cone_v', name: 'Traffic Cone (Cone)', icon: '🚧', bin: 'pointy', hint: 'The pointy tip at the top of a cone is an apex vertex!' },
      { id: 'hat_v', name: 'Party Hat (Cone)', icon: '🎉', bin: 'pointy', hint: 'Has 1 sharp apex vertex at the very top!' },
      { id: 'tent_v', name: 'Camping Tent (Triangular Prism)', icon: '⛺', bin: 'pointy', hint: 'Has 6 sharp corner vertices (3 at each triangle end)!' },
      { id: 'giza_v', name: 'Egyptian Pyramid (Square Pyramid)', icon: '🏜️', bin: 'pointy', hint: 'Has 5 vertices: 4 at the square base + 1 apex on top!' },
      { id: 'tea_v', name: 'Pyramid Tea Bag (Triangular Pyramid)', icon: '🍵', bin: 'pointy', hint: 'Has 4 sharp corner vertices!' },
      { id: 'pencil_v', name: 'Wooden Pencil (Hexagonal Prism)', icon: '✏️', bin: 'pointy', hint: 'Has 12 corner vertices (6 on each hexagon base)!' },
      { id: 'soccer_v', name: 'Soccer Ball (Sphere)', icon: '⚽', bin: 'smooth', hint: 'A sphere is completely round with 0 sharp corners!' },
      { id: 'bball_v', name: 'Basketball (Sphere)', icon: '🏀', bin: 'smooth', hint: '0 vertices—smooth all around!' },
      { id: 'orange_v', name: 'Fresh Orange (Sphere)', icon: '🍊', bin: 'smooth', hint: 'Round spherical fruit with zero corners!' },
      { id: 'soda_v', name: 'Soda Can (Cylinder)', icon: '🥫', bin: 'smooth', hint: 'A cylinder has 2 curved edges but 0 sharp corner points!' },
      { id: 'drum_v', name: 'Snare Drum (Cylinder)', icon: '🥁', bin: 'smooth', hint: 'Smooth circular rims with zero sharp vertices!' }
    ]
  },
  4: {
    id: 4,
    title: 'Game 4: Real-World Sorter (Part 1)',
    instructions: 'Match everyday objects to Cube, Rectangular Prism, Cylinder, Cone, and Sphere!',
    bins: [
      { id: 'cube', label: 'Cube Basket', sub: '6 Equal Squares', color: '#6366F1', icon: '🎲' },
      { id: 'cuboid', label: 'Rectangular Prism', sub: '6 Rectangles', color: '#EC4899', icon: '🧃' },
      { id: 'cylinder', label: 'Cylinder Basket', sub: '2 Circles + Curved', color: '#10B981', icon: '🥫' },
      { id: 'cone', label: 'Cone Basket', sub: '1 Circle + Apex Tip', color: '#F59E0B', icon: '🚧' },
      { id: 'sphere', label: 'Sphere Basket', sub: 'Round Ball Shape', color: '#3B82F6', icon: '⚽' }
    ],
    items: [
      { id: 'dice_rw', name: 'Playing Dice', icon: '🎲', bin: 'cube', hint: '6 equal square faces make a cube!' },
      { id: 'rubiks_rw', name: 'Rubik\'s Cube', icon: '🧩', bin: 'cube', hint: 'A 3x3 puzzle cube!' },
      { id: 'icecube_rw', name: 'Frozen Ice Cube', icon: '🧊', bin: 'cube', hint: 'Square frozen ice cube!' },
      { id: 'giftbox_rw', name: 'Gift Box', icon: '🎁', bin: 'cube', hint: 'A square package box is a cube!' },
      { id: 'juice_rw', name: 'Juice Box', icon: '🧃', bin: 'cuboid', hint: '6 rectangle faces make a rectangular prism!' },
      { id: 'brick_rw', name: 'Building Brick', icon: '🧱', bin: 'cuboid', hint: 'A brick is a classic rectangular prism (cuboid)!' },
      { id: 'book_rw', name: 'Textbook', icon: '📚', bin: 'cuboid', hint: 'A book has 6 flat rectangular faces!' },
      { id: 'eraser_rw', name: 'Chalkboard Eraser', icon: '🧽', bin: 'cuboid', hint: 'Box-shaped rectangular prism!' },
      { id: 'soda_rw', name: 'Soda Can', icon: '🥫', bin: 'cylinder', hint: '2 circular ends and a curved body = cylinder!' },
      { id: 'drum_rw', name: 'Snare Drum', icon: '🥁', bin: 'cylinder', hint: 'Round body with flat circular heads is a cylinder!' },
      { id: 'roll_rw', name: 'Paper Towel Roll', icon: '🧻', bin: 'cylinder', hint: 'A round roll is a cylinder!' },
      { id: 'battery_rw', name: 'AA Battery', icon: '🔋', bin: 'cylinder', hint: 'Cylindrical metal battery cell!' },
      { id: 'traffic_rw', name: 'Traffic Cone', icon: '🚧', bin: 'cone', hint: 'Pointy safety cone with a circular base!' },
      { id: 'partyhat_rw', name: 'Birthday Party Hat', icon: '🎉', bin: 'cone', hint: 'Pointy party hat is a classic cone!' },
      { id: 'waffle_rw', name: 'Waffle Cone', icon: '🍦', bin: 'cone', hint: 'Cone shape holding delicious ice cream!' },
      { id: 'soccer_rw', name: 'Soccer Ball', icon: '⚽', bin: 'sphere', hint: 'Completely round ball that rolls in any direction!' },
      { id: 'bball_rw', name: 'Basketball', icon: '🏀', bin: 'sphere', hint: 'A basketball is a perfect sphere!' },
      { id: 'orange_rw', name: 'Fresh Orange', icon: '🍊', bin: 'sphere', hint: 'Round sphere fruit!' },
      { id: 'globe_rw', name: 'Earth Globe', icon: '🌍', bin: 'sphere', hint: 'Spherical planetary globe!' }
    ]
  },
  5: {
    id: 5,
    title: 'Game 5: Real-World Sorter (Part 2)',
    instructions: 'Match everyday objects to Triangular Prism, Square Pyramid, Triangular Pyramid, and Hexagonal Prism!',
    bins: [
      { id: 'tri_prism', label: 'Triangular Prism', sub: '2 Triangles + 3 Rectangles', color: '#8B5CF6', icon: '⛺' },
      { id: 'square_pyr', label: 'Square Pyramid', sub: '1 Square Base + 4 Triangles', color: '#14B8A6', icon: '🏛️' },
      { id: 'tri_pyr', label: 'Triangular Pyramid', sub: '4 Triangles (Tetrahedron)', color: '#EC4899', icon: '🔺' },
      { id: 'hex_prism', label: 'Hexagonal Prism', sub: '2 Hexagons + 6 Rectangles', color: '#EAB308', icon: '✏️' }
    ],
    items: [
      { id: 'tent_p', name: 'Camping Tent', icon: '⛺', bin: 'tri_prism', hint: 'Triangular ends with rectangular floor and roof!' },
      { id: 'roof_p', name: 'House Roof', icon: '🏠', bin: 'tri_prism', hint: 'Triangular prism shape lets rain glide off!' },
      { id: 'toblerone_p', name: 'Toblerone Chocolate', icon: '🍫', bin: 'tri_prism', hint: 'Famous Swiss triangular prism chocolate bar!' },
      { id: 'cheese_p', name: 'Cheese Wedge', icon: '🧀', bin: 'tri_prism', hint: 'Wedge of cheese is a triangular prism!' },
      { id: 'giza_p', name: 'Great Pyramid of Giza', icon: '🏜️', bin: 'square_pyr', hint: 'Wide square base with 4 triangular faces!' },
      { id: 'teepee_p', name: 'Teepee Tent', icon: '🛖', bin: 'square_pyr', hint: 'Pyramid tent with 4 triangular walls!' },
      { id: 'lantern_p', name: 'Lantern Cover', icon: '🏮', bin: 'square_pyr', hint: 'Square base pyramid lantern!' },
      { id: 'teabag_p', name: 'Pyramid Tea Bag', icon: '🍵', bin: 'tri_pyr', hint: 'Has 4 equilateral triangle sides—a true tetrahedron!' },
      { id: 'pyraminx_p', name: 'Pyraminx Puzzle', icon: '🔺', bin: 'tri_pyr', hint: 'Triangle puzzle pyramid with 4 triangular faces!' },
      { id: 'die4_p', name: '4-Sided Die', icon: '🎲', bin: 'tri_pyr', hint: 'Tetrahedral 4-sided gaming die!' },
      { id: 'pencil_p', name: 'Wooden Pencil', icon: '✏️', bin: 'hex_prism', hint: 'Has 2 hexagon ends and 6 rectangular sides!' },
      { id: 'hexnut_p', name: 'Hex Nut / Bolt', icon: '🔩', bin: 'hex_prism', hint: '6-sided hexagonal prism metal nut!' },
      { id: 'honeycomb_p', name: 'Honeycomb Cell', icon: '🍯', bin: 'hex_prism', hint: 'Bee honeycombs are hexagonal prisms!' }
    ]
  }
};

let currentSorterGameId = 1;
let currentSorterScore = 0;
let sorterRemainingItems = [];
let sorterSortedItems = {};
let sorterSelectedItem = null;
let draggedItemId = null;

function startSorterGame(gameId) {
  sound.playPop();
  currentSorterGameId = gameId;
  const game = SORTER_GAMES[gameId];
  if (!game) return;

  currentSorterScore = 0;
  sorterSelectedItem = null;
  draggedItemId = null;
  sorterSortedItems = {};
  game.bins.forEach(b => {
    sorterSortedItems[b.id] = [];
  });

  // Shuffle items
  sorterRemainingItems = [...game.items].sort(() => Math.random() - 0.5);

  document.getElementById('sorterLevelSelect').classList.add('hidden');
  document.getElementById('sorterEndScreen').classList.add('hidden');
  document.getElementById('sorterActiveScreen').classList.remove('hidden');

  document.getElementById('sorterGameTitle').textContent = game.title;
  document.getElementById('sorterInstructions').innerHTML = `💡 ${game.instructions} <br><small>Drag an item into a basket, or <strong>tap an item</strong> then <strong>tap a basket</strong>!</small>`;
  document.getElementById('sorterScore').textContent = currentSorterScore;
  document.getElementById('sorterTotalCount').textContent = game.items.length;
  document.getElementById('sorterSortedCount').textContent = '0';

  const feedback = document.getElementById('sorterFeedback');
  if (feedback) feedback.className = 'quiz-feedback hidden';

  renderSorterBoard();
}

function renderSorterBoard() {
  const game = SORTER_GAMES[currentSorterGameId];
  const binsContainer = document.getElementById('sorterBinsContainer');
  const poolContainer = document.getElementById('sorterPool');

  // 1. Render Bins
  binsContainer.innerHTML = '';
  binsContainer.className = `sorter-bins-container bins-${game.bins.length}`;

  game.bins.forEach(bin => {
    const binEl = document.createElement('div');
    binEl.className = 'sorter-bin';
    binEl.id = `bin-${bin.id}`;
    binEl.style.setProperty('--bin-accent', bin.color);

    binEl.innerHTML = `
      <div class="bin-header" style="background: ${bin.color}15; border-color: ${bin.color}40;">
        <span class="bin-icon">${getShapeOrObjectSvg(bin.id, 28)}</span>
        <div class="bin-titles">
          <h4>${bin.label}</h4>
          <span class="bin-subtitle">${bin.sub}</span>
        </div>
        <span class="bin-count" id="bincount-${bin.id}">${sorterSortedItems[bin.id].length}</span>
      </div>
      <div class="bin-drop-zone" id="dropzone-${bin.id}">
        ${sorterSortedItems[bin.id].map(item => `
          <div class="sorted-chip" title="${item.name}">
            <span class="chip-emoji">${getShapeOrObjectSvg(item.id, 24)}</span>
            <span class="chip-name-sub">${item.name}</span>
          </div>
        `).join('')}
        ${sorterSortedItems[bin.id].length === 0 ? `<div class="drop-placeholder">Drop Objects Here</div>` : ''}
      </div>
    `;

    // Drag-and-drop listeners for desktop
    binEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      binEl.classList.add('drag-over');
    });
    binEl.addEventListener('dragleave', () => {
      binEl.classList.remove('drag-over');
    });
    binEl.addEventListener('drop', (e) => {
      e.preventDefault();
      binEl.classList.remove('drag-over');
      const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
      if (itemId) attemptDropItem(itemId, bin.id);
    });

    // Tap-to-place listener for mobile & click
    binEl.addEventListener('click', () => {
      if (sorterSelectedItem) {
        attemptDropItem(sorterSelectedItem.id, bin.id);
      }
    });

    binsContainer.appendChild(binEl);
  });

  // 2. Render Unsorted Items Pool (Visual-First Object Tokens)
  poolContainer.innerHTML = '';
  if (sorterRemainingItems.length === 0) {
    poolContainer.innerHTML = `<div class="pool-empty-msg">🎉 All items sorted! Fantastic work!</div>`;
  } else {
    sorterRemainingItems.forEach(item => {
      const card = document.createElement('div');
      const isSelected = sorterSelectedItem && sorterSelectedItem.id === item.id;
      card.className = `sorter-item-card ${isSelected ? 'selected' : ''}`;
      card.draggable = true;

      card.innerHTML = `
        <div class="item-visual-frame">
          <span class="item-visual">${getShapeOrObjectSvg(item.id, 52)}</span>
        </div>
        <span class="item-name">${item.name}</span>
      `;

      card.addEventListener('dragstart', (e) => {
        draggedItemId = item.id;
        e.dataTransfer.setData('text/plain', item.id);
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        draggedItemId = null;
        card.classList.remove('dragging');
      });

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playPop();
        if (sorterSelectedItem && sorterSelectedItem.id === item.id) {
          sorterSelectedItem = null;
        } else {
          sorterSelectedItem = item;
        }
        renderSorterBoard();
      });

      poolContainer.appendChild(card);
    });
  }

  // Update counts
  const totalCount = game.items.length;
  const sortedCount = totalCount - sorterRemainingItems.length;
  document.getElementById('sorterSortedCount').textContent = sortedCount;
  document.getElementById('sorterScore').textContent = currentSorterScore;
}

function attemptDropItem(itemId, targetBinId) {
  const game = SORTER_GAMES[currentSorterGameId];
  const itemIndex = sorterRemainingItems.findIndex(it => it.id === itemId);
  if (itemIndex === -1) return;

  const item = sorterRemainingItems[itemIndex];
  const feedback = document.getElementById('sorterFeedback');

  if (item.bin === targetBinId) {
    // CORRECT DROP!
    sound.playCorrect();
    currentSorterScore += 15;
    sorterSortedItems[targetBinId].push(item);
    sorterRemainingItems.splice(itemIndex, 1);
    sorterSelectedItem = null;
    draggedItemId = null;

    feedback.className = 'quiz-feedback correct';
    feedback.innerHTML = `🌟 <strong>Correct!</strong> <span class="feedback-mini-icon">${getShapeOrObjectSvg(item.id, 24)}</span> <strong>${item.name}</strong> fits here! <small>${item.hint}</small>`;

    if (typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }

    renderSorterBoard();

    // Check completion
    if (sorterRemainingItems.length === 0) {
      setTimeout(finishSorterGame, 1000);
    }
  } else {
    // WRONG DROP!
    sound.playWrong();
    feedback.className = 'quiz-feedback wrong';
    feedback.innerHTML = `💡 Not quite! <span class="feedback-mini-icon">${getShapeOrObjectSvg(item.id, 24)}</span> <strong>${item.name}</strong> doesn't belong in this basket. Hint: ${item.hint}`;

    const binEl = document.getElementById(`bin-${targetBinId}`);
    if (binEl) {
      binEl.classList.add('shake');
      setTimeout(() => binEl.classList.remove('shake'), 500);
    }
  }
}

function finishSorterGame() {
  sound.playFanfare();
  document.getElementById('sorterActiveScreen').classList.add('hidden');
  document.getElementById('sorterEndScreen').classList.remove('hidden');

  document.getElementById('sorterFinalScore').textContent = currentSorterScore;

  if (typeof confetti === 'function') {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  }
}

function retryCurrentSorter() {
  startSorterGame(currentSorterGameId);
}

function returnToSorterSelect() {
  sound.playPop();
  document.getElementById('sorterEndScreen').classList.add('hidden');
  document.getElementById('sorterActiveScreen').classList.add('hidden');
  document.getElementById('sorterLevelSelect').classList.remove('hidden');
}

// Window Onload
window.addEventListener('DOMContentLoaded', () => {
  initThree();
  renderShapeShelf();
  selectShape(0);

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
