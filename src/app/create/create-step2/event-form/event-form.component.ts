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
import { createEvent, SEND_CREATE_QR_FORM } from '../../../shared/utils/constants';
import { GlobalEmitter } from '../../../shared/utils/global-emitter';

@Component({
  selector: 'app-event-form',
  styleUrls: ['./event-form.component.scss'],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent extends BaseComponent implements OnInit {
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
      description: ['', []],
      end: ['', []],
      location: ['', []],
      start: ['', []],
      summary: ['', []],
    })
  }

  public submitForm(): void {
    const event = createEvent([
      {
        description: this.form.value.description || '',
        end: this.form.value.start ? new Date(this.form.value.start) : null,
        location: this.form.value.location || '',
      start: this.form.value.start
          ? new Date(this.form.value.start)
          : new Date(),
        summary: this.form.value.summary || '',
      },
    ])
    const qr = new QR(
      QrType.CREATED,
      ActionType.EVENT,
      DataType.VEVENT,
      event,
      new Date()
    )
    this.result.emit(qr)
  }
}
