#!/bin/bash

# Ocean Treasury - Steel Discharge Optimization Dashboard
# Startup script for development environment

echo "🚢 Starting Ocean Treasury Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Setup backend
echo "🐍 Setting up Python backend..."
cd backend

# Activate conda environment
echo "Activating conda environment..."
conda activate ocean-treasury

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Go back to root directory
cd ..

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "1. Start the backend API:"
echo "   cd backend && conda activate ocean-treasury && python main.py"
echo ""
echo "2. Start the frontend (in a new terminal):"
echo "   npm start"
echo ""
echo "📊 Access the dashboard at: http://localhost:3000"
echo "🔧 API documentation at: http://localhost:8000/docs"
echo ""
echo "Happy shipping! 🚢"
