import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './submit-question.html',
  styleUrl: './submit-question.css'
})
export class SubmitQuestion {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  submitted = false;
  errorMessage = '';

  form: FormGroup = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(10)]],
    option1: ['', Validators.required],
    option2: ['', Validators.required],
    option3: ['', Validators.required],
    option4: ['', Validators.required],
    correctAnswer: ['', Validators.required],
    explanation: ['']
  });

  submit(): void {
    if (this.form.invalid) return;
    const { question, option1, option2, option3, option4, correctAnswer, explanation } = this.form.value;
    const options = [option1, option2, option3, option4];

    if (!options.includes(correctAnswer)) {
      this.errorMessage = 'Correct answer must match one of the options exactly.';
      return;
    }

    this.api.createQuestion(question, options, correctAnswer, explanation).subscribe({
      next: () => {
        this.submitted = true;
      },
      error: (err: { error?: { message?: string } }) => {
        this.errorMessage = err.error?.message || 'Something went wrong.';
      }
    });
  }
}