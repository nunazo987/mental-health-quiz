import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Quiz } from './pages/quiz/quiz';
import { History } from './pages/history/history';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'quiz', component: Quiz },
  { path: 'history', component: History },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];