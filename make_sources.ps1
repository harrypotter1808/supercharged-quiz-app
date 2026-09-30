
$files = Get-ChildItem -Path src -Filter *.java -Recurse | Select-Object -ExpandProperty FullName
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllLines("sources.txt", $files, $utf8NoBom)
Write-Host "sources.txt generated!"

