import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  public stringSubject = new Subject<string>();
  public title: BehaviorSubject<string> = new BehaviorSubject('');

  passValue(data: string) : void {
    this.stringSubject.next(data);
  };

  constructor() {
    setTimeout(() => {
      this.title.next(new Date().toString());
    }, 5000);
  };

}
