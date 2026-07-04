# Persist secrets once so ANY Claude Code session / chat can use them:
#   - setx (User env)  -> for MCP servers and CLIs (supabase, telegram)
#   - .env.local       -> for the app (Vite, VITE_* only)
# Run: powershell -ExecutionPolicy Bypass -File scripts\setup-secrets.ps1 -Param ...
# All params optional - fill them in as tokens become available.
# NOTE: kept ASCII-only on purpose - Windows PowerShell 5.1 reads .ps1 in the
# system code page and would corrupt non-ASCII characters.
param(
  [string]$SupabaseUrl,          # https://xxxx.supabase.co
  [string]$SupabaseAnonKey,      # public anon key (frontend)
  [string]$SupabaseAccessToken,  # sbp_... (management, CLI/MCP)
  [string]$SupabaseProjectRef,   # xxxx from the URL
  [string]$TelegramBotToken      # 123:AA... from @BotFather
)

function Persist($name, $value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return }
  [Environment]::SetEnvironmentVariable($name, $value, 'User')
  Write-Host "  user-env  $name = $($value.Substring(0,[Math]::Min(6,$value.Length)))..."
}

Write-Host "== Saving to User env (picked up by new sessions) =="
Persist 'SUPABASE_ACCESS_TOKEN' $SupabaseAccessToken
Persist 'SUPABASE_PROJECT_REF'  $SupabaseProjectRef
Persist 'TELEGRAM_BOT_TOKEN'    $TelegramBotToken

# .env.local for the app (rewrite only the provided lines)
$envPath = Join-Path $PSScriptRoot '..\.env.local'
$script:lines = @()
if (Test-Path $envPath) { $script:lines = @(Get-Content $envPath) }
function SetLine($key, $val) {
  if ([string]::IsNullOrWhiteSpace($val)) { return }
  $script:lines = @($script:lines | Where-Object { $_ -notmatch "^$key=" })
  $script:lines += "$key=$val"
}
SetLine 'VITE_SUPABASE_URL'      $SupabaseUrl
SetLine 'VITE_SUPABASE_ANON_KEY' $SupabaseAnonKey
if ($script:lines.Count -gt 0) {
  Set-Content -Path $envPath -Value $script:lines -Encoding UTF8
  Write-Host "== .env.local updated (gitignored, never committed) =="
}
Write-Host "Done. Restart the Claude Code session so MCP sees the new tokens."
