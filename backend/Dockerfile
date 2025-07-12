# Use the official PHP image with Apache
FROM php:8.1-apache

# Install PDO MySQL extension so PHP can talk to MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copy all of our backend code into Apache's web root
WORKDIR /var/www/html
COPY . .

# (Optional) Enable URL rewriting if you use .htaccess later
RUN a2enmod rewrite

# Expose port 80 so docker-compose can map it to your host
EXPOSE 80
