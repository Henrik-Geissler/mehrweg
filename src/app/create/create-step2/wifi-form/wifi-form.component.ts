/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import type { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../../../base.component';
import { ActionType } from '../../../shared/model/action-type.enum';
import { DataType } from '../../../shared/model/data.type';
import { QR } from '../../../shared/model/qr';
import { Mail } from '../../../shared/model/qr-data/mail';
import { Wifi } from '../../../shared/model/qr-data/wifi';
import { QrType } from '../../../shared/model/qr-type.enum';
import { SEND_CREATE_QR_FORM } from '../../../shared/utils/constants';
import { GlobalEmitter } from '../../../shared/utils/global-emitter';

@Component({
  selector: 'app-wifi-form',
  styleUrls: ['./wifi-form.component.scss'],
  templateUrl: './wifi-form.component.html',
})
export class WifiFormComponent extends BaseComponent implements OnInit {
  @Output() result = new EventEmitter<QR>()

  form: FormGroup

  constructor(private readonly fb: FormBuilder) {
    super()
  }

  ngOnInit() {
    GlobalEmitter.of(SEND_CREATE_QR_FORM)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.submitForm())
    this.form = this.fb.group({
      password: ['', []],
      ssid: ['', []],
      type: ['', []],
    })
  }

  public submitForm(): void {
    const wifi = new Wifi()
    wifi.ssid = this.form.value.ssid || ''
    wifi.ssid = this.form.value.type || 'WPA'
    wifi.password = this.form.value.password || ''
    const qr = new QR(
      QrType.CREATED,
      ActionType.EMAIL,
      DataType.MAILTO,
      wifi.toQrData(),
      new Date()
    )
    this.result.emit(qr)
  }
}
