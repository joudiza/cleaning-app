#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Build frontend assets
cd ../frontend || exit
npm install
npm run build
cd ../backend || exit

# Collect static files and apply migrations
python manage.py collectstatic --noinput
python manage.py migrate

# Load fixtures
python manage.py loaddata statuses.json
python manage.py loaddata rooms.json
