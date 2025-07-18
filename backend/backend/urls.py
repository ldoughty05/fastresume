from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .authviews import KnownHostView

def api_welcome(request):
    return HttpResponse("Welcome to the FastResume API!")
urlpatterns = [
    path("", api_welcome, name="api-welcome"),
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/token/knownorigin/", KnownHostView.as_view(), name="get_token_known_origin"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]