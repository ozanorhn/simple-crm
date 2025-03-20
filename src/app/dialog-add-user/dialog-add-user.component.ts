import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date | null;
  loading = false;
  errorMessage = '';

  constructor(private firestore: Firestore, private dialogRef: MatDialogRef<DialogAddUserComponent>) {}


  async saveUser() {
    if (!this.user.firstName || !this.user.lastName) {
      this.errorMessage = 'First name and last name are required!';
      return;
    }
  
    try {
      this.errorMessage = ''; // Clear previous errors
      this.loading = true;
      this.user.birthDate = this.birthDate?.getTime(); 
  
      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, this.user.toJSON());
  
      console.log('User successfully added:', this.user);
      this.loading = false;
      this.dialogRef.close(); 
    } catch (error) {
      console.error('Error saving user:', error);
      this.errorMessage = 'Failed to save user. Please try again.';
      this.loading = false;
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  
}
