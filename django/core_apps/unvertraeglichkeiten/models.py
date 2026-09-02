from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel


class Gruppe(TimeStampedModel):
    """Kindergartengruppe (z.B. 'Bärengruppe') inkl. Gruppenbild."""
    name = models.CharField(verbose_name=_("Gruppenname"), max_length=100, unique=True)
    bild = models.ImageField(
        verbose_name=_("Gruppenbild"),
        upload_to="unvertraeglichkeiten/gruppen/",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Gruppe")
        verbose_name_plural = _("Gruppen")
        ordering = ["name"]

    def __str__(self):
        return self.name


class Kategorie(TimeStampedModel):
    """Verträglichkeitskategorie (z.B. 'Nüsse', 'Laktose') inkl. Bild."""
    name = models.CharField(verbose_name=_("Kategoriename"), max_length=100, unique=True)
    bild = models.ImageField(
        verbose_name=_("Kategoriebild"),
        upload_to="unvertraeglichkeiten/kategorien/",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Kategorie")
        verbose_name_plural = _("Kategorien")
        ordering = ["name"]

    def __str__(self):
        return self.name


class Kind(TimeStampedModel):
    """Kind mit zugeteilter Farbe, Gruppe und einer oder mehreren Verträglichkeitskategorien."""
    name = models.CharField(verbose_name=_("Name"), max_length=150)
    farbe = models.CharField(verbose_name=_("Farbe"), max_length=7, default="#1976d2")
    gruppe = models.ForeignKey(
        Gruppe,
        verbose_name=_("Gruppe"),
        related_name="kinder",
        on_delete=models.CASCADE,
    )
    kategorien = models.ManyToManyField(
        Kategorie,
        verbose_name=_("Kategorien"),
        related_name="kinder",
        blank=True,
    )

    class Meta:
        verbose_name = _("Kind")
        verbose_name_plural = _("Kinder")
        ordering = ["farbe", "name"]

    def __str__(self):
        return self.name
