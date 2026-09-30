package com.quizapp.service;

import com.quizapp.exception.TooFastAnswerException;

/**
 * Anti-Cheat Service that detects suspiciously fast answers (< 2.0 seconds) and throws a custom exception.
 */
public class AntiCheatService {

    public static final double DEFAULT_MIN_TIME_SECONDS = 2.0;
    private final double minAnswerTimeSeconds;
    private boolean enabled;

    public AntiCheatService() {
        this(DEFAULT_MIN_TIME_SECONDS);
    }

    public AntiCheatService(double minAnswerTimeSeconds) {
        this.minAnswerTimeSeconds = minAnswerTimeSeconds;
        this.enabled = true;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * Validates answer speed and throws TooFastAnswerException if duration < 2.0 seconds.
     */
    public void validateAnswerSpeed(long startTimeMs, long endTimeMs) throws TooFastAnswerException {
        if (!enabled) return;

        double timeTakenSeconds = (endTimeMs - startTimeMs) / 1000.0;
        if (timeTakenSeconds < minAnswerTimeSeconds) {
            throw new TooFastAnswerException(
                String.format("Anti-Cheat Warning: Answer submitted too fast (%.2f seconds < %.1fs minimum threshold)!",
                    timeTakenSeconds, minAnswerTimeSeconds),
                timeTakenSeconds
            );
        }
    }
}
