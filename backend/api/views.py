from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, JobExperienceSerializer, ProjectExperienceSerializer, EducationExperienceSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import JobExperience, ProjectExperience, EducationExperience

class JobExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = JobExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobExperienceSerializer.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ProjectExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobExperienceSerializer.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class EducationExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = EducationExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobExperienceSerializer.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class JobExperienceDelete(generics.DestroyAPIView):
    serializer_class = JobExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobExperience.objects.filter(author=user)


class ProjectExperienceDelete(generics.DestroyAPIView):
    serializer_class = ProjectExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ProjectSerializer.objects.filter(author=user)


class EducationExperienceDelete(generics.DestroyAPIView):
    serializer_class = EducationExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EducationExperience.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
