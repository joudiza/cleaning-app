from rest_framework import serializers
from .models import Room, RoomStatus

class RoomStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomStatus
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    status = RoomStatusSerializer(read_only=True)
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=RoomStatus.objects.all(), source='status', write_only=True
    )

    class Meta:
        model = Room
        fields = ['id', 'number', 'status', 'status_id', 'is_available'] 
