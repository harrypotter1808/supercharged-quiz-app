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
const CATEGORIES = [
    "Java & OOP", 
    "Python & Scripting", 
    "Data Structures & Algorithms", 
    "Computer Science Core", 
    "Engineering Mathematics", 
    "General Knowledge & Tech"
];

const QUESTION_BANK_3D = [
    // CATEGORY 0: JAVA & OOP
    [
        // Easy
        [
            { id: "J-E1", category: "Java & OOP", text: "Which keyword is used to define a class in Java?", options: ["struct", "class", "interface", "object"], correct: 1, hint: "Starts with 'c' and is 5 letters long.", exp: "The 'class' keyword declares a class in Java." },
            { id: "J-E2", category: "Java & OOP", text: "What is the default value of a boolean variable in Java?", options: ["true", "false", "0", "null"], correct: 1, hint: "Defaults to a negative state.", exp: "Default boolean value is false." },
            { id: "J-E3", category: "Java & OOP", text: "Which method is the main entry point of a Java application?", options: ["start()", "run()", "main()", "execute()"], correct: 2, hint: "public static void main(String[] args)", exp: "main() is the application entry point." }
        ],
        // Medium
        [
            { id: "J-M1", category: "Java & OOP", text: "Which exception is thrown when dividing an integer by zero in Java?", options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IllegalArgumentException"], correct: 1, hint: "Relates to basic math operations.", exp: "ArithmeticException is thrown on integer division by zero." },
            { id: "J-M2", category: "Java & OOP", text: "What is the size of an int primitive in Java?", options: ["16-bit", "32-bit", "64-bit", "Depends on OS"], correct: 1, hint: "It is 4 bytes long.", exp: "Java int primitive is always 32-bit." },
            { id: "J-M3", category: "Java & OOP", text: "Which collection maintains insertion order and allows duplicates?", options: ["HashSet", "TreeSet", "ArrayList", "HashMap"], correct: 2, hint: "Backed by a dynamic array.", exp: "ArrayList maintains insertion order with duplicates." }
        ],
        // Hard
        [
            { id: "J-H1", category: "Java & OOP", text: "What happens if a thread calls wait() without holding the monitor lock?", options: ["Blocks indefinitely", "IllegalMonitorStateException is thrown", "Thread terminates", "Deadlock occurs"], correct: 1, hint: "Monitor ownership is required.", exp: "Object.wait() requires synchronization, throwing IllegalMonitorStateException otherwise." },
            { id: "J-H2", category: "Java & OOP", text: "Which low-latency GC was introduced in Java 11 for multi-terabyte heaps?", options: ["CMS", "G1GC", "ZGC", "Serial GC"], correct: 2, hint: "Starts with Z.", exp: "ZGC is a scalable low-latency garbage collector." },
            { id: "J-H3", category: "Java & OOP", text: "In Java 8+, where are static variables stored in memory?", options: ["PermGen", "Heap Memory (Class object)", "Native Stack", "Code Cache"], correct: 1, hint: "PermGen was removed in Java 8.", exp: "Statics are stored on the Heap in java.lang.Class objects." }
        ]
    ],
    // CATEGORY 1: PYTHON & SCRIPTING
    [
        // Easy
        [
            { id: "P-E1", category: "Python & Scripting", text: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], correct: 1, hint: "Short 3-letter keyword.", exp: "'def' defines functions in Python." },
            { id: "P-E2", category: "Python & Scripting", text: "Which Python data structure is immutable?", options: ["List", "Dictionary", "Tuple", "Set"], correct: 2, hint: "Enclosed in parentheses ().", exp: "Tuples are immutable sequences." },
            { id: "P-E3", category: "Python & Scripting", text: "What symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], correct: 2, hint: "Hash or pound sign.", exp: "# denotes single line comments." }
        ],
        // Medium
        [
            { id: "P-M1", category: "Python & Scripting", text: "What does __init__ represent in a Python class?", options: ["Destructor", "Constructor / Initializer", "Static method", "String conversion"], correct: 1, hint: "Called on object creation.", exp: "__init__ is the instance initializer constructor." },
            { id: "P-M2", category: "Python & Scripting", text: "What is the output of bool([]) in Python?", options: ["True", "False", "None", "TypeError"], correct: 1, hint: "Empty collections evaluate falsey.", exp: "Empty lists evaluate to False." },
            { id: "P-M3", category: "Python & Scripting", text: "Which built-in function yields index and item during iteration?", options: ["zip()", "map()", "enumerate()", "filter()"], correct: 2, hint: "Enumerates sequence items.", exp: "enumerate() yields (index, item) tuples." }
        ],
        // Hard
        [
            { id: "P-H1", category: "Python & Scripting", text: "What is the main purpose of Python's GIL?", options: ["Accelerates multi-core CPU", "Ensures only 1 thread executes Python bytecode at a time", "Prevents C memory leaks", "Encrypts code"], correct: 1, hint: "Global Mutex Lock.", exp: "GIL prevents multi-thread bytecode concurrency in CPython." },
            { id: "P-H2", category: "Python & Scripting", text: "What does list(zip(*[[1, 2], [3, 4]])) produce?", options: ["[(1, 2), (3, 4)]", "[(1, 3), (2, 4)]", "[[1, 2, 3, 4]]", "[(1, 4), (2, 3)]"], correct: 1, hint: "Unpacking transposes rows into columns.", exp: "Transposes matrix to [(1, 3), (2, 4)]." },
            { id: "P-H3", category: "Python & Scripting", text: "What does @classmethod pass as its first implicit parameter?", options: ["self", "cls", "args", "kwargs"], correct: 1, hint: "Passes the class itself.", exp: "@classmethod receives cls (class object) as first param." }
        ]
    ],
    // CATEGORY 2: DATA STRUCTURES & ALGORITHMS
    [
        // Easy
        [
            { id: "D-E1", category: "Data Structures & Algorithms", text: "Which data structure works on a LIFO (Last In, First Out) basis?", options: ["Queue", "Stack", "LinkedList", "Tree"], correct: 1, hint: "Think of a stack of plates.", exp: "Stack strictly follows Last-In-First-Out access." },
            { id: "D-E2", category: "Data Structures & Algorithms", text: "What is the time complexity of accessing an element in an array by index?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: 0, hint: "Direct memory offset calculation.", exp: "Array indexing is constant O(1) time complexity." },
            { id: "D-E3", category: "Data Structures & Algorithms", text: "Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], correct: 2, hint: "Divide and conquer algorithm using extra space.", exp: "Merge Sort guarantees O(n log n) in all cases." }
        ],
        // Medium
        [
            { id: "D-M1", category: "Data Structures & Algorithms", text: "In a Binary Search Tree (BST), which traversal retrieves keys in sorted ascending order?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], correct: 1, hint: "Left -> Root -> Right", exp: "In-order traversal visits nodes in ascending order in a BST." },
            { id: "D-M2", category: "Data Structures & Algorithms", text: "Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?", options: ["Stack", "Queue", "PriorityQueue", "Hash Table"], correct: 1, hint: "First-In-First-Out queueing.", exp: "BFS processes nodes level by level using a Queue." },
            { id: "D-M3", category: "Data Structures & Algorithms", text: "What is the worst-case time complexity of QuickSelect for finding the k-th smallest element?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], correct: 2, hint: "Occurs when bad pivot selection degrades partitioning.", exp: "Worst-case QuickSelect is O(n^2) when bad pivots are chosen." }
        ],
        // Hard
        [
            { id: "D-H1", category: "Data Structures & Algorithms", text: "What is the amortized time complexity per insertion operation for dynamic array resizing?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correct: 1, hint: "Geometric expansion distributes copy overhead.", exp: "Amortized insertion time in dynamic arrays is O(1)." },
            { id: "D-H2", category: "Data Structures & Algorithms", text: "Which algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights?", options: ["Floyd-Warshall", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Bellman-Ford"], correct: 1, hint: "Uses a priority queue to greedily pick nearest unvisited vertex.", exp: "Dijkstra's Algorithm solves single-source shortest path for non-negative weights." },
            { id: "D-H3", category: "Data Structures & Algorithms", text: "What is the height balance factor condition for an AVL Tree for any node?", options: ["-1, 0, or +1", "-2 to +2", "Strictly 0", "Any positive integer"], correct: 0, hint: "Height of left subtree minus height of right subtree.", exp: "AVL trees strictly require height balance factor in {-1, 0, +1}." }
        ]
    ],
    // CATEGORY 3: COMPUTER SCIENCE CORE
    [
        // Easy
        [
            { id: "C-E1", category: "Computer Science Core", text: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Logic", "Standard Quick Lookup", "System Query Link"], correct: 0, hint: "Standard relational database language.", exp: "SQL stands for Structured Query Language." },
            { id: "C-E2", category: "Computer Science Core", text: "Which OSI layer is responsible for IP routing between networks?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"], correct: 1, hint: "Layer 3 of the OSI model.", exp: "Network Layer handles IP addressing and routing." },
            { id: "C-E3", category: "Computer Science Core", text: "What is the main function of an Operating System's kernel?", options: ["UI rendering", "Core resource management and hardware abstraction", "Compiling code", "Web browsing"], correct: 1, hint: "Central hub interfacing CPU, memory, and devices.", exp: "Kernel manages system resources and hardware interaction." }
        ],
        // Medium
        [
            { id: "C-M1", category: "Computer Science Core", text: "Which ACID property ensures that a transaction is all-or-nothing?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], correct: 0, hint: "Atomic unit of execution.", exp: "Atomicity guarantees that all steps succeed or none take effect." },
            { id: "C-M2", category: "Computer Science Core", text: "What is a deadlock condition where threads are waiting for resources held by each other in a closed chain?", options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"], correct: 3, hint: "A closed loop of dependencies.", exp: "Circular Wait is the 4th Coffman deadlock condition." },
            { id: "C-M3", category: "Computer Science Core", text: "Which HTTP status code indicates '404 Not Found'?", options: ["200 OK", "301 Moved Permanently", "404 Not Found", "500 Internal Server Error"], correct: 2, hint: "Client error when resource missing.", exp: "404 represents Not Found." }
        ],
        // Hard
        [
            { id: "C-H1", category: "Computer Science Core", text: "Which CPU scheduling algorithm can suffer from the 'Convoy Effect'?", options: ["Round Robin", "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling"], correct: 1, hint: "Non-preemptive queueing where long jobs block short ones.", exp: "FCFS causes Convoy Effect when a long CPU-bound process blocks IO processes." },
            { id: "C-H2", category: "Computer Science Core", text: "In TCP 3-way handshake, what sequence of flags is exchanged to establish a connection?", options: ["SYN -> SYN-ACK -> ACK", "ACK -> SYN -> ACK", "FIN -> ACK -> FIN-ACK", "SYN -> ACK -> RST"], correct: 0, hint: "Synchronize -> Synchronize-Acknowledge -> Acknowledge", exp: "TCP connection setup uses SYN -> SYN-ACK -> ACK." },
            { id: "C-H3", category: "Computer Science Core", text: "What Normal Form removes transitive dependencies in a database table?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 2, hint: "Non-prime attribute depending on another non-prime attribute.", exp: "3NF (Third Normal Form) eliminates transitive functional dependencies." }
        ]
    ],
    // CATEGORY 4: ENGINEERING MATHEMATICS
    [
        // Easy
        [
            { id: "M-E1", category: "Engineering Mathematics", text: "What is the rank of a 3x3 identity matrix?", options: ["0", "1", "2", "3"], correct: 3, hint: "Number of non-zero rows/linearly independent vectors.", exp: "Rank of 3x3 Identity Matrix is 3." },
            { id: "M-E2", category: "Engineering Mathematics", text: "What is the derivative of sin(x) with respect to x?", options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"], correct: 0, hint: "Standard trigonometric derivative.", exp: "d/dx(sin x) = cos x." },
            { id: "M-E3", category: "Engineering Mathematics", text: "What is the probability of getting a head on a single fair coin toss?", options: ["0.25", "0.50", "0.75", "1.00"], correct: 1, hint: "1 favorable outcome out of 2 equally likely.", exp: "P(Head) = 1/2 = 0.50." }
        ],
        // Medium
        [
            { id: "M-M1", category: "Engineering Mathematics", text: "What is the derivative of f(x) = 3x^2 + 5x - 7?", options: ["6x + 5", "3x + 5", "6x^2 + 5", "6x - 7"], correct: 0, hint: "Power rule: d/dx(x^n) = n*x^(n-1)", exp: "Derivative is 6x + 5." },
            { id: "M-M2", category: "Engineering Mathematics", text: "What is log10(1000)?", options: ["2", "3", "10", "100"], correct: 1, hint: "10^x = 1000", exp: "10^3 = 1000 so log10(1000) = 3." },
            { id: "M-M3", category: "Engineering Mathematics", text: "Eigenvalues of a real symmetric matrix are always:", options: ["Complex numbers", "Real numbers", "Purely imaginary", "Zero"], correct: 1, hint: "Spectral theorem property.", exp: "Real symmetric matrices always have real eigenvalues." }
        ],
        // Hard
        [
            { id: "M-H1", category: "Engineering Mathematics", text: "What is the value of integral(0 to pi) sin(x) dx?", options: ["0", "1", "2", "pi"], correct: 2, hint: "Antiderivative of sin(x) is -cos(x).", exp: "[-cos(pi)] - [-cos(0)] = 1 + 1 = 2." },
            { id: "M-H2", category: "Engineering Mathematics", text: "How many ways can 5 distinct books be arranged?", options: ["25", "60", "120", "720"], correct: 2, hint: "5 factorial (5!)", exp: "5! = 120." },
            { id: "M-H3", category: "Engineering Mathematics", text: "What is the determinant of matrix [[4, 2], [1, 5]]?", options: ["18", "22", "14", "20"], correct: 0, hint: "det = ad - bc", exp: "20 - 2 = 18." }
        ]
    ],
    // CATEGORY 5: GENERAL KNOWLEDGE & TECH
    [
        // Easy
        [
            { id: "G-E1", category: "General Knowledge & Tech", text: "Who is known as the co-founder of Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], correct: 1, hint: "Co-founded Microsoft with Paul Allen.", exp: "Bill Gates co-founded Microsoft." },
            { id: "G-E2", category: "General Knowledge & Tech", text: "What does CPU stand for in computer systems?", options: ["Central Processing Unit", "Central Performance Unit", "Core Power Utility", "Computer Program Unit"], correct: 0, hint: "Main processor component.", exp: "CPU stands for Central Processing Unit." },
            { id: "G-E3", category: "General Knowledge & Tech", text: "Which company developed the Android Operating System originally?", options: ["Google", "Android Inc.", "Apple", "Nokia"], correct: 1, hint: "Acquired by Google in 2005.", exp: "Android Inc. was founded in 2003 before acquisition by Google." }
        ],
        // Medium
        [
            { id: "G-M1", category: "General Knowledge & Tech", text: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2, hint: "Not Sydney or Melbourne.", exp: "Canberra is Australia's capital." },
            { id: "G-M2", category: "General Knowledge & Tech", text: "In tech terminology, what does 'API' stand for?", options: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Interface", "Array Processing Instruction"], correct: 0, hint: "Interface connecting software services.", exp: "API stands for Application Programming Interface." },
            { id: "G-M3", category: "General Knowledge & Tech", text: "Which element has chemical symbol 'Au'?", options: ["Silver", "Gold", "Copper", "Aluminum"], correct: 1, hint: "From Latin 'Aurum'.", exp: "Gold has symbol Au." }
        ],
        // Hard
        [
            { id: "G-H1", category: "General Knowledge & Tech", text: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1, hint: "Flows through NE Africa.", exp: "Nile River is longest (~6,650 km)." },
            { id: "G-H2", category: "General Knowledge & Tech", text: "Who was the first person in space?", options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"], correct: 1, hint: "Soviet cosmonaut 1961.", exp: "Yuri Gagarin traveled into space in 1961." },
            { id: "G-H3", category: "General Knowledge & Tech", text: "Which architectural pattern decouples frontend presentation from backend microservices using dedicated gateways?", options: ["BFF (Backend For Frontend)", "Monolith", "CQRS", "MVC"], correct: 0, hint: "Optimizes frontend-specific API aggregation.", exp: "BFF (Backend For Frontend) provides custom API gateways per frontend client type." }
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
    let customVal = parseInt(document.getElementById('custom-question-input').value);
    state.totalQuestionsSetting = (isNaN(customVal) || customVal <= 0) ? 10 : customVal;
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

    if (categoriesList.length === 1) {
        document.getElementById('sum-strongest').innerText = `${strongest.cat} (${strongest.acc.toFixed(0)}%)`;
        document.getElementById('sum-weakest').innerText = `N/A (Single Subject Quiz)`;
    } else if (strongest.cat === weakest.cat || strongest.acc === weakest.acc) {
        document.getElementById('sum-strongest').innerText = `${strongest.cat} (${strongest.acc.toFixed(0)}%)`;
        document.getElementById('sum-weakest').innerText = `N/A (All subjects tied at ${strongest.acc.toFixed(0)}%)`;
    } else {
        document.getElementById('sum-strongest').innerText = `${strongest.cat} (${strongest.acc.toFixed(0)}%)`;
        document.getElementById('sum-weakest').innerText = `${weakest.cat} (${weakest.acc.toFixed(0)}%)`;
    }

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

    let weakestDisplay = `${weakest.cat} (${weakest.acc.toFixed(0)}%)`;
    if (categoriesList.length === 1) {
        weakestDisplay = `N/A (Single Subject Quiz)`;
    } else if (strongest.cat === weakest.cat || strongest.acc === weakest.acc) {
        weakestDisplay = `N/A (Tied at ${strongest.acc.toFixed(0)}%)`;
    }

    let report = `====================================================\n`;
    report += `                    QUIZ SUMMARY                    \n`;
    report += `====================================================\n`;
    report += `Total Questions: ${totalAttempted}\n`;
    report += `Correct Answers: ${totalCorrect}\n`;
    report += `Time Taken:      ${totalTimeSec} seconds\n`;
    report += `Strongest Category: ${strongest.cat} (${strongest.acc.toFixed(0)}%)\n`;
    report += `Weakest Category:   ${weakestDisplay}\n`;
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
