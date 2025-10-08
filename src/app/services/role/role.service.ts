import { Injectable } from '@angular/core';
import { IRole } from '../../models/role.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private jsonUrl = 'assets/data/roles.json';

   constructor(private http: HttpClient) { }

   getRoles(): Observable<IRole[]> {
          return this.http.get<IRole[]>(this.jsonUrl);
        }
}
