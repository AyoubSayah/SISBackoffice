import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubejectDialogComponent } from './cancel-subeject-dialog.component';

describe('CancelSubejectDialogComponent', () => {
  let component: CancelSubejectDialogComponent;
  let fixture: ComponentFixture<CancelSubejectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelSubejectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSubejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
