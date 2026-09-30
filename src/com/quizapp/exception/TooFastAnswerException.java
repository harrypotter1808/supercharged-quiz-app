package com.quizapp.exception;

/**
 * Custom Exception thrown when an answer is submitted suspiciously fast (< 2.0s),
 * as part of the Anti-Cheat System.
 */
public class TooFastAnswerException extends Exception {
    private final double responseTimeSeconds;

    public TooFastAnswerException(String message, double responseTimeSeconds) {
        super(message);
        this.responseTimeSeconds = responseTimeSeconds;
    }

    public double getResponseTimeSeconds() {
        return responseTimeSeconds;
    }
}
