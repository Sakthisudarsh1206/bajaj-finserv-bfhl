#!/bin/bash

# Bajaj Finserv BFHL API Smoke Test
# Usage: BASE_URL=https://your-app.vercel.app ./scripts/smoke.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default base URL
BASE_URL=${BASE_URL:-"http://localhost:3000"}
ENDPOINT="$BASE_URL/bfhl"

echo -e "${YELLOW}🚀 Running BFHL API Smoke Tests${NC}"
echo -e "${YELLOW}Target: $ENDPOINT${NC}"
echo ""

# Function to run test and check result
run_test() {
    local name="$1"
    local payload="$2"
    local expected_key="$3"
    local expected_value="$4"
    
    echo -e "${YELLOW}Testing: $name${NC}"
    
    response=$(curl -s -X POST "$ENDPOINT" \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}❌ Failed to connect to $ENDPOINT${NC}"
        exit 1
    fi
    
    # Check if response contains expected key-value
    if echo "$response" | grep -q "\"$expected_key\""; then
        if echo "$response" | grep -q "$expected_value"; then
            echo -e "${GREEN}✅ PASS${NC}"
        else
            echo -e "${RED}❌ FAIL - Expected value not found${NC}"
            echo "Response: $response"
            exit 1
        fi
    else
        echo -e "${RED}❌ FAIL - Expected key not found${NC}"
        echo "Response: $response"
        exit 1
    fi
    echo ""
}

# Test 1: Example A
run_test "Example A" \
    '{"data":["a","1","334","4","R","$"]}' \
    "concat_string" \
    '"Ra"'

# Test 2: Example B  
run_test "Example B" \
    '{"data":["2","a","y","4","&","-","*","5","92","b"]}' \
    "sum" \
    '"103"'

# Test 3: Example C
run_test "Example C" \
    '{"data":["A","ABcD","DOE"]}' \
    "concat_string" \
    '"EoDdCbAa"'

# Test 4: Invalid payload
echo -e "${YELLOW}Testing: Invalid payload${NC}"
response=$(curl -s -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    -d '{"invalid":"payload"}')

if echo "$response" | grep -q '"is_success":false'; then
    echo -e "${GREEN}✅ PASS - Invalid payload handled correctly${NC}"
else
    echo -e "${RED}❌ FAIL - Invalid payload not handled${NC}"
    echo "Response: $response"
    exit 1
fi
echo ""

# Test 5: Method not allowed
echo -e "${YELLOW}Testing: GET method (should fail)${NC}"
status_code=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$ENDPOINT")

if [[ "$status_code" == "405" ]]; then
    echo -e "${GREEN}✅ PASS - GET method rejected with 405${NC}"
else
    echo -e "${RED}❌ FAIL - Expected 405 but got $status_code${NC}"
    exit 1
fi
echo ""

# Test 6: Check CORS headers
echo -e "${YELLOW}Testing: CORS headers${NC}"
cors_header=$(curl -s -I -X OPTIONS "$ENDPOINT" | grep -i "access-control-allow-origin" | head -1)

if [[ -n "$cors_header" ]]; then
    echo -e "${GREEN}✅ PASS - CORS headers present${NC}"
else
    echo -e "${RED}❌ FAIL - CORS headers missing${NC}"
    exit 1
fi
echo ""

echo -e "${GREEN}🎉 All smoke tests passed!${NC}"
echo -e "${GREEN}API is working correctly at: $ENDPOINT${NC}"
