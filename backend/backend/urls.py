from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.contrib import admin
from django.urls import path, include
from rooms.views import FrontendAppView 


urlpatterns = [ # ← هذا هو المهم
    path('admin/', admin.site.urls),
    path('api/', include('rooms.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('', FrontendAppView.as_view(), name='frontend'),
    path('<path:resource>', FrontendAppView.as_view(), name='frontend-resource'),
    ]

