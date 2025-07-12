#!/bin/bash

set -e  # ❗يوقف السكريبت إذا وقعات شي غلطة

# ✅ 1. Install Python dependencies
echo "🔧 Installing Python dependencies..."
pip install -r requirements.txt

# ✅ 2. Build frontend
echo "🎨 Building frontend assets..."
cd ../frontend || exit 1
npm install
npm run build

# ✅ 3. Copy frontend build to backend
echo "📁 Copying assets to backend..."
cp -r dist/assets ../backend/static/assets
cp dist/index.html ../backend/templates/index.html

# ✅ 4. Back to backend
cd ../backend || exit 1

# ✅ 5. Collect static & run migrations
echo "🗂️ Collecting static files..."
python manage.py collectstatic --noinput

echo "📦 Applying database migrations..."
python manage.py migrate

# ✅ 6. Load fixtures (optional)
echo "🗃️ Loading fixtures..."
python manage.py loaddata statuses.json || echo "⚠️ Skipped statuses.json (not found)"
python manage.py loaddata rooms.json || echo "⚠️ Skipped rooms.json (not found)"

echo "✅ Deployment script finished successfully!"
