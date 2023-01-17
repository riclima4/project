import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
{
    path: 'error404',
    loadChildren: () =>
      import('./error404/error404.module').then((m) => m.Error404PageModule),
  },
  { path: '**', redirectTo: '/error404' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
