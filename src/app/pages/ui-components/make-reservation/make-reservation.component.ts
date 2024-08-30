import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  
    
  ]
})
export class MakeReservationComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.reservationForm = this.fb.group({
      userId: ['', Validators.required],
      menuId: ['', Validators.required],
      reservationDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;

      const payload = {
        userId: formData.userId,
        menuId: formData.menuId,
        reservationDate: formData.reservationDate
      };

      this.http.post('http://localhost:8080/api/reservations/make', null, {
        params: payload
      }).subscribe({
        next: (response) => {
          console.log('Reservation made successfully!', response);
          this.router.navigate(['/v1/employee']);  // Redirect after success
        },
        error: (error) => {
          console.error('Error making reservation', error);
        }
      });
    }
  }
}
