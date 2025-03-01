from django.urls import path
from . import views

urlpatterns = [
    path("experiences/", views.ExperienceListCreate.as_view(), name="experience-list"),
    path("experiences/delete/<int:pk>/", views.ExperienceDelete.as_view(), name="delete-note"),
]
