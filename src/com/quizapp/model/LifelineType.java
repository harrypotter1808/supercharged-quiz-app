package com.quizapp.model;

/**
 * Enum representing available lifelines in the quiz.
 */
public enum LifelineType {
    FIFTY_FIFTY("50/50", "Eliminates two incorrect options"),
    SKIP_QUESTION("Skip Question", "Skips the current question without penalty"),
    HINT("Audience Hint", "Provides a helpful clue to guide your answer");

    private final String name;
    private final String description;

    LifelineType(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
