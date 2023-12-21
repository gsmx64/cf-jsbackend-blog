@ECHO OFF
ECHO -----------------------------------------
ECHO Blog App - Runing Frontend
ECHO -----------------------------------------
cd frontend
npm run dev
IF ERRORLEVEL 1 goto finish

:finish
PAUSE