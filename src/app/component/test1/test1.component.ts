import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, filter, startWith ,take ,tap } from 'rxjs/operators';
import { Data } from '@angular/router';
import * as _ from 'lodash';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})

export class Test1Component {
  name = "Send a Message";
  message = [
    {
      message: 'hi'
    },
    {
      message: 'hello'
    }
  ];

  constructor(private http: HttpClient) {
    http.get<Data[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((data) => {
          return data.map((item) => {
            item.fullname = item.name + ' ' + item.username
            return item;
          })
        }),
        filter((data) => {
          return data[9].name !== "tDelphine";
        }),
        switchMap((data) => {
          console.log(1, data)
          return this.getDetails()
        }),
      )
      .subscribe(
        users => console.log(2, users)
      )
  }

  public getDetails(): Observable<any> {
    return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public showMessage(message: string) {
    return message;
  }

  ngOnInit(): void {
  }

  addMessage(): void {
    this.message.push({ message: 'vimal' });
  }

}
