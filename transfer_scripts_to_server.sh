#!/bin/bash

# Script pour transférer les scripts d'importation vers le serveur distant
echo "📤 TRANSFERT DES SCRIPTS D'IMPORTATION VERS LE SERVEUR DISTANT"
echo "=========================================================="
echo ""

SERVER_IP="37.59.121.40"
SERVER_USER="ubuntu"
SERVER_PASS="Catilo"

echo "🔧 Vérification des scripts à transférer:"
scripts=("import_database.sh" "verify_database.sh" "remote_import_commands.sh")

for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        echo "✅ $script trouvé ($(du -h $script | cut -f1))"
    else
        echo "❌ $script non trouvé"
    fi
done

echo ""
echo "📤 Transfert des scripts vers le serveur distant..."

# Transférer les scripts un par un
for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        echo "   Transfert de $script..."
        scp "$script" "${SERVER_USER}@${SERVER_IP}:/tmp/"
        if [ $? -eq 0 ]; then
            echo "   ✅ $script transféré"
        else
            echo "   ❌ Échec du transfert de $script"
        fi
    fi
done

echo ""
echo "📋 Commandes à exécuter sur le serveur distant maintenant:"
echo ""
echo "ssh ubuntu@37.59.121.40"
echo "cd /tmp"
echo "chmod +x *.sh"
echo ""
echo "# Puis exécutez l'un des scripts suivants:"
echo "./import_database.sh          # Importation complète"
echo "./verify_database.sh          # Vérification post-importation"
echo "./remote_import_commands.sh    # Afficher les commandes manuelles"
echo ""

echo "📁 Les scripts sont maintenant disponibles dans /tmp/ sur le serveur distant"