import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsamplingModalComponent } from './subsampling-modal.component';

describe('SubsamplingModalComponent', () => {
  let component: SubsamplingModalComponent;
  let fixture: ComponentFixture<SubsamplingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsamplingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsamplingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
