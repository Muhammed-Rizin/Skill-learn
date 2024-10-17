import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCompletedComponent } from './scheduled-completed.component';

describe('ScheduledCompletedComponent', () => {
  let component: ScheduledCompletedComponent;
  let fixture: ComponentFixture<ScheduledCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
