import { TestBed } from '@angular/core/testing';

import { ProfessionalGuardGuard } from './professional-guard.guard';

describe('ProfessionalGuardGuard', () => {
  let guard: ProfessionalGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfessionalGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
