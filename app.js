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
  btn.textContent = sound.enabled ? '🔊' : '🔇';
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
  },

  createDonutTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const gradDough = ctx.createLinearGradient(0, 0, 0, 1024);
    gradDough.addColorStop(0, '#D97706');
    gradDough.addColorStop(0.5, '#F59E0B');
    gradDough.addColorStop(1, '#B45309');
    ctx.fillStyle = gradDough;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = '#FB7185';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1024, 0);
    ctx.lineTo(1024, 500);

    for (let x = 1024; x >= 0; x -= 32) {
      const wave = Math.sin((x / 1024) * Math.PI * 12) * 55 + Math.cos((x / 1024) * Math.PI * 6) * 30;
      ctx.lineTo(x, 500 + wave);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.fillRect(0, 40, 1024, 120);

    const colors = ['#FBBF24', '#34D399', '#60A5FA', '#A855F7', '#FFFFFF', '#F43F5E'];
    for (let i = 0; i < 90; i++) {
      const sx = (i * 37) % 1024;
      const sy = 80 + (i * 29) % 380;
      const len = 22;
      const rot = (i * 1.35);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.rect(-4, -len / 2, 8, len);
      ctx.fill();
      ctx.restore();
    }

    return new THREE.CanvasTexture(canvas);
  }
};

// 11 SHAPES DATABASE
const SHAPES_DATA = [
  {
    id: 'cube',
    name: 'Cube',
    icon: '🎲',
    subtitle: 'A 3D solid shape with 6 identical square faces',
    color: 0x6366F1,
    faces: 6,
    facesDesc: '6 Equal Square Faces',
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
      const prism = new THREE.Mesh(new THREE.CylinderGeometry(1.5 + offset * 0.5, 1.5 + offset * 0.5, 2.6 + offset, 3), mat);
      prism.rotation.z = Math.PI / 2;
      group.add(prism);
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
        const ang = (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const x = r * Math.cos(ang);
        const z = r * Math.sin(ang);
        coords.push([h, x, z]);
        coords.push([-h, x, z]);
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
      const pyr = new THREE.Mesh(new THREE.ConeGeometry(1.8 + offset * 0.5, 2.4 + offset, 4), mat);
      pyr.rotation.y = Math.PI / 4;
      group.add(pyr);
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
    id: 'torus',
    name: 'Torus (Donut)',
    icon: '🍩',
    subtitle: 'A ring shape that looks like a delicious donut or swim tube',
    color: 0xF43F5E,
    faces: 1,
    facesDesc: '1 Continuous Curved Ring',
    edges: 0,
    edgesDesc: '0 Edges',
    vertices: 0,
    verticesDesc: '0 Vertices',
    examples: ['🍩 Glazed Donut', '🛟 Swimming Lifebuoy', '🥯 Bagel', '⭕ Rubber O-Ring'],
    tip: 'A torus is special because it has a continuous hole right through the center!',
    createGeom() {
      return new THREE.TorusGeometry(1.4, 0.6, 24, 48);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const torus = new THREE.Mesh(new THREE.TorusGeometry(1.4 + offset, 0.6, 24, 48), mat);
      group.add(torus);
      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const donutMat = new THREE.MeshStandardMaterial({
        map: TextureBuilder.createDonutTexture(),
        roughness: 0.35,
        metalness: 0.05
      });
      const donut = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.58, 36, 72), donutMat);
      donut.rotation.x = Math.PI / 2;
      group.add(donut);

      return group;
    },
    getVerticesCoords() {
      return [];
    }
  },
  {
    id: 'hemisphere',
    name: 'Hemisphere',
    icon: '🥣',
    subtitle: 'Exactly one half of a sphere with a flat circular bottom',
    color: 0x06B6D4,
    faces: 2,
    facesDesc: '1 Flat Circle + 1 Curved Dome',
    edges: 1,
    edgesDesc: '1 Curved Edge',
    vertices: 0,
    verticesDesc: '0 Vertices',
    examples: ['🥣 Soup Bowl', '🛖 Arctic Igloo', '🪖 Helmet', '🍋 Half-Cut Lemon'],
    tip: 'If you slice an orange or sphere right down the middle, you get 2 hemispheres!',
    createGeom() {
      return new THREE.SphereGeometry(1.6, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), mat);
      dome.position.y = offset * 1.5;
      group.add(dome);

      const base = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), mat);
      base.rotation.x = Math.PI / 2;
      base.position.y = -offset * 1.5;
      group.add(base);

      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const snowMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.6 });
      const igloo = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), snowMat);
      group.add(igloo);

      const tunnelMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.5 });
      const tunnel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.0, 16, 1, false, 0, Math.PI), tunnelMat);
      tunnel.rotation.x = Math.PI / 2;
      tunnel.position.set(0, 0, 1.6);
      group.add(tunnel);

      return group;
    },
    getVerticesCoords() {
      return [];
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
      const p = new THREE.Mesh(new THREE.CylinderGeometry(1.4 + offset * 0.5, 1.4 + offset * 0.5, 3.0 + offset, 6), mat);
      group.add(p);
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
        const x = r * Math.cos(ang);
        const z = r * Math.sin(ang);
        coords.push([x, h, z]);
        coords.push([-h, x, z]);
      }
      return coords;
    }
  },
  {
    id: 'octahedron',
    name: 'Octahedron (Diamond Gem)',
    icon: '💎',
    subtitle: 'Has 8 triangular faces shaped like a sparkling gemstone',
    color: 0x38BDF8,
    faces: 8,
    facesDesc: '8 Equilateral Triangles',
    edges: 12,
    edgesDesc: '12 Straight Edges',
    vertices: 6,
    verticesDesc: '6 Corner Vertices',
    examples: ['💎 Cut Diamond', '✨ Fluorite Crystal', '🎲 8-Sided Game Die', '💠 Floating Polyhedron'],
    tip: 'An octahedron looks like two square pyramids glued together at their bases!',
    createGeom() {
      return new THREE.OctahedronGeometry(1.8);
    },
    createExplodedGroup(offset, mat) {
      const group = new THREE.Group();
      const oct = new THREE.Mesh(new THREE.OctahedronGeometry(1.8 + offset), mat);
      group.add(oct);
      return group;
    },
    createRealMesh() {
      const group = new THREE.Group();
      const gemMat = new THREE.MeshPhysicalMaterial({
        color: 0x7DD3FC,
        transmission: 0.85,
        opacity: 0.95,
        transparent: true,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        ior: 2.4
      });
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(1.8), gemMat);
      group.add(gem);

      const coreMat = new THREE.MeshBasicMaterial({ color: 0xE0F2FE, wireframe: true });
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.78), coreMat);
      group.add(core);

      return group;
    },
    getVerticesCoords() {
      const s = 1.8;
      return [
        [0, s, 0], [0, -s, 0],
        [s, 0, 0], [-s, 0, 0],
        [0, 0, s], [0, 0, -s]
      ];
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

// Explorer Mode vs Quiz Mode
function switchMode(mode) {
  sound.playPop();
  const isExplorer = mode === 'explorer';
  document.getElementById('explorerView').classList.toggle('active', isExplorer);
  document.getElementById('quizView').classList.toggle('active', !isExplorer);

  document.getElementById('tabExplorer').classList.toggle('active', isExplorer);
  document.getElementById('tabQuiz').classList.toggle('active', !isExplorer);

  if (isExplorer) {
    setTimeout(onWindowResize, 60);
  }
}

// ================= 4 THEMED 5-QUESTION QUIZZES =================
const QUIZ_LEVELS = {
  1: {
    title: 'Quiz 1: Shape Explorer',
    questions: [
      {
        text: 'Which 3D shape has 6 identical square faces?',
        visual: '🎲',
        options: ['Cube', 'Cylinder', 'Sphere', 'Cone'],
        answer: 0,
        hint: 'A playing dice is a famous example of this shape.'
      },
      {
        text: 'What is the name of a solid shape that is round like a basketball?',
        visual: '⚽',
        options: ['Cuboid', 'Sphere', 'Cone', 'Pyramid'],
        answer: 1,
        hint: 'It has zero straight edges and zero corners.'
      },
      {
        text: 'Which shape has 2 flat circular bases and 1 curved surface?',
        visual: '🥫',
        options: ['Cylinder', 'Cube', 'Triangular Prism', 'Cone'],
        answer: 0,
        hint: 'Think of a soda can or canned soup.'
      },
      {
        text: 'What shape looks like a party hat with a pointy top?',
        visual: '🎉',
        options: ['Sphere', 'Cone', 'Cuboid', 'Cylinder'],
        answer: 1,
        hint: 'It has 1 circular base and 1 pointy vertex.'
      },
      {
        text: 'Which 3D shape looks like a delicious glazed donut with a hole?',
        visual: '🍩',
        options: ['Torus (Donut)', 'Octahedron', 'Hemisphere', 'Hexagonal Prism'],
        answer: 0,
        hint: 'A torus is a ring shape with a hole right in the center!'
      }
    ]
  },
  2: {
    title: 'Quiz 2: Property Detective',
    questions: [
      {
        text: 'How many vertices (corner points) does a CUBE have?',
        visual: '📦',
        options: ['4 Vertices', '6 Vertices', '8 Vertices', '12 Vertices'],
        answer: 2,
        hint: 'Count 4 vertices at the top and 4 vertices at the bottom!'
      },
      {
        text: 'How many straight edges does a RECTANGULAR PRISM (Cuboid) have?',
        visual: '🧱',
        options: ['6 Edges', '8 Edges', '10 Edges', '12 Edges'],
        answer: 3,
        hint: 'Just like a cube, a cuboid has 12 edges.'
      },
      {
        text: 'Which 3D shapes have ZERO (0) vertices (no sharp corner points at all)?',
        visual: '🔴',
        options: ['Cube & Cone', 'Sphere & Cylinder', 'Square Pyramid', 'Triangular Prism'],
        answer: 1,
        hint: 'Both sphere and cylinder are smooth with no sharp corner points.'
      },
      {
        text: 'How many faces does a SQUARE PYRAMID have in total?',
        visual: '🏛️',
        options: ['3 Faces', '4 Faces', '5 Faces', '6 Faces'],
        answer: 2,
        hint: '1 square base + 4 triangular walls = 5 faces.'
      },
      {
        text: 'How many triangular faces are there on an OCTAHEDRON?',
        visual: '💎',
        options: ['6 Triangles', '8 Triangles', '10 Triangles', '12 Triangles'],
        answer: 1,
        hint: '"Octa" means 8! It has 8 sparkling triangular faces.'
      }
    ]
  },
  3: {
    title: 'Quiz 3: Real-World Matcher',
    questions: [
      {
        text: 'A juice carton and a brick are real-world examples of which shape?',
        visual: '🧃',
        options: ['Rectangular Prism (Cuboid)', 'Sphere', 'Cone', 'Torus'],
        answer: 0,
        hint: 'They have 6 rectangular sides.'
      },
      {
        text: 'A triangular camping tent matches which 3D geometric solid?',
        visual: '⛺',
        options: ['Cylinder', 'Triangular Prism', 'Cone', 'Cube'],
        answer: 1,
        hint: 'It has 2 triangular ends and 3 rectangle sides.'
      },
      {
        text: 'A classic wooden pencil has 6 long flat sides. What shape is it?',
        visual: '✏️',
        options: ['Hexagonal Prism', 'Sphere', 'Octahedron', 'Cone'],
        answer: 0,
        hint: 'Hexagon has 6 sides to keep the pencil from rolling off desks!'
      },
      {
        text: 'An arctic snow igloo or a soup bowl is shaped like a...?',
        visual: '🛖',
        options: ['Hemisphere', 'Cylinder', 'Cube', 'Pyramid'],
        answer: 0,
        hint: 'A hemisphere is exactly one half of a sphere.'
      },
      {
        text: 'The Ancient Egyptian Pyramids in Giza are examples of which solid?',
        visual: '🏜️',
        options: ['Triangular Prism', 'Square Pyramid', 'Cuboid', 'Sphere'],
        answer: 1,
        hint: 'They have a big square base and meet at a single top peak.'
      }
    ]
  },
  4: {
    title: 'Quiz 4: "Who Am I?" Riddles',
    questions: [
      {
        text: '"I have no edges, no corners, and I can roll forever in any direction. Who am I?"',
        visual: '🔮',
        options: ['Sphere', 'Cube', 'Cone', 'Cylinder'],
        answer: 0,
        hint: 'Think of marbles and soccer balls.'
      },
      {
        text: '"I have 2 flat circles and 1 curved body. Stand me up and I stay still, push me on my side and I roll. Who am I?"',
        visual: '🥫',
        options: ['Cube', 'Cylinder', 'Pyramid', 'Torus'],
        answer: 1,
        hint: 'A soup can or drinking glass.'
      },
      {
        text: '"All 6 of my faces are squares of the exact same size. Who am I?"',
        visual: '🎲',
        options: ['Cube', 'Cuboid', 'Hemisphere', 'Octahedron'],
        answer: 0,
        hint: 'Roll me in a board game to get lucky numbers!'
      },
      {
        text: '"I have 1 round circle base and a sharp pointy hat on top. Ice cream loves me! Who am I?"',
        visual: '🍦',
        options: ['Cylinder', 'Cone', 'Prism', 'Sphere'],
        answer: 1,
        hint: 'Waffle cones hold ice cream deliciously.'
      },
      {
        text: '"Slice me in half and I make two bowls. Who was I originally?"',
        visual: '🍊',
        options: ['Sphere', 'Cube', 'Cone', 'Cylinder'],
        answer: 0,
        hint: 'A sphere sliced in half becomes two hemispheres!'
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

  document.getElementById('questionVisual').textContent = q.visual;
  document.getElementById('questionText').textContent = q.text;

  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';

  const feedback = document.getElementById('quizFeedback');
  feedback.className = 'quiz-feedback hidden';

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
    feedback.textContent = '🌟 AWESOME! That is correct!';

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

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.questions.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }, 1800);
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

// Window Onload
window.addEventListener('DOMContentLoaded', () => {
  initThree();
  renderShapeShelf();
  selectShape(0);
});
