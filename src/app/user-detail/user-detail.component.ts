import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule,],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  currentUser$: Observable<User | undefined> | undefined;

  constructor(public dialog: MatDialog){}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      console.log('User ID:', this.userId);
      this.loadUser();
    });
  }

  loadUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.currentUser$ = docData(userDocRef) as Observable<User | undefined>;
  }

  editUserDetail() {
    this.currentUser$?.subscribe((userData) => {
      if (userData) {
        const dialog = this.dialog.open(DialogEditUserComponent);
        dialog.componentInstance.user = userData;
        dialog.componentInstance.userId = this.userId; 
      }
    });
  }
  

  editMenu() {
    this.currentUser$?.subscribe((userData) => {
      if (userData) {
        const dialog = this.dialog.open(DialogEditAdressComponent);
        dialog.componentInstance.user = userData;
        dialog.componentInstance.userId = this.userId;
       
      }
    });
  }
}