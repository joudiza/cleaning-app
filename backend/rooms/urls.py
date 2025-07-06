from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, RoomStatusViewSet


router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'statuses', RoomStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
 
]
