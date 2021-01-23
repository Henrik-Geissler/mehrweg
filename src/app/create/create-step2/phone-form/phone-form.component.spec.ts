/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PhoneFormComponent } from './phone-form.component'

describe('PhoneFormComponent', () => {
  let component: PhoneFormComponent
  let fixture: ComponentFixture<PhoneFormComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneFormComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(PhoneFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
