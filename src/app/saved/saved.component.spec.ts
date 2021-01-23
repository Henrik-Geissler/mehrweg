/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SavedComponent } from './saved.component'

describe('SavedComponent', () => {
  let component: SavedComponent
  let fixture: ComponentFixture<SavedComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavedComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(SavedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
