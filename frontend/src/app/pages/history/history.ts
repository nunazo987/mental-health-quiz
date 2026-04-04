import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  results: Result[] = [];

  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.api.getMyResults().subscribe({
        next: (data) => {
          this.results = data;
          this.loading = false;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }, 100);
    }
  }