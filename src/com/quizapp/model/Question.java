package com.quizapp.model;

import java.util.Arrays;

/**
 * Represents a single quiz question with options, correct answer, category, difficulty, and hint.
 */
public class Question {
    private final String id;
    private final String questionText;
    private final String[] options;
    private final int correctOptionIndex;
    private final String category;
    private final Difficulty difficulty;
    private final String hint;
    private final String explanation;

    public Question(String id, String questionText, String[] options, int correctOptionIndex,
                    String category, Difficulty difficulty, String hint, String explanation) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.category = category;
        this.difficulty = difficulty;
        this.hint = hint;
        this.explanation = explanation;
    }

    public String getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public String[] getOptions() {
        return Arrays.copyOf(options, options.length);
    }

    public int getCorrectOptionIndex() {
        return correctOptionIndex;
    }

    public String getCategory() {
        return category;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public String getHint() {
        return hint;
    }

    public String getExplanation() {
        return explanation;
    }

    public boolean isCorrect(int userChoice) {
        return userChoice == correctOptionIndex;
    }

    public String getCorrectAnswerText() {
        if (correctOptionIndex >= 0 && correctOptionIndex < options.length) {
            return options[correctOptionIndex];
        }
        return "N/A";
    }
}
