#!/bin/bash

# --- 1. Backend Setup ---
echo "--- Setting up Backend (ASP.NET Core API) ---"
cd backend/eTeacher.Assignment.Api

# Restore dependencies
dotnet restore

# Install required AWS package for mocking
dotnet add package AWSSDK.S3

# Build the project
dotnet build

cd ../../ # Return to project root

# --- 2. Frontend Setup ---
echo "--- Setting up Frontend (React/TypeScript) ---"
cd frontend

# Install Node dependencies
npm install

cd .. # Return to project root

echo "--- Setup Complete! ---"
echo "To run the project, please open two terminal windows:"
echo "1. Run the Backend: cd backend/eTeacher.Assignment.Api && dotnet run"
echo "2. Run the Frontend: cd frontend && npm run dev"