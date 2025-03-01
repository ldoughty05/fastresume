from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class JobExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobExperience
        fields = ["id", "title", "bullet_points", "created_at", "user", "company", "start_date", "end_date", "location"]
        extra_kwargs = {"user": {"read_only": True}}

class ProjectExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectExperience
        fields = ["id", "title", "bullet_points", "created_at", "user", "project_link", "article_link"]
        extra_kwargs = {"user": {"read_only": True}}

class EducationExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationExperience
        fields = ["id", "title", "bullet_points", "created_at", "user", "institution", "start_date", "end_date", "location", "major"]
        extra_kwargs = {"user": {"read_only": True}}
