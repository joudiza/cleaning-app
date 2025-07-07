# create_admin.py

from django.contrib.auth import get_user_model

User = get_user_model()

if not User.objects.filter(username="joud").exists():
    User.objects.create_superuser("joud", "awatifelidrissi1995@", "AhmedJoud2022@")
    print("✅ Joud created")
else:
    print("⚠️ Joud already exists")