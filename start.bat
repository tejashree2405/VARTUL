@echo off
echo Starting VARTUL application...

echo Starting MongoDB...
start mongod

echo Starting Backend Server...
cd backend
start cmd /k "npm install && npm start"

echo Starting Frontend Server...
cd ../frontend
start cmd /k "npm install && npm run dev"

echo VARTUL application is starting. Please wait...
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:5000
echo.
echo Do you want to initialize the database with sample data? (Y/N)
set /p init=
if /i "%init%"=="Y" (
    echo Initializing database with sample data...
    cd ../backend
    node utils/setupDB.js
)

echo.
echo Press any key to open the application in your browser...
pause > nul
start http://localhost:5173