import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticoComponent } from './pronostico.component';

describe('PronosticoComponent', () => {
  let component: PronosticoComponent;
  let fixture: ComponentFixture<PronosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PronosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PronosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
