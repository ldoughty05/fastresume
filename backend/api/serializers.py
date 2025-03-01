from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Project, Job


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "date", "description", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title", "start_date", "end_date", "job_title", "description", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}