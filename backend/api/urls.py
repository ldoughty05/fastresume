from django.urls import path
from . import views

urlpatterns = [
    path("experiences/jobs/", views.JobExperienceListCreate.as_view(), name="job-experience-list"),
    path("experiences/education/", views.EducationExperienceListCreate.as_view(), name="education-experience-list"),
    path("experiences/projects/", views.ProjectExperienceListCreate.as_view(), name="project-experience-list"),
    path("experiences/all/", views.AllExperienceListCreate.as_view(), name="all-experience-list"),
    path("experiences/all/delete/<int:pk>/", views.ExperienceDelete.as_view(), name="delete-experience"),
]