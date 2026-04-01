import { Component, inject, OnInit } from '@angular/core';
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
  results: Result[] = [];

  ngOnInit(): void {
    this.api.getMyResults().subscribe({
      next: (data) => this.results = data,
      error: (err) => console.error(err)
    });
  }
}