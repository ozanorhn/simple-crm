import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatDialogModule, 
    MatCardModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  allUsers: any[] = []; 
  users$: Observable<any[]> | undefined; 

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit() {
    console.log('UserComponent geladen!');
    console.log('Firestore:', this.firestore);

    try {
      const usersCollection = collection(this.firestore, 'users'); 
      this.users$ = collectionData(usersCollection, { idField: 'id' });



      this.users$.subscribe((changes) => { 
        console.log('Received changes from Firestore:', changes);
        this.allUsers = changes; 
      });

    } catch (error) {
      console.error('Firestore error in UserComponent:', error);
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUserById(userId: string): Observable<User | undefined> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef) as Observable<User | undefined>;
  }
}
