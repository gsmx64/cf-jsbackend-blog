@ECHO OFF
ECHO -----------------------------------------
ECHO Blog App - Runing Backend
ECHO -----------------------------------------
cd backend
npm run startw:dev
IF ERRORLEVEL 1 goto finish

:finish
PAUSE