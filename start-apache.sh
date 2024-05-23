#!/bin/bash

# Load environment variables from .env file
if [ -f /var/www/html/.env ]; then
    export $(cat /var/www/html/.env | grep -v '#' | awk '/=/ {print $1}')
fi

# Start Apache
apache2-foreground
