import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.css'
})
export class MenuTableComponent implements OnInit {
  weeks: any[][] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/menus/all').subscribe(data => {
      this.organizeMenusByWeeks(data);
    });
  }

  organizeMenusByWeeks(data: any[]): void {
    // Initialize weeks array with 4 empty arrays (one for each week)
    this.weeks = [[], [], [], []];

    // Assuming data has a `date` field and is sorted by date
    data.forEach(menu => {
      const date = new Date(menu.date);
      const weekNumber = this.getWeekNumber(date);

      if (weekNumber <= 4) {
        this.weeks[weekNumber - 1].push(menu);
      }
    });
  }

  getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const day = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.floor(day / 7) + 1;
  }
}