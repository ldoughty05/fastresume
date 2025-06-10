from django.shortcuts import render
from django.contrib.auth.models import User
from itertools import chain
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import * 

def get_all_experience_queryset(self):
    user = self.request.user
    job_experiences = JobExperience.objects.filter(author=user)
    project_experiences = ProjectExperience.objects.filter(author=user)
    education_experiences = EducationExperience.objects.filter(author=user)
    return list(chain(job_experiences, project_experiences, education_experiences))

class JobExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = JobExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JobExperience.objects.filter(author=user)
    
class EducationExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = EducationExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EducationExperience.objects.filter(author=user)
    
class ProjectExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ProjectExperience.objects.filter(author=user)

class AllExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_all_experience_queryset(self)


class ExperienceDelete(generics.DestroyAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_all_experience_queryset(self)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
