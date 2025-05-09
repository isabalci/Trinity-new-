# UTF-8 Karakter kodlamasını ayarla
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:LANG = "tr_TR.UTF-8"
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Trinity Başlatılıyor..." -ForegroundColor Cyan

# Çalışan Node.js süreçlerini sonlandır
Write-Host "Çalışan Node.js süreçleri sonlandırılıyor..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Node.js süreçleri sonlandırıldı." -ForegroundColor Green
} else {
    Write-Host "Sonlandırılacak aktif Node.js süreci bulunamadı." -ForegroundColor Yellow
}

# 3 saniye bekle
Start-Sleep -Seconds 3

# Function to check if a port is in use
function Test-PortInUse {
    param (
        [int]$Port
    )
    
    $connections = netstat -ano | Select-String -Pattern "LISTENING" | Select-String -Pattern ":$Port\s"
    return ($connections -ne $null)
}

# Function to get process ID using a port
function Get-ProcessIdFromPort {
    param (
        [int]$Port
    )
    
    $connections = netstat -ano | Select-String -Pattern "LISTENING" | Select-String -Pattern ":$Port\s"
    if ($connections -ne $null) {
        $line = $connections.ToString().Trim()
        $parts = $line -split '\s+'
        return $parts[-1]
    }
    return $null
}

# Check PostgreSQL status
Write-Host "PostgreSQL durumu kontrol ediliyor..." -ForegroundColor Yellow
$pgService = Get-Service "postgresql*" -ErrorAction SilentlyContinue
if ($pgService -eq $null) {
    Write-Host "PostgreSQL servisi bulunamadı. Lütfen kurulu olduğundan emin olun." -ForegroundColor Red
    Write-Host "PostgreSQL'i şu adresten indirebilirsiniz: https://www.postgresql.org/download/" -ForegroundColor Yellow
} else {
    if ($pgService.Status -ne "Running") {
        Write-Host "PostgreSQL servisi başlatılıyor..." -ForegroundColor Yellow
        Start-Service $pgService.Name
        Start-Sleep -Seconds 5
    }
    Write-Host "PostgreSQL çalışıyor." -ForegroundColor Green
}

# Define ports
$backendPort = 3002
$frontendPort = 3000

# Check if ports are in use
if (Test-PortInUse -Port $backendPort) {
    $processId = Get-ProcessIdFromPort -Port $backendPort
    Write-Host "Port $backendPort zaten $processId numaralı süreç tarafından kullanılıyor." -ForegroundColor Yellow
    $response = Read-Host "Süreci sonlandırıp portu serbest bırakmak ister misiniz? (e/h)"
    if ($response -eq "e") {
        Write-Host "Süreç $processId sonlandırılıyor..." -ForegroundColor Yellow
        Stop-Process -Id $processId -Force
        Start-Sleep -Seconds 2
    } else {
        # Use an alternative port
        $backendPort = 3003
        Write-Host "Alternatif port kullanılıyor: $backendPort" -ForegroundColor Yellow
    }
}

if (Test-PortInUse -Port $frontendPort) {
    $processId = Get-ProcessIdFromPort -Port $frontendPort
    Write-Host "Port $frontendPort zaten $processId numaralı süreç tarafından kullanılıyor." -ForegroundColor Yellow
    $response = Read-Host "Süreci sonlandırıp portu serbest bırakmak ister misiniz? (e/h)"
    if ($response -eq "e") {
        Write-Host "Süreç $processId sonlandırılıyor..." -ForegroundColor Yellow
        Stop-Process -Id $processId -Force
        Start-Sleep -Seconds 2
    } else {
        # Use an alternative port
        $frontendPort = 3001
        Write-Host "Alternatif port kullanılıyor: $frontendPort" -ForegroundColor Yellow
    }
}

# Install missing npm packages
Write-Host "Eksik NPM paketleri kontrol ediliyor..." -ForegroundColor Yellow
$modules = @("ws", "react-icons", "recharts", "axios", "i18next", "i18next-http-backend", "react-router-dom", "cors", "dotenv", "pg")
foreach ($module in $modules) {
    Write-Host "Paket kontrol ediliyor: $module" -ForegroundColor Cyan
    $modulePath = Join-Path $PSScriptRoot "node_modules\$module"
    if (-not (Test-Path $modulePath)) {
        Write-Host "Eksik paket: $module - Yükleniyor..." -ForegroundColor Yellow
        npm install $module
    }
    
    $clientModulePath = Join-Path $PSScriptRoot "client\node_modules\$module"
    if (-not (Test-Path $clientModulePath)) {
        Write-Host "Eksik istemci paketi: $module - Yükleniyor..." -ForegroundColor Yellow
        Push-Location -Path (Join-Path $PSScriptRoot "client")
        npm install $module
        Pop-Location
    }
}

# Create .env file with the correct port for backend
$envPath = Join-Path $PSScriptRoot "src\.env"
@"
PORT=$backendPort
CLIENT_URL=http://localhost:$frontendPort
NODE_ENV=development
"@ | Out-File -FilePath $envPath -Encoding utf8

# Create .env file for client with the correct backend URL
$clientEnvPath = Join-Path $PSScriptRoot "client\.env"
@"
REACT_APP_API_URL=http://localhost:$backendPort/api
PORT=$frontendPort
"@ | Out-File -FilePath $clientEnvPath -Encoding utf8

# Start the backend server
Write-Host "Backend sunucusu $backendPort portu üzerinde başlatılıyor..." -ForegroundColor Cyan
$backendPath = Join-Path $PSScriptRoot "src"
$env:PORT = $backendPort

# Start backend in a separate window
$backendScript = @"
cd "$backendPath"
Set-Location -Path "$backendPath"
`$env:PORT = "$backendPort"
`$env:CLIENT_URL = "http://localhost:$frontendPort"
node app.js
"@

$backendScriptPath = [System.IO.Path]::GetTempFileName() + ".ps1"
$backendScript | Out-File -FilePath $backendScriptPath -Encoding utf8

Start-Process powershell -ArgumentList "-NoExit", "-File", $backendScriptPath

# Wait for backend to start
Write-Host "Backend başlatılıyor, lütfen bekleyin..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Start the frontend development server
Write-Host "Frontend sunucusu $frontendPort portu üzerinde başlatılıyor..." -ForegroundColor Cyan
$frontendPath = Join-Path $PSScriptRoot "client"

# Create or update frontend .env.local with API URL
$envLocalPath = Join-Path $frontendPath ".env.local"
@"
REACT_APP_API_URL=http://localhost:$backendPort/api
PORT=$frontendPort
"@ | Out-File -FilePath $envLocalPath -Encoding utf8

# Start frontend in a separate window
$frontendScript = @"
cd "$frontendPath"
Set-Location -Path "$frontendPath"
`$env:PORT = "$frontendPort"
`$env:REACT_APP_API_URL = "http://localhost:$backendPort/api"
npm start
"@

$frontendScriptPath = [System.IO.Path]::GetTempFileName() + ".ps1"
$frontendScript | Out-File -FilePath $frontendScriptPath -Encoding utf8

Start-Process powershell -ArgumentList "-NoExit", "-File", $frontendScriptPath

# Open the application in the default browser
Write-Host "Trinity tarayıcınızda açılıyor..." -ForegroundColor Green
Start-Sleep -Seconds 15
Start-Process "http://localhost:$frontendPort"

Write-Host "Trinity çalışıyor!" -ForegroundColor Green
Write-Host "Backend: http://localhost:$backendPort" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:$frontendPort" -ForegroundColor Cyan
Write-Host "İşlem tamamlandığında Ctrl+C ile sunucuları durdurabilirsiniz." -ForegroundColor Yellow 