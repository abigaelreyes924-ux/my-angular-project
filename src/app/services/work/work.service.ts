import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
   private jsonUrl = 'assets/data/works.json';

   constructor(private http: HttpClient) { }

   getUsers(): Observable<IWork[]> {
       return this.http.get<IWork[]>(this.jsonUrl);
     }
}
