export class Customer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    street?: string;
    zipCode?: string;
    city?: string;
  
    constructor(obj?: any) {
      this.firstName = obj?.firstName || '';
      this.lastName = obj?.lastName || '';
      this.email = obj?.email || '';
      this.phone = obj?.phone || '';
      this.company = obj?.company || '';
      this.street = obj?.street || '';
      this.zipCode = obj?.zipCode || '';
      this.city = obj?.city || '';
      this.id = obj?.id;
    }
  
    toJSON() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        company: this.company,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city
      };
    }
  }
  