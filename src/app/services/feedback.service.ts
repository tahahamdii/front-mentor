import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedbacks/add';

  constructor(private http: HttpClient) {}

  addFeedback(feedbackType: string, menuId: number): Observable<any> {
    const params = new HttpParams()
      .set('feedbackType', feedbackType)
      .set('menuId', menuId.toString());

    return this.http.post(this.apiUrl, null, { params });
  }
}
