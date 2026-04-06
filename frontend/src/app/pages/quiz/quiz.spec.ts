import { TestBed } from '@angular/core/testing';
import { Quiz } from './quiz';
import { provideHttpClient } from '@angular/common/http';

describe('Admin', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Quiz);
    expect(fixture.componentInstance).toBeTruthy();
  });
});