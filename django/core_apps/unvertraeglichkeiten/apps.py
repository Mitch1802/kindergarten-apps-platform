from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UnvertraeglichkeitenConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.unvertraeglichkeiten"
    verbose_name = _("Unverträglichkeiten")
