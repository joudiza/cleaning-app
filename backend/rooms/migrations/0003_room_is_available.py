# Generated by Django 5.2.4 on 2025-07-11 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_roomstatus_remove_room_is_clean_room_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
    ]
