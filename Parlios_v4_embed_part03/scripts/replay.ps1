Param(
  [Parameter(Mandatory=$false)]
  [string]$BaseUrl = $env:UA_N8N_BASE_URL
)
if (-not $BaseUrl) {
  Write-Host 'Please set UA_N8N_BASE_URL=https://<your-n8n>/webhook/ua/chat'
  exit 1
}
Write-Host "== Replaying to: $BaseUrl =="
foreach ($f in @("PING.json","DEMO.json")) {
  Write-Host "--> POST $f"
  $body = Get-Content -Raw $f
  try {
    Invoke-RestMethod -Method Post -Uri $BaseUrl -ContentType 'application/json' -Body $body
  } catch {
    Write-Host "Error: $($_.Exception.Message)"
  }
  Write-Host ""
}
