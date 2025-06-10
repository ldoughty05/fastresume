from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

generic_experience_fields = ['id', 'title', 'start_date', 'end_date', 'bullet_points', 'created_at', 'author', 'skills']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

    name = serializers.CharField(max_length=50, required=True, allow_blank=False, trim_whitespace=True)

    def validate_name(self, value):
        return value.strip().lower()

    def create(self, validated_data):
        return Skill.objects.create(**validated_data)
    
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [*generic_experience_fields, 'company', 'location']
    
    title = serializers.CharField(max_length=100)
    start_date = serializers.DateField(required=False, allow_null=True)
    end_date = serializers.DateField(required=False, allow_null=True)
    bullet_points = serializers.ListField( # list...
        child=serializers.CharField(max_length=200), # ...of strings
        max_length=8,
        allow_empty=True,
        default=list
    )
    skills_input_list = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True,
        required=False,
        allow_null=True,
        default=list,
        write_only=True,
    )
    skills = SkillSerializer(many=True, read_only=True, required=False)
    
    def get_skill_objects(self, skill_names):
        skill_objects = []
        for name in skill_names:
            print(f"Processing skill name: {name}")
            name = name.strip().lower()
            skill, _ = Skill.objects.get_or_create(name=name)
            skill_objects.append(skill)
        return skill_objects
    
    def create(self, validated_data):
        user = self.context['request'].user  # Get the user from the request context
        skill_objects = self.get_skill_objects(validated_data.pop('skills_input_list', []))
        model = self.Meta.model.objects
        experience = model.create(author=user, **validated_data)
        experience.skills.set(skill_objects)
        return experience


class JobExperienceSerializer(ExperienceSerializer):
    class Meta:
        model = JobExperience
        fields = [*generic_experience_fields, 'company', 'location']


class ProjectExperienceSerializer(ExperienceSerializer):
    class Meta:
        model = ProjectExperience
        fields = [*generic_experience_fields, 'project_link', 'article_link']


class EducationExperienceSerializer(ExperienceSerializer):
    class Meta:
        model = EducationExperience
        fields = [*generic_experience_fields, 'institution', 'location', 'major']
    
