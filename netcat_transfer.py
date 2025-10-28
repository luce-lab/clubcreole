#!/usr/bin/env python3
import socket
import os

# Simple script pour créer un serveur d'envoi de fichier
# Ce script écoute sur un port et envoie le fichier quand connecté

def send_file(host, port, filename):
    if not os.path.exists(filename):
        print(f"Fichier {filename} non trouvé")
        return False
    
    file_size = os.path.getsize(filename)
    
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((host, port))
            
            # Envoyer le nom du fichier et sa taille
            s.sendall(f"{filename}|{file_size}\n".encode())
            
            # Envoyer le fichier
            with open(filename, 'rb') as f:
                while True:
                    data = f.read(4096)
                    if not data:
                        break
                    s.sendall(data)
            
            print(f"Fichier {filename} envoyé avec succès ({file_size} octets)")
            return True
            
    except Exception as e:
        print(f"Erreur lors de l'envoi: {e}")
        return False

if __name__ == "__main__":
    # Ce script serait utilisé côté serveur pour recevoir
    print("Script de réception à exécuter sur le serveur distant")