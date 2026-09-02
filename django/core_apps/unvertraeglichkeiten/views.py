from rest_framework import permissions, viewsets

from core_apps.common.permissions import HasAnyRolePermission

from .models import Gruppe, Kategorie, Kind
from .serializers import GruppeSerializer, KategorieSerializer, KindSerializer


class UnvertraeglichkeitenBasePermissionMixin:
    permission_classes = [
        permissions.IsAuthenticated,
        HasAnyRolePermission.with_roles("ADMIN", "UNVERTRAEGLICHKEITEN"),
    ]


class GruppeViewSet(UnvertraeglichkeitenBasePermissionMixin, viewsets.ModelViewSet):
    queryset = Gruppe.objects.all()
    serializer_class = GruppeSerializer


class KategorieViewSet(UnvertraeglichkeitenBasePermissionMixin, viewsets.ModelViewSet):
    queryset = Kategorie.objects.all()
    serializer_class = KategorieSerializer


class KindViewSet(UnvertraeglichkeitenBasePermissionMixin, viewsets.ModelViewSet):
    queryset = Kind.objects.select_related("gruppe").prefetch_related("kategorien").all()
    serializer_class = KindSerializer
