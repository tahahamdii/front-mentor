import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-prices',
  standalone: true,
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
  imports: [CommonModule]
})
export class PricesComponent implements OnInit {
  menuItems_L: Array<{ name: string; description: string; price: string }> = [];
  menuItems_R: Array<{ name: string; description: string; price: string }> = [];

  menuStyle = {
    background: '#ffe6d1',
    color: '#000'
  };

  dotStyle = {
    backgroundImage: ''
  };

  ngOnInit() {
    this.loadMenuItems();
  }

  isEven(n: number): boolean {
    return n % 2 === 0;
  }

  loadMenuItems() {
    const vm = this;
    axios
      .get(
        'https://sheets.googleapis.com/v4/spreadsheets/1zIVCVA0Tk5CvAiTyeAdDBPygT3aKDiSeM2FbPU0JO2c/values/Specials!A2:C20?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'
      )
      .then(function (response) {
        const specials = response.data.values;
        for (let index = 0; index < specials.length; index++) {
          const element = specials[index];
          const mitem = {
            name: element[0],
            description: element[1],
            price: element[2]
          };
          if (vm.isEven(index)) {
            vm.menuItems_L = vm.menuItems_L.concat(mitem);
          } else {
            vm.menuItems_R = vm.menuItems_R.concat(mitem);
          }
        }
        console.log(response);
      });
  }
}
