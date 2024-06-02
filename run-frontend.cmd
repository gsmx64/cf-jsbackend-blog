@ECHO OFF
ECHO -----------------------------------------
ECHO Blog App - Runing Frontend
ECHO -----------------------------------------
cd frontend
npm run startw:dev
IF ERRORLEVEL 1 goto finish

:finish
PAUSE