import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledNewComponent } from './scheduled-new.component';

describe('ScheduledNewComponent', () => {
  let component: ScheduledNewComponent;
  let fixture: ComponentFixture<ScheduledNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
