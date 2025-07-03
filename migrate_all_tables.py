#!/usr/bin/env python3
import json
import requests
import time

# Configuration
SOURCE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0"
TARGET_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTk5MzM2MCwiZXhwIjo0OTA1NjY2OTYwLCJyb2xlIjoiYW5vbiJ9.Hm4qwoXVtNU7PSixG_rgYDPUrCkwegvleFnXjJX7I7Y"
SOURCE_URL = "https://psryoyugyimibjhwhvlh.supabase.co/rest/v1"
TARGET_URL = "https://services-supabase.clubcreole.fr/rest/v1"

# Tables to migrate (excluding already migrated and system tables)
TABLES_TO_MIGRATE = [
    "activity_images",
    "activity_inclusions", 
    "activity_levels",
    "activity_reservations",
    "bons_plans",
    "car_client_reviews",
    "car_models",
    "car_rental_features",
    "car_rental_reservations",
    "concerts",
    "diving_reservations",
    "fleet_managers",
    "loisirs",
    "loisirs_inscriptions",
    "newsletter_subscriptions",
    "offers",
    "partners",
    "purchases",
    "reservations",
    "restaurants",
    "restaurants_managers",
    "subscribers",
    "travel_offers",
    "user_consumption",
    "voyance_consultations"
]

def get_source_data(table_name):
    """Get data from source database for a specific table"""
    headers = {
        'apikey': SOURCE_API_KEY,
        'Authorization': f'Bearer {SOURCE_API_KEY}'
    }
    
    try:
        response = requests.get(f"{SOURCE_URL}/{table_name}", headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching {table_name}: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"Exception fetching {table_name}: {e}")
        return []

def check_target_table_exists(table_name):
    """Check if table exists in target database"""
    headers = {
        'apikey': TARGET_API_KEY,
        'Authorization': f'Bearer {TARGET_API_KEY}'
    }
    
    try:
        response = requests.get(f"{TARGET_URL}/{table_name}?limit=1", headers=headers)
        return response.status_code != 404
    except:
        return False

def insert_table_data(table_name, data_list):
    """Insert data into target database table"""
    if not data_list:
        print(f"No data to insert for {table_name}")
        return 0, 0
        
    headers = {
        'apikey': TARGET_API_KEY,
        'Authorization': f'Bearer {TARGET_API_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    success_count = 0
    error_count = 0
    
    for item in data_list:
        try:
            # Clean up data - remove partner_id if null for some tables
            clean_data = item.copy()
            if clean_data.get('partner_id') is None and 'partner_id' in clean_data:
                del clean_data['partner_id']
            
            response = requests.post(f"{TARGET_URL}/{table_name}", headers=headers, json=clean_data)
            
            if response.status_code in [200, 201]:
                success_count += 1
            else:
                print(f"✗ Error inserting in {table_name}: {response.status_code} - {response.text}")
                error_count += 1
                
        except Exception as e:
            print(f"Exception inserting in {table_name}: {e}")
            error_count += 1
        
        # Small delay to avoid rate limiting
        time.sleep(0.1)
    
    return success_count, error_count

def migrate_table(table_name):
    """Migrate a single table"""
    print(f"\n--- Migrating table: {table_name} ---")
    
    # Check if target table exists
    if not check_target_table_exists(table_name):
        print(f"⚠️ Table {table_name} does not exist in target database")
        return 0, 0, 0
    
    # Get source data
    source_data = get_source_data(table_name)
    total_records = len(source_data)
    
    if total_records == 0:
        print(f"📭 No data found in {table_name}")
        return total_records, 0, 0
    
    print(f"📊 Found {total_records} records to migrate")
    
    # Insert data
    success_count, error_count = insert_table_data(table_name, source_data)
    
    print(f"✓ Success: {success_count}")
    print(f"✗ Errors: {error_count}")
    
    return total_records, success_count, error_count

def main():
    print("🚀 Starting migration of all remaining tables...")
    print(f"📋 Tables to migrate: {len(TABLES_TO_MIGRATE)}")
    
    total_tables = 0
    total_records = 0
    total_success = 0
    total_errors = 0
    skipped_tables = []
    
    for table_name in TABLES_TO_MIGRATE:
        try:
            records, success, errors = migrate_table(table_name)
            total_tables += 1
            total_records += records
            total_success += success
            total_errors += errors
            
            if records == 0 and success == 0 and errors == 0:
                skipped_tables.append(table_name)
                
        except Exception as e:
            print(f"💥 Failed to migrate {table_name}: {e}")
            total_errors += 1
    
    print("\n" + "="*50)
    print("📈 MIGRATION SUMMARY")
    print("="*50)
    print(f"📊 Tables processed: {total_tables}")
    print(f"📋 Total records found: {total_records}")
    print(f"✅ Successfully migrated: {total_success}")
    print(f"❌ Errors: {total_errors}")
    print(f"⚠️ Skipped tables: {len(skipped_tables)}")
    
    if skipped_tables:
        print(f"\n📝 Skipped tables: {', '.join(skipped_tables)}")
    
    success_rate = (total_success / total_records * 100) if total_records > 0 else 0
    print(f"\n📊 Success rate: {success_rate:.1f}%")

if __name__ == "__main__":
    main()