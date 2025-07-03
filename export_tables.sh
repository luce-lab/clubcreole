#!/bin/bash

# Configuration
API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0"
BASE_URL="https://psryoyugyimibjhwhvlh.supabase.co/rest/v1"

# Tables to export
TABLES=(
    "voyance_reviews"
    "promotions"
    "activity_time_slots"
    "voyance_medium_advantages"
    "nightlife_events"
    "partners_id_mapping"
    "subscriptions"
    "travel_reservations"
    "voyance_mediums"
    "restaurant_reservations"
    "restaurant_menus"
    "restaurant_dishes"
    "restaurant_categories"
    "business_partners"
    "profiles"
    "leisure_activities"
    "leisure_registrations"
    "leisure_invitations"
    "leisure_time_slots"
    "leisure_reservation_details"
)

# Initialize dump file
echo "-- Dump SQL for Supabase Database
-- Generated on $(date)
" > dump.sql

# Export each table
for table in "${TABLES[@]}"; do
    echo "Exporting table: $table"
    echo "
-- Table: $table
" >> dump.sql
    
    # Get data from table
    curl -s -H "apikey: $API_KEY" -H "Authorization: Bearer $API_KEY" "$BASE_URL/$table" > "${table}.json"
    
    # Convert JSON to SQL INSERT statements
    if [ -s "${table}.json" ]; then
        echo "Processing $table data..."
        python3 -c "
import json
import sys

try:
    with open('${table}.json', 'r') as f:
        data = json.load(f)
    
    if data:
        for row in data:
            columns = ', '.join(row.keys())
            values = []
            for value in row.values():
                if value is None:
                    values.append('NULL')
                elif isinstance(value, str):
                    # Escape single quotes in strings
                    escaped = value.replace(\"'\", \"''\")
                    values.append(f\"'{escaped}'\")
                elif isinstance(value, bool):
                    values.append('TRUE' if value else 'FALSE')
                elif isinstance(value, (dict, list)):
                    # Convert JSON objects/arrays to strings
                    escaped = json.dumps(value).replace(\"'\", \"''\")
                    values.append(f\"'{escaped}'\")
                else:
                    values.append(str(value))
            
            values_str = ', '.join(values)
            print(f\"INSERT INTO ${table} ({columns}) VALUES ({values_str});\")
    
except Exception as e:
    print(f\"-- Error processing ${table}: {e}\", file=sys.stderr)
" >> dump.sql
    fi
    
    # Clean up temporary file
    rm -f "${table}.json"
done

echo "Export completed. Check dump.sql file."