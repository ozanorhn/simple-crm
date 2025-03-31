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
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-adress',
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
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
  user!: User;
  userId: string = '';
  loading = false;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialogRef<DialogEditAdressComponent>
  ) {}

  async saveUser() {
    this.loading = true;
    try {
      if (!this.userId) throw new Error('Missing userId');
  
      const userRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userRef, { ...this.user }); 
  
      this.dialogRef.close(); // ✅ Hier wird wirklich geschlossen

    } catch (error) {
      console.error('Fehler beim Speichern der Adresse:', error);
    } finally {
      this.loading = false;
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
