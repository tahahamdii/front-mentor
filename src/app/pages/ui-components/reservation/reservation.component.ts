import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatTableModule,
    DatePipe,
    CommonModule
  ],
  providers: [DatePipe]

})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'reservationDate', 'cancellationDeadline', 'isCancelled', 'user'];
  reservations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.http.get<any[]>('http://localhost:8080/api/reservations/all').subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }
}
