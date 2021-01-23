/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import type { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import type { VCard } from 'ngx-vcard';
import { VCardFormatter } from 'ngx-vcard';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../../../base.component';
import { ActionType } from '../../../shared/model/action-type.enum';
import { DataType } from '../../../shared/model/data.type';
import { QR } from '../../../shared/model/qr';
import { QrType } from '../../../shared/model/qr-type.enum';
import { SEND_CREATE_QR_FORM } from '../../../shared/utils/constants';
import { GlobalEmitter } from '../../../shared/utils/global-emitter';

@Component({
  selector: 'app-contact-form',
  styleUrls: ['./contact-form.component.scss'],
    templateUrl: './contact-form.component.html',
})
export class ContactFormComponent extends BaseComponent implements OnInit {
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
      birthDay: ['', []],
      displayName: ['', Validators.required],
      email: ['', []],
      company: ['', []],
      firstName: ['', []],
      job: ['', []],
      lastName: ['', []],
      mobile: ['', []],
      notes: ['', []],
      phone: ['', []],
      website: ['', []],
      workEmail: ['', []],
      workPhone: ['', []],
    })
  }

  public submitForm(): void {
    const vCard: VCard = {
      birthday: this.form.value.birthDay
        ? new Date(this.form.value.birthDay)
        : undefined,
            email: [
        { param: { type: 'home' }, value: this.form.value.email || '' },
        { param: { type: 'work' }, value: this.form.value.workEmail || '' },
      ],
      formattedName: {
        firstNames: this.form.value.firstName || '',
                lastNames: this.form.value.lastName || '',
      },
      name: {
                firstNames: this.form.value.fistName || '',
                lastNames: this.form.value.lastName || '',
            },
      nickname: this.form.value.displayName || '',
      note: this.form.value.note || '',
      organization: this.form.value.job || '',
            telephone: [
        {
          param: { type: ['home', 'cell'] },
          value: this.form.value.mobile || '',
        },
        { param: { type: 'home' }, value: this.form.value.phone || '' },
        { param: { type: 'work' }, value: this.form.value.workPhone || '' },
      ],
      title: this.form.value.job || '',
    }
    const vcardData = VCardFormatter.getVCardAsString(vCard)
    const qr = new QR(
      QrType.CREATED,
      ActionType.CONTACT,
      DataType.VCARD,
      vcardData,
      new Date()
    )
    this.result.emit(qr)
  }
}
