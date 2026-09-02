from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import GruppeViewSet, KategorieViewSet, KindViewSet

router = DefaultRouter()
router.register("gruppen", GruppeViewSet, basename="unvertraeglichkeiten-gruppe")
router.register("kategorien", KategorieViewSet, basename="unvertraeglichkeiten-kategorie")
router.register("kinder", KindViewSet, basename="unvertraeglichkeiten-kind")

urlpatterns = [
    path("", include(router.urls)),
]
