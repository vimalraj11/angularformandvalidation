import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-lodash',
  templateUrl: './lodash.component.html',
  styleUrls: ['./lodash.component.css']
})
export class LodashComponent implements OnInit {

  obj1 = [
    { days: 0, weight: 711 },
    { days: 1, weight: 723 },
    { days: 2, weight: 700 },
    { days: 3, weight: 705 },
    { days: 4, weight: 697 },
    { days: 5, weight: 698 },
    { days: 6, weight: 695 },
    { days: 7, weight: 689 }
  ];
  obj2 = [
    { days: 0, min: 2.5, manx: 2 },
    { days: 3, min: 2.05, max: 2.55 },
    { days: 6, min: 2.1, max: 2.6 }
  ];
  obj3 = _.merge(_.keyBy(this.obj1, 'days'), _.keyBy(this.obj2, 'days'));
  

  constructor() {
    console.log(
      _.map(this.obj1, (a, b) => console.log('this is a', a, '', b))
    );
  }

  ngOnInit(): void {
  }

}
