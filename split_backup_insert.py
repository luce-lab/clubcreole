#!/usr/bin/env python3
"""
Script pour découper backup_insert.sql en plusieurs fichiers par table
"""
import re
from collections import defaultdict

def split_sql_file(input_file, output_dir='sql_import'):
    """Découpe le fichier SQL en fichiers séparés par table"""

    # Créer le répertoire de sortie
    import os
    os.makedirs(output_dir, exist_ok=True)

    # Dictionnaire pour stocker les INSERT par table
    tables = defaultdict(list)
    current_table = None
    current_statement = []

    # Patterns pour détecter les tables
    insert_pattern = re.compile(r'INSERT INTO ([^\s(]+)\s*\((.*?)\) VALUES')

    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            # Détecter un nouveau INSERT
            if line.strip().startswith('INSERT INTO'):
                # Sauvegarder l'instruction précédente si elle existe
                if current_table and current_statement:
                    tables[current_table].extend(current_statement)
                    current_statement = []

                # Extraire le nom de la table
                match = insert_pattern.match(line.strip())
                if match:
                    current_table = match.group(1)
                    # Nettoyer le nom de la table (enlever le schéma si présent)
                    if '.' in current_table:
                        current_table = current_table.split('.')[-1]

            # Accumuler les lignes de l'instruction INSERT
            if current_table:
                current_statement.append(line)

                # Vérifier si l'instruction est complète
                if line.strip().endswith(';'):
                    tables[current_table].extend(current_statement)
                    current_statement = []
                    current_table = None

    # Écrire les fichiers par table
    for table, lines in tables.items():
        if lines:
            # Nom de fichier sécurisé
            safe_name = table.replace('.', '_').replace('-', '_')
            output_file = f'{output_dir}/{safe_name}.sql'

            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"-- Import data for table: {table}\n")
                f.write(f"-- Generated from backup_insert.sql\n\n")
                f.writelines(lines)

            print(f"✓ Created: {output_file} ({len(lines)} lines)")

    # Créer un fichier d'import principal
    create_master_import_script(output_dir)

    print(f"\n✓ Split complete! Files created in '{output_dir}/' directory")

def create_master_import_script(output_dir):
    """Crée un script maître pour importer tous les fichiers"""

    import os

    # Lister tous les fichiers SQL
    sql_files = sorted([f for f in os.listdir(output_dir) if f.endswith('.sql')])

    # Créer le script maître
    with open(f'{output_dir}/import_all.sh', 'w') as f:
        f.write('#!/bin/bash\n')
        f.write('# Script pour importer toutes les données\n\n')
        f.write('DB_HOST="${DB_HOST:-localhost}"\n')
        f.write('DB_PORT="${DB_PORT:-5432}"\n')
        f.write('DB_NAME="${DB_NAME:-clubcreole_db}"\n')
        f.write('DB_USER="${DB_USER:-postgres}"\n\n')

        for sql_file in sql_files:
            table_name = sql_file.replace('.sql', '').replace('_', '.')
            f.write(f'echo "Importing {sql_file}..."\n')
            f.write(f'psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f {output_dir}/{sql_file}\n\n')

        f.write('echo "All imports completed!"\n')

    print(f"✓ Created: {output_dir}/import_all.sh")

    # Créer un README
    with open(f'{output_dir}/README.md', 'w') as f:
        f.write('# SQL Import Files\n\n')
        f.write('This directory contains split SQL files from backup_insert.sql\n\n')
        f.write('## Files:\n\n')
        for sql_file in sql_files:
            f.write(f'- `{sql_file}`\n')
        f.write('\n## Usage:\n\n')
        f.write('### Import all files:\n')
        f.write('```bash\n')
        f.write('chmod +x import_all.sh\n')
        f.write('./import_all.sh\n')
        f.write('```\n\n')
        f.write('### Import single file:\n')
        f.write('```bash\n')
        f.write('psql -h localhost -U postgres -d clubcreole_db -f schema_migrations.sql\n')
        f.write('```\n\n')

    print(f"✓ Created: {output_dir}/README.md")

if __name__ == '__main__':
    import sys
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'backup_insert.sql'

    if len(sys.argv) > 2:
        output_dir = sys.argv[2]

    split_sql_file(input_file)
