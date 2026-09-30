package com.quizapp;

import com.quizapp.repository.QuestionBank;
import com.quizapp.service.MockTestRunner;
import com.quizapp.service.QuizEngine;

import java.util.Scanner;

/**
 * Main Entry Point for Supercharged Quiz App with Adaptive Difficulty & Lifelines.
 */
public class QuizAppMain {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        QuizEngine quizEngine = new QuizEngine();

        System.out.println("==========================================================================");
        System.out.println("   SUPERCHARGED QUIZ APP WITH ADAPTIVE DIFFICULTY & LIFELINES");
        System.out.println("==========================================================================");

        boolean exit = false;

        while (!exit) {
            printMainMenu();
            System.out.print("Select an option (1-4): ");
            String input = scanner.nextLine().trim();

            switch (input) {
                case "1":
                    handleInteractiveQuizMenu(quizEngine, scanner);
                    break;
                case "2":
                    MockTestRunner mockTestRunner = new MockTestRunner();
                    mockTestRunner.runSimulations();
                    break;
                case "3":
                    printRulesAndInfo();
                    break;
                case "4":
                    exit = true;
                    System.out.println("\nThank you for playing Supercharged Quiz App! Goodbye!\n");
                    break;
                default:
                    System.out.println("\nInvalid choice. Please enter a number between 1 and 4.\n");
                    break;
            }
        }

        scanner.close();
    }

    private static void printMainMenu() {
        System.out.println("\n==================================================");
        System.out.println("                   MAIN MENU                      ");
        System.out.println("==================================================");
        System.out.println("1) Play Interactive Quiz (Adaptive Difficulty)");
        System.out.println("2) Run Mock Test Runner (100 Simulations)");
        System.out.println("3) View Rules, Lifelines & Anti-Cheat Info");
        System.out.println("4) Exit Application");
        System.out.println("==================================================");
    }

    private static void handleInteractiveQuizMenu(QuizEngine quizEngine, Scanner scanner) {
        System.out.println("\n--- SELECT CATEGORY ---");
        String[] categories = QuestionBank.getCategories();

        for (int i = 0; i < categories.length; i++) {
            System.out.println((i + 1) + ") " + categories[i]);
        }
        System.out.println((categories.length + 1) + ") Mixed Categories (All Topics)");

        System.out.print("\nChoose category (1-" + (categories.length + 1) + "): ");
        String catInput = scanner.nextLine().trim();

        int selectedCategoryIndex = -1; // Default to mixed
        try {
            int choice = Integer.parseInt(catInput);
            if (choice >= 1 && choice <= categories.length) {
                selectedCategoryIndex = choice - 1;
            }
        } catch (NumberFormatException ignored) {}

        System.out.print("Enter number of questions for this session (default 10): ");
        String questionsInput = scanner.nextLine().trim();
        int totalQuestions = 10;
        try {
            int qVal = Integer.parseInt(questionsInput);
            if (qVal > 0) totalQuestions = qVal;
        } catch (NumberFormatException ignored) {}

        quizEngine.startInteractiveQuiz(selectedCategoryIndex, totalQuestions, scanner);
    }

    private static void printRulesAndInfo() {
        System.out.println("\n==========================================================================");
        System.out.println("                 SUPERCHARGED QUIZ RULEBOOK                               ");
        System.out.println("==========================================================================");
        System.out.println("1. ADAPTIVE DIFFICULTY:");
        System.out.println("   - Questions stored in a 3D Array: [Category][Difficulty][Index]");
        System.out.println("   - 2 consecutive correct answers -> Level UP (EASY -> MEDIUM -> HARD)");
        System.out.println("   - 1 incorrect answer -> Level DOWN & Streak reset");
        System.out.println("   - Base points scale with difficulty: EASY (10pts), MEDIUM (20pts), HARD (30pts)");
        System.out.println();
        System.out.println("2. LIFELINE SYSTEM (Each used once per session):");
        System.out.println("   - 50/50: Removes 2 wrong answer choices.");
        System.out.println("   - Skip Question: Advances without score loss.");
        System.out.println("   - Audience Hint: Gives a helpful clue.");
        System.out.println("   - Throws custom 'LifelineAlreadyUsedException' if overused!");
        System.out.println();
        System.out.println("3. TIME ATTACK & BONUS:");
        System.out.println("   - Answer within <= 5s: +5 Speed Bonus points");
        System.out.println("   - Answer within <= 10s: +2 Quick Answer Bonus points");
        System.out.println();
        System.out.println("4. ANTI-CHEAT SYSTEM:");
        System.out.println("   - Answers submitted in < 2.0s trigger custom 'TooFastAnswerException'!");
        System.out.println();
        System.out.println("5. PROGRESS TRACKING & EXPORT:");
        System.out.println("   - Performance tracked per category using HashMap.");
        System.out.println("   - Highlights Strongest & Weakest categories in formatted Summary Report.");
        System.out.println("   - Automatically exported to 'quiz_summary_report.txt'.");
        System.out.println("==========================================================================\n");
    }
}
