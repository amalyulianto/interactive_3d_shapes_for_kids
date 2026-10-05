/**
 * 3D Solid Shapes Adventure - Quiz Game Engine
 * 4 Themed 5-Question Quizzes with immediate feedback, scoring, vector visuals, and celebration.
 */

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
        hint: 'A classic camping tent is a great example of a triangular prism!'
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
  if (window.sound) window.sound.playPop();
  currentQuizLevel = level;
  currentQuestionIndex = 0;
  currentScore = 0;

  const levelSelect = document.getElementById('quizLevelSelect');
  const endCard = document.getElementById('quizEndCard');
  const activeCard = document.getElementById('quizActiveCard');
  const titleEl = document.getElementById('quizLevelTitle');

  if (levelSelect) levelSelect.classList.add('hidden');
  if (endCard) endCard.classList.add('hidden');
  if (activeCard) activeCard.classList.remove('hidden');
  if (titleEl && QUIZ_LEVELS[level]) titleEl.textContent = QUIZ_LEVELS[level].title;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  if (!quiz) return;
  const q = quiz.questions[currentQuestionIndex];
  if (!q) return;

  const qNum = document.getElementById('currentQuestionNum');
  const scoreEl = document.getElementById('liveScore');
  const progressFill = document.getElementById('quizProgressFill');

  if (qNum) qNum.textContent = currentQuestionIndex + 1;
  if (scoreEl) scoreEl.textContent = currentScore;

  const pct = (currentQuestionIndex / quiz.questions.length) * 100;
  if (progressFill) progressFill.style.width = `${pct}%`;

  // Render vector illustration
  const visualEl = document.getElementById('questionVisual');
  if (visualEl) {
    visualEl.innerHTML = typeof getShapeOrObjectSvg === 'function' ? getShapeOrObjectSvg(q.visualId || q.visual, 80) : '';
  }

  const textEl = document.getElementById('questionText');
  if (textEl) textEl.textContent = q.text;

  const optContainer = document.getElementById('quizOptions');
  if (optContainer) optContainer.innerHTML = '';

  const feedback = document.getElementById('quizFeedback');
  if (feedback) feedback.className = 'quiz-feedback hidden';

  const nextBtn = document.getElementById('btnNextQuestion');
  if (nextBtn) nextBtn.classList.add('hidden');

  if (optContainer) {
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.onclick = () => handleQuizAnswer(optIdx, btn);
      optContainer.appendChild(btn);
    });
  }
}

function handleQuizAnswer(selectedIdx, clickedBtn) {
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  const q = quiz.questions[currentQuestionIndex];
  const allBtns = document.querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  const feedback = document.getElementById('quizFeedback');
  if (feedback) feedback.classList.remove('hidden');

  if (selectedIdx === q.answer) {
    if (window.sound) window.sound.playCorrect();
    clickedBtn.classList.add('correct');
    currentScore += 20;
    const scoreEl = document.getElementById('liveScore');
    if (scoreEl) scoreEl.textContent = currentScore;
    if (feedback) {
      feedback.className = 'quiz-feedback correct';
      feedback.textContent = `🌟 AWESOME! That is correct! ${q.hint ? '💡 ' + q.hint : ''}`;
    }

    if (window.AppUtils && window.AppUtils.confetti) {
      window.AppUtils.confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
    } else if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
    }
  } else {
    if (window.sound) window.sound.playWrong();
    clickedBtn.classList.add('wrong');
    if (allBtns[q.answer]) allBtns[q.answer].classList.add('correct');
    if (feedback) {
      feedback.className = 'quiz-feedback wrong';
      feedback.textContent = `💡 Correct answer: "${q.options[q.answer]}". ${q.hint}`;
    }
  }

  const nextBtn = document.getElementById('btnNextQuestion');
  if (nextBtn) {
    const isLast = currentQuestionIndex === quiz.questions.length - 1;
    nextBtn.textContent = isLast ? 'See Final Results 🏆' : 'Next Question ➡️';
    nextBtn.classList.remove('hidden');
  }
}

function onNextQuizQuestion() {
  if (window.sound) window.sound.playPop();
  const quiz = QUIZ_LEVELS[currentQuizLevel];
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.questions.length) {
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  if (window.sound) window.sound.playFanfare();
  const activeCard = document.getElementById('quizActiveCard');
  const endCard = document.getElementById('quizEndCard');
  const finalScoreEl = document.getElementById('finalScoreVal');

  if (activeCard) activeCard.classList.add('hidden');
  if (endCard) endCard.classList.remove('hidden');
  if (finalScoreEl) finalScoreEl.textContent = currentScore;

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

  const starsEl = document.getElementById('finalStars');
  const titleEl = document.getElementById('quizEndTitle');
  const msgEl = document.getElementById('quizEndMessage');

  if (starsEl) starsEl.textContent = stars;
  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = msg;

  if (window.AppUtils && window.AppUtils.confetti) {
    window.AppUtils.confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  } else if (typeof confetti === 'function') {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  }
}

function retryCurrentQuiz() {
  startQuizWithLevel(currentQuizLevel);
}

function returnToQuizSelect() {
  if (window.sound) window.sound.playPop();
  const endCard = document.getElementById('quizEndCard');
  const activeCard = document.getElementById('quizActiveCard');
  const levelSelect = document.getElementById('quizLevelSelect');

  if (endCard) endCard.classList.add('hidden');
  if (activeCard) activeCard.classList.add('hidden');
  if (levelSelect) levelSelect.classList.remove('hidden');
}

// Global window attachments
window.QUIZ_LEVELS = QUIZ_LEVELS;
window.startQuizWithLevel = startQuizWithLevel;
window.renderQuizQuestion = renderQuizQuestion;
window.handleQuizAnswer = handleQuizAnswer;
window.onNextQuizQuestion = onNextQuizQuestion;
window.finishQuiz = finishQuiz;
window.retryCurrentQuiz = retryCurrentQuiz;
window.returnToQuizSelect = returnToQuizSelect;
