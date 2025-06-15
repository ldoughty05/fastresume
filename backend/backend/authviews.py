from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import AllowAny
from dotenv import load_dotenv
import os
import json


load_dotenv()
logins_raw = os.getenv("KNOWN_ORIGIN_LOGINS")
try:
    KNOWN_ORIGIN_LOGINS = json.loads(logins_raw)
except json.JSONDecodeError as e:
    raise ValueError(f"Could not parse KNOWN_ORIGIN_LOGINS from .env: {e}")

class KnownHostView(APIView):
  permission_classes = [AllowAny]

  def get(self, request):
    origin = request.headers.get("Origin") or request.headers.get("Host")
    if not origin:
      return Response({"detail": "Origin not provided"}, status=status.HTTP_403_FORBIDDEN)
    known_origin_credentials = KNOWN_ORIGIN_LOGINS[origin]
    if not known_origin_credentials:
      return Response({"detail": "Untrusted origin"}, status=status.HTTP_403_FORBIDDEN)

    try:
      known_user = User.objects.get(username=known_origin_credentials["username"])
    except User.DoesNotExist:
      return Response({"detail": "known origin user not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    refresh = RefreshToken.for_user(known_user)
    return Response({
      "refresh": str(refresh),
      "access": str(refresh.access_token),
    })