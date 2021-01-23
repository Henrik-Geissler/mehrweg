/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

import { AboutComponent } from './about.component'
import { AboutRoutingModule } from './about-routing.module'

@NgModule({
  declarations: [AboutComponent],
  exports: [AboutComponent],
  imports: [CommonModule, FormsModule, IonicModule, AboutRoutingModule],
})
export class AboutComponentModule {}
