import { Component } from '@angular/core';
import { TooltipComponent } from '@angular/material/tooltip';
import { CarouselCircularDemo } from 'src/app/components/carousel-circular-demo/carousel-circular-demo';
import { Carousel04Component } from 'src/app/components/carousel04/carousel04.component';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { AppTooltipsComponent } from '../ui-components/tooltips/tooltips.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CollectionComponent } from 'src/app/components/collection/collection.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { PricesComponent } from 'src/app/components/prices/prices.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HeaderComponent,
    Carousel04Component,
    CarouselCircularDemo,
    AppTooltipsComponent, CarouselComponent,CollectionComponent,CardComponent,PricesComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

}
