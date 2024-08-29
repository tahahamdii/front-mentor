import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMenuFormComponent } from '../update-menu-form/update-menu-form.component';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';

// Define the Menu interface
export interface Menu {
  id: number;
  date: string;
  entree: string;
  main_course: string;
  garnish: string;
  dessert: string;
  sandwiches: string[];
}

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HeaderComponent
  ],
  templateUrl: './menu-table.component.html',
})
export class MenuTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'entree', 'platPrincipal', 'garniture', 'dessert', 'sandwiches', 'actions'];
  dataSource: Menu[] = [];

  constructor(private http: HttpClient,  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.http.get<Menu[]>('http://localhost:8080/api/menus/all').subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  deleteMenu(id: number): void {
    const url = `http://localhost:8080/api/menus/delete/${id}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Menu deleted successfully');
        // Filter out the deleted item from the dataSource
        this.dataSource = this.dataSource.filter(menu => menu.id !== id);
        // Trigger change detection to update the UI
        this.dataSource = [...this.dataSource]; // Reassign to trigger change detection
      },
      error => {
        console.error('There was an error deleting the menu!', error);
      }
    );
  }

  openUpdateDialog(menu: Menu): void {
    const dialogRef = this.dialog.open(UpdateMenuFormComponent, {
      width: '300px',
      data: menu,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMenu(result);
      }
    });
  }

  updateMenu(menu: Menu): void {
    this.http.put<Menu>(`http://localhost:8080/api/menus/update/${menu.id}`, menu).subscribe(updatedMenu => {
      const index = this.dataSource.findIndex(m => m.id === updatedMenu.id);
      this.dataSource[index] = updatedMenu;
    });
  }
  
}
