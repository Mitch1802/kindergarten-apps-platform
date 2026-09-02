from django.urls import path
from .views import (
    MediaNewsGetFileView,
    MediaUnvertraeglichkeitenGruppenGetFileView,
    MediaUnvertraeglichkeitenKategorienGetFileView,
)

urlpatterns = [
    path("news/<str:filename>", MediaNewsGetFileView.as_view(), name="news-file-get"),
    path(
        "unvertraeglichkeiten/gruppen/<str:filename>",
        MediaUnvertraeglichkeitenGruppenGetFileView.as_view(),
        name="unvertraeglichkeiten-gruppen-file-get",
    ),
    path(
        "unvertraeglichkeiten/kategorien/<str:filename>",
        MediaUnvertraeglichkeitenKategorienGetFileView.as_view(),
        name="unvertraeglichkeiten-kategorien-file-get",
    ),
]
