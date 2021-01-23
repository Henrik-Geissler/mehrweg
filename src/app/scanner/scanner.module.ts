/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ZXingScannerModule } from '@zxing/ngx-scanner'

import { SharedModule } from '../shared/shared.module'
import { ScannerComponent } from './scanner.component'
import { ScannerRoutingModule } from './scanner.routing.module'

@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    IonicModule,
    ScannerRoutingModule,
    ZXingScannerModule,
    SharedModule,
  ],
})
export class ScannerModule {}
