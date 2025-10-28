#!/usr/bin/env python3
import paramiko
import sys
import os

# Configuration
hostname = "37.59.121.40"
username = "ubuntu"
password = "Catilo"
local_path = "supabase_dump_20251028_164145.sql"
remote_path = "/home/ubuntu/supabase_dump_20251028_164145.sql"

# Vérifier si le fichier existe
if not os.path.exists(local_path):
    print(f"Erreur: Le fichier {local_path} n'existe pas")
    sys.exit(1)

try:
    # Créer le client SSH
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    # Connexion
    print(f"Connexion à {hostname}...")
    ssh.connect(hostname, username=username, password=password)
    
    # Créer SFTP client
    sftp = ssh.open_sftp()
    
    # Transférer le fichier
    print(f"Transfert de {local_path} vers {remote_path}...")
    sftp.put(local_path, remote_path)
    
    # Vérifier la taille du fichier
    file_stat = sftp.stat(remote_path)
    print(f"Fichier transféré avec succès! Taille: {file_stat.st_size} octets")
    
    # Fermer les connexions
    sftp.close()
    ssh.close()
    print("Transfert terminé avec succès!")
    
except Exception as e:
    print(f"Erreur lors du transfert: {e}")
    sys.exit(1)