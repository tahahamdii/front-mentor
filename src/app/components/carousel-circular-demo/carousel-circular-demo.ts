import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from './product';
import { ProductService } from '../../services/productservice';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@Component({
    selector: 'carousel-circular-demo',
    templateUrl: './carousel-circular-demo.html',
    styleUrl: 'style.css',
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule,MdbCarouselModule],
    providers: [ProductService],
    encapsulation: ViewEncapsulation.Emulated,


})
export class CarouselCircularDemo implements OnInit{
    products: Product[] ;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

       this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }
}