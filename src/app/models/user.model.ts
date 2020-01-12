export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  dob: string;
  gender: 'male' | 'female';
}