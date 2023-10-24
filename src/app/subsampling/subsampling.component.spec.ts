import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsamplingComponent } from './subsampling.component';

describe('SubsamplingComponent', () => {
  let component: SubsamplingComponent;
  let fixture: ComponentFixture<SubsamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
