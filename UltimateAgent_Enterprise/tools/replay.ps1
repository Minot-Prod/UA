param(
  [string]$BaseUrl = $env:UA_N8N_BASE_URL
)
if ([string]::IsNullOrEmpty($BaseUrl)) {
  Write-Host "Please set $env:UA_N8N_BASE_URL or pass -BaseUrl" -ForegroundColor Yellow
  exit 1
}

Write-Host "== Replaying queued requests to: $BaseUrl =="
$files = @("PING.json","DEMO.json")
foreach ($f in $files) {
  Write-Host "--> POST $f"
  $body = Get-Content $f -Raw
  try {
    $resp = Invoke-WebRequest -Uri $BaseUrl -Method Post -ContentType "application/json" -Body $body -UseBasicParsing
    $resp.Content | Out-Host
  } catch {
    Write-Host "Request failed: $($_.Exception.Message)" -ForegroundColor Red
  }
  Write-Host ""
}
