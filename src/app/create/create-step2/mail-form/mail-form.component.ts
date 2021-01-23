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
import { QrType } from '../../../shared/model/qr-type.enum';
import { SEND_CREATE_QR_FORM } from '../../../shared/utils/constants';
import { GlobalEmitter } from '../../../shared/utils/global-emitter';

@Component({
  selector: 'app-mail-form',
  styleUrls: ['./mail-form.component.scss'],
  templateUrl: './mail-form.component.html',
})
export class MailFormComponent extends BaseComponent implements OnInit {
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
      bcc: ['', []],
      body: ['', []],
      cc: ['', []],
      subject: ['', []],
      to: ['', []],
    })
  }

  public submitForm(): void {
    const mail = new Mail()
    mail.to = this.form.value.to ? this.form.value.to.split(',') : []
    mail.cc = this.form.value.cc ? this.form.value.cc.split(',') : []
    mail.bcc = this.form.value.bcc ? this.form.value.bcc.split(',') : []
    mail.subject = this.form.value.subject || ''
    mail.body = this.form.value.body || ''
    const qr = new QR(
      QrType.CREATED,
      ActionType.EMAIL,
      DataType.MAILTO,
      mail.mailTo(),
      new Date()
    )
    this.result.emit(qr)
  }
}
