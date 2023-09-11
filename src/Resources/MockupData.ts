export interface data {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  compareUserPassword(password: string): Promise<boolean>;
}


export const testDatabase =  [];