import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationModalComponent } from './classification-modal.component';

describe('ClassificationModalComponent', () => {
  let component: ClassificationModalComponent;
  let fixture: ComponentFixture<ClassificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
