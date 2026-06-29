import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'ecommerce_users';

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users/register';

  constructor() {}

  registerUser(user: Omit<User, 'id'>): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
