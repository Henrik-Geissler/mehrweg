/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { NgModule } from '@angular/core'
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'

import { HistoryComponent } from './history.component'

const routes: Routes = [
  {
    component: HistoryComponent,
    path: '',
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HistoryRoutingModule {}
