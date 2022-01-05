import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSingupComponent } from './dialog-singup.component';

describe('DialogSingupComponent', () => {
  let component: DialogSingupComponent;
  let fixture: ComponentFixture<DialogSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSingupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
