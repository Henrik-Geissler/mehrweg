/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

import { SharedModule } from '../shared/shared.module'
import { HistoryComponent } from './history.component'
import { HistoryRoutingModule } from './history-routing.module'

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    HistoryRoutingModule,
  ],
})
export class HistoryModule {}
