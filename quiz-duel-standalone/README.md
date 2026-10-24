# 🏆 Quiz Duel Arena - Standalone Template

A modular, zero-dependency, turn-based quiz duel game engine designed for 2-team classroom duels, head-to-head multiplayer, and fast-paced interactive quizzes.

---

## 📁 Directory Structure

```text
quiz-duel-standalone/
├── index.html           # Main game arena (Team 1 vs Team 2 + Central Arena)
├── css/
│   └── duel.css         # Complete styling, animations, responsive layouts & themes
├── js/
│   ├── engine.js        # Core game engine (turns, auto-advance, scoring, knockout)
│   ├── questions.js     # Question data provider & backend API adapter
│   ├── sound.js         # Procedural Web Audio API synthesizer (0 audio files needed)
│   └── confetti.js      # Pure HTML5 canvas confetti celebration engine
└── README.md            # This architecture & integration guide
```

---

## 🚀 Quick Start

1. Double-click `index.html` to open directly in any web browser.
2. No build tools (`npm`, `webpack`, `vite`) required. Runs completely offline.
3. You can copy the entire `quiz-duel-standalone` directory into any new repository or project.

---

## 🔌 Connecting to Your Backend

### 1. Database Question Schema (SQL / MongoDB / Firestore)

Each question in the duel uses this simple JSON contract:

```json
{
  "id": "q101",
  "topic": "World History",
  "visual": "In what year did the Apollo 11 moon landing occur?",
  "options": ["1965", "1969", "1972", "1980"],
  "correct": "1969",
  "tip": "Apollo 11 landed on the Moon on July 20, 1969."
}
```

### 2. Suggested Backend Endpoints

#### `GET /api/matches/:id` or `GET /api/quiz?category=math`
Returns two arrays of questions for the two competing teams:

```json
{
  "name": "Astronomy Duel",
  "team1": [
    { "topic": "Solar System", "visual": "Largest planet?", "options": ["Mars", "Jupiter", "Saturn", "Venus"], "correct": "Jupiter", "tip": "Jupiter is more massive than all other planets combined!" }
  ],
  "team2": [
    { "topic": "Moons", "visual": "Which planet has moon Titan?", "options": ["Saturn", "Earth", "Neptune", "Mars"], "correct": "Saturn", "tip": "Titan is the second largest moon in the solar system." }
  ]
}
```

#### `POST /api/questions`
Enables registered teachers or users to submit custom questions:
- **Payload**: `{ topic, visual, options: [a, b, c, d], correct, tip, author_id }`

### 3. Loading API Data in the Frontend

In `js/questions.js`, use the built-in `loadFromAPI` method:

```javascript
// Example: Load match from your Node/Express, FastAPI, or Supabase backend
await QuestionProvider.loadFromAPI('https://your-api.com/api/matches/match-42');
window.startMatch('api_set', false);
```

---

## 🎮 Game Engine Features (`js/engine.js`)

1. **Auto-Advance (2 Seconds)**:
   - When an answer is clicked, feedback is displayed, points are awarded, and the turn automatically passes to the opposing team after 2 seconds.
   - Players can click either the center stadium button or side panel button to skip the wait immediately.

2. **Per-Turn Countdown Timer**:
   - Configurable: `Untimed`, `15s`, `20s`, `25s`, or `30s` per turn.
   - Pulses red at $\le 5$s remaining.
   - Automatically handles time-out by revealing the correct answer and advancing turn.

3. **Victory & Knockout Logic**:
   - **Knockout**: Triggers if one team establishes a lead of 4 points over the other.
   - **Final Round**: Calculates winner after 8 rounds (16 turns).

---

## 🎨 Adding New Modes

In `js/engine.js`, `state.mode` currently defaults to `'tug_of_war'`. You can add new modes:
- **Speed Duel**: Both teams answer simultaneously; fastest correct answer gets the pull.
- **Sudden Death**: Any wrong answer immediately knocks the team out.
- **Solo Practice**: Play against an AI opponent with a randomized answer delay.
