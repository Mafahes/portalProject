export interface User {
  nummer: number;
  userName: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  isExpert: boolean;
  nameBlog: string;
  sex?: any;
  city: string;
  country: string;
  dateBirth: Date;
  status: string;
  description: string;
  dateAdd: Date;
  version: string;
  isDeleted: boolean;
  lastLogin: Date;
  userCode: string;
  isOnline: boolean;
  roleId: string;
  lockoutEnabled: boolean;
  normalizedUserName: string;
  displayName: string;
  email: string;
}
