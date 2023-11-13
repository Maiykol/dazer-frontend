import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsamplingResultPlotsComponent } from './subsampling-result-plots.component';

describe('SubsamplingResultPlotsComponent', () => {
  let component: SubsamplingResultPlotsComponent;
  let fixture: ComponentFixture<SubsamplingResultPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsamplingResultPlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsamplingResultPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
