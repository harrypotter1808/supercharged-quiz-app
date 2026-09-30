package com.quizapp.model;

/**
 * Tracks performance statistics for a specific category.
 */
public class CategoryStats {
    private final String categoryName;
    private int attempted;
    private int correct;
    private int totalPoints;
    private long totalTimeSeconds;

    public CategoryStats(String categoryName) {
        this.categoryName = categoryName;
        this.attempted = 0;
        this.correct = 0;
        this.totalPoints = 0;
        this.totalTimeSeconds = 0;
    }

    public void recordAttempt(boolean isCorrect, int points, long timeSeconds) {
        attempted++;
        if (isCorrect) {
            correct++;
        }
        totalPoints += points;
        totalTimeSeconds += timeSeconds;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public int getAttempted() {
        return attempted;
    }

    public int getCorrect() {
        return correct;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public long getTotalTimeSeconds() {
        return totalTimeSeconds;
    }

    public double getAccuracyPercentage() {
        if (attempted == 0) return 0.0;
        return (double) correct / attempted * 100.0;
    }
}
