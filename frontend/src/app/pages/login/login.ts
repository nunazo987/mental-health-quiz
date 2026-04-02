import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  isLogin = true;
  errorMessage = '';

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  submit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    const request = this.isLogin
      ? this.api.login(email, password)
      : this.api.register(email, password);

    request.subscribe({
      next: (res) => {
        localStorage.setItem('token', res.session.access_token);
        this.api.getMe().subscribe({
          next: (me) => {
            localStorage.setItem('is_admin', String(me.is_admin));
            this.router.navigate(['/quiz']);
          }
        })
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong.';
      }
    });
  }
}