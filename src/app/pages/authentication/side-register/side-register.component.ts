import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  form: FormGroup;

  constructor(private router: Router, private http: HttpClient) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('employee', [Validators.required]), // Default role as 'employee'
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;

      this.http.post('http://localhost:8080/rest/auth/register', formData)
        .subscribe({
          next: (response) => {
            console.log('Registration successful!', response);
            this.router.navigate(['/']);  // Redirect after success
          },
          error: (error) => {
            console.error('Registration error', error);
          }
        });
    }
  }
}
