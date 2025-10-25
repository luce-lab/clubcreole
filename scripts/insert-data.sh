#!/bin/bash

# Import data to Supabase using curl

SUPABASE_URL="https://psryoyugyimibjhwhvlh.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0"

echo "Insertion de La Colline Verte dans la base de données..."

# Create JSON data
DATA='{
  "name": "La Colline Verte",
  "type": "Bungalow",
  "location": "Entre Saint-Rose et Deshaies, Guadeloupe",
  "price": 150,
  "rating": 4.5,
  "image": "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/yd8sip3z59369xzcdbhs.jpg",
  "gallery_images": [
    "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/ldzumam8avliwudcthsp.jpg",
    "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739352769/vjkklrjmrd8qguklogwq.jpg"
  ],
  "features": [
    "Bungalows créoles",
    "Vue sur la mer des Caraïbes",
    "Piscine",
    "Jardin tropical"
  ],
  "description": "Situé entre St-Rose et Deshaies, La Colline Verte propose des bungalows créoles dans un jardin tropical avec piscine et vue sur la mer des Caraïbes. Les gîtes peuvent accueillir de 2 à 8 personnes et disposent d'"'"'une terrasse privée et d'"'"'une cuisine équipée. Proche des plages de La Perle et Fort Royal.",
  "rooms": 1,
  "bathrooms": 1,
  "max_guests": 8,
  "amenities": [
    {"name": "Wi-Fi", "available": true},
    {"name": "Piscine", "available": true},
    {"name": "Parking gratuit", "available": true},
    {"name": "Climatisation", "available": true},
    {"name": "Cuisine équipée", "available": true},
    {"name": "Télévision", "available": true},
    {"name": "Barbecue", "available": true}
  ],
  "rules": [
    "Animaux non admis (à confirmer)",
    "Non fumeur (à confirmer)"
  ],
  "weight": 1
}'

# Insert data using curl
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "${SUPABASE_URL}/rest/v1/accommodations" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d "${DATA}")

# Extract HTTP status code (last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
# Extract response body (all lines except last)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Code HTTP: $HTTP_CODE"

if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
  echo "✓ Données insérées avec succès !"
  echo "Résultat: $BODY"
else
  echo "✗ Erreur lors de l'insertion"
  echo "Réponse: $BODY"
  exit 1
fi
