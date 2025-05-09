@echo off
echo Starting Trinity Platform...

REM Sunucu bileşenini başlat
cd /d "%~dp0"
start cmd /k "echo Starting Server... && node src/app.js"

REM 2 saniye bekle
timeout /t 2 /nobreak > nul

REM Client bileşenini başlat
cd /d "%~dp0client"
if exist package.json (
  start cmd /k "echo Starting Client... && npm start"
) else (
  echo Client directory not found or package.json missing.
)

echo Trinity Platform is starting. Please wait for the browser window to open... 