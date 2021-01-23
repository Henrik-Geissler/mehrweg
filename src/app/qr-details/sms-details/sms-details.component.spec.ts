/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SmsDetailsComponent } from './sms-details.component'

describe('SmsDetailsComponent', () => {
  let component: SmsDetailsComponent
  let fixture: ComponentFixture<SmsDetailsComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmsDetailsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(SmsDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
