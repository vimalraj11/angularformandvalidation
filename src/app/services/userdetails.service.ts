import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, switchMap, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from './contract.service';
import { AuthService } from './auth.service';


export interface User {
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
  dob: any,
  address: string,
  password: any,
  role: any;
}
export interface UserDetailsId extends User {
  userDesignation: any;
  userAccess: any;
  contryCode: any;
  companyName: any;
  company: any;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  $users: Observable<UserDetailsId[]>;
  userRole: any;
  companyId: any;
  currentUserRole: any;
  currentUserCompany: any;
  private userCollection: AngularFirestoreCollection<User>;
  private userCompanyRelationCollection: AngularFirestoreCollection<User>;
  companyIds: any = [];
  userPageReadOnly: BehaviorSubject<any> = new BehaviorSubject(null);
  public userPageReadOnly$ = this.userPageReadOnly.asObservable();
  userRoleReadOnly: BehaviorSubject<any> = new BehaviorSubject(null);
  public userRoleReadOnly$ = this.userRoleReadOnly.asObservable();
  userMailReadOnly: BehaviorSubject<any> = new BehaviorSubject(null);
  public userMailReadOnly$ = this.userMailReadOnly.asObservable();
  private mailCollection: AngularFirestoreCollection<any>;
  currentUserMail: any;
  constructor(private readonly firestore: AngularFirestore, public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    public contractService: ContractService, public authService: AuthService) {
    this.userCollection = firestore.collection('users');
    this.mailCollection = firestore.collection('mail');
    this.userCompanyRelationCollection = firestore.collection('userCompanyRelation');
    this.$users = this.userCollection.snapshotChanges().pipe(map((actions: any) => {
      return _.sortBy(actions.map((a: any) => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        const date = new Date();
        data.dob = data.dob ? data.dob.toDate() : '';
        return {
          id, ...data
        };
      })
      );
    }));
    this.authService.getCurrentUserInfo().subscribe((data: any) => {
      this.currentUserRole = data.companyDetail[0].role;
      this.currentUserCompany = data.companyDetail[0].cName;
      this.currentUserMail = data.email;
    });
  }

  //Add User
  addRole(role: UserDetailsId): any {
    const tempPassword = this.getRandPass();
    return from(this.afAuth.createUserWithEmailAndPassword(role.email, tempPassword)
      .then(() => {
        this.addMail(role, tempPassword);
      }).catch((error) => {
        this._snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }));
  }


  addMail(user: any, tempPassword: any): any {
    if (this.currentUserRole == 'Super Admin') {
      this.mailCollection.add({
        from: 'support@statuslead.com',
        to: user.email,
        subject: `${this.currentUserCompany}’s - New order management tool, your login credentials.`,
        html: `<h5>Hi ${user.firstName}  ${user.lastName},<h5> <br>
              <p>&nbsp;&nbsp;&nbsp;&nbsp; 
              Welcome to the Statuslead family. Thank you for showing interest in our product.
               We are an order / project management software company developing applications to give complete
               control over the different stages of the order life cycle. Below are your credentials.
               </p> <br>
              <label>Username :</label>  ${user.email} 
              <br>
              <label>Password :</label>   ${tempPassword}
      
              <p>Please update the password once you login using your profile page (Click on your name or Photo icon).<p>
              <p>You can login using URL –<a href="https://app.statuslead.com/signin" target="_blank"> https://app.statuslead.com/signin </p>
              <p>You are given access as Company Admin. A Company Admin is the administrator role who can give access to other member in your company to create and manage orders.
               You are also a Contract Admin.
              <br />
              <img src="https://firebasestorage.googleapis.com/v0/b/status-lead.appspot.com/o/emailImg%2Femail-img.png?alt=media&token=fc69b675-375b-4f04-bd66-5ecd20696fc4" alt="StatusLead" />
              </p>
               <h5>Here is what you can do with Status Lead: <h5>
                 <ul>
                   <li>Be part of projects, create and keep track of milestones throughout the order life cycle. </li>
                   <li>Stay updated with what’s latest activities in the order. </li>
                   <li>Upload files and keep track of order documents and approval status.  </li>
                   <li>Monitor progress and find bottlenecks in the order execution. </li>
               </ul> <br>
               <p>For further help or clarifications, please contact
                 <a href="support@statuslead.com" target="_blank">support@statuslead.com</a>
               <p>`
      }).then(() => {
        delete user.id;
        this.userCollection.add(user);
        this._snackBar.open('User Created and Reset password link sent to email sucessfully.', 'Close', {
          duration: 2500,
        });
      });
    }
    else {
      this.mailCollection.add({
        from: 'support@statuslead.com',
        to: user.email,
        subject: 'Welcome to Status Lead',
        html: `<h5>Hi ${user.firstName}  ${user.lastName},<h5> <br>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;
              Welcome to Statuslead. You are invited to be part of an order management team by 
              customer / vendor ${this.currentUserMail}. We are an order / project monitoring software 
              developed to give complete control 
              over the different stages of the order life cycle. Below are your credentials.<p> <br>
              <label>Username :</label>  ${user.email}
              <br>
              <label>Password :</label>   ${tempPassword}
      
              <p>Please update the password once you login using your profile page (Click on your name or Photo icon).<p>
              <p>You can login using URL –<a href="https://app.statuslead.com/signin" target="_blank"> https://app.statuslead.com/signin </p>
              
               <h5>Here is what you can do with Status Lead: <h5>
                 <ul>
                   <li>Be part of projects, create and keep track of milestones throughout the order life cycle. </li>
                   <li>Stay updated with what’s latest activities in the order. </li>
                   <li>Upload files and keep track of order documents and approval status.  </li>
                   <li>Monitor progress and find bottlenecks in the order execution. </li>
               </ul> <br>
               <p>For further help or clarifications, please contact
                 <a href="support@statuslead.com" target="_blank">support@statuslead.com</a>
               <p>`
      }).then(() => {
        delete user.id;
        this.userCollection.add(user);
        this._snackBar.open('User Created and Reset password link sent to email sucessfully', 'Close', {
          duration: 2500,
        });
      });
    }
  }

  public getRandPass(): string {
    return Math.random().toString(28).slice(7) +
      Math.random().toString(28)
        .toUpperCase().slice(7);
  }

  public setReadonly(reset: any): void {
    this.userPageReadOnly.next(reset);
  }

  public setReadOnlyRole(reset: any): void {
    this.userRoleReadOnly.next(reset);
  }

  public setReadOnlyMail(reset: any): void {
    this.userMailReadOnly.next(reset);
  }

  //Get users
  public getUsers(loggedUserCompanyIds?: any, userRole?: any): any {
    if (userRole !== 'Super Admin') {
      return this.firestore.collection<User>('users', ref => ref.where("companyIds", "array-contains-any", loggedUserCompanyIds)).
        snapshotChanges().pipe(
          take(1),
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            data.dob = data.dob ? data.dob.toDate() : '';
            return { id, ...data };
          }))
        );
    }
    else {
      return this.userCollection.snapshotChanges().pipe(
        take(1),
        map((actions) => {
          return _.sortBy(actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            data.dob = data.dob ? data.dob.toDate() : '';
            return { id, ...data };
          })
          );
        })
      );
    }
  }

  //Update User
  updateRole(data: UserDetailsId): any {
    const docId = data.id;
    delete data.id;
    delete data.password;
    return from(this.userCollection.doc(docId).update(data).then(() => {
      this._snackBar.open('Data Updated Successfully!', 'Close', {
        duration: 2500,
      });
    }));
  }
  public getUserDetails(email: any): any {
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).
      snapshotChanges().pipe(
        take(1),
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return data;
        }))
      );
  }

  //Get user list for signin
  public getUsersLists(email: any) {
    return this.firestore.collection<any>('users', ref => ref.where('email', '==', email))
      .snapshotChanges().pipe(take(1),
        map((actions) => {
          return _.sortBy(actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
          );
        })
      );
  }

}
