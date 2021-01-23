/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

import { TabsPage } from './tabs.page'
import { TabsPageRoutingModule } from './tabs-routing.module'

@NgModule({
  declarations: [TabsPage],
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
})
export class TabsPageModule {}
