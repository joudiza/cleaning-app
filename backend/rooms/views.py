from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Room, RoomStatus
from .serializers import RoomSerializer, RoomStatusSerializer
from rest_framework.permissions import  SAFE_METHODS, BasePermission
from django.db.models import IntegerField
from django.db.models.functions import Cast
from django.views.generic import View
from django.conf import settings
import os


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # السماح للجميع بالقراءة فقط
        if request.method in SAFE_METHODS:
            return True
        # لكن التعديل غير مسموح إلا للـ admin
        return request.user and request.user.is_staff

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.annotate(
        number_as_int=Cast('number', IntegerField())
    ).order_by('number_as_int')  # ⬅️ الترتيب الرقمي الصحيح
    serializer_class = RoomSerializer
    permission_classes = [IsAdminOrReadOnly]

class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAdminOrReadOnly]

from django.views.generic import View
from django.shortcuts import render

class FrontendAppView(View):
    def get(self, request, resource=None):
        return render(request, "index.html")

 