import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalRequestsComponent } from './professional-requests.component';

describe('ProfessionalRequestsComponent', () => {
  let component: ProfessionalRequestsComponent;
  let fixture: ComponentFixture<ProfessionalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalRequestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
