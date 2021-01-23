/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { QRCodeModule } from 'angularx-qrcode'
import { FileSaverModule } from 'ngx-filesaver'

import { QrListComponent } from './components/qr-list/qr-list.component'
import { QrListSortButtonComponent } from './components/qr-list-sort-button/qr-list-sort-button.component'
import { ShowQRCodeModalComponent } from './components/show-qrcode-modal/show-qrcode-modal.component'
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive'

@NgModule({
  declarations: [
    QrListComponent,
    QrListSortButtonComponent,
    ShowQRCodeModalComponent,
    ClickStopPropagationDirective,
  ],
  exports: [
    FileSaverModule,
    QrListComponent,
    QrListSortButtonComponent,
    ShowQRCodeModalComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FileSaverModule,
    QRCodeModule,
  ],
})
export class SharedModule {}
