# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy your PHP code into the Docker container
COPY . /var/www/html/

# Set the working directory
WORKDIR /var/www/html/

# Expose the port
EXPOSE 80

# Build the Docker image
docker build -t my-php-app .

# Run the Docker container
docker run -d -p 8080:80 my-php-app
