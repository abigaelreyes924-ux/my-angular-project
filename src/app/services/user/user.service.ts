import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserComponent } from '../../admin/user/user.component';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.jsonUrl);
  }
}
