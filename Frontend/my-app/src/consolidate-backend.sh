#!/bin/bash

# ============================================
# Bloomify Backend Consolidation Script
# ============================================
# This script copies remaining files from /server/ to /bloomify-backend/

echo "🌿 Bloomify Backend Consolidation Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the project root
if [ ! -d "server" ] || [ ! -d "bloomify-backend" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    echo "   Current directory: $(pwd)"
    exit 1
fi

echo -e "${BLUE}📁 Starting file consolidation...${NC}"
echo ""

# Create directories if they don't exist
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p bloomify-backend/routes
mkdir -p bloomify-backend/services

# Function to copy file with verification
copy_file() {
    local source=$1
    local dest=$2
    
    if [ -f "$source" ]; then
        cp "$source" "$dest"
        if [ -f "$dest" ]; then
            echo -e "${GREEN}✅ Copied: $source → $dest${NC}"
            return 0
        else
            echo -e "${RED}❌ Failed: $source${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  Skipped (not found): $source${NC}"
        return 2
    fi
}

# Copy route files
echo -e "\n${BLUE}📋 Copying route files...${NC}"
copy_file "server/routes/users.js" "bloomify-backend/routes/users.js"
copy_file "server/routes/plants.js" "bloomify-backend/routes/plants.js"
copy_file "server/routes/garden.js" "bloomify-backend/routes/garden.js"
copy_file "server/routes/tasks.js" "bloomify-backend/routes/tasks.js"
copy_file "server/routes/community.js" "bloomify-backend/routes/community.js"
copy_file "server/routes/marketplace.js" "bloomify-backend/routes/marketplace.js"
copy_file "server/routes/weather.js" "bloomify-backend/routes/weather.js"
copy_file "server/routes/ai.js" "bloomify-backend/routes/ai.js"
copy_file "server/routes/admin.js" "bloomify-backend/routes/admin.js"

# Copy service files
echo -e "\n${BLUE}⚙️  Copying service files...${NC}"
copy_file "server/services/cronService.js" "bloomify-backend/services/cronService.js"
copy_file "server/services/gardenService.js" "bloomify-backend/services/gardenService.js"
copy_file "server/services/socketService.js" "bloomify-backend/services/socketService.js"

# Copy core files
echo -e "\n${BLUE}🔧 Copying core files...${NC}"
copy_file "server/server.js" "bloomify-backend/server.js"
copy_file "server/package.json" "bloomify-backend/package.json"

# Copy documentation files (if they exist and are different)
echo -e "\n${BLUE}📚 Copying documentation files...${NC}"
copy_file "server/API_DOCUMENTATION.md" "bloomify-backend/API_DOCUMENTATION.md"
copy_file "server/BACKEND_MASTER_INDEX.md" "bloomify-backend/BACKEND_MASTER_INDEX.md"

# Summary
echo -e "\n${GREEN}=========================================="
echo "✅ CONSOLIDATION COMPLETE!"
echo "==========================================${NC}"
echo ""

# Count files
ROUTES_COUNT=$(ls -1 bloomify-backend/routes/*.js 2>/dev/null | wc -l)
SERVICES_COUNT=$(ls -1 bloomify-backend/services/*.js 2>/dev/null | wc -l)
MODELS_COUNT=$(ls -1 bloomify-backend/models/*.js 2>/dev/null | wc -l)

echo -e "${BLUE}📊 File Summary:${NC}"
echo "   Routes:   $ROUTES_COUNT/10 files"
echo "   Services: $SERVICES_COUNT/3 files"
echo "   Models:   $MODELS_COUNT/8 files"
echo ""

# Check if server.js exists
if [ -f "bloomify-backend/server.js" ]; then
    echo -e "${GREEN}✅ server.js copied successfully${NC}"
else
    echo -e "${RED}❌ server.js not found${NC}"
fi

# Check if package.json exists
if [ -f "bloomify-backend/package.json" ]; then
    echo -e "${GREEN}✅ package.json copied successfully${NC}"
else
    echo -e "${RED}❌ package.json not found${NC}"
fi

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "   1. cd bloomify-backend"
echo "   2. npm install"
echo "   3. cp .env.example .env"
echo "   4. Edit .env with your credentials"
echo "   5. npm run dev"
echo ""

# Ask if user wants to delete old /server/ directory
echo -e "${YELLOW}⚠️  Do you want to delete the old /server/ directory? (y/N)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${YELLOW}Backing up /server/ to /server.backup...${NC}"
    mv server server.backup
    echo -e "${GREEN}✅ Old /server/ directory moved to /server.backup${NC}"
    echo -e "${BLUE}   You can delete it manually later if everything works${NC}"
else
    echo -e "${BLUE}Old /server/ directory kept. You can delete it manually later.${NC}"
fi

echo ""
echo -e "${GREEN}🎉 All done! Your backend is now consolidated in /bloomify-backend/${NC}"
echo ""
