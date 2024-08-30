import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [SlickCarouselModule,CommonModule,NgFor]
})
export class CarouselComponent {

  data = {
    carouselImage: 'https://placehold.co/170x45'
  }

  
    siteData = {
      carouselImage: "path/to/carousel-image.jpg",
      carousel: [
          {
              title: "Slide 1",
              label: "Label 1",
              description: "Description for Slide 1"
          },
          {
              title: "Slide 2",
              label: "Label 2",
              description: "Description for Slide 2"
          },
          {
              title: "Slide 3",
              label: "Label 3",
              description: "Description for Slide 3"
          }
      ],
      news: [
          {
              title: "News 1",
              url: "https://example.com/news1"
          },
          {
              title: "News 2",
              url: "https://example.com/news2"
          },
          {
              title: "News 3",
              url: "https://example.com/news3"
          }
      ]
  };
  
  

  news: any = (this.siteData as any).default;
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, centerMode: true};

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}