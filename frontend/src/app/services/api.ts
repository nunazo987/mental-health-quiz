import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Result } from '../models/result.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, { email, password });
  }

  getQuiz(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions/quiz`);
  }

  saveResult(score: number, total: number): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}/results`, { score, total }, { headers: this.getHeaders() });
  }

  getMyResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.baseUrl}/results/me?t=${Date.now()}`, { headers: this.getHeaders() });
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions`, { headers: this.getHeaders() });
  }

  approveQuestion(id: number): Observable<Question> {
    return this.http.patch<Question>(`${this.baseUrl}/questions/${id}/approve`, {}, { headers: this.getHeaders() });
  }

  getMe(token?: string): Observable<{ id: string, is_admin: boolean }> {
    const headers = token 
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : this.getHeaders();
    return this.http.get<{ id: string, is_admin: boolean }>(`${this.baseUrl}/auth/me`, { headers });
  }

  createQuestion(question: string, options: string[], correctAnswer: string, explanation: string): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/questions`, 
      { question, options, correctAnswer, explanation }, 
      { headers: this.getHeaders() }
    );
}
}