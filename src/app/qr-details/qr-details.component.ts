/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { ActivatedRoute, Params, Router } from '@angular/router';
import type { ModalController } from '@ionic/angular';
import { mergeMap, take, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base.component';
import { AbstractHistoryAwareComponent } from '../shared/components/abstract-history-aware-component';
import { ShowQRCodeModalComponent } from '../shared/components/show-qrcode-modal/show-qrcode-modal.component';
import { ActionType } from '../shared/model/action-type.enum';
import type { QR } from '../shared/model/qr';
import type { ActionService } from '../shared/services/action.service';
import type { QrService } from '../shared/services/qr.service';

@Component({
  selector: 'app-qr-details',
  styleUrls: ['./qr-details.component.scss'],
    templateUrl: './qr-details.component.html',
})
export class QrDetailsComponent extends AbstractHistoryAwareComponent
  implements OnInit {
  public readonly ActionType = ActionType

  qr: QR

  id: number

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    router: Router,
    private readonly qrService: QrService,
    private readonly actionService: ActionService,
    private readonly modalController: ModalController
  ) {
    super(router)
  }

  ngOnInit() {
    super.ngOnInit()
    this.activatedRoute.params
      .pipe(
        mergeMap((parameters: Params) => {
                this.id = Number(parameters.id);
                
return this.qrService.getQrById(parameters.id);
        }),
        takeUntil(this.ngUnsubscribe)
        // tap(qr => console.log(qr))
      )
      .subscribe((qr: QR) => (this.qr = qr))
  }

  getButtonText(actionType: ActionType): string {
    switch (actionType) {
      case ActionType.CONTACT:
        return 'Add contact'
      case ActionType.EMAIL:
        return 'Send email'
      case ActionType.URL:
        return 'Go to url'
      case ActionType.EVENT:
        return 'Add event'
      case ActionType.PHONE:
        return 'Call'
      case ActionType.SMS:
        return 'Send sms'
      case ActionType.WIFI:
        return 'Open settings'
      case ActionType.TEXT:
      default:
        return ''
    }
  }

  getIcon(qr: QR): string {
    return this.qrService.getIcon(qr)
  }

  preformAction(qr: QR) {
    this.actionService.handleAction(qr)
  }

  toggleFavorite(): void {
    this.qr.favorite = !this.qr.favorite
    this.qrService
      .updateQR(this.qr)
      .pipe(take(1))
      .subscribe()
  }

  showQRCode() {
    this.modalController
      .create({
        component: ShowQRCodeModalComponent,
        componentProps: { id: this.id, qr: this.qr },
      })
      .then(modal => modal.present())
  }
}
