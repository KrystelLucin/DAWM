import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlegalidadComponent } from './ilegalidad.component';

describe('IlegalidadComponent', () => {
  let component: IlegalidadComponent;
  let fixture: ComponentFixture<IlegalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlegalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlegalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
