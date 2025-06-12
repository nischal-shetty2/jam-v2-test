#!/bin/bash

# Jam Frontend Setup Script
# This script sets up the development environment for Jam frontend with Joinmarket integration

set -e

echo "🚀 Setting up Jam Frontend with Joinmarket integration..."

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

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Node.js dependencies...${NC}"
npm install

echo -e "${YELLOW}🐳 Setting up Docker regtest environment...${NC}"

# Navigate to docker directory
cd docker/regtest

# Check if .env file exists, create from example if not
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}Please update the .env file with the generated onion address after running prepare-setup.sh${NC}"
    else
        echo -e "${YELLOW}Creating basic .env file...${NC}"
        echo "JM_DIRECTORY_NODES=replaceme" > .env
    fi
fi

# Prepare the setup (this generates onion addresses)
echo -e "${YELLOW}🔧 Preparing regtest setup...${NC}"
./prepare-setup.sh

# Start the Docker containers
echo -e "${YELLOW}🏃‍♂️ Starting Joinmarket regtest containers...${NC}"
docker-compose up -d

echo -e "${YELLOW}⏳ Waiting for containers to be ready...${NC}"
sleep 10

# Initialize the setup
echo -e "${YELLOW}🎯 Initializing regtest setup and creating default wallet...${NC}"
./init-setup.sh

echo -e "${GREEN}✅ Setup complete!${NC}"
echo
echo -e "${GREEN}🎉 Your Joinmarket regtest environment is now running!${NC}"
echo
echo "Default wallet created:"
echo "  📁 Wallet name: Satoshi.jmdat"
echo "  🔑 Password: test"
echo
echo "Available services:"
echo "  🌐 Joinmarket API: https://localhost:28183"
echo "  🔍 Bitcoin Explorer: http://localhost:3002"
echo "  📊 Bitcoin RPC: http://localhost:17782"
echo -e "${YELLOW}Note: The first time you log in, use:${NC}"
echo -e "${YELLOW}  Wallet: Satoshi.jmdat${NC}"
echo -e "${YELLOW}  Password: test${NC}"
echo
echo -e "${GREEN}🚀 Starting development environment...${NC}"
cd ../../
./run.sh