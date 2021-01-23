/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'

import { SharedModule } from '../shared/shared.module'
import { SavedComponent } from './saved.component'
import { SavedRoutingModule } from './saved-routing.module'

@NgModule({
  declarations: [SavedComponent],
  exports: [SavedComponent],
  imports: [CommonModule, IonicModule, SharedModule, SavedRoutingModule],
})
export class SavedComponentModule {}
