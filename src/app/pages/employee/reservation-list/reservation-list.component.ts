import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  standalone: true,
  imports : [MatCardModule,MatMenuModule,CommonModule,HeaderComponent,MatTableModule,MatIconModule,MatProgressBarModule]
})
export class ListReservationComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = new MatTableDataSource();

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    const userId = 1; // Replace with dynamic userId later or fetch from local storage
    this.reservationService.getReservationsByUserId(userId).subscribe((response: any) => {
      this.dataSource1.data = response.reservations;
    });
  }
}
