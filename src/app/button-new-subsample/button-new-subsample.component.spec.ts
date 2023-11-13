import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNewSubsampleComponent } from './button-new-subsample.component';

describe('ButtonNewSubsampleComponent', () => {
  let component: ButtonNewSubsampleComponent;
  let fixture: ComponentFixture<ButtonNewSubsampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonNewSubsampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNewSubsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
