import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms'; // import the ReactiveFormsModule
import { Menu } from '../../../components/menu-table/menu-table.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
  standalone: true, 
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    
    MatDatepickerModule,
    
    MatMomentDateModule,

  ]
})
export class AddMenuComponent implements OnInit {
  menuForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.menuForm = this.fb.group({
      menuDate: ['', Validators.required],
      entree: ['', Validators.required],
      mainCourse: ['', Validators.required],
      garnish: ['', Validators.required],
      dessert: ['', Validators.required],
      sandwiches: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.menuForm.valid) {
      const menuData = {
        ...this.menuForm.value,
        sandwiches: this.menuForm.value.sandwiches.split(',').map((item: string) => item.trim())
      };

      this.http.post<Menu>('http://localhost:8080/api/menus/add', menuData).subscribe({
        next: (response) => {
          this.router.navigate(['/menu-list']);  // Navigate back to menu list or another appropriate route
        },
        error: (error) => {
          console.error('There was an error adding the menu!', error);
        }
      });
    }
  }
}
