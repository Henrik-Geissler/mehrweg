/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { NgModule } from '@angular/core'
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'

import { TabsPage } from './tabs.page'

const routes: Routes = [
  {
    children: [
      {
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerModule),
        path: 'scanner'
      },
      {
        loadChildren: () => import('../history/history.module').then(m => m.HistoryModule),
        path: 'history'
      },
      {
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule),
        path: 'favorites'
      },
      {
        loadChildren: () => import('../create/create.module').then(m => m.CreateComponentModule),
        path: 'create-qr'
      },
      {
        loadChildren: () => import('../saved/saved.module').then(m => m.SavedComponentModule),
        path: 'saved'
      },
      { loadChildren: () => import('../qr-details/qr-details.module').then(m => m.QrDetailsModule), path: 'details/:id' },
      { loadChildren: () => import('../about/about.module').then(m => m.AboutComponentModule), path: 'about' },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tabs/scanner'
      },
    ],
    component: TabsPage,
    path: 'tabs',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabs/scanner'
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
