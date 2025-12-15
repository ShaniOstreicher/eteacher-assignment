#!/bin/bash

# --- Backend ---
echo "--- Starting Backend (API) on port 5097... ---"
cd backend/eTeacher.Assignment.Api
dotnet run &
API_PID=$!
cd ../../

# --- Frontend ---
echo "--- Starting Frontend (React Dev Server) on port 5173... ---"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "--------------------------------------------------------"
echo "✅ Project is running in the background."
echo "API PID: $API_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "To view logs or stop the processes, use the following commands."
echo "--------------------------------------------------------"


echo "Press [Enter] to stop the processes and exit."

echo "--- Stopping Backend (PID $API_PID) and Frontend (PID $FRONTEND_PID)... ---"
kill $API_PID $FRONTEND_PID
echo "--- Processes stopped. Goodbye. ---"