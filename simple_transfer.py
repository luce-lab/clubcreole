#!/usr/bin/env python3
import socket
import time

# Création d'un client simple pour transférer le fichier
def transfer_file_to_server():
    host = "37.59.121.40"
    port = 22  # Port SSH standard
    
    print(f"Tentative de connexion à {host}:{port}...")
    
    try:
        # Créer un socket TCP
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(10)
        
        # Se connecter
        s.connect((host, port))
        print("Connexion établie!")
        
        # Lire le fichier
        with open('supabase_dump_20251028_164145.sql', 'rb') as f:
            data = f.read()
        
        print(f"Fichier de {len(data)} octets prêt à être envoyé")
        print("Note: Vous devrez configurer un serveur d'écoute sur la machine distante")
        
        s.close()
        
    except Exception as e:
        print(f"Erreur: {e}")
        return False
    
    return True

if __name__ == "__main__":
    transfer_file_to_server()