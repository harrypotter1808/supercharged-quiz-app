package com.quizapp.repository;

import com.quizapp.model.Difficulty;
import com.quizapp.model.Question;

import java.util.*;

/**
 * QuestionBank repository storing questions in a 3D array: [Category][Difficulty][QuestionIndex].
 */
public class QuestionBank {

    public static final String[] CATEGORIES = {"Java", "Python", "Math", "Science", "General Knowledge"};

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
        return 0; // Default to Java
    }

    /**
     * Initializes the 3D Array [Category][Difficulty][QuestionIndex] with Question objects.
     */
    private Question[][][] initializeQuestionBank() {
        // 5 Categories, 3 Difficulties (0=EASY, 1=MEDIUM, 2=HARD)
        Question[][][] data = new Question[5][3][];

        // -------------------------------------------------------------
        // CATEGORY 0: JAVA
        // -------------------------------------------------------------
        // Easy Java
        data[0][0] = new Question[]{
            new Question("J-E1", "Which keyword is used to define a class in Java?",
                new String[]{"struct", "class", "interface", "object"}, 1, "Java", Difficulty.EASY,
                "It starts with 'c' and is 5 letters long.", "The 'class' keyword is used to declare a class in Java."),
            new Question("J-E2", "What is the default value of a boolean variable in Java?",
                new String[]{"true", "false", "0", "null"}, 1, "Java", Difficulty.EASY,
                "Booleans default to a negative state in instance variables.", "Default value of primitive boolean is false."),
            new Question("J-E3", "Which method is the main entry point of a Java application?",
                new String[]{"start()", "run()", "main()", "execute()"}, 2, "Java", Difficulty.EASY,
                "public static void main(String[] args)", "The main() method is the execution starting point in Java.")
        };

        // Medium Java
        data[0][1] = new Question[]{
            new Question("J-M1", "Which exception is thrown when dividing an integer by zero in Java?",
                new String[]{"NullPointerException", "ArithmeticException", "NumberFormatException", "IllegalArgumentException"}, 1, "Java", Difficulty.MEDIUM,
                "It relates to basic math operations.", "ArithmeticException is thrown for arithmetic errors like division by zero."),
            new Question("J-M2", "What is the size of an int primitive in Java?",
                new String[]{"16-bit", "32-bit", "64-bit", "Depends on OS"}, 1, "Java", Difficulty.MEDIUM,
                "It is 4 bytes long.", "In Java, 'int' is always 32-bit signed integer regardless of platform."),
            new Question("J-M3", "Which collection class allows duplicate elements and maintains insertion order?",
                new String[]{"HashSet", "TreeSet", "ArrayList", "HashMap"}, 2, "Java", Difficulty.MEDIUM,
                "It is backed by a dynamically resizing array.", "ArrayList maintains insertion order and permits duplicates.")
        };

        // Hard Java
        data[0][2] = new Question[]{
            new Question("J-H1", "What happens if a thread calls wait() without holding the monitor lock?",
                new String[]{"It blocks indefinitely", "IllegalMonitorStateException is thrown", "Thread terminates", "Deadlock occurs"}, 1, "Java", Difficulty.HARD,
                "State monitor ownership is required for Object.wait().", "Object.wait() throws IllegalMonitorStateException if not synchronized on the object."),
            new Question("J-H2", "Which garbage collector was introduced as experimental in Java 11 and supports multi-terabyte heaps with low latency?",
                new String[]{"CMS", "G1GC", "ZGC", "Serial GC"}, 2, "Java", Difficulty.HARD,
                "Starts with the last letter of the alphabet.", "ZGC (Z Garbage Collector) is a low-latency garbage collector."),
            new Question("J-H3", "In Java memory management, where are static variables stored in Java 8+?",
                new String[]{"PermGen", "Heap Memory (Class object)", "Native Stack", "Code Cache"}, 1, "Java", Difficulty.HARD,
                "PermGen was removed in Java 8, moving statics elsewhere.", "In Java 8+, static variables are stored in the Heap as part of the java.lang.Class object.")
        };

        // -------------------------------------------------------------
        // CATEGORY 1: PYTHON
        // -------------------------------------------------------------
        // Easy Python
        data[1][0] = new Question[]{
            new Question("P-E1", "Which keyword is used to define a function in Python?",
                new String[]{"func", "def", "function", "define"}, 1, "Python", Difficulty.EASY,
                "Short 3-letter keyword.", "The 'def' keyword defines a function in Python."),
            new Question("P-E2", "Which data structure in Python is immutable?",
                new String[]{"List", "Dictionary", "Tuple", "Set"}, 2, "Python", Difficulty.EASY,
                "Enclosed in parentheses () rather than square brackets [].", "Tuples are immutable sequences in Python."),
            new Question("P-E3", "What symbol is used for single-line comments in Python?",
                new String[]{"//", "/*", "#", "--"}, 2, "Python", Difficulty.EASY,
                "Also known as hash or pound sign.", "The # symbol is used for single-line comments.")
        };

        // Medium Python
        data[1][1] = new Question[]{
            new Question("P-M1", "What does the '__init__' method represent in a Python class?",
                new String[]{"Destructor", "Constructor / Initializer", "Static method", "String conversion"}, 1, "Python", Difficulty.MEDIUM,
                "Called automatically when a new object instance is created.", "__init__ is the initializer / constructor method in Python classes."),
            new Question("P-M2", "What is the output of bool([]) in Python?",
                new String[]{"True", "False", "None", "TypeError"}, 1, "Python", Difficulty.MEDIUM,
                "Empty collections evaluate to a falsey boolean state.", "Empty lists, strings, and sets evaluate to False in Python."),
            new Question("P-M3", "Which built-in function returns both index and item while iterating over a list?",
                new String[]{"zip()", "map()", "enumerate()", "filter()"}, 2, "Python", Difficulty.MEDIUM,
                "It counts or lists items with numbers.", "enumerate() yields tuples of (index, item).")
        };

        // Hard Python
        data[1][2] = new Question[]{
            new Question("P-H1", "What is the purpose of Python's GIL (Global Interpreter Lock)?",
                new String[]{"Accelerates multi-core CPU usage", "Ensures only one thread executes Python bytecode at a time", "Prevents memory leaks in C extensions", "Encrypts bytecode"}, 1, "Python", Difficulty.HARD,
                "It is a mutex that protects access to Python objects.", "The GIL prevents multiple native threads from executing Python bytecodes concurrently."),
            new Question("P-H2", "What will list(zip(*[[1, 2], [3, 4]])) produce in Python?",
                new String[]{"[(1, 2), (3, 4)]", "[(1, 3), (2, 4)]", "[[1, 2, 3, 4]]", "[(1, 4), (2, 3)]"}, 1, "Python", Difficulty.HARD,
                "Unpacking * matrix transposes rows into columns.", "Zipping unpacked rows transposes the matrix to [(1, 3), (2, 4)]."),
            new Question("P-H3", "In Python, what does the @classmethod decorator pass as its first implicit argument?",
                new String[]{"self (instance)", "cls (class)", "args (tuple)", "kwargs (dict)"}, 1, "Python", Difficulty.HARD,
                "It receives the class itself rather than an instance.", "@classmethod receives 'cls' (the class object) as its first argument.")
        };

        // -------------------------------------------------------------
        // CATEGORY 2: MATH
        // -------------------------------------------------------------
        // Easy Math
        data[2][0] = new Question[]{
            new Question("M-E1", "What is the value of 15 * 6?",
                new String[]{"80", "90", "100", "75"}, 1, "Math", Difficulty.EASY,
                "10 * 6 + 5 * 6", "15 * 6 = 90."),
            new Question("M-E2", "What is the perimeter of a square with side length 7 cm?",
                new String[]{"14 cm", "28 cm", "49 cm", "35 cm"}, 1, "Math", Difficulty.EASY,
                "Perimeter = 4 * side length.", "4 * 7 = 28 cm."),
            new Question("M-E3", "What is 2 raised to the power of 5 (2^5)?",
                new String[]{"16", "32", "64", "25"}, 1, "Math", Difficulty.EASY,
                "2 * 2 * 2 * 2 * 2", "2^5 = 32.")
        };

        // Medium Math
        data[2][1] = new Question[]{
            new Question("M-M1", "What is the derivative of f(x) = 3x^2 + 5x - 7?",
                new String[]{"6x + 5", "3x + 5", "6x^2 + 5", "6x - 7"}, 0, "Math", Difficulty.MEDIUM,
                "Use power rule: d/dx(x^n) = n*x^(n-1).", "d/dx(3x^2 + 5x - 7) = 6x + 5."),
            new Question("M-M2", "What is the value of log10(1000)?",
                new String[]{"2", "3", "10", "100"}, 1, "Math", Difficulty.MEDIUM,
                "10 to what power equals 1000?", "10^3 = 1000, so log10(1000) = 3."),
            new Question("M-M3", "If a right-angled triangle has legs of 6 cm and 8 cm, what is the hypotenuse?",
                new String[]{"9 cm", "10 cm", "12 cm", "14 cm"}, 1, "Math", Difficulty.MEDIUM,
                "Use Pythagorean theorem: a^2 + b^2 = c^2.", "6^2 + 8^2 = 36 + 64 = 100. sqrt(100) = 10 cm.")
        };

        // Hard Math
        data[2][2] = new Question[]{
            new Question("M-H1", "What is the value of integral integral(0 to pi) sin(x) dx?",
                new String[]{"0", "1", "2", "pi"}, 2, "Math", Difficulty.HARD,
                "Antiderivative of sin(x) is -cos(x).", "[-cos(pi)] - [-cos(0)] = -(-1) - (-1) = 1 + 1 = 2."),
            new Question("M-H2", "How many ways can 5 distinct books be arranged on a shelf?",
                new String[]{"25", "60", "120", "720"}, 2, "Math", Difficulty.HARD,
                "Calculate 5 factorial (5!).", "5! = 5 * 4 * 3 * 2 * 1 = 120."),
            new Question("M-H3", "What is the determinant of a 2x2 matrix [[4, 2], [1, 5]]?",
                new String[]{"18", "22", "14", "20"}, 0, "Math", Difficulty.HARD,
                "det(A) = ad - bc.", "det = (4 * 5) - (2 * 1) = 20 - 2 = 18.")
        };

        // -------------------------------------------------------------
        // CATEGORY 3: SCIENCE
        // -------------------------------------------------------------
        // Easy Science
        data[3][0] = new Question[]{
            new Question("S-E1", "What chemical symbol represents Water?",
                new String[]{"CO2", "H2O", "NaCl", "O2"}, 1, "Science", Difficulty.EASY,
                "Two Hydrogen atoms, one Oxygen atom.", "H2O is the chemical formula for water."),
            new Question("S-E2", "Which planet is known as the Red Planet?",
                new String[]{"Venus", "Jupiter", "Mars", "Saturn"}, 2, "Science", Difficulty.EASY,
                "Named after the Roman god of war.", "Mars appears red due to iron oxide on its surface."),
            new Question("S-E3", "What is the powerhouse of the cell?",
                new String[]{"Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"}, 1, "Science", Difficulty.EASY,
                "Generates most of the cell's ATP.", "Mitochondria are known as the cellular powerhouse.")
        };

        // Medium Science
        data[3][1] = new Question[]{
            new Question("S-M1", "What is the speed of light in a vacuum approximately?",
                new String[]{"3 x 10^5 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "1.5 x 10^8 m/s"}, 1, "Science", Difficulty.MEDIUM,
                "Roughly 300,000 km per second.", "Speed of light c approx 3 x 10^8 meters per second."),
            new Question("S-M2", "Which gas is most abundant in Earth's atmosphere?",
                new String[]{"Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"}, 2, "Science", Difficulty.MEDIUM,
                "Makes up about 78% of dry air.", "Nitrogen accounts for approx 78% of Earth's atmosphere."),
            new Question("S-M3", "What type of bond is formed by sharing pairs of electrons between atoms?",
                new String[]{"Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"}, 1, "Science", Difficulty.MEDIUM,
                "Co-operative valence sharing.", "A covalent bond involves electron pair sharing.")
        };

        // Hard Science
        data[3][2] = new Question[]{
            new Question("S-H1", "What is the half-life of Carbon-14 approximately?",
                new String[]{"1,200 years", "5,730 years", "10,500 years", "50,000 years"}, 1, "Science", Difficulty.HARD,
                "Used in radiocarbon dating for ancient organic materials.", "Carbon-14 half-life is approximately 5,730 years."),
            new Question("S-H2", "Which subatomic particle has a positive charge and is located in the nucleus?",
                new String[]{"Electron", "Positron", "Proton", "Neutron"}, 2, "Science", Difficulty.HARD,
                "Discovered by Ernest Rutherford.", "Protons have a positive electric charge +1 e."),
            new Question("S-H3", "In quantum mechanics, what principle states that position and momentum cannot both be precisely known simultaneously?",
                new String[]{"Pauli Exclusion Principle", "Heisenberg Uncertainty Principle", "Schrodinger Equation", "Planck's Law"}, 1, "Science", Difficulty.HARD,
                "Formulated by Werner Heisenberg.", "Heisenberg Uncertainty Principle limits simultaneous measurement precision.")
        };

        // -------------------------------------------------------------
        // CATEGORY 4: GENERAL KNOWLEDGE
        // -------------------------------------------------------------
        // Easy GK
        data[4][0] = new Question[]{
            new Question("G-E1", "Which is the largest ocean on Earth?",
                new String[]{"Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"}, 2, "General Knowledge", Difficulty.EASY,
                "Covers more than 30% of the Earth's surface.", "The Pacific Ocean is the largest ocean."),
            new Question("G-E2", "How many continents are there on Earth?",
                new String[]{"5", "6", "7", "8"}, 2, "General Knowledge", Difficulty.EASY,
                "Asia, Africa, North America, South America, Antarctica, Europe, Australia.", "There are 7 recognized continents."),
            new Question("G-E3", "Who painted the Mona Lisa?",
                new String[]{"Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"}, 1, "General Knowledge", Difficulty.EASY,
                "Italian Renaissance master.", "Leonardo da Vinci painted the Mona Lisa.")
        };

        // Medium GK
        data[4][1] = new Question[]{
            new Question("G-M1", "What is the capital city of Australia?",
                new String[]{"Sydney", "Melbourne", "Canberra", "Brisbane"}, 2, "General Knowledge", Difficulty.MEDIUM,
                "It is not Sydney or Melbourne.", "Canberra is the capital city of Australia."),
            new Question("G-M2", "In which year did World War II end?",
                new String[]{"1943", "1945", "1948", "1950"}, 1, "General Knowledge", Difficulty.MEDIUM,
                "Mid 1940s.", "World War II ended in 1945."),
            new Question("G-M3", "Which element has the chemical symbol 'Au'?",
                new String[]{"Silver", "Gold", "Copper", "Aluminum"}, 1, "General Knowledge", Difficulty.MEDIUM,
                "Derived from the Latin word 'Aurum'.", "Gold has symbol Au.")
        };

        // Hard GK
        data[4][2] = new Question[]{
            new Question("G-H1", "Which river is the longest in the world by length?",
                new String[]{"Amazon River", "Nile River", "Yangtze River", "Mississippi River"}, 1, "General Knowledge", Difficulty.HARD,
                "Flows through northeastern Africa.", "The Nile River is traditionally considered the longest river (~6,650 km)."),
            new Question("G-H2", "Who was the first person to travel into space?",
                new String[]{"Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"}, 1, "General Knowledge", Difficulty.HARD,
                "Soviet cosmonaut in 1961.", "Yuri Gagarin completed an orbit of Earth on April 12, 1961."),
            new Question("G-H3", "Which country has the most natural lakes in the world?",
                new String[]{"United States", "Russia", "Canada", "Finland"}, 2, "General Knowledge", Difficulty.HARD,
                "Contains over 60% of all lakes on Earth.", "Canada has more natural lakes than the rest of the world combined.")
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
