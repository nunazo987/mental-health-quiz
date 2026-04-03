import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswer = '';
  score = 0;
  finished = false;
  showExplanation = false;
  answered = false;

  ngOnInit(): void {
    this.api.getQuiz().subscribe({
      next: (data) => {
        this.questions = data.map(q => ({
          ...q,
          options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/'])
    });
  }

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  selectAnswer(option: string): void {
    if (this.answered) return;
    this.selectedAnswer = option;
    this.answered = true;
    this.showExplanation = true;
    if (option === this.currentQuestion.correct_answer) {
      this.score++;
    }
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedAnswer = '';
      this.answered = false;
      this.showExplanation = false;
    } else {
      this.finished = true;
      this.saveResult();
    }
  }

  saveResult(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.saveResult(this.score, this.questions.length).subscribe();
    }
  }

  restart(): void {
    this.router.navigate(['/quiz']);
  }

  goToHistory(): void {
  this.router.navigate(['/history']);
  }
}