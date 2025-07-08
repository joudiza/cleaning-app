#!/usr/bin/env bash

# ✅ 1. ندخلو لل backend
cd backend

# ✅ 2. نثبّت باكيجات البايثون
pip install -r requirements.txt

# ✅ 3. نرجع نبني ال frontend
cd ../frontend
npm install
npm run build

# ✅ 4. نرجع لل backend وندير collectstatic
cd ../backend
python manage.py collectstatic --noinput
python manage.py migrate
