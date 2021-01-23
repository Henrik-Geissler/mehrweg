/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { WifiDetailsComponent } from './wifi-details.component'

describe('WifiDetailsComponent', () => {
  let component: WifiDetailsComponent
  let fixture: ComponentFixture<WifiDetailsComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WifiDetailsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(WifiDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
