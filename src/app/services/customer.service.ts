import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../models/customer.class';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private afs: AngularFirestore) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.afs.collection<Customer>('customers').valueChanges({ idField: 'id' });
  }

  addCustomer(customer: Customer) {
    return this.afs.collection('customers').add(customer.toJSON());
  }

  updateCustomer(id: string, data: Partial<Customer>) {
    return this.afs.collection('customers').doc(id).update(data);
  }


  deleteCustomer(id: string) {
    return this.afs.collection('customers').doc(id).delete();
  }
}
