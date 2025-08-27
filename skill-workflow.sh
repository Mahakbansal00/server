#!/bin/bash

# --- 1️⃣ Login and get JWT token ---
EMAIL="mahakbansal82@gmail.com"
PASSWORD="Naveen@2002"

TOKEN=$(curl -s -X POST http://127.0.0.1:4001/api/auth/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | jq -r '.token')

echo "✅ Logged in. Token:"
echo $TOKEN
echo "-----------------------------------"

# --- 2️⃣ Add a "teaches" skill ---
TEACH_SKILL="Guitar"
curl -s -X POST http://127.0.0.1:4001/api/skills \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d "{\"type\":\"teaches\",\"skill\":\"$TEACH_SKILL\"}" | jq
echo "-----------------------------------"

# --- 3️⃣ Add a "learns" skill ---
LEARN_SKILL="Cooking"
curl -s -X POST http://127.0.0.1:4001/api/skills \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d "{\"type\":\"learns\",\"skill\":\"$LEARN_SKILL\"}" | jq
echo "-----------------------------------"

# --- 4️⃣ Fetch all skills ---
echo "Current skills:"
curl -s -X GET http://127.0.0.1:4001/api/skills/me \
-H "Authorization: Bearer $TOKEN" | jq
echo "-----------------------------------"

# --- 5️⃣ Remove the first "teaches" skill (index 0) ---
echo "Removing first teaches skill..."
curl -s -X DELETE http://127.0.0.1:4001/api/skills/0 \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{"type":"teaches"}' | jq
echo "-----------------------------------"

# --- 6️⃣ Fetch updated skills ---
echo "Updated skills:"
curl -s -X GET http://127.0.0.1:4001/api/skills/me \
-H "Authorization: Bearer $TOKEN" | jq
echo "-----------------------------------"

