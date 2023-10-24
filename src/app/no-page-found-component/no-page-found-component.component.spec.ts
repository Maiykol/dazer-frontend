import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageFoundComponentComponent } from './no-page-found-component.component';

describe('NoPageFoundComponentComponent', () => {
  let component: NoPageFoundComponentComponent;
  let fixture: ComponentFixture<NoPageFoundComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPageFoundComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPageFoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
