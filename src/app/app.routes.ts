import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: '**', redirectTo: 'profile' }
];
