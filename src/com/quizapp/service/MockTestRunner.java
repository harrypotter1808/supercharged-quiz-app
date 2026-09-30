package com.quizapp.service;

import com.quizapp.exception.TooFastAnswerException;
import com.quizapp.model.CategoryStats;
import com.quizapp.model.Difficulty;
import com.quizapp.model.Question;
import com.quizapp.repository.QuestionBank;

import java.util.*;

/**
 * MockTestRunner simulates 100 quiz attempts with randomized user profiles,
 * calculates aggregate performance metrics, and performs anomaly detection.
 */
public class MockTestRunner {

    private static final int MOCK_ATTEMPTS = 100;
    private static final int QUESTIONS_PER_ATTEMPT = 10;

    public void runSimulations() {
        System.out.println("\n====================================================");
        System.out.println("  ?? MOCK TEST RUNNER - SIMULATING 100 QUIZ ATTEMPTS");
        System.out.println("====================================================");
        System.out.println("Simulating 100 quiz attempts across 4 player profiles:");
        System.out.println("  1) Standard Player    (70% Accuracy, Normal Speed)");
        System.out.println("  2) Genius Player      (95% Accuracy, Normal Speed)");
        System.out.println("  3) Random Guesser     (25% Accuracy, Random Speed)");
        System.out.println("  4) Automated Bot/Fast (90% Accuracy, Sub-2s Speed -> Anti-Cheat Target)");
        System.out.println("----------------------------------------------------\n");

        QuestionBank questionBank = new QuestionBank();
        AntiCheatService antiCheatService = new AntiCheatService(2.0);

        List<Integer> totalScores = new ArrayList<>();
        List<Double> accuracies = new ArrayList<>();
        List<Long> completionTimes = new ArrayList<>();
        Map<String, List<Double>> categoryAccuracies = new HashMap<>();

        for (String cat : QuestionBank.getCategories()) {
            categoryAccuracies.put(cat, new ArrayList<>());
        }

        int totalAntiCheatViolations = 0;
        int totalSpeedAnomalies = 0;
        int totalBotDetections = 0;

        Random random = new Random(42); // Seeded for reproducible simulation analytics

        for (int attempt = 1; attempt <= MOCK_ATTEMPTS; attempt++) {
            ProgressTracker tracker = new ProgressTracker();
            Difficulty currentDiff = Difficulty.EASY;
            int streak = 0;

            // Assign simulated profile for this attempt
            int profile = (attempt % 4); // 0=Standard, 1=Genius, 2=Guesser, 3=Bot

            double targetAccuracy;
            double minSpeedSec;
            double maxSpeedSec;

            switch (profile) {
                case 1: // Genius
                    targetAccuracy = 0.95;
                    minSpeedSec = 2.5;
                    maxSpeedSec = 6.0;
                    break;
                case 2: // Guesser
                    targetAccuracy = 0.25;
                    minSpeedSec = 2.0;
                    maxSpeedSec = 7.0;
                    break;
                case 3: // Bot
                    targetAccuracy = 0.90;
                    minSpeedSec = 0.4;
                    maxSpeedSec = 1.4; // Sub-2.0s triggers Anti-Cheat!
                    break;
                case 0:
                default: // Standard
                    targetAccuracy = 0.70;
                    minSpeedSec = 2.2;
                    maxSpeedSec = 6.5;
                    break;
            }

            int attemptViolations = 0;

            for (int qIndex = 0; qIndex < QUESTIONS_PER_ATTEMPT; qIndex++) {
                int catIdx = qIndex % QuestionBank.getCategories().length;
                String catName = QuestionBank.getCategories()[catIdx];

                List<Question> questions = questionBank.getQuestions(catIdx, currentDiff);
                Question q = questions.get(qIndex % questions.size());

                // Simulate response time
                double durationSec = minSpeedSec + (random.nextDouble() * (maxSpeedSec - minSpeedSec));
                long startTimeMs = System.currentTimeMillis();
                long endTimeMs = startTimeMs + (long) (durationSec * 1000);

                // Anti-Cheat verification step
                boolean antiCheatTriggered = false;
                try {
                    antiCheatService.validateAnswerSpeed(startTimeMs, endTimeMs);
                } catch (TooFastAnswerException e) {
                    antiCheatTriggered = true;
                    attemptViolations++;
                    totalAntiCheatViolations++;
                }

                // Simulate answer accuracy
                boolean isCorrect = random.nextDouble() < targetAccuracy;

                int timeBonus = 0;
                if (isCorrect && !antiCheatTriggered) {
                    if (durationSec <= 5.0) timeBonus = 5;
                    else if (durationSec <= 10.0) timeBonus = 2;
                }

                int points = isCorrect ? currentDiff.getBasePoints() : 0;
                tracker.recordQuestion(catName, isCorrect, points, (long) durationSec, timeBonus);

                // Adaptive difficulty streak update
                if (isCorrect) {
                    streak++;
                    if (streak >= 2 && currentDiff != Difficulty.HARD) {
                        currentDiff = currentDiff.nextHarder();
                        streak = 0;
                    }
                } else {
                    streak = 0;
                    if (currentDiff != Difficulty.EASY) {
                        currentDiff = currentDiff.nextEasier();
                    }
                }
            }

            totalScores.add(tracker.getTotalScore());
            accuracies.add(tracker.getOverallAccuracy());
            completionTimes.add(tracker.getTotalTimeTakenSeconds());

            // Anomaly detection rules
            if (attemptViolations >= 3) {
                totalBotDetections++;
            }
            if (tracker.getOverallAccuracy() > 85.0 && tracker.getTotalTimeTakenSeconds() < 20) {
                totalSpeedAnomalies++;
            }

            // Record category stats for aggregate analysis
            for (Map.Entry<String, CategoryStats> entry : tracker.getCategoryStatsMap().entrySet()) {
                categoryAccuracies.get(entry.getKey()).add(entry.getValue().getAccuracyPercentage());
            }
        }

        // Output Analytics Report
        printAnalyticsReport(totalScores, accuracies, completionTimes, categoryAccuracies,
            totalAntiCheatViolations, totalSpeedAnomalies, totalBotDetections);
    }

    private void printAnalyticsReport(List<Integer> totalScores, List<Double> accuracies,
                                      List<Long> completionTimes,
                                      Map<String, List<Double>> categoryAccuracies,
                                      int totalAntiCheatViolations, int totalSpeedAnomalies,
                                      int totalBotDetections) {

        double avgScore = totalScores.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        double avgAccuracy = accuracies.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        double avgTime = completionTimes.stream().mapToLong(Long::longValue).average().orElse(0.0);

        int maxScore = totalScores.stream().mapToInt(Integer::intValue).max().orElse(0);
        int minScore = totalScores.stream().mapToInt(Integer::intValue).min().orElse(0);

        System.out.println("====================================================");
        System.out.println("        ?? 100-QUIZ MOCK TEST ANALYTICS REPORT      ");
        System.out.println("====================================================");
        System.out.println(String.format("Total Quiz Runs:           %d attempts", MOCK_ATTEMPTS));
        System.out.println(String.format("Average Overall Score:     %.2f pts (Range: %d - %d pts)", avgScore, minScore, maxScore));
        System.out.println(String.format("Average Accuracy:          %.2f%%", avgAccuracy));
        System.out.println(String.format("Average Completion Time:   %.2f seconds per quiz", avgTime));
        System.out.println("----------------------------------------------------");
        System.out.println("CATEGORY PERFORMANCE BREAKDOWN (Mean Accuracy):");

        String highestCategory = "";
        double highestCatAcc = -1.0;
        String lowestCategory = "";
        double lowestCatAcc = 101.0;

        for (Map.Entry<String, List<Double>> entry : categoryAccuracies.entrySet()) {
            double catAvg = entry.getValue().stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            System.out.println(String.format(" - %-18s: %.2f%% average accuracy", entry.getKey(), catAvg));
            if (catAvg > highestCatAcc) {
                highestCatAcc = catAvg;
                highestCategory = entry.getKey();
            }
            if (catAvg < lowestCatAcc) {
                lowestCatAcc = catAvg;
                lowestCategory = entry.getKey();
            }
        }

        System.out.println("----------------------------------------------------");
        System.out.println(String.format("Strongest Category Overall: %s (%.2f%%)", highestCategory, highestCatAcc));
        System.out.println(String.format("Weakest Category Overall:   %s (%.2f%%)", lowestCategory, lowestCatAcc));
        System.out.println("----------------------------------------------------");
        System.out.println("?? ANOMALY & ANTI-CHEAT DETECTION SUMMARY:");
        System.out.println(String.format(" - Sub-2.0s Speed Violations Caught:  %d events", totalAntiCheatViolations));
        System.out.println(String.format(" - Ultra-Fast High Score Anomalies:  %d attempts", totalSpeedAnomalies));
        System.out.println(String.format(" - Flagged Automated Bot Behaviors:  %d / 100 attempts (%.0f%% of total)",
            totalBotDetections, ((double) totalBotDetections / MOCK_ATTEMPTS) * 100.0));
        System.out.println("====================================================\n");
    }
}
