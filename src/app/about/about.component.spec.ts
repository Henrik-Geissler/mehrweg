/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AboutComponent } from './about.component'

describe('AboutComponent', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
