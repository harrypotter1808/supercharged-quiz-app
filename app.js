/**
 * Supercharged Quiz App - Enterprise Web Engine
 * Replicating Core Java OOP Architecture & Features
 */

// 1. DIFFICULTY ENUM
const Difficulty = {
    EASY: { index: 0, name: "Easy", badge: "EASY [★☆☆]", points: 10, css: "badge-easy" },
    MEDIUM: { index: 1, name: "Medium", badge: "MEDIUM [★★☆]", points: 20, css: "badge-medium" },
    HARD: { index: 2, name: "Hard", badge: "HARD [★★★]", points: 30, css: "badge-hard" }
};

// 2. QUESTION BANK (3D Array: [CategoryIndex][DifficultyIndex][QuestionIndex])
const CATEGORIES = ["Java", "Python", "Math", "Science", "General Knowledge"];

const QUESTION_BANK_3D = [
    // CATEGORY 0: JAVA
    [
        // Easy
        [
            { id: "J-E1", text: "Which keyword is used to define a class in Java?", options: ["struct", "class", "interface", "object"], correct: 1, hint: "Starts with 'c' and is 5 letters long.", exp: "The 'class' keyword declares a class in Java." },
            { id: "J-E2", text: "What is the default value of a boolean variable in Java?", options: ["true", "false", "0", "null"], correct: 1, hint: "Defaults to a negative state.", exp: "Default boolean value is false." },
            { id: "J-E3", text: "Which method is the main entry point of a Java application?", options: ["start()", "run()", "main()", "execute()"], correct: 2, hint: "public static void main(String[] args)", exp: "main() is the application entry point." }
        ],
        // Medium
        [
            { id: "J-M1", text: "Which exception is thrown when dividing an integer by zero in Java?", options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IllegalArgumentException"], correct: 1, hint: "Relates to basic math operations.", exp: "ArithmeticException is thrown on integer division by zero." },
            { id: "J-M2", text: "What is the size of an int primitive in Java?", options: ["16-bit", "32-bit", "64-bit", "Depends on OS"], correct: 1, hint: "It is 4 bytes long.", exp: "Java int primitive is always 32-bit." },
            { id: "J-M3", text: "Which collection maintains insertion order and allows duplicates?", options: ["HashSet", "TreeSet", "ArrayList", "HashMap"], correct: 2, hint: "Backed by a dynamic array.", exp: "ArrayList maintains insertion order with duplicates." }
        ],
        // Hard
        [
            { id: "J-H1", text: "What happens if a thread calls wait() without holding the monitor lock?", options: ["Blocks indefinitely", "IllegalMonitorStateException is thrown", "Thread terminates", "Deadlock occurs"], correct: 1, hint: "Monitor ownership is required.", exp: "Object.wait() requires synchronization, throwing IllegalMonitorStateException otherwise." },
            { id: "J-H2", text: "Which low-latency GC was introduced in Java 11 for multi-terabyte heaps?", options: ["CMS", "G1GC", "ZGC", "Serial GC"], correct: 2, hint: "Starts with Z.", exp: "ZGC is a scalable low-latency garbage collector." },
            { id: "J-H3", text: "In Java 8+, where are static variables stored in memory?", options: ["PermGen", "Heap Memory (Class object)", "Native Stack", "Code Cache"], correct: 1, hint: "PermGen was removed in Java 8.", exp: "Statics are stored on the Heap in java.lang.Class objects." }
        ]
    ],
    // CATEGORY 1: PYTHON
    [
        // Easy
        [
            { id: "P-E1", text: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], correct: 1, hint: "Short 3-letter keyword.", exp: "'def' defines functions in Python." },
            { id: "P-E2", text: "Which Python data structure is immutable?", options: ["List", "Dictionary", "Tuple", "Set"], correct: 2, hint: "Enclosed in parentheses ().", exp: "Tuples are immutable sequences." },
            { id: "P-E3", text: "What symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], correct: 2, hint: "Hash or pound sign.", exp: "# denotes single line comments." }
        ],
        // Medium
        [
            { id: "P-M1", text: "What does __init__ represent in a Python class?", options: ["Destructor", "Constructor / Initializer", "Static method", "String conversion"], correct: 1, hint: "Called on object creation.", exp: "__init__ is the instance initializer constructor." },
            { id: "P-M2", text: "What is the output of bool([]) in Python?", options: ["True", "False", "None", "TypeError"], correct: 1, hint: "Empty collections evaluate falsey.", exp: "Empty lists evaluate to False." },
            { id: "P-M3", text: "Which built-in function yields index and item during iteration?", options: ["zip()", "map()", "enumerate()", "filter()"], correct: 2, hint: "Enumerates sequence items.", exp: "enumerate() yields (index, item) tuples." }
        ],
        // Hard
        [
            { id: "P-H1", text: "What is the main purpose of Python's GIL?", options: ["Accelerates multi-core CPU", "Ensures only 1 thread executes Python bytecode at a time", "Prevents C memory leaks", "Encrypts code"], correct: 1, hint: "Global Mutex Lock.", exp: "GIL prevents multi-thread bytecode concurrency in CPython." },
            { id: "P-H2", text: "What does list(zip(*[[1, 2], [3, 4]])) produce?", options: ["[(1, 2), (3, 4)]", "[(1, 3), (2, 4)]", "[[1, 2, 3, 4]]", "[(1, 4), (2, 3)]"], correct: 1, hint: "Unpacking transposes rows into columns.", exp: "Transposes matrix to [(1, 3), (2, 4)]." },
            { id: "P-H3", text: "What does @classmethod pass as its first implicit parameter?", options: ["self", "cls", "args", "kwargs"], correct: 1, hint: "Passes the class itself.", exp: "@classmethod receives cls (class object) as first param." }
        ]
    ],
    // CATEGORY 2: MATH
    [
        // Easy
        [
            { id: "M-E1", text: "What is the value of 15 * 6?", options: ["80", "90", "100", "75"], correct: 1, hint: "10 * 6 + 5 * 6", exp: "15 * 6 = 90." },
            { id: "M-E2", text: "What is the perimeter of a square with side 7 cm?", options: ["14 cm", "28 cm", "49 cm", "35 cm"], correct: 1, hint: "Perimeter = 4 * side.", exp: "4 * 7 = 28 cm." },
            { id: "M-E3", text: "What is 2^5?", options: ["16", "32", "64", "25"], correct: 1, hint: "2 * 2 * 2 * 2 * 2", exp: "2^5 = 32." }
        ],
        // Medium
        [
            { id: "M-M1", text: "What is the derivative of f(x) = 3x^2 + 5x - 7?", options: ["6x + 5", "3x + 5", "6x^2 + 5", "6x - 7"], correct: 0, hint: "Power rule: d/dx(x^n) = n*x^(n-1)", exp: "Derivative is 6x + 5." },
            { id: "M-M2", text: "What is log10(1000)?", options: ["2", "3", "10", "100"], correct: 1, hint: "10^x = 1000", exp: "10^3 = 1000 so log10(1000) = 3." },
            { id: "M-M3", text: "Right triangle legs 6 cm and 8 cm. What is the hypotenuse?", options: ["9 cm", "10 cm", "12 cm", "14 cm"], correct: 1, hint: "Pythagorean theorem: a^2 + b^2 = c^2", exp: "sqrt(36 + 64) = 10 cm." }
        ],
        // Hard
        [
            { id: "M-H1", text: "What is the value of integral(0 to pi) sin(x) dx?", options: ["0", "1", "2", "pi"], correct: 2, hint: "Antiderivative of sin(x) is -cos(x).", exp: "[-cos(pi)] - [-cos(0)] = 1 + 1 = 2." },
            { id: "M-H2", text: "How many ways can 5 distinct books be arranged?", options: ["25", "60", "120", "720"], correct: 2, hint: "5 factorial (5!)", exp: "5! = 120." },
            { id: "M-H3", text: "What is the determinant of matrix [[4, 2], [1, 5]]?", options: ["18", "22", "14", "20"], correct: 0, hint: "det = ad - bc", exp: "20 - 2 = 18." }
        ]
    ],
    // CATEGORY 3: SCIENCE
    [
        // Easy
        [
            { id: "S-E1", text: "What chemical symbol represents Water?", options: ["CO2", "H2O", "NaCl", "O2"], correct: 1, hint: "2 Hydrogen, 1 Oxygen", exp: "H2O is water." },
            { id: "S-E2", text: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2, hint: "Named after Roman god of war.", exp: "Mars appears red due to iron oxide." },
            { id: "S-E3", text: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"], correct: 1, hint: "Generates cellular ATP.", exp: "Mitochondria generate cellular energy." }
        ],
        // Medium
        [
            { id: "S-M1", text: "What is the speed of light in vacuum approximately?", options: ["3 x 10^5 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "1.5 x 10^8 m/s"], correct: 1, hint: "~300,000 km/s", exp: "Speed of light is 3x10^8 m/s." },
            { id: "S-M2", text: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: 2, hint: "~78% of dry air", exp: "Nitrogen makes up 78% of atmosphere." },
            { id: "S-M3", text: "What bond is formed by sharing pairs of electrons?", options: ["Ionic", "Covalent", "Hydrogen", "Metallic"], correct: 1, hint: "Shared valence electrons.", exp: "Covalent bonds share electron pairs." }
        ],
        // Hard
        [
            { id: "S-H1", text: "What is the half-life of Carbon-14 approximately?", options: ["1,200 yrs", "5,730 yrs", "10,500 yrs", "50,000 yrs"], correct: 1, hint: "Used in radiocarbon dating.", exp: "C-14 half-life is ~5,730 years." },
            { id: "S-H2", text: "Which subatomic particle has positive charge in nucleus?", options: ["Electron", "Positron", "Proton", "Neutron"], correct: 2, hint: "Discovered by Rutherford.", exp: "Protons carry +1 positive charge." },
            { id: "S-H3", text: "Which principle limits precision of position and momentum simultaneously?", options: ["Pauli Exclusion", "Heisenberg Uncertainty", "Schrodinger Equation", "Planck Law"], correct: 1, hint: "Formulated by Heisenberg.", exp: "Heisenberg Uncertainty Principle." }
        ]
    ],
    // CATEGORY 4: GENERAL KNOWLEDGE
    [
        // Easy
        [
            { id: "G-E1", text: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2, hint: "Covers >30% surface.", exp: "Pacific Ocean is the largest." },
            { id: "G-E2", text: "How many continents are on Earth?", options: ["5", "6", "7", "8"], correct: 2, hint: "Asia, Africa, N.America, S.America, Antarctica, Europe, Australia.", exp: "7 recognized continents." },
            { id: "G-E3", text: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], correct: 1, hint: "Italian master.", exp: "Leonardo da Vinci painted Mona Lisa." }
        ],
        // Medium
        [
            { id: "G-M1", text: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2, hint: "Not Sydney or Melbourne.", exp: "Canberra is Australia's capital." },
            { id: "G-M2", text: "In which year did World War II end?", options: ["1943", "1945", "1948", "1950"], correct: 1, hint: "Mid 1940s.", exp: "WWII ended in 1945." },
            { id: "G-M3", text: "Which element has chemical symbol 'Au'?", options: ["Silver", "Gold", "Copper", "Aluminum"], correct: 1, hint: "From Latin 'Aurum'.", exp: "Gold has symbol Au." }
        ],
        // Hard
        [
            { id: "G-H1", text: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1, hint: "Flows through NE Africa.", exp: "Nile River is longest (~6,650 km)." },
            { id: "G-H2", text: "Who was the first person in space?", options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"], correct: 1, hint: "Soviet cosmonaut 1961.", exp: "Yuri Gagarin traveled into space in 1961." },
            { id: "G-H3", text: "Which country has the most natural lakes?", options: ["USA", "Russia", "Canada", "Finland"], correct: 2, hint: ">60% of all lakes on Earth.", exp: "Canada has more natural lakes than any other country." }
        ]
    ]
];

// 3. ENGINE STATE
let state = {
    selectedCategoryIdx: -1,
    totalQuestionsSetting: 10,
    currentQuestionNum: 0,
    currentDifficulty: Difficulty.EASY,
    streak: 0,
    usedLifelines: new Set(),
    askedQuestionIds: new Set(),
    activeQuestion: null,
    activeOptions: [],
    questionStartTime: 0,
    timerInterval: null,
    questionDurationSec: 0,
    categoryStats: {}
};

// DOM ELEMENTS
const views = {
    menu: document.getElementById('view-main-menu'),
    quiz: document.getElementById('view-quiz-gameplay'),
    summary: document.getElementById('view-summary-report'),
    mock: document.getElementById('view-mock-runner')
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);
    document.getElementById('btn-mock-runner').addEventListener('click', startMockRunner);
    document.getElementById('btn-view-rules').addEventListener('click', () => showModal('rules-modal'));
    document.getElementById('btn-close-rules').addEventListener('click', () => hideModal('rules-modal'));

    document.getElementById('btn-lifeline-5050').addEventListener('click', () => useLifeline('5050'));
    document.getElementById('btn-lifeline-skip').addEventListener('click', () => useLifeline('skip'));
    document.getElementById('btn-lifeline-hint').addEventListener('click', () => useLifeline('hint'));

    document.getElementById('btn-close-hint').addEventListener('click', () => hideModal('hint-modal'));
    document.getElementById('btn-close-exception').addEventListener('click', () => hideModal('exception-modal'));

    document.getElementById('btn-next-question').addEventListener('click', advanceToNextQuestion);
    document.getElementById('btn-download-report').addEventListener('click', downloadSummaryReport);
    document.getElementById('btn-restart-quiz').addEventListener('click', () => switchView('menu'));
    document.getElementById('btn-mock-home').addEventListener('click', () => switchView('menu'));
    document.getElementById('btn-re-run-sim').addEventListener('click', startMockRunner);
}

function switchView(viewName) {
    Object.keys(views).forEach(k => views[k].classList.remove('active'));
    views[viewName].classList.add('active');
}

function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

// 4. QUIZ CONTROLLER
function startQuiz() {
    state.selectedCategoryIdx = parseInt(document.getElementById('category-select').value);
    state.totalQuestionsSetting = parseInt(document.getElementById('question-count').value);
    state.currentQuestionNum = 0;
    state.currentDifficulty = Difficulty.EASY;
    state.streak = 0;
    state.usedLifelines.clear();
    if (!state.askedQuestionIds) state.askedQuestionIds = new Set();
    state.askedQuestionIds.clear();
    state.categoryStats = {};

    ['5050', 'skip', 'hint'].forEach(ll => {
        const btn = document.getElementById(`btn-lifeline-${ll}`);
        btn.disabled = false;
    });

    switchView('quiz');
    loadNextQuestion();
}

function loadNextQuestion() {
    if (state.currentQuestionNum >= state.totalQuestionsSetting) {
        finishQuiz();
        return;
    }

    state.currentQuestionNum++;

    let catIdx = (state.selectedCategoryIdx >= 0) 
        ? state.selectedCategoryIdx 
        : ((state.currentQuestionNum - 1) % CATEGORIES.length);
    let catName = CATEGORIES[catIdx];

    let diffIdx = state.currentDifficulty.index;
    let questionsPool = QUESTION_BANK_3D[catIdx][diffIdx];
    // Filter unasked questions at target difficulty
    let pool = questionsPool.filter(q => !state.askedQuestionIds.has(q.id));

    // Fallback if difficulty level pool exhausted
    if (pool.length === 0) {
        for (let d = 0; d < 3; d++) {
            let altPool = QUESTION_BANK_3D[catIdx][d].filter(q => !state.askedQuestionIds.has(q.id));
            if (altPool.length > 0) { pool = altPool; break; }
        }
    }
    if (pool.length === 0) { pool = questionsPool; }

    let randomIndex = Math.floor(Math.random() * pool.length);
    let qObj = pool[randomIndex];
    state.askedQuestionIds.add(qObj.id);

    state.activeQuestion = qObj;
    state.activeOptions = [...qObj.options];

    document.getElementById('quiz-cat-badge').innerText = catName;
    const diffBadge = document.getElementById('quiz-diff-badge');
    diffBadge.innerText = state.currentDifficulty.badge;
    diffBadge.className = `pill-value ${state.currentDifficulty.css}`;

    document.getElementById('quiz-streak-badge').innerText = `🔥 ${state.streak}`;
    document.getElementById('quiz-progress-text').innerText = `${state.currentQuestionNum} / ${state.totalQuestionsSetting}`;

    document.getElementById('q-id-tag').innerText = qObj.id;
    document.getElementById('q-score-potential').innerText = `+${state.currentDifficulty.points} Base Pts`;
    document.getElementById('question-text').innerText = qObj.text;

    document.getElementById('explanation-box').classList.add('hidden');

    renderOptionsGrid();
    startTimer();
}

function renderOptionsGrid() {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    state.activeOptions.forEach((optText, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-card';
        if (optText.startsWith('[Removed')) {
            btn.classList.add('disabled-eliminated');
            btn.disabled = true;
        }

        btn.innerHTML = `<span class="opt-index">${i + 1})</span> <span>${optText}</span>`;
        btn.addEventListener('click', () => handleOptionSelection(i));
        grid.appendChild(btn);
    });
}

// 5. TIMER & ANTI-CHEAT
function startTimer() {
    clearInterval(state.timerInterval);
    state.questionStartTime = Date.now();
    state.questionDurationSec = 0;

    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-progress-bar');
    timerFill.style.width = '100%';

    state.timerInterval = setInterval(() => {
        const elapsedSec = (Date.now() - state.questionStartTime) / 1000;
        state.questionDurationSec = elapsedSec;
        timerText.innerText = `${elapsedSec.toFixed(1)}s`;

        const pct = Math.max(0, 100 - (elapsedSec / 15 * 100));
        timerFill.style.width = `${pct}%`;
    }, 100);
}

function stopTimer() {
    clearInterval(state.timerInterval);
}

// 6. OPTION SELECTION & STREAK ADAPTABILITY
function handleOptionSelection(userChoiceIdx) {
    stopTimer();

    const durationSec = state.questionDurationSec;

    if (durationSec < 2.0) {
        showExceptionModal("TooFastAnswerException", 
            `⚠️ [ANTI-CHEAT SYSTEM TRIGGERED]\nResponse submitted in ${durationSec.toFixed(2)}s (< 2.0s threshold). Speed audit flag generated.`);
    }

    const q = state.activeQuestion;
    const isCorrect = (userChoiceIdx === q.correct);
    const catName = q.category || CATEGORIES[state.selectedCategoryIdx >= 0 ? state.selectedCategoryIdx : ((state.currentQuestionNum - 1) % CATEGORIES.length)];

    let timeBonus = 0;
    if (isCorrect) {
        if (durationSec <= 5.0) timeBonus = 5;
        else if (durationSec <= 10.0) timeBonus = 2;
    }

    let basePoints = isCorrect ? state.currentDifficulty.points : 0;
    let totalQPoints = basePoints + timeBonus;

    recordCategoryProgress(catName, isCorrect, totalQPoints, durationSec, timeBonus);

    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) btn.classList.add('correct');
        else if (idx === userChoiceIdx && !isCorrect) btn.classList.add('wrong');
    });

    let feedbackText = "";
    if (isCorrect) {
        state.streak++;
        feedbackText = `✅ CORRECT! +${totalQPoints} pts${timeBonus > 0 ? ` (+${timeBonus}s speed bonus)` : ''}`;

        if (state.streak >= 2 && state.currentDifficulty !== Difficulty.HARD) {
            state.currentDifficulty = (state.currentDifficulty === Difficulty.EASY) ? Difficulty.MEDIUM : Difficulty.HARD;
            feedbackText += ` | 🔥 STREAK OF ${state.streak}! Difficulty upgraded to ${state.currentDifficulty.name}!`;
            state.streak = 0;
        }
    } else {
        state.streak = 0;
        feedbackText = `❌ INCORRECT! Correct answer: ${q.options[q.correct]}`;

        if (state.currentDifficulty !== Difficulty.EASY) {
            state.currentDifficulty = (state.currentDifficulty === Difficulty.HARD) ? Difficulty.MEDIUM : Difficulty.EASY;
            feedbackText += ` | 📉 Difficulty reduced to ${state.currentDifficulty.name}.`;
        }
    }

    const expBox = document.getElementById('explanation-box');
    const expHeader = document.getElementById('explanation-header');
    const expText = document.getElementById('explanation-text');

    expHeader.innerText = feedbackText;
    expHeader.style.color = isCorrect ? "#34d399" : "#fda4af";
    expText.innerText = `Explanation: ${q.exp}`;
    expBox.classList.remove('hidden');
}

function advanceToNextQuestion() {
    loadNextQuestion();
}

// 7. LIFELINES & EXCEPTION HANDLING
function useLifeline(type) {
    if (state.usedLifelines.has(type)) {
        showExceptionModal("LifelineAlreadyUsedException", 
            `The '${type.toUpperCase()}' lifeline has already been consumed in this session! Only 1 usage permitted per lifeline.`);
        return;
    }

    state.usedLifelines.add(type);
    document.getElementById(`btn-lifeline-${type}`).disabled = true;

    if (type === '5050') {
        const correctIdx = state.activeQuestion.correct;
        let incorrectIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
        incorrectIndices.sort(() => Math.random() - 0.5);

        state.activeOptions[incorrectIndices[0]] = "[Removed by 50/50]";
        state.activeOptions[incorrectIndices[1]] = "[Removed by 50/50]";
        renderOptionsGrid();
    } else if (type === 'skip') {
        stopTimer();
        loadNextQuestion();
    } else if (type === 'hint') {
        document.getElementById('hint-text').innerText = state.activeQuestion.hint;
        showModal('hint-modal');
    }
}

function showExceptionModal(title, msg) {
    document.getElementById('exception-title').innerText = title;
    document.getElementById('exception-message').innerText = msg;
    showModal('exception-modal');
}

// 8. PROGRESS TRACKING (HashMap Model)
function recordCategoryProgress(category, isCorrect, points, timeSec, timeBonus) {
    if (!state.categoryStats[category]) {
        state.categoryStats[category] = { attempted: 0, correct: 0, points: 0, timeSec: 0, timeBonuses: 0 };
    }
    const s = state.categoryStats[category];
    s.attempted++;
    if (isCorrect) s.correct++;
    s.points += points;
    s.timeSec += timeSec;
    s.timeBonuses += timeBonus;
}

// 9. SUMMARY REPORT EXPORT
function finishQuiz() {
    stopTimer();
    switchView('summary');

    let totalAttempted = 0, totalCorrect = 0, totalScore = 0, totalTimeSec = 0;
    let categoriesList = Object.keys(state.categoryStats);

    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        totalAttempted += c.attempted;
        totalCorrect += c.correct;
        totalScore += c.points;
        totalTimeSec += Math.round(c.timeSec);
    });

    const overallAccuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted * 100) : 0;

    document.getElementById('sum-total-q').innerText = totalAttempted;
    document.getElementById('sum-correct-q').innerText = totalCorrect;
    document.getElementById('sum-accuracy').innerText = `${overallAccuracy.toFixed(0)}%`;
    document.getElementById('sum-score').innerText = totalScore;
    document.getElementById('sum-time').innerText = `${totalTimeSec}s`;

    let strongest = { cat: "N/A", acc: -1 };
    let weakest = { cat: "N/A", acc: 101 };

    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        const acc = (c.correct / c.attempted) * 100;
        if (acc > strongest.acc) strongest = { cat: cat, acc: acc };
        if (acc < weakest.acc) weakest = { cat: cat, acc: acc };
    });

    document.getElementById('sum-strongest').innerText = `${strongest.cat} (${strongest.acc.toFixed(0)}%)`;
    document.getElementById('sum-weakest').innerText = `${weakest.cat} (${weakest.acc.toFixed(0)}%)`;

    const tbody = document.getElementById('breakdown-tbody');
    tbody.innerHTML = '';
    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        const acc = (c.correct / c.attempted * 100).toFixed(1);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${cat}</strong></td>
            <td>${c.correct} / ${c.attempted}</td>
            <td><span class="badge ${acc >= 70 ? 'badge-security' : 'badge-java'}">${acc}%</span></td>
            <td><strong>${c.points} pts</strong></td>
            <td>${Math.round(c.timeSec)}s</td>
        `;
        tbody.appendChild(tr);
    });
}

function downloadSummaryReport() {
    let totalAttempted = 0, totalCorrect = 0, totalScore = 0, totalTimeSec = 0;
    let categoriesList = Object.keys(state.categoryStats);

    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        totalAttempted += c.attempted;
        totalCorrect += c.correct;
        totalScore += c.points;
        totalTimeSec += Math.round(c.timeSec);
    });

    let strongest = { cat: "N/A", acc: -1 };
    let weakest = { cat: "N/A", acc: 101 };

    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        const acc = (c.correct / c.attempted) * 100;
        if (acc > strongest.acc) strongest = { cat: cat, acc: acc };
        if (acc < weakest.acc) weakest = { cat: cat, acc: acc };
    });

    let report = `====================================================\n`;
    report += `                    QUIZ SUMMARY                    \n`;
    report += `====================================================\n`;
    report += `Total Questions: ${totalAttempted}\n`;
    report += `Correct Answers: ${totalCorrect}\n`;
    report += `Time Taken:      ${totalTimeSec} seconds\n`;
    report += `Strongest Category: ${strongest.cat} (${strongest.acc.toFixed(0)}%)\n`;
    report += `Weakest Category:   ${weakest.cat} (${weakest.acc.toFixed(0)}%)\n`;
    report += `----------------------------------------------------\n`;
    report += `CATEGORY BREAKDOWN:\n`;
    categoriesList.forEach(cat => {
        const c = state.categoryStats[cat];
        const acc = (c.correct / c.attempted * 100).toFixed(1);
        report += ` - ${cat.padEnd(18)}: ${c.correct}/${c.attempted} Correct (${acc}%) | Score: ${c.points} pts | Time: ${Math.round(c.timeSec)}s\n`;
    });
    report += `====================================================\n`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_summary_report.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// 10. MOCK TEST SIMULATOR
function startMockRunner() {
    switchView('mock');
    document.getElementById('mock-results-card').classList.add('hidden');

    const progressFill = document.getElementById('sim-progress-fill');
    const progressLabel = document.getElementById('sim-progress-label');
    const pctLabel = document.getElementById('sim-pct-label');

    let attempt = 0;
    let totalScores = [], totalAccuracies = [], totalTimes = [];
    let sub2sViolations = 0, speedAnomalies = 0, botDetections = 0;

    const interval = setInterval(() => {
        attempt++;
        const pct = Math.min(100, attempt);
        progressFill.style.width = `${pct}%`;
        progressLabel.innerText = `Executing Batch Simulation: Attempt ${attempt} / 100...`;
        pctLabel.innerText = `${pct}%`;

        let profile = (attempt % 4);
        let targetAcc = [0.70, 0.95, 0.25, 0.90][profile];
        let minSpeed = [2.2, 2.5, 2.0, 0.4][profile];
        let maxSpeed = [6.5, 6.0, 7.0, 1.4][profile];

        let attemptScore = 0, attemptCorrect = 0, attemptTime = 0, attemptViolations = 0;

        for (let q = 0; q < 10; q++) {
            let speedSec = minSpeed + Math.random() * (maxSpeed - minSpeed);
            if (speedSec < 2.0) {
                sub2sViolations++;
                attemptViolations++;
            }
            let isCorrect = Math.random() < targetAcc;
            if (isCorrect) {
                attemptCorrect++;
                attemptScore += (speedSec <= 5 ? 25 : 20);
            }
            attemptTime += speedSec;
        }

        totalScores.push(attemptScore);
        totalAccuracies.push((attemptCorrect / 10) * 100);
        totalTimes.push(attemptTime);

        if (attemptViolations >= 3) botDetections++;
        if ((attemptCorrect / 10) > 0.85 && attemptTime < 20) speedAnomalies++;

        if (attempt >= 100) {
            clearInterval(interval);
            displayMockResults(totalScores, totalAccuracies, totalTimes, sub2sViolations, speedAnomalies, botDetections);
        }
    }, 15);
}

function displayMockResults(scores, accs, times, sub2s, highspeed, bots) {
    const avgScore = (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
    const avgAcc = (accs.reduce((a,b)=>a+b,0)/accs.length).toFixed(1);
    const avgTime = (times.reduce((a,b)=>a+b,0)/times.length).toFixed(1);

    document.getElementById('mock-avg-score').innerText = avgScore;
    document.getElementById('mock-avg-acc').innerText = `${avgAcc}%`;
    document.getElementById('mock-avg-time').innerText = `${avgTime}s`;

    document.getElementById('anom-sub2s').innerText = `${sub2s}`;
    document.getElementById('anom-highscore').innerText = `${highspeed}`;
    document.getElementById('anom-bots').innerText = `${bots} / 100 (${bots}%)`;

    document.getElementById('mock-results-card').classList.remove('hidden');
}
