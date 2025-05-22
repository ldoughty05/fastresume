from django.shortcuts import render
from django.contrib.auth.models import User
from itertools import chain
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import * 

def get_experience_queryset(self):
    user = self.request.user
    job_experiences = JobExperience.objects.filter(author=user)
    project_experiences = ProjectExperience.objects.filter(author=user)
    education_experiences = EducationExperience.objects.filter(author=user)
    return list(chain(job_experiences, project_experiences, education_experiences))

class ExperienceListCreate(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_experience_queryset(self)
    
    # def perform_create(self, serializer):
    #     experience_type = self.request.data.get('experience_type')
    #     if experience_type == 'job':
    #         serializer = JobExperienceSerializer(data=self.request.data)
    #     elif experience_type == 'project':
    #         serializer = ProjectExperienceSerializer(data=self.request.data)
    #     elif experience_type == 'education':
    #         serializer = EducationExperienceSerializer(data=self.request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=self.request.user)
    #     else:
    #         print(serializer.errors)


class ExperienceDelete(generics.DestroyAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_experience_queryset(self)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
