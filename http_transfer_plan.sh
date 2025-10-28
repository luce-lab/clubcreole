#!/bin/bash

# Script de transfert alternatif utilisant la méthode de téléchargement direct
# Ce script crée un mini-serveur HTTP et génère les commandes pour le serveur distant

echo "=== PLAN DE TRANSFERT ALTERNATIF ==="
echo ""
echo "Étape 1: Création d'un mini-serveur de téléchargement"
echo ""

# Vérifier si python est disponible pour le serveur HTTP
if command -v python3 &> /dev/null; then
    echo "✓ Python3 trouvé"
    
    # Créer un dossier pour le transfert
    mkdir -p transfer_files
    
    # Copier le fichier dans le dossier de transfert
    cp supabase_dump_20251028_164145.sql transfer_files/
    
    # Créer un script HTML simple
    cat > transfer_files/download.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Download Supabase Dump</title></head>
<body>
<h1>Supabase Database Dump</h1>
<p><a href="supabase_dump_20251028_164145.sql">Download supabase_dump_20251028_164145.sql</a></p>
</body>
</html>
EOF
    
    echo "✓ Fichiers de transfert préparés"
    echo ""
    echo "Étape 2: Commandes à exécuter sur le serveur distant (37.59.121.40):"
    echo ""
    echo "1. Connectez-vous en SSH:"
    echo "   ssh ubuntu@37.59.121.40"
    echo "   (mot de passe: Catilo)"
    echo ""
    echo "2. Sur le serveur distant, exécutez:"
    echo "   cd /home/ubuntu"
    echo "   mkdir -p downloads"
    echo "   cd downloads"
    echo "   # Téléchargez le fichier (remplacez VOTRE_IP_LOCAL par votre IP):"
    echo "   wget http://VOTRE_IP_LOCAL:8888/supabase_dump_20251028_164145.sql"
    echo ""
    echo "Étape 3: Démarrez le serveur local (dans une autre session):"
    echo "   cd /home/laurent/mesprojets/clubcreole"
    echo "   python3 -m http.server 8888 --directory transfer_files"
    echo ""
    echo "Puis exécutez les commandes wget sur le serveur distant."
    
else
    echo "❌ Python3 non trouvé"
    exit 1
fi