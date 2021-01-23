/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { ToastController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base.component';
import { ActionType } from '../shared/model/action-type.enum';
import type { QR } from '../shared/model/qr';
import type { QrService } from '../shared/services/qr.service';
import { SEND_CREATE_QR_FORM } from '../shared/utils/constants';
import { GlobalEmitter } from '../shared/utils/global-emitter';

@Component({
  selector: 'app-create',
  styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class CreateComponent extends BaseComponent implements OnInit {
  currentStep = 1

  selectedType: ActionType = ActionType.TEXT

  currentQR: QR = null

  constructor(
    private readonly qrService: QrService,
    private readonly toastController: ToastController
  ) {
    super()
  }

  ngOnInit() {}

  step1Complete(type: ActionType) {
    this.selectedType = type
    this.currentStep = 2
  }

  step2Complete(qr: QR) {
    this.currentQR = qr
    this.currentStep = 3
  }

  submitForm(): void {
    GlobalEmitter.of(SEND_CREATE_QR_FORM).emit(true)
  }

  saveQR() {
    this.qrService
      .saveQR(this.currentQR)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() =>
        this.toastController
          .create({
            duration: 2_000,
            message: 'QR Code saved!',
          })
          .then(toast => toast.present())
      )
  }
}
