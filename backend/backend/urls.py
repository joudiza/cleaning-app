from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rooms.views import FrontendAppView 


urlpatterns = [
  path('', FrontendAppView.as_view()),  # ← هذا هو المهم
    path('admin/', admin.site.urls),
    path('api/', include('rooms.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]

