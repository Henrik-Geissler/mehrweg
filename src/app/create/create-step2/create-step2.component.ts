/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { ActionType } from '../../shared/model/action-type.enum';
import type { QR } from '../../shared/model/qr';

@Component({
  selector: 'app-create-step2',
  styleUrls: ['./create-step2.component.scss'],
  templateUrl: './create-step2.component.html',
})
export class CreateStep2Component implements OnInit {
  public readonly ActionType = ActionType

  @Input() type: ActionType

  @Output() stepComplete = new EventEmitter<QR>()

  ngOnInit() {}

}
