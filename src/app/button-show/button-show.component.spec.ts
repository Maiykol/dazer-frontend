import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShowComponent } from './button-show.component';

describe('ButtonShowComponent', () => {
  let component: ButtonShowComponent;
  let fixture: ComponentFixture<ButtonShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
