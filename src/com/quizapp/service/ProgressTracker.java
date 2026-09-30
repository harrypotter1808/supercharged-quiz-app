package com.quizapp.service;

import com.quizapp.model.CategoryStats;

import java.util.*;

/**
 * Tracks score, accuracy, and timing per category using a HashMap.
 * Determines strongest and weakest subjects.
 */
public class ProgressTracker {

    // Requirement 5: HashMap to track scores per category
    private final Map<String, CategoryStats> categoryStatsMap;
    private int timeBonusesEarned;

    public ProgressTracker() {
        this.categoryStatsMap = new HashMap<>();
        this.timeBonusesEarned = 0;
    }

    public void reset() {
        categoryStatsMap.clear();
        timeBonusesEarned = 0;
    }

    public void recordQuestion(String category, boolean isCorrect, int points, long timeSeconds, int timeBonus) {
        CategoryStats stats = categoryStatsMap.computeIfAbsent(category, CategoryStats::new);
        stats.recordAttempt(isCorrect, points + timeBonus, timeSeconds);
        this.timeBonusesEarned += timeBonus;
    }

    public Map<String, CategoryStats> getCategoryStatsMap() {
        return Collections.unmodifiableMap(categoryStatsMap);
    }

    public int getTotalQuestionsAttempted() {
        return categoryStatsMap.values().stream().mapToInt(CategoryStats::getAttempted).sum();
    }

    public int getTotalCorrectAnswers() {
        return categoryStatsMap.values().stream().mapToInt(CategoryStats::getCorrect).sum();
    }

    public int getTotalScore() {
        return categoryStatsMap.values().stream().mapToInt(CategoryStats::getTotalPoints).sum();
    }

    public long getTotalTimeTakenSeconds() {
        return categoryStatsMap.values().stream().mapToLong(CategoryStats::getTotalTimeSeconds).sum();
    }

    public int getTimeBonusesEarned() {
        return timeBonusesEarned;
    }

    public double getOverallAccuracy() {
        int total = getTotalQuestionsAttempted();
        if (total == 0) return 0.0;
        return ((double) getTotalCorrectAnswers() / total) * 100.0;
    }

    /**
     * Determines the strongest category based on accuracy percentage.
     */
    public CategoryStats getStrongestCategory() {
        return categoryStatsMap.values().stream()
            .filter(stats -> stats.getAttempted() > 0)
            .max(Comparator.comparingDouble(CategoryStats::getAccuracyPercentage)
                .thenComparingInt(CategoryStats::getCorrect))
            .orElse(null);
    }

    /**
     * Determines the weakest category based on accuracy percentage.
     */
    public CategoryStats getWeakestCategory() {
        return categoryStatsMap.values().stream()
            .filter(stats -> stats.getAttempted() > 0)
            .min(Comparator.comparingDouble(CategoryStats::getAccuracyPercentage)
                .thenComparingInt(CategoryStats::getAttempted))
            .orElse(null);
    }
}
