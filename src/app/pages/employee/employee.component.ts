import { Component } from '@angular/core';
import { Carousel04Component } from 'src/app/components/carousel04/carousel04.component';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HeaderComponent,
    Carousel04Component,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

}
