#!/bin/bash

# Jam Frontend Development Server Runner
# This script starts both the development server and Storybook, then opens them in the browser

set -e

echo "🚀 Starting Jam Frontend development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the React project root.${NC}"
    exit 1
fi

# Function to check if a port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port is in use
    else
        return 0  # Port is available
    fi
}

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}⏳ Waiting for $name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ $name is ready!${NC}"
            return 0
        fi
        
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $name failed to start within expected time${NC}"
    return 1
}

# Check if ports are available
if ! check_port 5173; then
    echo -e "${YELLOW}⚠️  Port 5173 is already in use. The dev server might already be running.${NC}"
fi

if ! check_port 6006; then
    echo -e "${YELLOW}⚠️  Port 6006 is already in use. Storybook might already be running.${NC}"
fi

echo -e "${YELLOW}🏃‍♂️ Starting development server...${NC}"
# Start the development server in the background
npm run dev &
DEV_PID=$!

echo -e "${YELLOW}📚 Starting Storybook...${NC}"
# Start Storybook in the background
npm run storybook &
STORYBOOK_PID=$!

# Function to cleanup processes on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    kill $DEV_PID 2>/dev/null || true
    kill $STORYBOOK_PID 2>/dev/null || true
    
    echo -e "${YELLOW}🐳 Stopping Docker containers...${NC}"
    cd docker/regtest
    docker-compose down
    cd ../..
    
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Wait for services to be ready
wait_for_service "http://localhost:5173" "Development Server"
wait_for_service "http://localhost:6006" "Storybook"

# Open browsers (works on macOS)
echo -e "${GREEN}🌐 Opening browsers...${NC}"
echo -e "${GREEN}🚀 Opening Development Server...${NC}"
open "http://localhost:5173"

echo -e "${GREEN}🎉 Development environment is ready!${NC}"
echo
echo "Available services:"
echo "  🚀 Development Server: http://localhost:5173"
echo "  📚 Storybook: http://localhost:6006"
echo
echo "  🌐 Joinmarket API: https://localhost:28183"
echo "  🔍 Bitcoin Explorer: http://localhost:3002"
echo "  📊 Bitcoin RPC: http://localhost:17782"
echo
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"

# Keep the script running and wait for processes
wait $DEV_PID $STORYBOOK_PID
