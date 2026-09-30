
$code = @"
package com.quizapp.service;

import com.quizapp.exception.LifelineAlreadyUsedException;
import com.quizapp.exception.TooFastAnswerException;
import com.quizapp.model.Difficulty;
import com.quizapp.model.LifelineType;
import com.quizapp.model.Question;
import com.quizapp.repository.QuestionBank;
import com.quizapp.util.ReportExporter;

import java.util.*;

/**
 * QuizEngine manages the gameplay flow, adaptive difficulty transitions, lifelines,
 * time attack mechanics, anti-cheat checks, and progress tracking.
 */
public class QuizEngine {

    private final QuestionBank questionBank;
    private final LifelineManager lifelineManager;
    private final AntiCheatService antiCheatService;
    private final ProgressTracker progressTracker;

    private Difficulty currentDifficulty;
    private int answerStreak;

    public QuizEngine() {
        this.questionBank = new QuestionBank();
        this.lifelineManager = new LifelineManager();
        this.antiCheatService = new AntiCheatService();
        this.progressTracker = new ProgressTracker();
        this.currentDifficulty = Difficulty.EASY;
        this.answerStreak = 0;
    }

    public ProgressTracker getProgressTracker() {
        return progressTracker;
    }

    public LifelineManager getLifelineManager() {
        return lifelineManager;
    }

    public AntiCheatService getAntiCheatService() {
        return antiCheatService;
    }

    public void startInteractiveQuiz(int selectedCategoryIndex, int totalQuestions, Scanner scanner) {
        lifelineManager.reset();
        progressTracker.reset();
        this.currentDifficulty = Difficulty.EASY;
        this.answerStreak = 0;

        System.out.println("\n====================================================");
        System.out.println("  STARTING SUPERCHARGED ADAPTIVE QUIZ SESSION");
        System.out.println("====================================================");
        if (selectedCategoryIndex >= 0 && selectedCategoryIndex < QuestionBank.getCategories().length) {
            System.out.println("Category Selected: " + QuestionBank.getCategories()[selectedCategoryIndex]);
        } else {
            System.out.println("Category Selected: Mixed All Categories");
        }
        System.out.println("Starting Difficulty: EASY");
        System.out.println("Rule: 2 Consecutive Correct Answers -> LEVEL UP!");
        System.out.println("      1 Wrong Answer -> LEVEL DOWN!");
        System.out.println("====================================================\n");

        int questionsAsked = 0;

        while (questionsAsked < totalQuestions) {
            int categoryIdx = (selectedCategoryIndex >= 0) ? selectedCategoryIndex : (questionsAsked % QuestionBank.getCategories().length);
            String categoryName = QuestionBank.getCategories()[categoryIdx];

            List<Question> availableQuestions = questionBank.getQuestions(categoryIdx, currentDifficulty);

            if (availableQuestions.isEmpty()) {
                availableQuestions = questionBank.getQuestions(categoryIdx, Difficulty.EASY);
            }

            Question currentQuestion = availableQuestions.get(questionsAsked % availableQuestions.size());

            questionsAsked++;

            System.out.println("----------------------------------------------------");
            System.out.println(String.format("Question %d / %d | Category: %s | Difficulty: %s %s | Streak: %d",
                questionsAsked, totalQuestions, categoryName, currentDifficulty.getDisplayName(),
                getDifficultyBadge(currentDifficulty), answerStreak));
            System.out.println("----------------------------------------------------");
            System.out.println("Question: " + currentQuestion.getQuestionText() + "\n");

            String[] currentOptions = currentQuestion.getOptions();
            boolean questionAnswered = false;
            boolean skipped = false;

            while (!questionAnswered && !skipped) {
                printOptions(currentOptions);
                printLifelineBar();

                long startTimeMs = System.currentTimeMillis();
                System.out.print("\nEnter your choice (1-4, 'L' for Lifelines): ");
                String input = scanner.nextLine().trim();
                long endTimeMs = System.currentTimeMillis();

                long durationMs = endTimeMs - startTimeMs;
                long durationSec = Math.max(1, durationMs / 1000);

                if (input.equalsIgnoreCase("L") || input.equalsIgnoreCase("5")) {
                    skipped = handleLifelineMenu(currentQuestion, currentOptions, scanner);
                    if (skipped) {
                        System.out.println("Question skipped using lifeline!");
                        break;
                    }
                    continue;
                }

                int userChoice = -1;
                try {
                    userChoice = Integer.parseInt(input) - 1;
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input! Please enter a number from 1 to 4, or 'L' for Lifelines.");
                    continue;
                }

                if (userChoice < 0 || userChoice >= currentOptions.length) {
                    System.out.println("Choice out of range! Please choose between 1 and 4.");
                    continue;
                }

                if (currentOptions[userChoice].startsWith("[Removed")) {
                    System.out.println("That option was eliminated by 50/50! Pick another option.");
                    continue;
                }

                try {
                    antiCheatService.validateAnswerSpeed(startTimeMs, endTimeMs);
                } catch (TooFastAnswerException e) {
                    System.out.println("\n[ANTI-CHEAT SYSTEM TRIGGERED]");
                    System.out.println(e.getMessage());
                    System.out.print("Warning: Sub-2s responses trigger anti-cheat review! Press ENTER to confirm your answer...");
                    scanner.nextLine();
                }

                questionAnswered = true;
                boolean isCorrect = currentQuestion.isCorrect(userChoice);

                int timeBonus = 0;
                if (isCorrect) {
                    if (durationSec <= 5) {
                        timeBonus = 5;
                        System.out.println("Speed Bonus! Answered in " + durationSec + "s (+5 pts bonus)");
                    } else if (durationSec <= 10) {
                        timeBonus = 2;
                        System.out.println("Quick Answer Bonus! Answered in " + durationSec + "s (+2 pts bonus)");
                    }
                }

                int basePoints = isCorrect ? currentDifficulty.getBasePoints() : 0;

                if (isCorrect) {
                    System.out.println("\nCORRECT! +" + (basePoints + timeBonus) + " points!");
                    answerStreak++;

                    if (answerStreak >= 2 && currentDifficulty != Difficulty.HARD) {
                        Difficulty newDiff = currentDifficulty.nextHarder();
                        System.out.println("STREAK OF " + answerStreak + "! Difficulty increased to: " + newDiff.getDisplayName() + "!");
                        currentDifficulty = newDiff;
                        answerStreak = 0;
                    }
                } else {
                    System.out.println("\nINCORRECT!");
                    System.out.println("Correct Answer: " + currentQuestion.getCorrectAnswerText());
                    System.out.println("Explanation: " + currentQuestion.getExplanation());
                    answerStreak = 0;

                    if (currentDifficulty != Difficulty.EASY) {
                        Difficulty newDiff = currentDifficulty.nextEasier();
                        System.out.println("Difficulty reduced to: " + newDiff.getDisplayName());
                        currentDifficulty = newDiff;
                    }
                }

                progressTracker.recordQuestion(categoryName, isCorrect, basePoints, durationSec, timeBonus);
            }

            System.out.println();
        }

        ReportExporter.printAndExport(progressTracker);
    }

    private void printOptions(String[] options) {
        for (int i = 0; i < options.length; i++) {
            System.out.println("   " + (i + 1) + ") " + options[i]);
        }
    }

    private void printLifelineBar() {
        System.out.print("   [Lifelines Available: ");
        Set<LifelineType> available = lifelineManager.getAvailableLifelines();
        if (available.isEmpty()) {
            System.out.print("None");
        } else {
            List<String> names = new ArrayList<>();
            for (LifelineType lt : available) {
                names.add(lt.getName());
            }
            System.out.print(String.join(" | ", names));
        }
        System.out.println("]");
    }

    private boolean handleLifelineMenu(Question question, String[] currentOptions, Scanner scanner) {
        System.out.println("\n--- LIFELINE MENU ---");
        System.out.println("1) 50/50 (Eliminate 2 wrong options)");
        System.out.println("2) Skip Question (Advance with no penalty)");
        System.out.println("3) Audience Hint (Get a clue)");
        System.out.println("4) Cancel / Return to Question");
        System.out.print("Choose a lifeline (1-4): ");

        String choiceStr = scanner.nextLine().trim();

        try {
            switch (choiceStr) {
                case "1":
                    String[] modified = lifelineManager.applyFiftyFifty(question);
                    System.arraycopy(modified, 0, currentOptions, 0, modified.length);
                    System.out.println("50/50 Applied! Two wrong options have been eliminated.");
                    return false;

                case "2":
                    lifelineManager.applySkipQuestion();
                    return true;

                case "3":
                    String hint = lifelineManager.applyHint(question);
                    System.out.println("AUDIENCE HINT: " + hint);
                    return false;

                case "4":
                default:
                    System.out.println("Returning to question...");
                    return false;
            }
        } catch (LifelineAlreadyUsedException e) {
            System.out.println("\nEXCEPTION CAUGHT: " + e.getMessage());
            return false;
        }
    }

    private String getDifficultyBadge(Difficulty difficulty) {
        switch (difficulty) {
            case EASY: return "[EASY]";
            case MEDIUM: return "[MEDIUM]";
            case HARD: return "[HARD]";
            default: return "";
        }
    }
}
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("src/com/quizapp/service/QuizEngine.java", $code, $utf8NoBom)

