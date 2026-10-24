/**
 * Quiz Duel - Question Data Provider & Backend Adapter
 * 
 * To plug in your custom backend:
 * 1. Implement your API returning JSON matching the QUESTION schema below.
 * 2. Call `QuestionProvider.loadFromAPI('/api/match/123')` before starting the match.
 */

const DEFAULT_QUESTION_SETS = {
  set1: {
    name: "Match 1: Mixed Chapter 5",
    team1: [
      { id: "q1", topic: "Bonds to 20", visual: "14 + ___ = 20", options: [6, 5, 7, 8], correct: 6, tip: "14 + 6 = 20! (4 and 6 make 10)" },
      { id: "q2", topic: "Bonds to 100", visual: "30 + ___ = 100", options: [70, 60, 80, 50], correct: 70, tip: "3 tens + 7 tens = 10 tens (100)!" },
      { id: "q3", topic: "Take Away from 20", visual: "20 - 7 = ___", options: [13, 12, 14, 11], correct: 13, tip: "20 - 7 = 13, because 13 + 7 = 20!" },
      { id: "q4", topic: "Next-Ten Hopper", visual: "45 + ___ = 50", options: [5, 4, 6, 15], correct: 5, tip: "5 more gets us to the next multiple of 10!" },
      { id: "q5", topic: "3-Part Combiner", visual: "11 + 4 + ___ = 20", options: [5, 4, 6, 7], correct: 5, tip: "11 + 4 = 15, then 15 + 5 = 20!" },
      { id: "q6", topic: "Bonds to 100", visual: "80 + ___ = 100", options: [20, 30, 10, 40], correct: 20, tip: "80 + 20 = 100!" },
      { id: "q7", topic: "Take Away from 20", visual: "20 - 16 = ___", options: [4, 5, 3, 6], correct: 4, tip: "20 - 16 = 4, because 16 + 4 = 20!" },
      { id: "q8", topic: "Next-Ten Hopper", visual: "63 + ___ = 70", options: [7, 8, 6, 3], correct: 7, tip: "3 and 7 make 10, so 63 + 7 = 70!" }
    ],
    team2: [
      { id: "q9", topic: "Bonds to 20", visual: "12 + ___ = 20", options: [8, 7, 9, 6], correct: 8, tip: "12 + 8 = 20! (2 and 8 make 10)" },
      { id: "q10", topic: "Bonds to 100", visual: "50 + ___ = 100", options: [50, 40, 60, 30], correct: 50, tip: "50 + 50 = 100! Half of 100 is 50." },
      { id: "q11", topic: "Take Away from 20", visual: "20 - 9 = ___", options: [11, 12, 10, 13], correct: 11, tip: "20 - 9 = 11, because 11 + 9 = 20!" },
      { id: "q12", topic: "Next-Ten Hopper", visual: "62 + ___ = 70", options: [8, 7, 9, 6], correct: 8, tip: "2 and 8 make 10, so 62 + 8 = 70!" },
      { id: "q13", topic: "3-Part Combiner", visual: "13 + 2 + ___ = 20", options: [5, 4, 6, 7], correct: 5, tip: "13 + 2 = 15, then 15 + 5 = 20!" },
      { id: "q14", topic: "Bonds to 100", visual: "40 + ___ = 100", options: [60, 50, 70, 40], correct: 60, tip: "40 + 60 = 100!" },
      { id: "q15", topic: "Take Away from 20", visual: "20 - 15 = ___", options: [5, 4, 6, 7], correct: 5, tip: "20 - 15 = 5, because 15 + 5 = 20!" },
      { id: "q16", topic: "Next-Ten Hopper", visual: "27 + ___ = 30", options: [3, 4, 2, 7], correct: 3, tip: "7 and 3 make 10, so 27 + 3 = 30!" }
    ]
  },
  set2: {
    name: "Match 2: Rematch Challenge",
    team1: [
      { id: "q17", topic: "Bonds to 20", visual: "17 + ___ = 20", options: [3, 2, 4, 5], correct: 3, tip: "17 + 3 = 20! (7 and 3 make 10)" },
      { id: "q18", topic: "Bonds to 100", visual: "60 + ___ = 100", options: [40, 50, 30, 20], correct: 40, tip: "60 + 40 = 100!" },
      { id: "q19", topic: "Take Away from 20", visual: "20 - 4 = ___", options: [16, 15, 17, 14], correct: 16, tip: "20 - 4 = 16, because 16 + 4 = 20!" },
      { id: "q20", topic: "Next-Ten Hopper", visual: "84 + ___ = 90", options: [6, 5, 7, 4], correct: 6, tip: "4 and 6 make 10, so 84 + 6 = 90!" },
      { id: "q21", topic: "3-Part Combiner", visual: "8 + 7 + ___ = 20", options: [5, 4, 6, 3], correct: 5, tip: "8 + 7 = 15, then 15 + 5 = 20!" },
      { id: "q22", topic: "Bonds to 100", visual: "10 + ___ = 100", options: [90, 80, 100, 70], correct: 90, tip: "10 + 90 = 100!" },
      { id: "q23", topic: "Take Away from 20", visual: "20 - 12 = ___", options: [8, 7, 9, 6], correct: 8, tip: "20 - 12 = 8, because 12 + 8 = 20!" },
      { id: "q24", topic: "Next-Ten Hopper", visual: "51 + ___ = 60", options: [9, 8, 7, 1], correct: 9, tip: "1 and 9 make 10, so 51 + 9 = 60!" }
    ],
    team2: [
      { id: "q25", topic: "Bonds to 20", visual: "9 + ___ = 20", options: [11, 10, 12, 9], correct: 11, tip: "9 + 11 = 20! (9 and 1 make 10, + 10 is 20)" },
      { id: "q26", topic: "Bonds to 100", visual: "20 + ___ = 100", options: [80, 70, 90, 60], correct: 80, tip: "20 + 80 = 100!" },
      { id: "q27", topic: "Take Away from 20", visual: "20 - 8 = ___", options: [12, 11, 13, 14], correct: 12, tip: "20 - 8 = 12, because 12 + 8 = 20!" },
      { id: "q28", topic: "Next-Ten Hopper", visual: "76 + ___ = 80", options: [4, 5, 3, 6], correct: 4, tip: "6 and 4 make 10, so 76 + 4 = 80!" },
      { id: "q29", topic: "3-Part Combiner", visual: "10 + 6 + ___ = 20", options: [4, 3, 5, 6], correct: 4, tip: "10 + 6 = 16, then 16 + 4 = 20!" },
      { id: "q30", topic: "Bonds to 100", visual: "70 + ___ = 100", options: [30, 20, 40, 50], correct: 30, tip: "70 + 30 = 100!" },
      { id: "q31", topic: "Take Away from 20", visual: "20 - 18 = ___", options: [2, 3, 1, 4], correct: 2, tip: "20 - 18 = 2, because 18 + 2 = 20!" },
      { id: "q32", topic: "Next-Ten Hopper", visual: "38 + ___ = 40", options: [2, 3, 1, 8], correct: 2, tip: "8 and 2 make 10, so 38 + 2 = 40!" }
    ]
  }
};

const QuestionProvider = {
  customSets: {},

  /**
   * Fetch questions for a match by set key or shuffle mode
   */
  getQuestions(setKey = 'set1') {
    if (setKey === 'shuffle') {
      const poolT1 = [
        ...DEFAULT_QUESTION_SETS.set1.team1,
        ...DEFAULT_QUESTION_SETS.set2.team1
      ];
      const poolT2 = [
        ...DEFAULT_QUESTION_SETS.set1.team2,
        ...DEFAULT_QUESTION_SETS.set2.team2
      ];
      return {
        team1: this._shuffle(poolT1).slice(0, 8),
        team2: this._shuffle(poolT2).slice(0, 8)
      };
    }

    const selected = this.customSets[setKey] || DEFAULT_QUESTION_SETS[setKey] || DEFAULT_QUESTION_SETS.set1;
    return {
      team1: [...selected.team1],
      team2: [...selected.team2]
    };
  },

  /**
   * Connect to your backend REST API:
   * E.g. QuestionProvider.loadFromAPI('http://localhost:3000/api/matches/custom-match')
   */
  async loadFromAPI(endpointUrl) {
    try {
      const response = await fetch(endpointUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      // Expected backend format: { setKey: 'custom', team1: [...8 questions], team2: [...8 questions] }
      if (data && data.team1 && data.team2) {
        const key = data.setKey || 'api_set';
        this.customSets[key] = data;
        return key;
      }
      throw new Error("Invalid question data structure returned from backend");
    } catch (err) {
      console.error("Failed to load questions from backend API:", err);
      return null;
    }
  },

  /**
   * Helper to register user-created custom questions locally or after POST request
   */
  registerCustomSet(key, name, team1Questions, team2Questions) {
    this.customSets[key] = {
      name: name || key,
      team1: team1Questions,
      team2: team2Questions
    };
  },

  _shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
};

window.QuestionProvider = QuestionProvider;
window.DEFAULT_QUESTION_SETS = DEFAULT_QUESTION_SETS;
