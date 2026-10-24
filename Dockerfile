# ============================
# Stage 1: Build frontend assets
# ============================
FROM node:22-alpine AS node-dependencies

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node-dependencies AS node-builder

COPY . .
RUN npm run build

# ============================
# Stage 2: Shared PHP runtime
# ============================
FROM dunglas/frankenphp:php8.4-alpine AS php-runtime

RUN apk add --no-cache \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    libxml2-dev \
    mariadb-client \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache \
    xml

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

RUN apk add --no-cache --virtual .build-deps autoconf g++ make \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader --no-interaction --no-scripts

COPY . .

RUN mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/app/public \
    storage/logs \
    bootstrap/cache \
    /config \
    /data \
    && chown -R www-data:www-data /var/www /config /data

# ============================
# Stage 3: Production runtime
# ============================
FROM php-runtime AS production

COPY --from=node-builder --chown=www-data:www-data /app/public/build ./public/build
COPY --chown=www-data:www-data docker/entrypoint.sh /usr/local/bin/entrypoint

USER root
RUN chmod +x /usr/local/bin/entrypoint
USER www-data

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://localhost:80/up || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint"]
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
