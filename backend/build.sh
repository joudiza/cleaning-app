#!/usr/bin/env bash
cd ../frontend
npm install
npm run build
cd ../backend
python manage.py collectstatic --noinput
python manage.py migrate
