import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationResultComponent } from './classification-result.component';

describe('ClassificationResultComponent', () => {
  let component: ClassificationResultComponent;
  let fixture: ComponentFixture<ClassificationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
