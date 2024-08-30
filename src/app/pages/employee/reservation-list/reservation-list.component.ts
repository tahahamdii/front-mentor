import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    CommonModule,
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    
  ]
})
export class ListReservationComponent implements OnInit {
  // Updated displayedColumns to match your API response structure
  displayedColumns1: string[] = [
    
    'reservationDate',
    'cancellationDeadline',
    'menu',
    'isCancelled',
    'rate'
  ];
  
  // Updated dataSource1 to store Reservation objects
  dataSource1 = new MatTableDataSource<any>();

  constructor(private reservationService: ReservationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    const userId = 4; // Replace with dynamic userId later or fetch from local storage
    this.reservationService.getReservationsByUserId(userId).subscribe((response: any) => {
      // Assuming response.reservations is an array of reservations
      this.dataSource1.data = response.reservations;
    });
  }


  openFeedbackDialog(reservation: any): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '250px',
      data: { reservation}
    });
    console.log(reservation);
  }
}
