package com.quizapp.model;

public enum Difficulty {
    EASY(0, "Easy", 10),
    MEDIUM(1, "Medium", 20),
    HARD(2, "Hard", 30);

    private final int index;
    private final String displayName;
    private final int basePoints;

    Difficulty(int index, String displayName, int basePoints) {
        this.index = index;
        this.displayName = displayName;
        this.basePoints = basePoints;
    }

    public int getIndex() { return index; }
    public String getDisplayName() { return displayName; }
    public int getBasePoints() { return basePoints; }

    public Difficulty nextHarder() {
        switch (this) {
            case EASY: return MEDIUM;
            case MEDIUM: return HARD;
            default: return HARD;
        }
    }

    public Difficulty nextEasier() {
        switch (this) {
            case HARD: return MEDIUM;
            case MEDIUM: return EASY;
            default: return EASY;
        }
    }

    public static Difficulty fromIndex(int index) {
        for (Difficulty d : values()) {
            if (d.getIndex() == index) return d;
        }
        return EASY;
    }
}
