@echo off
echo Starting ProFIX Server...
cd /d "%~dp0backend"
python server.py
pause
