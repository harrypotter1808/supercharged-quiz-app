# ? Supercharged Quiz App with Adaptive Difficulty & Lifelines

[![Core Java](https://img.shields.io/badge/Core%20Java-25.0-orange.svg)](https://openjdk.org/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Web%20App-brightgreen.svg)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An advanced quiz engine built in **pure Core Java** (and mirrored as a responsive **Web Application for GitHub Pages**), featuring **Adaptive Difficulty**, a **3D Question Repository**, a **Lifeline System** with custom exception handling, **Time Attack Speed Bonuses**, **HashMap Progress Tracking**, an **Anti-Cheat Detector**, **Summary Exporting**, and a **100-Attempt Mock Test Simulator**.

---

## ?? Key Features

### 1. ?? Adaptive Difficulty (3D Array Storage)
Questions are structured in a **3D Matrix** `[Category][Difficulty][QuestionIndex]`:
- **Easy (`10 pts`)** $\rightarrow$ **Medium (`20 pts`)** $\rightarrow$ **Hard (`30 pts`)**
- **Level UP**: 2 consecutive correct answers elevate difficulty.
- **Level DOWN**: Any incorrect answer drops difficulty and resets the streak.

### 2. ?? Category Selection
Play in specific categories (*Java, Python, Mathematics, Science, General Knowledge*) or test yourself in **Mixed All-Categories Mode**.

### 3. ?? Lifeline System with Single-Use Guard
- **50/50**: Randomly eliminates two incorrect option choices.
- **Skip Question**: Advances to the next question without score penalty.
- **Audience Hint**: Provides a targeted clue.
- **Custom Exceptions**: Attempting to reuse a spent lifeline throws `LifelineAlreadyUsedException`.

### 4. ? Time Attack & Speed Bonus
- Measures exact response duration per question.
- Awards $+\!5$ points for answers in $\le 5.0\text{s}$ and $+\!2$ points in $\le 10.0\text{s}$.

### 5. ??? Anti-Cheat System
- Submitting an answer in $< 2.0\text{s}$ triggers `TooFastAnswerException` and flags responses for anti-cheat review.

### 6. ?? HashMap Progress Tracking & Report Export
- Aggregates category stats (`attempted`, `correct`, `points`, `time`) using `HashMap<String, CategoryStats>`.
- Evaluates **Strongest** and **Weakest** subjects.
- Displays formatted `QUIZ SUMMARY` and exports to `quiz_summary_report.txt`.

### 7. ?? 100-Attempt Mock Test Simulator & Anomaly Detector
- Runs 100 simulated quiz attempts across 4 player profiles (*Standard, Genius, Guesser, Automated Bot*).
- Reports mean scores, category breakdowns, and detects sub-2s speed violations, ultra-fast high-score anomalies, and automated bot spammers.

---

## ?? Running the Project

### Option A: Interactive Web App (GitHub Pages)
Simply open `index.html` in your web browser or deploy directly to **GitHub Pages**:
1. Push this repository to GitHub.
2. Go to **Repository Settings** $\rightarrow$ **Pages**.
3. Select `main` branch and `/ (root)` folder $\rightarrow$ Save.

### Option B: Core Java CLI Application
Navigate to the directory in terminal/command prompt:

```cmd
cd C:\Users\admin\Projects\supercharged-quiz-app
```

#### Compile:
```cmd
javac -encoding UTF-8 -d bin -sourcepath src src\com\quizapp\QuizAppMain.java
```

#### Run:
```cmd
java -cp bin com.quizapp.QuizAppMain
```

---

## ?? Repository Structure

```
supercharged-quiz-app/
+-- index.html                  # Responsive Web Application UI Shell
+-- styles.css                  # Modern Glassmorphism Styling & Themes
+-- app.js                      # Web Engine (3D Matrix, Adaptive Streak, Anti-Cheat)
+-- quiz_summary_report.txt     # Exported Performance Summary Report
+-- src/                        # Core Java Source Code
    +-- com/quizapp/
        +-- QuizAppMain.java
        +-- model/              # Question, Difficulty, LifelineType, CategoryStats
        +-- exception/          # LifelineAlreadyUsedException, TooFastAnswerException
        +-- repository/         # QuestionBank (3D Array Storage)
        +-- service/            # QuizEngine, LifelineManager, AntiCheatService, ProgressTracker, MockTestRunner
        +-- util/               # ReportExporter
```

---

## ?? License
Licensed under the [MIT License](LICENSE).
