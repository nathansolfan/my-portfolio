#!/bin/bash
# Source the .env file
if [ -f /var/www/html/.env ]; then
    export $(cat /var/www/html/.env | xargs)
fi
# Start Apache in the foreground
apache2-foreground
