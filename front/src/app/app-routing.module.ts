import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome', // redirect to login if no storage name
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'conf-account',
    loadChildren: () => import('./conf-account/conf-account.module').then( m => m.ConfAccountPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then( m => m.EditorPageModule)
  },
  {
    path: 'updown-load',
    loadChildren: () => import('./updown-load/updown-load.module').then( m => m.UpdownLoadPageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'database',
    loadChildren: () => import('./database/database.module').then( m => m.DatabasePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
