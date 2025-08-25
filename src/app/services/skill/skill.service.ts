import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private jsonUrl = 'assets/data/skills.json';

   constructor(private http: HttpClient) { }

   getSkills(): Observable<ISkill[]> {
          return this.http.get<ISkill[]>(this.jsonUrl);
        }
}
