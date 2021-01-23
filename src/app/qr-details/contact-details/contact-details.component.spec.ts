/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ContactDetailsComponent } from './contact-details.component'

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent
  let fixture: ComponentFixture<ContactDetailsComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(ContactDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
