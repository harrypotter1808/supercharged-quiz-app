
$content = Get-Content -Raw app.js
$content = $content.Replace("const CATEGORIES = [`"Java`", `"Python`", `"Math`", `"Science`", `"General Knowledge`"];", "const CATEGORIES = [`"Java & OOP`", `"Python & Scripting`", `"Data Structures & Algorithms`", `"Computer Science Core`", `"Engineering Mathematics`", `"General Knowledge & Tech`"];")

$oldStart = "state.selectedCategoryIdx = parseInt(document.getElementById('category-select').value);" + [Environment]::NewLine + "    state.totalQuestionsSetting = parseInt(document.getElementById('question-count').value);"
$newStart = "state.selectedCategoryIdx = parseInt(document.getElementById('category-select').value);" + [Environment]::NewLine + "    let customVal = parseInt(document.getElementById('custom-question-input').value);" + [Environment]::NewLine + "    state.totalQuestionsSetting = (isNaN(customVal) || customVal <= 0) ? 10 : customVal;"

$content = $content.Replace($oldStart, $newStart)

[System.IO.File]::WriteAllText("app.js", $content)
Write-Host "app.js updated successfully!"

