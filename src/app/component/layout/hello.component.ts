import { Component, Input } from '@angular/core';
import { AppService } from './app.services';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
})

export class HelloComponent {
  name!: string;

  constructor(private appService: AppService) {}

  ngOnInit() :void {
    this.appService.stringSubject.subscribe(
      (data: string) => {
        this.name = data;
      }
    )
  };
}
