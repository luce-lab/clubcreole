#!/bin/bash

# Configuration for target database
TARGET_API_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTk5MzM2MCwiZXhwIjo0OTA1NjY2OTYwLCJyb2xlIjoiYW5vbiJ9.Hm4qwoXVtNU7PSixG_rgYDPUrCkwegvleFnXjJX7I7Y"
TARGET_BASE_URL="https://services-supabase.clubcreole.fr/rest/v1"

# Function to import data for a specific table
import_table_data() {
    local table_name=$1
    local json_file="${table_name}_data.json"
    
    echo "Importing data for table: $table_name"
    
    # Check if we have data for this table in our dump
    if grep -q -- "-- Table: $table_name" dump.sql; then
        # Extract INSERT statements for this table and convert to JSON format
        grep "INSERT INTO $table_name" dump.sql > "${table_name}_inserts.sql"
        
        if [ -s "${table_name}_inserts.sql" ]; then
            echo "Processing $table_name..."
            # Convert SQL INSERT to JSON and send to API
            python3 -c "
import re
import json
import requests

# Read INSERT statements
with open('${table_name}_inserts.sql', 'r') as f:
    inserts = f.readlines()

headers = {
    'apikey': '$TARGET_API_KEY',
    'Authorization': 'Bearer $TARGET_API_KEY',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

for insert in inserts:
    insert = insert.strip()
    if not insert:
        continue
    
    try:
        # Extract column names and values using regex
        pattern = r'INSERT INTO $table_name \(([^)]+)\) VALUES \(([^)]+)\);'
        match = re.match(pattern, insert)
        
        if match:
            columns = [col.strip() for col in match.group(1).split(',')]
            values_str = match.group(2)
            
            # Parse values (basic parsing, may need refinement)
            values = []
            current_value = ''
            in_quotes = False
            quote_char = None
            
            i = 0
            while i < len(values_str):
                char = values_str[i]
                
                if not in_quotes:
                    if char in [\"'\", '\"']:
                        in_quotes = True
                        quote_char = char
                        current_value += char
                    elif char == ',' and not in_quotes:
                        values.append(current_value.strip())
                        current_value = ''
                    else:
                        current_value += char
                else:
                    current_value += char
                    if char == quote_char:
                        # Check if it's escaped
                        if i + 1 < len(values_str) and values_str[i + 1] == quote_char:
                            current_value += values_str[i + 1]
                            i += 1
                        else:
                            in_quotes = False
                            quote_char = None
                
                i += 1
            
            # Add the last value
            if current_value.strip():
                values.append(current_value.strip())
            
            # Create JSON object
            row_data = {}
            for i, col in enumerate(columns):
                if i < len(values):
                    value = values[i].strip()
                    
                    # Convert SQL values to appropriate types
                    if value == 'NULL':
                        row_data[col] = None
                    elif value == 'TRUE':
                        row_data[col] = True
                    elif value == 'FALSE':
                        row_data[col] = False
                    elif value.startswith(\"'\") and value.endswith(\"'\"):
                        # String value - remove quotes and unescape
                        string_val = value[1:-1].replace(\"''\", \"'\")
                        row_data[col] = string_val
                    elif value.replace('.', '').replace('-', '').isdigit():
                        # Numeric value
                        if '.' in value:
                            row_data[col] = float(value)
                        else:
                            row_data[col] = int(value)
                    else:
                        # Default to string
                        row_data[col] = value
            
            # Send POST request
            response = requests.post(
                '$TARGET_BASE_URL/$table_name',
                headers=headers,
                json=row_data
            )
            
            if response.status_code in [200, 201]:
                print(f'✓ Inserted row in $table_name')
            else:
                print(f'✗ Error inserting in $table_name: {response.status_code} - {response.text}')
                
    except Exception as e:
        print(f'Error processing insert for $table_name: {e}')
        continue
"
        else
            echo "No data found for $table_name"
        fi
        
        # Clean up temporary file
        rm -f "${table_name}_inserts.sql"
    else
        echo "Table $table_name not found in dump"
    fi
}

# List of tables to import (matching the exported tables)
TABLES=(
    "voyance_reviews"
    "promotions"
    "activity_time_slots"
    "nightlife_events"
    "partners_id_mapping"
    "travel_reservations"
    "voyance_mediums"
    "restaurant_reservations"
    "profiles"
    "leisure_activities"
)

echo "Starting data import to target database..."

# Import each table
for table in "${TABLES[@]}"; do
    echo "----------------------------------------"
    import_table_data "$table"
    sleep 1  # Small delay between requests
done

echo "----------------------------------------"
echo "Import process completed!"