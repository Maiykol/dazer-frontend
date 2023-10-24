import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsamplingResultComponent } from './subsampling-result.component';

describe('SubsamplingResultComponent', () => {
  let component: SubsamplingResultComponent;
  let fixture: ComponentFixture<SubsamplingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsamplingResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsamplingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
