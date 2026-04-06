import { TestBed } from '@angular/core/testing';
import { Nav } from './nav';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Nav', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Nav);
    expect(fixture.componentInstance).toBeTruthy();
  });
});