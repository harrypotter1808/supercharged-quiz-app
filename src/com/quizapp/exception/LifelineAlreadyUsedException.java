package com.quizapp.exception;

/**
 * Custom Exception thrown when a user attempts to use a lifeline that has already been used.
 */
public class LifelineAlreadyUsedException extends Exception {
    public LifelineAlreadyUsedException(String message) {
        super(message);
    }
}
