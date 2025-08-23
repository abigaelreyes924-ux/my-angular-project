import { Routes } from '@angular/router';
import { Admin } from './admin';
import { Dashboard } from './dashboard/dashboard';
import { Work } from './work/work';
import { User } from './user/user';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'user', component: User },
      { path: 'work', component: Work },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];