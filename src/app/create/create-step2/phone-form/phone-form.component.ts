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
import { QrType } from '../../../shared/model/qr-type.enum';
import { SEND_CREATE_QR_FORM } from '../../../shared/utils/constants';
import { GlobalEmitter } from '../../../shared/utils/global-emitter';

@Component({
  selector: 'app-phone-form',
  styleUrls: ['./phone-form.component.scss'],
    templateUrl: './phone-form.component.html',
})
export class PhoneFormComponent extends BaseComponent implements OnInit {
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
      phone: ['', []],
    })
  }

  public submitForm(): void {
    const qr = new QR(
      QrType.CREATED,
      ActionType.PHONE,
      DataType.PHONE,
      `tel:${  this.form.value.phone}`,
      new Date()
    )
    this.result.emit(qr)
  }
}
