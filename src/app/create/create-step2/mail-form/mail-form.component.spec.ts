/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { MailFormComponent } from './mail-form.component'

describe('MailFormComponent', () => {
  let component: MailFormComponent
  let fixture: ComponentFixture<MailFormComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailFormComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(MailFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
