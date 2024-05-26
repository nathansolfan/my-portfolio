# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions and utilities
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    curl \
    && docker-php-ext-install zip pdo pdo_mysql \
    && a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files
COPY backend /var/www/html/
COPY backend/.env /var/www/html/.env
COPY start-apache.sh /usr/local/bin/start-apache.sh

# Set the working directory
WORKDIR /var/www/html/

# Run Composer install
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set script permissions
RUN chmod +x /usr/local/bin/start-apache.sh

# Print environment variables (debugging)
RUN printenv

# Expose the port
EXPOSE 80

# Start Apache
CMD ["start-apache.sh"]
