import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationSurvivalComponent } from './classification-survival.component';

describe('ClassificationSurvivalComponent', () => {
  let component: ClassificationSurvivalComponent;
  let fixture: ComponentFixture<ClassificationSurvivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationSurvivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationSurvivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
