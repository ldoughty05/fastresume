from django.urls import path
from . import views

urlpatterns = [
    path("experiences/jobs/", views.JobExperienceListCreate.as_view(), name="job-experience-list"),
    path("experiences/jobs/delete/<int:pk>/", views.JobExperienceDelete.as_view(), name="delete-job-experience"),
    path("experiences/education/", views.EducationExperienceListCreate.as_view(), name="education-experience-list"),
    path("experiences/education/delete/<int:pk>/", views.EducationExperienceDelete.as_view(), name="delete-education-experience"),
    path("experiences/projects/", views.ProjectExperienceListCreate.as_view(), name="project-experience-list"),
    path("experiences/projects/delete/<int:pk>/", views.ProjectExperienceDelete.as_view(), name="delete-project-experience"),
    path("experiences/all/", views.AllExperienceListCreate.as_view(), name="all-experience-list"),
]