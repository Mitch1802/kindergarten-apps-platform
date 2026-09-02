import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../_template/header/header.component';
import { IGruppe, IKategorie, IKind } from '../_interface/unvertraeglichkeiten';

@Component({
  selector: 'app-unvertraeglichkeiten',
  templateUrl: './unvertraeglichkeiten.component.html',
  styleUrls: ['./unvertraeglichkeiten.component.sass'],
  imports: [
    HeaderComponent,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
  ]
})
export class UnvertraeglichkeitenComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  breadcrumb: any = [];

  modulGruppen = 'unvertraeglichkeiten/gruppen';
  modulKategorien = 'unvertraeglichkeiten/kategorien';
  modulKinder = 'unvertraeglichkeiten/kinder';

  gruppen: IGruppe[] = [];
  kategorien: IKategorie[] = [];
  kinder: IKind[] = [];

  gruppenBildDatei: File | null = null;
  gruppenBildPreview: string | null = null;
  kategorieBildDatei: File | null = null;
  kategorieBildPreview: string | null = null;

  formGruppe = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  formKategorie = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  formKind = new FormGroup({
    pkid: new FormControl<number | null>(null),
    name: new FormControl('', Validators.required),
    farbe: new FormControl('#1976d2', Validators.required),
    gruppe: new FormControl<number | null>(null, Validators.required),
    kategorien: new FormControl<number[]>([]),
  });

  ngOnInit(): void {
    sessionStorage.setItem('PageNumber', '2');
    sessionStorage.setItem('Page2', 'V_UV');
    this.breadcrumb = this.globalDataService.ladeBreadcrumb();

    this.ladeGruppen();
    this.ladeKategorien();
    this.ladeKinder();
  }

  ladeGruppen(): void {
    this.globalDataService.get(this.modulGruppen).subscribe({
      next: (erg: any) => {
        this.gruppen = this.globalDataService.arraySortByKey(erg, 'name');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  ladeKategorien(): void {
    this.globalDataService.get(this.modulKategorien).subscribe({
      next: (erg: any) => {
        this.kategorien = this.globalDataService.arraySortByKey(erg, 'name');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  ladeKinder(): void {
    this.globalDataService.get(this.modulKinder).subscribe({
      next: (erg: any) => {
        this.kinder = erg as IKind[];
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  // ----- Gruppen -----
  gruppenBildAuswaehlen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.gruppenBildDatei = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.gruppenBildPreview = reader.result as string);
      reader.readAsDataURL(this.gruppenBildDatei);
    }
  }

  gruppeSpeichern(): void {
    const name = this.formGruppe.value.name;
    const formData = new FormData();
    formData.append('name', name ?? '');
    if (this.gruppenBildDatei) {
      formData.append('bild', this.gruppenBildDatei);
    }

    this.globalDataService.post(this.modulGruppen, formData, true).subscribe({
      next: (erg: any) => {
        this.gruppen.push(erg);
        this.gruppen = this.globalDataService.arraySortByKey(this.gruppen, 'name');
        this.formGruppe.reset();
        this.gruppenBildDatei = null;
        this.gruppenBildPreview = null;
        this.globalDataService.erstelleMessage('success', 'Gruppe erfolgreich gespeichert!');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  gruppeLoeschen(gruppe: IGruppe): void {
    this.globalDataService.delete(this.modulGruppen, gruppe.pkid).subscribe({
      next: () => {
        this.gruppen = this.gruppen.filter((g) => g.pkid !== gruppe.pkid);
        this.kinder = this.kinder.filter((k) => k.gruppe !== gruppe.pkid);
        this.globalDataService.erstelleMessage('success', 'Gruppe erfolgreich gelöscht!');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  // ----- Kategorien -----
  kategorieBildAuswaehlen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.kategorieBildDatei = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.kategorieBildPreview = reader.result as string);
      reader.readAsDataURL(this.kategorieBildDatei);
    }
  }

  kategorieSpeichern(): void {
    const name = this.formKategorie.value.name;
    const formData = new FormData();
    formData.append('name', name ?? '');
    if (this.kategorieBildDatei) {
      formData.append('bild', this.kategorieBildDatei);
    }

    this.globalDataService.post(this.modulKategorien, formData, true).subscribe({
      next: (erg: any) => {
        this.kategorien.push(erg);
        this.kategorien = this.globalDataService.arraySortByKey(this.kategorien, 'name');
        this.formKategorie.reset();
        this.kategorieBildDatei = null;
        this.kategorieBildPreview = null;
        this.globalDataService.erstelleMessage('success', 'Kategorie erfolgreich gespeichert!');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  kategorieLoeschen(kategorie: IKategorie): void {
    this.globalDataService.delete(this.modulKategorien, kategorie.pkid).subscribe({
      next: () => {
        this.kategorien = this.kategorien.filter((k) => k.pkid !== kategorie.pkid);
        this.globalDataService.erstelleMessage('success', 'Kategorie erfolgreich gelöscht!');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  // ----- Kinder -----
  kindBearbeiten(kind: IKind): void {
    this.formKind.setValue({
      pkid: kind.pkid,
      name: kind.name,
      farbe: kind.farbe,
      gruppe: kind.gruppe,
      kategorien: kind.kategorien,
    });
  }

  kindAbbrechen(): void {
    this.formKind.reset({
      pkid: null,
      name: '',
      farbe: '#1976d2',
      gruppe: null,
      kategorien: [],
    });
  }

  kindSpeichern(): void {
    const object = this.formKind.value;
    const post = {
      name: object.name,
      farbe: object.farbe,
      gruppe: object.gruppe,
      kategorien: object.kategorien ?? [],
    };

    if (object.pkid) {
      this.globalDataService.patch(this.modulKinder, object.pkid, post).subscribe({
        next: (erg: any) => {
          const index = this.kinder.findIndex((k) => k.pkid === (erg as any).pkid);
          if (index >= 0) {
            this.kinder[index] = erg as IKind;
          }
          this.kindAbbrechen();
          this.globalDataService.erstelleMessage('success', 'Kind erfolgreich aktualisiert!');
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error),
      });
    } else {
      this.globalDataService.post(this.modulKinder, post, false).subscribe({
        next: (erg: any) => {
          this.kinder.push(erg as IKind);
          this.kindAbbrechen();
          this.globalDataService.erstelleMessage('success', 'Kind erfolgreich gespeichert!');
        },
        error: (error: any) => this.globalDataService.errorAnzeigen(error),
      });
    }
  }

  kindLoeschen(kind: IKind): void {
    this.globalDataService.delete(this.modulKinder, kind.pkid).subscribe({
      next: () => {
        this.kinder = this.kinder.filter((k) => k.pkid !== kind.pkid);
        this.globalDataService.erstelleMessage('success', 'Kind erfolgreich gelöscht!');
      },
      error: (error: any) => this.globalDataService.errorAnzeigen(error),
    });
  }

  // ----- Druckansicht -----
  kinderZelle(gruppe: IGruppe, kategorie: IKategorie): IKind[] {
    return this.kinder
      .filter((k) => k.gruppe === gruppe.pkid && k.kategorien.includes(kategorie.pkid))
      .sort((a, b) => a.farbe.localeCompare(b.farbe) || a.name.localeCompare(b.name));
  }

  drucken(): void {
    window.print();
  }
}
