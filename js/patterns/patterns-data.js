/**
 * Patterns Studio - Curated Datasets & Curriculum Schemas
 * Aligned with Grade 2 Elementary School Geometry Worksheets:
 * - Newly learned 2D shapes: Pentagon, Hexagon, Octagon, Diamond, Triangles (up/inverted), Tall Rectangle
 * - Newly learned 3D solids: Cylinders (tall/short, upright/tilted), Cones (tip up/down), Square Pyramid, Triangular Pyramid, Cube
 * - Activities:
 *   1. Ring the Repeating Group
 *   2. Missing 2D Shapes (Spaces A & B)
 *   3. Missing 3D Solids (Solids A & B)
 *   4. Pattern Mastery Quizzes
 */

(function () {
  'use strict';

  // 1. Ring the Repeating Group (Solve this! 1a, 1b, 2a & Lesson 5)
  const RING_REPEAT_CHALLENGES = [
    {
      id: 'ring_1',
      title: 'Solve this! 1a: Square, Hexagon, Triangle & Diamond',
      source: 'Worksheet: Solve this! 1a',
      tip: 'Find where the pattern starts to repeat from the beginning!',
      unitLength: 4,
      items: [
        'square_blue', 'hexagon_blue', 'triangle_up_yellow', 'diamond_blue',
        'square_blue', 'hexagon_blue', 'triangle_up_yellow', 'diamond_blue',
        'square_blue', 'hexagon_blue', 'triangle_up_yellow', 'diamond_blue'
      ],
      unit: ['square_blue', 'hexagon_blue', 'triangle_up_yellow', 'diamond_blue'],
      description: 'The repeating group has 4 shapes: Square, Hexagon (6 sides), Triangle, and Diamond.'
    },
    {
      id: 'ring_2',
      title: 'Solve this! 1b: Pentagon, Rectangle, Square & Triangles',
      source: 'Worksheet: Solve this! 1b',
      tip: 'Count how many distinct shapes appear before the blue pentagon returns!',
      unitLength: 5,
      items: [
        'pentagon_blue', 'rect_tall_yellow', 'square_green', 'triangle_up_yellow', 'triangle_down_green',
        'pentagon_blue', 'rect_tall_yellow', 'square_green', 'triangle_up_yellow', 'triangle_down_green',
        'pentagon_blue', 'rect_tall_yellow', 'square_green', 'triangle_up_yellow', 'triangle_down_green'
      ],
      unit: ['pentagon_blue', 'rect_tall_yellow', 'square_green', 'triangle_up_yellow', 'triangle_down_green'],
      description: 'The repeating group has 5 shapes: Pentagon (5 sides), Tall Yellow Rectangle, Green Square, Upright Triangle, and Inverted Green Triangle.'
    },
    {
      id: 'ring_3',
      title: 'Lesson 5: Alternating Octagons & Circles',
      source: 'Lesson 5: Exercise 1',
      tip: 'Look at the octagons: one is orange and one is blue!',
      unitLength: 4,
      items: [
        'octagon_orange', 'circle_green', 'octagon_blue', 'circle_green',
        'octagon_orange', 'circle_green', 'octagon_blue', 'circle_green',
        'octagon_orange', 'circle_green', 'octagon_blue', 'circle_green'
      ],
      unit: ['octagon_orange', 'circle_green', 'octagon_blue', 'circle_green'],
      description: 'The repeating group has 4 shapes: Orange Octagon (8 sides), Green Circle, Blue Octagon (8 sides), and Green Circle.'
    },
    {
      id: 'ring_4',
      title: 'Solve this! 2a: Tilted Cylinders, Cone & Pink Pyramid',
      source: 'Worksheet: Solve this! 2a',
      tip: 'Watch the tilt of the cylinder and the direction of the purple cone!',
      unitLength: 4,
      items: [
        'cylinder_tilted_green', 'cone_down_purple', 'cylinder_tilted_green', 'pyramid_pink',
        'cylinder_tilted_green', 'cone_down_purple', 'cylinder_tilted_green', 'pyramid_pink',
        'cylinder_tilted_green', 'cone_down_purple', 'cylinder_tilted_green', 'pyramid_pink'
      ],
      unit: ['cylinder_tilted_green', 'cone_down_purple', 'cylinder_tilted_green', 'pyramid_pink'],
      description: 'The repeating group has 4 solids: Tilted Cylinder, Purple Cone (tip down), Tilted Cylinder, and Pink Square Pyramid.'
    },
    {
      id: 'ring_5',
      title: 'Lesson 5: Cylinder, Inverted Cone, Cube & Upright Cone',
      source: 'Lesson 5: Exercise 2',
      tip: 'Notice the cone orientation: tip pointing down vs tip pointing up!',
      unitLength: 4,
      items: [
        'cylinder_brown', 'cone_down_blue', 'cube_green', 'cone_up_blue',
        'cylinder_brown', 'cone_down_blue', 'cube_green', 'cone_up_blue',
        'cylinder_brown', 'cone_down_blue', 'cube_green', 'cone_up_blue'
      ],
      unit: ['cylinder_brown', 'cone_down_blue', 'cube_green', 'cone_up_blue'],
      description: 'The repeating group has 4 solids: Brown Cylinder, Blue Cone (tip down), Green Cube, and Blue Cone (tip up).'
    }
  ];

  // 2. Missing 2D Shapes (Worksheet 6 Ex 1, Solve this! 1a, 1b, Lesson 5)
  const MISSING_SHAPES_CHALLENGES = [
    {
      id: 'ms_1',
      title: 'Worksheet 6, Ex 1: Missing Shapes in the Middle',
      source: 'Worksheet 6: We can spot patterns! (1)',
      prompt: 'Sketch and show the missing shapes in spaces A and B.',
      sequence: [
        { key: 'triangle_up_red' },
        { key: 'rect_tall_yellow' },
        { key: 'triangle_right_green' },
        { key: 'circle_blue' },
        { key: 'triangle_up_red' },
        { blank: 'A' },
        { blank: 'B' },
        { key: 'circle_blue' },
        { key: 'triangle_up_red' },
        { key: 'rect_tall_yellow' },
        { key: 'triangle_right_green' },
        { key: 'circle_blue' }
      ],
      correctA: 'rect_tall_yellow',
      correctB: 'triangle_right_green',
      options: [
        { key: 'rect_tall_yellow', label: 'Tall Rectangle' },
        { key: 'triangle_right_green', label: 'Right Triangle' },
        { key: 'circle_blue', label: 'Blue Circle' },
        { key: 'triangle_up_red', label: 'Red Triangle' },
        { key: 'square_blue', label: 'Blue Square' }
      ],
      explanation: 'The repeating group is [Red Triangle, Tall Yellow Rectangle, Green Right Triangle, Blue Circle]. Space A follows the red triangle, so A is the Tall Yellow Rectangle. Space B is the Green Right Triangle!'
    },
    {
      id: 'ms_2',
      title: 'Solve this! 1a: Missing Shapes at the Start',
      source: 'Worksheet: Solve this! 1a',
      prompt: 'The pattern starts with blanks A and B! What shapes begin the pattern?',
      sequence: [
        { blank: 'A' },
        { blank: 'B' },
        { key: 'triangle_up_yellow' },
        { key: 'diamond_blue' },
        { key: 'square_blue' },
        { key: 'hexagon_blue' },
        { key: 'triangle_up_yellow' },
        { key: 'diamond_blue' },
        { key: 'square_blue' },
        { key: 'hexagon_blue' },
        { key: 'triangle_up_yellow' },
        { key: 'diamond_blue' }
      ],
      correctA: 'square_blue',
      correctB: 'hexagon_blue',
      options: [
        { key: 'square_blue', label: 'Blue Square' },
        { key: 'hexagon_blue', label: 'Hexagon (6 sides)' },
        { key: 'triangle_up_yellow', label: 'Yellow Triangle' },
        { key: 'diamond_blue', label: 'Blue Diamond' }
      ],
      explanation: 'The repeating unit is [Square, Hexagon, Triangle, Diamond]. Since blanks A and B come right before the triangle, A is the Blue Square and B is the Blue Hexagon!'
    },
    {
      id: 'ms_3',
      title: 'Solve this! 1b: Pentagon & Rectangle Pattern',
      source: 'Worksheet: Solve this! 1b',
      prompt: 'A 5-shape repeating block! What shapes belong in blanks A and B?',
      sequence: [
        { key: 'pentagon_blue' },
        { key: 'rect_tall_yellow' },
        { key: 'square_green' },
        { key: 'triangle_up_yellow' },
        { key: 'triangle_down_green' },
        { key: 'pentagon_blue' },
        { blank: 'A' },
        { blank: 'B' },
        { key: 'triangle_up_yellow' },
        { key: 'triangle_down_green' },
        { key: 'pentagon_blue' },
        { key: 'rect_tall_yellow' }
      ],
      correctA: 'rect_tall_yellow',
      correctB: 'square_green',
      options: [
        { key: 'rect_tall_yellow', label: 'Tall Rectangle' },
        { key: 'square_green', label: 'Green Square' },
        { key: 'triangle_up_yellow', label: 'Upright Triangle' },
        { key: 'triangle_down_green', label: 'Inverted Triangle' },
        { key: 'pentagon_blue', label: 'Pentagon (5 sides)' }
      ],
      explanation: 'The repeating group has 5 shapes: [Pentagon, Yellow Rectangle, Green Square, Upright Triangle, Inverted Triangle]. Blank A is the Tall Yellow Rectangle and Blank B is the Green Square!'
    },
    {
      id: 'ms_4',
      title: 'Lesson 5: Missing Octagons & Circles',
      source: 'Lesson 5: Shape and solid patterns',
      prompt: 'What shapes belong in blanks A and B to continue the octagon pattern?',
      sequence: [
        { key: 'octagon_orange' },
        { key: 'circle_green' },
        { key: 'octagon_blue' },
        { key: 'circle_green' },
        { blank: 'A' },
        { blank: 'B' },
        { key: 'octagon_blue' },
        { key: 'circle_green' },
        { key: 'octagon_orange' },
        { key: 'circle_green' }
      ],
      correctA: 'octagon_orange',
      correctB: 'circle_green',
      options: [
        { key: 'octagon_orange', label: 'Orange Octagon' },
        { key: 'circle_green', label: 'Green Circle' },
        { key: 'octagon_blue', label: 'Blue Octagon' },
        { key: 'square_green', label: 'Green Square' }
      ],
      explanation: 'The repeating block is [Orange Octagon, Green Circle, Blue Octagon, Green Circle]. After the first block finishes, Blank A begins the next block with Orange Octagon, and Blank B is Green Circle!'
    }
  ];

  // 3. Missing 3D Solids (Worksheet 6 Ex 2, Solve this! 2b, Lesson 5 Ex 2)
  const MISSING_SOLIDS_CHALLENGES = [
    {
      id: 'msol_1',
      title: 'Worksheet 6, Ex 2: Missing Solids at the Start',
      source: 'Worksheet 6: We can spot patterns! (2)',
      prompt: 'What are solids A and B? Circle the correct solids to complete the pattern.',
      sequence: [
        { blank: 'A' },
        { blank: 'B' },
        { key: 'pyramid_purple' },
        { key: 'pyramid_sideways_orange' },
        { key: 'cylinder_tall_green' },
        { key: 'cylinder_short_blue' },
        { key: 'pyramid_purple' },
        { key: 'pyramid_sideways_orange' },
        { key: 'cylinder_tall_green' },
        { key: 'cylinder_short_blue' },
        { key: 'pyramid_purple' },
        { key: 'pyramid_sideways_orange' }
      ],
      correctA: 'cylinder_tall_green',
      correctB: 'cylinder_short_blue',
      options: [
        { key: 'cylinder_tall_green', label: 'Tall Green Cylinder' },
        { key: 'cylinder_short_blue', label: 'Short Blue Cylinder' },
        { key: 'pyramid_purple', label: 'Purple Square Pyramid' },
        { key: 'pyramid_sideways_orange', label: 'Sideways Triangular Pyramid' }
      ],
      explanation: 'Look at the sequence right before the Purple Square Pyramid and Orange Pyramid: it is preceded by the Tall Green Cylinder and Short Blue Cylinder! So Solid A is the Tall Cylinder and Solid B is the Short Cylinder.'
    },
    {
      id: 'msol_2',
      title: 'Solve this! 2b: Tilted Cylinders & Purple Cone',
      source: 'Worksheet: Solve this! 2b',
      prompt: 'Notice the angle and tilt! Circle the correct solids for A and B.',
      sequence: [
        { key: 'cylinder_tilted_green' },
        { key: 'cone_down_purple' },
        { key: 'cylinder_tilted_green' },
        { key: 'pyramid_pink' },
        { blank: 'A' },
        { blank: 'B' },
        { key: 'cylinder_tilted_green' },
        { key: 'pyramid_pink' },
        { key: 'cylinder_tilted_green' },
        { key: 'cone_down_purple' },
        { key: 'cylinder_tilted_green' },
        { key: 'pyramid_pink' }
      ],
      correctA: 'cylinder_tilted_green',
      correctB: 'cone_down_purple',
      options: [
        { key: 'cylinder_tilted_green', label: 'Tilted Cylinder' },
        { key: 'cone_down_purple', label: 'Purple Cone (Tip Down)' },
        { key: 'pyramid_pink', label: 'Pink Square Pyramid' },
        { key: 'cylinder_tall_green', label: 'Upright Cylinder' }
      ],
      explanation: 'The repeating block is [Tilted Cylinder, Tilted Purple Cone, Tilted Cylinder, Pink Pyramid]. After the Pink Pyramid, the pattern restarts, so Solid A is the Tilted Cylinder and Solid B is the Purple Cone!'
    },
    {
      id: 'msol_3',
      title: 'Lesson 5, Ex 2: Inverted Cone & Green Cube',
      source: 'Lesson 5: What are the missing solids?',
      prompt: 'Watch the cone orientations! What solids belong in blanks A and B?',
      sequence: [
        { key: 'cylinder_brown' },
        { key: 'cone_down_blue' },
        { key: 'cube_green' },
        { key: 'cone_up_blue' },
        { key: 'cylinder_brown' },
        { key: 'cone_down_blue' },
        { blank: 'A' },
        { blank: 'B' },
        { key: 'cylinder_brown' },
        { key: 'cone_down_blue' },
        { key: 'cube_green' },
        { key: 'cone_up_blue' }
      ],
      correctA: 'cube_green',
      correctB: 'cone_up_blue',
      options: [
        { key: 'cube_green', label: 'Green Cube' },
        { key: 'cone_up_blue', label: 'Cone (Tip Up)' },
        { key: 'cone_down_blue', label: 'Cone (Tip Down)' },
        { key: 'cylinder_brown', label: 'Brown Cylinder' }
      ],
      explanation: 'The repeating block is [Brown Cylinder, Cone Tip Down, Green Cube, Cone Tip Up]. Blank A follows Cone Tip Down, so Solid A is Green Cube. Solid B is Cone Tip Up!'
    }
  ];

  // 4. Pattern Mastery Quizzes (4 Graded Curriculum Levels)
  const PATTERNS_QUIZ_LEVELS = [
    {
      levelId: 1,
      title: 'Level 1: Newly Learned 2D Polygons',
      badge: 'Pentagons, Hexagons & Octagons • 5 Questions',
      questions: [
        {
          q: 'Which polygon has 5 sides and appears in our worksheet pattern?',
          visual: ['pentagon_blue'],
          options: [
            { text: 'Pentagon (5 sides)', isCorrect: true, key: 'pentagon_blue' },
            { text: 'Hexagon (6 sides)', isCorrect: false, key: 'hexagon_blue' },
            { text: 'Octagon (8 sides)', isCorrect: false, key: 'octagon_orange' },
            { text: 'Triangle (3 sides)', isCorrect: false, key: 'triangle_up_red' }
          ],
          tip: 'A pentagon has 5 straight sides and 5 vertices!'
        },
        {
          q: 'In the pattern: Square, Hexagon, Triangle, Diamond, Square, Hexagon, ___, Diamond. What shape comes next?',
          visual: ['square_blue', 'hexagon_blue', 'triangle_up_yellow', 'diamond_blue', 'square_blue', 'hexagon_blue', 'blank', 'diamond_blue'],
          options: [
            { text: 'Triangle', isCorrect: true, key: 'triangle_up_yellow' },
            { text: 'Hexagon', isCorrect: false, key: 'hexagon_blue' },
            { text: 'Square', isCorrect: false, key: 'square_blue' },
            { text: 'Diamond', isCorrect: false, key: 'diamond_blue' }
          ],
          tip: 'Look at the repeating group: after Hexagon always comes Triangle!'
        },
        {
          q: 'How many sides does the blue shape in [Square, Hexagon, Triangle, Diamond] have?',
          visual: ['hexagon_blue'],
          options: [
            { text: '6 sides (Hexagon)', isCorrect: true },
            { text: '5 sides (Pentagon)', isCorrect: false },
            { text: '8 sides (Octagon)', isCorrect: false },
            { text: '4 sides (Square)', isCorrect: false }
          ],
          tip: 'Count the 6 edges: Hexagon has 6 sides!'
        },
        {
          q: 'In the pattern: Orange Octagon, Green Circle, Blue Octagon, Green Circle... how many sides does an octagon have?',
          visual: ['octagon_orange', 'circle_green', 'octagon_blue', 'circle_green'],
          options: [
            { text: '8 sides', isCorrect: true },
            { text: '6 sides', isCorrect: false },
            { text: '5 sides', isCorrect: false },
            { text: '10 sides', isCorrect: false }
          ],
          tip: 'An octagon has 8 straight sides (like a stop sign)!'
        },
        {
          q: 'What is the length of the repeating unit: [Pentagon, Rectangle, Square, Triangle Up, Triangle Down]?',
          visual: ['pentagon_blue', 'rect_tall_yellow', 'square_green', 'triangle_up_yellow', 'triangle_down_green'],
          options: [
            { text: '5 shapes', isCorrect: true },
            { text: '4 shapes', isCorrect: false },
            { text: '3 shapes', isCorrect: false },
            { text: '2 shapes', isCorrect: false }
          ],
          tip: 'Count them: 1 (pentagon), 2 (rectangle), 3 (square), 4 (triangle up), 5 (triangle down)!'
        }
      ]
    },
    {
      levelId: 2,
      title: 'Level 2: 3D Solids & Orientations',
      badge: 'Cylinders, Cones & Pyramids • 5 Questions',
      questions: [
        {
          q: 'Look at the cones: Tip Up, Tip Down, Tip Up, Tip Down. What attribute is changing?',
          visual: ['cone_up_blue', 'cone_down_blue', 'cone_up_blue', 'cone_down_blue'],
          options: [
            { text: 'Orientation (Direction / Upside Down)', isCorrect: true },
            { text: 'Number of flat faces', isCorrect: false },
            { text: 'The shape of the solid', isCorrect: false },
            { text: 'Number of edges', isCorrect: false }
          ],
          tip: 'Both are cones, but one is rotated with its tip pointing down!'
        },
        {
          q: 'In Worksheet 6: Tall Green Cylinder, Short Blue Cylinder. What attribute is changing?',
          visual: ['cylinder_tall_green', 'cylinder_short_blue'],
          options: [
            { text: 'Height and Size (Tall vs. Short)', isCorrect: true },
            { text: 'Number of curved surfaces', isCorrect: false },
            { text: 'Number of vertices', isCorrect: false },
            { text: 'Shape category', isCorrect: false }
          ],
          tip: 'Both are cylinders, but one is tall and one is short!'
        },
        {
          q: 'Look at the green cylinder: it is tilted! What solid is next: Tilted Cylinder, Purple Cone, Tilted Cylinder, ___?',
          visual: ['cylinder_tilted_green', 'cone_down_purple', 'cylinder_tilted_green', 'blank'],
          options: [
            { text: 'Pink Square Pyramid', isCorrect: true, key: 'pyramid_pink' },
            { text: 'Green Cube', isCorrect: false, key: 'cube_green' },
            { text: 'Tall Upright Cylinder', isCorrect: false, key: 'cylinder_tall_green' },
            { text: 'Short Blue Cylinder', isCorrect: false, key: 'cylinder_short_blue' }
          ],
          tip: 'Remember the repeating unit: [Tilted Cylinder, Cone, Tilted Cylinder, Pink Pyramid]!'
        },
        {
          q: 'How many flat faces does the cube have in the pattern [Cylinder, Cone, Cube]?',
          visual: ['cube_green'],
          options: [
            { text: '6 equal square faces', isCorrect: true },
            { text: '2 circular faces', isCorrect: false },
            { text: '1 flat face', isCorrect: false },
            { text: '0 flat faces', isCorrect: false }
          ],
          tip: 'A cube has 6 flat square faces!'
        },
        {
          q: 'Which solid has 1 pointy vertex corner: cylinder, cube, or cone?',
          visual: ['cone_up_blue'],
          options: [
            { text: 'Cone', isCorrect: true, key: 'cone_up_blue' },
            { text: 'Cylinder', isCorrect: false, key: 'cylinder_brown' },
            { text: 'Cube', isCorrect: false, key: 'cube_green' },
            { text: 'Sphere', isCorrect: false, key: 'circle_blue' }
          ],
          tip: 'A cone has 1 sharp vertex tip at the top!'
        }
      ]
    },
    {
      levelId: 3,
      title: 'Level 3: Blanks at the Start & Middle',
      badge: 'Finding A & B • 5 Questions',
      questions: [
        {
          q: 'The pattern is: A, B, Purple Pyramid, Orange Pyramid, Tall Cylinder, Short Cylinder. What are A and B?',
          visual: ['blank', 'blank', 'pyramid_purple', 'pyramid_sideways_orange', 'cylinder_tall_green', 'cylinder_short_blue'],
          options: [
            { text: 'Tall Cylinder and Short Cylinder', isCorrect: true, key: 'cylinder_tall_green' },
            { text: 'Two Purple Pyramids', isCorrect: false, key: 'pyramid_purple' },
            { text: 'Cube and Cone', isCorrect: false, key: 'cube_green' },
            { text: 'Two Spheres', isCorrect: false, key: 'circle_blue' }
          ],
          tip: 'Look at what comes right before the purple pyramid at the end of the repeating cycle!'
        },
        {
          q: 'In the sequence: Red Triangle, Tall Rectangle, Right Triangle, Circle, Red Triangle, A, B, Circle. What is A?',
          visual: ['triangle_up_red', 'blank', 'triangle_right_green', 'circle_blue'],
          options: [
            { text: 'Tall Yellow Rectangle', isCorrect: true, key: 'rect_tall_yellow' },
            { text: 'Green Right Triangle', isCorrect: false, key: 'triangle_right_green' },
            { text: 'Blue Circle', isCorrect: false, key: 'circle_blue' },
            { text: 'Blue Square', isCorrect: false, key: 'square_blue' }
          ],
          tip: 'In the repeating unit, the tall rectangle always comes right after the red triangle!'
        },
        {
          q: 'In the pattern: Brown Cylinder, Cone Down, Cube, Cone Up... what solid comes right after Cone Down?',
          visual: ['cone_down_blue', 'blank'],
          options: [
            { text: 'Green Cube', isCorrect: true, key: 'cube_green' },
            { text: 'Brown Cylinder', isCorrect: false, key: 'cylinder_brown' },
            { text: 'Cone Up', isCorrect: false, key: 'cone_up_blue' },
            { text: 'Purple Pyramid', isCorrect: false, key: 'pyramid_purple' }
          ],
          tip: 'Follow the 4-solid order: Cylinder, Cone Down, Cube, Cone Up!'
        },
        {
          q: 'What is the very first step to solve missing blanks A and B in a pattern?',
          visual: ['trophy'],
          options: [
            { text: 'Find and ring the group that repeats first!', isCorrect: true },
            { text: 'Count the total number of colors', isCorrect: false },
            { text: 'Guess any solid', isCorrect: false },
            { text: 'Add up the numbers', isCorrect: false }
          ],
          tip: 'Always identify the core repeating block first!'
        },
        {
          q: 'If the repeating block is 4 solids, and we see 8 solids in total, how many times did the block repeat?',
          visual: ['cylinder_tall_green', 'cylinder_short_blue', 'pyramid_purple', 'pyramid_sideways_orange'],
          options: [
            { text: '2 times (4 + 4 = 8)', isCorrect: true },
            { text: '4 times', isCorrect: false },
            { text: '3 times', isCorrect: false },
            { text: '1 time', isCorrect: false }
          ],
          tip: '8 divided by 4 = 2 complete cycles!'
        }
      ]
    },
    {
      levelId: 4,
      title: 'Level 4: Master Pattern Challenge',
      badge: 'Grade 2 Honors • 5 Questions',
      questions: [
        {
          q: 'Which repeating unit has alternating orientations: Triangle Point Up, Triangle Point Down?',
          visual: ['triangle_up_yellow', 'triangle_down_green'],
          options: [
            { text: '[Yellow Triangle Up, Green Triangle Down]', isCorrect: true },
            { text: '[Square, Rectangle]', isCorrect: false },
            { text: '[Circle, Octagon]', isCorrect: false },
            { text: '[Pentagon, Hexagon]', isCorrect: false }
          ],
          tip: 'Notice one triangle points up, and the other is inverted pointing down!'
        },
        {
          q: 'Why is the tilted green cylinder in Solve this! 2 different from an upright cylinder?',
          visual: ['cylinder_tilted_green', 'cylinder_tall_green'],
          options: [
            { text: 'It is rotated at a slanted angle (orientation)', isCorrect: true },
            { text: 'It has different face shapes', isCorrect: false },
            { text: 'It has pointy vertices', isCorrect: false },
            { text: 'It is a cone', isCorrect: false }
          ],
          tip: 'The solid shape is the same (cylinder), but its orientation is tilted!'
        },
        {
          q: 'In the pattern: Orange Octagon, Green Circle, Blue Octagon, Green Circle, what is shape #5?',
          visual: ['octagon_orange', 'circle_green', 'octagon_blue', 'circle_green', 'blank'],
          options: [
            { text: 'Orange Octagon (restarts repeating block)', isCorrect: true, key: 'octagon_orange' },
            { text: 'Green Circle', isCorrect: false, key: 'circle_green' },
            { text: 'Blue Octagon', isCorrect: false, key: 'octagon_blue' },
            { text: 'Pentagon', isCorrect: false, key: 'pentagon_blue' }
          ],
          tip: 'After the 4-shape block finishes, shape #5 restarts with the Orange Octagon!'
        },
        {
          q: 'Which shape has 8 sides: pentagon, hexagon, or octagon?',
          visual: ['octagon_blue'],
          options: [
            { text: 'Octagon', isCorrect: true, key: 'octagon_blue' },
            { text: 'Hexagon', isCorrect: false, key: 'hexagon_blue' },
            { text: 'Pentagon', isCorrect: false, key: 'pentagon_blue' },
            { text: 'Diamond', isCorrect: false, key: 'diamond_blue' }
          ],
          tip: 'Octa- means 8 (like an octopus has 8 arms)!'
        },
        {
          q: 'What makes Grade 2 patterns special compared to Grade 1?',
          visual: ['trophy'],
          options: [
            { text: 'They use new 3D solids, pentagons to octagons, and orientations & sizes', isCorrect: true },
            { text: 'They only use circles and squares', isCorrect: false },
            { text: 'They have no repeating rules', isCorrect: false },
            { text: 'They only have 2 shapes', isCorrect: false }
          ],
          tip: 'Grade 2 patterns test the newly learned solids, pentagons, hexagons, octagons, and tilts/sizes!'
        }
      ]
    }
  ];

  // Expose datasets to window
  window.RING_REPEAT_CHALLENGES = RING_REPEAT_CHALLENGES;
  window.MISSING_SHAPES_CHALLENGES = MISSING_SHAPES_CHALLENGES;
  window.MISSING_SOLIDS_CHALLENGES = MISSING_SOLIDS_CHALLENGES;
  window.PATTERNS_QUIZ_LEVELS = PATTERNS_QUIZ_LEVELS;

})();
