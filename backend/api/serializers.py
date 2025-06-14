from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

generic_experience_fields = ['id', 'start_date', 'end_date', 'bullet_points', 'created_at', 'author', 'skills', 'skills_input_list']

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
        extra_kwargs = {
            'author': {'read_only': True},
        }
    bullet_points = serializers.ListField( # list...
        child=serializers.CharField(max_length=200), # ...of strings
        max_length=8,
        allow_empty=True,
        default=list
    )
    skills_input_list = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True,
        allow_null=True,
        required=False,
        default=list,
        write_only=True,
    )
    skills = SkillSerializer(many=True, read_only=True, required=False)
    
    def validate_skills_input_list(self, value):
        return value

    def get_skill_objects(self, skill_names):
        skill_objects = []
        for name in skill_names:
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
        fields = [*generic_experience_fields, 'institution', 'title', 'location']
        extra_kwargs = {
            'author': {'read_only': True},
        }
    institution = serializers.CharField(max_length=100, allow_blank=True) # ie company
    title = serializers.CharField(max_length=100, allow_blank=True)
    location = serializers.CharField(max_length=100, allow_blank=True)

class ProjectExperienceSerializer(ExperienceSerializer):
    class Meta:
        model = ProjectExperience
        fields = [*generic_experience_fields, 'title', 'links']
        extra_kwargs = {
            'author': {'read_only': True},
        }
    title = serializers.CharField(max_length=100, allow_blank=True)
    links = serializers.JSONField(default=list)


class EducationExperienceSerializer(ExperienceSerializer):
    class Meta:
        model = EducationExperience
        fields = [*generic_experience_fields, 'institution', 'location', 'focus', 'gpa', 'gpa_scale']
        extra_kwargs = {
            'author': {'read_only': True},
        }
    institution = serializers.CharField(max_length=100, allow_blank=True)
    location = serializers.CharField(max_length=100, allow_blank=True)
    focus = serializers.CharField(max_length=100, allow_blank=True) # ie major
    gpa = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    gpa_scale = serializers.IntegerField(default=4)
    
