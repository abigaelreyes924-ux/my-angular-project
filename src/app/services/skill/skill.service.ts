import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISkill } from '../../models/skill.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getSkills(): Observable<ISkill[]> {
    if (environment.useMockData) {
      return this.http.get<ISkill[]>(`${this.apiUrl}/skills.json`);
    }

    // Dev mode → calls Java Spring Boot API
    return this.http.get<ISkill[]>(`${this.apiUrl}/skill`);
  }

  createSkill(skill: ISkill): Observable<ISkill> {
    if (environment.useMockData) {
      // For local mode, get the local data in json file
      console.warn('Mock mode: createSkill() not persisted');
      return new Observable<ISkill>((observer) => {
        observer.next(skill);
        observer.complete();
      });
    } else {
      // Call backend /create-user API
      return this.http.post<ISkill>(`${this.apiUrl}/skill/create`, skill);
    }
  }

  /** UPDATE skill by ID */
  updateSkill(id: number, skill: ISkill): Observable<string> {
    if (environment.useMockData) {
      console.warn('Mock mode: updateSkill() not persisted');
      return of('Skill updated (mock)');
    } else {
      return this.http.put<string>(`${this.apiUrl}/skill/update/${id}`, skill);
    }
  }

  /** DELETE skill by ID */
  deleteSkill(id: number): Observable<{ message: string }> {
    if (environment.useMockData) {
      return new Observable(observer => {
        observer.next({ message: 'Skill deleted successfully!' });
        observer.complete();
      });
    } else {
      return this.http.delete<{ message: string }>(`${this.apiUrl}/skill/delete/${id}`);
    }
  }

}
