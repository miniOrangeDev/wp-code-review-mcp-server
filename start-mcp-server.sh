#!/bin/bash

# WordPress Code Review MCP Server Startup Script v2.0

# Configuration via environment variables
GUIDELINES_URL=${GUIDELINES_URL:-"https://yourdomain.com/guidelines"}
GUIDELINES_SOURCE_TYPE=${GUIDELINES_SOURCE_TYPE:-"url"}

echo "🔧 Configuration:"
echo "   Guidelines URL: $GUIDELINES_URL"
echo "   Source Type: $GUIDELINES_SOURCE_TYPE"
echo ""

# Ensure dependencies are installed
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️  Building project..."
npm run build

# Start the MCP server with configuration
echo "🚀 Starting WordPress Code Review MCP Server v2.0..."
echo "   Configure via GUIDELINES_URL environment variable"
echo ""

# Start with environment variables
GUIDELINES_URL="$GUIDELINES_URL" GUIDELINES_SOURCE_TYPE="$GUIDELINES_SOURCE_TYPE" node build/index.js 