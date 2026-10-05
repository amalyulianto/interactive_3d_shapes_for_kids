/**
 * 3D Solid Shapes Adventure - Shape Sorter Lab Game Engine
 * 5 Hands-on sorting challenges with drag-and-drop & tap-to-place support.
 */

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
      { id: 'giza_p', name: 'Great Pyramid of Giza', icon: '🏜️', bin: 'square_pyr', hint: 'Wide square base with 4 triangular faces!' },
      { id: 'teabag_p', name: 'Pyramid Tea Bag', icon: '🍵', bin: 'tri_pyr', hint: 'Has 4 equilateral triangle sides—a true tetrahedron!' },
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
  if (window.sound) window.sound.playPop();
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

  const levelSelect = document.getElementById('sorterLevelSelect');
  const endScreen = document.getElementById('sorterEndScreen');
  const activeScreen = document.getElementById('sorterActiveScreen');

  if (levelSelect) levelSelect.classList.add('hidden');
  if (endScreen) endScreen.classList.add('hidden');
  if (activeScreen) activeScreen.classList.remove('hidden');

  const titleEl = document.getElementById('sorterGameTitle');
  const instrEl = document.getElementById('sorterInstructions');
  const scoreEl = document.getElementById('sorterScore');
  const totalCountEl = document.getElementById('sorterTotalCount');
  const sortedCountEl = document.getElementById('sorterSortedCount');

  if (titleEl) titleEl.textContent = game.title;
  if (instrEl) instrEl.innerHTML = `💡 ${game.instructions} <br><small>Drag an item into a basket, or <strong>tap an item</strong> then <strong>tap a basket</strong>!</small>`;
  if (scoreEl) scoreEl.textContent = currentSorterScore;
  if (totalCountEl) totalCountEl.textContent = game.items.length;
  if (sortedCountEl) sortedCountEl.textContent = '0';

  const feedback = document.getElementById('sorterFeedback');
  if (feedback) feedback.className = 'quiz-feedback hidden';

  renderSorterBoard();
}

function renderSorterBoard() {
  const game = SORTER_GAMES[currentSorterGameId];
  if (!game) return;
  const binsContainer = document.getElementById('sorterBinsContainer');
  const poolContainer = document.getElementById('sorterPool');
  if (!binsContainer || !poolContainer) return;

  // 1. Render Bins
  binsContainer.innerHTML = '';
  binsContainer.className = `sorter-bins-container bins-${game.bins.length}`;

  game.bins.forEach(bin => {
    const binEl = document.createElement('div');
    binEl.className = 'sorter-bin';
    binEl.id = `bin-${bin.id}`;
    binEl.style.setProperty('--bin-accent', bin.color);

    const svgIcon = typeof getShapeOrObjectSvg === 'function' ? getShapeOrObjectSvg(bin.id, 28) : '';
    const sortedChipsHtml = sorterSortedItems[bin.id].map(item => `
      <div class="sorted-chip" title="${item.name}">
        <span class="chip-emoji">${typeof getShapeOrObjectSvg === 'function' ? getShapeOrObjectSvg(item.id, 24) : item.icon}</span>
        <span class="chip-name-sub">${item.name}</span>
      </div>
    `).join('');

    binEl.innerHTML = `
      <div class="bin-header" style="background: ${bin.color}15; border-color: ${bin.color}40;">
        <span class="bin-icon">${svgIcon}</span>
        <div class="bin-titles">
          <h4>${bin.label}</h4>
          <span class="bin-subtitle">${bin.sub}</span>
        </div>
        <span class="bin-count" id="bincount-${bin.id}">${sorterSortedItems[bin.id].length}</span>
      </div>
      <div class="bin-drop-zone" id="dropzone-${bin.id}">
        ${sortedChipsHtml}
        ${sorterSortedItems[bin.id].length === 0 ? `<div class="drop-placeholder">Drop Objects Here</div>` : ''}
      </div>
    `;

    // Drag-and-drop listeners
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

    // Tap-to-place listener for touch and click
    binEl.addEventListener('click', () => {
      if (sorterSelectedItem) {
        attemptDropItem(sorterSelectedItem.id, bin.id);
      }
    });

    binsContainer.appendChild(binEl);
  });

  // 2. Render Unsorted Items Pool
  poolContainer.innerHTML = '';
  if (sorterRemainingItems.length === 0) {
    poolContainer.innerHTML = `<div class="pool-empty-msg">🎉 All items sorted! Fantastic work!</div>`;
  } else {
    sorterRemainingItems.forEach(item => {
      const card = document.createElement('div');
      const isSelected = sorterSelectedItem && sorterSelectedItem.id === item.id;
      card.className = `sorter-item-card ${isSelected ? 'selected' : ''}`;
      card.draggable = true;

      const itemSvg = typeof getShapeOrObjectSvg === 'function' ? getShapeOrObjectSvg(item.id, 52) : item.icon;

      card.innerHTML = `
        <div class="item-visual-frame">
          <span class="item-visual">${itemSvg}</span>
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
        if (window.sound) window.sound.playPop();
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

  // Update counters
  const totalCount = game.items.length;
  const sortedCount = totalCount - sorterRemainingItems.length;
  const sortedCountEl = document.getElementById('sorterSortedCount');
  const scoreEl = document.getElementById('sorterScore');

  if (sortedCountEl) sortedCountEl.textContent = sortedCount;
  if (scoreEl) scoreEl.textContent = currentSorterScore;
}

function attemptDropItem(itemId, targetBinId) {
  const game = SORTER_GAMES[currentSorterGameId];
  if (!game) return;
  const itemIndex = sorterRemainingItems.findIndex(it => it.id === itemId);
  if (itemIndex === -1) return;

  const item = sorterRemainingItems[itemIndex];
  const feedback = document.getElementById('sorterFeedback');
  const itemSvg = typeof getShapeOrObjectSvg === 'function' ? getShapeOrObjectSvg(item.id, 24) : item.icon;

  if (item.bin === targetBinId) {
    // CORRECT DROP!
    if (window.sound) window.sound.playCorrect();
    currentSorterScore += 15;
    sorterSortedItems[targetBinId].push(item);
    sorterRemainingItems.splice(itemIndex, 1);
    sorterSelectedItem = null;
    draggedItemId = null;

    if (feedback) {
      feedback.className = 'quiz-feedback correct';
      feedback.innerHTML = `🌟 <strong>Correct!</strong> <span class="feedback-mini-icon">${itemSvg}</span> <strong>${item.name}</strong> fits here! <small>${item.hint}</small>`;
    }

    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }

    renderSorterBoard();

    if (sorterRemainingItems.length === 0) {
      setTimeout(finishSorterGame, 1000);
    }
  } else {
    // WRONG DROP!
    if (window.sound) window.sound.playWrong();
    if (feedback) {
      feedback.className = 'quiz-feedback wrong';
      feedback.innerHTML = `💡 Not quite! <span class="feedback-mini-icon">${itemSvg}</span> <strong>${item.name}</strong> doesn't belong in this basket. Hint: ${item.hint}`;
    }

    const binEl = document.getElementById(`bin-${targetBinId}`);
    if (binEl) {
      binEl.classList.add('shake');
      setTimeout(() => binEl.classList.remove('shake'), 500);
    }
  }
}

function finishSorterGame() {
  if (window.sound) window.sound.playFanfare();
  const activeScreen = document.getElementById('sorterActiveScreen');
  const endScreen = document.getElementById('sorterEndScreen');
  const finalScoreEl = document.getElementById('sorterFinalScore');

  if (activeScreen) activeScreen.classList.add('hidden');
  if (endScreen) endScreen.classList.remove('hidden');
  if (finalScoreEl) finalScoreEl.textContent = currentSorterScore;

  if (window.AppUtils && window.AppUtils.confetti) {
    window.AppUtils.confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  } else if (typeof confetti === 'function') {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  }
}

function retryCurrentSorter() {
  startSorterGame(currentSorterGameId);
}

function returnToSorterSelect() {
  if (window.sound) window.sound.playPop();
  const endScreen = document.getElementById('sorterEndScreen');
  const activeScreen = document.getElementById('sorterActiveScreen');
  const levelSelect = document.getElementById('sorterLevelSelect');

  if (endScreen) endScreen.classList.add('hidden');
  if (activeScreen) activeScreen.classList.add('hidden');
  if (levelSelect) levelSelect.classList.remove('hidden');
}

// Global window attachments
window.SORTER_GAMES = SORTER_GAMES;
window.startSorterGame = startSorterGame;
window.renderSorterBoard = renderSorterBoard;
window.attemptDropItem = attemptDropItem;
window.finishSorterGame = finishSorterGame;
window.retryCurrentSorter = retryCurrentSorter;
window.returnToSorterSelect = returnToSorterSelect;
