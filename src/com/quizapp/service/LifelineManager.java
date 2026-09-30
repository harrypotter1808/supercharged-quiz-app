package com.quizapp.service;

import com.quizapp.exception.LifelineAlreadyUsedException;
import com.quizapp.model.LifelineType;
import com.quizapp.model.Question;

import java.util.*;

/**
 * Manages usage of lifelines in the quiz and enforces usage constraints with custom exceptions.
 */
public class LifelineManager {

    private final Set<LifelineType> usedLifelines;

    public LifelineManager() {
        this.usedLifelines = new HashSet<>();
    }

    public void reset() {
        usedLifelines.clear();
    }

    public boolean isUsed(LifelineType type) {
        return usedLifelines.contains(type);
    }

    public Set<LifelineType> getAvailableLifelines() {
        Set<LifelineType> available = new HashSet<>(Arrays.asList(LifelineType.values()));
        available.removeAll(usedLifelines);
        return available;
    }

    /**
     * Applies 50/50 lifeline: removes 2 incorrect options.
     * Throws LifelineAlreadyUsedException if already used.
     */
    public String[] applyFiftyFifty(Question question) throws LifelineAlreadyUsedException {
        if (usedLifelines.contains(LifelineType.FIFTY_FIFTY)) {
            throw new LifelineAlreadyUsedException("The '50/50' lifeline has already been used in this quiz session!");
        }

        usedLifelines.add(LifelineType.FIFTY_FIFTY);

        String[] originalOptions = question.getOptions();
        int correctIndex = question.getCorrectOptionIndex();
        String[] modifiedOptions = Arrays.copyOf(originalOptions, originalOptions.length);

        List<Integer> incorrectIndices = new ArrayList<>();
        for (int i = 0; i < originalOptions.length; i++) {
            if (i != correctIndex) {
                incorrectIndices.add(i);
            }
        }

        // Randomly pick 2 incorrect indices to remove
        Collections.shuffle(incorrectIndices);
        modifiedOptions[incorrectIndices.get(0)] = "[Removed by 50/50]";
        modifiedOptions[incorrectIndices.get(1)] = "[Removed by 50/50]";

        return modifiedOptions;
    }

    /**
     * Applies Skip Question lifeline: allows skipping without penalty.
     * Throws LifelineAlreadyUsedException if already used.
     */
    public void applySkipQuestion() throws LifelineAlreadyUsedException {
        if (usedLifelines.contains(LifelineType.SKIP_QUESTION)) {
            throw new LifelineAlreadyUsedException("The 'Skip Question' lifeline has already been used in this quiz session!");
        }
        usedLifelines.add(LifelineType.SKIP_QUESTION);
    }

    /**
     * Applies Hint lifeline: returns a helpful clue.
     * Throws LifelineAlreadyUsedException if already used.
     */
    public String applyHint(Question question) throws LifelineAlreadyUsedException {
        if (usedLifelines.contains(LifelineType.HINT)) {
            throw new LifelineAlreadyUsedException("The 'Audience Hint' lifeline has already been used in this quiz session!");
        }
        usedLifelines.add(LifelineType.HINT);
        return question.getHint();
    }
}
