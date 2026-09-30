
$bankContent = Get-Content -Raw src/com/quizapp/repository/QuestionBank.java
$bankContent = $bankContent.Replace('public static final String[] CATEGORIES = {"Java", "Python", "Math", "Science", "General Knowledge"};', 'public static final String[] CATEGORIES = {"Java & OOP", "Python & Scripting", "Data Structures & Algorithms", "Computer Science Core", "Engineering Mathematics", "General Knowledge & Tech"};')
[System.IO.File]::WriteAllText("src/com/quizapp/repository/QuestionBank.java", $bankContent)

$mainContent = Get-Content -Raw src/com/quizapp/QuizAppMain.java
$mainContent = $mainContent.Replace('Enter number of questions for this session (default 10):', 'Enter custom number of questions for this session (e.g. 7, 12, 25, default 10):')
[System.IO.File]::WriteAllText("src/com/quizapp/QuizAppMain.java", $mainContent)

Write-Host "Java files updated successfully!"

