import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsamplingResultParametersComponent } from './subsampling-result-parameters.component';

describe('SubsamplingResultParametersComponent', () => {
  let component: SubsamplingResultParametersComponent;
  let fixture: ComponentFixture<SubsamplingResultParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsamplingResultParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsamplingResultParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
