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
        fields = '__all__'

class ProjectExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectExperience
        fields = '__all__'

class EducationExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationExperience
        fields = '__all__'

class ExperienceSerializer(serializers.Serializer):
    experience_type = serializers.CharField() # We will specify the type in our request in the request data.

    def to_representation(self, instance):
        if isinstance(instance, JobExperience):
            return JobExperienceSerializer(instance).data
        elif isinstance(instance, ProjectExperience):
            return ProjectExperienceSerializer(instance).data
        elif isinstance(instance, EducationExperience):
            return EducationExperienceSerializer(instance).data
        return super().to_representation(instance)
    
    def to_internal_value(self, data):
        experience_type = data.get('experience_type')
        if experience_type == 'job':
            return JobExperienceSerializer(data=data)
        elif experience_type == 'project':
            return ProjectExperienceSerializer(data=data)
        elif experience_type == 'education':
            return EducationExperienceSerializer(data=data)
        return super().to_internal_value(data)

