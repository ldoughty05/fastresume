from django.db import models
from django.contrib.auth.models import User

# There is no "User" model since serializers imports User from django.contrib.auth.models

class Experience(models.Model):
    title = models.CharField(max_length=100)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    bullet_points = models.JSONField(default=list, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="experiences")
    skills = models.ManyToManyField('Skill', related_name="experiences")

    class Meta:
        abstract = True

    def __str__(self):
        return self.title
    
class JobExperience(Experience):
    company = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="job")
    skills = models.ManyToManyField('Skill', related_name="job_experiences")



class ProjectExperience(Experience):
    project_link = models.URLField(null=True, blank=True)
    article_link = models.URLField(null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project")
    skills = models.ManyToManyField('Skill', related_name="project_experiences")



class EducationExperience(Experience):
    institution = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    major = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="education")
    skills = models.ManyToManyField('Skill', related_name="education_experiences")


class Skill(models.Model):
    name = models.CharField(max_length=50, unique=True)
