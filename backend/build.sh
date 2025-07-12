#!/bin/bash

set -e  # ❗إذا وقعات شي غلطة ف أي أمر، السكريبت يوقف

# ✅ 1. Install Python dependencies
echo "🔧 Installing Python dependencies..."
pip install -r requirements.txt

# ✅ 2. Build frontend
echo "🎨 Building frontend assets..."
cd ../frontend || exit 1
npm install
npm run build

# ✅ 3. Back to backend
cd ../backend || exit 1

# ✅ 4. Collect static & run migrations
echo "🗂️ Collecting static files..."
python manage.py collectstatic --noinput

echo "📦 Applying database migrations..."
python manage.py migrate

# ✅ 5. Load fixtures (if needed)
echo "🗃️ Loading fixtures..."
python manage.py loaddata statuses.json || echo "⚠️ Skipped statuses.json (not found)"
python manage.py loaddata rooms.json || echo "⚠️ Skipped rooms.json (not found)"

echo "✅ Deployment script finished successfully!"
