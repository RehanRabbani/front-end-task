#!/bin/bash

# Safepay Students Management Application - Automated Startup Script
# This script starts both the Python backend and React frontend servers

set -e  # Exit on any error

echo "🚀 Starting Safepay Students Management Application..."
echo "=================================================="

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "run_server" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Please run this script from the safepay-frontend-interview-task directory${NC}"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command_exists python3; then
    echo -e "${RED}❌ Python 3 is required but not installed.${NC}"
    echo -e "${YELLOW}Please install Python 3 and try again.${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    echo -e "${YELLOW}Please install Node.js and try again.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is required but not installed.${NC}"
    echo -e "${YELLOW}Please install npm and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are installed${NC}"

# Check if ports are available
if port_in_use 5000; then
    echo -e "${YELLOW}⚠️  Port 5000 is already in use. Attempting to stop existing process...${NC}"
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

if port_in_use 3000; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use. Attempting to stop existing process...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

# Make run_server executable
chmod +x run_server

# Start backend server
echo -e "${BLUE}� Starting Python backend server on port 5000...${NC}"
./run_server &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Backend server failed to start${NC}"
    exit 1
fi

# Verify backend is responding
if ! port_in_use 5000; then
    echo -e "${RED}❌ Backend server not listening on port 5000${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

echo -e "${GREEN}✅ Backend server started successfully${NC}"

# Start frontend server
echo -e "${BLUE}⚛️  Starting React frontend development server...${NC}"
cd frontend

npm run dev &
FRONTEND_PID=$!

cd ..

# Wait for frontend to start
echo -e "${YELLOW}⏳ Waiting for frontend server to start...${NC}"
sleep 5

echo ""
echo -e "${GREEN}🎉 Application started successfully!${NC}"
echo "=================================================="
echo -e "${GREEN}Frontend: ${NC}http://localhost:3000"
echo -e "${GREEN}Backend:  ${NC}http://localhost:5000"
echo ""
echo -e "${BLUE}📚 API Endpoints:${NC}"
echo "  • GET    /api/students     - Get all students"
echo "  • POST   /api/students     - Create new student"
echo "  • GET    /api/student/:id  - Get student by ID"
echo "  • PUT    /api/student/:id  - Update student"
echo "  • DELETE /api/student/:id  - Delete student"
echo ""
echo -e "${BLUE}🎯 Pages:${NC}"
echo "  • Students Grid: http://localhost:3000/students"
echo "  • Student Lookup: http://localhost:3000/lookup"
echo ""
echo -e "${YELLOW}💡 Features:${NC}"
echo "  • Frontend hot-reloads automatically on file changes"
echo "  • Redux state management with persistent lookup"
echo "  • Styled Components with Safepay branding"
echo "  • Full CRUD operations with sorting and filtering"
echo ""
echo -e "${BLUE}🛑 To stop the application:${NC}"
echo "  Press Ctrl+C"
echo ""
echo -e "${BLUE}Application is running. Press Ctrl+C to stop.${NC}"

# Wait for processes to complete
wait $BACKEND_PID $FRONTEND_PID