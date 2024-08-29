import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCircularDemo } from './carousel-circular-demo';

describe('CarouselCircularDemo', () => {
  let component: CarouselCircularDemo;
  let fixture: ComponentFixture<CarouselCircularDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselCircularDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCircularDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
