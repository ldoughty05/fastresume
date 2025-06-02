from django.db import models
from django.contrib.auth.models import User

class Experience(models.Model):
    title = models.CharField(max_length=100)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    bullet_points = models.JSONField(default=list, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="experiences")

    class Meta:
        abstract = True

    def __str__(self):
        return self.title
    
class JobExperience(Experience):
    company = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="job")


class ProjectExperience(Experience):
    project_link = models.URLField(null=True, blank=True)
    article_link = models.URLField(null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project")


class EducationExperience(Experience):
    institution = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    major = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="education")
