export interface User {
  _id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
}
