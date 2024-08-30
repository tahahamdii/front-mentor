import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getReservationsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations/user/${userId}`);
  }
}
