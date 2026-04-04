import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuestion } from './submit-question';

describe('SubmitQuestion', () => {
  let component: SubmitQuestion;
  let fixture: ComponentFixture<SubmitQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
