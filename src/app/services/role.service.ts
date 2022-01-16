import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Role {
  rolename: string;
  level: any;
  name: string;
  position: number;
  city:string;
  role:string;
  salary:number;
}
export interface RoleId extends Role {
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  userPageReset: BehaviorSubject<any> = new BehaviorSubject(null);
  public userPageReset$ = this.userPageReset.asObservable();
  roleCollection: any;
  getrolesNameList: any;

  constructor(private _snackBar: MatSnackBar,) {

  }
}