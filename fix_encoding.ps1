
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
Get-ChildItem -Path src -Filter *.java -Recurse | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    [System.IO.File]::WriteAllText($_.FullName, $text, $utf8NoBom)
}
Write-Host "BOM stripped successfully!"

