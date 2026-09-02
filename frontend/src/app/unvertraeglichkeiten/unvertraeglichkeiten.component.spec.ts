import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvertraeglichkeitenComponent } from './unvertraeglichkeiten.component';

describe('UnvertraeglichkeitenComponent', () => {
  let component: UnvertraeglichkeitenComponent;
  let fixture: ComponentFixture<UnvertraeglichkeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UnvertraeglichkeitenComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(UnvertraeglichkeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
