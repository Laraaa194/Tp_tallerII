import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'ecommerce_users';

  constructor() {}

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  emailExists(email: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  registerUser(user: Omit<User, 'id'>): { success: boolean; message: string } {
    if (this.emailExists(user.email)) {
      return { success: false, message: 'El correo electrónico ya se encuentra registrado.' };
    }

    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: crypto.randomUUID()
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

    return { success: true, message: '¡Usuario registrado con éxito!' };
  }
}
