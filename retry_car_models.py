#!/usr/bin/env python3
import json
import requests

# Configuration
SOURCE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0"
TARGET_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTk5MzM2MCwiZXhwIjo0OTA1NjY2OTYwLCJyb2xlIjoiYW5vbiJ9.Hm4qwoXVtNU7PSixG_rgYDPUrCkwegvleFnXjJX7I7Y"
SOURCE_URL = "https://psryoyugyimibjhwhvlh.supabase.co/rest/v1"
TARGET_URL = "https://services-supabase.clubcreole.fr/rest/v1"

def get_car_models():
    """Get car_models data from source database"""
    headers = {
        'apikey': SOURCE_API_KEY,
        'Authorization': f'Bearer {SOURCE_API_KEY}'
    }
    
    response = requests.get(f"{SOURCE_URL}/car_models", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching car_models: {response.status_code} - {response.text}")
        return []

def insert_car_model(data):
    """Insert car_model data into target database"""
    headers = {
        'apikey': TARGET_API_KEY,
        'Authorization': f'Bearer {TARGET_API_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    response = requests.post(f"{TARGET_URL}/car_models", headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f"✓ Inserted car_model: {data.get('model', 'Unknown')} (Company ID: {data.get('company_id')})")
        return True
    else:
        print(f"✗ Error inserting {data.get('model', 'Unknown')}: {response.status_code} - {response.text}")
        return False

def main():
    print("🚗 Retrying car_models migration...")
    
    # Get source data
    car_models = get_car_models()
    print(f"Found {len(car_models)} car_models to migrate")
    
    if not car_models:
        print("No data to migrate")
        return
    
    # Insert each car_model
    success_count = 0
    error_count = 0
    
    for car_model in car_models:
        try:
            if insert_car_model(car_model):
                success_count += 1
            else:
                error_count += 1
        except Exception as e:
            print(f"Exception inserting {car_model.get('model', 'Unknown')}: {e}")
            error_count += 1
    
    print(f"\n🏁 Car models migration completed!")
    print(f"✓ Successfully migrated: {success_count}")
    print(f"✗ Errors: {error_count}")
    print(f"📊 Success rate: {success_count/len(car_models)*100:.1f}%")

if __name__ == "__main__":
    main()