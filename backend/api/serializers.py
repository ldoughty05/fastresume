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
        fields = ['id', 'title', 'bullet_points', 'created_at', 'author', 'company', 'start_date', 'end_date', 'location']
        extra_kwargs = {'author': {'read_only': True}}

    def create(self, validated_data):
        return JobExperience.objects.create(**validated_data)

class ProjectExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectExperience
        fields = ['id', 'title', 'bullet_points', 'created_at', 'author', 'project_link', 'article_link']
        extra_kwargs = {'author': {'read_only': True}}

    def create(self, validated_data):
        return ProjectExperience.objects.create(**validated_data)

class EducationExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationExperience
        fields = ['id', 'title', 'bullet_points', 'created_at', 'author', 'institution', 'start_date', 'end_date', 'location', 'major']
        extra_kwargs = {'author': {'read_only': True}}
    
    def create(self, validated_data):
        return EducationExperience.objects.create(**validated_data)

class ExperienceSerializer(serializers.Serializer):
    class Meta:
        fields = ['id', 'title', 'bullet_points', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}

    experience_type = serializers.CharField() # We will specify the type in our request in the request data.

    def to_representation(self, instance):
        if isinstance(instance, JobExperience):
            return JobExperienceSerializer(instance).data
        elif isinstance(instance, ProjectExperience):
            return ProjectExperienceSerializer(instance).data
        elif isinstance(instance, EducationExperience):
            return EducationExperienceSerializer(instance).data
        return super().to_representation(instance)
    
    # def to_internal_value(self, data):
    #     experience_type = data.get('experience_type')
    #     if experience_type == 'job':
    #         return JobExperienceSerializer(data)
    #     elif experience_type == 'project':
    #         return ProjectExperienceSerializer(data)
    #     elif experience_type == 'education':
    #         return EducationExperienceSerializer(data)
    #     return super().to_internal_value(data)
    
    def create(self, validated_data):
        experience_type = validated_data.pop('experience_type', None).lower() # Removes this parameter from the object since we wont need it again.
        user = self.context['request'].user  # Get the user from the request context
        if experience_type == 'work':
            jobExperience = JobExperience.objects.create(author=user, **validated_data)
            return jobExperience
        elif experience_type == 'project':
            return ProjectExperience.objects.create(author=user, **validated_data)
        elif experience_type == 'education':
            return EducationExperience.objects.create(author=user, **validated_data)
        else:
            raise serializers.ValidationError({"experience_type": "Invalid experience type: " + experience_type})

