import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [ MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
 MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user!: User;
  userId: string = '';
  loading = false;
  birthDate!: Date | null;
  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {}
  
  ngOnInit() {
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }
  

  async saveUser() {
    this.loading = true;
    try {
      if (!this.userId) throw new Error('Missing userId');
  
      if (this.birthDate) {
        this.user.birthDate = this.birthDate.getTime();
      }
  
      const userRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userRef, { ...this.user }); // 👈 again, no toJSON()
  
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Speichern des Users:', error);
    } finally {
      this.loading = false;
    }
  }
  
  

  onCancel() {
    this.dialogRef.close();
  }
}
