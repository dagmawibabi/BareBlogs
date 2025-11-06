$username = "YOUR_GITHUB_USERNAME"
$token = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
$page = 1

while ($true) {
    Write-Host "Fetching page $page..."
    $auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${username}:${token}"))
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos?per_page=100&page=$page" `
        -Headers @{Authorization = "Basic $auth"}

    if (-not $response) {
        Write-Host "No more repositories found."
        break
    }

    foreach ($repo in $response) {
        Write-Host "Cloning $($repo.clone_url)"
        git clone $repo.clone_url
    }

    $page++
}
