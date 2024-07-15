FROM php:7.4-apache

# Enable apache modules
RUN a2enmod rewrite headers

# Install any additional PHP extensions here
# RUN docker-php-ext-install pdo_mysql

# Copy project files to the apache root directory
COPY . /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Ensure .env file is not publicly accessible
RUN echo "Redirect 404 /.env" >> /var/www/html/.htaccess
