import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  questions: Question[] = [];
  pendingQuestions: Question[] = [];

  ngOnInit(): void {
    this.api.getQuestions().subscribe({
      next: (data) => {
        this.questions = data;
        this.pendingQuestions = data.filter(q => !q.approved);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  approve(id: number): void {
    this.api.approveQuestion(id).subscribe({
      next: () => {
        this.pendingQuestions = this.pendingQuestions.filter(q => q.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}