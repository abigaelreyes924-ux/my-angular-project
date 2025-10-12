import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    console.log('apiUrl: ', this.apiUrl);
    // Local mode → loads JSON file from assets
    if (environment.useMockData) {
      return this.http.get<IUser[]>(`${this.apiUrl}/users.json`);
    }

    // Dev mode → calls Java Spring Boot API
    return this.http.get<IUser[]>(`${this.apiUrl}/user`);
  }

  createUser(user: IUser): Observable<IUser> {
    if (environment.useMockData) {
      // For local mode, get the local data in json file
      console.warn('Mock mode: createUser() not persisted');
      return new Observable<IUser>((observer) => {
        observer.next(user);
        observer.complete();
      });
    } else {
      // Call backend /create-user API
      return this.http.post<IUser>(`${this.apiUrl}/user/create-user`, user);
    }
  }
}
