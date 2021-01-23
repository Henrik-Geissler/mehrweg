/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { WifiFormComponent } from './wifi-form.component'

describe('WifiFormComponent', () => {
  let component: WifiFormComponent
  let fixture: ComponentFixture<WifiFormComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WifiFormComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(WifiFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
