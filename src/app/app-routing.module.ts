import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list/list-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tabs',
        component: TabsPage,
        children: [
          {
            path: 'daily',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./pages/daily/daily.module').then(m => m.DailyPageModule)
              }
            ]
          },
          {
            path: 'add',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./pages/add/add.module').then(m => m.AddPageModule)
              }
            ]
          },
          {
            path: 'list',
            children: [
              {
                path: '',
                component: ListPageComponent
              }
            ]
          },
          {
            path: 'setting',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./pages/setting/setting.module').then(m => m.SettingPageModule)
              }
            ]
          },
          {
            path: '**',
            redirectTo: 'list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'tabs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
