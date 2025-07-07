# create_admin.py

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

if not User.objects.filter(username="joud").exists():
    User.objects.create_superuser(
        username="joud",
        email="awatifelidrissi1995@gmail.com",
        password="AhmedJoud2022@"
    )
    print("✅ Admin user created")
else:
    print("⚠️ Admin user already exists")
