from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.JobExperienceListCreate.as_view(), name="job-list"),
    path("jobs/delete/<int:pk>/", views.JobExperienceDelete.as_view(), name="delete-job"),
    
    path("projects/", views.ProjectExperienceListCreate.as_view(), name="project-list"),
    path("projects/delete/<int:pk>/", views.ProjectExperienceDelete.as_view(), name="delete-project"),
    
    path("education/", views.EducationExperienceListCreate.as_view(), name="education-list"),
    path("education/delete/<int:pk>/", views.EducationExperienceDelete.as_view(), name="delete-education"),
]
