# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html/

# Copy the application files into the Docker container
COPY backend /var/www/html/

# Copy .env file into the Docker container
COPY .env /var/www/html/.env

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Run composer install to install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --working-dir=/var/www/html

# Expose the port
EXPOSE 80

# Restart Apache to apply new configuration
CMD ["apache2-foreground"]
