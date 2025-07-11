from django.db import models

class RoomStatus(models.Model):
    name = models.CharField(max_length=50)  # مثال: "نظيفة", "متسخة"

    def __str__(self):
        return self.name

class Room(models.Model):
    number = models.CharField(max_length=10)
    status = models.ForeignKey(RoomStatus, on_delete=models.SET_NULL, null=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Room {self.number} - {self.status.name if self.status else 'without status '} - {'availabale' if self.is_available else 'occupied'}"
