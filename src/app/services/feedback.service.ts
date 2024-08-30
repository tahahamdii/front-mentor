import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedbacks/add';

  constructor(private http: HttpClient) {}

  addFeedback(feedback: { feedback: string }): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
