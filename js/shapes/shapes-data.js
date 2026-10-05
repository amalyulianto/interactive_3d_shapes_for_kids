/**
 * 3D Solid Shapes Adventure - Data & Geometries
 * High-resolution procedural textures and mathematical shape descriptors for 9 solids.
 */

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

      const v = [];
      for (let i = 0; i < 3; i++) {
        const ang = (i * 2 * Math.PI) / 3;
        v.push([r * Math.sin(ang), r * Math.cos(ang)]);
      }

      const topMesh = makeTriangle(
        [v[0][0], halfH, v[0][1]],
        [v[1][0], halfH, v[1][1]],
        [v[2][0], halfH, v[2][1]]
      );
      topMesh.position.y = off;
      group.add(topMesh);

      const btmMesh = makeTriangle(
        [v[0][0], -halfH, v[0][1]],
        [v[2][0], -halfH, v[2][1]],
        [v[1][0], -halfH, v[1][1]]
      );
      btmMesh.position.y = -off;
      group.add(btmMesh);

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
      const d = 1.273;
      const h = 1.2;

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

      const baseGeom = new THREE.PlaneGeometry(d * 2, d * 2);
      const baseMesh = new THREE.Mesh(baseGeom, mat);
      baseMesh.rotation.x = Math.PI / 2;
      baseMesh.position.set(0, -h - off, 0);
      group.add(baseMesh);

      const apex = [0, h, 0];
      const c = [
        [-d, -h,  d],
        [ d, -h,  d],
        [ d, -h, -d],
        [-d, -h, -d]
      ];

      const totalH = h * 2;
      const slantLen = Math.hypot(d, totalH);
      const ny = d / slantLen;
      const nz = totalH / slantLen;

      const faces = [
        { pA: c[0], pB: c[1], n: [0, ny, nz] },
        { pA: c[1], pB: c[2], n: [nz, ny, 0] },
        { pA: c[2], pB: c[3], n: [0, ny, -nz] },
        { pA: c[3], pB: c[0], n: [-nz, ny, 0] }
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

      const baseMesh = makeTriangle(c[0], c[2], c[1]);
      baseMesh.position.y = -off;
      group.add(baseMesh);

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
      const bagMat = new THREE.MeshStandardMaterial({
        color: 0xFEF3C7,
        roughness: 0.6,
        transparent: true,
        opacity: 0.9
      });
      const bag = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2.4, 3), bagMat);
      group.add(bag);

      const teaMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.9 });
      const teaCore = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.4, 3), teaMat);
      teaCore.position.y = -0.4;
      group.add(teaCore);

      const stringGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
      const stringMat = new THREE.MeshBasicMaterial({ color: 0xE2E8F0 });
      const string = new THREE.Mesh(stringGeom, stringMat);
      string.position.set(0.2, 1.8, 0.2);
      string.rotation.z = -0.4;
      group.add(string);

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

      const topCap = new THREE.Mesh(new THREE.CircleGeometry(r, 6), mat);
      topCap.rotation.x = -Math.PI / 2;
      topCap.position.set(0, halfH + off, 0);
      group.add(topCap);

      const btmCap = new THREE.Mesh(new THREE.CircleGeometry(r, 6), mat);
      btmCap.rotation.x = Math.PI / 2;
      btmCap.position.set(0, -halfH - off, 0);
      group.add(btmCap);

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

// Global window attachment for zero-build vanilla JS architecture
window.TextureBuilder = TextureBuilder;
window.SHAPES_DATA = SHAPES_DATA;
