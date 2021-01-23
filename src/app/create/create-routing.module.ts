/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CreateComponent } from './create.component';

const routes: Routes = [
  {
    component: CreateComponent,
    path: '',
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class CreateRoutingModule {}
