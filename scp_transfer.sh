#!/bin/bash

# Script pour transférer le fichier dump avec SCP
# Utilise expect pour automatiser l'authentification

expect << 'EOF'
spawn scp supabase_dump_20251028_164145.sql ubuntu@37.59.121.40:/home/ubuntu/
expect {
    "(yes/no)?" {
        send "yes\r"
        exp_continue
    }
    "password:" {
        send "Catilo\r"
        exp_continue
    }
    eof
}
EOF