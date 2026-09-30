package com.quizapp.util;

import com.quizapp.model.CategoryStats;
import com.quizapp.service.ProgressTracker;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

/**
 * Formats and exports the final quiz summary report to console and text file.
 */
public class ReportExporter {

    public static final String REPORT_FILE_PATH = "quiz_summary_report.txt";

    public static String generateReportText(ProgressTracker tracker) {
        StringBuilder sb = new StringBuilder();
        sb.append("====================================================\n");
        sb.append("                    QUIZ SUMMARY                    \n");
        sb.append("====================================================\n");
        sb.append(String.format("Total Questions: %d\n", tracker.getTotalQuestionsAttempted()));
        sb.append(String.format("Correct Answers: %d\n", tracker.getTotalCorrectAnswers()));
        sb.append(String.format("Overall Accuracy: %.1f%%\n", tracker.getOverallAccuracy()));
        sb.append(String.format("Total Score:     %d pts (Time Bonus: +%d pts)\n", 
            tracker.getTotalScore(), tracker.getTimeBonusesEarned()));
        sb.append(String.format("Time Taken:      %d seconds\n", tracker.getTotalTimeTakenSeconds()));

        CategoryStats strongest = tracker.getStrongestCategory();
        CategoryStats weakest = tracker.getWeakestCategory();

        if (strongest != null) {
            sb.append(String.format("Strongest Category: %s (%.0f%%)\n",
                strongest.getCategoryName(), strongest.getAccuracyPercentage()));
        } else {
            sb.append("Strongest Category: N/A\n");
        }

        if (weakest != null) {
            sb.append(String.format("Weakest Category:   %s (%.0f%%)\n",
                weakest.getCategoryName(), weakest.getAccuracyPercentage()));
        } else {
            sb.append("Weakest Category:   N/A\n");
        }

        sb.append("----------------------------------------------------\n");
        sb.append("CATEGORY BREAKDOWN:\n");
        Map<String, CategoryStats> statsMap = tracker.getCategoryStatsMap();
        for (Map.Entry<String, CategoryStats> entry : statsMap.entrySet()) {
            CategoryStats cs = entry.getValue();
            sb.append(String.format(" - %-18s: %d/%d Correct (%.1f%%) | Score: %d pts | Time: %ds\n",
                cs.getCategoryName(), cs.getCorrect(), cs.getAttempted(),
                cs.getAccuracyPercentage(), cs.getTotalPoints(), cs.getTotalTimeSeconds()));
        }
        sb.append("====================================================\n");

        return sb.toString();
    }

    public static void printAndExport(ProgressTracker tracker) {
        String report = generateReportText(tracker);
        System.out.println("\n" + report);

        try (PrintWriter writer = new PrintWriter(new FileWriter(REPORT_FILE_PATH))) {
            writer.print(report);
            System.out.println("?? Summary report successfully exported to '" + REPORT_FILE_PATH + "'.\n");
        } catch (IOException e) {
            System.err.println("?? Failed to export report to file: " + e.getMessage());
        }
    }
}
