import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss']
})
export class ActionsMenuComponent implements OnInit {
  @Input() element: any;
  @Input() actionsConfig: any;
  @Output() actionClick = new EventEmitter();
  public starTitle: string | any;
  constructor() { }

  ngOnInit(): void {
  }

  public handleClick(actionName: any) {
    this.actionClick.emit(actionName);
  }

}
