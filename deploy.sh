#!/bin/bash

# Digital Library - Complete Deployment Script
# This script will set up and run the entire application

set -e  # Exit on any error

echo "🚀 Starting Digital Library Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        print_status "Installing Node.js..."
        
        # Install Node.js (Ubuntu/Debian)
        if command -v apt-get &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        # Install Node.js (CentOS/RHEL)
        elif command -v yum &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs npm
        # Install Node.js (macOS)
        elif command -v brew &> /dev/null; then
            brew install node
        else
            print_error "Please install Node.js manually from https://nodejs.org/"
            exit 1
        fi
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
}

# Check if npm is available
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not available!"
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    npm install
    
    # Install Convex CLI globally if not installed
    if ! command -v convex &> /dev/null; then
        print_status "Installing Convex CLI..."
        npm install -g convex
    fi
    
    print_success "Dependencies installed successfully!"
}

# Setup Convex
setup_convex() {
    print_status "Setting up Convex backend..."
    
    # Check if .env.local exists
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating Convex deployment..."
        npx convex dev --once
    else
        print_status "Found existing .env.local, using existing Convex deployment"
    fi
    
    print_success "Convex setup completed!"
}

# Build the project
build_project() {
    print_status "Building the project..."
    npm run build
    print_success "Project built successfully!"
}

# Start the development server
start_dev_server() {
    print_status "Starting development servers..."
    print_warning "This will start both frontend and backend servers"
    print_warning "Frontend will be available at: http://localhost:5173"
    print_warning "Press Ctrl+C to stop the servers"
    
    # Start both frontend and backend
    npm run dev
}

# Start production server (if needed)
start_production() {
    print_status "Starting production server..."
    
    # Install a simple HTTP server if not available
    if ! command -v serve &> /dev/null; then
        npm install -g serve
    fi
    
    # Build and serve
    npm run build
    serve -s dist -l 3000
}

# Main deployment function
main() {
    print_status "Digital Library Deployment Started"
    print_status "=================================="
    
    # Check system requirements
    check_node
    check_npm
    
    # Install dependencies
    install_dependencies
    
    # Setup Convex
    setup_convex
    
    # Ask user for deployment type
    echo ""
    print_status "Choose deployment type:"
    echo "1) Development (with hot reload)"
    echo "2) Production (optimized build)"
    echo "3) Build only (no server start)"
    
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            print_status "Starting development environment..."
            start_dev_server
            ;;
        2)
            print_status "Starting production environment..."
            start_production
            ;;
        3)
            print_status "Building project only..."
            build_project
            print_success "Build completed! You can find the built files in the 'dist' directory."
            ;;
        *)
            print_warning "Invalid choice. Starting development environment by default..."
            start_dev_server
            ;;
    esac
}

# Cleanup function
cleanup() {
    print_warning "Shutting down servers..."
    # Kill any running processes
    pkill -f "vite" 2>/dev/null || true
    pkill -f "convex" 2>/dev/null || true
    print_success "Cleanup completed!"
}

# Set up signal handlers
trap cleanup EXIT INT TERM

# Run main function
main "$@"
