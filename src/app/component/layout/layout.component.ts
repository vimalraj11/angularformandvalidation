import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AppService } from './app.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  myTextVal!: string;
  title!: string;

  constructor(public user: UserService,
    private appService: AppService,) { }

  ngOnInit() : void {
    this.appService.title.subscribe(newTitle => this.title = newTitle);
  };

  Increase() : void{
    this.user.counter += 1;
  };

  Decrease() : void{
    this.user.counter -= 1;
  };

  sendTextValue() : void {
    this.appService.passValue(this.myTextVal);
  };

}
