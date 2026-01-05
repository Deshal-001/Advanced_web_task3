import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="login-section">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" formControlName="username" type="text" required />
          <div class="error" *ngIf="form.get('username')?.invalid && form.get('username')?.touched">Username is required.</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" formControlName="password" type="password" required />
          <div class="error" *ngIf="form.get('password')?.invalid && form.get('password')?.touched">Password is required.</div>
        </div>
        <button type="submit" [disabled]="form.invalid" class="nav-btn">Login</button>
      </form>
      <div *ngIf="submitted" class="success">Login submitted: {{ form.value | json }}</div>
    </section>
  `,
  styles: [
    `.login-section { max-width: 400px; margin: 2rem auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 2.5rem; border: 1px solid #E5E7EB; }`,
    `.login-section h2 { color: #111827; text-align: center; margin-bottom: 1.5rem; }`,
    `.form-group { margin-bottom: 1.5rem; }`,
    `label { display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500; font-size: 0.95rem; }`,
    `input { width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #D1D5DB; font-size: 1rem; background: #F9FAFB; color: #111827; transition: all 0.2s; }`,
    `input:focus { outline: none; border-color: #2563EB; background: white; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }`,
    `input:disabled { background: #F3F4F6; color: #9CA3AF; cursor: not-allowed; }`,
    `.error { color: #EF4444; font-size: 0.85rem; margin-top: 0.35rem; font-weight: 500; }`,
    `.nav-btn { width: 100%; padding: 0.875rem; border: none; border-radius: 8px; background: #2563EB; color: white; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; margin-top: 1rem; }`,
    `.nav-btn:hover:not(:disabled) { background: #1D4ED8; }`,
    `.nav-btn:disabled { background: #D1D5DB; cursor: not-allowed; }`,
    `.success { margin-top: 1.5rem; padding: 1rem; background: #D1FAE5; border: 1px solid #6EE7B7; border-radius: 8px; color: #047857; font-weight: 500; text-align: center; }`
  ]
})
export class Login {
  form;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}
