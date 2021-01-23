/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import type { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { FavoritesComponent } from './favorites.component'

describe('FavoritesComponent', () => {
  let component: FavoritesComponent
  let fixture: ComponentFixture<FavoritesComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(FavoritesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
