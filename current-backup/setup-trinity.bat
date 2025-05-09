@echo off
echo Trinity Setup Script
echo ==================

REM Check for Node.js
echo Checking for Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed or not in the PATH.
  echo Please install Node.js from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

REM Project root directory
cd /d "%~dp0"
echo Setting up Trinity in: %CD%

echo.
echo Installing root project dependencies...
call npm install --legacy-peer-deps

echo.
echo Installing client dependencies...
cd client
call npm install --legacy-peer-deps
cd ..

echo.
echo Setting up PostgreSQL database...
echo Creating tables...
type db_setup.sql | psql -U postgres -d trinity_db

echo.
echo Trinity setup completed!
echo To start the application:
echo   - Run start-trinity.bat 
echo   - Or use 'start-trinity.ps1' in PowerShell

pause 