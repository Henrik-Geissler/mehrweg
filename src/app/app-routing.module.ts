/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { PreloadAllModules, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    path: '',
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}
