import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface LoginResponse {
  email: string;
  // Include other fields if needed
}

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup;

  constructor(private router: Router, private http: HttpClient) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const loginData = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.http.post('http://localhost:8080/rest/auth/C', loginData)
        .pipe(
          catchError(err => {
            console.error('Login failed', err);
            return of(null);  // Handle error
          })
        )
        .subscribe(response => {
          if (response) {
            const logResponse = response as LoginResponse;
            console.log('Login successful', response);
            if (logResponse.email && logResponse.email.includes('admin')) {
              this.router.navigate(['/v1/admin']);
            } else {
              this.router.navigate(['/v1/employee']);
            }
          }
        });
    }
  }
}
