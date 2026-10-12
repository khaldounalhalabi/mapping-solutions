#!/bin/sh
set -e

mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/app/public \
    storage/logs \
    bootstrap/cache

chown -R "${DEV_UID:-1000}:${DEV_GID:-1000}" \
    storage \
    bootstrap/cache \
    vendor \
    node_modules \
    /config \
    /data

export HOME=/tmp
export COMPOSER_HOME=/tmp/composer
export NPM_CONFIG_CACHE=/tmp/npm-cache

exec su-exec "${DEV_UID:-1000}:${DEV_GID:-1000}" "$@"
