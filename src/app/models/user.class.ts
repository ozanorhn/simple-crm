export class User {
  firstName: string;
  lastName: string;
  birthDate: number | undefined;
  phone: string;
  street: string;
  address2: string;
  city: string;
  zipCode: number;
  email: string;
  id: string;
  new: boolean;
  existing: boolean;
  vip: boolean;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName || '' : '';
    this.lastName = obj ? obj.lastName || '' : '';
    this.birthDate = obj ? obj.birthDate || undefined : undefined;
    this.phone = obj ? obj.phone || '' : '';
    this.street = obj ? obj.street || '' : '';
    this.address2 = obj ? obj.address2 || '' : '';
    this.city = obj ? obj.city || '' : '';
    this.zipCode = obj ? obj.zipCode || 0 : 0;
    this.email = obj ? obj.email || '' : '';
    this.id = obj ? obj.id || '' : '';
    this.new = obj ? obj.new ?? true : true;
    this.existing = obj ? obj.existing ?? false : false;
    this.vip = obj ? obj.vip ?? false : false;
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      phone: this.phone,
      street: this.street,
      address2: this.address2,
      city: this.city,
      zipCode: this.zipCode,
      email: this.email,
      id: this.id,
      new: this.new,
      existing: this.existing,
      vip: this.vip
    };
  }
}
