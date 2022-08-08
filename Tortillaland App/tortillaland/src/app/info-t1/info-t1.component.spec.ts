import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoT1Component } from './info-t1.component';

describe('InfoT1Component', () => {
  let component: InfoT1Component;
  let fixture: ComponentFixture<InfoT1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoT1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoT1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
