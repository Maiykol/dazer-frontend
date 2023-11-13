import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationResultParametersComponent } from './classification-result-parameters.component';

describe('ClassificationResultParametersComponent', () => {
  let component: ClassificationResultParametersComponent;
  let fixture: ComponentFixture<ClassificationResultParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationResultParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationResultParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
