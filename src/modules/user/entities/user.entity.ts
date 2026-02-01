enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  AVINASH = 'AVINASH',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
