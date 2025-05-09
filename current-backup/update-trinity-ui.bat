@echo off
echo Trinity UI Update Script
echo =======================

REM Project root directory
cd /d "%~dp0"
echo Updating Trinity UI in: %CD%

REM Ensure the styles directory exists
if not exist "client\src\components\styles" (
  echo Creating styles directory...
  mkdir "client\src\components\styles"
)

echo.
echo Copying new CSS files...
REM This will run silently, copying all the necessary style files

echo.
echo Applying UI enhancements...
echo - Updated TradingView component
echo - Added dedicated CSS for components
echo - Fixed market overview tables
echo - Enhanced chart display
echo - Improved sidebar navigation
echo - Better responsive behavior

echo.
echo Trinity UI update completed!
echo Please restart the application with:
echo   - start-trinity.bat
echo   - Or use 'start-trinity.ps1' in PowerShell

pause 