import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWork } from '../../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
   private jsonUrl = 'assets/data/works.json';

   constructor(private http: HttpClient) { }

   getWorks(): Observable<IWork[]> {
       return this.http.get<IWork[]>(this.jsonUrl);
     }
}