#!/usr/bin/env python3
import json
import requests

# Configuration
SOURCE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0"
TARGET_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTk5MzM2MCwiZXhwIjo0OTA1NjY2OTYwLCJyb2xlIjoiYW5vbiJ9.Hm4qwoXVtNU7PSixG_rgYDPUrCkwegvleFnXjJX7I7Y"
SOURCE_URL = "https://psryoyugyimibjhwhvlh.supabase.co/rest/v1"
TARGET_URL = "https://services-supabase.clubcreole.fr/rest/v1"

def get_source_data():
    """Get accommodations data from source database"""
    headers = {
        'apikey': SOURCE_API_KEY,
        'Authorization': f'Bearer {SOURCE_API_KEY}'
    }
    
    response = requests.get(f"{SOURCE_URL}/accommodations", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching source data: {response.status_code} - {response.text}")
        return []

def insert_accommodation(data):
    """Insert accommodation data into target database"""
    headers = {
        'apikey': TARGET_API_KEY,
        'Authorization': f'Bearer {TARGET_API_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    # Clean up data - remove partner_id if null to avoid foreign key issues
    clean_data = data.copy()
    if clean_data.get('partner_id') is None:
        del clean_data['partner_id']
    
    response = requests.post(f"{TARGET_URL}/accommodations", headers=headers, json=clean_data)
    
    if response.status_code in [200, 201]:
        print(f"✓ Inserted accommodation: {data['name']}")
        return True
    else:
        print(f"✗ Error inserting {data['name']}: {response.status_code} - {response.text}")
        return False

def main():
    print("Starting accommodations migration...")
    
    # Get source data
    accommodations = get_source_data()
    print(f"Found {len(accommodations)} accommodations to migrate")
    
    if not accommodations:
        print("No data to migrate")
        return
    
    # Insert each accommodation
    success_count = 0
    error_count = 0
    
    for accommodation in accommodations:
        try:
            if insert_accommodation(accommodation):
                success_count += 1
            else:
                error_count += 1
        except Exception as e:
            print(f"Exception inserting {accommodation.get('name', 'Unknown')}: {e}")
            error_count += 1
    
    print(f"\nMigration completed!")
    print(f"✓ Successfully migrated: {success_count}")
    print(f"✗ Errors: {error_count}")
    print(f"Total: {len(accommodations)}")

if __name__ == "__main__":
    main()