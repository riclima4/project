import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'tab1',
    redirectTo: 'tabs',
  },
  {
    path: 'tab2',
    redirectTo: 'tabs',
  },
  {
    path: 'tab3',
    redirectTo: 'tabs',
  },

  {
    path: '**',
    loadChildren: () =>
      import('./error404/error404.module').then((m) => m.Error404PageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
