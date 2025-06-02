from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

generic_experience_fields = ['id', 'title', 'start_date', 'end_date', 'bullet_points', 'created_at', 'author']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class JobExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobExperience
        fields = [*generic_experience_fields, 'company', 'location']
        extra_kwargs = {'author': {'read_only': True}}

    def create(self, validated_data):
        return JobExperience.objects.create(**validated_data)

class ProjectExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectExperience
        fields = [*generic_experience_fields, 'project_link', 'article_link']
        extra_kwargs = {'author': {'read_only': True}}

    def create(self, validated_data):
        return ProjectExperience.objects.create(**validated_data)

class EducationExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationExperience
        fields = [*generic_experience_fields, 'institution', 'location', 'major']
        extra_kwargs = {'author': {'read_only': True}}
    
    def create(self, validated_data):
        return EducationExperience.objects.create(**validated_data)

class ExperienceSerializer(serializers.Serializer):
    class Meta:
        fields = generic_experience_fields
        extra_kwargs = {'author': {'read_only': True}}

    experience_type = serializers.CharField() # We will specify the type in our request in the request data.
    title = serializers.CharField(max_length=100)
    start_date = serializers.DateField(required=False, allow_null=True)
    end_date = serializers.DateField(required=False, allow_null=True)
    bullet_points = serializers.ListField( # list...
        child=serializers.CharField(max_length=200), # ...of strings
        max_length=8,
        allow_empty=True,
        default=list
    )

    def to_representation(self, instance):
        if isinstance(instance, JobExperience):
            return JobExperienceSerializer(instance).data
        elif isinstance(instance, ProjectExperience):
            return ProjectExperienceSerializer(instance).data
        elif isinstance(instance, EducationExperience):
            return EducationExperienceSerializer(instance).data
        return super().to_representation(instance)
    
    
    def create(self, validated_data):
        experience_type = validated_data.pop('experience_type', None).lower() # Removes this parameter from the object since we wont need it again.
        user = self.context['request'].user  # Get the user from the request context
        if experience_type == 'work':
            return JobExperience.objects.create(author=user, **validated_data)
        elif experience_type == 'project':
            return ProjectExperience.objects.create(author=user, **validated_data)
        elif experience_type == 'education':
            return EducationExperience.objects.create(author=user, **validated_data)
        else:
            raise serializers.ValidationError({"experience_type": "Invalid experience type: " + experience_type})

