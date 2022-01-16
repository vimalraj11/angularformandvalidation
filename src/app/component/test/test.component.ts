import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  source = [{name: 'Tom'}, {name: 'Jerry'}];
  dataSubscribe!: Subscription;
  data$ = new Observable(Subscriber =>{
    Subscriber.next(1);
    Subscriber.next(2);
    Subscriber.next(3);
    Subscriber.next(4);
    Subscriber.error('error');
    Subscriber.next(5);
    Subscriber.next(6);
    Subscriber.complete();
  });

  data1$ = of(1,2,3,4,5,6,7);

  subscribe1() : void{
    this.dataSubscribe = this.data1$.subscribe(x=>{
      console.log(x);
    },
    e => {console.log(e);},
    ()=>{console.log('completed')}
    );
  };
  
  subscribe2() : void{
    this.dataSubscribe = this.data$.subscribe(x=>{
      console.log(x);
    },
    e => {console.log(e);},
    ()=>{console.log('completed')}
    );
  };

  ngOnDestroy() : void{
    this.dataSubscribe.unsubscribe();
  };

  changeCopy() : void{
    this.source[0].name = 'Garfield';
  }

}
