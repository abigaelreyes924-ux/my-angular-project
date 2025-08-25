import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkComponent } from './work/work.component';
import { UserComponent } from './user/user.component';
import { SkillComponent } from './skill/skill.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'work', component: WorkComponent },
      { path: 'skill', component: SkillComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];