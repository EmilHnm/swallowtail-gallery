import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivDescriptionComponent } from './div-description.component';

describe('DivDescriptionComponent', () => {
  let component: DivDescriptionComponent;
  let fixture: ComponentFixture<DivDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
