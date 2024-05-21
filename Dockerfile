# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy your PHP code into the Docker container
COPY . /var/www/html/

# Copy .env file into the Docker container
COPY .env /var/www/html/.env

# Set the working directory
WORKDIR /var/www/html/

# Expose the port
EXPOSE 80
