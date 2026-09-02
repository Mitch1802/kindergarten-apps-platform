from rest_framework import serializers

from .models import Gruppe, Kategorie, Kind


class GruppeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gruppe
        fields = ["pkid", "id", "name", "bild"]


class KategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategorie
        fields = ["pkid", "id", "name", "bild"]


class KindSerializer(serializers.ModelSerializer):
    gruppe_name = serializers.CharField(source="gruppe.name", read_only=True)
    kategorien_detail = KategorieSerializer(source="kategorien", many=True, read_only=True)

    class Meta:
        model = Kind
        fields = [
            "pkid",
            "id",
            "name",
            "farbe",
            "gruppe",
            "gruppe_name",
            "kategorien",
            "kategorien_detail",
        ]
