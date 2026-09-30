package com.quizapp.repository;

import com.quizapp.model.Difficulty;
import com.quizapp.model.Question;

import java.util.*;

/**
 * QuestionBank repository storing questions in a 3D array: [Category][Difficulty][QuestionIndex].
 */
public class QuestionBank {

    public static final String[] CATEGORIES = {
        "Java & OOP",
        "Python & Scripting",
        "Data Structures & Algorithms",
        "Computer Science Core",
        "Engineering Mathematics",
        "General Knowledge & Tech"
    };

    // 3D Array storing questions: [CategoryIndex][DifficultyIndex][QuestionIndex]
    private final Question[][][] bank;

    public QuestionBank() {
        this.bank = initializeQuestionBank();
    }

    public static String[] getCategories() {
        return Arrays.copyOf(CATEGORIES, CATEGORIES.length);
    }

    public static int getCategoryIndex(String categoryName) {
        for (int i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].equalsIgnoreCase(categoryName)) {
                return i;
            }
        }
        return 0; // Default to Java & OOP
    }

    /**
     * Initializes the 3D Array [Category][Difficulty][QuestionIndex] with Question objects.
     */
    private Question[][][] initializeQuestionBank() {
        // 6 Categories, 3 Difficulties (0=EASY, 1=MEDIUM, 2=HARD)
        Question[][][] data = new Question[6][3][];

        // -------------------------------------------------------------
        // CATEGORY 0: JAVA & OOP
        // -------------------------------------------------------------
        data[0][0] = new Question[]{
            new Question("J-E1", "Which keyword is used to define a class in Java?",
                new String[]{"struct", "class", "interface", "object"}, 1, "Java & OOP", Difficulty.EASY,
                "It starts with 'c' and is 5 letters long.", "The 'class' keyword is used to declare a class in Java."),
            new Question("J-E2", "What is the default value of a boolean variable in Java?",
                new String[]{"true", "false", "0", "null"}, 1, "Java & OOP", Difficulty.EASY,
                "Booleans default to a negative state in instance variables.", "Default value of primitive boolean is false."),
            new Question("J-E3", "Which method is the main entry point of a Java application?",
                new String[]{"start()", "run()", "main()", "execute()"}, 2, "Java & OOP", Difficulty.EASY,
                "public static void main(String[] args)", "The main() method is the execution starting point in Java.")
        };

        data[0][1] = new Question[]{
            new Question("J-M1", "Which exception is thrown when dividing an integer by zero in Java?",
                new String[]{"NullPointerException", "ArithmeticException", "NumberFormatException", "IllegalArgumentException"}, 1, "Java & OOP", Difficulty.MEDIUM,
                "It relates to basic math operations.", "ArithmeticException is thrown for arithmetic errors like division by zero."),
            new Question("J-M2", "What is the size of an int primitive in Java?",
                new String[]{"16-bit", "32-bit", "64-bit", "Depends on OS"}, 1, "Java & OOP", Difficulty.MEDIUM,
                "It is 4 bytes long.", "In Java, 'int' is always 32-bit signed integer regardless of platform."),
            new Question("J-M3", "Which collection class allows duplicate elements and maintains insertion order?",
                new String[]{"HashSet", "TreeSet", "ArrayList", "HashMap"}, 2, "Java & OOP", Difficulty.MEDIUM,
                "It is backed by a dynamically resizing array.", "ArrayList maintains insertion order and permits duplicates.")
        };

        data[0][2] = new Question[]{
            new Question("J-H1", "What happens if a thread calls wait() without holding the monitor lock?",
                new String[]{"It blocks indefinitely", "IllegalMonitorStateException is thrown", "Thread terminates", "Deadlock occurs"}, 1, "Java & OOP", Difficulty.HARD,
                "State monitor ownership is required for Object.wait().", "Object.wait() throws IllegalMonitorStateException if not synchronized on the object."),
            new Question("J-H2", "Which garbage collector was introduced as experimental in Java 11 and supports multi-terabyte heaps with low latency?",
                new String[]{"CMS", "G1GC", "ZGC", "Serial GC"}, 2, "Java & OOP", Difficulty.HARD,
                "Starts with the last letter of the alphabet.", "ZGC (Z Garbage Collector) is a low-latency garbage collector."),
            new Question("J-H3", "In Java memory management, where are static variables stored in Java 8+?",
                new String[]{"PermGen", "Heap Memory (Class object)", "Native Stack", "Code Cache"}, 1, "Java & OOP", Difficulty.HARD,
                "PermGen was removed in Java 8, moving statics elsewhere.", "In Java 8+, static variables are stored in the Heap as part of the java.lang.Class object.")
        };

        // -------------------------------------------------------------
        // CATEGORY 1: PYTHON & SCRIPTING
        // -------------------------------------------------------------
        data[1][0] = new Question[]{
            new Question("P-E1", "Which keyword is used to define a function in Python?",
                new String[]{"func", "def", "function", "define"}, 1, "Python & Scripting", Difficulty.EASY,
                "Short 3-letter keyword.", "The 'def' keyword defines a function in Python."),
            new Question("P-E2", "Which data structure in Python is immutable?",
                new String[]{"List", "Dictionary", "Tuple", "Set"}, 2, "Python & Scripting", Difficulty.EASY,
                "Enclosed in parentheses () rather than square brackets [].", "Tuples are immutable sequences in Python."),
            new Question("P-E3", "What symbol is used for single-line comments in Python?",
                new String[]{"//", "/*", "#", "--"}, 2, "Python & Scripting", Difficulty.EASY,
                "Also known as hash or pound sign.", "The # symbol is used for single-line comments.")
        };

        data[1][1] = new Question[]{
            new Question("P-M1", "What does the '__init__' method represent in a Python class?",
                new String[]{"Destructor", "Constructor / Initializer", "Static method", "String conversion"}, 1, "Python & Scripting", Difficulty.MEDIUM,
                "Called automatically when a new object instance is created.", "__init__ is the initializer / constructor method in Python classes."),
            new Question("P-M2", "What is the output of bool([]) in Python?",
                new String[]{"True", "False", "None", "TypeError"}, 1, "Python & Scripting", Difficulty.MEDIUM,
                "Empty collections evaluate to a falsey boolean state.", "Empty lists, strings, and sets evaluate to False in Python."),
            new Question("P-M3", "Which built-in function returns both index and item while iterating over a list?",
                new String[]{"zip()", "map()", "enumerate()", "filter()"}, 2, "Python & Scripting", Difficulty.MEDIUM,
                "It counts or lists items with numbers.", "enumerate() yields tuples of (index, item).")
        };

        data[1][2] = new Question[]{
            new Question("P-H1", "What is the purpose of Python's GIL (Global Interpreter Lock)?",
                new String[]{"Accelerates multi-core CPU usage", "Ensures only one thread executes Python bytecode at a time", "Prevents memory leaks in C extensions", "Encrypts bytecode"}, 1, "Python & Scripting", Difficulty.HARD,
                "It is a mutex that protects access to Python objects.", "The GIL prevents multiple native threads from executing Python bytecodes concurrently."),
            new Question("P-H2", "What will list(zip(*[[1, 2], [3, 4]])) produce in Python?",
                new String[]{"[(1, 2), (3, 4)]", "[(1, 3), (2, 4)]", "[[1, 2, 3, 4]]", "[(1, 4), (2, 3)]"}, 1, "Python & Scripting", Difficulty.HARD,
                "Unpacking * matrix transposes rows into columns.", "Zipping unpacked rows transposes the matrix to [(1, 3), (2, 4)]."),
            new Question("P-H3", "In Python, what does the @classmethod decorator pass as its first implicit argument?",
                new String[]{"self (instance)", "cls (class)", "args (tuple)", "kwargs (dict)"}, 1, "Python & Scripting", Difficulty.HARD,
                "It receives the class itself rather than an instance.", "@classmethod receives 'cls' (the class object) as its first argument.")
        };

        // -------------------------------------------------------------
        // CATEGORY 2: DATA STRUCTURES & ALGORITHMS (DSA)
        // -------------------------------------------------------------
        data[2][0] = new Question[]{
            new Question("D-E1", "Which data structure works on a LIFO (Last In, First Out) basis?",
                new String[]{"Queue", "Stack", "LinkedList", "Tree"}, 1, "Data Structures & Algorithms", Difficulty.EASY,
                "Think of a stack of plates.", "Stack strictly follows Last-In-First-Out access."),
            new Question("D-E2", "What is the time complexity of accessing an element in an array by index?",
                new String[]{"O(1)", "O(n)", "O(log n)", "O(n^2)"}, 0, "Data Structures & Algorithms", Difficulty.EASY,
                "Direct memory offset calculation.", "Array indexing is constant O(1) time complexity."),
            new Question("D-E3", "Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?",
                new String[]{"Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"}, 2, "Data Structures & Algorithms", Difficulty.EASY,
                "Divide and conquer algorithm using extra space.", "Merge Sort guarantees O(n log n) in all cases.")
        };

        data[2][1] = new Question[]{
            new Question("D-M1", "In a Binary Search Tree (BST), which traversal retrieves keys in sorted ascending order?",
                new String[]{"Pre-order", "In-order", "Post-order", "Level-order"}, 1, "Data Structures & Algorithms", Difficulty.MEDIUM,
                "Left -> Root -> Right", "In-order traversal visits nodes in ascending order in a BST."),
            new Question("D-M2", "Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?",
                new String[]{"Stack", "Queue", "PriorityQueue", "Hash Table"}, 1, "Data Structures & Algorithms", Difficulty.MEDIUM,
                "First-In-First-Out queueing.", "BFS processes nodes level by level using a Queue."),
            new Question("D-M3", "What is the worst-case time complexity of QuickSelect for finding the k-th smallest element?",
                new String[]{"O(n)", "O(n log n)", "O(n^2)", "O(log n)"}, 2, "Data Structures & Algorithms", Difficulty.MEDIUM,
                "Occurs when bad pivot selection degrades partitioning.", "Worst-case QuickSelect is O(n^2) when bad pivots are chosen.")
        };

        data[2][2] = new Question[]{
            new Question("D-H1", "What is the amortized time complexity per insertion operation for dynamic array resizing?",
                new String[]{"O(n)", "O(1)", "O(log n)", "O(n^2)"}, 1, "Data Structures & Algorithms", Difficulty.HARD,
                "Geometric expansion distributes copy overhead.", "Amortized insertion time in dynamic arrays is O(1)."),
            new Question("D-H2", "Which algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights?",
                new String[]{"Floyd-Warshall", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Bellman-Ford"}, 1, "Data Structures & Algorithms", Difficulty.HARD,
                "Uses a priority queue to greedily pick nearest unvisited vertex.", "Dijkstra's Algorithm solves single-source shortest path for non-negative weights."),
            new Question("D-H3", "What is the height balance factor condition for an AVL Tree for any node?",
                new String[]{"-1, 0, or +1", "-2 to +2", "Strictly 0", "Any positive integer"}, 0, "Data Structures & Algorithms", Difficulty.HARD,
                "Height of left subtree minus height of right subtree.", "AVL trees strictly require height balance factor in {-1, 0, +1}.")
        };

        // -------------------------------------------------------------
        // CATEGORY 3: COMPUTER SCIENCE CORE
        // -------------------------------------------------------------
        data[3][0] = new Question[]{
            new Question("C-E1", "What does SQL stand for?",
                new String[]{"Structured Query Language", "Sequential Query Logic", "Standard Quick Lookup", "System Query Link"}, 0, "Computer Science Core", Difficulty.EASY,
                "Standard relational database language.", "SQL stands for Structured Query Language."),
            new Question("C-E2", "Which OSI layer is responsible for IP routing between networks?",
                new String[]{"Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"}, 1, "Computer Science Core", Difficulty.EASY,
                "Layer 3 of the OSI model.", "Network Layer handles IP addressing and routing."),
            new Question("C-E3", "What is the main function of an Operating System's kernel?",
                new String[]{"UI rendering", "Core resource management and hardware abstraction", "Compiling code", "Web browsing"}, 1, "Computer Science Core", Difficulty.EASY,
                "Central hub interfacing CPU, memory, and devices.", "Kernel manages system resources and hardware interaction.")
        };

        data[3][1] = new Question[]{
            new Question("C-M1", "Which ACID property ensures that a transaction is all-or-nothing?",
                new String[]{"Atomicity", "Consistency", "Isolation", "Durability"}, 0, "Computer Science Core", Difficulty.MEDIUM,
                "Atomic unit of execution.", "Atomicity guarantees that all steps succeed or none take effect."),
            new Question("C-M2", "What is a deadlock condition where threads are waiting for resources held by each other in a closed chain?",
                new String[]{"Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"}, 3, "Computer Science Core", Difficulty.MEDIUM,
                "A closed loop of dependencies.", "Circular Wait is the 4th Coffman deadlock condition."),
            new Question("C-M3", "Which HTTP status code indicates '404 Not Found'?",
                new String[]{"200 OK", "301 Moved Permanently", "404 Not Found", "500 Internal Server Error"}, 2, "Computer Science Core", Difficulty.MEDIUM,
                "Client error when resource missing.", "404 represents Not Found.")
        };

        data[3][2] = new Question[]{
            new Question("C-H1", "Which CPU scheduling algorithm can suffer from the 'Convoy Effect'?",
                new String[]{"Round Robin", "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling"}, 1, "Computer Science Core", Difficulty.HARD,
                "Non-preemptive queueing where long jobs block short ones.", "FCFS causes Convoy Effect when a long CPU-bound process blocks IO processes."),
            new Question("C-H2", "In TCP 3-way handshake, what sequence of flags is exchanged to establish a connection?",
                new String[]{"SYN -> SYN-ACK -> ACK", "ACK -> SYN -> ACK", "FIN -> ACK -> FIN-ACK", "SYN -> ACK -> RST"}, 0, "Computer Science Core", Difficulty.HARD,
                "Synchronize -> Synchronize-Acknowledge -> Acknowledge", "TCP connection setup uses SYN -> SYN-ACK -> ACK."),
            new Question("C-H3", "What Normal Form removes transitive dependencies in a database table?",
                new String[]{"1NF", "2NF", "3NF", "BCNF"}, 2, "Computer Science Core", Difficulty.HARD,
                "Non-prime attribute depending on another non-prime attribute.", "3NF (Third Normal Form) eliminates transitive functional dependencies.")
        };

        // -------------------------------------------------------------
        // CATEGORY 4: ENGINEERING MATHEMATICS
        // -------------------------------------------------------------
        data[4][0] = new Question[]{
            new Question("M-E1", "What is the rank of a 3x3 identity matrix?",
                new String[]{"0", "1", "2", "3"}, 3, "Engineering Mathematics", Difficulty.EASY,
                "Number of non-zero rows/linearly independent vectors.", "Rank of 3x3 Identity Matrix is 3."),
            new Question("M-E2", "What is the derivative of sin(x) with respect to x?",
                new String[]{"cos(x)", "-cos(x)", "tan(x)", "-sin(x)"}, 0, "Engineering Mathematics", Difficulty.EASY,
                "Standard trigonometric derivative.", "d/dx(sin x) = cos x."),
            new Question("M-E3", "What is the probability of getting a head on a single fair coin toss?",
                new String[]{"0.25", "0.50", "0.75", "1.00"}, 1, "Engineering Mathematics", Difficulty.EASY,
                "1 favorable outcome out of 2 equally likely.", "P(Head) = 1/2 = 0.50.")
        };

        data[4][1] = new Question[]{
            new Question("M-M1", "What is the derivative of f(x) = 3x^2 + 5x - 7?",
                new String[]{"6x + 5", "3x + 5", "6x^2 + 5", "6x - 7"}, 0, "Engineering Mathematics", Difficulty.MEDIUM,
                "Use power rule: d/dx(x^n) = n*x^(n-1).", "d/dx(3x^2 + 5x - 7) = 6x + 5."),
            new Question("M-M2", "What is the value of log10(1000)?",
                new String[]{"2", "3", "10", "100"}, 1, "Engineering Mathematics", Difficulty.MEDIUM,
                "10 raised to what power equals 1000?", "10^3 = 1000, so log10(1000) = 3."),
            new Question("M-M3", "Eigenvalues of a real symmetric matrix are always:",
                new String[]{"Complex numbers", "Real numbers", "Purely imaginary", "Zero"}, 1, "Engineering Mathematics", Difficulty.MEDIUM,
                "Spectral theorem property.", "Real symmetric matrices always have real eigenvalues.")
        };

        data[4][2] = new Question[]{
            new Question("M-H1", "What is the value of definite integral integral(0 to pi) sin(x) dx?",
                new String[]{"0", "1", "2", "pi"}, 2, "Engineering Mathematics", Difficulty.HARD,
                "Antiderivative of sin(x) is -cos(x).", "[-cos(pi)] - [-cos(0)] = -(-1) - (-1) = 1 + 1 = 2."),
            new Question("M-H2", "How many ways can 5 distinct books be arranged on a shelf?",
                new String[]{"25", "60", "120", "720"}, 2, "Engineering Mathematics", Difficulty.HARD,
                "Calculate 5 factorial (5!).", "5! = 5 * 4 * 3 * 2 * 1 = 120."),
            new Question("M-H3", "What is the determinant of a 2x2 matrix [[4, 2], [1, 5]]?",
                new String[]{"18", "22", "14", "20"}, 0, "Engineering Mathematics", Difficulty.HARD,
                "det(A) = ad - bc.", "det = (4 * 5) - (2 * 1) = 20 - 2 = 18.")
        };

        // -------------------------------------------------------------
        // CATEGORY 5: GENERAL KNOWLEDGE & TECH
        // -------------------------------------------------------------
        data[5][0] = new Question[]{
            new Question("G-E1", "Who is known as the co-founder of Microsoft?",
                new String[]{"Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"}, 1, "General Knowledge & Tech", Difficulty.EASY,
                "Co-founded Microsoft with Paul Allen.", "Bill Gates co-founded Microsoft."),
            new Question("G-E2", "What does CPU stand for in computer systems?",
                new String[]{"Central Processing Unit", "Central Performance Unit", "Core Power Utility", "Computer Program Unit"}, 0, "General Knowledge & Tech", Difficulty.EASY,
                "Main processor component.", "CPU stands for Central Processing Unit."),
            new Question("G-E3", "Which company developed the Android Operating System originally?",
                new String[]{"Google", "Android Inc.", "Apple", "Nokia"}, 1, "General Knowledge & Tech", Difficulty.EASY,
                "Acquired by Google in 2005.", "Android Inc. was founded in 2003 before acquisition by Google.")
        };

        data[5][1] = new Question[]{
            new Question("G-M1", "What is the capital city of Australia?",
                new String[]{"Sydney", "Melbourne", "Canberra", "Brisbane"}, 2, "General Knowledge & Tech", Difficulty.MEDIUM,
                "It is not Sydney or Melbourne.", "Canberra is the capital city of Australia."),
            new Question("G-M2", "In tech terminology, what does 'API' stand for?",
                new String[]{"Application Programming Interface", "Automated Program Integration", "Advanced Protocol Interface", "Array Processing Instruction"}, 0, "General Knowledge & Tech", Difficulty.MEDIUM,
                "Interface connecting software services.", "API stands for Application Programming Interface."),
            new Question("G-M3", "Which element has the chemical symbol 'Au'?",
                new String[]{"Silver", "Gold", "Copper", "Aluminum"}, 1, "General Knowledge & Tech", Difficulty.MEDIUM,
                "Derived from Latin 'Aurum'.", "Gold has chemical symbol Au.")
        };

        data[5][2] = new Question[]{
            new Question("G-H1", "Which river is the longest in the world by length?",
                new String[]{"Amazon River", "Nile River", "Yangtze River", "Mississippi River"}, 1, "General Knowledge & Tech", Difficulty.HARD,
                "Flows through northeastern Africa.", "The Nile River is traditionally considered the longest river (~6,650 km)."),
            new Question("G-H2", "Who was the first person to travel into space?",
                new String[]{"Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"}, 1, "General Knowledge & Tech", Difficulty.HARD,
                "Soviet cosmonaut in 1961.", "Yuri Gagarin completed an orbit of Earth on April 12, 1961."),
            new Question("G-H3", "Which architectural pattern decouples frontend presentation from backend microservices using dedicated gateways?",
                new String[]{"BFF (Backend For Frontend)", "Monolith", "CQRS", "MVC"}, 0, "General Knowledge & Tech", Difficulty.HARD,
                "Optimizes frontend-specific API aggregation.", "BFF (Backend For Frontend) provides custom API gateways per frontend client type.")
        };

        return data;
    }

    public List<Question> getQuestions(int categoryIndex, Difficulty difficulty) {
        if (categoryIndex < 0 || categoryIndex >= bank.length) {
            categoryIndex = 0;
        }
        int diffIdx = difficulty.getIndex();
        Question[] questions = bank[categoryIndex][diffIdx];
        if (questions == null) return Collections.emptyList();
        return new ArrayList<>(Arrays.asList(questions));
    }

    public Question getQuestionDirectlyFrom3DArray(int categoryIndex, int difficultyIndex, int questionIndex) {
        if (categoryIndex >= 0 && categoryIndex < bank.length &&
            difficultyIndex >= 0 && difficultyIndex < bank[categoryIndex].length &&
            questionIndex >= 0 && questionIndex < bank[categoryIndex][difficultyIndex].length) {
            return bank[categoryIndex][difficultyIndex][questionIndex];
        }
        return null;
    }

    public int getCategoryCount() {
        return bank.length;
    }

    public int getDifficultyCount(int categoryIndex) {
        return bank[categoryIndex].length;
    }

    public int getQuestionCount(int categoryIndex, int difficultyIndex) {
        return bank[categoryIndex][difficultyIndex].length;
    }
}
