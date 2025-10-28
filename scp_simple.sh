#!/bin/bash

# Script utilisant sshpass avec une implémentation manuelle
# Crée un script temporaire expect-like en utilisant seulement bash

exec 3>&1

{
    echo "Catilo" | scp -o StrictHostKeyChecking=no supabase_dump_20251028_164145.sql ubuntu@37.59.121.40:/home/ubuntu/ 2>&1
} | {
    while IFS= read -r line; do
        echo "$line" >&3
        if [[ "$line" == *"password:"* ]]; then
            sleep 1
            echo "Catilo" >&1
        fi
    done
}