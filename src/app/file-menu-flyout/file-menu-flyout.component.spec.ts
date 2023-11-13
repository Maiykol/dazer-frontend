import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMenuFlyoutComponent } from './file-menu-flyout.component';

describe('FileMenuFlyoutComponent', () => {
  let component: FileMenuFlyoutComponent;
  let fixture: ComponentFixture<FileMenuFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileMenuFlyoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMenuFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
