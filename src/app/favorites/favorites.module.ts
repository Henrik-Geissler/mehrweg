/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'

import { SharedModule } from '../shared/shared.module'
import { FavoritesComponent } from './favorites.component'
import { FavoritesRoutingModule } from './favorites-routing.module'

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, IonicModule, SharedModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
