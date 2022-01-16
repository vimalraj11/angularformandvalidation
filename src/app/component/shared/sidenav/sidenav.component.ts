import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { ProfilepageComponent } from '../../profilepage/profilepage.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isExpanded = false;
  menus: any;
  submenu: any;
  firstName: any;
  @Input() sidemenuHideShow: any;
  @Output() isExpandedFlag = new EventEmitter<any>();
  @Output() sidemenushowflag = new EventEmitter<any>();
  useremail: any;
  userId: any;
  user: any;
  userlogo: any;
  defaultImage: string = '../../../../assets/user-2.png';

  constructor(public navigationService: NavigationService,
    private userDetailsService: UserdetailsService, private authService: AuthService,
    public dialog: MatDialog, public breakpointObserver: BreakpointObserver) {
    this.authService.getCurrentUser().subscribe((data: any) => {
      this.useremail = data[0].email;
      this.userId = data[0].id;
    });
    this.userDetailsService.getUserDetails(this.useremail).subscribe((data: any) => {
      this.user = data[0];
      this.userlogo = data[0].file;
      this.firstName = data[0].firstName + ' ' + data[0].lastName;
    })
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 425px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidemenuHideShow = true;
        }
      });
    this.authService.getCurrentUser().pipe(
      filter((data: any) => data && data.length > 0),
      switchMap((getCurrentdata: any) => {
        return getCurrentdata;
      })
    ).subscribe((tdata: any) => {
      this.navigationService.getSideNavValues().pipe(
        filter((data) => !!data)
      ).subscribe((mdata: any) => {
        const menuList = mdata.reduce((newArr: any, datas: any) => {
          if (datas.sideMenu == 'Yes') {
            if (datas.roles.length < 1) {
              newArr.push(datas);
            }
            datas.roles.forEach((item: any) => {
              if (tdata.companyDetail[0].role.toUpperCase() == item.toUpperCase()) {
                newArr.push(datas);
              }
            });
          }
          return newArr;
        }, []);

        this.menus = menuList.filter((data: any) =>
          data.parentMenu === ''); //parent menu
        this.submenu = menuList.filter((data: any) =>
          data.parentMenu !== '') //submenu

        this.menus.forEach((element: any) => {
          element.childMenu = [];
          element.isExpanded = false;
          this.submenu.filter((element1: any) => {
            if (element1.parentMenu == element.name) {
              element.childMenu.push(element1)
            }
          })
        });
      });
    });
  }

  onProfileClick() {
    const dialogRef = this.dialog.open(ProfilepageComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userDetailsService.getUserDetails(this.useremail).subscribe((data: any) => {
        this.user = data[0];
        this.userlogo = data[0].file;
        this.firstName = data[0].firstName + ' ' + data[0].lastName;
      })
    });
  }
  public toggleNavExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.isExpandedFlag.emit(this.isExpanded);
  }

  toggleNavItemExpand() {
    this.isExpanded = true;
    this.isExpandedFlag.emit(true);
  }

  mouseClick(menu: any) {
    menu.isExpanded = !menu.isExpanded;
    if (menu.isExpanded) {
      this.isExpanded = menu.isExpanded;
      this.isExpandedFlag.emit(menu.isExpanded);
    }
  }

  OnsideNavshow(data: any) { //Mobile view
    this.sidemenushowflag.emit(data);
  }

  signOut(): void {
    this.authService.signOut();
  }
}