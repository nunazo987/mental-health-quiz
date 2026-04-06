import { TestBed } from '@angular/core/testing';
import { Admin } from './admin';
import { provideHttpClient } from '@angular/common/http';

describe('Admin', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Admin);
    expect(fixture.componentInstance).toBeTruthy();
  });
});